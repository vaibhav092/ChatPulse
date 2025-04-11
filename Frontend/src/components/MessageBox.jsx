import React, { useState } from 'react';
import { Send } from 'lucide-react'; // Make sure lucide-react is installed

function MessageBox({ onSend }) {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        const trimmed = message.trim();
        if (trimmed) {
            onSend(trimmed);
            setMessage("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className='p-3 border-t border-gray-300 h-20'>
            <div className='flex gap-2 h-10'>
                <input
                    type='text'
                    className='flex-1 px-4 py-2 rounded-full bg-amber-50 text-black focus:outline-none'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                />
                <button
                    onClick={handleSend}
                    className='bg-green-500 hover:bg-green-600 px-4 py-2 text-white rounded-full flex items-center justify-center'
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
}

export default MessageBox;
