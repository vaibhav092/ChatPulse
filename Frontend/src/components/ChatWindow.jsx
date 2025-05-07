import React, { useContext, useState } from 'react'
import { ChatContext } from '../context/ChatContext'

function ChatWindow() {
    const { currentChat} = useContext(ChatContext)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])


    const handleSend = () => {
        if (message.trim() === '') return
        setMessages(prev => [...prev, { text: message, sender: 'me' }])
        setMessage('')
    }

    return (
        <div className="flex flex-col h-dvh w-full rounded-2xl">
            {/* Header */}
            <div className="p-4 bg-gray-800 border-b border-gray-700">
                <h2 className="text-white font-semibold text-lg">
                    {currentChat.username}
                </h2>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`max-w-xs p-2 rounded-lg text-white ${
                            msg.sender === 'me' ? 'bg-blue-600 ml-auto' : 'bg-gray-700'
                        }`}
                    >
                        {msg.text}
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
                    className="flex-1 py-2 px-3 rounded text-white focus:outline-none mr-2"
                />
                <button
                    onClick={handleSend}
                    className="bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700"
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default ChatWindow
