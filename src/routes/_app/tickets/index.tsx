import { createFileRoute } from '@tanstack/react-router'
import Tickets from '@/features/tickets'

export const Route = createFileRoute('/_app/tickets/')({
  component: Tickets,
})