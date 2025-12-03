import { useState } from 'react';
import { Calendar, Users, Check, X, Save, Download, Filter, Search } from 'lucide-react';

// Mock student data for a class
const mockStudents = [
    { id: 1, name: 'Aarav Sharma', rollNo: '001', photo: null },
    { id: 2, name: 'Priya Patel', rollNo: '002', photo: null },
    { id: 3, name: 'Rohan Kumar', rollNo: '003', photo: null },
    { id: 4, name: 'Ananya Singh', rollNo: '004', photo: null },
    { id: 5, name: 'Vikram Reddy', rollNo: '005', photo: null },
    { id: 6, name: 'Ishita Gupta', rollNo: '006', photo: null },
    { id: 7, name: 'Aditya Verma', rollNo: '007', photo: null },
    { id: 8, name: 'Sneha Iyer', rollNo: '008', photo: null },
    { id: 9, name: 'Arjun Nair', rollNo: '009', photo: null },
    { id: 10, name: 'Kavya Menon', rollNo: '010', photo: null },
    { id: 11, name: 'Siddharth Joshi', rollNo: '011', photo: null },
    { id: 12, name: 'Meera Desai', rollNo: '012', photo: null },
];

// Mock class data
const mockClasses = [
    { id: 1, name: 'Mathematics - Class 10-A' },
    { id: 2, name: 'Mathematics - Class 9-B' },
    { id: 3, name: 'Advanced Algebra - Class 11-C' },
    { id: 4, name: 'Geometry - Class 9-A' },
];

const AttendanceButton = ({ status, isActive, onClick, icon: Icon, label, color }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-sm transition-all ${isActive
            ? `${color} text-white shadow-md`
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
    >
        <Icon size={16} />
        {label}
    </button>
);

const StudentRow = ({ student, attendance, onAttendanceChange }) => {
    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition-all">
            <div className="flex items-center justify-between gap-4">
                {/* Student Info */}
                <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold">
                        {student.name.charAt(0)}
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800">{student.name}</h4>
                        <p className="text-sm text-gray-500">Roll No: {student.rollNo}</p>
                    </div>
                </div>

                {/* Attendance Buttons */}
                <div className="flex gap-2">
                    <AttendanceButton
                        status="present"
                        isActive={attendance === 'present'}
                        onClick={() => onAttendanceChange(student.id, 'present')}
                        icon={Check}
                        label="Present"
                        color="bg-green-500"
                    />
                    <AttendanceButton
                        status="absent"
                        isActive={attendance === 'absent'}
                        onClick={() => onAttendanceChange(student.id, 'absent')}
                        icon={X}
                        label="Absent"
                        color="bg-red-500"
                    />
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon: Icon, label, value, color, bgColor }) => (
    <div className={`${bgColor} p-4 rounded-lg border border-gray-200`}>
        <div className="flex items-center gap-3">
            <div className={`${color} bg-opacity-10 p-3 rounded-lg`}>
                <Icon size={24} className={color} />
            </div>
            <div>
                <p className="text-sm text-gray-600">{label}</p>
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
            </div>
        </div>
    </div>
);

export default function TeacherAttendancePage() {
    const [selectedClass, setSelectedClass] = useState(mockClasses[0].id);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [attendanceData, setAttendanceData] = useState({});
    const [searchQuery, setSearchQuery] = useState('');

    const handleAttendanceChange = (studentId, status) => {
        setAttendanceData(prev => ({
            ...prev,
            [studentId]: status
        }));
    };

    const handleMarkAll = (status) => {
        const newAttendance = {};
        mockStudents.forEach(student => {
            newAttendance[student.id] = status;
        });
        setAttendanceData(newAttendance);
    };

    const handleSave = () => {
        // In a real app, this would save to the backend
        alert('Attendance saved successfully!');
    };

    // Calculate statistics
    const totalStudents = mockStudents.length;
    const presentCount = Object.values(attendanceData).filter(s => s === 'present').length;
    const absentCount = Object.values(attendanceData).filter(s => s === 'absent').length;
    const unmarkedCount = totalStudents - presentCount - absentCount;

    // Filter students based on search
    const filteredStudents = mockStudents.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.rollNo.includes(searchQuery)
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Mark Attendance</h1>
                    <p className="text-sm text-gray-500 mt-1">Track and manage student attendance</p>
                </div>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg"
                >
                    <Save size={20} />
                    Save Attendance
                </button>
            </div>

            {/* Class and Date Selection */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Select Class
                        </label>
                        <select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(Number(e.target.value))}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            {mockClasses.map(cls => (
                                <option key={cls.id} value={cls.id}>{cls.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Select Date
                        </label>
                        <div className="flex items-center gap-2">
                            <Calendar size={20} className="text-gray-500 ml-3 absolute" />
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    icon={Users}
                    label="Total Students"
                    value={totalStudents}
                    color="text-blue-600"
                    bgColor="bg-blue-50"
                />
                <StatCard
                    icon={Check}
                    label="Present"
                    value={presentCount}
                    color="text-green-600"
                    bgColor="bg-green-50"
                />
                <StatCard
                    icon={X}
                    label="Absent"
                    value={absentCount}
                    color="text-red-600"
                    bgColor="bg-red-50"
                />
                <StatCard
                    icon={Filter}
                    label="Unmarked"
                    value={unmarkedCount}
                    color="text-gray-600"
                    bgColor="bg-gray-50"
                />
            </div>

            {/* Quick Actions */}
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <h3 className="font-semibold text-gray-800">Quick Actions:</h3>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleMarkAll('present')}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                        >
                            <Check size={16} />
                            Mark All Present
                        </button>
                        <button
                            onClick={() => handleMarkAll('absent')}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                        >
                            <X size={16} />
                            Mark All Absent
                        </button>
                        <button
                            onClick={() => setAttendanceData({})}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                        >
                            Clear All
                        </button>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="relative">
                    <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by student name or roll number..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Student List */}
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800 text-lg">
                        Students ({filteredStudents.length})
                    </h3>
                    <button
                        className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg font-medium transition-colors"
                    >
                        <Download size={16} />
                        Export Report
                    </button>
                </div>

                {filteredStudents.map(student => (
                    <StudentRow
                        key={student.id}
                        student={student}
                        attendance={attendanceData[student.id]}
                        onAttendanceChange={handleAttendanceChange}
                    />
                ))}

                {filteredStudents.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                        <Users size={48} className="mx-auto text-gray-400 mb-3" />
                        <p className="text-gray-600">No students found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
