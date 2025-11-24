// src/app/dashboard/classes/page.js
"use client";

import { useUser } from '@/contexts/UserContext';
import StudentClassesPage from '@/components/StudentClassesPage';

// Placeholder for the Admin/Teacher view
const AdminClassesPage = () => (
    <div>
        <h1 className="text-3xl font-bold text-gray-800">Manage Classes</h1>
        <p className="mt-2 text-gray-600">
            This is the class management interface for Admins and Teachers.
        </p>
    </div>
);

export default function ClassesPage() {
    const { currentUserRole } = useUser();

    return (
        <div className="p-6">
            {currentUserRole === 'student'
                ? <StudentClassesPage />
                : <AdminClassesPage />
            }
        </div>
    );
}