import { ArrowDown, ArrowUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type StatsCardProps = {
  label: string
  value: number
  trend: number
  icon: LucideIcon
  iconClassName: string
}

const StatsCard = ({ label, value, trend, icon: Icon, iconClassName }: StatsCardProps) => {
  const isUp = trend >= 0
  const TrendIcon = isUp ? ArrowUp : ArrowDown

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className={`flex size-10 items-center justify-center rounded-full ${iconClassName}`}>
        <Icon size={20} />
      </div>
      <div className="mt-3 text-sm text-slate-500">{label}</div>
      <div className="mt-1 flex items-end justify-between">
        <div className="text-3xl font-bold text-slate-900">{value}</div>
        <div className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium ${
            isUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
          }`}>
          <TrendIcon size={12} />
          <div>{Math.abs(trend)}%</div>
        </div>
      </div>
    </div>
  )
}

export default StatsCard