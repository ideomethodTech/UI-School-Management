import { useState } from 'react';
import { Search, Filter, Download, TrendingUp, TrendingDown, Medal, Users, BookOpen, BarChart3 } from 'lucide-react';

// Mock class data
const mockClasses = [
    { id: 1, name: 'Mathematics - Class 10-A', students: 32 },
    { id: 2, name: 'Mathematics - Class 9-B', students: 28 },
    { id: 3, name: 'Advanced Algebra - Class 11-C', students: 25 },
    { id: 4, name: 'Geometry - Class 9-A', students: 30 },
];

// Mock student results data
const mockStudentResults = [
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

const StatCard = ({ icon: Icon, label, value, subtext, color, bgColor }) => (
    <div className={`${bgColor} p-5 rounded-lg border border-gray-200`}>
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm text-gray-600 mb-1">{label}</p>
                <p className={`text-3xl font-bold ${color} mb-1`}>{value}</p>
                {subtext && <p className="text-xs text-gray-500">{subtext}</p>}
            </div>
            <div className={`${color} bg-opacity-10 p-3 rounded-lg`}>
                <Icon size={24} className={color} />
            </div>
        </div>
    </div>
);

const GradeDistributionBar = ({ grade, count, percentage, color }) => (
    <div className="flex items-center gap-3">
        <div className="w-12 text-sm font-semibold text-gray-700">{grade}</div>
        <div className="flex-1">
            <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                <div
                    className={`h-full ${color} flex items-center px-3 text-white text-sm font-medium transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                >
                    {percentage > 15 && `${count} students`}
                </div>
            </div>
        </div>
        <div className="w-16 text-sm text-gray-600 text-right">{percentage}%</div>
    </div>
);

const StudentResultRow = ({ student }) => {
    const getTrendIcon = () => {
        if (student.trend === 'up') {
            return <TrendingUp size={16} className="text-green-500" />;
        }
        return <TrendingDown size={16} className="text-red-500" />;
    };

    const getGradeColor = (grade) => {
        if (grade === 'A+') return 'bg-green-100 text-green-700 border-green-300';
        if (grade === 'A') return 'bg-gray-100 text-gray-700 border-gray-300';
        if (grade === 'B') return 'bg-gray-100 text-gray-700 border-gray-300';
        if (grade === 'C') return 'bg-red-100 text-red-700 border-red-300';
        return 'bg-gray-100 text-gray-700 border-gray-300';
    };

    return (
        <tr className="hover:bg-purple-50 transition-colors">
            <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                        {student.name.charAt(0)}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800">{student.name}</p>
                        <p className="text-xs text-gray-500">Roll: {student.rollNo}</p>
                    </div>
                </div>
            </td>
            <td className="px-4 py-4 text-center text-gray-700">{student.midterm}%</td>
            <td className="px-4 py-4 text-center text-gray-700">{student.final}%</td>
            <td className="px-4 py-4 text-center text-gray-700">{student.assignments}%</td>
            <td className="px-4 py-4 text-center">
                <div className="flex items-center justify-center gap-2">
                    <span className="font-bold text-gray-800">{student.overall}%</span>
                    {getTrendIcon()}
                </div>
            </td>
            <td className="px-4 py-4 text-center">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getGradeColor(student.grade)}`}>
                    {student.grade}
                </span>
            </td>
        </tr>
    );
};

export default function TeacherResultsPage() {
    const [selectedClass, setSelectedClass] = useState(mockClasses[0].id);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterGrade, setFilterGrade] = useState('all');

    // Calculate statistics
    const classAverage = Math.round(
        mockStudentResults.reduce((sum, s) => sum + s.overall, 0) / mockStudentResults.length
    );
    const topPerformer = mockStudentResults.reduce((max, s) => (s.overall > max.overall ? s : max));
    const passingStudents = mockStudentResults.filter(s => s.overall >= 60).length;
    const passingRate = Math.round((passingStudents / mockStudentResults.length) * 100);

    // Grade distribution
    const gradeDistribution = {
        'A+': mockStudentResults.filter(s => s.grade === 'A+').length,
        'A': mockStudentResults.filter(s => s.grade === 'A').length,
        'B': mockStudentResults.filter(s => s.grade === 'B').length,
        'C': mockStudentResults.filter(s => s.grade === 'C').length,
        'D': mockStudentResults.filter(s => s.grade === 'D').length,
    };

    // Filter students
    const filteredStudents = mockStudentResults.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.rollNo.includes(searchQuery);
        const matchesGrade = filterGrade === 'all' || student.grade === filterGrade;
        return matchesSearch && matchesGrade;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Student Results</h1>
                    <p className="text-sm text-gray-500 mt-1">View and analyze student performance</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg">
                    <Download size={20} />
                    Export Report
                </button>
            </div>

            {/* Class Selection */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Class
                </label>
                <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(Number(e.target.value))}
                    className="w-full md:w-96 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                    {mockClasses.map(cls => (
                        <option key={cls.id} value={cls.id}>
                            {cls.name} ({cls.students} students)
                        </option>
                    ))}
                </select>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    icon={Users}
                    label="Total Students"
                    value={mockStudentResults.length}
                    color="text-blue-600"
                    bgColor="bg-blue-50"
                />
                <StatCard
                    icon={BarChart3}
                    label="Class Average"
                    value={`${classAverage}%`}
                    subtext="Overall performance"
                    color="text-purple-600"
                    bgColor="bg-purple-50"
                />
                <StatCard
                    icon={Medal}
                    label="Top Performer"
                    value={topPerformer.name.split(' ')[0]}
                    subtext={`${topPerformer.overall}% - ${topPerformer.grade}`}
                    color="text-yellow-600"
                    bgColor="bg-yellow-50"
                />
                <StatCard
                    icon={TrendingUp}
                    label="Passing Rate"
                    value={`${passingRate}%`}
                    subtext={`${passingStudents}/${mockStudentResults.length} students`}
                    color="text-green-600"
                    bgColor="bg-green-50"
                />
            </div>

            {/* Grade Distribution */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <BookOpen size={20} className="text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-800">Grade Distribution</h3>
                </div>
                <div className="space-y-3">
                    <GradeDistributionBar
                        grade="A+"
                        count={gradeDistribution['A+']}
                        percentage={Math.round((gradeDistribution['A+'] / mockStudentResults.length) * 100)}
                        color="bg-green-500"
                    />
                    <GradeDistributionBar
                        grade="A"
                        count={gradeDistribution['A']}
                        percentage={Math.round((gradeDistribution['A'] / mockStudentResults.length) * 100)}
                        color="bg-gray-400"
                    />
                    <GradeDistributionBar
                        grade="B"
                        count={gradeDistribution['B']}
                        percentage={Math.round((gradeDistribution['B'] / mockStudentResults.length) * 100)}
                        color="bg-gray-400"
                    />
                    <GradeDistributionBar
                        grade="C"
                        count={gradeDistribution['C']}
                        percentage={Math.round((gradeDistribution['C'] / mockStudentResults.length) * 100)}
                        color="bg-red-500"
                    />
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-wrap gap-3 items-center">
                <div className="relative flex-1 min-w-[250px]">
                    <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or roll number..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter size={20} className="text-gray-500" />
                    <select
                        value={filterGrade}
                        onChange={(e) => setFilterGrade(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                        <option value="all">All Grades</option>
                        <option value="A+">A+</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>
                </div>
            </div>

            {/* Results Table */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-purple-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">Student</th>
                                <th className="px-4 py-4 text-center text-sm font-semibold text-gray-700">Midterm</th>
                                <th className="px-4 py-4 text-center text-sm font-semibold text-gray-700">Final</th>
                                <th className="px-4 py-4 text-center text-sm font-semibold text-gray-700">Assignments</th>
                                <th className="px-4 py-4 text-center text-sm font-semibold text-gray-700">Overall</th>
                                <th className="px-4 py-4 text-center text-sm font-semibold text-gray-700">Grade</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredStudents.map(student => (
                                <StudentResultRow key={student.id} student={student} />
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredStudents.length === 0 && (
                    <div className="text-center py-12 bg-gray-50">
                        <Users size={48} className="mx-auto text-gray-400 mb-3" />
                        <p className="text-gray-600">No students found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
