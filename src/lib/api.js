import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const stored = localStorage.getItem('tokens')
    if (stored) {
      const { access } = JSON.parse(stored)
      if (access) config.headers.Authorization = `Bearer ${access}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      error.message = 'Request timeout - please check if the backend server is running'
    } else if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
      error.message = 'Network error - cannot reach backend server at http://localhost:8000. Make sure the backend is running.'
    }
    return Promise.reject(error)
  }
)

export default api


