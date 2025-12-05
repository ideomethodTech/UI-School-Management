// src/components/AdminAssignmentsPage.js
"use client";

import { useState } from 'react';
import { Search, Plus, Pencil, Trash2, X } from 'lucide-react';
import { useData } from '@/contexts/DataContext';

export default function AdminAssignmentsPage() {
    const { assignments, addAssignment, updateAssignment, deleteAssignment } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalType, setModalType] = useState('create');
    const [currentAssignment, setCurrentAssignment] = useState(null);
    const [formState, setFormState] = useState({
        subject: '', class: '', teacher: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const openModal = (type, assignment = null) => {
        setModalType(type);
        if (type === 'edit' && assignment) {
            setCurrentAssignment(assignment);
            setFormState({
                subject: assignment.subject,
                class: assignment.class,
                teacher: assignment.teacher
            });
        } else {
            setCurrentAssignment(null);
            setFormState({ subject: '', class: '', teacher: '' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formState.subject.trim() || !formState.class.trim()) {
            alert('Subject and Class are required.');
            return;
        }

        const assignmentData = { ...formState };

        if (modalType === 'create') {
            addAssignment({ id: Date.now(), ...assignmentData });
        } else {
            updateAssignment(currentAssignment.id, assignmentData);
        }
        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this assignment?')) {
            deleteAssignment(id);
        }
    };

    // Filter assignments based on search term
    const filteredAssignments = assignments.filter(assignment => {
        const search = searchTerm.toLowerCase();
        return (
            assignment.subject?.toLowerCase().includes(search) ||
            assignment.class?.toLowerCase().includes(search) ||
            assignment.teacher?.toLowerCase().includes(search)
        );
    });

    return (
        <div className="p-1 space-y-6">
            {/* Header Toolbar */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">All Assignments</h1>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-64 pl-11 pr-4 py-2.5 bg-white border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                        />
                    </div>
                    <button onClick={() => openModal('create')} className="p-2.5 bg-purple-600 text-white rounded-full hover:bg-purple-700 shadow-sm">
                        <Plus size={20} />
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
                                <th className="text-left px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredAssignments.map((assignment) => (
                                <tr key={assignment.id}>
                                    <td className="px-6 py-5 font-medium text-gray-900">{assignment.subject}</td>
                                    <td className="px-6 py-5 text-gray-600">{assignment.class}</td>
                                    <td className="px-6 py-5 text-gray-600">{assignment.teacher}</td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => openModal('edit', assignment)} className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200">
                                                <Pencil size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(assignment.id)} className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 border border-red-200">
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
                            <h2 className="text-2xl font-bold text-gray-800">{modalType === 'create' ? 'Create New Assignment' : 'Edit Assignment'}</h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Subject Name</label><input name="subject" type="text" value={formState.subject} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
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