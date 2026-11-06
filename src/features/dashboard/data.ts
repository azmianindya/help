import { CircleCheck, Clock, LoaderCircle, Ticket } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { TicketStats } from '@/lib/types'

// Jumlah notifikasi yang belum dibaca (data statis)
export const NOTIFICATION_COUNT = 3

export type StatCardConfig = {
  key: 'total' | 'open' | 'inProgress' | 'resolved'
  label: string
  // perubahan dibanding periode sebelumnya, dalam persen (data statis)
  trend: number
  icon: LucideIcon
  iconClassName: string
}

export const statCards: StatCardConfig[] = [
  {
    key: 'total',
    label: 'Total Ticket',
    trend: 12,
    icon: Ticket,
    iconClassName: 'bg-[#6553E8]/10 text-[#6553E8]',
  },
  {
    key: 'open',
    label: 'Open',
    trend: 5,
    icon: Clock,
    iconClassName: 'bg-blue-100 text-blue-600',
  },
  {
    key: 'inProgress',
    label: 'In Progress',
    trend: -2,
    icon: LoaderCircle,
    iconClassName: 'bg-orange-100 text-orange-600',
  },
  {
    key: 'resolved',
    label: 'Resolved',
    trend: 8,
    icon: CircleCheck,
    iconClassName: 'bg-green-100 text-green-600',
  },
]

export type StatusChartItem = {
  key: Exclude<keyof TicketStats, 'total'>
  label: string
  color: string
}

export const statusChartItems: StatusChartItem[] = [
  { key: 'open', label: 'Open', color: '#3B82F6' },
  { key: 'inProgress', label: 'In Progress', color: '#F59E0B' },
  { key: 'resolved', label: 'Resolved', color: '#22C55E' },
  { key: 'closed', label: 'Closed', color: '#94A3B8' },
]