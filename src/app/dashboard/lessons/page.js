// src/app/dashboard/lessons/page.js
"use client";

import { useState } from 'react';
import LessonsTable from '@/components/shared/LessonsTable';
import { Search, SlidersHorizontal, Plus, X } from 'lucide-react';
import { sampleLessons } from '@/mockData/adminData';

export default function LessonsPage() {
    const [data, setData] = useState(sampleLessons);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('create');
    const [currentLesson, setCurrentLesson] = useState(null);
    const [formState, setFormState] = useState({
        subjectName: '', class: '', teacher: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const openModal = (type, lesson = null) => {
        setModalType(type);
        if (type === 'edit' && lesson) {
            setCurrentLesson(lesson);
            setFormState({
                subjectName: lesson.subjectName,
                class: lesson.class,
                teacher: lesson.teacher
            });
        } else {
            setCurrentLesson(null);
            setFormState({ subjectName: '', class: '', teacher: '' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formState.subjectName.trim()) {
            alert('Subject Name is required.');
            return;
        }

        if (modalType === 'create') {
            setData([...data, { ...formState }]);
        } else {
            setData(data.map(item => item.subjectName === currentLesson.subjectName ? { ...item, ...formState } : item));
        }
        closeModal();
    };

    const handleDelete = (subjectName) => {
        if (window.confirm(`Are you sure you want to delete lesson ${subjectName}?`)) {
            setData(data.filter(item => item.subjectName !== subjectName));
        }
    };

    // Filter lessons based on search term
    const filteredData = data.filter(lesson => {
        const search = searchTerm.toLowerCase();
        return (
            lesson.subjectName?.toLowerCase().includes(search) ||
            lesson.class?.toLowerCase().includes(search) ||
            lesson.teacher?.toLowerCase().includes(search)
        );
    });

    return (
        <div className='p-6 space-y-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h2 className='text-2xl font-semibold text-gray-800'>All Lessons</h2>
                </div>
                <div className='flex items-center gap-3'>
                    <div className='relative'>
                        <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                        <input
                            placeholder='Search...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='rounded-full border border-gray-300 pl-10 pr-4 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400'
                        />
                    </div>
                    <button
                        onClick={() => openModal('create')}
                        className='p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 shadow-md'
                    >
                        <Plus size={20} />
                    </button>
                </div>
            </div>

            <div className='bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm'>
                <LessonsTable
                    data={filteredData}
                    onEdit={(lesson) => openModal('edit', lesson)}
                    onDelete={handleDelete}
                />
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={closeModal}>
                    <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">{modalType === 'create' ? 'Create New Lesson' : 'Edit Lesson'}</h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Subject Name</label><input name="subjectName" type="text" value={formState.subjectName} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Class</label><input name="class" type="text" value={formState.class} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Teacher</label><input name="teacher" type="text" value={formState.teacher} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
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
