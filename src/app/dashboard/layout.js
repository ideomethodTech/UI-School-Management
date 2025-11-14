// src/app/dashboard/layout.js
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { UserProvider } from '@/contexts/UserContext'; // Import the UserProvider

export default function DashboardLayout({ children }) {
  return (
    // Wrap the entire dashboard with the UserProvider
    <UserProvider>
      <div className='min-h-screen flex bg-gray-100'>
        <Sidebar />
        <div className='flex-1 flex flex-col'>
          <Topbar />
          <main className='flex-1 overflow-auto'>
            {children}
          </main>
        </div>
      </div>
    </UserProvider>
  )
}