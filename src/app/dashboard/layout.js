// src/app/dashboard/layout.js
"use client";

import Sidebar from '@/components/Sidebar';
import SimpleSidebar from '@/components/SimpleSidebar';
import ParentSidebar from '@/components/ParentSidebar';
import Topbar from '@/components/Topbar';
import { UserProvider, useUser } from '@/contexts/UserContext';
import { DataProvider } from '@/contexts/DataContext';

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

      {currentUserRole === 'parent' && (
        <ParentSidebar userName="Mr./Mrs. Johnson" userRole="Parent" />
      )}

      <div className={`flex-1 flex flex-col ${currentUserRole === 'admin' ? 'lg:ml-72' : (currentUserRole === 'student' || currentUserRole === 'teacher' || currentUserRole === 'parent') ? 'lg:ml-64' : ''}`}>
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
    <DataProvider>
      <UserProvider>
        <DashboardLayoutContent>{children}</DashboardLayoutContent>
      </UserProvider>
    </DataProvider>
  );
}