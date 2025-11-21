// src/app/dashboard/exams/page.js
'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal, Plus, Pencil, Trash2 } from 'lucide-react';

// Initial mock data for exams
const initialExamsData = [
    { id: 'exam001', subject: 'Math', class: '1A', teacher: 'Martha Morris', date: '2025-01-01' },
    { id: 'exam002', subject: 'English', class: '2A', teacher: 'Randall Garcia', date: '2025-01-01' },
    { id: 'exam003', subject: 'Science', class: '3A', teacher: 'Myrtie Scott', date: '2025-01-01' },
    { id: 'exam004', subject: 'Social Studies', class: '1B', teacher: 'Alvin Swanson', date: '2025-01-01' },
    { id: 'exam005', subject: 'Art', class: '4A', teacher: 'Mabelle Wallace', date: '2025-01-01' },
    { id: 'exam006', subject: 'Music', class: '5A', teacher: 'Dale Thompson', date: '2025-01-01' },
    { id: 'exam007', subject: 'History', class: '6A', teacher: 'Allie Conner', date: '2025-01-01' },
    { id: 'exam008', subject: 'Geography', class: '6B', teacher: 'Hunter Fuller', date: '2025-01-01' },
    { id: 'exam009', subject: 'Physics', class: '7A', teacher: 'Lois Lindsey', date: '2025-01-01' },
    { id: 'exam010', subject: 'Chemistry', class: '8A', teacher: 'Vera Soto', date: '2025-01-01' },
];

export default function ExamsPage() {
    const [exams, setExams] = useState(initialExamsData);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newExam, setNewExam] = useState({ subject: '', class: '', teacher: '', date: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewExam(prev => ({ ...prev, [name]: value }));
    };

    const handleCreateExam = (e) => {
        e.preventDefault();
        if (!newExam.subject.trim() || !newExam.class.trim() || !newExam.teacher.trim() || !newExam.date.trim()) {
            alert('Please fill out all fields.');
            return;
        }
        const createdExam = {
            id: `exam${Date.now()}`,
            ...newExam
        };
        setExams(prev => [createdExam, ...prev]);
        setNewExam({ subject: '', class: '', teacher: '', date: '' });
        setIsModalOpen(false);
    };

    const handleDeleteExam = (examIdToDelete) => {
        if (window.confirm('Are you sure you want to delete this exam?')) {
            setExams(prev => prev.filter(exam => exam.id !== examIdToDelete));
        }
    };

    const filteredExams = exams.filter(exam =>
        exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.teacher.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='p-6 space-y-6'>
            {/* Header */}
            <div className='flex items-center justify-between'>
                <div>
                    <h2 className='text-2xl font-semibold text-gray-800'>All Exams</h2>
                </div>
                <div className='flex items-center gap-3'>
                    <div className='relative'>
                        <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                        <input
                            placeholder='Search exams...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='rounded-full border border-gray-300 pl-10 pr-4 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400'
                        />
                    </div>
                    <button className='p-2 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'>
                        <SlidersHorizontal size={20} />
                    </button>
                    <button onClick={() => setIsModalOpen(true)} className='p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 shadow-md'>
                        <Plus size={20} />
                    </button>
                </div>
            </div>

            {/* Table Container */}
            <div className='bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm'>
                <table className='w-full text-sm text-left text-gray-600'>
                    <thead className='bg-gray-50 text-xs text-gray-500 uppercase'>
                        <tr>
                            <th scope='col' className='px-6 py-3'>Subject Name</th>
                            <th scope='col' className='px-6 py-3'>Class</th>
                            <th scope='col' className='px-6 py-3'>Teacher</th>
                            <th scope='col' className='px-6 py-3'>Date</th>
                            <th scope='col' className='px-10 py-3 text-right'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredExams.map((exam) => (
                            <tr key={exam.id} className='bg-white border-b hover:bg-gray-50'>
                                <td className='px-6 py-4 font-medium text-gray-900'>{exam.subject}</td>
                                <td className='px-6 py-4'>{exam.class}</td>
                                <td className='px-6 py-4'>{exam.teacher}</td>
                                <td className='px-6 py-4'>{exam.date}</td>
                                <td className='px-6 py-4'>
                                    <div className='flex items-center justify-end gap-2'>
                                        <button className='p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200'>
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteExam(exam.id)}
                                            className='p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200'
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for creating a new exam */}
            {isModalOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50' onClick={() => setIsModalOpen(false)}>
                    <div className='bg-white rounded-lg shadow-xl p-8 w-full max-w-md' onClick={(e) => e.stopPropagation()}>
                        <form onSubmit={handleCreateExam}>
                            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>New Exam</h2>
                            <div className='space-y-4'>
                                <div>
                                    <label className='block mb-2 text-sm font-medium text-gray-700'>Subject Name</label>
                                    <input name='subject' value={newExam.subject} onChange={handleInputChange} className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300' required />
                                </div>
                                <div>
                                    <label className='block mb-2 text-sm font-medium text-gray-700'>Class</label>
                                    <input name='class' value={newExam.class} onChange={handleInputChange} className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300' required />
                                </div>
                                <div>
                                    <label className='block mb-2 text-sm font-medium text-gray-700'>Teacher</label>
                                    <input name='teacher' value={newExam.teacher} onChange={handleInputChange} className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300' required />
                                </div>
                                <div>
                                    <label className='block mb-2 text-sm font-medium text-gray-700'>Date</label>
                                    <input type='date' name='date' value={newExam.date} onChange={handleInputChange} className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300' required />
                                </div>
                            </div>
                            <div className='flex justify-end gap-4 mt-8'>
                                <button type='button' onClick={() => setIsModalOpen(false)} className='px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 border'>
                                    Cancel
                                </button>
                                <button type='submit' className='px-5 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 shadow-sm'>
                                    Create Exam
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}