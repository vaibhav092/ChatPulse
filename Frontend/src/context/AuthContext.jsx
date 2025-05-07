import React, { createContext, useContext, useState, useEffect } from 'react'
import { checkAuth } from '../utils/api'

const AuthContext = createContext(undefined)

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const [userId, setUserId] = useState('')

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const data = await checkAuth()
                if (data) {
                    setUserId(data.id)
                }
                setIsAuthenticated(true)
            } catch (error) {
                setIsAuthenticated(false)
            } finally {
                setLoading(false)
            }
        }

        verifyAuth()
    }, [])

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, setIsAuthenticated, loading, userId }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
