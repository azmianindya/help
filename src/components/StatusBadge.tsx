import type { TicketStatus } from '@/lib/types'

type StatusBadgeProps = {
  status: TicketStatus
}

const statusStyle: Record<TicketStatus, string> = {
  Open: 'bg-blue-100 text-blue-600',
  'In Progress': 'bg-orange-100 text-orange-600',
  Resolved: 'bg-green-100 text-green-600',
  Closed: 'bg-slate-100 text-slate-600',
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <div
      className={`inline-block whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium ${statusStyle[status]}`}
    >
      {status}
    </div>
  )
}

export default StatusBadge