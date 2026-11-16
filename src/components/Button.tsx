import { Link } from '@tanstack/react-router'
import type { LinkProps } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { useAuthStore } from '@/lib/auth-store'

type NavButtonProps = {
  to: LinkProps['to']
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'text'
  icon?: LucideIcon
  className?: string
}

type LogoutButtonProps = {
  children: ReactNode
  className?: string
}

const navStyle: Record<NonNullable<NavButtonProps['variant']>, string> = {
  primary: 'rounded-xl bg-[#6553E8] px-4 py-2.5 text-white hover:opacity-90',
  secondary: 'rounded-xl bg-slate-100 px-4 py-2.5 text-slate-700 hover:bg-slate-200',
  text: 'text-slate-500 hover:text-slate-800',
}

// Tombol untuk pindah halaman
export const NavButton = ({
  to,
  children,
  variant = 'primary',
  icon: Icon,
  className = '',
}: NavButtonProps) => {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${navStyle[variant]} ${className}`}
    >
      {Icon && <Icon size={16} />}
      <div>{children}</div>
    </Link>
  )
}

// Tombol untuk keluar akun: hapus sesi login lalu pindah ke /login
export const LogoutButton = ({ children, className = '' }: LogoutButtonProps) => {
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    window.location.href = '/login'
  }

  return (
    <button type="button" onClick={handleLogout} className={`cursor-pointer ${className}`}>
      {children}
    </button>
  )
}