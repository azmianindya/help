import { Button } from '@heroui/react'
import { Check, Lock } from 'lucide-react'
import PriorityBadge from '@/components/PriorityBadge'
import StatusBadge from '@/components/StatusBadge'
import { formatDateTime } from '@/lib/format'
import type { Ticket, TicketStatus } from '@/lib/types'

type TicketInfoPanelProps = {
  ticket: Ticket
  isUpdating: boolean
  onChangeStatus: (status: TicketStatus) => void
}

type InfoRowProps = {
  label: string
  children: React.ReactNode
}

const InfoRow = ({ label, children }: InfoRowProps) => {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <div className="text-slate-500">{label}</div>
      <div className="text-right text-slate-800">{children}</div>
    </div>
  )
}

const TicketInfoPanel = ({ ticket, isUpdating, onChangeStatus }: TicketInfoPanelProps) => {
  const isResolvedOrClosed = ticket.status === 'Resolved' || ticket.status === 'Closed'
  const isClosed = ticket.status === 'Closed'

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm">
        <div className="font-semibold text-slate-900">Informasi Tiket</div>
        <InfoRow label="Kategori">{ticket.category}</InfoRow>
        <InfoRow label="Prioritas">
          <PriorityBadge priority={ticket.priority} />
        </InfoRow>
        <InfoRow label="Status">
          <StatusBadge status={ticket.status} />
        </InfoRow>
        <InfoRow label="Tanggal Dibuat">{formatDateTime(ticket.createdAt)}</InfoRow>
        <InfoRow label="Terakhir Update">{formatDateTime(ticket.updatedAt)}</InfoRow>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm">
        <div className="font-semibold text-slate-900">Aksi Cepat</div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="ghost"
            className="bg-green-50 text-green-600 hover:bg-green-100"
            isDisabled={isResolvedOrClosed || isUpdating}
            onPress={() => onChangeStatus('Resolved')}
          >
            <Check size={16} />
            Tandai Selesai
          </Button>
          <Button
            variant="danger-soft"
            isDisabled={isClosed || isUpdating}
            onPress={() => onChangeStatus('Closed')}
          >
            <Lock size={16} />
            Tutup Tiket
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TicketInfoPanel