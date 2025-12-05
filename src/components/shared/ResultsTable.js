// src/components/ResultsTable.js
"use client";

import { Pencil, Trash2 } from 'lucide-react';

export default function ResultsTable({ role, rows = [], onEdit, onDelete }) {

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
          {rows.map((r, i) => (
            <tr key={r.id || i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {columns.map((col, idx) => (
                <td key={idx} className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                  {col.accessor === 'actions' ? (
                    <>
                      <button
                        onClick={() => onEdit && onEdit(r)}
                        className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-colors'
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => onDelete && onDelete(r.id)}
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
    </div>
  );
}