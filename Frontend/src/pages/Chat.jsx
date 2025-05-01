import React from 'react'
import ChatList from '../components/ChatList'
import ChatWindow from '../components/ChatWindow'

function Chat() {
    return (
        <div className="flex h-full">
            <div className="w-130">
                <ChatList />
            </div>
            <div className="flex-1">
                <ChatWindow />
            </div>
        </div>
    )
}

export default Chat
