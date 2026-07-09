import type DestinationLikes from "../../../models/DestinationLikes";
import AuthAwareService from "../AuthAware";


export default class LikesService extends AuthAwareService {
    async getVacationsLikes(): Promise<DestinationLikes[]> {
        const { data } = await this.axiosInstance.get('/api/admin/reports/likes')
        return data
    }
}