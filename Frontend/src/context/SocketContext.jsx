import { createContext, useState } from 'react'
import { socket as socketInstance } from '../Socket'

export const SocketContext = createContext()

export const SocketContextProvider = ({ children }) => {
    const [socket] = useState(socketInstance)

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}
