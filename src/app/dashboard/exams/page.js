// src/app/dashboard/exams/page.js
"use client";

import { useUser } from '@/contexts/UserContext';
import StudentExamsPage from '@/components/StudentExamsPage';
import AdminExamsPage from '@/components/AdminExamsPage'; // <-- Import the new component

export default function ExamsPage() {
    const { currentUserRole } = useUser();

    return (
        <div className="p-6">
            {currentUserRole === 'student'
                ? <StudentExamsPage />
                : <AdminExamsPage /> // <-- Use the new component here
            }
        </div>
    );
}