// src/components/admin/AdminExamsPage.js
"use client";

import { useState } from 'react';
import { Search, SlidersHorizontal, Plus, Pencil, Trash2, X } from 'lucide-react';
import { initialExamsData } from '../../mockData/adminData';

export default function AdminExamsPage() {
    const [exams, setExams] = useState(initialExamsData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('create');
    const [currentExam, setCurrentExam] = useState(null);
    const [formState, setFormState] = useState({
        subject: '', class: '', teacher: '', date: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const openModal = (type, exam = null) => {
        setModalType(type);
        if (type === 'edit' && exam) {
            setCurrentExam(exam);
            setFormState({
                subject: exam.subject,
                class: exam.class,
                teacher: exam.teacher,
                date: exam.date
            });
        } else {
            setCurrentExam(null);
            setFormState({ subject: '', class: '', teacher: '', date: '' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formState.subject.trim() || !formState.date.trim()) {
            alert('Subject and Date are required.');
            return;
        }

        const examData = { ...formState };

        if (modalType === 'create') {
            setExams([...exams, { id: Date.now(), ...examData }]);
        } else {
            setExams(exams.map(e => e.id === currentExam.id ? { ...e, ...examData } : e));
        }
        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this exam?')) {
            setExams(exams.filter(exam => exam.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            {/* Header Toolbar */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">All Exams</h1>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search exams..."
                            className="w-64 pl-11 pr-4 py-2.5 bg-white border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                        />
                    </div>
                    <button className="p-2.5 bg-white border border-gray-300 text-gray-600 rounded-full hover:bg-gray-50 shadow-sm">
                        <SlidersHorizontal size={16} />
                    </button>
                    <button onClick={() => openModal('create')} className="p-2.5 bg-purple-600 text-white rounded-full hover:bg-purple-700 shadow-sm">
                        <Plus size={16} />
                    </button>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider">Subject Name</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider">Class</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider">Teacher</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {exams.map((exam) => (
                                <tr key={exam.id}>
                                    <td className="px-6 py-5 font-medium text-gray-900">{exam.subject}</td>
                                    <td className="px-6 py-5 text-gray-600">{exam.class}</td>
                                    <td className="px-6 py-5 text-gray-600">{exam.teacher}</td>
                                    <td className="px-6 py-5 text-gray-600">{exam.date}</td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => openModal('edit', exam)} className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200">
                                                <Pencil size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(exam.id)} className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 border border-red-200">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={closeModal}>
                    <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">{modalType === 'create' ? 'Create New Exam' : 'Edit Exam'}</h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Subject Name</label><input name="subject" type="text" value={formState.subject} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Class</label><input name="class" type="text" value={formState.class} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Teacher</label><input name="teacher" type="text" value={formState.teacher} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
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