// src/components/AdminDashboardHome.js
import UpcomingAssignments from './UpcomingAssignments'; // Assuming these are student-focused, an admin might see an overview
import Announcements from './Announcements';
import EventCalendar from './EventCalendar';
import ResultsTable from './ResultsTable'; // Admin might see recent results
import TeachersTable from './TeachersTable'; // Admin might see a quick list of teachers

export default function AdminDashboardHome() {
  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold text-gray-800'>Welcome Back, Admin!</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* Quick Stats/Overview Cards for Admin */}
        <div className="card p-6 col-span-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Students</h3>
          <p className="text-3xl font-bold text-purple-600">1250</p>
          <p className="text-sm text-gray-500 mt-1">+12% from last month</p>
        </div>
        <div className="card p-6 col-span-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Teachers</h3>
          <p className="text-3xl font-bold text-blue-600">65</p>
          <p className="text-sm text-gray-500 mt-1">5 new hires this year</p>
        </div>
        <div className="card p-6 col-span-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Active Classes</h3>
          <p className="text-3xl font-bold text-green-600">45</p>
          <p className="text-sm text-gray-500 mt-1">Across 8 grades</p>
        </div>

        {/* Existing components, but perhaps with admin-specific data or views */}
        <div className='lg:col-span-2'>
          <Announcements /> {/* Admin can manage/view all announcements */}
        </div>
        <div className='lg:col-span-1'>
          <EventCalendar /> {/* Admin views school-wide events */}
        </div>

        {/* Admin specific tables - e.g., Recent Activity, Enrollment Trends */}
        <div className='md:col-span-2 lg:col-span-3 card p-6'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>Recent Results Overview</h3>
          <ResultsTable rows={sampleResults(5)} /> {/* Show top 5 recent results */}
        </div>
        {/*
        <div className='md:col-span-2 lg:col-span-3 card p-6'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>Quick Teacher List</h3>
          <TeachersTable rows={sampleTeachers().slice(0,3)} /> // Show a few teachers
        </div>
        */}
      </div>
    </div>
  );
}

// Helper to get a subset of results for display
function sampleResults(count) {
  const allResults = [
    { subject: 'Math', student: 'John Doe', score: 90, teacher: 'John Doe', className: '1A', date: '2025-01-01' },
    { subject: 'English', student: 'Jane Doe', score: 85, teacher: 'Jane Doe', className: '2A', date: '2025-01-01' },
    { subject: 'Science', student: 'Mike Smith', score: 92, teacher: 'Mike Geller', className: '3A', date: '2025-01-02' },
    { subject: 'Social Studies', student: 'Emily White', score: 88, teacher: 'Jay French', className: '1B', date: '2025-01-02' },
    { subject: 'Art', student: 'Chris Brown', score: 95, teacher: 'Jane Smith', className: '4A', date: '2025-01-03' },
    { subject: 'Music', student: 'Patricia Green', score: 78, teacher: 'Anna Santiago', className: '5A', date: '2025-01-03' },
    { subject: 'History', student: 'Robert Blue', score: 80, teacher: 'Allen Black', className: '6A', date: '2025-01-04' },
    { subject: 'Geography', student: 'Linda Grey', score: 91, teacher: 'John Doe', className: '6B', date: '2025-01-04' },
  ];
  return allResults.slice(0, count);
}

// Helper to get a subset of teachers (reuse from TeachersTable, adjust if needed)
function sampleTeachers() {
  return [
    { name: 'John Doe', email: 'john@doe.com', teacherId: 'TCH001', subjects: 'Math, Geometry', classes: '1B, 2A, 3C', phone: '123-456-7890', address: '123 Main St, Anytown, USA', avatar: '' },
    { name: 'Jane Doe', email: 'jane@doe.com', teacherId: 'TCH002', subjects: 'Physics, Chemistry', classes: '5A, 4B, 3C', phone: '123-456-7891', address: '456 Oak Ave, Otherville, USA', avatar: '' },
    { name: 'Mike Geller', email: 'mike@geller.com', teacherId: 'TCH003', subjects: 'Biology', classes: '5A, 4B, 3C', phone: '123-456-7892', address: '789 Pine Ln, Anyplace, USA', avatar: '' },
  ];
}