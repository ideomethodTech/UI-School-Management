// src/app/dashboard/layout.js
"use client"; // Required to use hooks like useUser

import Sidebar from '@/components/Sidebar';
import StudentSidebar from '@/components/StudentSidebar'; // 1. Import the new student sidebar
import Topbar from '@/components/Topbar';
import { UserProvider, useUser } from '@/contexts/UserContext';

// 2. Create an inner component to access the user context
function DashboardLayoutContent({ children }) {
  const { currentUserRole } = useUser();

  return (
    <div className='min-h-screen flex bg-gray-100'>
      {/* 3. Conditionally render the sidebar based on the role */}
      {currentUserRole === 'student' ? <StudentSidebar /> : <Sidebar />}

      <div className='flex-1 flex flex-col'>
        <Topbar />
        <main className='flex-1 overflow-auto'>
          {children}
        </main>
      </div>
    </div>
  );
}

// The main layout component now wraps the content with the provider
export default function DashboardLayout({ children }) {
  return (
    <UserProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </UserProvider>
  );
}