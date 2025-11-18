'use client'; // This page needs to use context, so it must be a client component

import { useUser } from '@/contexts/UserContext';

// Import all the different dashboard components you have created
import AdminDashboardHome from '@/components/AdminDashboardHome';
import StudentDashboardHome from '@/components/StudentDashboardHome';
// You would also import other role-specific dashboards here
// import TeacherDashboardHome from '@/components/TeacherDashboardHome';
// import ParentDashboardHome from '@/components/ParentDashboardHome';

export default function HomePage() {
  // Get the current user role from the shared context
  const { currentUserRole } = useUser();

  // This function chooses which component to display based on the role
  const renderDashboardByRole = () => {
    switch (currentUserRole) {
      case 'admin':
        return <AdminDashboardHome />;
      case 'student':
        return <StudentDashboardHome />;
      case 'teacher':
        return <div className="p-6 bg-white rounded-lg shadow-sm">Teacher Dashboard Coming Soon...</div>;
      case 'parent':
        return <div className="p-6 bg-white rounded-lg shadow-sm">Parent Dashboard Coming Soon...</div>;
      default:
        return <div>Welcome! Please select a role to view your dashboard.</div>;
    }
  };

  return (
    <div>
      {renderDashboardByRole()}
    </div>
  );
}