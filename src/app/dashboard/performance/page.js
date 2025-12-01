// src/app/dashboard/performance/page.js
"use client";

import React from 'react';
import Link from 'next/link';
import { TrendingUp, BookOpen, ArrowRight } from 'lucide-react';

// Mock performance data
const performanceData = {
    childName: 'Emily Johnson',
    class: 'Grade 9A',
    overallGrade: 'A-',
    gpa: '3.7',
    subjects: [
        { id: 1, name: 'Mathematics', currentGrade: 'A-', score: 87, previousScore: 82, trend: 'up' },
        { id: 2, name: 'English', currentGrade: 'B+', score: 82, previousScore: 80, trend: 'up' },
        { id: 3, name: 'Science', currentGrade: 'A', score: 90, previousScore: 88, trend: 'up' },
        { id: 4, name: 'Social Studies', currentGrade: 'B+', score: 85, previousScore: 83, trend: 'up' },
        { id: 5, name: 'Hindi', currentGrade: 'A-', score: 88, previousScore: 86, trend: 'up' },
        { id: 6, name: 'Physical Education', currentGrade: 'A', score: 95, previousScore: 92, trend: 'up' },
    ],
    recentTests: [
        { id: 1, subject: 'Mathematics', testName: 'Mid-term Exam', score: 87, maxScore: 100, date: 'Nov 10, 2025' },
        { id: 2, subject: 'Science', testName: 'Unit Test 3', score: 92, maxScore: 100, date: 'Nov 8, 2025' },
        { id: 3, subject: 'English', testName: 'Essay Writing', score: 85, maxScore: 100, date: 'Nov 5, 2025' },
    ]
};

export default function PerformancePage() {
    const { childName, class: className, overallGrade, gpa, subjects, recentTests } = performanceData;

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-800'>Child's Performance</h1>
                    <p className='text-gray-600 mt-1'>{childName} - {className}</p>
                </div>
                <div className='flex gap-4'>
                    <div className='card px-6 py-3'>
                        <p className='text-sm text-gray-500'>Overall Grade</p>
                        <p className='text-2xl font-bold text-purple-600'>{overallGrade}</p>
                    </div>
                    <div className='card px-6 py-3'>
                        <p className='text-sm text-gray-500'>GPA</p>
                        <p className='text-2xl font-bold text-purple-600'>{gpa}</p>
                    </div>
                </div>
            </div>

            {/* Subject Performance Grid */}
            <div>
                <h2 className='text-xl font-semibold text-gray-800 mb-4'>Subject Performance</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {subjects.map(subject => (
                        <div key={subject.id} className='card p-5 relative'>
                            <div className='flex items-start justify-between mb-3'>
                                <div className='p-2 bg-purple-50 text-purple-600 rounded-md'>
                                    <BookOpen size={20} />
                                </div>
                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${subject.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                    {subject.trend === 'up' ? '↑' : '↓'} {Math.abs(subject.score - subject.previousScore)} points
                                </span>
                            </div>
                            <h3 className='font-semibold text-gray-800 mb-2'>{subject.name}</h3>
                            <div className='flex items-center gap-3'>
                                <span className='text-2xl font-bold text-purple-600'>{subject.currentGrade}</span>
                                <span className='text-sm text-gray-500'>Score: {subject.score}%</span>
                            </div>
                            <div className='mt-3'>
                                <div className='h-2 bg-gray-100 rounded-full overflow-hidden'>
                                    <div
                                        className='h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full'
                                        style={{ width: `${subject.score}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Tests */}
            <div className='card p-6 relative'>
                <Link
                    href="/dashboard/results"
                    className="absolute top-5 right-5 text-purple-600 hover:text-purple-700 text-xs font-medium flex items-center gap-1 transition-colors"
                >
                    View All Results <ArrowRight size={14} />
                </Link>
                <h2 className='text-xl font-semibold text-gray-800 mb-4'>Recent Tests</h2>
                <div className='space-y-4'>
                    {recentTests.map(test => (
                        <div key={test.id} className='flex items-center justify-between py-3 border-b border-gray-100 last:border-0'>
                            <div className='flex-1'>
                                <h3 className='font-medium text-gray-800'>{test.testName}</h3>
                                <p className='text-sm text-gray-500'>{test.subject} • {test.date}</p>
                            </div>
                            <div className='text-right'>
                                <p className='text-lg font-bold text-purple-600'>{test.score}/{test.maxScore}</p>
                                <p className='text-sm text-gray-500'>{Math.round((test.score / test.maxScore) * 100)}%</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
