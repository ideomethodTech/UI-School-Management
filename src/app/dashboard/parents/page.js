// src/app/dashboard/parents/page.js
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search, Plus, Pencil, Trash2, X } from 'lucide-react';
import { parentsData } from './data';

// Main page component
export default function ParentsPage() {
    const [parents, setParents] = useState(parentsData);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('create');
    const [currentParent, setCurrentParent] = useState(null);
    const [formState, setFormState] = useState({
        name: '', email: '', students: '', phone: '', address: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const openModal = (type, parent = null) => {
        setModalType(type);
        if (type === 'edit' && parent) {
            setCurrentParent(parent);
            setFormState({
                name: parent.name,
                email: parent.email,
                students: parent.students.join(', '),
                phone: parent.phone,
                address: parent.address
            });
        } else {
            setCurrentParent(null);
            setFormState({ name: '', email: '', students: '', phone: '', address: '' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formState.name.trim() || !formState.email.trim()) {
            alert('Parent name and email are required.');
            return;
        }

        const studentArray = formState.students.split(',').map(name => name.trim()).filter(Boolean);
        const parentData = { ...formState, students: studentArray };

        if (modalType === 'create') {
            setParents(prev => [...prev, { id: `par${Date.now()}`, ...parentData }]);
        } else {
            setParents(prev => prev.map(p => (p.id === currentParent.id ? { ...p, ...parentData } : p)));
        }
        closeModal();
    };

    const handleDelete = (parentIdToDelete) => {
        if (window.confirm('Are you sure you want to delete this parent?')) {
            setParents(prev => prev.filter(p => p.id !== parentIdToDelete));
        }
    };

    const filteredParents = parents.filter(parent =>
        parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parent.students.some(student => student.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <>
            <div className="bg-white p-4 rounded-lg m-4 flex-1 flex flex-col">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <h1 className="text-2xl font-bold text-gray-800 self-start">All Parents</h1>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search parents..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="rounded-full border border-gray-300 pl-10 pr-4 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                            />
                        </div>
                        <button onClick={() => openModal('create')} className="p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 shadow-md">
                            <Plus size={20} />
                        </button>
                    </div>
                </div>
                <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead><tr className="border-b bg-gray-50 text-xs text-gray-500 uppercase"><th className="py-3 px-4 font-medium">Info</th><th className="py-3 px-4 font-medium">Student(s)</th><th className="py-3 px-4 font-medium">Phone</th><th className="py-3 px-4 font-medium">Address</th><th className="py-3 px-4 font-medium">Actions</th></tr></thead>
                        <tbody className="divide-y">
                            {filteredParents.map((parent) => (
                                <tr key={parent.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <Image
                                                src={`https://i.pravatar.cc/40?u=${parent.id}`}
                                                alt={parent.name}
                                                width={40}
                                                height={40}
                                                className="rounded-full object-cover"
                                            />
                                            <div>
                                                <div className="font-semibold text-gray-800">{parent.name}</div>
                                                <div className="text-sm text-gray-500">{parent.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-600">{parent.students.join(', ')}</td>
                                    <td className="py-3 px-4 text-sm text-gray-600">{parent.phone}</td>
                                    <td className="py-3 px-4 text-sm text-gray-600">{parent.address}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => openModal('edit', parent)} className="p-2 rounded-md bg-blue-100 hover:bg-blue-200">
                                                <Pencil size={16} className="text-blue-600" />
                                            </button>
                                            <button onClick={() => handleDelete(parent.id)} className="p-2 rounded-md bg-red-100 hover:bg-red-200">
                                                <Trash2 size={16} className="text-red-600" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={closeModal}>
                    <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">{modalType === 'create' ? 'Create New Parent' : 'Edit Parent'}</h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Parent Name</label><input name="name" type="text" value={formState.name} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label><input name="email" type="email" value={formState.email} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Student Names (comma-separated)</label><input name="students" type="text" value={formState.students} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input name="phone" type="tel" value={formState.phone} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Address</label><input name="address" type="text" value={formState.address} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
                            <div className="flex justify-end gap-4 pt-4">
                                <button type="button" onClick={closeModal} className="px-6 py-2 border rounded-lg text-gray-700 font-semibold hover:bg-gray-100">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700">{modalType === 'create' ? 'Create' : 'Save Changes'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
