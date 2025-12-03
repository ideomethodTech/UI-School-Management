// src/components/LessonsTable.js
"use client";

import { useState, useEffect } from 'react';
import { Pencil, Trash2, X } from 'lucide-react';

export default function LessonsTable({ rows = [] }) {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [formState, setFormState] = useState({
    subjectName: '', class: '', teacher: ''
  });

  useEffect(() => {
    setData(rows.length ? rows : sampleLessons());
  }, [rows]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const openModal = (lesson) => {
    setCurrentLesson(lesson);
    setFormState({
      subjectName: lesson.subjectName,
      class: lesson.class,
      teacher: lesson.teacher
    });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setData(data.map(item => item.subjectName === currentLesson.subjectName ? { ...item, ...formState } : item));
    closeModal();
  };

  const handleDelete = (subjectName) => {
    if (window.confirm(`Are you sure you want to delete lesson ${subjectName}?`)) {
      setData(data.filter(item => item.subjectName !== subjectName));
    }
  };

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white divide-y divide-gray-100'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Subject Name</th>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Class</th>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Teacher</th>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
          </tr>
        </thead>

        <tbody className='bg-white divide-y divide-gray-100'>
          {data.map((r, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{r.subjectName}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{r.class}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{r.teacher}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                <button
                  onClick={() => openModal(r)}
                  className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-colors'
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(r.subjectName)}
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
              <h2 className="text-2xl font-bold text-gray-800">Edit Lesson</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Subject Name</label><input name="subjectName" type="text" value={formState.subjectName} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Class</label><input name="class" type="text" value={formState.class} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Teacher</label><input name="teacher" type="text" value={formState.teacher} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
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

function sampleLessons() {
  return [
    { subjectName: 'Math', class: '1A', teacher: 'Tommy Wise' },
    { subjectName: 'English', class: '2A', teacher: 'Rhoda Frank' },
    { subjectName: 'Science', class: '3A', teacher: 'Della Dunn' },
    { subjectName: 'Social Studies', class: '1B', teacher: 'Bruce Rodriguez' },
    { subjectName: 'Art', class: '4A', teacher: 'Birdie Butler' },
    { subjectName: 'Music', class: '5A', teacher: 'Bettie Oliver' },
    { subjectName: 'History', class: '6A', teacher: 'Herman Howard' },
    { subjectName: 'Geography', class: '6B', teacher: 'Lucinda Thomas' },
    { subjectName: 'Physics', class: '6C', teacher: 'Ronald Roberts' },
    { subjectName: 'Chemistry', class: '4B', teacher: 'Julia Pittman' }
  ];
}