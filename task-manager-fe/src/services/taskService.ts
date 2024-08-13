import axiosInstance from '@/lib/axiosInstance'
import type { TodoCreate, TodoUpdate } from '@/types'

export const getTasks = () => axiosInstance.get('/task')
export const getTaskById = (id: string) => axiosInstance.get(`/task/${id}`)
export const createTask = (data: TodoCreate) => axiosInstance.post('/task', data)
export const updateTask = (id: string, data: TodoUpdate) => axiosInstance.patch(`/task/${id}`, data)
