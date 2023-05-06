export type ChatGPTAgent = "user" | "system";

export interface chatGPTMessage {
    role: ChatGPTAgent;
    content: string;
}
