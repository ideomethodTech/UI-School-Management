// src/components/ParentAttendancePage.js
"use client";

import React from 'react';
import { CheckCircle, Calendar, AlertCircle, Clock } from 'lucide-react';

// Mock Data for Parent Attendance Page
const mockAttendanceData = {
    child: {
        name: 'John Smith',
        grade: '10 A',
        academicYear: '2024-2025'
    },
    summary: {
        attendancePercentage: 94,
        daysPresent: 112,
        totalDays: 119,
        daysAbsent: 7,
        currentStatus: 'On Track',
        statusMessage: 'Meeting expectations'
    },
    termPerformance: [
        { term: 'Term 1', present: 54, total: 59, percentage: 92 },
        { term: 'Term 2', present: 58, total: 60, percentage: 97 }
    ],
    weeklyAttendance: [
        { date: '2024-06-27', day: 'Thursday', status: 'Present', time: '8:30 AM', remarks: '-' },
        { date: '2024-06-26', day: 'Wednesday', status: 'Present', time: '8:45 AM', remarks: 'Slight delay' },
        { date: '2024-06-25', day: 'Tuesday', status: 'Present', time: '8:15 AM', remarks: '-' },
        { date: '2024-06-24', day: 'Monday', status: 'Absent', time: '-', remarks: 'Medical leave' },
        { date: '2024-06-21', day: 'Friday', status: 'Present', time: '8:30 AM', remarks: '-' },
        { date: '2024-06-20', day: 'Thursday', status: 'Present', time: '8:20 AM', remarks: '-' },
        { date: '2024-06-19', day: 'Wednesday', status: 'Absent', time: '-', remarks: 'Sick leave' }
    ]
};

export default function ParentAttendancePage() {
    const { child, summary, termPerformance, weeklyAttendance } = mockAttendanceData;

    const getAttendanceColor = (percentage) => {
        if (percentage >= 90) return 'text-green-600';
        if (percentage >= 75) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getAttendanceMessage = (percentage) => {
        if (percentage >= 90) return 'Excellent attendance';
        if (percentage >= 75) return 'Good attendance';
        return 'Needs improvement';
    };

    return (
        <div className='space-y-6'>
            {/* Header */}
            <div>
                <h1 className='text-3xl font-bold text-gray-800'>{child.name}'s Attendance</h1>
                <p className='text-gray-600 mt-1'>Grade {child.grade} - Academic Year {child.academicYear}</p>
            </div>

            {/* Summary Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {/* Attendance Percentage */}
                <div className='card p-6 bg-white hover:shadow-lg transition-shadow duration-300'>
                    <div className='flex items-center justify-between mb-2'>
                        <p className='text-sm text-gray-600 font-medium'>Attendance %</p>
                        <CheckCircle size={20} className='text-green-500' />
                    </div>
                    <h3 className={`text-4xl font-bold ${getAttendanceColor(summary.attendancePercentage)} mb-1`}>
                        {summary.attendancePercentage}%
                    </h3>
                    <p className={`text-sm font-medium ${getAttendanceColor(summary.attendancePercentage)}`}>
                        {getAttendanceMessage(summary.attendancePercentage)}
                    </p>
                </div>

                {/* Days Present */}
                <div className='card p-6 bg-white hover:shadow-lg transition-shadow duration-300'>
                    <div className='flex items-center justify-between mb-2'>
                        <p className='text-sm text-gray-600 font-medium'>Days Present</p>
                        <Calendar size={20} className='text-blue-500' />
                    </div>
                    <h3 className='text-4xl font-bold text-gray-800 mb-1'>{summary.daysPresent}</h3>
                    <p className='text-sm text-gray-600'>Out of {summary.totalDays} days</p>
                </div>

                {/* Days Absent */}
                <div className='card p-6 bg-white hover:shadow-lg transition-shadow duration-300'>
                    <div className='flex items-center justify-between mb-2'>
                        <p className='text-sm text-gray-600 font-medium'>Days Absent</p>
                        <AlertCircle size={20} className='text-red-500' />
                    </div>
                    <h3 className='text-4xl font-bold text-gray-800 mb-1'>{summary.daysAbsent}</h3>
                    <p className='text-sm text-gray-600'>Authorized leave included</p>
                </div>

                {/* Current Status */}
                <div className='card p-6 bg-white hover:shadow-lg transition-shadow duration-300'>
                    <div className='flex items-center justify-between mb-2'>
                        <p className='text-sm text-gray-600 font-medium'>Current Status</p>
                        <Clock size={20} className='text-purple-500' />
                    </div>
                    <h3 className='text-2xl font-bold text-gray-800 mb-1'>{summary.currentStatus}</h3>
                    <p className='text-sm text-green-600 font-medium'>{summary.statusMessage}</p>
                </div>
            </div>

            {/* Attendance Performance by Term */}
            <div className='card p-6 bg-white'>
                <h2 className='text-xl font-bold text-gray-800 mb-6'>Attendance Performance by Term</h2>
                <div className='space-y-6'>
                    {termPerformance.map((term, index) => (
                        <div key={index}>
                            <div className='flex items-center justify-between mb-2'>
                                <div>
                                    <h3 className='font-semibold text-gray-800'>{term.term}</h3>
                                    <p className='text-sm text-gray-600'>{term.present}/{term.total} days</p>
                                </div>
                                <span className={`text-lg font-bold ${getAttendanceColor(term.percentage)}`}>
                                    {term.percentage}%
                                </span>
                            </div>
                            <div className='h-3 bg-gray-200 rounded-full overflow-hidden'>
                                <div
                                    className='h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-700 ease-out'
                                    style={{ width: `${term.percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* This Week's Attendance */}
            <div className='card p-6 bg-white'>
                <h2 className='text-xl font-bold text-gray-800 mb-6'>This Week's Attendance</h2>
                <div className='overflow-x-auto'>
                    <table className='w-full'>
                        <thead>
                            <tr className='border-b border-gray-200'>
                                <th className='text-left py-3 px-4 text-sm font-semibold text-gray-700'>Date</th>
                                <th className='text-left py-3 px-4 text-sm font-semibold text-gray-700'>Day</th>
                                <th className='text-left py-3 px-4 text-sm font-semibold text-gray-700'>Status</th>
                                <th className='text-left py-3 px-4 text-sm font-semibold text-gray-700'>Time</th>
                                <th className='text-left py-3 px-4 text-sm font-semibold text-gray-700'>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {weeklyAttendance.map((record, index) => (
                                <tr
                                    key={index}
                                    className='border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200'
                                >
                                    <td className='py-4 px-4 text-sm text-gray-800'>{record.date}</td>
                                    <td className='py-4 px-4 text-sm text-purple-600'>{record.day}</td>
                                    <td className='py-4 px-4'>
                                        <span
                                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${record.status === 'Present'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                                }`}
                                        >
                                            {record.status === 'Present' ? (
                                                <CheckCircle size={14} />
                                            ) : (
                                                <AlertCircle size={14} />
                                            )}
                                            {record.status}
                                        </span>
                                    </td>
                                    <td className='py-4 px-4 text-sm text-gray-600'>{record.time}</td>
                                    <td className='py-4 px-4 text-sm text-gray-600'>{record.remarks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
