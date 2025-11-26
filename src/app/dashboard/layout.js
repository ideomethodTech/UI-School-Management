// src/app/dashboard/layout.js
"use client";

import Sidebar from '@/components/Sidebar';
import SimpleSidebar from '@/components/SimpleSidebar';
import Topbar from '@/components/Topbar';
import { UserProvider, useUser } from '@/contexts/UserContext';

function DashboardLayoutContent({ children }) {
  const { currentUserRole } = useUser();

  return (
    <div className='min-h-screen flex bg-gray-50'>

      {/* Render the correct sidebar based on role */}
      {currentUserRole === 'admin' && <Sidebar />}

      {currentUserRole === 'student' && (
        <SimpleSidebar userName="John Smith" userRole="Student" />
      )}

      {currentUserRole === 'teacher' && (
        <SimpleSidebar userName="Priya Sharma" userRole="Teacher" />
      )}

      <div className={`flex-1 flex flex-col ${(currentUserRole === 'student' || currentUserRole === 'teacher') ? 'lg:ml-64' : ''}`}>
        <Topbar />
        <main className='flex-1 overflow-auto p-6'>
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <UserProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </UserProvider>
  );
}