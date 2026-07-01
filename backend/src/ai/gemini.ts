import { GoogleGenAI } from "@google/genai";
import config from "config";

const apiKey = config.get<string>("ai.apiKey");

if (!apiKey) {
    console.log("AI api key is missing. Set PROJECT3_AI_API_KEY env var");
}

const ai = new GoogleGenAI({
    apiKey,
});

export default ai