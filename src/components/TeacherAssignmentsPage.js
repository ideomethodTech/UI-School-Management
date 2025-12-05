// src/components/TeacherAssignmentsPage.js
"use client";

import { useState } from 'react';
import { Plus, X, Eye, Calendar } from 'lucide-react';
import CreateAssignmentModal from './CreateAssignmentModal';




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
                    <StatCard label="Total Assignments" value="3" />
                    <StatCard label="Total Submissions" value="115" />
                    <StatCard label="Avg Submission Rate" value="85%" />
                </div>

                {/* My Assignments List */}
                <div className="space-y-4">
                    <h2 className="font-bold text-xl text-gray-800">My Assignments</h2>
                    <AssignmentItem
                        title="Chapter 5 - Quadratic Equations"
                        description="Solve practice problems from page 45-50"
                        meta="Mathematics • Class 10-A • Created Dec 8, 2024"
                        dueDate="Dec 15, 2024"
                        submitted={38}
                        total={45}
                    />
                    <AssignmentItem
                        title="Chapter 6 - Geometry Exercise"
                        description="Complete all geometry proofs and constructions"
                        meta="Mathematics • Class 10-B • Created Dec 10, 2024"
                        dueDate="Dec 18, 2024"
                        submitted={35}
                        total={42}
                    />
                </div>
            </div>

            {/* Render the Modal */}
            <CreateAssignmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}