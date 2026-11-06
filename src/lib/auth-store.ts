import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthSession, User } from '@/lib/types'

type AuthState = {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  setSession: (session: AuthSession) => void
  setUser: (user: User) => void
  setTokens: (accessToken: string, refreshToken: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,

      setSession: ({ user, accessToken, refreshToken }) =>
        set({ user, accessToken, refreshToken }),

      setUser: (user) => set({ user }),
      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
      logout: () => set({ user: null, accessToken: null, refreshToken: null }),
    }),
    {
      name: 'helpdesk-auth',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    },
  ),
)