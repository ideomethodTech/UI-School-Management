// src/components/TeachersTable.js
"use client"; // Important for interactive elements like buttons and Link

import Avatar from '@/components/shared/Avatar';
import { Eye, Trash2, Pencil } from 'lucide-react';
import Link from 'next/link'; // Import Link for navigation

export default function TeachersTable({ rows = [], onDelete }) { // Accept onDelete prop
  const data = rows; // Teachers data should now always come from the 'rows' prop

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white divide-y divide-gray-100'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Info</th>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Teacher ID</th>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Subjects</th>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Classes</th>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Phone</th>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Address</th>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
          </tr>
        </thead>

        <tbody className='bg-white divide-y divide-gray-100'>
          {data.map((r, i) => (
            <tr key={r.teacherId || i} className='hover:bg-gray-50'>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                <div className='flex items-center gap-3'>
                  <Avatar src={r.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${r.name}`} name={r.name} />
                  <div>
                    <div className='font-medium text-gray-900'>{r.name}</div>
                    <div className='text-xs text-gray-500'>{r.email}</div>
                  </div>
                </div>
              </td>

              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{r.teacherId}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{r.subjects}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{r.classes}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{r.phone}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{r.address}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                <div className='flex items-center gap-2'>
                  {/* View Button */}
                  <Link href={`/dashboard/teachers/${r.teacherId}`} legacyBehavior>
                    <a className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-colors'>
                      <Eye size={16} />
                    </a>
                  </Link>

                  {/* Edit Button - Placeholder for future edit functionality (e.g., opening an edit modal) */}
                  <button className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-50 text-purple-600 border border-purple-200 hover:bg-purple-100 transition-colors'>
                    <Pencil size={16} />
                  </button>

                  {/* Delete Button - Calls the onDelete prop with the teacher's ID */}
                  <button
                    onClick={() => onDelete(r.teacherId)}
                    className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors'
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}