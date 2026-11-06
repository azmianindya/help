import axios from 'axios'
import { setupInterceptors } from '@/lib/interceptors'

export const api = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

setupInterceptors(api)