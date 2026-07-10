import type Vacation from "../../../models/Vacation"
import type VacationDraft from "../../../models/VacationDraft"
import AuthAwareService from "../AuthAware"


export default class VacationsService extends AuthAwareService {
    async getAllVacations(): Promise<Vacation[]> {
        const { data } = await this.axiosInstance.get<Vacation[]>(`/api/admin/vacations`)
        return data
    }

    async createVacation(vacationData: Partial<VacationDraft>): Promise<void> {
        console.log(vacationData)
        await this.axiosInstance.post(`/api/admin/vacation`, vacationData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    async updateVacation(vacationId: string, vacationData: Partial<VacationDraft>): Promise<void> {
        await this.axiosInstance.patch(`/api/admin/vacation/${vacationId}`, vacationData, {
            headers: {
                ...(vacationData.imageUrl ? { 'Content-Type': 'multipart/form-data' } : {})
            }
        })
    }

    async deleteVacation(vacationId: string): Promise<void> {
        await this.axiosInstance.delete(`/api/admin/vacation/${vacationId}`)
    }
}