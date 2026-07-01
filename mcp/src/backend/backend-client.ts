import axios, { type AxiosInstance } from 'axios'
import config from 'config'
import { getJwt } from '../middleware/auth-context.js'


function createBackendClient(jwt?: string): AxiosInstance {
    const token = jwt ?? getJwt()

    return axios.create({
        baseURL: config.get<string>('backend.url'),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export async function getAllVacations(jwt?: string) {
    const client = createBackendClient(jwt)
    const page = 1
    const limit = 30
    const { data } = await client.post(`api/users/vacations/${page}/${limit}`)

    return data
}