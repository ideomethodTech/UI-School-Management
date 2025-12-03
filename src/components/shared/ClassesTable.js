// src/components/ClassesTable.js
"use client";

import { useState, useEffect } from 'react';
import { Pencil, Trash2, X } from 'lucide-react';

export default function ClassesTable({ rows = [] }) {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState(null);
  const [formState, setFormState] = useState({
    className: '', capacity: '', grade: '', supervisor: ''
  });

  useEffect(() => {
    setData(rows.length ? rows : sampleClasses());
  }, [rows]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const openModal = (cls) => {
    setCurrentClass(cls);
    setFormState({
      className: cls.className,
      capacity: cls.capacity,
      grade: cls.grade,
      supervisor: cls.supervisor
    });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setData(data.map(item => item.className === currentClass.className ? { ...item, ...formState } : item));
    closeModal();
  };

  const handleDelete = (className) => {
    if (window.confirm(`Are you sure you want to delete class ${className}?`)) {
      setData(data.filter(item => item.className !== className));
    }
  };

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white divide-y divide-gray-100'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Class Name</th>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Capacity</th>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Grade</th>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Supervisor</th>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
          </tr>
        </thead>

        <tbody className='bg-white divide-y divide-gray-100'>
          {data.map((r, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{r.className}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{r.capacity}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{r.grade}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{r.supervisor}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                <button
                  onClick={() => openModal(r)}
                  className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-colors'
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(r.className)}
                  className='ml-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors'
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Edit Class</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Class Name</label><input name="className" type="text" value={formState.className} onChange={handleInputChange} className="w-full p-2 border rounded-md" disabled /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label><input name="capacity" type="number" value={formState.capacity} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Grade</label><input name="grade" type="number" value={formState.grade} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Supervisor</label><input name="supervisor" type="text" value={formState.supervisor} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
              <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={closeModal} className="px-6 py-2 border rounded-lg text-gray-700 font-semibold hover:bg-gray-100">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function sampleClasses() {
  return [
    { className: '1A', capacity: 20, grade: 1, supervisor: 'Joseph Padilla' },
    { className: '2B', capacity: 22, grade: 2, supervisor: 'Blake Joseph' },
    { className: '3C', capacity: 20, grade: 3, supervisor: 'Tom Bennett' },
    { className: '4B', capacity: 18, grade: 4, supervisor: 'Aaron Collins' },
    { className: '5A', capacity: 16, grade: 5, supervisor: 'Iva Frank' },
    { className: '5B', capacity: 20, grade: 5, supervisor: 'Leila Santos' },
    { className: '7A', capacity: 18, grade: 7, supervisor: 'Carrie Walton' },
    { className: '6B', capacity: 22, grade: 6, supervisor: 'Christopher Butler' },
    { className: '6C', capacity: 18, grade: 6, supervisor: 'Marc Miller' },
    { className: '6D', capacity: 20, grade: 6, supervisor: 'Ophella Marsh' }
  ];
}