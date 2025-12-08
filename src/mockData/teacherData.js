export const mockClasses = [
    { id: 1, name: 'Mathematics - Class 10-A', students: 32 },
    { id: 2, name: 'Mathematics - Class 9-B', students: 28 },
    { id: 3, name: 'Advanced Algebra - Class 11-C', students: 25 },
    { id: 4, name: 'Geometry - Class 9-A', students: 30 },
    { id: 5, name: 'Trig and Algebra - Class 7-A', students: 15 },

];

export const mockStudentResults = [
    { id: 1, name: 'Aarav Sharma', rollNo: '001', midterm: 85, final: 92, assignments: 88, overall: 90, grade: 'A+', trend: 'up' },
    { id: 2, name: 'Priya Patel', rollNo: '002', midterm: 78, final: 82, assignments: 85, overall: 82, grade: 'A', trend: 'up' },
    { id: 3, name: 'Rohan Kumar', rollNo: '003', midterm: 92, final: 88, assignments: 90, overall: 89, grade: 'A', trend: 'down' },
    { id: 4, name: 'Ananya Singh', rollNo: '004', midterm: 68, final: 75, assignments: 72, overall: 72, grade: 'B', trend: 'up' },
    { id: 5, name: 'Vikram Reddy', rollNo: '005', midterm: 95, final: 98, assignments: 95, overall: 96, grade: 'A+', trend: 'up' },
    { id: 6, name: 'Ishita Gupta', rollNo: '006', midterm: 82, final: 85, assignments: 88, overall: 85, grade: 'A', trend: 'up' },
    { id: 7, name: 'Aditya Verma', rollNo: '007', midterm: 55, final: 62, assignments: 58, overall: 59, grade: 'C', trend: 'up' },
    { id: 8, name: 'Sneha Iyer', rollNo: '008', midterm: 88, final: 90, assignments: 92, overall: 90, grade: 'A+', trend: 'up' },
    { id: 9, name: 'Arjun Nair', rollNo: '009', midterm: 72, final: 78, assignments: 75, overall: 75, grade: 'B', trend: 'up' },
    { id: 10, name: 'Kavya Menon', rollNo: '010', midterm: 65, final: 70, assignments: 68, overall: 68, grade: 'B', trend: 'up' },
];

export const mockAssignments = [
    {
        id: 1,
        title: "Chapter 5 - Quadratic Equations",
        description: "Solve practice problems from page 45-50",
        meta: "Mathematics • Class 10-A • Created Dec 8, 2024",
        dueDate: "Dec 15, 2024",
        submitted: 38,
        total: 45
    },
    {
        id: 2,
        title: "Chapter 6 - Geometry Exercise",
        description: "Complete all geometry proofs and constructions",
        meta: "Mathematics • Class 10-B • Created Dec 10, 2024",
        dueDate: "Dec 18, 2024",
        submitted: 35,
        total: 42
    }
];

export const mockAssignmentStats = {
    totalAssignments: "3",
    totalSubmissions: "115",
    avgSubmissionRate: "85%"
};

export const attendanceStudents = [
    { id: 1, name: 'Aarav Sharma', rollNo: '001', photo: null },
    { id: 2, name: 'Priya Patel', rollNo: '002', photo: null },
    { id: 3, name: 'Rohan Kumar', rollNo: '003', photo: null },
    { id: 4, name: 'Ananya Singh', rollNo: '004', photo: null },
    { id: 5, name: 'Vikram Reddy', rollNo: '005', photo: null },
    { id: 6, name: 'Ishita Gupta', rollNo: '006', photo: null },
    { id: 7, name: 'Aditya Verma', rollNo: '007', photo: null },
    { id: 8, name: 'Sneha Iyer', rollNo: '008', photo: null },
    { id: 9, name: 'Arjun Nair', rollNo: '009', photo: null },
    { id: 10, name: 'Kavya Menon', rollNo: '010', photo: null },
    { id: 11, name: 'Siddharth Joshi', rollNo: '011', photo: null },
    { id: 12, name: 'Meera Desai', rollNo: '012', photo: null },
];

export const examStats = [
    { label: 'Total Exams', value: '3', color: 'text-gray-900' },
    { label: 'Upcoming', value: '1', color: 'text-purple-600' },
    { label: 'Completed', value: '2', color: 'text-green-600' },
];

export const examClasses = ['All Classes', 'Class 10-A', 'Class 10-B', 'Class 11-A'];

export const teacherExams = [
    {
        id: 1,
        title: 'Mid-Term Exam - Mathematics',
        subject: 'Mathematics',
        class: 'Class 10-A',
        date: 'Dec 20, 2024',
        duration: '3 hours',
        marks: '100 marks',
        status: 'Completed',
        statusColor: 'bg-green-100 text-green-700',
    },
    {
        id: 2,
        title: 'Unit Test - Geometry',
        subject: 'Mathematics',
        class: 'Class 10-B',
        date: 'Dec 18, 2024',
        duration: '1.5 hours',
        marks: '50 marks',
        status: 'Completed',
        statusColor: 'bg-green-100 text-green-700',
    },
    {
        id: 3,
        title: 'Algebra Quiz',
        subject: 'Mathematics',
        class: 'Class 11-A',
        date: 'Dec 25, 2024',
        duration: '1 hour',
        marks: '30 marks',
        status: 'Upcoming',
        statusColor: 'bg-purple-100 text-purple-700',
    },
];

export const teacherClassesData = [
    { id: 1, name: 'Mathematics', section: 'Class 10-A', students: 32, schedule: 'Mon, Wed, Fri - 10:00 AM', location: 'Room 101' },
    { id: 2, name: 'Mathematics', section: 'Class 9-B', students: 28, schedule: 'Tue, Thu - 11:30 AM', location: 'Room 104' },
    { id: 3, name: 'Advanced Algebra', section: 'Class 11-C', students: 25, schedule: 'Mon, Wed - 02:00 PM', location: 'Lab 201' },
    { id: 4, name: 'Geometry', section: 'Class 9-A', students: 30, schedule: 'Fri - 09:00 AM', location: 'Room 102' },
    { id: 5, name: 'Trig and algebra', section: 'Class 9-A', students: 15, schedule: 'Tue, Fri - 12:00 AM', location: 'Room 201' },
];

export const dashboardStats = [
    { label: "Total Students", value: "135", subtext: "Across all classes", iconBgColor: "bg-blue-100", iconColor: "text-blue-600", decorColor: "bg-blue-50" },
    { label: "Classes", value: "3", subtext: "This semester", iconBgColor: "bg-green-100", iconColor: "text-green-600", decorColor: "bg-green-50" },
    { label: "Pending Evaluations", value: "12", subtext: "To review", iconBgColor: "bg-yellow-100", iconColor: "text-yellow-600", decorColor: "bg-yellow-50" },
    { label: "Upcoming Classes", value: "3", subtext: "This week", iconBgColor: "bg-purple-100", iconColor: "text-purple-600", decorColor: "bg-purple-50" }
];

export const dashboardMyClasses = [
    { name: "Grade 10-A", students: "45 students", attendance: "92%", avgScore: "78.5", progress: "92%" },
    { name: "Grade 10-B", students: "42 students", attendance: "94%", avgScore: "82.3", progress: "94%" },
    { name: "Grade 11-A", students: "48 students", attendance: "89%", avgScore: "75.2", progress: "89%" }
];

export const dashboardAssignments = [
    { title: "Chapter 5 - Quadratic Equations", submitted: "38/45", meta: "10-A • Due: Dec 15, 2024", progress: 84.4 },
    { title: "Chapter 6 - Geometry Practice", submitted: "35/42", meta: "10-B • Due: Dec 18, 2024", progress: 83.3 },
    { title: "Advanced Problems - 11-A", submitted: "42/48", meta: "11-A • Due: Dec 20, 2024", progress: 87.5 }
];

export const dashboardUpcomingClasses = [
    { name: "10-A", topic: "Quadratic Equations - Solutions", time: "Today at 10:00 AM", status: "Today" },
    { name: "10-B", topic: "Geometry Basics Review", time: "Tomorrow at 2:00 PM", status: "Scheduled" },
    { name: "11-A", topic: "Calculus - Limits", time: "Dec 13 at 11:00 AM", status: "Scheduled" }
];

export const dashboardPerformanceInsights = {
    classAvgScore: "78.7%",
    overallAttendance: "91.7%",
    assignmentSubmission: "92%"
};
