import { useState } from "react"
import useService from "../../../hooks/use-service"
import McpService from "../../../services/auth-aware/users/Mcp"
import "./Mcp.css"
import { showErrorToast } from "../../common/show-error-toast"


export default function Mcp() {
    const [loading, setLoading] = useState<boolean>(false)
    const [question, setQuestion] = useState<string>("")
    const [previousQuestion, setPreviousQuestion] = useState<string>("")
    const [mspAnswer, setMspAnswer] = useState<string>("")
    const mcpService = useService(McpService)

    async function askQuestion() {
        if (!question)
            return showErrorToast("Please enter a question first!")
        if (question === previousQuestion)
            return showErrorToast("You have already asked this question.\nPlease ask a different one.")

        try {
            setLoading(true)
            const response = await mcpService.askMcpQuestion(question)
            setMspAnswer(response)
            setPreviousQuestion(question)
        } catch (error) {
            console.error("Error fetching MCP response:", error)
            showErrorToast("Failed to fetch MCP response.\nPlease try again later.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="Mcp">
            <div className="mcp-form">
                <h3>Ask me anything about our vacations</h3>
                <textarea rows="4" cols="50" placeholder="Type your question here..." onChange={(e) => setQuestion(e.currentTarget.value.trim())}></textarea>
                <button className="mcp-button" onClick={askQuestion}>Ask</button>
            </div>
            <br />

            {loading ? (
                <div className="loader">Loading data...</div>
            ) :
                !mspAnswer ? (
                    <div className="mcp-answer">{mspAnswer}</div>
                ) : (
                    <div></div>
                )}
        </div>
    )
}