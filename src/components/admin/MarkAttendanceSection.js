// src/components/MarkAttendanceSection.js
"use client";

import { Download, CheckCircle, XCircle, MinusCircle, Users, UserCheck, UserX, Clock } from 'lucide-react';
import Avatar from '@/components/shared/Avatar';
import { useState } from 'react';
import { sampleStudentsAttendance } from '../../mockData/adminData';
import { SearchBar } from '@/app/dashboard/Search';

export default function MarkAttendanceSection({
  selectedDate = new Date(),
  selectedClass = '10-A',
  selectedSubject = 'Mathematics',
  subjectCode = 'MATH',
  onStudentDetailView
}) {
  const [students, setStudents] = useState(sampleStudentsAttendance);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('today'); // 'today' or 'history'

  // Format the selected date dynamically
  const formattedDate = selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const weekDay = `Week ${Math.ceil(selectedDate.getDate() / 7)} - ${selectedDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}`;
  const timeSlot = 'Time: 09:00 AM to 10:45 AM';

  // Calculate statistics
  const presentCount = students.filter(s => s.status === 'present').length;
  const absentCount = students.filter(s => s.status === 'absent').length;
  const lateCount = students.filter(s => s.status === 'late').length;
  const totalStudents = students.length;

  // Filter students based on search
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateStudentStatus = (id, newStatus) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id ? { ...student, status: newStatus } : student
      )
    );
  };

  // Bulk actions
  const markAllPresent = () => {
    setStudents(prev => prev.map(student => ({ ...student, status: 'present' })));
  };

  const markAllAbsent = () => {
    setStudents(prev => prev.map(student => ({ ...student, status: 'absent' })));
  };

  // Download attendance as CSV
  const downloadCSV = () => {
    const headers = ['Student ID', 'Student Name', 'Status', 'Total Held Hours', 'Marks'];
    const csvContent = [
      headers.join(','),
      ...students.map(s =>
        `${s.id},"${s.name}",${s.status},${s.totalHeldHours},${s.marks}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_${selectedDate.toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Mock attendance history data
  const attendanceHistory = [
    { date: 'Dec 3, 2025', present: 22, absent: 2, late: 1, total: 25 },
    { date: 'Dec 2, 2025', present: 23, absent: 1, late: 1, total: 25 },
    { date: 'Nov 29, 2025', present: 24, absent: 1, late: 0, total: 25 },
    { date: 'Nov 28, 2025', present: 21, absent: 3, late: 1, total: 25 },
    { date: 'Nov 27, 2025', present: 25, absent: 0, late: 0, total: 25 },
  ];

  return (
    <div className="flex-1 bg-white p-6 rounded-lg shadow-sm space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Mark Attendance</h3>
          <p className="text-sm text-gray-500">Class {selectedClass} • {selectedSubject} ({subjectCode})</p>
          <p className="text-xs text-gray-400">{timeSlot} | {weekDay}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={downloadCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm"
          >
            <Download size={16} /> Download CSV
          </button>
          <button className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors text-sm shadow-md">
            Save Attendance
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('today')}
            className={`pb-3 px-1 font-medium text-sm border-b-2 transition-colors ${activeTab === 'today'
              ? 'border-purple-600 text-purple-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            Today's Attendance
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-3 px-1 font-medium text-sm border-b-2 transition-colors ${activeTab === 'history'
              ? 'border-purple-600 text-purple-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            Attendance History
          </button>
        </div>
      </div>

      {activeTab === 'today' ? (
        <>
          {/* Statistics Cards */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-200 rounded-lg">
                  <Users size={20} className="text-blue-700" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-700">{totalStudents}</p>
                  <p className="text-xs text-blue-600">Total Students</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-200 rounded-lg">
                  <UserCheck size={20} className="text-green-700" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-700">{presentCount}</p>
                  <p className="text-xs text-green-600">Present</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-200 rounded-lg">
                  <UserX size={20} className="text-red-700" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-700">{absentCount}</p>
                  <p className="text-xs text-red-600">Absent</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-200 rounded-lg">
                  <Clock size={20} className="text-yellow-700" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-700">{lateCount}</p>
                  <p className="text-xs text-yellow-600">Late</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Bulk Actions */}
          <div className="flex justify-between items-center gap-4">
            <div className="flex-1 max-w-md">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search by name or student ID..."
                className="border-gray-300 rounded-lg focus:ring-purple-300"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={markAllPresent}
                className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg text-sm font-medium transition-colors"
              >
                <CheckCircle size={16} /> Mark All Present
              </button>
              <button
                onClick={markAllAbsent}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg text-sm font-medium transition-colors"
              >
                <XCircle size={16} /> Mark All Absent
              </button>
            </div>
          </div>

          {/* Students Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Total Held Hours</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredStudents.map((student, i) => (
                  <tr key={student.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{student.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className='flex items-center gap-2'>
                        <Avatar src={`https://api.dicebear.com/7.x/initials/svg?seed=${student.name}`} name={student.name} size="small" />
                        {student.name}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
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
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{student.totalHeldHours}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{student.marks}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      <div className="flex justify-center">
                        <button
                          onClick={() => onStudentDetailView(student)}
                          className="px-3 py-1.5 bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-lg text-xs font-medium transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredStudents.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No students found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Attendance History Tab */
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Past Attendance Records</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Absent</th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Late</th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance %</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {attendanceHistory.map((record, index) => {
                  const percentage = Math.round((record.present / record.total) * 100);
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {record.present}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {record.absent}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {record.late}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700">
                        {record.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">{percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}