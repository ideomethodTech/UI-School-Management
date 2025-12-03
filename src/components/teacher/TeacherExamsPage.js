"use client";

import React, { useState } from 'react';
import { Plus, Calendar, Clock, Eye, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const TeacherExamsPage = () => {
    const [selectedClass, setSelectedClass] = useState('All Classes');

    // Mock Data
    const stats = [
        { label: 'Total Exams', value: '3', color: 'text-gray-900' },
        { label: 'Upcoming', value: '1', color: 'text-purple-600' },
        { label: 'Completed', value: '2', color: 'text-green-600' },
    ];

    const classes = ['All Classes', 'Class 10-A', 'Class 10-B', 'Class 11-A'];

    const exams = [
        {
            id: 1,
            title: 'Mid-Term Exam - Mathematics',
            subject: 'Mathematics',
            class: 'Class 10-A',
            date: 'Dec 20, 2024',
            duration: '3 hours',
            marks: '100 marks',
            status: 'Completed',
            statusColor: 'bg-green-100 text-green-700',
        },
        {
            id: 2,
            title: 'Unit Test - Geometry',
            subject: 'Mathematics',
            class: 'Class 10-B',
            date: 'Dec 18, 2024',
            duration: '1.5 hours',
            marks: '50 marks',
            status: 'Completed',
            statusColor: 'bg-green-100 text-green-700',
        },
        {
            id: 3,
            title: 'Algebra Quiz',
            subject: 'Mathematics',
            class: 'Class 11-A',
            date: 'Dec 25, 2024',
            duration: '1 hour',
            marks: '30 marks',
            status: 'Upcoming',
            statusColor: 'bg-purple-100 text-purple-700',
        },
    ];

    const filteredExams = selectedClass === 'All Classes'
        ? exams
        : exams.filter(exam => exam.class === selectedClass);

    return (
        <div className="space-y-6 p-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Exams</h1>
                    <p className="text-sm text-gray-500 mt-1">Create and manage exams for your classes</p>
                </div>
                <button className="flex items-center gap-2 bg-purple-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    <Plus size={20} />
                    Create Exam
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <p className="text-sm text-gray-500">{stat.label}</p>
                        <p className={`text-4xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* My Exams Section */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-xl font-bold text-gray-800">My Exams</h2>

                    {/* Class Filter Dropdown */}
                    <div className="relative">
                        <select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-sm font-medium cursor-pointer"
                        >
                            {classes.map((cls) => (
                                <option key={cls} value={cls}>{cls}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {filteredExams.length > 0 ? (
                        filteredExams.map((exam) => (
                            <div key={exam.id} className="border border-gray-100 rounded-lg p-5 hover:bg-gray-50 transition-colors">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-bold text-gray-900 text-lg">{exam.title}</h3>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-3">
                                            {exam.subject} • <span className="text-gray-700 font-medium">{exam.class}</span>
                                        </p>

                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={16} />
                                                {exam.date}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock size={16} />
                                                {exam.duration}
                                            </div>
                                            <div className="flex items-center gap-1.5 font-medium text-gray-700">
                                                <FileText size={16} />
                                                {exam.marks}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                                        <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 border border-gray-200 hover:border-purple200 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors bg-white">
                                            <Eye size={16} />
                                            View
                                        </button>
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${exam.statusColor}`}>
                                            {exam.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            <p>No exams found for {selectedClass}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeacherExamsPage;
