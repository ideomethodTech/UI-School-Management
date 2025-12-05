// src/components/ParentAttendancePage.js
"use client";

import React, { useState } from 'react';
import { CheckCircle, Calendar, AlertCircle, Clock } from 'lucide-react';
import { parentAttendancePageData as mockAttendanceData } from '../../mockData/parentData';

export default function ParentAttendancePage() {
    const { child, summary, termPerformance, monthlyAttendance } = mockAttendanceData;
    const [selectedMonth, setSelectedMonth] = useState('november');

    // Get attendance records for selected month
    const currentMonthData = monthlyAttendance[selectedMonth] || [];

    // Calculate present and absent days for selected month
    const presentDays = currentMonthData.filter(record => record.status === 'Present').length;
    const absentDays = currentMonthData.filter(record => record.status === 'Absent').length;
    const totalDays = currentMonthData.length;

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

            {/* Attendance by Month */}
            <div className='card p-6 bg-white'>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <h2 className='text-xl font-bold text-gray-800'>Attendance by Month</h2>
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 hover:border-gray-400"
                        >
                            <option value="january">January</option>
                            <option value="february">February</option>
                            <option value="march">March</option>
                            <option value="april">April</option>
                            <option value="may">May</option>
                            <option value="june">June</option>
                            <option value="july">July</option>
                            <option value="august">August</option>
                            <option value="september">September</option>
                            <option value="october">October</option>
                            <option value="november">November</option>
                            <option value="december">December</option>
                        </select>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-600 font-medium">Days Present</p>
                        <p className="text-3xl font-bold text-green-600">{presentDays}</p>
                        <p className="text-xs text-gray-500">out of {totalDays} days</p>
                    </div>
                </div>

                {/* Absent Days List */}
                <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-700 mb-4">Absent Days: {absentDays}</p>
                    {absentDays > 0 ? (
                        <div className="space-y-2">
                            {currentMonthData.filter(record => record.status === 'Absent').map((record, index) => (
                                <div
                                    key={index}
                                    className='flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors duration-200'
                                >
                                    <div className="flex items-center gap-4">
                                        <AlertCircle size={18} className="text-red-600" />
                                        <div>
                                            <p className="font-semibold text-gray-800">{record.date}</p>
                                            <p className="text-sm text-purple-600">{record.day}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">{record.remarks || 'No remarks'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
                            <p className="text-lg font-semibold text-gray-800">Perfect Attendance!</p>
                            <p className="text-sm text-gray-600 mt-1">No absent days this month</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
