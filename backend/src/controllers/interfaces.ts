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
  vacationId: string
  location: string
  description: string
  image: string
  startDate: string | Date
  endDate: string | Date
  totalLikes: string | number
  isLiked: string | number
}