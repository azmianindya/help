import { Link } from '@tanstack/react-router'
import { LifeBuoy, LogOut } from 'lucide-react'
import { useAuthStore } from '@/lib/auth-store'
import { getMenuByRole } from '@/lib/menu'

const linkBase = 'flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors'
const linkActive = 'bg-[#6553E8] text-white'
const linkInactive = 'text-slate-300 hover:bg-white/10 hover:text-white'

const Sidebar = () => {
  const role = useAuthStore((state) => state.user?.role)
  const logout = useAuthStore((state) => state.logout)
  const menus = getMenuByRole(role)
  const handleLogout = () => {
    logout()
    window.location.href = '/login'
  }

  return (
    <div className="flex h-screen w-60 shrink-0 flex-col bg-[#20243A] px-4 py-6">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex size-9 items-center justify-center rounded-lg bg-[#6553E8] text-white">
          <LifeBuoy size={20} />
        </div>
        <div className="text-lg font-semibold text-white">HelpDesk</div>
      </div>

      <div className="flex flex-1 flex-col gap-1">
        {menus.map(({ label, to, icon: Icon }) => (
          <Link
            key={label}
            to={to}
            className={linkBase}
            activeProps={{ className: linkActive }}
            inactiveProps={{ className: linkInactive }}
          >
            <Icon size={18} />
            <div>{label}</div>
          </Link>
        ))}
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className={`${linkBase} ${linkInactive} w-full cursor-pointer`}
      >
        <LogOut size={18} />
        <div>Logout</div>
      </button>
    </div>
  )
}

export default Sidebar