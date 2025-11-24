// src/components/StudentExamsPage.js
import { CalendarClock, TrendingUp } from 'lucide-react';

// Mock Data
const upcomingExamsData = [
    { id: 1, title: 'Mid-Term Exam', subject: 'English', date: 'Dec 22, 2024', time: '02:00 PM', duration: '3 hours', totalMarks: 80 },
    { id: 2, title: 'Science Practical', subject: 'Science', date: 'Dec 25, 2024', time: '11:00 AM', duration: '2 hours', totalMarks: 50 },
];

const completedExamsData = [
    { id: 1, title: 'Mid-Term Exam', subject: 'Mathematics', date: 'Dec 20, 2024', score: 85, maxMarks: 100, grade: 'A+' },
    { id: 2, title: 'Unit Test - Geometry', subject: 'Mathematics', date: 'Dec 18, 2024', score: 42, maxMarks: 50, grade: 'A' },
];

// Reusable Stat Card Component
const StatCard = ({ label, value, colorClass = 'text-gray-800' }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
        <p className="text-sm text-gray-500">{label}</p>
        <p className={`text-3xl font-bold ${colorClass}`}>{value}</p>
    </div>
);

// CORRECTED Component for a single upcoming exam
const UpcomingExamItem = ({ exam }) => (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="font-bold text-lg text-gray-800">{exam.title}</h3>
                <p className="text-sm text-gray-600">{exam.subject}</p>
            </div>
            <span className="bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">UPCOMING</span>
        </div>
        <div className="border-t border-gray-200 my-3"></div>
        <div className="flex justify-between text-sm">
            <div>
                <p className="text-gray-500">Date & Time</p>
                <p className="font-semibold text-gray-700">{exam.date}</p>
                <p className="font-semibold text-gray-700">{exam.time}</p>
            </div>
            <div>
                <p className="text-gray-500">Duration & Marks</p>
                <p className="font-semibold text-gray-700">{exam.duration}</p>
                <p className="font-semibold text-gray-700">Total: {exam.totalMarks} marks</p>
            </div>
        </div>
    </div>
);

// CORRECTED Component for a single exam result
const ExamResultItem = ({ result }) => {
    const percentage = Math.round((result.score / result.maxMarks) * 100);
    return (
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-lg text-gray-800">{result.title}</h3>
                    <p className="text-sm text-gray-500">{result.subject} • {result.date}</p>
                </div>
                <div className="text-right">
                    <p className="text-3xl font-bold text-gray-800">{result.score}</p>
                    <p className="text-sm text-gray-500">out of {result.maxMarks}</p>
                </div>
            </div>
            <div className="border-t border-gray-200 my-3"></div>
            <div className="flex justify-between items-center text-sm">
                <p className="font-semibold text-gray-700">{percentage}% Score</p>
                <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                </div>
                <p className="font-semibold text-green-600">Grade {result.grade}</p>
            </div>
        </div>
    );
};


export default function StudentExamsPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">My Exams</h1>
                <p className="text-sm text-gray-500 mt-1">Class 10-A • Track your exam schedule and results</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatCard label="Total Exams" value={upcomingExamsData.length + completedExamsData.length} />
                <StatCard label="Upcoming" value={upcomingExamsData.length} colorClass="text-purple-600" />
                <StatCard label="Completed" value={completedExamsData.length} colorClass="text-green-600" />
                <StatCard label="Avg Score" value="85%" colorClass="text-blue-600" />
            </div>

            {/* Upcoming Exams Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <CalendarClock className="text-purple-600" />
                    <h2 className="text-xl font-bold text-gray-800">Upcoming Exams</h2>
                    <span className="bg-purple-100 text-purple-700 text-sm font-semibold px-2.5 py-0.5 rounded-full">{upcomingExamsData.length}</span>
                </div>
                {upcomingExamsData.map(exam => <UpcomingExamItem key={exam.id} exam={exam} />)}
            </div>

            {/* Exam Results Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <TrendingUp className="text-green-600" />
                    <h2 className="text-xl font-bold text-gray-800">Exam Results</h2>
                    <span className="bg-green-100 text-green-700 text-sm font-semibold px-2.5 py-0.5 rounded-full">{completedExamsData.length}</span>
                </div>
                {completedExamsData.map(result => <ExamResultItem key={result.id} result={result} />)}
            </div>
        </div>
    );
}