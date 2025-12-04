
"use client";

import { Pencil, Trash2 } from 'lucide-react';

export default function ClassesTable({ data = [], onEdit, onDelete }) {
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
                                    onClick={() => onEdit(r)}
                                    className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-colors'
                                >
                                    <Pencil size={16} />
                                </button>
                                <button
                                    onClick={() => onDelete(r.className)}
                                    className='ml-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors'
                                >
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
