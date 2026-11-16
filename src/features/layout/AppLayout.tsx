import { Outlet } from '@tanstack/react-router'
import Sidebar from '@/components/Sidebar'

const AppLayout = () => {
  return (
    <div className="flex h-screen bg-[#F5F4FC]">
      <Sidebar />

      <div className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout