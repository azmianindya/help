import type { TicketPriority } from '@/lib/types'

type PriorityBadgeProps = {
  priority: TicketPriority
}

const priorityStyle: Record<TicketPriority, string> = {
  Low: 'bg-emerald-100 text-emerald-600',
  Medium: 'bg-amber-100 text-amber-600',
  High: 'bg-red-100 text-red-600',
}

const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  return (
    <div
      className={`inline-block whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium ${priorityStyle[priority]}`}
    >
      {priority}
    </div>
  )
}

export default PriorityBadge