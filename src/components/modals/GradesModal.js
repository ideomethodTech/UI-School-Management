import React from 'react';
import { X } from 'lucide-react';

export default function GradesModal({ isOpen, onClose, classData }) {
    const [grades, setGrades] = React.useState({});

    // Mock students data
    const mockStudents = [
        { id: 1, name: 'Alice Johnson', rollNo: '101' },
        { id: 2, name: 'Bob Smith', rollNo: '102' },
        { id: 3, name: 'Charlie Brown', rollNo: '103' },
        { id: 4, name: 'Diana Prince', rollNo: '104' },
        { id: 5, name: 'Evan Wright', rollNo: '105' },
    ];

    const handleGradeChange = (studentId, value) => {
        setGrades(prev => ({
            ...prev,
            [studentId]: value
        }));
    };

    const handleSave = () => {
        console.log('Saving grades for class:', classData?.name, grades);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 transform transition-all max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center mb-6 border-b pb-4 flex-shrink-0">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Grades & Results</h2>
                        <p className="text-sm text-gray-500">{classData?.name} • {classData?.section}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="overflow-y-auto flex-grow">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                            <tr>
                                <th className="px-4 py-3">Roll No</th>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3 text-right">Score (Out of 100)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockStudents.map((student) => (
                                <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-900">{student.rollNo}</td>
                                    <td className="px-4 py-3 font-medium text-gray-800">{student.name}</td>
                                    <td className="px-4 py-3 text-right">
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            placeholder="0"
                                            value={grades[student.id] || ''}
                                            onChange={(e) => handleGradeChange(student.id, e.target.value)}
                                            className="w-20 px-2 py-1 text-right border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 flex justify-end gap-3 flex-shrink-0 pt-4 border-t">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 bg-gray-100 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        Save Grades
                    </button>
                </div>
            </div>
        </div>
    );
}
