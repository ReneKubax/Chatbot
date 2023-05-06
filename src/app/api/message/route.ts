import { chatbotPrompt } from "@/app/helpers/constants/chatbot-prompt";
import { chatGPTMessage } from "@/lib/openai-stream";
import { MessageArraySchema } from "@/lib/validators/message";

export async function POST(req: Request) {
    const { messages } = await req.json();

    const parsedMessages = MessageArraySchema.parse(messages);

    const outboundMessages: chatGPTMessage[] = parsedMessages.map((message) => ({
        role: message.isUserMessage ? "user" : "system",
        content: message.text
    }))

    outboundMessages.unshift({
        role: "system",
        content: chatbotPrompt
    })
}