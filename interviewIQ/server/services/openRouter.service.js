import axios from "axios";

export const askAI = async (messages) => {
    try {
        if (!messages || messages.length === 0) {
            throw new Error("Messages array is empty.");
        }

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openrouter/free",
                messages: messages
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const content=response?.data?.choices?.[0]?.message?.content;

        if (!content || !content.trim()){
            throw new Error("AI returned empty response");
        }
        return content
    } catch (error) {
        console.log("OpenRouter API Error:", error.message);

        throw new Error("Failed to get response from AI");
    }
};