import { Request, Response, NextFunction } from "express"
import ai from "../../openai/gemini"


export async function getRecommendation(request: Request<{ location: string }>, response: Response, next: NextFunction) {
    try {
        const systemPrompt = `You are a travel recommendation assistant.
The user provides only a destination name (city, island, region, resort, or country).
Your task is to return ONLY valid JSON matching the following schema and rules.
Rules:
- Output must be valid JSON only.
- Do not wrap JSON in markdown.
- Do not include explanations or additional text.
- All descriptions must be concise (1-3 sentences).
- Recommendations must be accurate and specific to the destination.
- Avoid generic tourist clichés.
- Do not invent places that do not exist.
JSON schema:
{
  "title": "Short title for the destination",
  "keyPlace": {
    "name": "Most iconic attraction",
    "description": "Brief explanation why it is worth visiting."
  },
  "highlights": [
    {
      "name": "...",
      "description": "..."
    },
    {
      "name": "...",
      "description": "..."
    },
    {
      "name": "...",
      "description": "..."
    }
  ],
  "tips": [
    {
      "topic": "Best Time to Visit",
      "text": "..."
    },
    {
      "topic": "Food",
      "text": "..."
    },
    {
      "topic": "Transportation",
      "text": "..."
    }
  ]
}
Requirements:
- title: engaging title for the destination.
- keyPlace: exactly one must-see place.
- highlights: exactly 3 additional attractions, each with name and description.
- tips:
  1. Best Time to Visit
  2. Food
  3. Transportation
- Return nothing except the JSON object.`.trim()

        const llmResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: request.params.location,
            config: {
                systemInstruction: systemPrompt,
            }
        })
        const rawResult = llmResponse.text?.trim()

        if (!rawResult) {
            return next({
                status: 500,
                message: 'Could not extract recommendations from llm response'
            })
        }

        const jsonText = rawResult.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '')

        let recommendation;
        try {
            recommendation = JSON.parse(jsonText);
        }
        catch {
            return next({
                status: 500,
                message: "LLM returned invalid JSON"
            })
        }

        response.json(recommendation);
    } catch (error) {
        next(error)
    }
}