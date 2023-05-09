import { MessagesContext } from "@/context/messages";
import { FC, HTMLAttributes, useContext } from "react";

interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement>{}

const ChatMessages: FC<ChatMessagesProps> = ({className, ...props}) => {
    const {messages} = useContext(MessagesContext)
    return <div {...props}>ChatMessages</div>
}

export default ChatMessages