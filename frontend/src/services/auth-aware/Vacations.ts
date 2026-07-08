import type Vacation from "../../models/Vacation";
import type VacationResponse from "../../models/VacationResponse";
import AuthAwareService from "./AuthAware";


export default class VacationsService extends AuthAwareService {

    // User tools //
    async getAllVacationsByPage(page: number, limit: number = 9): Promise<VacationResponse> {
        const { data } = await this.axiosInstance.get<VacationResponse>(`/api/user/vacations/${page}/${limit}`)
        return data
    }

    async getFutureVacationsByPage(page: number, limit: number = 9): Promise<VacationResponse> {
        const { data } = await this.axiosInstance.get<VacationResponse>(`/api/user/vacations/future/${page}/${limit}`)
        return data
    }

    async getPresentVacationsByPage(page: number, limit: number = 9): Promise<VacationResponse> {
        const { data } = await this.axiosInstance.get<VacationResponse>(`/api/user/vacations/present/${page}/${limit}`)
        return data
    }

    async getFavoriteVacationsByPage(page: number, limit: number = 9): Promise<VacationResponse> {
        const { data } = await this.axiosInstance.get<VacationResponse>(`/api/user/vacations/favorite/${page}/${limit}`)
        return data
    }

    // Admin tools //
    async getAllVacations(): Promise<Vacation[]> {
        const { data } = await this.axiosInstance.get<Vacation[]>(`/api/admin/vacations`)
        return data
    }

    async createVacation(vacationData: Partial<Vacation>): Promise<void> {
        await this.axiosInstance.post(`/api/admin/vacation`, vacationData)
    }

    async updateVacation(vacationId: string, vacationData: Partial<Vacation>): Promise<void> {
        await this.axiosInstance.patch(`/api/admin/vacation/${vacationId}`, vacationData)
    }

    async deleteVacation(vacationId: string): Promise<void> {
        await this.axiosInstance.delete(`/api/admin/vacation/${vacationId}`)
    }
}