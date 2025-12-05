export const mockParentData = {
    parentName: 'Sarah Smith',
    child: {
        name: 'John Smith',
        class: 'Class 10-A',
        rollNumber: '045'
    },
    alerts: [
        {
            id: 1,
            type: 'warning',
            title: 'Fee Payment Overdue',
            message: 'Term 3 fee payment is due. Please pay by Dec 30, 2024.',
            borderColor: 'border-l-yellow-500',
            bgColor: 'bg-yellow-50'
        },
        {
            id: 2,
            type: 'info',
            title: 'Exam Schedule Released',
            message: 'Final exams will be held from Dec 25 - Jan 10, 2025.',
            borderColor: 'border-l-blue-500',
            bgColor: 'bg-blue-50'
        },
        {
            id: 3,
            type: 'success',
            title: 'Great Performance',
            message: 'John scored 90 in Science - Outstanding!',
            borderColor: 'border-l-green-500',
            bgColor: 'bg-green-50'
        }
    ],
    academicPerformance: [
        { id: 1, subject: 'Mathematics', score: 87, previous: 82, change: 5 },
        { id: 2, subject: 'English', score: 82, previous: 80, change: 2 },
        { id: 3, subject: 'Science', score: 90, previous: 88, change: 2 },
        { id: 4, subject: 'Social Studies', score: 85, previous: 83, change: 2 },
        { id: 5, subject: 'Hindi', score: 88, previous: 86, change: 2 },
        { id: 6, subject: 'Physical Education', score: 95, previous: 92, change: 3 }
    ],
    upcomingEvents: [
        { id: 1, title: 'Parent-Teacher Meeting', date: 'Dec 20, 2024', time: '3:00 PM', location: 'School Hall' },
        { id: 2, title: 'Annual Sports Day', date: 'Dec 28, 2024', time: '9:00 AM', location: 'School Ground' },
        { id: 3, title: 'Annual Day Celebration', date: 'Jan 15, 2025', time: '6:00 PM', location: 'Auditorium' }
    ],
    feeStatus: [
        { id: 1, term: 'Term 1 (Apr-Jun)', amount: '₹25,000', status: 'Paid', statusColor: 'bg-green-100 text-green-700' },
        { id: 2, term: 'Term 2 (Jul-Sep)', amount: '₹25,000', status: 'Paid', statusColor: 'bg-green-100 text-green-700' },
        { id: 3, term: 'Term 3 (Oct-Dec)', amount: '₹25,000', status: 'Due', statusColor: 'bg-yellow-100 text-yellow-700' }
    ],
    quickContacts: [
        { id: 1, role: 'CLASS TEACHER', name: 'Priya Sharma', contact: 'priya@school.com' },
        { id: 2, role: 'PRINCIPAL', name: 'Dr. Rajesh Kumar', contact: 'principal@school.com' }
    ],
    attendance: [
        { id: 1, month: 'October', percentage: 88, days: '22 of 25 days present' },
        { id: 2, month: 'November', percentage: 96, days: '24 of 25 days present' },
        { id: 3, month: 'December', percentage: 83, days: '10 of 12 days present' }
    ]
};

export const parentAttendancePageData = {
    child: {
        name: 'John Smith',
        grade: '10 A',
        academicYear: '2024-2025'
    },
    summary: {
        attendancePercentage: 94,
        daysPresent: 112,
        totalDays: 119,
        daysAbsent: 7,
        currentStatus: 'On Track',
        statusMessage: 'Meeting expectations'
    },
    termPerformance: [
        { term: 'Term 1', present: 54, total: 59, percentage: 92 },
        { term: 'Term 2', present: 58, total: 60, percentage: 97 }
    ],
    monthlyAttendance: {
        september: [
            { date: '2024-09-05', day: 'Thursday', status: 'Absent', time: '-', remarks: 'Sick leave' },
            { date: '2024-09-12', day: 'Thursday', status: 'Absent', time: '-', remarks: 'Medical appointment' },
            { date: '2024-09-18', day: 'Wednesday', status: 'Present', time: '8:30 AM', remarks: '-' },
            { date: '2024-09-19', day: 'Thursday', status: 'Present', time: '8:15 AM', remarks: '-' },
            { date: '2024-09-20', day: 'Friday', status: 'Present', time: '8:25 AM', remarks: '-' },
            { date: '2024-09-23', day: 'Monday', status: 'Present', time: '8:20 AM', remarks: '-' },
            { date: '2024-09-24', day: 'Tuesday', status: 'Present', time: '8:30 AM', remarks: '-' },
            { date: '2024-09-25', day: 'Wednesday', status: 'Present', time: '8:10 AM', remarks: '-' },
            { date: '2024-09-26', day: 'Thursday', status: 'Present', time: '8:35 AM', remarks: 'Slight delay' },
            { date: '2024-09-27', day: 'Friday', status: 'Present', time: '8:15 AM', remarks: '-' }
        ],
        october: [
            { date: '2024-10-03', day: 'Thursday', status: 'Absent', time: '-', remarks: 'Family event' },
            { date: '2024-10-07', day: 'Monday', status: 'Present', time: '8:20 AM', remarks: '-' },
            { date: '2024-10-08', day: 'Tuesday', status: 'Present', time: '8:30 AM', remarks: '-' },
            { date: '2024-10-09', day: 'Wednesday', status: 'Present', time: '8:15 AM', remarks: '-' },
            { date: '2024-10-10', day: 'Thursday', status: 'Present', time: '8:25 AM', remarks: '-' },
            { date: '2024-10-14', day: 'Monday', status: 'Present', time: '8:10 AM', remarks: '-' },
            { date: '2024-10-15', day: 'Tuesday', status: 'Present', time: '8:30 AM', remarks: '-' },
            { date: '2024-10-16', day: 'Wednesday', status: 'Present', time: '8:20 AM', remarks: '-' },
            { date: '2024-10-21', day: 'Monday', status: 'Present', time: '8:25 AM', remarks: '-' },
            { date: '2024-10-22', day: 'Tuesday', status: 'Present', time: '8:15 AM', remarks: '-' }
        ],
        november: [
            { date: '2024-11-04', day: 'Monday', status: 'Absent', time: '-', remarks: 'Fever' },
            { date: '2024-11-05', day: 'Tuesday', status: 'Absent', time: '-', remarks: 'Still recovering' },
            { date: '2024-11-11', day: 'Monday', status: 'Present', time: '8:30 AM', remarks: '-' },
            { date: '2024-11-12', day: 'Tuesday', status: 'Present', time: '8:15 AM', remarks: '-' },
            { date: '2024-11-13', day: 'Wednesday', status: 'Present', time: '8:20 AM', remarks: '-' },
            { date: '2024-11-18', day: 'Monday', status: 'Present', time: '8:25 AM', remarks: '-' },
            { date: '2024-11-19', day: 'Tuesday', status: 'Present', time: '8:30 AM', remarks: '-' },
            { date: '2024-11-20', day: 'Wednesday', status: 'Absent', time: '-', remarks: 'Dentist appointment' },
            { date: '2024-11-25', day: 'Monday', status: 'Present', time: '8:10 AM', remarks: '-' },
            { date: '2024-11-26', day: 'Tuesday', status: 'Present', time: '8:20 AM', remarks: '-' }
        ]
    }
};

export const EVENT_CATEGORIES = {
    exam: { label: 'Exam', color: 'bg-red-100 text-red-600', dotColor: 'bg-red-500' },
    sports: { label: 'Sports', color: 'bg-green-100 text-green-600', dotColor: 'bg-green-500' },
    meeting: { label: 'Meeting', color: 'bg-purple-100 text-purple-600', dotColor: 'bg-purple-500' },
    registration: { label: 'Registration', color: 'bg-blue-100 text-blue-600', dotColor: 'bg-blue-500' },
    fair: { label: 'Fair', color: 'bg-yellow-100 text-yellow-600', dotColor: 'bg-yellow-500' },
    holiday: { label: 'Holiday', color: 'bg-indigo-100 text-indigo-600', dotColor: 'bg-indigo-500' }
};

export const parentEventsData = [
    {
        id: 1,
        title: 'Mid-Year Examination',
        category: 'exam',
        description: 'English, Mathematics, and Science exams',
        date: '2024-07-05',
        displayDate: 'Friday, July 5, 2024',
        shortDate: 'Jul 5',
        time: '10:00 AM - 1:00 PM',
        location: 'School Campus'
    },
    {
        id: 2,
        title: 'Annual Sports Day',
        category: 'sports',
        description: 'Participate in various sports competitions and activities',
        date: '2024-07-12',
        displayDate: 'Friday, July 12, 2024',
        shortDate: 'Jul 12',
        time: '8:00 AM - 4:00 PM',
        location: 'Sports Ground'
    },
    {
        id: 3,
        title: 'Parent-Teacher Meeting',
        category: 'meeting',
        description: "Discuss your child's progress and performance",
        date: '2024-07-19',
        displayDate: 'Friday, July 19, 2024',
        shortDate: 'Jul 19',
        time: '3:00 PM - 5:00 PM',
        location: 'School Campus'
    },
    {
        id: 4,
        title: 'Science Fair',
        category: 'fair',
        description: 'Students showcase their science projects and experiments',
        date: '2024-07-26',
        displayDate: 'Friday, July 26, 2024',
        shortDate: 'Jul 26',
        time: '10:00 AM - 3:00 PM',
        location: 'School Auditorium'
    },
    {
        id: 5,
        title: 'Summer Vacation Begins',
        category: 'holiday',
        description: 'School holidays begin. Enjoy your break!',
        date: '2024-08-02',
        displayDate: 'Friday, August 2, 2024',
        shortDate: 'Aug 2',
        time: 'All Day',
        location: 'School'
    }
];
