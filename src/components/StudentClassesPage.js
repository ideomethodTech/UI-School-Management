// src/components/StudentClassesPage.js
import { User, Calendar, MapPin, BookOpen, Users, Library } from 'lucide-react';

// Mock Data
const classesData = [
    { id: 1, name: 'Mathematics', section: 'Class 10-A', credits: 4, teacher: 'Priya Sharma', schedule: 'Mon, Wed, Fri - 10:00 AM', location: 'Room 101' },
    { id: 2, name: 'English', section: 'Class 10-A', credits: 3, teacher: 'Ramesh Kumar', schedule: 'Tue, Thu - 02:00 PM', location: 'Room 102' },
    { id: 3, name: 'Science', section: 'Class 10-A', credits: 4, teacher: 'Dr. Anjali', schedule: 'Mon, Wed - 01:00 PM', location: 'Lab 201' },
    { id: 4, name: 'Social Studies', section: 'Class 10-A', credits: 2, teacher: 'Vikram Singh', schedule: 'Thu, Fri - 11:00 AM', location: 'Room 103' },
];

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
const ClassItem = ({ classInfo }) => (
    <div className="bg-purple-50 p-5 rounded-lg border border-purple-100 shadow-sm">
        {/* Top Section */}
        <div className="flex justify-between items-start">
            <div>
                <h3 className="font-bold text-xl text-gray-800">{classInfo.name}</h3>
                <p className="text-sm text-gray-600">{classInfo.section}</p>
            </div>
            <span className="bg-purple-100 text-purple-700 text-sm font-semibold px-3 py-1 rounded-full">{classInfo.credits} Credits</span>
        </div>

        <div className="border-t border-purple-200 my-4"></div>

        {/* Details Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
                <User size={16} className="text-gray-500" />
                <div>
                    <p className="text-xs text-gray-500">Teacher</p>
                    <p className="font-semibold text-gray-700">{classInfo.teacher}</p>
                </div>
            </div>
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
        <div className="flex items-center gap-4">
            <button className=" flex justify-center items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-purple-600 text-white rounded-lg shadow-sm hover:bg-purple-700">
                <BookOpen size={16} />
                View Materials
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg">
                <Users size={16} />
                Classmates
            </button>
        </div>
    </div>
);


export default function StudentClassesPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">My Classes</h1>
                <p className="text-sm text-gray-500 mt-1">Class 10-A • 4 subjects enrolled</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Enrolled" value="4" />
                <StatCard label="Total Credits" value="13" colorClass="text-purple-600" />
                <StatCard label="Active" value="4" colorClass="text-green-600" />

            </div>

            {/* My Classes Section */}
            <div className="space-y-4">

                {classesData.map(classInfo => <ClassItem key={classInfo.id} classInfo={classInfo} />)}
            </div>
        </div>
    );
}