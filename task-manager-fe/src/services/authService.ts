import axiosInstance from '@/lib/axiosInstance'

export const login = (answer: string) => axiosInstance.post('/auth/login', { answer })
