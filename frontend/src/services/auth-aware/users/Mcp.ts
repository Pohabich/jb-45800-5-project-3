import AuthAwareService from "../AuthAware";


export default class McpService extends AuthAwareService {
    async askMcpQuestion(question: string): Promise<string> {
        const { data } = await this.axiosInstance.post<string>("/api/user/free-text", { question })
        return data
    }
}