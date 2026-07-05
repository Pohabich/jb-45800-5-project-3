import { WhereOptions, literal, Op, FindAttributeOptions, IncludeOptions } from 'sequelize'
import { VacationDTO, GetVacationsOptions, PaginatedVacationsResponse, RawVacationQueryResult } from './interfaces'
import { VacationTimeFilter } from './enums'
import Like from '../models/Like'
import Vacation from '../models/Vacation'


function ConvertToNumber(value: string, defaultValue: number): number {
  return value ? Number(value) : defaultValue
}

/**
 * 
 * @param options 
 * @returns 
 */
export async function getVacationsPaginatedHelper(options: GetVacationsOptions): Promise<PaginatedVacationsResponse> {
  const {
    currentUserId,
    page,
    limit,
    onlyLikedByUser = false,
    timeFilter = VacationTimeFilter.All
  } = options

  const limitVal = ConvertToNumber(limit, 9)
  const pageNum = ConvertToNumber(page, 1)

  // --- Attributes --- //
  const attributes: FindAttributeOptions = [
    'id', 'location', 'description', 'image_url', 'start_date', 'end_date', 'price',
    [
      literal(`(SELECT COUNT(*) FROM likes WHERE likes.vacation_id = Vacation.id)`),
      'totalLikes'
    ],
    [
      literal(`(SELECT COUNT(*) FROM likes WHERE likes.vacation_id = Vacation.id AND likes.user_id = '${currentUserId}')`),
      'isLiked'
    ]
  ]

  // --- Filters --- //
  const whereConditions: WhereOptions<Vacation> = {}
  const now = new Date()

  switch (timeFilter) {
    case VacationTimeFilter.Upcoming:
      whereConditions.startDate = { [Op.gt]: now }
      break
    case VacationTimeFilter.Ongoing:
      whereConditions.startDate = { [Op.lte]: now }
      whereConditions.endDate = { [Op.gt]: now }
      break
    case VacationTimeFilter.All:
    default:
      break
  }

  const include: IncludeOptions[] = []

  if (onlyLikedByUser) {
    include.push({
      model: Like,
      as: 'likes',
      where: { userId: currentUserId },
      required: true,
      attributes: []
    })
  }

  // --- Execution --- //
  const data = (await Vacation.findAll({
    attributes,
    where: whereConditions,
    include,
    limit: limitVal,
    offset: (pageNum - 1) * limitVal,
    raw: true,
    order: [['start_date', 'ASC']]
  })) as unknown as RawVacationQueryResult[]

  // --- Gether data --- //
  const mappedData = data.map((item): VacationDTO => ({
    vacationId: item.id,
    location: item.location,
    description: item.description,
    image: item.image_url,
    startDate: new Date(item.start_date),
    endDate: new Date(item.end_date),
    price: Number(item.price),
    totalLikes: Number(item.totalLikes),
    isLiked: Number(item.isLiked) > 0
  }))
  const totalItems = await Vacation.count({ where: whereConditions, include })
  const totalPages = Math.ceil(totalItems / limitVal)

  return {
    mappedData,
    totalPages
  }
}
