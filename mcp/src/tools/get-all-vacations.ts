import type { McpServer } from '@modelcontextprotocol/server'
import * as z from 'zod/v4'
import { handleBackendTool } from './handle-backend-tool.js'
import { getAllVacations } from '../backend/backend-client.js'


export function registerGetAllVacationsTool(server: McpServer) {
    server.registerTool(
        'getAllVacationsPaginated',
        {
            description: 'Get all vacations including startdate, enddate, price, location, description, and likes',
            inputSchema: z.object({}),
        },
        async () => handleBackendTool(() => getAllVacations())
    )
}
