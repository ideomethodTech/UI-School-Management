// src/app/dashboard/attendance/page.js
"use client";

import { useUser } from '@/contexts/UserContext';
import AttendanceCourseFilter from '@/components/shared/AttendanceCourseFilter';
import AttendanceCalendar from '@/components/shared/AttendanceCalendar';
import MarkAttendanceSection from '@/components/admin/MarkAttendanceSection';
import TeacherAttendancePage from '@/components/teacher/TeacherAttendancePage';
import ParentAttendancePage from '@/components/parent/ParentAttendancePage';
import StudentAttendancePage from '@/components/student/StudentAttendancePage';

import { useState } from 'react';

export default function AttendancePage() {
    const { currentUserRole } = useUser();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedStudent, setSelectedStudent] = useState(null);

    // Parents see the ParentAttendancePage
    if (currentUserRole === 'parent') {
        return (
            <div className='p-6 overflow-y-auto h-full'>
                <ParentAttendancePage />
            </div>
        );
    }

    // Students see the StudentAttendancePage
    if (currentUserRole === 'student') {
        return (
            <div className='p-6 overflow-y-auto h-full'>
                <StudentAttendancePage />
            </div>
        );
    }

    // Teachers see the TeacherAttendancePage
    if (currentUserRole === 'teacher') {
        return (
            <div className='p-6 overflow-y-auto h-full'>
                <TeacherAttendancePage />
            </div>
        );
    }

    // Admins see the original attendance layout
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
                // Assuming this component exists or will be created. 
                // It was present in the original file but not imported.
                <StudentAttendanceDetailModal student={selectedStudent} onClose={handleCloseStudentDetailModal} />
            )}
        </div>
    );
}