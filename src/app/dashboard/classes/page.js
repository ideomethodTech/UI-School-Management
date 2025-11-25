// src/app/dashboard/classes/page.js
"use client";

import { useUser } from '@/contexts/UserContext';
import StudentClassesPage from '@/components/StudentClassesPage';
import AdminClassesPage from '@/components/AdminClassesPage';

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