// src/app/dashboard/parents/page.js
'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal, Plus, Pencil, Trash2 } from 'lucide-react';

// Mock data for the initial list of parents
const initialParentsData = [
    { id: 'par001', name: 'John Doe', email: 'john@doe.com', students: ['Sarah Brewer'], phone: '123-456-7890', address: '123 Main St, Anytown, USA' },
    { id: 'par002', name: 'Jane Doe', email: 'jane@doe.com', students: ['Cecilia Bradley'], phone: '234-567-8901', address: '456 Oak Ave, Anytown, USA' },
    { id: 'par003', name: 'Mike Geller', email: 'mike@geller.com', students: ['Fanny Caldwell'], phone: '345-678-9012', address: '789 Pine Ln, Anytown, USA' },
    { id: 'par004', name: 'Jay French', email: 'jay@french.com', students: ['Mollie Fitzgerald', 'Ian Bryant'], phone: '456-789-0123', address: '101 Maple Rd, Anytown, USA' },
    { id: 'par005', name: 'Mable Smith', email: 'mable@smith.com', students: ['Mable Harvey'], phone: '567-890-1234', address: '212 Birch Ct, Anytown, USA' },
    { id: 'par006', name: 'Anna Santiago', email: 'anna@gmail.com', students: ['Joel Lambert'], phone: '678-901-2345', address: '333 Cedar Blvd, Anytown, USA' },
    { id: 'par007', name: 'Allen Black', email: 'allen@black.com', students: ['Carrie Black', 'Lilly Black'], phone: '789-012-3456', address: '444 Elm St, Anytown, USA' },
];

// Main page component
export default function ParentsPage() {
    const [parents, setParents] = useState(initialParentsData);
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
                students: parent.students.join(', '), // Convert array to string for input
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
        <div className='p-6 space-y-6'>
            {/* Header */}
            <div className='flex items-center justify-between'>
                <div>
                    <h2 className='text-2xl font-semibold text-gray-800'>All Parents</h2>
                </div>
                <div className='flex items-center gap-3'>
                    <div className='relative'>
                        <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                        <input
                            placeholder='Search parents...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='rounded-full border border-gray-300 pl-10 pr-4 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400'
                        />
                    </div>
                    <button className='p-2 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'>
                        <SlidersHorizontal size={20} />
                    </button>
                    <button onClick={() => openModal('create')} className='p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 shadow-md'>
                        <Plus size={20} />
                    </button>
                </div>
            </div>

            {/* Table Container */}
            <div className='bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm'>
                <table className='w-full text-sm text-left text-gray-600'>
                    <thead className='bg-gray-50 text-xs text-gray-500 uppercase'>
                        <tr>
                            <th scope='col' className='px-6 py-3'>Name</th>
                            <th scope='col' className='px-6 py-3'>Student(s)</th>
                            <th scope='col' className='px-6 py-3'>Contact</th>
                            <th scope='col' className='px-10 py-3 text-right'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredParents.map((parent) => (
                            <tr key={parent.id} className='bg-white border-b hover:bg-gray-50'>
                                <td className='px-6 py-4'>
                                    <div className='font-medium text-gray-900'>{parent.name}</div>
                                    <div className='text-xs text-gray-500'>{parent.email}</div>
                                </td>
                                <td className='px-6 py-4'>{parent.students.join(', ')}</td>
                                <td className='px-6 py-4'>
                                    <div className='font-medium text-gray-800'>{parent.phone}</div>
                                    <div className='text-xs text-gray-500'>{parent.address}</div>
                                </td>
                                <td className='px-6 py-4'>
                                    <div className='flex items-center justify-end gap-2'>
                                        <button onClick={() => openModal('edit', parent)} className='p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200'>
                                            <Pencil size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(parent.id)} className='p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200'>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for creating/editing a parent */}
            {isModalOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50' onClick={closeModal}>
                    <div className='bg-white rounded-lg shadow-xl p-8 w-full max-w-lg' onClick={(e) => e.stopPropagation()}>
                        <form onSubmit={handleSubmit}>
                            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
                                {modalType === 'create' ? 'Create New Parent' : 'Edit Parent'}
                            </h2>
                            <div className='space-y-4'>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div>
                                        <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-700'>Parent Name</label>
                                        <input id='name' name='name' type='text' value={formState.name} onChange={handleInputChange} className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300' required />
                                    </div>
                                    <div>
                                        <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-700'>Email Address</label>
                                        <input id='email' name='email' type='email' value={formState.email} onChange={handleInputChange} className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300' required />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor='students' className='block mb-2 text-sm font-medium text-gray-700'>Student Names (comma-separated)</label>
                                    <input id='students' name='students' type='text' value={formState.students} onChange={handleInputChange} className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300' />
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div>
                                        <label htmlFor='phone' className='block mb-2 text-sm font-medium text-gray-700'>Phone</label>
                                        <input id='phone' name='phone' type='tel' value={formState.phone} onChange={handleInputChange} className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300' />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor='address' className='block mb-2 text-sm font-medium text-gray-700'>Address</label>
                                    <input id='address' name='address' type='text' value={formState.address} onChange={handleInputChange} className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300' />
                                </div>
                            </div>
                            <div className='flex justify-end gap-4 mt-8'>
                                <button type='button' onClick={closeModal} className='px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 border'>
                                    Cancel
                                </button>
                                <button type='submit' className='px-5 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 shadow-sm'>
                                    {modalType === 'create' ? 'Create Parent' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}