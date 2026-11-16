import { useEffect, useState } from 'react'
import Header from '@/components/dashboard/Header'
import RecentTicket from '@/components/dashboard/RecentTicket'
import StatsCard from '@/components/dashboard/StatsCard'
import StatusChart from '@/components/dashboard/StatusChart'
import { NOTIFICATION_COUNT, statCards } from '@/features/dashboard/data'
import { useAuthStore } from '@/lib/auth-store'
import { getTicketStats, getTickets } from '@/lib/tickets'
import type { Ticket } from '@/lib/types'
import ErrorBoundary from '@/providers/ErrorBoundary'

const WidgetError = () => (
  <div className="flex h-full min-h-[220px] items-center justify-center rounded-2xl border border-red-200 bg-white p-6 text-center shadow-sm">
    <div>
      <p className="font-semibold text-slate-800">
        Oops! Terjadi Kesalahan
      </p>
      <p className="mt-1 text-sm text-slate-500">
        Komponen gagal dimuat. Silakan coba kembali.
      </p>
    </div>
  </div>
)

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
      {/* Header */}
      <Header
        name={user?.firstName ?? 'there'}
        image={user?.image}
        search={search}
        onSearchChange={setSearch}
        notificationCount={NOTIFICATION_COUNT}
      />

      {/* Loading State */}
      {isLoading && (
        <div className="py-16 text-center text-slate-500">
          Memuat data...
        </div>
      )}

      {/* Dashboard Content */}
      {!isLoading && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {hasError ? (
              <div className="col-span-full">
                <WidgetError />
              </div>
            ) : (
              statCards.map((card) => (
                <ErrorBoundary key={card.key}>
                  <StatsCard
                    label={card.label}
                    value={stats[card.key]}
                    trend={card.trend}
                    icon={card.icon}
                    iconClassName={card.iconClassName}
                  />
                </ErrorBoundary>
              ))
            )}
          </div>

          {/* Dashboard Widgets */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            {/* Status Chart */}
            <div className="lg:col-span-2">
              {hasError ? (
                <WidgetError />
              ) : (
                <ErrorBoundary fallbackTitle="Status Ticket">
                  <StatusChart stats={stats} />
                </ErrorBoundary>
              )}
            </div>

            {/* Recent Tickets */}
            <div className="lg:col-span-3">
              {hasError ? (
                <WidgetError />
              ) : (
                <ErrorBoundary fallbackTitle="Recent Tickets">
                  <RecentTicket tickets={recentTickets} />
                </ErrorBoundary>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard