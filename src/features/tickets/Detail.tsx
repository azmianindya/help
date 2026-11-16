import { useEffect, useState } from 'react'
import { useParams } from '@tanstack/react-router'
import { toast } from '@heroui/react'
import { ArrowLeft } from 'lucide-react'
import { NavButton } from '@/components/Button'
import DetailHeader from '@/components/tickets/DetailHeader'
import TicketComments from '@/components/tickets/TicketComments'
import TicketInfoPanel from '@/components/tickets/TicketInfoPanel'
import TicketOverview from '@/components/tickets/TicketOverview'
import { useTicketStore } from '@/lib/ticket-store'
import { getTicketComments } from '@/lib/tickets'
import { getUserById } from '@/lib/users'
import type { TicketComment, TicketStatus, User } from '@/lib/types'

const Detail = () => {
  const { ticketId } = useParams({ from: '/_app/tickets/$ticketId' })
  const id = Number(ticketId)

  const ticket = useTicketStore((state) => state.tickets.find((item) => item.id === id))
  const isLoaded = useTicketStore((state) => state.isLoaded)
  const hasError = useTicketStore((state) => state.hasError)
  const fetchTickets = useTicketStore((state) => state.fetchTickets)
  const changeStatus = useTicketStore((state) => state.changeStatus)

  const [comments, setComments] = useState<TicketComment[]>([])
  const [requester, setRequester] = useState<User | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  const requesterId = ticket?.requesterId

  useEffect(() => {
    void fetchTickets()
  }, [fetchTickets])

  useEffect(() => {
    if (requesterId === undefined) return

    let ignore = false

    Promise.allSettled([getTicketComments(id), getUserById(requesterId)]).then(
      ([commentsResult, userResult]) => {
        if (ignore) return
        // tiket baru dari frontend tidak ada di DummyJSON, jadi hasilnya bisa gagal
        setComments(commentsResult.status === 'fulfilled' ? commentsResult.value : [])
        setRequester(userResult.status === 'fulfilled' ? userResult.value : null)
      },
    )

    return () => {
      ignore = true
    }
  }, [id, requesterId])

  const handleChangeStatus = async (status: TicketStatus) => {
    setIsUpdating(true)

    try {
      await changeStatus(id, status)
      toast.success(`Status tiket diubah menjadi ${status}`)
    } catch {
      toast.danger('Gagal mengubah status tiket')
    } finally {
      setIsUpdating(false)
    }
  }

  if (!ticket) {
    let message = 'Memuat tiket...'
    if (hasError) message = 'Gagal memuat tiket. Coba refresh halaman.'
    else if (isLoaded) message = 'Tiket tidak ditemukan.'

    return (
      <div className="flex flex-col gap-6">
        <NavButton to="/tickets" variant="text" icon={ArrowLeft}>
          Kembali
        </NavButton>
        <div className="py-16 text-center text-slate-500">{message}</div>
      </div>
    )
  }

  const requesterName = requester?.fullName ?? `User #${ticket.requesterId}`

  return (
    <div className="flex flex-col gap-6">
      <DetailHeader
        code={ticket.code}
        status={ticket.status}
        isUpdating={isUpdating}
        onChangeStatus={handleChangeStatus}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <TicketOverview ticket={ticket} requesterName={requesterName} />
          <TicketComments
            requesterName={requesterName}
            requesterImage={requester?.image}
            description={ticket.description}
            createdAt={ticket.createdAt}
            comments={comments}
          />
        </div>
        <TicketInfoPanel ticket={ticket} isUpdating={isUpdating} onChangeStatus={handleChangeStatus} />
      </div>
    </div>
  )
}

export default Detail