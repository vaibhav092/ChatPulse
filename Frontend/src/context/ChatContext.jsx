import { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const [currentChat, setCurrentChat] = useState("No one");

    const openChat = (chatId) => {
        setCurrentChat(chatId);
    };

    return (
        <ChatContext.Provider value={{ currentChat, openChat }}>
            {children}
        </ChatContext.Provider>
    );
};