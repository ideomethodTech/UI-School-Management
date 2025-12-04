// src/components/MarkAttendanceSection.js
"use client";

import { Download, Pencil, Trash2, CheckCircle, XCircle, MinusCircle } from 'lucide-react';
import Avatar from '@/components/shared/Avatar';
import { useState } from 'react';
import { sampleStudentsAttendance } from '../../mockData/adminData';

export default function MarkAttendanceSection({
  selectedCourse = { name: 'Subject Banks of Blue Research (BMIS)', code: 'BMIS02' },
  selectedDate = new Date(),
  onStudentDetailView
}) {
  const [students, setStudents] = useState(sampleStudentsAttendance);

  const formattedDate = selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const timeSlot = 'Time: 09:00 AM to 10:45 AM';
  const weekDay = 'Week 1 - Tuesday - 21 Jan 2020';

  const updateStudentStatus = (id, newStatus) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id ? { ...student, status: newStatus } : student
      )
    );
  };

  return (
    <div className="flex-1 bg-white p-6 rounded-lg shadow-sm space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Mark Attendance</h3>
          <p className="text-sm text-gray-500">{selectedCourse.name} ({selectedCourse.code})</p>
          <p className="text-xs text-gray-400">{timeSlot} | {weekDay}</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm">
            <Download size={16} /> Download
          </button>
          <button className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors text-sm shadow-md">
            Save Attendance
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th><th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Total Held Hours</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th><th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th></tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {students.map((student, i) => (
              <tr key={student.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}><td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{student.id}</td><td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                <div className='flex items-center gap-2'>
                  <Avatar src={`https://api.dicebear.com/7.x/initials/svg?seed=${student.name}`} name={student.name} size="small" />
                  {student.name}
                </div>
              </td><td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  <div className="flex justify-center items-center gap-1">
                    <button
                      onClick={() => updateStudentStatus(student.id, 'present')}
                      className={`p-2 rounded-full transition-colors ${student.status === 'present' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:bg-green-50'
                        }`}
                      title="Present"
                    >
                      <CheckCircle size={18} />
                    </button>
                    <button
                      onClick={() => updateStudentStatus(student.id, 'absent')}
                      className={`p-2 rounded-full transition-colors ${student.status === 'absent' ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:bg-red-50'
                        }`}
                      title="Absent"
                    >
                      <XCircle size={18} />
                    </button>
                    <button
                      onClick={() => updateStudentStatus(student.id, 'late')}
                      className={`p-2 rounded-full transition-colors ${student.status === 'late' ? 'bg-yellow-100 text-yellow-600' : 'text-gray-400 hover:bg-yellow-50'
                        }`}
                      title="Late"
                    >
                      <MinusCircle size={18} />
                    </button>
                  </div>
                </td><td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{student.totalHeldHours}</td><td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{student.marks}</td><td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  <button
                    onClick={() => onStudentDetailView(student)}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-colors"
                  >
                    <Pencil size={16} />
                  </button>
                  <button className="ml-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}