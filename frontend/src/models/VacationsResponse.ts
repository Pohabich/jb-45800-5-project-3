import type Vacation from "./Vacation"


export default interface VacationResponse {
    mappedData: Vacation[]
    totalPages: number
}