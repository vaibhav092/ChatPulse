import React, { useContext } from 'react'
import ChatList from '../components/ChatList'
import ChatWindow from '../components/ChatWindow'
import { ChatContext } from '../context/ChatContext'

function Chat() {
    const { currentChat } = useContext(ChatContext)

    return (
        <div className="relative flex w-full h-dvh">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-gradient-to-br from-black to-blue-900 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(59, 130, 246, 0.2) 1px, transparent 1px), 
                                        linear-gradient(to bottom, rgba(59, 130, 246, 0.2) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                    }}
                ></div>
            </div>

            {/* Chat Layout */}
            <div className="flex w-full relative z-10">
                {/* Chat List Panel */}
                <div className="w-101 border-r border-gray-700">
                    <ChatList />
                </div>

                {/* Chat Window or Placeholder */}
                <div className="flex-1">
                    {currentChat ? (
                        <ChatWindow />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400 text-lg">
                            Select a chat to start messaging
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Chat
