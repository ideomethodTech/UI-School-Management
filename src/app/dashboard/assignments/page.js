// src/app/dashboard/assignments/page.js
"use client";

import { useUser } from '@/contexts/UserContext';
import StudentAssignmentsPage from '@/components/StudentAssignmentsPage';

// Placeholder for the Admin/Teacher view
const AdminAssignmentsPage = () => (
    <div>
        <h1 className="text-3xl font-bold text-gray-800">Manage Assignments</h1>
        <p className="mt-2 text-gray-600">
            This is the assignment management interface for Admins and Teachers.
        </p>
    </div>
);

export default function AssignmentsPage() {
    const { currentUserRole } = useUser();

    return (
        <div className="p-6">
            {currentUserRole === 'student'
                ? <StudentAssignmentsPage />
                : <AdminAssignmentsPage />
            }
        </div>
    );
}