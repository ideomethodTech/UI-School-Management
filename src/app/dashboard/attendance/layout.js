// src/app/dashboard/attendance/layout.js
// This is a Server Component by default, so it can export metadata

export const metadata = {
  title: 'Attendance - School Management',
  description: 'View and manage student attendance.',
};

export default function AttendanceLayout({ children }) {
  return (
    // The children here will be your attendance/page.js
    <>
      {children}
    </>
  );
}