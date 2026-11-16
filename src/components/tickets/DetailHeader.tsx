import { Button, Dropdown } from '@heroui/react'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import { NavButton } from '@/components/Button'
import { TICKET_STATUSES } from '@/lib/types'
import type { TicketStatus } from '@/lib/types'

type DetailHeaderProps = {
  code: string
  status: TicketStatus
  isUpdating: boolean
  onChangeStatus: (status: TicketStatus) => void
}

const DetailHeader = ({ code, status, isUpdating, onChangeStatus }: DetailHeaderProps) => {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="flex flex-col gap-2">
        <NavButton to="/tickets" variant="text" icon={ArrowLeft}>Kembali</NavButton>
        <div className="text-2xl font-bold text-slate-900">Detail Tiket {code}</div>
      </div>

      <Dropdown>
        <Button variant="primary" isPending={isUpdating}>
          Ubah Status
          <ChevronDown size={16} />
        </Button>
        <Dropdown.Popover>
          <Dropdown.Menu
            onAction={(key) => {
              const next = TICKET_STATUSES.find((item) => item === key)
              if (next) onChangeStatus(next)
            }}
          >
            {TICKET_STATUSES.map((item) => (
              <Dropdown.Item key={item} id={item} textValue={item} isDisabled={item === status}>
                {item}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </div>
  )
}

export default DetailHeader