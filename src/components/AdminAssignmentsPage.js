// src/components/AdminAssignmentsPage.js
"use client";

import { Search, SlidersHorizontal, Plus, Pencil, Trash2 } from 'lucide-react';

// Using the correct data from the "All Lessons" screenshot for a perfect match
const assignmentsData = [
    { subject: 'Math', class: '1A', teacher: 'Tommy Wise' },
    { subject: 'English', class: '2A', teacher: 'Rhoda Frank' },
    { subject: 'Science', class: '3A', teacher: 'Della Dunn' },
    { subject: 'Social Studies', class: '1B', teacher: 'Bruce Rodriguez' },
    { subject: 'Art', class: '4A', teacher: 'Birdie Butler' },
    { subject: 'Music', class: '5A', teacher: 'Bettie Oliver' },
    { subject: 'History', class: '6A', teacher: 'Herman Howard' },
    { subject: 'Geography', class: '6B', teacher: 'Lucinda Thomas' },
];

export default function AdminAssignmentsPage() {
    return (
        <div className="p-6 space-y-6">
            {/* Header Toolbar */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">All Assignments</h1>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-64 pl-11 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                        />
                    </div>
                    <button className="p-2.5 bg-white border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 shadow-sm">
                        <SlidersHorizontal size={20} />
                    </button>
                    <button className="p-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-sm">
                        <Plus size={20} />
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
                                <th className="text-left px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {assignmentsData.map((assignment, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-5 font-medium text-gray-900">{assignment.subject}</td>
                                    <td className="px-6 py-5 text-gray-600">{assignment.class}</td>
                                    <td className="px-6 py-5 text-gray-600">{assignment.teacher}</td>
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