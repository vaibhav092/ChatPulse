import React, { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../context/ChatContext';
import { SocketContext } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import { fetchMessage } from '../utils/api';

function ChatWindow() {
    const { currentChat } = useContext(ChatContext);
    const { socket } = useContext(SocketContext);
    const { userId } = useAuth();
    
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    
    const handleSend = () => {
        if (message.trim() === '' || !currentChat) return;
        
        const timestamp = new Date().toISOString();
        
        const data = {
            senderId: userId,
            receiverId: currentChat._id,
            content: message,
            timestamp 
        };
        
        socket.emit("sendMessage", data);
        
        // Add message to local state immediately for UI responsiveness
        setMessages((prev) => [
            ...prev,
            {
                content: message,
                senderId: userId,
                receiverId: currentChat._id,
                timestamp: timestamp,
            },
        ]);
        
        setMessage('');
    };
    
    // Don't add useEffect dependency on locallyAddedMessages to avoid re-renders
    useEffect(() => {
        if (!socket || !currentChat || !userId) return;
        
        // Setup socket connection with user ID
        socket.emit("setup", userId);
        
        // Join the chat room
        socket.emit("joinChat", currentChat._id);
        
        const loadMessages = async () => {
            try {
                console.log("Fetching messages for chat:", currentChat._id);
                const res = await fetchMessage(currentChat._id);
                console.log("Messages loaded:", res);
                setMessages(res || []);
                // Reset locally added messages when loading a new chat
            } catch (err) {
                console.error("Failed to load messages", err);
                setMessages([]);
            }
        };
        
        loadMessages();
        
        // Listen for incoming messages
        socket.on("receiveMessage", (msg) => {
            console.log("Received message:", msg);
            
            // Only add if it's from the other person, not our own messages
            if (msg.senderId !== userId) {
                setMessages((prev) => [...prev, msg]);
            }
        });
        
        return () => {
            socket.off("receiveMessage");
        };
    }, [socket, currentChat]);
    
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
                        {msg.content}
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