import React, { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../context/ChatContext';
import { SocketContext } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import { fetchMessage } from '../utils/api';

function ChatWindow() {
    const { currentChat } = useContext(ChatContext);
    const { socket } = useContext(SocketContext);
    const { userId, isAuthenticated } = useAuth();

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSend = () => {
        if (message.trim() === '') return;

        const data = {
            senderId: userId,
            receiverId: currentChat._id,
            content: message,
        };

        socket.emit("sendMessage", data);

        // Optimistic UI update
        setMessages((prev) => [
            ...prev,
            {
                text: message,
                senderId: userId,
                receiverId: currentChat._id,
                timestamp: new Date().toISOString(),
            },
        ]);

        setMessage('');
    };

    useEffect(() => {
        if (!socket || !currentChat || !userId) return;

        socket.emit("setup", userId);

        const loadMessages = async () => {
            try {
                const res = await fetchMessage(currentChat._id);
                setMessages(res);
            } catch (err) {
                console.error("Failed to load messages", err);
            }
        };

        loadMessages();
        setMessages([]);

        // Listener for incoming messages
        socket.on("messageSent", (msg) => {
            if (msg.senderId === currentChat._id || msg.receiverId === currentChat._id) {
                setMessages((prev) => [...prev, msg]);
            }
        });
        console.log(userId);

        return () => {
            socket.off("messageSent");
        };
    }, [socket, currentChat, userId]);

    return (
        <div className="flex flex-col h-dvh w-full rounded-2xl">
            {/* Header */}
            <div className="p-4 bg-gray-800 border-b border-gray-700">
                <h2 className="text-white font-semibold text-lg">
                    {currentChat?.username || "Select a chat"}
                </h2>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`max-w-xs p-2 rounded-lg text-white ${
                            msg.senderId === userId ? 'bg-blue-600 ml-auto' : 'bg-gray-700'
                        }`}
                    >
                        {msg.content || msg.text}
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-700 bg-gray-800 flex items-center mb-11 rounded-2xl">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 py-2 px-3 rounded text-white focus:outline-none mr-2 bg-gray-900"
                />
                <button
                    onClick={handleSend}
                    className="bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700"
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatWindow;
