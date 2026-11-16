import { AppWindow, KeyRound, Laptop, UserRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { TICKET_CATEGORIES, TICKET_PRIORITIES, TICKET_STATUSES } from '@/lib/types'
import type { TicketCategory, TicketStatus } from '@/lib/types'

export type Option = {
  value: string
  label: string
}

// nilai filter untuk "semua"
export const ALL = 'all'

export const PAGE_SIZE = 10

export const statusFilterOptions: Option[] = [
  { value: ALL, label: 'Semua Status' },
  ...TICKET_STATUSES.map((status) => ({ value: status, label: status })),
]

export const categoryFilterOptions: Option[] = [
  { value: ALL, label: 'Semua Kategori' },
  ...TICKET_CATEGORIES.map((category) => ({ value: category, label: category })),
]

// opsi untuk form buat tiket
export const categoryOptions: Option[] = TICKET_CATEGORIES.map((category) => ({
  value: category,
  label: category,
}))

export const priorityOptions: Option[] = TICKET_PRIORITIES.map((priority) => ({
  value: priority,
  label: priority,
}))

export const categoryIcons: Record<TicketCategory, LucideIcon> = {
  Hardware: Laptop,
  Software: AppWindow,
  Access: KeyRound,
  Account: UserRound,
}

// urutan tahap yang ditampilkan di halaman detail
export const progressSteps: TicketStatus[] = ['Open', 'In Progress', 'Resolved']

export const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf']
export const MAX_FILE_SIZE = 5 * 1024 * 1024