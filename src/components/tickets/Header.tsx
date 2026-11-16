import { Plus } from 'lucide-react'
import { NavButton } from '@/components/Button'

const Header = () => {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <div className="text-2xl font-bold text-slate-900">Tickets</div>
        <div className="text-sm text-slate-500">Kelola semua laporan dan permintaan bantuan</div>
      </div>
      <NavButton to="/tickets/new" icon={Plus}>Buat Tiket</NavButton>
    </div>
  )
}

export default Header