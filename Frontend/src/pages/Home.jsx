import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const { isAuthenticated, loading } = useAuth()
    const navigate = useNavigate()

    const containerClasses =
        'bg-indigo-900 min-h-screen w-full flex justify-center items-center overflow-hidden'

    if (loading) {
        return (
            <div className={containerClasses}>
                <p className="text-white text-xl">Loading...</p>
            </div>
        )
    }

    if (isAuthenticated) {
        return (
            <div className={containerClasses}>
                <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                        You are logged in!
                    </h1>
                    <p className="text-gray-600">Welcome back to ChatApp 🎉</p>
                    <button
                        className="bg-yellow-200 rounded-2xl px-4 py-2 text-lg font-semibold text-emerald-800 mt-4"
                        onClick={() => {
                            navigate('/chat')
                        }}
                    >
                        Go to Chat
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className={containerClasses}>
            <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Welcome to ChatApp
                </h1>
                <p className="text-gray-600">
                    Please login or register to start chatting!
                </p>
            </div>
        </div>
    )
}

export default Home
