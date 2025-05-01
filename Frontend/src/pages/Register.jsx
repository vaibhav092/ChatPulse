import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../utils/api'
import { useAuth } from '../context/AuthContext.jsx'

const Register = () => {
    const navigate = useNavigate()
    const { setIsAuthenticated } = useAuth()
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        pfp: null,
    })

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, pfp: e.target.files[0] })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        try {
            const submitData = new FormData()
            submitData.append('email', formData.email)
            submitData.append('username', formData.username)
            submitData.append('password', formData.password)
            if (formData.pfp) {
                submitData.append('pfp', formData.pfp)
            }

            await register(submitData)
            setIsAuthenticated(true)
            navigate('/')
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed')
        }
    }

    return (
        <div className=" h-screen  bg-yellow-200 flex flex-col justify-center">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 mt-38">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Create an Account
                </h2>
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    username: e.target.value,
                                })
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    confirmPassword: e.target.value,
                                })
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Profile Picture
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-sky-50 file:text-sky-700
              hover:file:bg-sky-100"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Link
                            to="/login"
                            className="text-sm text-sky-600 hover:text-sky-500"
                        >
                            Already have an account? Login
                        </Link>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
            <div className="w-100 h-120"></div>
        </div>
    )
}

export default Register
