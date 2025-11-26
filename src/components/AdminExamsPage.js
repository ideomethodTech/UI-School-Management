// src/components/AdminExamsPage.js
"use client";

import { Search, SlidersHorizontal, Plus, Pencil, Trash2 } from 'lucide-react';

// Mock data for the exams list
const examsData = [
    { subject: 'Math', class: '1A', teacher: 'Tommy Wise', date: '2025-01-10' },
    { subject: 'English', class: '2A', teacher: 'Rhoda Frank', date: '2025-01-12' },
    { subject: 'Science', class: '3A', teacher: 'Della Dunn', date: '2025-01-15' },
    { subject: 'Social Studies', class: '1B', teacher: 'Bruce Rodriguez', date: '2025-01-18' },
    { subject: 'Art', class: '4A', teacher: 'Birdie Butler', date: '2025-01-20' },
    { subject: 'Music', class: '5A', teacher: 'Bettie Oliver', date: '2025-01-22' },
    { subject: 'History', class: '6A', teacher: 'Herman Howard', date: '2025-01-25' },
    { subject: 'Geography', class: '6B', teacher: 'Lucinda Thomas', date: '2025-01-28' },
];

export default function AdminExamsPage() {
    return (
        <div className="space-y-6">
            {/* Header Toolbar */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">All Exams</h1>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search exams..."
                            className="w-64 pl-11 pr-4 py-2.5 bg-white border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                        />
                    </div>
                    <button className="p-2.5 bg-white border border-gray-300 text-gray-600 rounded-full hover:bg-gray-50 shadow-sm">
                        <SlidersHorizontal size={16} />
                    </button>
                    <button className="p-2.5 bg-purple-600 text-white rounded-full hover:bg-purple-700 shadow-sm">
                        <Plus size={16} />
                    </button>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider">Subject Name</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider">Class</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider">Teacher</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {examsData.map((exam, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-5 font-medium text-gray-900">{exam.subject}</td>
                                    <td className="px-6 py-5 text-gray-600">{exam.class}</td>
                                    <td className="px-6 py-5 text-gray-600">{exam.teacher}</td>
                                    <td className="px-6 py-5 text-gray-600">{exam.date}</td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200">
                                                <Pencil size={18} />
                                            </button>
                                            <button className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 border border-red-200">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}