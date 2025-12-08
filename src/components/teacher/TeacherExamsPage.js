"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Clock, Eye, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { examStats as stats, examClasses as classes, teacherExams as mockExams } from '../../mockData/teacherData';
import CreateExamModal from '../modals/CreateExamModal';
import ExamAttendanceModal from '../modals/ExamAttendanceModal';

// Toast Notification Component
const Toast = ({ message, onClose }) => (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-fade-in-up">
        <CheckCircle size={20} className="text-green-400" />
        <p className="text-sm font-medium">{message}</p>
    </div>
);

const TeacherExamsPage = () => {
    const [selectedClass, setSelectedClass] = useState('All Classes');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
    const [selectedExam, setSelectedExam] = useState(null);
    const [exams, setExams] = useState(mockExams);
    const [toastMessage, setToastMessage] = useState(null);

    // Load exams from localStorage on mount
    useEffect(() => {
        const storedExams = localStorage.getItem('teacher_exams');
        if (storedExams) {
            const parsed = JSON.parse(storedExams);
            // Merge stored exams with mock exams
            setExams([...parsed, ...mockExams]);
        }
    }, []);

    const showToast = (message) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleCreateExam = (newExam) => {
        // Add to state
        const updatedExams = [newExam, ...exams];
        setExams(updatedExams);

        // Save new exam to localStorage
        const existingStored = JSON.parse(localStorage.getItem('teacher_exams') || '[]');
        const updatedStored = [newExam, ...existingStored];
        localStorage.setItem('teacher_exams', JSON.stringify(updatedStored));

        showToast('Exam created successfully!');
    };

    const filteredExams = selectedClass === 'All Classes'
        ? exams
        : exams.filter(exam => exam.class === selectedClass);

    return (
        <div className="space-y-6 p-1 relative">
            {/* Toast Notification */}
            {toastMessage && <Toast message={toastMessage} />}

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Exams</h1>
                    <p className="text-sm text-gray-500 mt-1">Create and manage exams for your classes</p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
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
                            className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-purple-500 text-sm font-medium cursor-pointer"
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
                                        <button
                                            onClick={() => {
                                                if (exam.status === 'Completed') {
                                                    setSelectedExam(exam);
                                                    setIsAttendanceModalOpen(true);
                                                }
                                            }}
                                            disabled={exam.status !== 'Completed'}
                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${exam.status === 'Completed'
                                                ? 'text-gray-600 hover:text-purple-600 border border-gray-200 hover:border-purple-200 bg-white cursor-pointer'
                                                : 'text-gray-400 border border-gray-200 bg-gray-50 cursor-not-allowed'
                                                }`}
                                            title={exam.status === 'Completed' ? 'View attendance' : 'Available only for completed exams'}
                                        >
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

            {/* Create Exam Modal */}
            <CreateExamModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreateExam}
            />

            {/* Exam Attendance Modal */}
            <ExamAttendanceModal
                isOpen={isAttendanceModalOpen}
                onClose={() => {
                    setIsAttendanceModalOpen(false);
                    setSelectedExam(null);
                }}
                exam={selectedExam}
            />
        </div>
    );
};

export default TeacherExamsPage;
