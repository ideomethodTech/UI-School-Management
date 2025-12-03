// src/components/StudentAttendancePage.js
"use client";

import React from 'react';
import { Check, X } from 'lucide-react';

// Mock Data
const attendanceData = {
    studentName: 'John Smith',
    class: 'Class 10-A',
    rollNo: '045',
    stats: {
        overall: 89,
        attended: 56,
        totalClasses: 62,
        missed: 6
    },
    monthly: [
        { month: 'September', attended: 20, total: 22, percentage: 91 },
        { month: 'October', attended: 22, total: 25, percentage: 88 },
        { month: 'November', attended: 24, total: 25, percentage: 96 }
    ],
    recent: [
        { date: 'Nov 28, 2024', status: 'present' },
        { date: 'Nov 27, 2024', status: 'present' },
        { date: 'Nov 26, 2024', status: 'absent' },
        { date: 'Nov 25, 2024', status: 'present' },
        { date: 'Nov 24, 2024', status: 'present' }
    ]
};

const StatCard = ({ title, value, subtext, valueColor = 'text-gray-800', subtextColor = 'text-gray-500' }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <p className="text-sm font-medium text-gray-500 mb-2">{title}</p>
        <p className={`text-3xl font-bold ${valueColor} mb-1`}>{value}</p>
        <p className={`text-xs ${subtextColor}`}>{subtext}</p>
    </div>
);

const MonthlyProgressBar = ({ month, attended, total, percentage }) => (
    <div className="mb-6 last:mb-0">
        <div className="flex justify-between items-end mb-2">
            <div>
                <p className="font-semibold text-gray-800">{month}</p>
                <p className="text-xs text-gray-500 mt-1">{attended}/{total} classes attended</p>
            </div>
            <span className={`font-bold ${percentage >= 90 ? 'text-green-600' : percentage >= 75 ? 'text-green-500' : 'text-yellow-600'}`}>
                {percentage}%
            </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div
                className={`h-2.5 rounded-full ${percentage >= 90 ? 'bg-green-500' : percentage >= 75 ? 'bg-green-400' : 'bg-yellow-400'}`}
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    </div>
);

const AttendanceRow = ({ date, status }) => (
    <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
        <span className="text-sm font-medium text-gray-700">{date}</span>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 ${status === 'present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
            {status === 'present' ? <Check size={12} /> : <X size={12} />}
            {status}
        </span>
    </div>
);

export default function StudentAttendancePage() {
    const { stats, monthly, recent } = attendanceData;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">My Attendance</h1>
                <p className="text-sm text-gray-500 mt-1">Class 10-A • Roll No. 045</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Overall Attendance"
                    value={`${stats.overall}%`}
                    subtext="Keep it up"
                    subtextColor="text-green-600"
                />
                <StatCard
                    title="Classes Attended"
                    value={stats.attended}
                    subtext={`out of ${stats.totalClasses} classes`}
                    valueColor="text-green-600"
                />
                <StatCard
                    title="Classes Missed"
                    value={stats.missed}
                    subtext="This term"
                    valueColor="text-red-600"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Monthly Breakdown */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-800 mb-6">Monthly Breakdown</h2>
                    <div>
                        {monthly.map((m, index) => (
                            <MonthlyProgressBar key={index} {...m} />
                        ))}
                    </div>
                </div>

                {/* Recent Attendance */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Attendance</h2>
                    <div className="space-y-1">
                        {recent.map((record, index) => (
                            <AttendanceRow key={index} {...record} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
