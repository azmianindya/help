import { api } from '@/lib/api'
import type {
  CreateTicketInput,
  DummyCommentsResponse,
  DummyPost,
  DummyPostsResponse,
  Ticket,
  TicketCategory,
  TicketComment,
  TicketPriority,
  TicketStats,
  TicketStatus,
} from '@/lib/types'

const HOUR_MS = 3_600_000
const MINUTE_MS = 60_000
const TICKET_START = Date.UTC(2026, 8, 22, 8, 0)

// DummyJSON posts tidak punya status, prioritas, kategori, dan tanggal.
// Nilainya diambil dari pola berdasarkan id supaya selalu sama setiap kali load.
const STATUS_CYCLE: TicketStatus[] = [
  'Open',
  'In Progress',
  'Resolved',
  'Open',
  'Resolved',
  'In Progress',
  'Resolved',
  'Closed',
  'Open',
  'Resolved',
]
const PRIORITY_CYCLE: TicketPriority[] = ['Medium', 'High', 'Low', 'Medium', 'Low', 'High', 'Medium']
const CATEGORY_CYCLE: TicketCategory[] = ['Hardware', 'Software', 'Access', 'Account']

// id ticket baru dari frontend dimulai setelah id terakhir DummyJSON (251)
let nextLocalId = 252
const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

export function toTicket(post: DummyPost, overrides: Partial<Ticket> = {}): Ticket {
  const createdAt = TICKET_START + post.id * 4 * HOUR_MS
  const updatedAt = createdAt + ((post.id % 5) + 1) * 15 * MINUTE_MS

  return {
    id: post.id,
    code: `#TK-${1000 + post.id}`,
    title: post.title,
    description: post.body,
    category: CATEGORY_CYCLE[(post.id + Math.floor(post.id / 4)) % CATEGORY_CYCLE.length],
    priority: PRIORITY_CYCLE[post.id % PRIORITY_CYCLE.length],
    status: STATUS_CYCLE[post.id % STATUS_CYCLE.length],
    requesterId: post.userId,
    createdAt: new Date(createdAt).toISOString(),
    updatedAt: new Date(updatedAt).toISOString(),
    ...overrides,
  }
}

// limit: 0 artinya ambil semua data, jadi filter status/kategori, search lokal,
// dan pagination dikerjakan di features/tickets. Urutan: terbaru dulu.
export async function getTickets(search?: string): Promise<Ticket[]> {
  const { data } = await api.get<DummyPostsResponse>(search ? '/posts/search' : '/posts', {
    params: { q: search || undefined, limit: 0, select: 'title,body,userId' },
  })

  return data.posts.map((post) => toTicket(post)).sort((a, b) => b.id - a.id)
}

export async function getTicketById(id: number): Promise<Ticket> {
  const { data } = await api.get<DummyPost>(`/posts/${id}`)
  return toTicket(data)
}

export async function getTicketComments(ticketId: number): Promise<TicketComment[]> {
  const { data } = await api.get<DummyCommentsResponse>(`/posts/${ticketId}/comments`)
  const ticket = toTicket({ id: ticketId, title: '', body: '', tags: [], userId: 0 })
  const base = new Date(ticket.createdAt).getTime()

  return data.comments.map((comment, index) => ({
    id: comment.id,
    ticketId: comment.postId,
    body: comment.body,
    author: comment.user,
    createdAt: new Date(base + (index + 1) * HOUR_MS).toISOString(),
  }))
}

// DummyJSON tidak menyimpan data, jadi hasilnya harus dimasukkan
// ke state di frontend oleh pemanggilnya.
export async function createTicket(input: CreateTicketInput, requesterId: number): Promise<Ticket> {
  await api.post('/posts/add', {
    title: input.title,
    body: input.description,
    userId: requesterId,
  })

  // DummyJSON selalu mengembalikan id yang sama untuk setiap post baru,
  // jadi id dibuat sendiri supaya tiap ticket baru unik.
  const now = new Date().toISOString()

  return toTicket(
    {
      id: nextLocalId++,
      title: input.title,
      body: input.description,
      tags: [],
      userId: requesterId,
    },
    {
      category: input.category,
      priority: input.priority,
      status: 'Open',
      createdAt: now,
      updatedAt: now,
    },
  )
}

// Simulasi saja: tidak ada request ke server, hanya delay supaya loading state terlihat.
export async function updateTicketStatus(
  status: TicketStatus,
): Promise<{ status: TicketStatus; updatedAt: string }> {
  await wait(400)
  return { status, updatedAt: new Date().toISOString() }
}

export function getTicketStats(tickets: Ticket[]): TicketStats {
  const count = (status: TicketStatus) => tickets.filter((ticket) => ticket.status === status).length

  return {
    total: tickets.length,
    open: count('Open'),
    inProgress: count('In Progress'),
    resolved: count('Resolved'),
    closed: count('Closed'),
  }
}