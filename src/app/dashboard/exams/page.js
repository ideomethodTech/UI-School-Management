// src/app/dashboard/exams/page.js
"use client";

import { useUser } from '@/contexts/UserContext';
import StudentExamsPage from '@/components/StudentExamsPage';
import AdminExamsPage from '@/components/AdminExamsPage';
import TeacherExamsPage from '@/components/TeacherExamsPage'; // <-- Import the new component

export default function ExamsPage() {
    const { currentUserRole } = useUser();

    return (
        <div className="p-6">
            {currentUserRole === 'student' && <StudentExamsPage />}
            {currentUserRole === 'teacher' && <TeacherExamsPage />}
            {currentUserRole === 'admin' && <AdminExamsPage />}
        </div>
    );
}