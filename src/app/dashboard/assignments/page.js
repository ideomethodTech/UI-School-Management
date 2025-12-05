"use client";

import { useUser } from '@/contexts/UserContext';
import StudentAssignmentsPage from '@/components/student/StudentAssignmentsPage';
import AdminAssignmentsPage from '@/components/admin/AdminAssignmentsPage';
import TeacherAssignmentsPage from '@/components/teacher/TeacherAssignmentsPage';

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