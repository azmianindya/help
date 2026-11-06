import { Link } from '@tanstack/react-router'
import { ArrowRight, FileText } from 'lucide-react'
import type { Ticket, TicketStatus } from '@/lib/types'

type RecentTicketProps = {
  tickets: Ticket[]
}

const statusStyle: Record<TicketStatus, string> = {
  Open: 'bg-blue-100 text-blue-600',
  'In Progress': 'bg-orange-100 text-orange-600',
  Resolved: 'bg-green-100 text-green-600',
  Closed: 'bg-slate-100 text-slate-600',
}

const RecentTicket = ({ tickets }: RecentTicketProps) => {
  return (
    <div className="h-full rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="font-semibold text-slate-900">Recent Tickets</div>
        <Link
          to="/tickets"
          className="flex items-center gap-1 text-sm font-medium text-[#6553E8] hover:underline">
          <div>View All</div>
          <ArrowRight size={14} />
        </Link>
      </div>

      {tickets.length === 0 ? (
        <div className="py-8 text-center text-sm text-slate-500">Tidak ada tiket ditemukan</div>
      ) : (
        <div className="flex flex-col">
          {tickets.map((ticket) => (
            <Link
              key={ticket.id}
              to="/tickets/$ticketId"
              params={{ ticketId: String(ticket.id) }}
              className="flex items-center gap-4 border-b border-slate-100 py-3 text-sm transition-colors last:border-b-0 hover:bg-slate-50">
              <FileText size={16} className="shrink-0 text-slate-400" />
              <div className="w-20 shrink-0 text-slate-500">{ticket.code}</div>
              <div className="flex-1 truncate font-medium text-slate-800">{ticket.title}</div>
              <div className={`shrink-0 rounded-md px-2.5 py-1 text-xs font-medium ${statusStyle[ticket.status]}`}>
                {ticket.status}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default RecentTicket