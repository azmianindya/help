import { create } from 'zustand'
import { getTickets, updateTicketStatus } from '@/lib/tickets'
import type { Ticket, TicketStatus } from '@/lib/types'

type TicketState = {
  tickets: Ticket[]
  isLoaded: boolean
  isLoading: boolean
  hasError: boolean
  fetchTickets: () => Promise<void>
  addTicket: (ticket: Ticket) => void
  changeStatus: (id: number, status: TicketStatus) => Promise<void>
}

// Store ini hanya di memori: data hilang saat halaman di-refresh,
// karena DummyJSON tidak menyimpan tiket baru maupun perubahan status.
export const useTicketStore = create<TicketState>()((set, get) => ({
  tickets: [],
  isLoaded: false,
  isLoading: false,
  hasError: false,

  fetchTickets: async () => {
    if (get().isLoaded || get().isLoading) return

    set({ isLoading: true, hasError: false })

    try {
      const fetched = await getTickets()
      // tiket yang sudah dibuat sebelum fetch selesai tetap di urutan paling atas
      set({ tickets: [...get().tickets, ...fetched], isLoaded: true })
    } catch {
      set({ hasError: true })
    } finally {
      set({ isLoading: false })
    }
  },

  addTicket: (ticket) => set((state) => ({ tickets: [ticket, ...state.tickets] })),

  changeStatus: async (id, status) => {
    const result = await updateTicketStatus(status)

    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket.id === id
          ? { ...ticket, status: result.status, updatedAt: result.updatedAt }
          : ticket,
      ),
    }))
  },
}))