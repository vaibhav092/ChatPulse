import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { MessageSquare, LogIn, UserPlus, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { logout } from '../utils/api'

function Navbar() {
    const { isAuthenticated, setIsAuthenticated } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const handleLogout = async () => {
        try {
            await logout()
            setIsAuthenticated(false)
            navigate('/')
        } catch (error) {
            console.log(isAuthenticated)
            console.error('Logout failed:', error)
        }
    }

    return (
        <nav className="bg-sky-500 text-white p-2 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link
                    to="/"
                    className="flex items-center space-x-2 hover:text-sky-100"
                >
                    <MessageSquare className="h-6 w-6" />
                    <span className="text-xl font-bold">ChatApp</span>
                </Link>
                <div className="flex items-center space-x-4">
                    {!isAuthenticated ? (
                        <>
                            <Link
                                to="/login"
                                className={`flex items-center space-x-1 hover:text-sky-100 ${
                                    location.pathname === '/login'
                                        ? 'text-sky-200'
                                        : ''
                                }`}
                            >
                                <LogIn className="h-5 w-5" />
                                <span>Login</span>
                            </Link>
                            <Link
                                to="/register"
                                className={`flex items-center space-x-1 hover:text-sky-100 ${
                                    location.pathname === '/register'
                                        ? 'text-sky-200'
                                        : ''
                                }`}
                            >
                                <UserPlus className="h-5 w-5" />
                                <span>Register</span>
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-1 hover:text-sky-100"
                        >
                            <LogOut className="h-5 w-5" />
                            <span>Logout</span>
                        </button>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
