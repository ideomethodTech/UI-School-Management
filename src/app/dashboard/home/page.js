// src/app/dashboard/home/page.js
"use client"; // This page needs to be client-side to use useContext

import { useUser } from '@/contexts/UserContext';
import AdminDashboardHome from '@/components/AdminDashboardHome';
import StudentDashboardHome from '@/components/StudentDashboardHome';
import TeacherDashboardHome from '@/components/TeacherDashboardHome';
import ParentDashboardHome from '@/components/ParentDashboardHome';
 // <--- ADDED: Import TeacherDashboardHome

export default function HomePage() {
  const { currentUserRole } = useUser(); // Get the current user role from context

  return (
    <div className='p-6'> {/* Apply padding here */}
      {currentUserRole === 'admin' && <AdminDashboardHome />}
      {currentUserRole === 'student' && <StudentDashboardHome />}
      {currentUserRole === 'teacher' && <TeacherDashboardHome />} 
      {currentUserRole === 'parent' && <ParentDashboardHome />} {/* <--- ADDED */}

      {/* Fallback or default content if role is not matched */}
      {(!['admin', 'student', 'teacher', 'parent'].includes(currentUserRole)) && ( // <--- UPDATED CONDITION
        <div className='card p-6'>
          <h1 className='text-2xl font-bold text-gray-800 mb-4'>Welcome!</h1>
          <p className='text-gray-600'>Please select a role to view a specific dashboard.</p>
        </div>
      )}
    </div>
  );
}