import React, { useContext, useEffect, useState,useCallback } from 'react';
import { fetchContact, getpfp } from '../utils/api';
import { ChatContext } from '../context/ChatContext';

function ChatList() {
    const { openChat } = useContext(ChatContext);

    const [dataSend, setDataSend] = useState([]);
    const [searchUsername, setSearchUsername] = useState("");
    const fetchData = useCallback(() => {
        fetchContact()
            .then(contacts => setDataSend(contacts.data))
            .catch(err => console.error(err));
      }, []); // If fetchContact is static or imported, it's safe here. Add dependencies if needed.
    
        useEffect(() => {
        fetchData();
        }, [fetchData]);
    const handleSearch = async () => {
        try {
            const data1 = await getpfp(searchUsername.trim());

            if (!data1 || !data1.pfp) {
                alert("User not found");
                return;
            }

            // Avoid duplicates
            if (!dataSend.some(user => user.username === data1.username)) {
                setDataSend(prev => [ data1,...prev]);
            }

            setSearchUsername(""); // Clear input after search
        } catch (error) {
            console.error("Error fetching user:", error);
            alert("User not found");
        }
    };

    const handleInputChange = (e) => {
        setSearchUsername(e.target.value);
    };

    return (
        <div className='bg-[#FFD1DC] rounded p-4 overflow-y-auto h-screen'>
            <div className='flex gap-2 mb-4'>
                <input 
                    type='text' 
                    className='px-3 py-2 rounded-full bg-amber-50 w-full text-black' 
                    value={searchUsername}  
                    onChange={handleInputChange}
                    placeholder="Search username"
                />
                <button 
                    className='bg-green-500 px-4 py-2 text-white rounded-2xl'
                    onClick={handleSearch}
                >
                    Add
                </button>
            </div>

            {/* Conditional rendering here */}
            {dataSend.length === 0 ? (
                <p className='text-center text-gray-700 mt-10 font-medium'>
                    Add more users to chat 👥
                </p>
            ) : (
                <div className="flex flex-col gap-3">
                    {dataSend.map((data, index) => (
                        <button 
                            key={index} 
                            onClick={() => openChat(data.username)}
                            className='text-left'
                        >
                            <div className='flex items-center border border-white rounded-2xl px-3 py-2 bg-white shadow'>
                                <img 
                                    src={data.pfp} 
                                    alt="Profile" 
                                    className='w-12 h-12 rounded-full object-cover'
                                />
                                <h1 className='ml-4 text-lg font-semibold text-gray-800'>
                                    {data.username}
                                </h1>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ChatList;
