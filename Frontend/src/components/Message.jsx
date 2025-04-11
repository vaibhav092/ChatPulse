// MessageBubble.jsx
import React from 'react';

function Message({ message, isSender, timestamp }) {
    return (
        <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-2 px-4`}>
            <div className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl shadow 
                ${isSender ? 'bg-green-400 text-white rounded-br-none' : 'bg-white text-black rounded-bl-none'}`}>
                <p className="text-sm">{message}</p>
                {timestamp && (
                    <p className="text-[10px] text-right text-gray-200 mt-1">
                        {timestamp}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Message;
