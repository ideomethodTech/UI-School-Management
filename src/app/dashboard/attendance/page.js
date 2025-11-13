// src/app/dashboard/attendance/page.js
"use client";

import { useUser } from '@/contexts/UserContext';
import AttendanceCourseFilter from '@/components/AttendanceCourseFilter';
import AttendanceCalendar from '@/components/AttendanceCalendar';
import MarkAttendanceSection from '@/components/MarkAttendanceSection';
import StudentAttendanceDetailModal from '@/components/StudentAttendanceDetailModal'; // Import the modal

import { useState } from 'react'; // Import useState for managing selected date and modal

export default function AttendancePage() {
  const { currentUserRole } = useUser();
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to track selected date
  const [selectedStudent, setSelectedStudent] = useState(null); // State to manage modal student

  // Only teachers and admins should see this detailed attendance page
  if (!['admin', 'teacher'].includes(currentUserRole)) {
    return (
      <div className='p-6 text-center text-gray-600'>
        <h2 className='text-2xl font-semibold mb-4'>Access Denied</h2>
        <p>You do not have permission to view this attendance page.</p>
      </div>
    );
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    // In a real app, you'd fetch attendance data for this date
  };

  const handleStudentDetailView = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseStudentDetailModal = () => {
    setSelectedStudent(null);
  };

  return (
    <div className='flex h-full'>
      {/* Left Sidebar for Course/Subject/Group Filters */}
      <AttendanceCourseFilter />

      {/* Main Content Area */}
      <div className='flex-1 flex flex-col p-6 overflow-y-auto'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-6'>Attendance Overview</h2>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1'>
          {/* Calendar View */}
          <div className='lg:col-span-1'>
            <AttendanceCalendar onDateSelect={handleDateSelect} />
          </div>

          {/* Mark Attendance Section */}
          <div className='lg:col-span-2'>
            <MarkAttendanceSection
              selectedDate={selectedDate}
              onStudentDetailView={handleStudentDetailView}
            />
          </div>
        </div>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <StudentAttendanceDetailModal student={selectedStudent} onClose={handleCloseStudentDetailModal} />
      )}
    </div>
  );
}