import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { SocketContextProvider } from './context/SocketContext.jsx'
import { ChatContextProvider } from './context/ChatContext.jsx'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
            <SocketContextProvider>
            <ChatContextProvider>
                <App />
            </ChatContextProvider>
    </SocketContextProvider>
        </AuthProvider>
)
