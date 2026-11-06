import type { LinkProps } from '@tanstack/react-router'
import { LayoutDashboard, Settings, Ticket, User, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { UserRole } from '@/lib/types'

export type MenuItem = {
  label: string
  to: LinkProps['to']
  icon: LucideIcon
  // kalau kosong, menu tampil untuk semua role
  roles?: UserRole[]
}

export const menuItems: MenuItem[] = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Tickets', to: '/tickets', icon: Ticket },
  { label: 'Users', to: '/users', icon: Users, roles: ['Admin', 'IT Support'] },
  { label: 'Profile', to: '/profile', icon: User },
  { label: 'Settings', to: '/settings', icon: Settings },
]

export function getMenuByRole(role?: UserRole): MenuItem[] {
  return menuItems.filter((item) => !item.roles || (role && item.roles.includes(role)))
}