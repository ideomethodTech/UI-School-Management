export const allAssignmentsData = [
    { id: 1, title: 'Mathematics Chapter 5 Exercise', subject: 'Mathematics', dueDate: 'Due: Dec 15, 2024', status: 'Pending' },
    { id: 2, title: 'English Essay on Climate Change', subject: 'English', dueDate: 'Due: Dec 18, 2024', status: 'Pending' },
    { id: 3, title: 'Science Project - Solar System', subject: 'Science', dueDate: 'Due: Dec 20, 2024', status: 'Pending' },
    { id: 4, title: 'History Assignment - Indian Independence', subject: 'History', dueDate: 'Due: Dec 12, 2024', status: 'Urgent' },
];

export const allExamsData = [
    { id: 1, subject: 'Mathematics', date: 'Dec 25, 2024', time: '10:00 AM - 1:00 PM', room: 'Lab-5', duration: '3 hours' },
    { id: 2, subject: 'English', date: 'Dec 27, 2024', time: '2:00 PM - 4:30 PM', room: 'Classroom-10', duration: '2.5 hours' },
    { id: 3, subject: 'Science', date: 'Dec 29, 2024', time: '10:00 AM - 1:00 PM', room: 'Lab-3', duration: '3 hours' },
];

export const courseMaterialsData = [
    { id: 1, title: 'Quadratic Equations PDF', subject: 'Mathematics' },
    { id: 2, title: 'Shakespeare Literature', subject: 'English' },
    { id: 3, title: 'Physics Practicals', subject: 'Science' },
    { id: 4, title: 'Modern India Notes', subject: 'History' },
];

export const attendanceData = [
    { month: 'October', days: '22/25 days', percentage: 88 },
    { month: 'November', days: '24/25 days', percentage: 96 },
    { month: 'December', days: '10/12 days', percentage: 83 },
];

export const assignmentsPageData = [
    {
        id: 1,
        title: 'Chapter 5 Quadratic Equations',
        subject: 'Mathematics',
        description: 'Solve practice problems from page 45-50',
        dueDate: 'Dec 15, 2024',
        status: 'Pending',
        timeLeft: '2 days left',
    },
    {
        id: 2,
        title: 'English Essay on Climate Change',
        subject: 'English',
        description: 'Write a 500-word essay with references',
        dueDate: 'Dec 18, 2024',
        status: 'Pending',
        timeLeft: '5 days left',
    },
    {
        id: 3,
        title: 'Science Project - Solar System',
        subject: 'Science',
        description: 'Create a model and presentation',
        dueDate: 'Dec 20, 2024',
        status: 'Pending',
        timeLeft: '7 days left',
    },
    {
        id: 4,
        title: 'History Assignment - Indian Independence',
        subject: 'History',
        description: 'Research and summarize key events',
        dueDate: 'Dec 12, 2024',
        status: 'Overdue',
        timeLeft: 'Overdue',
    },
];

export const studentAttendancePageData = {
    studentName: 'John Smith',
    class: 'Class 10-A',
    rollNo: '045',
    stats: {
        overall: 89,
        attended: 56,
        totalClasses: 62,
        missed: 6
    },
    monthly: [
        { month: 'September', attended: 20, total: 22, percentage: 91 },
        { month: 'October', attended: 22, total: 25, percentage: 88 },
        { month: 'November', attended: 24, total: 25, percentage: 96 }
    ],
    recent: [
        { date: 'Nov 28, 2024', status: 'present' },
        { date: 'Nov 27, 2024', status: 'present' },
        { date: 'Nov 26, 2024', status: 'absent' },
        { date: 'Nov 25, 2024', status: 'present' },
        { date: 'Nov 24, 2024', status: 'present' }
    ]
};

export const classesPageData = [
    { id: 1, name: 'Mathematics', section: 'Class 10-A', credits: 4, teacher: 'Priya Sharma', schedule: 'Mon, Wed, Fri - 10:00 AM', location: 'Room 101' },
    { id: 2, name: 'English', section: 'Class 10-A', credits: 3, teacher: 'Ramesh Kumar', schedule: 'Tue, Thu - 02:00 PM', location: 'Room 102' },
    { id: 3, name: 'Science', section: 'Class 10-A', credits: 4, teacher: 'Dr. Anjali', schedule: 'Mon, Wed - 01:00 PM', location: 'Lab 201' },
    { id: 4, name: 'Social Studies', section: 'Class 10-A', credits: 2, teacher: 'Vikram Singh', schedule: 'Thu, Fri - 11:00 AM', location: 'Room 103' },
];

export const upcomingExamsPageData = [
    { id: 1, title: 'Mid-Term Exam', subject: 'English', date: 'Dec 22, 2024', time: '02:00 PM', duration: '3 hours', totalMarks: 80 },
    { id: 2, title: 'Science Practical', subject: 'Science', date: 'Dec 25, 2024', time: '11:00 AM', duration: '2 hours', totalMarks: 50 },
];

export const completedExamsPageData = [
    { id: 1, title: 'Mid-Term Exam', subject: 'Mathematics', date: 'Dec 20, 2024', score: 85, maxMarks: 100, grade: 'A+' },
    { id: 2, title: 'Unit Test - Geometry', subject: 'Mathematics', date: 'Dec 18, 2024', score: 42, maxMarks: 50, grade: 'A' },
];

export const studentResultsData = {
    name: 'John Smith',
    rollNo: '10001',
    class: '10 A',
    email: 'john.smith@school.com',
    overallScore: 88,
    classRank: 1,
    totalStudents: 45,
    totalSubjects: 4,
    subjects: [
        {
            id: 1,
            name: 'Mathematics',
            teacher: 'Priya Sharma',
            midterm: 85,
            final: 92,
            assignments: 88,
            overall: 90,
            grade: 'A+'
        },
        {
            id: 2,
            name: 'English',
            teacher: 'Ramesh Kumar',
            midterm: 78,
            final: 82,
            assignments: 85,
            overall: 82,
            grade: 'A'
        },
        {
            id: 3,
            name: 'Science',
            teacher: 'Dr. Anjali',
            midterm: 92,
            final: 88,
            assignments: 90,
            overall: 89,
            grade: 'A'
        },
        {
            id: 4,
            name: 'Social Studies',
            teacher: 'Vikram Singh',
            midterm: 88,
            final: 90,
            assignments: 92,
            overall: 90,
            grade: 'A+'
        }
    ]
};
