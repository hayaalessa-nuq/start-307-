
import { GoogleGenAI, Chat } from "@google/genai";

let chat: Chat | null = null;

const getAiClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("API_KEY environment variable not set");
    }
    return new GoogleGenAI({ apiKey });
};

const initializeChat = (): Chat => {
    const ai = getAiClient();
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: 'You are ECO, a friendly and enthusiastic chatbot for the ReCupNUQ sustainability campaign at Northwestern University in Qatar. Your goal is to educate, motivate, and engage students, faculty, and staff to switch to reusable cups. Keep your answers concise, encouraging, and informative. Use emojis to make the conversation more engaging. Answer questions about the campaign, share facts about sustainability, and encourage users to take the pledge.',
        },
    });
};

export const sendMessageToEco = async (message: string): Promise<string> => {
    if (!chat) {
        chat = initializeChat();
    }
    try {
        const response = await chat.sendMessage({ message });
        return response.text;
    } catch (error) {
        console.error("Error sending message to ECO:", error);
        return "Oops! I'm having a little trouble connecting right now. Please try again later. 🛠️";
    }
};

export const getAIResponse = async (prompt: string, systemInstruction: string): Promise<string> => {
    try {
        const ai = getAiClient();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
            },
        });
        return response.text;
    } catch (error) {
        console.error("Error getting AI response:", error);
        return "Sorry, I couldn't generate a response. Please check your connection or try again.";
    }
};
