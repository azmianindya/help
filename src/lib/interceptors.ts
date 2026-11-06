import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/lib/auth-store'
import type { DummyRefreshResponse } from '@/lib/types'

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean }
const AUTH_PATHS = ['/auth/login', '/auth/refresh']

// Satu promise refresh dipakai bersama, supaya request 401 yang datang barengan
// tidak memanggil /auth/refresh berkali-kali.
let refreshPromise: Promise<string> | null = null

function refreshAccessToken(instance: AxiosInstance): Promise<string> {
  if (!refreshPromise) {
    const { refreshToken } = useAuthStore.getState()

    // Pakai axios biasa (bukan instance) supaya tidak lewat interceptor ini lagi.
    refreshPromise = axios
      .post<DummyRefreshResponse>(`${instance.defaults.baseURL}/auth/refresh`, {
        refreshToken,
        expiresInMins: 30,
      })
      .then(({ data }) => {
        useAuthStore.getState().setTokens(data.accessToken, data.refreshToken)
        return data.accessToken
      })
      .finally(() => {
        refreshPromise = null
      })
  }

  return refreshPromise
}

function forceLogout() {
  useAuthStore.getState().logout()
  if (window.location.pathname !== '/login') {
    window.location.href = '/login'
  }
}

export function setupInterceptors(instance: AxiosInstance) {
  // Request: tambahkan header Authorization kalau sudah login
  instance.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState()

    if (accessToken && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    
    return config
  })

  // Response: kalau 401, coba refresh token sekali lalu ulangi request
  instance.interceptors.response.use(
    (response) => response,
    async (error: unknown) => {
      if (!axios.isAxiosError(error) || !error.config) {
        return Promise.reject(error)
      }

      const original = error.config as RetryConfig
      const isAuthRequest = AUTH_PATHS.some((path) => original.url?.includes(path))

      if (error.response?.status !== 401 || isAuthRequest) {
        return Promise.reject(error)
      }

      const { refreshToken } = useAuthStore.getState()

      if (original._retry || !refreshToken) {
        forceLogout()
        return Promise.reject(error)
      }

      original._retry = true

      try {
        const newToken = await refreshAccessToken(instance)
        original.headers.Authorization = `Bearer ${newToken}`
        return instance(original)
      } catch (refreshError) {
        forceLogout()
        return Promise.reject(refreshError)
      }
    },
  )
}