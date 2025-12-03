// src/components/ResultsTable.js
"use client";

import { useState, useEffect } from 'react';
import { Pencil, Trash2, X } from 'lucide-react';

export default function ResultsTable({ role, studentId, teacherId, rows = [] }) {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [formState, setFormState] = useState({
    subject: '', score: '', studentName: '', teacherName: '', className: '', date: ''
  });

  useEffect(() => {
    let initialData = rows.length ? rows : [];
    if (!rows.length) {
      if (role === 'admin') {
        initialData = sampleResults();
      } else if (role === 'teacher') {
        initialData = sampleResults().filter(r => r.teacherId === teacherId);
      } else if (role === 'student') {
        initialData = sampleResults().filter(r => r.studentId === studentId);
      }
    }
    setData(initialData);
  }, [role, studentId, teacherId, rows]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const openModal = (result) => {
    setCurrentResult(result);
    setFormState({
      subject: result.subject,
      score: result.score,
      studentName: result.studentName,
      teacherName: result.teacherName,
      className: result.className,
      date: result.date
    });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setData(data.map(item => item.id === currentResult.id ? { ...item, ...formState } : item));
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this result?')) {
      setData(data.filter(item => item.id !== id));
    }
  };

  // Define columns based on role
  const getColumns = () => {
    switch (role) {
      case 'student':
        return [
          { header: 'Subject Name', accessor: 'subject' },
          { header: 'Score', accessor: 'score' },
          { header: 'Teacher', accessor: 'teacherName' },
          { header: 'Class', accessor: 'className' },
          { header: 'Date', accessor: 'date' },
        ];
      default: // Admin, Teacher and others
        return [
          { header: 'Subject Name', accessor: 'subject' },
          { header: 'Student', accessor: 'studentName' },
          { header: 'Score', accessor: 'score' },
          { header: 'Teacher', accessor: 'teacherName' },
          { header: 'Class', accessor: 'className' },
          { header: 'Date', accessor: 'date' },
          { header: 'Actions', accessor: 'actions' },
        ];
    }
  };

  const columns = getColumns();

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white divide-y divide-gray-100'>
        <thead className='bg-gray-50'>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className='bg-white divide-y divide-gray-100'>
          {data.map((r, i) => (
            <tr key={r.id || i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {columns.map((col, idx) => (
                <td key={idx} className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                  {col.accessor === 'actions' ? (
                    <>
                      <button
                        onClick={() => openModal(r)}
                        className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-colors'
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className='ml-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors'
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  ) : (
                    r[col.accessor]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Edit Result</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Subject Name</label><input name="subject" type="text" value={formState.subject} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Student</label><input name="studentName" type="text" value={formState.studentName} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Score</label><input name="score" type="number" value={formState.score} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Teacher</label><input name="teacherName" type="text" value={formState.teacherName} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Class</label><input name="className" type="text" value={formState.className} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Date</label><input name="date" type="date" value={formState.date} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
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

// Full sample results data for all roles to filter from
function sampleResults() {
  return [
    { id: 1, subject: 'Math', studentName: 'John Smith', studentId: 'STD001', score: 90, teacherName: 'Mr. Johnson', teacherId: 'TCH001', className: '1A', date: '2025-01-01' },
    { id: 2, subject: 'English', studentName: 'John Smith', studentId: 'STD001', score: 85, teacherName: 'Ms. Williams', teacherId: 'TCH002', className: '1A', date: '2025-01-02' },
    { id: 3, subject: 'Science', studentName: 'Alice Green', studentId: 'STD002', score: 92, teacherName: 'Mr. Johnson', teacherId: 'TCH001', className: '2B', date: '2025-01-01' },
    { id: 4, subject: 'Social Studies', studentName: 'Alice Green', studentId: 'STD002', score: 88, teacherName: 'Ms. Davis', teacherId: 'TCH003', className: '2B', date: '2025-01-02' },
    { id: 5, subject: 'Art', studentName: 'Bob White', studentId: 'STD003', score: 95, teacherName: 'Ms. Garcia', teacherId: 'TCH004', className: '3C', date: '2025-01-03' },
    { id: 6, subject: 'Music', studentName: 'Bob White', studentId: 'STD003', score: 78, teacherName: 'Mr. Martinez', teacherId: 'TCH005', className: '3C', date: '2025-01-04' },
    { id: 7, subject: 'History', studentName: 'John Smith', studentId: 'STD001', score: 80, teacherName: 'Mr. Johnson', teacherId: 'TCH001', className: '1A', date: '2025-01-03' },
    { id: 8, subject: 'Geography', studentName: 'Alice Green', studentId: 'STD002', score: 91, teacherName: 'Ms. Williams', teacherId: 'TCH002', className: '2B', date: '2025-01-04' },
    { id: 9, subject: 'Physics', studentName: 'Bob White', studentId: 'STD003', score: 87, teacherName: 'Ms. Davis', teacherId: 'TCH003', className: '3C', date: '2025-01-05' },
    { id: 10, subject: 'Chemistry', studentName: 'John Smith', studentId: 'STD001', score: 93, teacherName: 'Ms. Garcia', teacherId: 'TCH004', className: '1A', date: '2025-01-06' },
  ];
}