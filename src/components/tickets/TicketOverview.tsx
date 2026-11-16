import { Check } from 'lucide-react'
import PriorityBadge from '@/components/PriorityBadge'
import { categoryIcons, progressSteps } from '@/features/tickets/data'
import { formatDateTime } from '@/lib/format'
import type { Ticket } from '@/lib/types'

type TicketOverviewProps = {
  ticket: Ticket
  requesterName: string
}

const TicketOverview = ({ ticket, requesterName }: TicketOverviewProps) => {
  const CategoryIcon = categoryIcons[ticket.category]

  // Closed dianggap sudah melewati semua tahap
  const currentIndex =
    ticket.status === 'Closed' ? progressSteps.length - 1 : progressSteps.indexOf(ticket.status)
  const lastIndex = progressSteps.length - 1

  const getStepDate = (index: number) => {
    if (index === 0) return formatDateTime(ticket.createdAt)
    if (index === currentIndex) return formatDateTime(ticket.updatedAt)
    return '-'
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-[#6553E8]/10 text-[#6553E8]">
          <CategoryIcon size={28} />
        </div>
        <div className="min-w-0">
          <div className="text-xl font-semibold text-slate-900">{ticket.title}</div>
          <div className="mt-1 text-sm text-slate-500">
            Dibuat oleh: {requesterName} &bull; {formatDateTime(ticket.createdAt)}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="rounded-md bg-[#6553E8]/10 px-2.5 py-1 text-xs font-medium text-[#6553E8]">
              {ticket.category}
            </div>
            <PriorityBadge priority={ticket.priority} />
          </div>
        </div>
      </div>

      <div className="relative mt-8 flex">
        <div className="absolute left-[16.67%] right-[16.67%] top-2.5 h-0.5 bg-slate-200" />
        <div
          className="absolute left-[16.67%] top-2.5 h-0.5 bg-[#6553E8]"
          style={{ width: `${(currentIndex / lastIndex) * 66.66}%` }}
        />

        {progressSteps.map((step, index) => {
          const isReached = index <= currentIndex

          return (
            <div key={step} className="relative flex flex-1 flex-col items-center gap-1 text-center">
              <div
                className={`flex size-5 items-center justify-center rounded-full border-2 ${
                  isReached
                    ? 'border-[#6553E8] bg-[#6553E8] text-white'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {isReached && <Check size={12} />}
              </div>
              <div className="text-sm font-medium text-slate-800">{step}</div>
              <div className="text-xs text-slate-500">{getStepDate(index)}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TicketOverview