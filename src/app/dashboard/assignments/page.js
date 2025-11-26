"use client";

import { useUser } from '@/contexts/UserContext';
import StudentAssignmentsPage from '@/components/StudentAssignmentsPage';
import AdminAssignmentsPage from '@/components/AdminAssignmentsPage';

export default function AssignmentsPage() {
    const { currentUserRole } = useUser();

    return (
        <>
            {currentUserRole === 'student'
                ? <StudentAssignmentsPage />
                : <AdminAssignmentsPage />
            }
        </>
    );
}
