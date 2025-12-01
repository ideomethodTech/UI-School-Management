import React, { useState } from 'react';
import { X, Edit2, ChevronUp, ChevronDown } from 'lucide-react';

const GradeSubmissionsModal = ({ isOpen, onClose, className = "10-A" }) => {
    const [selectedStudent, setSelectedStudent] = useState(null);

    // Mock data matching your image
    const [students] = useState([
        { id: 1, name: 'Aarav Sharma', rollNo: '10001', midterm: 85, final: 92, assignments: 88, overall: 89 },
        { id: 2, name: 'Priya Patel', rollNo: '10002', midterm: 78, final: 82, assignments: 85, overall: 82 },
        { id: 3, name: 'Rohan Kumar', rollNo: '10003', midterm: 92, final: 88, assignments: 90, overall: 90 },
        { id: 4, name: 'Ananya Singh', rollNo: '10004', midterm: 68, final: 75, assignments: 72, overall: 72 },
        { id: 5, name: 'Vikram Reddy', rollNo: '10005', midterm: 95, final: 98, assignments: 95, overall: 96 },
        { id: 6, name: 'Ishita Gupta', rollNo: '10006', midterm: 82, final: 85, assignments: 88, overall: 85 },
    ]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                {selectedStudent ? (
                    <GradeStudentForm
                        student={selectedStudent}
                        onBack={() => setSelectedStudent(null)}
                        onClose={onClose}
                    />
                ) : (
                    <StudentList
                        students={students}
                        className={className}
                        onClose={onClose}
                        onSelectStudent={setSelectedStudent}
                    />
                )}
            </div>
        </div>
    );
};

const StudentList = ({ students, className, onClose, onSelectStudent }) => (
    <>
        <div className="p-6 border-b border-gray-100 flex justify-between items-start">
            <div>
                <h2 className="text-xl font-bold text-gray-900">Grade Submissions</h2>
                <p className="text-gray-500 text-sm mt-1">Review and grade student submissions for {className}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
            </button>
        </div>

        <div className="p-6 overflow-y-auto">
            <div className="space-y-3">
                {students.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-purple-200 hover:bg-purple-50 transition-colors group">
                        <div className="flex items-center gap-4">
                            <input
                                type="checkbox"
                                className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <div>
                                <h3 className="font-semibold text-gray-900">{student.name}</h3>
                                <p className="text-sm text-gray-500">Roll No: {student.rollNo}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => onSelectStudent(student)}
                            className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-100 rounded-full transition-colors"
                        >
                            <Edit2 size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    </>
);

const GradeStudentForm = ({ student, onBack, onClose }) => {
    const [scores, setScores] = useState({
        midterm: student.midterm,
        final: student.final,
        assignments: student.assignments
    });

    // Calculate overall score dynamically
    const overallScore = Math.round((Number(scores.midterm) + Number(scores.final) + Number(scores.assignments)) / 3);

    return (
        <>
            <div className="p-6 border-b border-gray-100 flex justify-between items-start">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Grade Student</h2>
                    <p className="text-gray-500 text-sm mt-1">{student.name} (Roll No: {student.rollNo})</p>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <X size={24} />
                </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Midterm Score</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={scores.midterm}
                            onChange={(e) => setScores({ ...scores, midterm: e.target.value })}
                            className="w-full px-4 py-3 border-2 border-purple-600 rounded-lg focus:outline-none focus:ring-0 text-gray-900 font-medium"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col">
                            <ChevronUp size={16} className="text-gray-400 cursor-pointer hover:text-purple-600" />
                            <ChevronDown size={16} className="text-gray-400 cursor-pointer hover:text-purple-600" />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Final Score</label>
                    <input
                        type="number"
                        value={scores.final}
                        onChange={(e) => setScores({ ...scores, final: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Assignments Score</label>
                    <input
                        type="number"
                        value={scores.assignments}
                        onChange={(e) => setScores({ ...scores, assignments: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                    />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm text-gray-500 mb-1">Overall Score</label>
                    <div className="text-3xl font-bold text-gray-900">{overallScore}</div>
                </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
                <button
                    onClick={onBack}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
                >
                    Save Grades
                </button>
            </div>
        </>
    );
};

export default GradeSubmissionsModal;
