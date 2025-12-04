import { useState } from 'react';
import { Users, Calendar, MapPin, ClipboardList, GraduationCap, Settings } from 'lucide-react';
import ManageClassModal from '@/components/modals/ManageClassModal';
import AttendanceModal from '@/components/modals/AttendanceModal';
import GradesModal from '@/components/modals/GradesModal';
import StudentsListModal from '@/components/modals/StudentsListModal';

import { teacherClassesData } from '../../mockData/teacherData';

// Reusable Stat Card Component
const StatCard = ({ label, value, subValue = '', colorClass = 'text-gray-800' }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
        <p className="text-sm text-gray-500">{label}</p>
        <p className={`text-3xl font-bold ${colorClass}`}>
            {value} <span className="text-lg font-medium text-gray-500">{subValue}</span>
        </p>
    </div>
);

// Component for a single class item
const ClassItem = ({ classInfo, onAction, activeButton }) => (
    <div className="bg-purple-50 p-5 rounded-lg border border-purple-100 shadow-sm">
        {/* Top Section */}
        <div className="flex justify-between items-start">
            <div>
                <h3 className="font-bold text-xl text-gray-800">{classInfo.name}</h3>
                <p className="text-sm text-gray-600">{classInfo.section}</p>
            </div>
            <span className="bg-purple-100 text-purple-700 text-sm font-semibold px-3 py-1 rounded-full">{classInfo.students} Students</span>
        </div>

        <div className="border-t border-purple-200 my-4"></div>

        {/* Details Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-500" />
                <div>
                    <p className="text-xs text-gray-500">Schedule</p>
                    <p className="font-semibold text-gray-700">{classInfo.schedule}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-500" />
                <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="font-semibold text-gray-700">{classInfo.location}</p>
                </div>
            </div>
        </div>

        <div className="border-t border-purple-200 my-4"></div>

        {/* Actions Section */}
        <div className="flex flex-wrap items-center gap-3">
            <button
                onClick={() => onAction('manage', classInfo)}
                className={`flex justify-center items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg shadow-sm transition-colors ${activeButton === 'manage'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-700 bg-white border border-gray-200 hover:bg-purple-50 hover:border-purple-300'
                    }`}
            >
                <Settings size={16} />
                Manage Class
            </button>
            <button
                onClick={() => onAction('attendance', classInfo)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${activeButton === 'attendance'
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'text-gray-700 bg-white border border-gray-200 hover:bg-purple-50 hover:border-purple-300'
                    }`}
            >
                <ClipboardList size={16} />
                Attendance
            </button>
            <button
                onClick={() => onAction('grades', classInfo)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${activeButton === 'grades'
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'text-gray-700 bg-white border border-gray-200 hover:bg-purple-50 hover:border-purple-300'
                    }`}
            >
                <GraduationCap size={16} />
                Grades
            </button>
            <button
                onClick={() => onAction('students', classInfo)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg ml-auto transition-colors ${activeButton === 'students'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-700 hover:bg-purple-100'
                    }`}
            >
                <Users size={16} />
                Students
            </button>
        </div>
    </div>
);


export default function TeachersClassesPage() {
    const [activeModal, setActiveModal] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [activeButtons, setActiveButtons] = useState({});

    const handleAction = (action, classInfo) => {
        setSelectedClass(classInfo);
        setActiveModal(action);
        setActiveButtons(prev => ({
            ...prev,
            [classInfo.id]: action
        }));
    };

    const closeModal = () => {
        setActiveModal(null);
        setSelectedClass(null);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">My Classes</h1>
                <p className="text-sm text-gray-500 mt-1">Academic Year 2024-2025 • 4 Classes Active</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Total Classes" value="4" />
                <StatCard label="Total Students" value="115" colorClass="text-purple-600" />
                <StatCard label="Hours/Week" value="12" colorClass="text-green-600" />
            </div>

            {/* My Classes Section */}
            <div className="space-y-4">
                {teacherClassesData.map(classInfo => (
                    <ClassItem
                        key={classInfo.id}
                        classInfo={classInfo}
                        onAction={handleAction}
                        activeButton={activeButtons[classInfo.id]}
                    />
                ))}
            </div>

            {/* Modals */}
            <ManageClassModal
                isOpen={activeModal === 'manage'}
                onClose={closeModal}
                classData={selectedClass}
            />
            <AttendanceModal
                isOpen={activeModal === 'attendance'}
                onClose={closeModal}
                classData={selectedClass}
            />
            <GradesModal
                isOpen={activeModal === 'grades'}
                onClose={closeModal}
                classData={selectedClass}
            />
            <StudentsListModal
                isOpen={activeModal === 'students'}
                onClose={closeModal}
                classData={selectedClass}
            />
        </div>
    );
}
