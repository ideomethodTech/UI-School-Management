// src/components/StudentAttendancePage.js
"use client";

import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { studentAttendancePageData as attendanceData } from '../../mockData/studentData';

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
    const [selectedMonth, setSelectedMonth] = useState('past3');

    // Filter monthly data based on selected month
    const filteredMonthly = selectedMonth === 'past3'
        ? monthly
        : monthly.filter(m => m.month.toLowerCase() === selectedMonth.toLowerCase());

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
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-800">Monthly Breakdown</h2>
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 hover:border-gray-400"
                        >
                            <option value="past3">Past 3 Months</option>
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
                    <div>
                        {filteredMonthly.map((m, index) => (
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
