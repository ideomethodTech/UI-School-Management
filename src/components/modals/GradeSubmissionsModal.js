"use client";

import React, { useState } from 'react';
import { X, Pencil, Check } from 'lucide-react';
import { mockStudentResults, mockClasses } from '../../mockData/teacherData';

// Individual Student Grading Modal
const GradeStudentModal = ({ isOpen, onClose, student, onSave }) => {
    const [midterm, setMidterm] = useState(student?.midterm || 0);
    const [final, setFinal] = useState(student?.final || 0);
    const [assignments, setAssignments] = useState(student?.assignments || 0);

    if (!isOpen || !student) return null;

    const overall = Math.round((midterm + final + assignments) / 3);

    const handleSave = () => {
        onSave({ midterm, final, assignments, overall });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[60] p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Grade Student</h2>
                        <p className="text-sm text-gray-500">{student.name} (Roll No: {student.rollNo})</p>
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Midterm Score</label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={midterm}
                            onChange={(e) => setMidterm(Number(e.target.value))}
                            className="w-full px-4 py-2.5 border-2 border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Final Score</label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={final}
                            onChange={(e) => setFinal(Number(e.target.value))}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Assignments Score</label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            value={assignments}
                            onChange={(e) => setAssignments(Number(e.target.value))}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500"
                        />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Overall Score</p>
                        <p className="text-3xl font-bold text-gray-800">{overall}</p>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-5 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                    >
                        Save Grades
                    </button>
                </div>
            </div>
        </div>
    );
};

// Main Grade Submissions Modal
export default function GradeSubmissionsModal({ isOpen, onClose, selectedClass }) {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isGradingOpen, setIsGradingOpen] = useState(false);
    const [checkedStudents, setCheckedStudents] = useState({});
    const [currentClass, setCurrentClass] = useState(selectedClass?.id || mockClasses[0].id);
    const [students, setStudents] = useState(() => {
        // Load from localStorage or use mock data
        const stored = localStorage.getItem('student_grades');
        return stored ? JSON.parse(stored) : mockStudentResults;
    });

    if (!isOpen) return null;

    const handleCheckStudent = (studentId) => {
        setCheckedStudents(prev => ({
            ...prev,
            [studentId]: !prev[studentId]
        }));
    };

    const handleEditStudent = (student) => {
        setSelectedStudent(student);
        setIsGradingOpen(true);
    };

    const handleSaveGrade = (grades) => {
        // Update the student's grades in state
        const updatedStudents = students.map(student => {
            if (student.id === selectedStudent.id) {
                const updatedStudent = {
                    ...student,
                    midterm: grades.midterm,
                    final: grades.final,
                    assignments: grades.assignments,
                    overall: grades.overall,
                    // Calculate grade based on overall score
                    grade: grades.overall >= 90 ? 'A+' :
                        grades.overall >= 80 ? 'A' :
                            grades.overall >= 70 ? 'B' :
                                grades.overall >= 60 ? 'C' : 'D'
                };
                return updatedStudent;
            }
            return student;
        });

        // Update state
        setStudents(updatedStudents);

        // Save to localStorage
        localStorage.setItem('student_grades', JSON.stringify(updatedStudents));

        // Close the grading modal
        setIsGradingOpen(false);
    };

    const currentClassName = mockClasses.find(c => c.id === currentClass)?.name || 'Class 10-A';

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={onClose}>
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                    {/* Header */}
                    <div className="flex justify-between items-start p-6 border-b border-gray-200 flex-shrink-0">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Grade Submissions</h2>
                            <p className="text-sm text-gray-500">Review and grade student submissions</p>
                        </div>
                        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                            <X size={20} className="text-gray-500" />
                        </button>
                    </div>

                    {/* Class Selection Dropdown */}
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
                        <select
                            value={currentClass}
                            onChange={(e) => setCurrentClass(Number(e.target.value))}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
                        >
                            {mockClasses.map(cls => (
                                <option key={cls.id} value={cls.id}>
                                    {cls.name} ({cls.students} students)
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Student List */}
                    <div className="p-6 overflow-y-auto flex-grow space-y-3">
                        {students.map((student) => (
                            <div
                                key={student.id}
                                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-purple-200 hover:bg-purple-50 transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <input
                                        type="checkbox"
                                        checked={checkedStudents[student.id] || false}
                                        onChange={() => handleCheckStudent(student.id)}
                                        className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                    />
                                    <div>
                                        <p className="font-semibold text-gray-800">{student.name}</p>
                                        <p className="text-sm text-gray-500">Roll No: {student.rollNo} • Overall: {student.overall} ({student.grade})</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleEditStudent(student)}
                                    className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-purple-600 transition-colors"
                                >
                                    <Pencil size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Individual Student Grading Modal */}
            <GradeStudentModal
                isOpen={isGradingOpen}
                onClose={() => setIsGradingOpen(false)}
                student={selectedStudent}
                onSave={handleSaveGrade}
            />
        </>
    );
}
