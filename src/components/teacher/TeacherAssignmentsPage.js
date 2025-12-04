// src/components/TeacherAssignmentsPage.js
"use client";

import { useState } from 'react';
import { Plus, X, Eye, Calendar } from 'lucide-react';
import { mockAssignments, mockAssignmentStats } from '../../mockData/teacherData';

// --- CREATE ASSIGNMENT MODAL COMPONENT ---

const CreateAssignmentModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Create New Assignment</h2>
                        <p className="text-sm text-gray-500">Add a new assignment for your class</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-gray-100"><X size={24} /></button>
                </div>
                {/* Modal Body - Form */}
                <form className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Title</label>
                        <input type="text" placeholder="e.g., Chapter 5: Practice Problems" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea placeholder="Assignment details and instructions" rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                            <input type="text" defaultValue="Mathematics" className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                            <input type="text" defaultValue="10-A" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                            <input type="text" placeholder="dd-mm-yyyy" className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" />
                            <Calendar className="absolute right-3 top-9 w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Total Marks</label>
                            <input type="number" defaultValue="100" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        </div>
                    </div>
                </form>
                {/* Modal Footer */}
                <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
                    <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 border">Cancel</button>
                    <button type="submit" className="px-5 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 shadow-sm">Create Assignment</button>
                </div>
            </div>
        </div>
    );
};


// --- TEACHER ASSIGNMENTS PAGE COMPONENTS ---

const StatCard = ({ label, value }) => (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-4xl font-bold mt-1 text-gray-800">{value}</p>
    </div>
);

const AssignmentItem = ({ title, description, meta, dueDate, submitted, total }) => {
    const submissionRate = Math.round((submitted / total) * 100);
    return (
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-lg text-gray-900">{title}</h3>
                    <p className="text-sm text-gray-500">{description}</p>
                    <p className="text-xs text-gray-400 mt-1">{meta}</p>
                </div>
                <button className="flex-shrink-0 p-2.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200">
                    <Eye size={18} />
                </button>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center text-sm">
                    <p className="text-gray-500">Due: {dueDate}</p>
                    <p className="font-semibold text-gray-700">{submitted}/{total} submitted</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${submissionRate}%` }}></div>
                </div>
            </div>
        </div>
    );
};


export default function TeacherAssignmentsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
                        <p className="text-sm text-gray-500 mt-1">Create and manage assignments for your classes</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold text-sm hover:bg-purple-700 shadow-sm"
                    >
                        <Plus size={18} />
                        Create Assignment
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <StatCard label="Total Assignments" value={mockAssignmentStats.totalAssignments} />
                    <StatCard label="Total Submissions" value={mockAssignmentStats.totalSubmissions} />
                    <StatCard label="Avg Submission Rate" value={mockAssignmentStats.avgSubmissionRate} />
                </div>

                {/* My Assignments List */}
                <div className="space-y-4">
                    <h2 className="font-bold text-xl text-gray-800">My Assignments</h2>
                    {mockAssignments.map((assignment) => (
                        <AssignmentItem
                            key={assignment.id}
                            title={assignment.title}
                            description={assignment.description}
                            meta={assignment.meta}
                            dueDate={assignment.dueDate}
                            submitted={assignment.submitted}
                            total={assignment.total}
                        />
                    ))}
                </div>
            </div>

            {/* Render the Modal */}
            <CreateAssignmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}