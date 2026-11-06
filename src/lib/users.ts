import { api } from '@/lib/api'
import type { AuthSession, DummyLoginResponse, DummyUser, DummyUsersResponse, User, UserRole } from '@/lib/types'

const DAY_MS = 86_400_000
const USER_FIELDS = 'firstName,lastName,username,email,phone,image,role,company'

// Role DummyJSON dipetakan ke role HelpDesk
const ROLE_MAP: Record<string, UserRole> = {
  admin: 'Admin',
  moderator: 'IT Support',
  user: 'Employee',
}

// DummyJSON tidak punya status aktif dan tanggal bergabung,
// jadi dibuat dari id supaya nilainya selalu sama setiap kali load.
export function toUser(raw: DummyUser): User {
  return {
    id: raw.id,
    firstName: raw.firstName,
    lastName: raw.lastName,
    fullName: `${raw.firstName} ${raw.lastName}`,
    username: raw.username,
    email: raw.email,
    phone: raw.phone,
    image: raw.image,
    role: ROLE_MAP[raw.role] ?? 'Employee',
    department: raw.company?.department ?? '-',
    isActive: raw.id % 7 !== 0,
    joinedAt: new Date(Date.UTC(2026, 0, 1) + (raw.id % 90) * DAY_MS).toISOString(),
  }
}

export async function login(username: string, password: string): Promise<AuthSession> {
  const { data } = await api.post<DummyLoginResponse>('/auth/login', {
    username,
    password,
    expiresInMins: 30,
  })

  // Response login tidak berisi role, jadi ambil data lengkap dari /auth/me.
  // Token dikirim manual karena belum tersimpan di store.
  const me = await api.get<DummyUser>('/auth/me', {
    headers: { Authorization: `Bearer ${data.accessToken}` },
  })

  return {
    user: toUser(me.data),
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  }
}

export async function getCurrentUser(): Promise<User> {
  const { data } = await api.get<DummyUser>('/auth/me')
  return toUser(data)
}

// limit: 0 artinya ambil semua data, jadi filter role dan pagination
// dikerjakan di features/users.
export async function getUsers(search?: string): Promise<User[]> {
  const { data } = await api.get<DummyUsersResponse>(search ? '/users/search' : '/users', {
    params: { q: search || undefined, limit: 0, select: USER_FIELDS },
  })

  return data.users.map(toUser)
}

export async function getUserById(id: number): Promise<User> {
  const { data } = await api.get<DummyUser>(`/users/${id}`)
  return toUser(data)
}