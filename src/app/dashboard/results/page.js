// src/app/dashboard/results/page.js
"use client"; // Needs to be client component to use `useUser`

import ResultsTable from '@/components/ResultsTable';
import { Search, SlidersHorizontal, Plus } from 'lucide-react';
import { useUser } from '@/contexts/UserContext'; // Import useUser

// REMOVE metadata export from here if it was present

export default function ResultsPage() {
  const { currentUserRole } = useUser();

  const getPageTitle = () => {
    switch (currentUserRole) {
      case 'admin':
        return 'All Student Results';
      case 'teacher':
        return 'My Classes Results';
      case 'student':
        return 'My Results';
      default:
        return 'Results';
    }
  };

  return (
    <div className='p-6 space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-semibold text-gray-800'>{getPageTitle()}</h2>
        </div>

        <div className='flex items-center gap-3'>
          {/* Admin/Teacher specific actions */}
          {(currentUserRole === 'admin' || currentUserRole === 'teacher') && (
            <>
              <div className='relative'>
                <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                <input
                  placeholder='Search...'
                  className='rounded-full border border-gray-300 pl-10 pr-4 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400'
                />
              </div>
              <button className='p-2 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'>
                <SlidersHorizontal size={20} />
              </button>
              <button className='p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 shadow-md'>
                <Plus size={20} />
              </button>
            </>
          )}
        </div>
      </div>

      <div className='bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm'>
        {currentUserRole === 'admin' && <ResultsTable role="admin" />}
        {currentUserRole === 'teacher' && <ResultsTable role="teacher" teacherId="TCH001" />} {/* Example teacher ID */}
        {currentUserRole === 'student' && <ResultsTable role="student" studentId="STD001" />} {/* Example student ID */}
        {(!['admin', 'teacher', 'student'].includes(currentUserRole)) && (
          <div className="p-6 text-gray-600">No results data available for this user role.</div>
        )}
      </div>
    </div>
  )
}