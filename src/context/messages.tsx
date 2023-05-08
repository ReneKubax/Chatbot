import { Message } from "@/lib/validators/message";
import { nanoid } from "nanoid";
import { ReactNode, createContext, useState } from "react";

export const MessagesContext = createContext<{
  messages: Message[]
  isMessageUpdating: boolean
  addMessage: (message: Message) => void
  removeMessage: (id: string) => void
  updateMessage: (id: string, updateFn: (prevText: string) => string) => void
  setIsMessageUpdating: (isUpdating: boolean) => void
}>({
  messages: [],
  isMessageUpdating: false,
  addMessage: () => {},
  removeMessage: () => {},
  updateMessage: () => {},
  setIsMessageUpdating: () => {},
})

export function MessagesProvider({children}: {children: ReactNode}) {

    const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false)

    const [messages, setMessages] = useState<Message[]>([
        {
            id: nanoid(),
            isUserMessage: true,
            text: 'Hello, how can i help you?'
        }
    ])

    const addMessage = (message: Message) => {
        setMessages((prev)=> [...prev, message])
    }

    const removeMessage = (id: string) => {
        setMessages((prev)=> prev.filter((message) => message.id !== id))
    }

    const updateMessage = (id: string, updateFn: (prevText: string) => string) => {
        setMessages((prev)=> prev.map((message) => message.id === id ? {...message, text: updateFn(message.text)} : message))
    }


  return (
    <MessagesContext.Provider value={{
      messages,
      addMessage,
      removeMessage,
      updateMessage,
      isMessageUpdating,
      setIsMessageUpdating
    }}>
      {children}
    </MessagesContext.Provider>
  )
}