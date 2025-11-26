"use client";

import { useUser } from '@/contexts/UserContext';
import StudentAssignmentsPage from '@/components/StudentAssignmentsPage';
import AdminAssignmentsPage from '@/components/AdminAssignmentsPage';
import TeacherAssignmentsPage from '@/components/TeacherAssignmentsPage'; // <-- 1. Import the new component

export default function AssignmentsPage() {
    const { currentUserRole } = useUser();

    return (
        <div className="p-6">
            {currentUserRole === 'student' && <StudentAssignmentsPage />}
            {currentUserRole === 'teacher' && <TeacherAssignmentsPage />}
            {currentUserRole === 'admin' && <AdminAssignmentsPage />}
        </div>
    );
}