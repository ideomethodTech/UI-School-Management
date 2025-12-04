// src/app/dashboard/attendance/page.js
"use client";

import { useUser } from '@/contexts/UserContext';
import AttendanceCourseFilter from '@/components/shared/AttendanceCourseFilter';
import MarkAttendanceSection from '@/components/admin/MarkAttendanceSection';
import TeacherAttendancePage from '@/components/teacher/TeacherAttendancePage';
import ParentAttendancePage from '@/components/parent/ParentAttendancePage';
import StudentAttendancePage from '@/components/student/StudentAttendancePage';
import StudentAttendanceDetailModal from '@/components/modals/StudentAttendanceDetailModal';
import { Calendar } from 'lucide-react';

import { useState } from 'react';

export default function AttendancePage() {
    const { currentUserRole } = useUser();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({
        class: '10-A',
        className: 'Class 10-A',
        subject: 'Mathematics',
        subjectCode: 'MATH'
    });

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
    const handleDateSelect = (e) => {
        const newDate = new Date(e.target.value);
        setSelectedDate(newDate);
    };

    const handleStudentDetailView = (student) => {
        setSelectedStudent(student);
    };

    const handleCloseStudentDetailModal = () => {
        setSelectedStudent(null);
    };

    const handleFilterChange = (filters) => {
        setSelectedFilters(prev => ({ ...prev, ...filters }));
    };

    // Format date for input field (YYYY-MM-DD)
    const formatDateForInput = (date) => {
        return date.toISOString().split('T')[0];
    };

    // Format date for display
    const formatDateDisplay = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className='flex h-full'>
            {/* Left Sidebar for Class & Subject Filters */}
            <AttendanceCourseFilter onFilterChange={handleFilterChange} />

            {/* Main Content Area */}
            <div className='flex-1 flex flex-col p-6 overflow-y-auto'>
                {/* Header with Attendance Overview on Right */}
                <div className='flex justify-between items-center mb-6'>
                    <div>
                        <h2 className='text-2xl font-semibold text-gray-800'>Mark Attendance</h2>
                        <p className='text-sm text-gray-600 mt-1'>
                            {selectedFilters.className} • {selectedFilters.subject}
                        </p>
                    </div>

                    {/* Attendance Overview with Calendar Selector */}
                    <div className='bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-xl border border-purple-200 shadow-sm'>
                        <div className='flex items-center gap-3'>
                            <div className='bg-white p-2 rounded-lg border border-purple-300'>
                                <Calendar size={24} className='text-purple-600' />
                            </div>
                            <div>
                                <p className='text-xs text-gray-600 font-medium mb-1'>Select Date</p>
                                <input
                                    type='date'
                                    value={formatDateForInput(selectedDate)}
                                    onChange={handleDateSelect}
                                    className='px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300 cursor-pointer bg-white'
                                />
                            </div>
                        </div>
                        <div className='mt-2 pt-2 border-t border-purple-200'>
                            <p className='text-xs text-purple-700 font-medium'>
                                {formatDateDisplay(selectedDate)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mark Attendance Section - Full Width */}
                <div className='flex-1'>
                    <MarkAttendanceSection
                        selectedDate={selectedDate}
                        selectedClass={selectedFilters.class}
                        selectedSubject={selectedFilters.subject}
                        subjectCode={selectedFilters.subjectCode}
                        onStudentDetailView={handleStudentDetailView}
                    />
                </div>
            </div>

            {/* Student Detail Modal */}
            {selectedStudent && (
                <StudentAttendanceDetailModal
                    student={selectedStudent}
                    onClose={handleCloseStudentDetailModal}
                />
            )}
        </div>
    );
}