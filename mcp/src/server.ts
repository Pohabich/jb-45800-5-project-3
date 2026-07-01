import { McpServer } from '@modelcontextprotocol/server'
import * as z from 'zod/v4'
import { registerGetAllVacationsTool } from './tools/get-all-vacations.js'


export function createMcpServer() {
    const server = new McpServer(
        {
            name: 'project3-mcp',
            version: '1.0.0',
        },
        {
            instructions: 'Tools for managing Project3 vacations. Requires a valid JWT in the Authorization header.',
        }
    )

    server.registerTool(
        'ping',
        {
            description: 'Health check tool that returns pong',
            inputSchema: z.object({}),
        },
        async () => {
            return {
                content: [
                    {
                        type: 'text',
                        text: 'pong',
                    },
                ],
            }
        }
    )

    registerGetAllVacationsTool(server)

    return server
}
