import React, { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../context/ChatContext';
import MessageBox from './MessageBox.jsx'; // typing component
import MessageBubble from './Message.jsx'; // rendering messages
import { SocketContext } from "../context/SocketContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function ChatWindow() {
    const { username } = useAuth();
    const { socket } = useContext(SocketContext);
    const { currentChat } = useContext(ChatContext);
    const [messages, setMessages] = useState([]);

    // Emit 'setup' when username is available
    useEffect(() => {
        if (username) {
            console.log("Emitting setup for:", username); // ✅ Confirm this logs
            socket.emit("setup", username);
        }
    }, [socket, username]);

    // Handling the sending of a message
    const handleSendMessage = (newMessage) => {
        const msg = {
            message: newMessage,
            isSender: true,
            timestamp: new Date().toLocaleTimeString(),
        };

        // Emit 'sendMessage' with the correct usernames and content
        socket.emit("sendMessage", {
            senderUsername: username,  // sender's username
            receiverUsername: currentChat,  // receiver's username (assuming currentChat holds the receiver's username)
            content: newMessage,
        });

        // Update the state with the new message (non-async update)
        setMessages((prevMessages) => [...prevMessages, msg]);
    };
    return (
        <div className="flex flex-col h-full bg-gradient-to-r from-slate-900 to-blue-950 rounded text-amber-50 text-xl font-bold">
            {/* Header */}
            <div className="p-4 border-b border-slate-700">
                Chatting with: {currentChat}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-2">
                {messages.length === 0 ? (
                    <p className="text-gray-400 italic px-4">No messages yet...</p>
                ) : (
                    messages.map((msg, i) => (
                        <MessageBubble
                            key={i}
                            message={msg.message}
                            isSender={msg.isSender}
                            timestamp={msg.timestamp}
                        />
                    ))
                )}
            </div >
                <div className='mb-7'>

            {/* Typing box */}
            <MessageBox onSend={handleSendMessage} />
                </div>
        </div>
    );
}

export default ChatWindow;
