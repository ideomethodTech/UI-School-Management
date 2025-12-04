export const allPendingTasks = [
    { title: 'Review Exam Results', description: 'Math final exam results need review', priority: 'high', dueDate: 'Today' },
    { title: 'Approve New Teachers', description: '3 new teacher registrations pending', priority: 'medium', dueDate: 'Tomorrow' },
    { title: 'Update Class Schedule', description: 'Schedule changes for next semester', priority: 'medium', dueDate: 'Dec 15' },
    { title: 'Parent Portal Maintenance', description: 'System maintenance scheduled', priority: 'low', dueDate: 'Dec 20' },
    { title: 'Finalize Event Budget', description: 'Budget for Annual Day needs approval', priority: 'high', dueDate: 'Dec 22' },
    { title: 'Order Library Books', description: 'New curriculum books are pending order', priority: 'low', dueDate: 'Dec 28' },
];

export const detailedClassPerformance = [
    { name: 'Grade 10-A', students: 45, avgScore: '78.5%', status: 'Good', teacher: 'Mr. Smith', attendance: '95%' },
    { name: 'Grade 10-B', students: 42, avgScore: '82.3%', status: 'Excellent', teacher: 'Ms. Jones', attendance: '97%' },
    { name: 'Grade 9-A', students: 48, avgScore: '75.2%', status: 'Good', teacher: 'Mr. Davis', attendance: '92%' },
    { name: 'Grade 9-B', students: 46, avgScore: '79.8%', status: 'Good', teacher: 'Mrs. Wilson', attendance: '94%' },
    { name: 'Grade 8-A', students: 50, avgScore: '68.1%', status: 'Needs Improvement', teacher: 'Mr. Brown', attendance: '88%' },
];

export const recentNotices = [
    { iconName: 'FiAlertCircle', color: 'text-orange-500', title: 'Important Notice', description: 'Annual examination schedule released', time: '2 hours ago' },
    { iconName: 'FiCalendar', color: 'text-blue-500', title: 'Event Updated', description: 'Winter break dates have been modified', time: '5 hours ago' },
    { iconName: 'FiUserGroup', color: 'text-green-500', title: 'New Enrollment', description: '15 new students enrolled this week', time: '1 day ago' },
];

export const systemStatusData = [
    { label: 'Server Status', status: 'Operational', color: 'bg-green-500' },
    { label: 'Database', status: 'Connected', color: 'bg-green-500' },
    { label: 'Backup Status', status: 'In Progress', color: 'bg-yellow-500' },
];

export const initialAssignmentsData = [
    { id: 1, subject: 'Math', class: '1A', teacher: 'Tommy Wise' },
    { id: 2, subject: 'English', class: '2A', teacher: 'Rhoda Frank' },
    { id: 3, subject: 'Science', class: '3A', teacher: 'Della Dunn' },
    { id: 4, subject: 'Social Studies', class: '1B', teacher: 'Bruce Rodriguez' },
    { id: 5, subject: 'Art', class: '4A', teacher: 'Birdie Butler' },
    { id: 6, subject: 'Music', class: '5A', teacher: 'Bettie Oliver' },
    { id: 7, subject: 'History', class: '6A', teacher: 'Herman Howard' },
    { id: 8, subject: 'Geography', class: '6B', teacher: 'Lucinda Thomas' },
];

export const sampleClasses = [
    { className: '1A', capacity: 20, grade: 1, supervisor: 'Joseph Padilla' },
    { className: '2B', capacity: 22, grade: 2, supervisor: 'Blake Joseph' },
    { className: '3C', capacity: 20, grade: 3, supervisor: 'Tom Bennett' },
    { className: '4B', capacity: 18, grade: 4, supervisor: 'Aaron Collins' },
    { className: '5A', capacity: 16, grade: 5, supervisor: 'Iva Frank' },
    { className: '5B', capacity: 20, grade: 5, supervisor: 'Leila Santos' },
    { className: '7A', capacity: 18, grade: 7, supervisor: 'Carrie Walton' },
    { className: '6B', capacity: 22, grade: 6, supervisor: 'Christopher Butler' },
    { className: '6C', capacity: 18, grade: 6, supervisor: 'Marc Miller' },
    { className: '6D', capacity: 20, grade: 6, supervisor: 'Ophella Marsh' }
];

export const initialExamsData = [
    { id: 1, subject: 'Math', class: '1A', teacher: 'Tommy Wise', date: '2025-01-10' },
    { id: 2, subject: 'English', class: '2A', teacher: 'Rhoda Frank', date: '2025-01-12' },
    { id: 3, subject: 'Science', class: '3A', teacher: 'Della Dunn', date: '2025-01-15' },
    { id: 4, subject: 'Social Studies', class: '1B', teacher: 'Bruce Rodriguez', date: '2025-01-18' },
    { id: 5, subject: 'Art', class: '4A', teacher: 'Birdie Butler', date: '2025-01-20' },
    { id: 6, subject: 'Music', class: '5A', teacher: 'Bettie Oliver', date: '2025-01-22' },
    { id: 7, subject: 'History', class: '6A', teacher: 'Herman Howard', date: '2025-01-25' },
    { id: 8, subject: 'Geography', class: '6B', teacher: 'Lucinda Thomas', date: '2025-01-28' },
];

export const sampleStudentsAttendance = [
    { id: '00010000', name: 'Jeremy Schmidt', status: 'present', totalHeldHours: '12 Hours', marks: 'Enrolled' },
    { id: '00010001', name: 'Olivia Kigula', status: 'absent', totalHeldHours: '12 Hours', marks: 'Enrolled' },
    { id: '00010002', name: 'Lyndah Nagaba', status: 'present', totalHeldHours: '12 Hours', marks: 'Enrolled' },
    { id: '00010003', name: 'Anna Witte', status: 'present', totalHeldHours: '12 Hours', marks: 'Enrolled' },
    { id: '00010004', name: 'Alba Schulz', status: 'absent', totalHeldHours: '12 Hours', marks: 'Enrolled' },
    { id: '00010005', name: 'Mao Chu', status: 'late', totalHeldHours: '12 Hours', marks: 'Enrolled' },
];
