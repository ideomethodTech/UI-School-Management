// src/components/TeacherAssignmentsPage.js
"use client";

import { useState, useEffect } from 'react';
import { Plus, Eye, Trash2 } from 'lucide-react';
import { mockAssignments, mockAssignmentStats } from '../../mockData/teacherData';
import CreateAssignmentModal from '../modals/CreateAssignmentModal';


// --- TEACHER ASSIGNMENTS PAGE COMPONENTS ---

const StatCard = ({ label, value }) => (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-4xl font-bold mt-1 text-gray-800">{value}</p>
    </div>
);

const AssignmentItem = ({ title, description, meta, dueDate, submitted, total, onDelete }) => {
    const submissionRate = total > 0 ? Math.round((submitted / total) * 100) : 0;
    return (
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900">{title}</h3>
                    <p className="text-sm text-gray-500">{description}</p>
                    <p className="text-xs text-gray-400 mt-1">{meta}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <button className="p-2.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200 transition-colors">
                        <Eye size={18} />
                    </button>
                    <button
                        onClick={onDelete}
                        className="p-2.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-colors"
                        title="Delete assignment"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
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
    const [assignments, setAssignments] = useState(mockAssignments);

    // Load assignments from localStorage on mount
    useEffect(() => {
        const storedAssignments = localStorage.getItem('teacher_assignments');
        if (storedAssignments) {
            const parsed = JSON.parse(storedAssignments);
            // Merge stored assignments with mock assignments, avoiding duplicates if needed
            // For simplicity, we'll just prepend stored ones to mock ones if they aren't already there
            // Or better, just use stored ones if available, else mock. 
            // But since mock data is static, let's just combine: stored (newly created) + mock
            setAssignments([...parsed, ...mockAssignments]);
        }
    }, []);

    const handleCreateAssignment = (newAssignment) => {
        // Add to state
        const updatedAssignments = [newAssignment, ...assignments];
        setAssignments(updatedAssignments);

        // Save new assignment to localStorage (only the new ones usually, but here we can store the list of *created* ones)
        // To avoid storing the mock data repeatedly, let's just store the "custom" assignments separately in a real app.
        // For this prototype, let's just get the current "custom" list from LS and add to it.
        const existingStored = JSON.parse(localStorage.getItem('teacher_assignments') || '[]');
        const updatedStored = [newAssignment, ...existingStored];
        localStorage.setItem('teacher_assignments', JSON.stringify(updatedStored));
    };

    const handleDeleteAssignment = (assignmentId) => {
        if (window.confirm('Are you sure you want to delete this assignment? This action cannot be undone.')) {
            // Remove from state
            const updatedAssignments = assignments.filter(assignment => assignment.id !== assignmentId);
            setAssignments(updatedAssignments);

            // Update localStorage - remove from stored assignments
            const storedAssignments = JSON.parse(localStorage.getItem('teacher_assignments') || '[]');
            const updatedStored = storedAssignments.filter(assignment => assignment.id !== assignmentId);
            localStorage.setItem('teacher_assignments', JSON.stringify(updatedStored));
        }
    };

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
                    <StatCard label="Total Assignments" value={assignments.length} />
                    <StatCard label="Total Submissions" value={mockAssignmentStats.totalSubmissions} />
                    <StatCard label="Avg Submission Rate" value={mockAssignmentStats.avgSubmissionRate} />
                </div>

                {/* My Assignments List */}
                <div className="space-y-4">
                    <h2 className="font-bold text-xl text-gray-800">My Assignments</h2>
                    {assignments.length > 0 ? (
                        assignments.map((assignment) => (
                            <AssignmentItem
                                key={assignment.id}
                                title={assignment.title}
                                description={assignment.description}
                                meta={assignment.meta}
                                dueDate={assignment.dueDate}
                                submitted={assignment.submitted}
                                total={assignment.total}
                                onDelete={() => handleDeleteAssignment(assignment.id)}
                            />
                        ))
                    ) : (
                        <div className="bg-white p-8 rounded-xl border border-gray-200 text-center">
                            <p className="text-gray-500">No assignments yet. Create one to get started!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Render the Modal */}
            <CreateAssignmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleCreateAssignment}
            />
        </>
    );
}