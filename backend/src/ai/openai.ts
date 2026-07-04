import config from "config";
import OpenAI from "openai";


const apiKey = config.get<string>("ai.mcpApiKey");

if (!apiKey) {
    console.log("OpenAI api key is missing. Set PROJECT3_MCP_API_KEY env var");
}

const aiMcp = new OpenAI({
    apiKey,
});

export default aiMcp