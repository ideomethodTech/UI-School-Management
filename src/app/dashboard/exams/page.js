// src/app/dashboard/exams/page.js
"use client";

import { useUser } from '@/contexts/UserContext';
import StudentExamsPage from '@/components/StudentExamsPage';

// Placeholder for the Admin/Teacher view
const AdminExamsPage = () => (
    <div>
        <h1 className="text-3xl font-bold text-gray-800">Manage Exams</h1>
        <p className="mt-2 text-gray-600">
            This is the exam management interface for Admins and Teachers.
        </p>
    </div>
);

export default function ExamsPage() {
    const { currentUserRole } = useUser();

    return (
        <div className="p-6">
            {currentUserRole === 'student'
                ? <StudentExamsPage />
                // You can add more roles here later, like 'teacher'
                : <AdminExamsPage />
            }
        </div>
    );
}