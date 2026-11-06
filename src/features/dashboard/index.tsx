import { useEffect, useState } from 'react'
import Header from '@/components/dashboard/Header'
import RecentTicket from '@/components/dashboard/RecentTicket'
import StatsCard from '@/components/dashboard/StatsCard'
import StatusChart from '@/components/dashboard/StatusChart'
import { NOTIFICATION_COUNT, statCards } from '@/features/dashboard/data'
import { useAuthStore } from '@/lib/auth-store'
import { getTicketStats, getTickets } from '@/lib/tickets'
import type { Ticket } from '@/lib/types'

const Dashboard = () => {
  const user = useAuthStore((state) => state.user)

  const [tickets, setTickets] = useState<Ticket[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    let ignore = false

    getTickets()
      .then((data) => {
        if (!ignore) setTickets(data)
      })
      .catch(() => {
        if (!ignore) setHasError(true)
      })
      .finally(() => {
        if (!ignore) setIsLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [])

  const stats = getTicketStats(tickets)

  const keyword = search.trim().toLowerCase()
  const recentTickets = tickets
    .filter(
      (ticket) =>
        ticket.title.toLowerCase().includes(keyword) ||
        ticket.code.toLowerCase().includes(keyword),
    )
    .slice(0, 5)

  return (
    <div className="flex flex-col gap-8">
      <Header
        name={user?.firstName ?? 'there'}
        image={user?.image}
        search={search}
        onSearchChange={setSearch}
        notificationCount={NOTIFICATION_COUNT}
      />

      {isLoading && <div className="py-16 text-center text-slate-500">Memuat data...</div>}

      {hasError && (
        <div className="py-16 text-center text-red-600">
          Gagal memuat data dashboard. Coba refresh halaman.
        </div>
      )}

      {!isLoading && !hasError && (
        <>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {statCards.map((card) => (
              <StatsCard
                key={card.key}
                label={card.label}
                value={stats[card.key]}
                trend={card.trend}
                icon={card.icon}
                iconClassName={card.iconClassName}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <StatusChart stats={stats} />
            </div>
            <div className="lg:col-span-3">
              <RecentTicket tickets={recentTickets} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard