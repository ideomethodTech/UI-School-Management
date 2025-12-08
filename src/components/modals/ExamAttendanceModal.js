// src/components/modals/ExamAttendanceModal.js
"use client";

import { X, UserCheck, UserX, Users } from 'lucide-react';

// Mock data for students attendance
const generateMockAttendance = (examTitle) => {
    const allStudents = [
        { id: 1, name: 'Aarav Sharma', rollNo: '001', present: true },
        { id: 2, name: 'Priya Patel', rollNo: '002', present: true },
        { id: 3, name: 'Rohan Kumar', rollNo: '003', present: false },
        { id: 4, name: 'Ananya Singh', rollNo: '004', present: true },
        { id: 5, name: 'Vikram Reddy', rollNo: '005', present: true },
        { id: 6, name: 'Ishita Gupta', rollNo: '006', present: true },
        { id: 7, name: 'Aditya Verma', rollNo: '007', present: false },
        { id: 8, name: 'Sneha Iyer', rollNo: '008', present: true },
        { id: 9, name: 'Arjun Nair', rollNo: '009', present: true },
        { id: 10, name: 'Kavya Menon', rollNo: '010', present: false },
    ];

    return allStudents;
};

export default function ExamAttendanceModal({ isOpen, onClose, exam }) {
    if (!isOpen || !exam) return null;

    const students = generateMockAttendance(exam.title);
    const presentStudents = students.filter(s => s.present);
    const absentStudents = students.filter(s => !s.present);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-white p-6 border-b border-gray-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">{exam.title}</h2>
                            <p className="text-gray-500 text-sm mt-1">{exam.class} • {exam.date}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-6">
                        <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg">
                            <div className="flex items-center gap-2">
                                <Users size={20} className="text-gray-600" />
                                <div>
                                    <p className="text-2xl font-bold text-gray-800">{students.length}</p>
                                    <p className="text-xs text-gray-500">Total</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                            <div className="flex items-center gap-2">
                                <UserCheck size={20} className="text-green-600" />
                                <div>
                                    <p className="text-2xl font-bold text-green-700">{presentStudents.length}</p>
                                    <p className="text-xs text-green-600">Present</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                            <div className="flex items-center gap-2">
                                <UserX size={20} className="text-red-600" />
                                <div>
                                    <p className="text-2xl font-bold text-red-700">{absentStudents.length}</p>
                                    <p className="text-xs text-red-600">Absent</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-250px)]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Present Students */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                Present ({presentStudents.length})
                            </h3>
                            <div className="space-y-2">
                                {presentStudents.map(student => (
                                    <div
                                        key={student.id}
                                        className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg"
                                    >
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-semibold">
                                            {student.rollNo}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-800">{student.name}</p>
                                            <p className="text-xs text-gray-500">Roll No: {student.rollNo}</p>
                                        </div>
                                        <UserCheck size={20} className="text-green-600" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Absent Students */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                Absent ({absentStudents.length})
                            </h3>
                            <div className="space-y-2">
                                {absentStudents.map(student => (
                                    <div
                                        key={student.id}
                                        className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg"
                                    >
                                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-700 font-semibold">
                                            {student.rollNo}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-800">{student.name}</p>
                                            <p className="text-xs text-gray-500">Roll No: {student.rollNo}</p>
                                        </div>
                                        <UserX size={20} className="text-red-600" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600">
                            Attendance Rate: <span className="font-bold text-gray-800">
                                {Math.round((presentStudents.length / students.length) * 100)}%
                            </span>
                        </p>
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
