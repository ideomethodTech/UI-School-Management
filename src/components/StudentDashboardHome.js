// src/components/StudentDashboardHome.js
import UpcomingAssignments from './UpcomingAssignments';
import Announcements from './Announcements';
import EventCalendar from './EventCalendar';

export default function StudentDashboardHome() {
  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold text-gray-800'>Welcome Back, Student!</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* Existing components for students */}
        <div className='lg:col-span-1'>
          <UpcomingAssignments />
        </div>
        <div className='lg:col-span-1'>
          <Announcements />
        </div>
        <div className='md:col-span-2 lg:col-span-1'>
          <EventCalendar />
        </div>

        {/* Student specific cards */}
        <div className="card p-6 col-span-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">My Current Grade</h3>
          <p className="text-3xl font-bold text-green-600">A-</p>
          <p className="text-sm text-gray-500 mt-1">Overall average</p>
        </div>
        <div className="card p-6 col-span-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Attendance This Month</h3>
          <p className="text-3xl font-bold text-blue-600">95%</p>
          <p className="text-sm text-gray-500 mt-1">2 absences</p>
        </div>
        <div className="card p-6 col-span-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Messages</h3>
          <p className="text-3xl font-bold text-purple-600">3 New</p>
          <p className="text-sm text-gray-500 mt-1">From Math & Science teachers</p>
        </div>
      </div>
    </div>
  );
}