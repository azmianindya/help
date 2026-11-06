import { Bell } from 'lucide-react'

type NotificationProps = {
  count: number
}

const Notification = ({ count }: NotificationProps) => {
  return (
    <button
      type="button"
      aria-label="Notifikasi"
      className="relative flex size-10 cursor-pointer items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-white"
    >
      <Bell size={20} />
      {count > 0 && (
        <div className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
          {count > 9 ? '9+' : count}
        </div>
      )}
    </button>
  )
}

export default Notification