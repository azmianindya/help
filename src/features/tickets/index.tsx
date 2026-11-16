import { useEffect, useState } from 'react'
import Pagination from '@/components/Pagination'
import FilterBar from '@/components/tickets/FilterBar'
import Header from '@/components/tickets/Header'
import TicketTable from '@/components/tickets/TicketTable'
import { ALL, PAGE_SIZE } from '@/features/tickets/data'
import { useTicketStore } from '@/lib/ticket-store'

const Tickets = () => {
  const tickets = useTicketStore((state) => state.tickets)
  const isLoading = useTicketStore((state) => state.isLoading)
  const hasError = useTicketStore((state) => state.hasError)
  const fetchTickets = useTicketStore((state) => state.fetchTickets)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState(ALL)
  const [category, setCategory] = useState(ALL)
  const [page, setPage] = useState(1)

  useEffect(() => {
    void fetchTickets()
  }, [fetchTickets])

  const keyword = search.trim().toLowerCase()
  const filteredTickets = tickets.filter(
    (ticket) =>
      (status === ALL || ticket.status === status) &&
      (category === ALL || ticket.category === category) &&
      (!keyword ||
        ticket.title.toLowerCase().includes(keyword) ||
        ticket.code.toLowerCase().includes(keyword)),
  )

  const totalPages = Math.max(1, Math.ceil(filteredTickets.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageTickets = filteredTickets.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  )

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const handleStatusChange = (value: string) => {
    setStatus(value)
    setPage(1)
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    setPage(1)
  }

  const handleReset = () => {
    setSearch('')
    setStatus(ALL)
    setCategory(ALL)
    setPage(1)
  }

  return (
    <div className="flex flex-col gap-6">
      <Header />

      <FilterBar
        search={search}
        onSearchChange={handleSearchChange}
        status={status}
        onStatusChange={handleStatusChange}
        category={category}
        onCategoryChange={handleCategoryChange}
        onReset={handleReset}
      />

      <TicketTable tickets={pageTickets} isLoading={isLoading} hasError={hasError} />

      <Pagination
        page={currentPage}
        totalPages={totalPages}
        totalItems={filteredTickets.length}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
        itemLabel="tiket"
      />
    </div>
  )
}

export default Tickets