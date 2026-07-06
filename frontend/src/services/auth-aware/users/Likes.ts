import AuthAwareService from "../AuthAware";


export default class LikesService extends AuthAwareService {
    async dislikeVacation(vacationId: string): Promise<void> {
        await this.axiosInstance.delete('/api/user/vacation/unlike', { data: { vacationId } })
    }

    async likeVacation(vacationId: string): Promise<void> {
        await this.axiosInstance.post<void>('/api/user/vacation/like', { vacationId })
    }
}