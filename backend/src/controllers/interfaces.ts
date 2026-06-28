import { VacationTimeFilter } from './enums'


export interface GetVacationsOptions {
  currentUserId: string
  page?: string
  limit?: string
  onlyLikedByUser?: boolean
  timeFilter?: VacationTimeFilter
}

export interface VacationDTO {
  vacationId: string
  location: string
  description: string
  image: string
  startDate: Date
  endDate: Date
  totalLikes: number
  isLiked: boolean
}

export interface PaginatedVacationsResponse {
  mappedData: VacationDTO[]
  totalPages: number
}

export interface RawVacationQueryResult {
  id: string
  location: string
  description: string
  image_url: string
  start_date: string | Date
  end_date: string | Date
  totalLikes: string | number
  isLiked: string | number
}