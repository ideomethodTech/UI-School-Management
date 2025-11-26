// In: src/app/students/page.js
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { studentsData } from './data.js';
import { Search, Plus, Eye, Trash2, SlidersHorizontal, ArrowDownUp, X } from 'lucide-react';

export default function StudentsPage() {
    const [students, setStudents] = useState(studentsData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formState, setFormState] = useState({ name: '', id: '', grade: '', phone: '', address: '', avatar: '' });

    const handleInputChange = (e) => setFormState(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    const openModal = () => { setFormState({ name: '', id: '', grade: '', phone: '', address: '', avatar: '' }); setIsModalOpen(true); };
    const closeModal = () => setIsModalOpen(false);

    const handleCreateStudent = (event) => {
        event.preventDefault();
        if (!formState.name.trim() || !formState.id.trim()) return alert('Student Name and Student ID are required.');
        const newStudent = { ...formState, avatar: formState.avatar || `https://i.pravatar.cc/40?u=${formState.id}` };
        setStudents(currentStudents => [newStudent, ...currentStudents]);
        closeModal();
    };

    const handleDeleteStudent = (id) => {
        if (window.confirm('Are you sure?')) setStudents(current => current.filter(s => s.id !== id));
    };

    return (
        <>
            <div className="bg-white p-4 rounded-lg m-4 flex-1 flex flex-col">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <h1 className="text-2xl font-bold text-gray-800 self-start">All Students</h1>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="flex items-center gap-2 ring-1 ring-gray-200 rounded-lg px-3 py-2 bg-gray-50 flex-grow">
                            <Search size={18} className="text-gray-400" />
                            <input type="text" placeholder="Search students..." className="w-full bg-transparent outline-none text-gray-700 text-sm" />
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={openModal} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors">
                                <Plus size={18} />
                                <span>New Student</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead><tr className="border-b bg-gray-50 text-xs text-gray-500 uppercase"><th className="py-3 px-4 font-medium">Info</th><th className="py-3 px-4 font-medium">Student ID</th><th className="py-3 px-4 font-medium">Grade</th><th className="py-3 px-4 font-medium">Phone</th><th className="py-3 px-4 font-medium">Address</th><th className="py-3 px-4 font-medium">Actions</th></tr></thead>
                        <tbody className="divide-y">
                            {students.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4"><div className="flex items-center gap-3"><Image src={student.avatar} alt={student.name} width={40} height={40} className="rounded-full object-cover" /><div><div className="font-semibold text-gray-800">{student.name}</div><div className="text-sm text-gray-500">Grade {student.grade}</div></div></div></td>
                                    <td className="py-3 px-4 text-sm text-gray-600 font-mono">{student.id}</td><td className="py-3 px-4 text-sm text-gray-600">{student.grade}</td><td className="py-3 px-4 text-sm text-gray-600">{student.phone}</td><td className="py-3 px-4 text-sm text-gray-600">{student.address}</td>
                                    <td className="py-3 px-4"><div className="flex items-center gap-2"><Link href={`/students/${student.id}`} className="p-2 rounded-md bg-blue-100 hover:bg-blue-200"><Eye size={16} className="text-blue-600" /></Link><button onClick={() => handleDeleteStudent(student.id)} className="p-2 rounded-md bg-red-100 hover:bg-red-200"><Trash2 size={16} className="text-red-600" /></button></div></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={closeModal}>
                    <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-gray-800">Create New Student</h2><button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X size={24} /></button></div>
                        <form onSubmit={handleCreateStudent} className="space-y-4">
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label><input name="name" type="text" value={formState.name} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label><input name="id" type="text" value={formState.id} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Grade</label><input name="grade" type="text" value={formState.grade} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input name="phone" type="tel" value={formState.phone} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Address</label><input name="address" type="text" value={formState.address} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL (optional)</label><input name="avatar" type="text" value={formState.avatar} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
                            <div className="flex justify-end gap-4 pt-4"><button type="button" onClick={closeModal} className="px-6 py-2 border rounded-lg text-gray-700 font-semibold hover:bg-gray-100">Cancel</button><button type="submit" className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700">Create</button></div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}