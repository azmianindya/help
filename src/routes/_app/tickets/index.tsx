import { createFileRoute } from '@tanstack/react-router'
import Tickets from '@/features/tickets'
import ErrorBoundary from '@/providers/ErrorBoundary'

export const Route = createFileRoute('/_app/tickets/')({
  component: () => (
    <ErrorBoundary>
      <Tickets />
    </ErrorBoundary>
  ),
})