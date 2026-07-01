import type { NextFunction, Request, Response } from "express"
import config from 'config'
import aiMcp from "../../ai/openai"


const project3McpTools = ['getAllVacationsPaginated']

function extractJwt(request: Request): string | null {
    const authHeader = request.get('Authorization')

    const [, jwt] = authHeader.split(' ')

    return jwt
}

export async function freeTextRequest(request: Request<{}, {}, { prompt: string }>, response: Response, next: NextFunction) {
    try {
        const { prompt } = request.body
        const jwt = extractJwt(request)

        const systemPrompt = `
You are an assistant that can use external tools.
You have access to a set of functions (tools). When a user request can be answered using a tool, you MUST call the appropriate tool instead of answering from memory or guessing.
Tool usage rules:
- Always prefer calling a tool when the task involves data retrieval, database access, pagination, or server-side state.
- Do NOT simulate or guess tool results.
- Do NOT fabricate data.
- If a tool is needed but arguments are unclear, make the best reasonable call based on the request.
- If no tool is relevant, answer normally.
Output rules:
- If you call a tool, do NOT include a final answer in the same step.
- Wait for tool result before producing final response.
- Use only provided tool results for factual answers.
Tool behavior:
- Tools represent backend functions connected to a database or server logic.
- Treat tool results as the single source of truth.
- Tools may return partial data (by page) 
- Tools output is a lists of structured objects.
Response style:
- Be concise.
- Prefer structured and practical answers.
- Do not explain internal tool.`.trim()

        const mcpUrl = config.get<string>('mcp.server')
        console.log(`mcp server runs on ${mcpUrl}`)

        const llmResponse = await aiMcp.responses.create({
            model: 'gpt-4.1-mini',
            input: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: prompt },
            ],
            tools: [
                {
                    type: 'mcp',
                    server_label: 'betterx',
                    server_url: mcpUrl,
                    allowed_tools: project3McpTools,
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                    require_approval: 'never',
                },
            ],
        })

        const answer = llmResponse.output_text?.trim()

        if (!answer) {
            return next({
                status: 500,
                message: 'could not extract response from llm'
            })
        }

        response.json({
            prompt,
            answer,
        })
    } catch (e) {
        console.error('free text request error', e)
        next(e)
    }
}