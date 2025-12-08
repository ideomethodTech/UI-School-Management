// src/components/admin/AdminClassesPage.js
"use client";

import { useState } from 'react';
import ClassesTable from '@/components/shared/ClassesTable';
import { X } from 'lucide-react';
import { sampleClasses } from '../../mockData/adminData';
import { SearchableTable } from '@/app/dashboard/Search';

export default function AdminClassesPage() {
    const [data, setData] = useState(sampleClasses);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('create');
    const [currentClass, setCurrentClass] = useState(null);
    const [formState, setFormState] = useState({
        className: '', capacity: '', grade: '', supervisor: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const openModal = (type, cls = null) => {
        setModalType(type);
        if (type === 'edit' && cls) {
            setCurrentClass(cls);
            setFormState({
                className: cls.className,
                capacity: cls.capacity,
                grade: cls.grade,
                supervisor: cls.supervisor
            });
        } else {
            setCurrentClass(null);
            setFormState({ className: '', capacity: '', grade: '', supervisor: '' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formState.className.trim()) {
            alert('Class Name is required.');
            return;
        }

        if (modalType === 'create') {
            setData([...data, { ...formState }]);
        } else {
            setData(data.map(item => item.className === currentClass.className ? { ...item, ...formState } : item));
        }
        closeModal();
    };

    const handleDelete = (className) => {
        if (window.confirm(`Are you sure you want to delete class ${className}?`)) {
            setData(data.filter(item => item.className !== className));
        }
    };

    return (
        <>
            <SearchableTable
                title="All Classes"
                data={data}
                searchKeys={['className', 'grade', 'supervisor', 'capacity']}
                searchPlaceholder="Search classes..."
                onAdd={() => openModal('create')}
            >
                {(filteredData) => (
                    <ClassesTable
                        data={filteredData}
                        onEdit={(cls) => openModal('edit', cls)}
                        onDelete={handleDelete}
                    />
                )}
            </SearchableTable>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={closeModal}>
                    <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">{modalType === 'create' ? 'Create New Class' : 'Edit Class'}</h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Class Name</label>
                                <input
                                    name="className"
                                    type="text"
                                    value={formState.className}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                    disabled={modalType === 'edit'} // Disable editing class name as it's used as ID here
                                />
                            </div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label><input name="capacity" type="number" value={formState.capacity} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Grade</label><input name="grade" type="number" value={formState.grade} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Supervisor</label><input name="supervisor" type="text" value={formState.supervisor} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
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
