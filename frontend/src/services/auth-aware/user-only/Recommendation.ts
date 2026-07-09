import type RecommendationResponse from "../../../models/RecommendationResponse";
import AuthAwareService from "../AuthAware";


export default class RecommendationService extends AuthAwareService {
    async getLocations(): Promise<string[]> {
        const { data } = await this.axiosInstance.get<string[]>("/api/user/vacations/locations")
        return data
    }
    async getRecommendation(selectedLocation: string): Promise<RecommendationResponse> {
        const { data } = await this.axiosInstance.get<RecommendationResponse>(`/api/user/vacations/recommendation/${selectedLocation}`)
        return JSON.parse(JSON.stringify(data))
    }
}