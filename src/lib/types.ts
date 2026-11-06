// ===== Konstanta (dipakai juga untuk filter, select, dan schema) =====
export const TICKET_STATUSES = ['Open', 'In Progress', 'Resolved', 'Closed'] as const
export const TICKET_PRIORITIES = ['Low', 'Medium', 'High'] as const
export const TICKET_CATEGORIES = ['Hardware', 'Software', 'Access', 'Account'] as const
export const USER_ROLES = ['Admin', 'IT Support', 'Employee'] as const

export type TicketStatus = (typeof TICKET_STATUSES)[number]
export type TicketPriority = (typeof TICKET_PRIORITIES)[number]
export type TicketCategory = (typeof TICKET_CATEGORIES)[number]
export type UserRole = (typeof USER_ROLES)[number]

// ===== Tipe aplikasi =====
export type User = {
  id: number
  firstName: string
  lastName: string
  fullName: string
  username: string
  email: string
  phone: string
  image: string
  role: UserRole
  department: string
  isActive: boolean
  joinedAt: string
}

export type AuthSession = {
  user: User
  accessToken: string
  refreshToken: string
}

export type Ticket = {
  id: number
  code: string
  title: string
  description: string
  category: TicketCategory
  priority: TicketPriority
  status: TicketStatus
  requesterId: number
  createdAt: string
  updatedAt: string
}

export type TicketComment = {
  id: number
  ticketId: number
  body: string
  author: {
    id: number
    username: string
    fullName: string
  }
  createdAt: string
}

export type TicketStats = {
  total: number
  open: number
  inProgress: number
  resolved: number
  closed: number
}

export type CreateTicketInput = {
  title: string
  description: string
  category: TicketCategory
  priority: TicketPriority
}

// ===== Response mentah dari DummyJSON =====
export type DummyUser = {
  id: number
  firstName: string
  lastName: string
  username: string
  email: string
  phone: string
  image: string
  role: string
  company: {
    department: string
    name: string
    title: string
  }
}

export type DummyUsersResponse = {
  users: DummyUser[]
  total: number
  skip: number
  limit: number
}

export type DummyPost = {
  id: number
  title: string
  body: string
  tags: string[]
  userId: number
}

export type DummyPostsResponse = {
  posts: DummyPost[]
  total: number
  skip: number
  limit: number
}

export type DummyComment = {
  id: number
  body: string
  postId: number
  likes: number
  user: {
    id: number
    username: string
    fullName: string
  }
}

export type DummyCommentsResponse = {
  comments: DummyComment[]
  total: number
  skip: number
  limit: number
}

export type DummyLoginResponse = {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  accessToken: string
  refreshToken: string
}

export type DummyRefreshResponse = {
  accessToken: string
  refreshToken: string
}