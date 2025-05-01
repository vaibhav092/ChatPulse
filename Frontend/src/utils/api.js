import axios from 'axios'

const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
})

let accessToken = null

export const setAccessToken = (token) => {
    accessToken = token
}

api.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const res = await api.post('/refresh')
                const newToken = res.data.accessToken

                setAccessToken(newToken)

                originalRequest.headers['Authorization'] = `Bearer ${newToken}`
                return api(originalRequest)
            } catch (refreshError) {
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)

export const register = async (formData) => {
    const res = await api.post('/user/register', formData)
    return res.data
}

export const login = async (username, password) => {
    const res = await api.post('/user/login', { username, password })
    setAccessToken(res.data.accessToken)
    return res.data
}

export const logout = async () => {
    const res = await api.post('/user/logout')
    setAccessToken(null)
    return res.data
}

export const checkAuth = async () => {
    const res = await api.get('/user/islogin')
    return res.data
}

export const getpfp = async (username) => {
    const res = await api.post('/user/getpfp', { username })
    return res.data
}

export const fetchContact = async () => {
    const res = await api.get('/user/getContacts')
    return res.data
}

export default api
