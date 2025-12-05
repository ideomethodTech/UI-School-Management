// src/components/StudentResultsPage.js
"use client";

import React, { useState } from 'react';
import { Download, TrendingUp, Trophy, Zap, ChevronDown } from 'lucide-react';
import { studentResultsData as studentData } from '../../mockData/studentData';

// Grade color mapping
const gradeColors = {
    'A+': 'bg-green-100 text-green-700',
    'A': 'bg-green-50 text-green-600',
    'B+': 'bg-blue-100 text-blue-700',
    'B': 'bg-blue-50 text-blue-600',
    'C+': 'bg-yellow-100 text-yellow-700',
    'C': 'bg-yellow-50 text-yellow-600',
    'D': 'bg-orange-100 text-orange-700',
    'F': 'bg-red-100 text-red-700'
};

export default function StudentResultsPage() {
    const [selectedTerm, setSelectedTerm] = useState('overall');

    const handleDownloadReport = () => {
        // Generate report content
        const reportContent = `
========================================
ACADEMIC PERFORMANCE REPORT
========================================

Student Information:
-------------------
Name: ${studentData.name}
Roll No: ${studentData.rollNo}
Class: ${studentData.class}
Email: ${studentData.email}

Overall Performance:
-------------------
Overall Score: ${studentData.overallScore}%
Class Rank: ${studentData.classRank} out of ${studentData.totalStudents}
Total Subjects: ${studentData.totalSubjects}

Subject-wise Performance:
------------------------
${studentData.subjects.map((subject, index) => `
${index + 1}. ${subject.name}
   Teacher: ${subject.teacher}
   Midterm: ${subject.midterm}%
   Final: ${subject.final}%
   Assignments: ${subject.assignments}%
   Overall: ${subject.overall}%
   Grade: ${subject.grade}
`).join('\n')}

Strengths:
---------
• Excellent performance in Mathematics and Social Studies
• Consistent improvement across all subjects
• Strong assignment completion rate

Focus Areas:
-----------
• Practice more English comprehension exercises
• Focus on Science practical applications
• Maintain regular study schedule

Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
========================================
        `.trim();

        // Create blob and download
        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Academic_Report_${studentData.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">My Results</h1>
                    <p className="text-gray-600">Your academic performance and grades</p>
                </div>

                {/* Download Button */}
                <button
                    onClick={handleDownloadReport}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                >
                    <Download size={16} className="text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Download Report</span>
                </button>
            </div>

            {/* Student Info Card */}
            <div className="bg-gradient-to-br from-purple-50 via-white to-purple-50 rounded-2xl p-6 border border-purple-100 shadow-sm">
                <div className="space-y-1">
                    <h2 className="text-xl font-semibold text-gray-800">{studentData.name}</h2>
                    <p className="text-sm text-gray-600">
                        Roll No: {studentData.rollNo} • Class {studentData.class}
                    </p>
                    <p className="text-sm text-purple-600">{studentData.email}</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Overall Score Card */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full opacity-50"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-gray-600">Overall Score</p>
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <TrendingUp size={18} className="text-blue-600" />
                            </div>
                        </div>
                        <p className="text-4xl font-bold text-gray-800 mb-1">{studentData.overallScore}%</p>
                        <p className="text-xs text-gray-500">Academic Performance</p>
                    </div>
                </div>

                {/* Class Rank Card */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full opacity-50"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-gray-600">Class Rank</p>
                            <div className="p-2 bg-amber-100 rounded-lg">
                                <Trophy size={18} className="text-amber-600" />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2 mb-1">
                            <p className="text-4xl font-bold text-amber-600">{studentData.classRank}st</p>
                        </div>
                        <p className="text-xs text-gray-500">Out of {studentData.totalStudents}</p>
                    </div>
                </div>

                {/* Subjects Card */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full opacity-50"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-gray-600">Subjects</p>
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <Zap size={18} className="text-orange-600" />
                            </div>
                        </div>
                        <p className="text-4xl font-bold text-gray-800 mb-1">{studentData.totalSubjects}</p>
                        <p className="text-xs text-gray-500">Enrolled Courses</p>
                    </div>
                </div>
            </div>

            {/* Subject-wise Performance */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">Subject-wise Performance</h2>
                </div>

                <div className="p-6 space-y-6">
                    {studentData.subjects.map((subject, index) => (
                        <div
                            key={subject.id}
                            className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-purple-200 transition-all duration-200"
                        >
                            {/* Subject Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                        {subject.name}
                                    </h3>
                                    <p className="text-sm text-purple-600">Teacher: {subject.teacher}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${gradeColors[subject.grade]}`}>
                                    {subject.grade}
                                </span>
                            </div>

                            {/* Score Breakdown */}
                            <div className="grid grid-cols-4 gap-4 mb-4">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Midterm</p>
                                    <p className="text-lg font-bold text-gray-800">{subject.midterm}%</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Final</p>
                                    <p className="text-lg font-bold text-gray-800">{subject.final}%</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Assignments</p>
                                    <p className="text-lg font-bold text-gray-800">{subject.assignments}%</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Overall</p>
                                    <p className="text-lg font-bold text-purple-600">{subject.overall}%</p>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="relative">
                                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${subject.overall}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Performance Insights (Optional section for future enhancement) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Strengths */}
                <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-green-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Strengths
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-0.5">✓</span>
                            <span>Excellent performance in Mathematics and Social Studies</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-0.5">✓</span>
                            <span>Consistent improvement across all subjects</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-0.5">✓</span>
                            <span>Strong assignment completion rate</span>
                        </li>
                    </ul>
                </div>

                {/* Areas for Improvement */}
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Focus Areas
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                            <span className="text-blue-600 mt-0.5">→</span>
                            <span>Practice more English comprehension exercises</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-600 mt-0.5">→</span>
                            <span>Focus on Science practical applications</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-600 mt-0.5">→</span>
                            <span>Maintain regular study schedule</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
