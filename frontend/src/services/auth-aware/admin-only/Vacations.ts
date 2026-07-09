import type Vacation from "../../../models/Vacation"
import AuthAwareService from "../AuthAware"


export default class VacationsService extends AuthAwareService {
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