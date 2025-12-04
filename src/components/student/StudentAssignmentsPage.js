// src/components/StudentAssignmentsPage.js
import { AlertCircle, Upload } from 'lucide-react';
import { assignmentsPageData as assignmentsData } from '../../mockData/studentData';

// Reusable stat card for the summary section
const StatCard = ({ label, value, colorClass }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
        <p className="text-sm text-gray-500">{label}</p>
        <p className={`text-3xl font-bold ${colorClass}`}>{value}</p>
    </div>
);

// Component for a single assignment item in the list
const AssignmentItem = ({ assignment }) => {
    const isOverdue = assignment.status === 'Overdue';

    return (
        <div className={`p-5 rounded-lg border shadow-sm ${isOverdue ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'}`}>
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                {/* Left Side: Details */}
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-lg text-gray-800">{assignment.title}</h3>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${isOverdue ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-800'}`}>
                            {assignment.timeLeft}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600">{assignment.subject}</p>
                    <p className="text-sm text-gray-500 mt-1">{assignment.description}</p>
                </div>
                {/* Right Side: Submit Button */}
                <div className="flex-shrink-0 mt-4 sm:mt-0">
                    <button className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg shadow-sm ${isOverdue ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700'}`}>
                        <Upload size={16} />
                        Submit
                    </button>
                </div>
            </div>
            <div className="border-t border-gray-200 mt-4 pt-3 flex justify-between items-center">
                <p className="text-sm text-gray-500">Due: {assignment.dueDate}</p>
                <p className="text-sm font-medium text-gray-600">Not Submitted</p>
            </div>
        </div>
    );
};


// Main component for the student's assignments page
export default function StudentAssignmentsPage() {
    const totalAssignments = assignmentsData.length;
    const pendingAssignments = assignmentsData.filter(a => a.status === 'Pending').length;
    const overdueAssignments = assignmentsData.filter(a => a.status === 'Overdue').length;

    return (
        <div className="p-5 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">My Assignments</h1>
                <p className="text-sm text-gray-500 mt-1">Class 10-A • {totalAssignments} assignments</p>
            </div>

            {/* Overdue Alert */}
            {overdueAssignments > 0 && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg flex items-center gap-3 shadow-sm">
                    <AlertCircle className="w-6 h-6" />
                    <div>
                        <p className="font-semibold">{overdueAssignments} Overdue Assignment</p>
                        <p className="text-sm">Please submit overdue assignments as soon as possible.</p>
                    </div>
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <StatCard label="Total" value={totalAssignments} colorClass="text-gray-800" />
                <StatCard label="Pending" value={pendingAssignments} colorClass="text-yellow-600" />
                <StatCard label="Overdue" value={overdueAssignments} colorClass="text-red-600" />
            </div>

            {/* Assignments List */}
            <div className="space-y-4">
                {assignmentsData.map(assignment => (
                    <AssignmentItem key={assignment.id} assignment={assignment} />
                ))}
            </div>
        </div>
    );
}