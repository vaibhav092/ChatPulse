import React, { useContext, useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { getpfp, fetchContact } from '../utils/api.js'
import { ChatContext } from '../context/ChatContext'

function ChatList() {
    const {openChat}=useContext(ChatContext)
    const [searchValue, setSearchValue] = useState('')
    const [contact, setContact] = useState([])
    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
    }
    const handleSubmit = async () => {
        try {
            const query = searchValue.toLowerCase()
            const user = await getpfp(query)

            setContact((prev) => {
                if (!Array.isArray(prev)) return [user]

                const exists = prev.some((c) => c.id === user.id)
                return exists ? prev : [...prev, user]
            })
            setSearchValue('')
        } catch (error) {
            console.error('getpfp failed:', error)
            alert('User Not Found')
        }
    }

    useEffect(() => {
        const fetchInitialContacts = async () => {
            try {
                const data = await fetchContact()
                setContact(data.data)
            } catch (error) {
                console.log('Fetch Contact Error')
            }
        }
        fetchInitialContacts()
    }, [])
    return (
        <div className="relative z-10 flex flex-col w-100 h-dvh mt-2">
            <div>
                <input
                    onKeyDown={(e) => {
                        e.key == 'Enter' ? handleSubmit() : null
                    }}
                    type="text"
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder="Search chats..."
                    className="w-full py-2 pl-2 pr-12 bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                />
                <button
                    className="absolute right-4 text-gray-400 mt-2.5"
                    onClick={handleSubmit}
                >
                    <Search size={20} />
                </button>
            </div>
            <div className="mt-4 space-y-4">
                    {contact.map((data) => (
            <div
                key={data._id} // Ensure each div has a unique key
                className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition"
                onClick={() => openChat(data)}
            >
                <img
                    src={data.pfp}
                    alt={data.username}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-white font-medium">
                    {data.username}
                </span>
            </div>
        ))}

            </div>
        </div>
    )
}

export default ChatList
