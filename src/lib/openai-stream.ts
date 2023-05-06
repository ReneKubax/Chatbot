import { ParsedEvent, ReconnectInterval, createParser } from "eventsource-parser";

export type ChatGPTAgent = "user" | "system";

export interface chatGPTMessage {
    role: ChatGPTAgent;
    content: string;
}


export interface openAIStreamPayload  {
    model: string,
    messages: chatGPTMessage[],
    temperature: number,
    top_p: number,
    frecuency_penalty: number,
    presence_penalty: number,
    max_tokens: number,
    stream: boolean,
    n: number
}

export async function openAIStream(payload: openAIStreamPayload) {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    let counter = 0;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify(payload),
    })
    const stream = new ReadableStream({
        async start(controller) {
            function onParse(event: ParsedEvent | ReconnectInterval) {
               if(event.type === 'event'){
                const data = event.data
                if(data === '[Done]'){
                    controller.close();
                    return
                }
                try {
                    const json = JSON.parse(data)
                    console.log("json", json)
                    const text = json.choices[0].delta?.content || ''
                    console.log('text', text)

                    if(counter < 2 && (text.match(/\n/) || []).lenght ){
                        return
                    }

                    const queue = encoder.encode(text)
                    controller.enqueue(queue)

                    counter++

                } catch (error) {
                    controller.error(error);
                }
               }
            }
            const parser = createParser(onParse);

            for await(const chunk of res.body as any){
                parser.feed(decoder.decode(chunk));
            }
        }
    })
    return stream
}