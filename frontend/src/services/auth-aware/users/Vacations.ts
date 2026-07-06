import type VacationResponse from "../../../models/VacationResponse";
import AuthAwareService from "../AuthAware";


export default class VacationsService extends AuthAwareService {
    async getAllVacations(page: number, limit: number = 9): Promise<VacationResponse> {
        const { data } = await this.axiosInstance.get<VacationResponse>(`/api/user/vacations/${page}/${limit}`)
        return data
    }

    async getFutureVacations(page: number, limit: number = 9): Promise<VacationResponse> {
        const { data } = await this.axiosInstance.get<VacationResponse>(`/api/user/vacations/future/${page}/${limit}`)
        return data
    }

    async getPresentVacations(page: number, limit: number = 9): Promise<VacationResponse> {
        const { data } = await this.axiosInstance.get<VacationResponse>(`/api/user/vacations/present/${page}/${limit}`)
        return data
    }

    async getFavoriteVacations(page: number, limit: number = 9): Promise<VacationResponse> {
        const { data } = await this.axiosInstance.get<VacationResponse>(`/api/user/vacations/favorite/${page}/${limit}`)
        return data
    }
}