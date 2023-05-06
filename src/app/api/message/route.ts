import { chatbotPrompt } from "@/app/helpers/constants/chatbot-prompt";
import { chatGPTMessage, openAIStream, openAIStreamPayload } from "@/lib/openai-stream";
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

    const payload: openAIStreamPayload = {
        model: 'gpt-3.5-turbo',
        messages: outboundMessages,
        temperature: 0.4,
        top_p: 1,
        frecuency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 150,
        stream: true,
        n: 1
    }

    const stream = await openAIStream(payload);

    return new Response(stream);
}