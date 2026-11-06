import { statusChartItems } from '@/features/dashboard/data'
import type { TicketStats } from '@/lib/types'

type StatusChartProps = {
  stats: TicketStats
}

const RADIUS = 40
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const StatusChart = ({ stats }: StatusChartProps) => {
  const lengths = statusChartItems.map((item) =>
    stats.total ? (stats[item.key] / stats.total) * CIRCUMFERENCE : 0,
  )

  const segments = statusChartItems.map((item, index) => ({
    ...item,
    count: stats[item.key],
    percent: stats.total ? Math.round((stats[item.key] / stats.total) * 100) : 0,
    length: lengths[index],
    offset: lengths.slice(0, index).reduce((sum, value) => sum + value, 0),
  }))

  return (
    <div className="h-full rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-4 font-semibold text-slate-900">Status Ticket</div>

      <div className="flex flex-wrap items-center justify-center gap-8">
        <div className="relative size-44">
          <svg viewBox="0 0 100 100" className="size-full -rotate-90">
            <circle
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="12"
            />
            {segments.map(
              (segment) =>
                segment.length > 0 && (
                  <circle
                    key={segment.key}
                    cx="50"
                    cy="50"
                    r={RADIUS}
                    fill="none"
                    stroke={segment.color}
                    strokeWidth="12"
                    strokeDasharray={`${segment.length} ${CIRCUMFERENCE - segment.length}`}
                    strokeDashoffset={-segment.offset}
                  />
                ),
            )}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-slate-900">{stats.total}</div>
            <div className="text-xs text-slate-500">Total</div>
          </div>
        </div>

        <div className="flex min-w-40 flex-col gap-3">
          {segments.map((segment) => (
            <div key={segment.key} className="flex items-center gap-3 text-sm">
              <div
                className="size-2.5 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <div className="flex-1 text-slate-600">{segment.label}</div>
              <div className="font-medium text-slate-900">{segment.percent}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StatusChart