"use client";

import { X, Calendar, CheckCircle, XCircle, MinusCircle, TrendingUp } from 'lucide-react';
import Avatar from '@/components/shared/Avatar';

const StudentAttendanceDetailModal = ({ student, onClose }) => {
    if (!student) return null;

    // Mock attendance history data
    const attendanceHistory = [
        { date: 'Dec 4, 2025', day: 'Wednesday', status: 'present', time: '09:00 AM' },
        { date: 'Dec 3, 2025', day: 'Tuesday', status: 'present', time: '09:00 AM' },
        { date: 'Dec 2, 2025', day: 'Monday', status: 'late', time: '09:15 AM' },
        { date: 'Nov 29, 2025', day: 'Friday', status: 'present', time: '09:00 AM' },
        { date: 'Nov 28, 2025', day: 'Thursday', status: 'absent', time: '-' },
        { date: 'Nov 27, 2025', day: 'Wednesday', status: 'present', time: '09:00 AM' },
        { date: 'Nov 26, 2025', day: 'Tuesday', status: 'present', time: '09:00 AM' },
        { date: 'Nov 25, 2025', day: 'Monday', status: 'present', time: '09:00 AM' },
    ];

    const presentCount = attendanceHistory.filter(a => a.status === 'present').length;
    const absentCount = attendanceHistory.filter(a => a.status === 'absent').length;
    const lateCount = attendanceHistory.filter(a => a.status === 'late').length;
    const totalClasses = attendanceHistory.length;
    const attendancePercentage = Math.round((presentCount / totalClasses) * 100);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'present':
                return <CheckCircle size={16} className="text-green-600" />;
            case 'absent':
                return <XCircle size={16} className="text-red-600" />;
            case 'late':
                return <MinusCircle size={16} className="text-yellow-600" />;
            default:
                return null;
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            present: 'bg-green-100 text-green-700',
            absent: 'bg-red-100 text-red-700',
            late: 'bg-yellow-100 text-yellow-700'
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="flex justify-between items-start p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
                    <div className="flex items-center gap-4">
                        <Avatar
                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${student.name}`}
                            name={student.name}
                            size="large"
                        />
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">{student.name}</h2>
                            <p className="text-sm text-gray-600">Student ID: {student.id}</p>
                            <p className="text-xs text-gray-500 mt-1">Total Held Hours: {student.totalHeldHours}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
                        <X size={24} />
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-4 p-6 bg-gray-50">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                        <div className="flex items-center justify-center mb-2">
                            <TrendingUp size={20} className="text-purple-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-800">{attendancePercentage}%</p>
                        <p className="text-xs text-gray-500">Attendance</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-green-200 text-center">
                        <div className="flex items-center justify-center mb-2">
                            <CheckCircle size={20} className="text-green-600" />
                        </div>
                        <p className="text-2xl font-bold text-green-600">{presentCount}</p>
                        <p className="text-xs text-gray-500">Present</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-red-200 text-center">
                        <div className="flex items-center justify-center mb-2">
                            <XCircle size={20} className="text-red-600" />
                        </div>
                        <p className="text-2xl font-bold text-red-600">{absentCount}</p>
                        <p className="text-xs text-gray-500">Absent</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-yellow-200 text-center">
                        <div className="flex items-center justify-center mb-2">
                            <MinusCircle size={20} className="text-yellow-600" />
                        </div>
                        <p className="text-2xl font-bold text-yellow-600">{lateCount}</p>
                        <p className="text-xs text-gray-500">Late</p>
                    </div>
                </div>

                {/* Attendance History */}
                <div className="p-6 overflow-y-auto max-h-96">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Calendar size={20} className="text-purple-600" />
                        Attendance History
                    </h3>
                    <div className="space-y-2">
                        {attendanceHistory.map((record, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    {getStatusIcon(record.status)}
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">{record.date}</p>
                                        <p className="text-xs text-gray-500">{record.day}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <p className="text-sm text-gray-600">{record.time}</p>
                                    {getStatusBadge(record.status)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentAttendanceDetailModal;
