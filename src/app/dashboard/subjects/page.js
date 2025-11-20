// src/app/dashboard/subjects/page.js
'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal, Plus, Pencil, Trash2 } from 'lucide-react';

// Initial mock data for subjects
const initialSubjectsData = [
    { id: 'sub001', name: 'Math', teachers: ['Alice Phelps', 'Russell Davidson', 'John Doe', 'Jane Smith'] },
    { id: 'sub002', name: 'English', teachers: ['Martha B. English', 'William T. Shakespeare'] },
    { id: 'sub003', name: 'Physics', teachers: ['Louis de Broglie'] },
    { id: 'sub004', name: 'Chemistry', teachers: ['Nathan Kelly', 'Benjamin Snyder'] },
    { id: 'sub005', name: 'Biology', teachers: ['Alma Benson', 'Lina Collier'] },
    { id: 'sub006', name: 'History', teachers: ['Hannah Bowman', 'Betty Obrien'] },
    { id: 'sub007', name: 'Geography', teachers: ['Lora French', 'Sue Brady'] },
    { id: 'sub008', name: 'Art', teachers: ['Harriet Alvarado', 'Mayme Keller'] },
];

// Helper component to display teachers as a simple comma-separated string
const TeachersList = ({ teachers }) => {
    // Join the array of teacher names into a single string.
    // If there are no teachers, display a placeholder.
    if (!teachers || teachers.length === 0) {
        return <span className='text-gray-500'>No teachers assigned</span>;
    }
    return <>{teachers.join(', ')}</>;
};

export default function SubjectsPage() {
    const [subjects, setSubjects] = useState(initialSubjectsData);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newSubjectName, setNewSubjectName] = useState('');
    const [newTeachers, setNewTeachers] = useState('');

    const handleCreateSubject = (e) => {
        e.preventDefault();
        if (!newSubjectName.trim()) {
            alert('Please enter a subject name.');
            return;
        }
        const newSubject = {
            id: `sub${Date.now()}`,
            name: newSubjectName.trim(),
            teachers: newTeachers.split(',').map(name => name.trim()).filter(Boolean),
        };
        setSubjects(prev => [...prev, newSubject]);
        setNewSubjectName('');
        setNewTeachers('');
        setIsModalOpen(false);
    };

    const handleDeleteSubject = (subjectIdToDelete) => {
        if (window.confirm('Are you sure you want to delete this subject?')) {
            setSubjects(prev => prev.filter(subject => subject.id !== subjectIdToDelete));
        }
    };

    const filteredSubjects = subjects.filter(subject =>
        subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.teachers.some(teacher => teacher.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className='p-6 space-y-6'>
            {/* Header */}
            <div className='flex items-center justify-between'>
                <div>
                    <h2 className='text-2xl font-semibold text-gray-800'>All Subjects</h2>
                </div>
                <div className='flex items-center gap-3'>
                    <div className='relative'>
                        <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                        <input
                            placeholder='Search subjects...'
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
                            <th scope='col' className='px-6 py-3'>Teachers</th>
                            <th scope='col' className='px-10 py-3 text-right'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSubjects.map((subject) => (
                            <tr key={subject.id} className='bg-white border-b hover:bg-gray-50'>
                                <td className='px-6 py-4 font-medium text-gray-900'>{subject.name}</td>
                                <td className='px-6 py-4'>
                                    <TeachersList teachers={subject.teachers} />
                                </td>
                                <td className='px-6 py-4'>
                                    <div className='flex items-center justify-end gap-2'>
                                        {/* UPDATED: Edit button is now blue */}
                                        <button className='p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200'>
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteSubject(subject.id)}
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

            {/* Modal for creating a new subject */}
            {isModalOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50' onClick={() => setIsModalOpen(false)}>
                    <div className='bg-white rounded-lg shadow-xl p-8 w-full max-w-md' onClick={(e) => e.stopPropagation()}>
                        <form onSubmit={handleCreateSubject}>
                            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>New Subject</h2>

                            <div className='space-y-4'>
                                <div>
                                    <label htmlFor='subjectName' className='block mb-2 text-sm font-medium text-gray-700'>Subject Name</label>
                                    <input
                                        type='text'
                                        id='subjectName'
                                        value={newSubjectName}
                                        onChange={(e) => setNewSubjectName(e.target.value)}
                                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300'
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor='teachers' className='block mb-2 text-sm font-medium text-gray-700'>Teachers (comma-separated)</label>
                                    <input
                                        type='text'
                                        id='teachers'
                                        value={newTeachers}
                                        onChange={(e) => setNewTeachers(e.target.value)}
                                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300'
                                        placeholder='e.g., John Doe, Jane Smith'
                                    />
                                </div>
                            </div>

                            <div className='flex justify-end gap-4 mt-8'>
                                <button type='button' onClick={() => setIsModalOpen(false)} className='px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 border'>
                                    Cancel
                                </button>
                                <button type='submit' className='px-5 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 shadow-sm'>
                                    Create Subject
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}