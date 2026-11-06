import { useState } from 'react'
import { Avatar } from '@heroui/react'
import { CalendarDays } from 'lucide-react'
import SearchBar from '@/components/SearchBar'
import Notification from '@/components/dashboard/Notification'

type HeaderProps = {
  name: string
  image?: string
  search: string
  onSearchChange: (value: string) => void
  notificationCount: number
}

const getGreeting = (hour: number) => {
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

const Header = ({ name, image, search, onSearchChange, notificationCount }: HeaderProps) => {
  const [now] = useState(() => new Date())

  const dateLabel = now.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <SearchBar
          value={search}
          onChange={onSearchChange}
          placeholder="Search ticket, user, or keyword..."
          className="max-w-md"
        />
        <div className="flex items-center gap-2">
          <Notification count={notificationCount} />
          <Avatar>
            <Avatar.Image src={image} alt={name} />
            <Avatar.Fallback>{name.slice(0, 1).toUpperCase()}</Avatar.Fallback>
          </Avatar>
        </div>
      </div>

      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-2xl font-bold text-slate-900">
            {getGreeting(now.getHours())}, {name}! 👋
          </div>
          <div className="text-sm text-slate-500">
            Here&apos;s what&apos;s happening with your helpdesk today.
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <CalendarDays size={16} />
          <div>{dateLabel}</div>
        </div>
      </div>
    </div>
  )
}

export default Header