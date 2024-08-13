import axios from 'axios'
import { useToast } from 'vue-toast-notification'

const toast = useToast()

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('accessToken')
      toast.error('Session expired. Please log in again.')
      setTimeout(() => {
        window.location.href = '/'
      }, 1000)
    }
    console.error('Axios Error:', error.response || error.message)
    return Promise.reject(error)
  }
)

export default axiosInstance
