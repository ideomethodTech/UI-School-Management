// src/app/dashboard/results/page.js
"use client";

import { useState } from 'react';
import ResultsTable from '@/components/shared/ResultsTable';
import TeacherResultsPage from '@/components/teacher/TeacherResultsPage';
import StudentResultsPage from '@/components/student/StudentResultsPage';
import { SlidersHorizontal, Plus, X } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { SearchBar, useSearch } from '../Search';

const sampleResults = [
    { id: 1, subject: 'Math', studentName: 'John Smith', studentId: 'STD001', score: 90, teacherName: 'Mr. Johnson', teacherId: 'TCH001', className: '1A', date: '2025-01-01' },
    { id: 2, subject: 'English', studentName: 'John Smith', studentId: 'STD001', score: 85, teacherName: 'Ms. Williams', teacherId: 'TCH002', className: '1A', date: '2025-01-02' },
    { id: 3, subject: 'Science', studentName: 'Alice Green', studentId: 'STD002', score: 92, teacherName: 'Mr. Johnson', teacherId: 'TCH001', className: '2B', date: '2025-01-01' },
    { id: 4, subject: 'Social Studies', studentName: 'Alice Green', studentId: 'STD002', score: 88, teacherName: 'Ms. Davis', teacherId: 'TCH003', className: '2B', date: '2025-01-02' },
    { id: 5, subject: 'Art', studentName: 'Bob White', studentId: 'STD003', score: 95, teacherName: 'Ms. Garcia', teacherId: 'TCH004', className: '3C', date: '2025-01-03' },
    { id: 6, subject: 'Music', studentName: 'Bob White', studentId: 'STD003', score: 78, teacherName: 'Mr. Martinez', teacherId: 'TCH005', className: '3C', date: '2025-01-04' },
    { id: 7, subject: 'History', studentName: 'John Smith', studentId: 'STD001', score: 80, teacherName: 'Mr. Johnson', teacherId: 'TCH001', className: '1A', date: '2025-01-03' },
    { id: 8, subject: 'Geography', studentName: 'Alice Green', studentId: 'STD002', score: 91, teacherName: 'Ms. Williams', teacherId: 'TCH002', className: '2B', date: '2025-01-04' },
    { id: 9, subject: 'Physics', studentName: 'Bob White', studentId: 'STD003', score: 87, teacherName: 'Ms. Davis', teacherId: 'TCH003', className: '3C', date: '2025-01-05' },
    { id: 10, subject: 'Chemistry', studentName: 'John Smith', studentId: 'STD001', score: 93, teacherName: 'Ms. Garcia', teacherId: 'TCH004', className: '1A', date: '2025-01-06' },
];

export default function ResultsPage() {
    const { currentUserRole } = useUser();
    const [data, setData] = useState(sampleResults);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('create');
    const [currentResult, setCurrentResult] = useState(null);
    const [formState, setFormState] = useState({
        subject: '', score: '', studentName: '', teacherName: '', className: '', date: ''
    });

    // Add search functionality for admin
    const { searchTerm, setSearchTerm, filteredData: filteredResults } = useSearch(
        data,
        ['subject', 'studentName', 'studentId', 'teacherName', 'className', 'score', 'date']
    );

    // Teachers see the TeacherResultsPage
    if (currentUserRole === 'teacher') {
        return (
            <div className='p-6 overflow-y-auto h-full'>
                <TeacherResultsPage />
            </div>
        );
    }

    // Students see the StudentResultsPage without container
    if (currentUserRole === 'student') {
        return (
            <div className='p-6 space-y-6'>
                <StudentResultsPage />
            </div>
        );
    }

    // Admin Logic
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const openModal = (type, result = null) => {
        setModalType(type);
        if (type === 'edit' && result) {
            setCurrentResult(result);
            setFormState({
                subject: result.subject,
                score: result.score,
                studentName: result.studentName,
                teacherName: result.teacherName,
                className: result.className,
                date: result.date
            });
        } else {
            setCurrentResult(null);
            setFormState({ subject: '', score: '', studentName: '', teacherName: '', className: '', date: '' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formState.subject.trim()) {
            alert('Subject is required.');
            return;
        }

        if (modalType === 'create') {
            setData([...data, { id: Date.now(), ...formState }]);
        } else {
            setData(data.map(item => item.id === currentResult.id ? { ...item, ...formState } : item));
        }
        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this result?')) {
            setData(data.filter(item => item.id !== id));
        }
    };

    const getPageTitle = () => {
        switch (currentUserRole) {
            case 'admin':
                return 'All Student Results';
            default:
                return 'Results';
        }
    };

    return (
        <div className='p-6 space-y-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h2 className='text-2xl font-semibold text-gray-800'>{getPageTitle()}</h2>
                </div>

                <div className='flex items-center gap-3'>
                    {/* Admin specific actions */}
                    <SearchBar
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder='Search results...'
                    />
                    <button className='p-2 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'>
                        <SlidersHorizontal size={20} />
                    </button>
                    <button
                        onClick={() => openModal('create')}
                        className='p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 shadow-md'
                    >
                        <Plus size={20} />
                    </button>
                </div>
            </div>

            <div className='bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm'>
                <ResultsTable
                    role={currentUserRole}
                    rows={filteredResults}
                    onEdit={(result) => openModal('edit', result)}
                    onDelete={handleDelete}
                />
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={closeModal}>
                    <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">{modalType === 'create' ? 'Create New Result' : 'Edit Result'}</h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Subject Name</label><input name="subject" type="text" value={formState.subject} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Student</label><input name="studentName" type="text" value={formState.studentName} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Score</label><input name="score" type="number" value={formState.score} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Teacher</label><input name="teacherName" type="text" value={formState.teacherName} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Class</label><input name="className" type="text" value={formState.className} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Date</label><input name="date" type="date" value={formState.date} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
                            <div className="flex justify-end gap-4 pt-4">
                                <button type="button" onClick={closeModal} className="px-6 py-2 border rounded-lg text-gray-700 font-semibold hover:bg-gray-100">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700">{modalType === 'create' ? 'Create' : 'Save Changes'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}