import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import { chats as initialChats } from "@/data/chats";

export type Message = {
  id: number;
  text: string;
  sender: "user" | "doctor";
  time: string;
};

export type Chat = {
  id: number;
  name: string;
  image: any;
  message: string;
  time: string;
  unread: number;
  messages?: Message[];
};

type ChatContextType = {
  chats: Chat[];
  openChat: (id: number) => void;
  updateLastMessage: (
    id: number,
    message: string,
    time: string
  ) => void;
};

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [chats, setChats] = useState<Chat[]>(
    initialChats as Chat[]
  );

  const openChat = (id: number) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === id
          ? { ...chat, unread: 0 }
          : chat
      )
    );
  };

  const updateLastMessage = (
    id: number,
    message: string,
    time: string
  ) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === id
          ? {
              ...chat,
              message,
              time,
            }
          : chat
      )
    );
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        openChat,
        updateLastMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChats() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error(
      "useChats must be used inside ChatProvider"
    );
  }

  return context;
}