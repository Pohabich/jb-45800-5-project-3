import config from "config";
import OpenAI from "openai";


const apiKey = config.get<string>("openai.mcpApiKey");

if (!apiKey) {
    console.log("OpenAI api key is missing. Set BETTERX_OPENAI_API_KEY env var");
}

const aiMcp = new OpenAI({
    apiKey,
});

export default aiMcp