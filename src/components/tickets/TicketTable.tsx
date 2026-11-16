import { Link } from '@tanstack/react-router'
import { Eye } from 'lucide-react'
import PriorityBadge from '@/components/PriorityBadge'
import StatusBadge from '@/components/StatusBadge'
import { formatDate, formatTime } from '@/lib/format'
import type { Ticket } from '@/lib/types'

type TicketTableProps = {
  tickets: Ticket[]
  isLoading: boolean
  hasError: boolean
}

const rowLayout =
  'grid grid-cols-[100px_minmax(220px,1fr)_100px_100px_120px_120px_50px] items-center gap-4 px-6'

const columns = ['ID Tiket', 'Judul', 'Kategori', 'Prioritas', 'Status', 'Tanggal', 'Aksi']

const TicketTable = ({ tickets, isLoading, hasError }: TicketTableProps) => {
  let message = ''
  if (isLoading) message = 'Memuat tiket...'
  else if (hasError) message = 'Gagal memuat tiket. Coba refresh halaman.'
  else if (tickets.length === 0) message = 'Tidak ada tiket ditemukan'

  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
      <div className="min-w-[900px]">
        <div className={`${rowLayout} bg-slate-50 py-3 text-xs font-semibold text-slate-600`}>
          {columns.map((column) => (
            <div key={column}>{column}</div>
          ))}
        </div>

        {message ? (
          <div className="py-12 text-center text-sm text-slate-500">{message}</div>
        ) : (
          tickets.map((ticket) => (
            <div key={ticket.id} className={`${rowLayout} border-t border-slate-100 py-3 text-sm`}>
              <div className="text-slate-500">{ticket.code}</div>
              <Link
                to="/tickets/$ticketId"
                params={{ ticketId: String(ticket.id) }}
                className="truncate font-medium text-slate-800 hover:text-[#6553E8]"
              >
                {ticket.title}
              </Link>
              <div className="text-slate-600">{ticket.category}</div>
              <div>
                <PriorityBadge priority={ticket.priority} />
              </div>
              <div>
                <StatusBadge status={ticket.status} />
              </div>
              <div className="text-slate-600">
                <div>{formatDate(ticket.createdAt)}</div>
                <div className="text-xs text-slate-400">{formatTime(ticket.createdAt)}</div>
              </div>
              <Link
                to="/tickets/$ticketId"
                params={{ ticketId: String(ticket.id) }}
                aria-label="Lihat detail tiket"
                className="flex size-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100"
              >
                <Eye size={16} />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TicketTable