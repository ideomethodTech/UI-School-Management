// src/components/StudentDashboardHome.js
import { useState } from 'react';
import { CalendarDays, X, ArrowRight, BookOpen, FileText, Download, Clock, MapPin, Calendar } from 'lucide-react';

// --- MODAL & DATA for ASSIGNMENTS ---

const allAssignmentsData = [
  { id: 1, title: 'Mathematics Chapter 5 Exercise', subject: 'Mathematics', dueDate: 'Due: Dec 15, 2024', status: 'Pending' },
  { id: 2, title: 'English Essay on Climate Change', subject: 'English', dueDate: 'Due: Dec 18, 2024', status: 'Pending' },
  { id: 3, title: 'Science Project - Solar System', subject: 'Science', dueDate: 'Due: Dec 20, 2024', status: 'Pending' },
  { id: 4, title: 'History Assignment - Indian Independence', subject: 'History', dueDate: 'Due: Dec 12, 2024', status: 'Urgent' },
];

const AllAssignmentsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const getStatusClass = (status) => status === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-800';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-800">All Assignments</h2>
            <p className="text-sm text-gray-500">Complete list of assignments</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-gray-100"><X size={24} /></button>
        </div>
        <div className="p-5 overflow-y-auto space-y-4">
          {allAssignmentsData.map(assignment => (
            <div key={assignment.id} className={`p-4 rounded-lg border ${assignment.status === 'Urgent' ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                  <p className="text-sm text-gray-600">{assignment.subject}</p>
                  <p className="text-xs text-gray-500 mt-1">{assignment.dueDate}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusClass(assignment.status)}`}>{assignment.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- MODAL & DATA for EXAMS ---

const allExamsData = [
  { id: 1, subject: 'Mathematics', date: 'Dec 25, 2024', time: '10:00 AM - 1:00 PM', room: 'Lab-5', duration: '3 hours' },
  { id: 2, subject: 'English', date: 'Dec 27, 2024', time: '2:00 PM - 4:30 PM', room: 'Classroom-10', duration: '2.5 hours' },
  { id: 3, subject: 'Science', date: 'Dec 29, 2024', time: '10:00 AM - 1:00 PM', room: 'Lab-3', duration: '3 hours' },
];

const AllExamsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Exam Schedule</h2>
            <p className="text-sm text-gray-500">Complete list of upcoming exams</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-gray-100"><X size={24} /></button>
        </div>
        <div className="p-5 overflow-y-auto space-y-4">
          {allExamsData.map(exam => (
            <div key={exam.id} className="p-4 rounded-lg border bg-white border-gray-200">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-900">{exam.subject}</h3>
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-100 text-blue-800">{exam.duration}</span>
              </div>
              <div className="mt-2 space-y-1.5 text-sm text-gray-600">
                <div className="flex items-center gap-2"><Calendar size={14} className="text-gray-400" /><span>{exam.date}</span></div>
                <div className="flex items-center gap-2"><Clock size={14} className="text-gray-400" /><span>{exam.time}</span></div>
                <div className="flex items-center gap-2"><MapPin size={14} className="text-gray-400" /><span>Room: {exam.room}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


// --- DASHBOARD CARD COMPONENTS ---

const StatCard = ({ title, value, subtitle, colorClass }) => (
  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-3xl font-bold mt-1 text-gray-800">{value}</p>
    <p className={`text-xs font-medium mt-1 ${colorClass}`}>{subtitle}</p>
  </div>
);

const UpcomingAssignments = ({ onViewAllClick }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
    <div className="flex justify-between items-center mb-4">
      <div>
        <h3 className="font-semibold text-gray-800">Upcoming Assignments</h3>
        <p className="text-sm text-gray-500">4 assignments</p>
      </div>
      <a href="#" onClick={(e) => { e.preventDefault(); onViewAllClick(); }} className="flex items-center gap-1 text-sm font-semibold text-purple-600 hover:text-purple-800 flex-shrink-0">
        View All <ArrowRight size={14} />
      </a>
    </div>
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
        <div><p className="font-medium text-gray-800">Mathematics Chapter 5 Exercise</p><p className="text-xs text-gray-500">Mathematics</p></div>
        <span className="text-xs font-semibold bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">3 days</span>
      </div>
      <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
        <div><p className="font-medium text-gray-800">English Essay on Climate Change</p><p className="text-xs text-gray-500">English</p></div>
        <span className="text-xs font-semibold bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">6 days</span>
      </div>
      <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
        <div><p className="font-medium text-gray-800">Science Project - Solar System</p><p className="text-xs text-gray-500">Science</p></div>
        <span className="text-xs font-semibold bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">8 days</span>
      </div>
    </div>
  </div>
);

const ExamSchedule = ({ onViewAllClick }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-full flex flex-col">
    <div className="flex justify-between items-center mb-4">
      <div>
        <h3 className="font-semibold text-gray-800">Upcoming Exam Schedule</h3>
        <p className="text-sm text-gray-500">3 upcoming exams</p>
      </div>
      <a href="#" onClick={(e) => { e.preventDefault(); onViewAllClick(); }} className="flex items-center gap-1 text-sm font-semibold text-purple-600 hover:text-purple-800 flex-shrink-0">
        View All <ArrowRight size={14} />
      </a>
    </div>
    <div className="space-y-4 flex-grow">
      {allExamsData.slice(0, 3).map(exam => (
        <div key={exam.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
          <div><p className="font-medium text-gray-800">{exam.subject}</p><p className="text-xs text-gray-500">{exam.date} • {exam.time}</p></div>
          <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{`Room ${exam.room.split('-')[1]}`}</span>
        </div>
      ))}
    </div>
  </div>
);

const AttendanceBar = ({ month, days, percentage }) => (
  <div>
    <div className="flex justify-between items-end mb-1"><p className="font-medium text-sm text-gray-800">{month}</p><p className="text-xs text-gray-500">{days}</p></div>
    <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div></div>
    <p className="text-right text-xs font-medium text-gray-500 mt-1">{percentage}%</p>
  </div>
);

const CourseMaterials = () => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-full">
    <div className="flex items-center gap-3 mb-4"><BookOpen className="text-gray-500" size={20} /><h3 className="font-semibold text-gray-800">Course Materials</h3></div>
    <div className="space-y-3">
      <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
        <div className="flex items-center gap-3"><FileText size={20} className="text-purple-600" /><div><p className="font-medium text-sm">Quadratic Equations PDF</p><p className="text-xs text-gray-500">Mathematics</p></div></div>
        <button className="p-2 text-gray-500 hover:text-purple-600"><Download size={18} /></button>
      </div>
      <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
        <div className="flex items-center gap-3"><FileText size={20} className="text-purple-600" /><div><p className="font-medium text-sm">Shakespeare Literature</p><p className="text-xs text-gray-500">English</p></div></div>
        <button className="p-2 text-gray-500 hover:text-purple-600"><Download size={18} /></button>
      </div>
      <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
        <div className="flex items-center gap-3"><FileText size={20} className="text-purple-600" /><div><p className="font-medium text-sm">Physics Practicals</p><p className="text-xs text-gray-500">Science</p></div></div>
        <button className="p-2 text-gray-500 hover:text-purple-600"><Download size={18} /></button>
      </div>
      <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
        <div className="flex items-center gap-3"><FileText size={20} className="text-purple-600" /><div><p className="font-medium text-sm">Modern India Notes</p><p className="text-xs text-gray-500">History</p></div></div>
        <button className="p-2 text-gray-500 hover:text-purple-600"><Download size={18} /></button>
      </div>
    </div>
  </div>
);


// --- MAIN DASHBOARD COMPONENT ---

export default function StudentDashboardHome() {
  const [isAssignmentsModalOpen, setAssignmentsModalOpen] = useState(false);
  const [isExamsModalOpen, setExamsModalOpen] = useState(false);

  return (
    <div className='space-y-6'>
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back, John Smith!</h1>
        <p className="text-sm text-gray-500 mt-1">Class 10-A • Roll No. 10A-045</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Overall Grade" value="A" subtitle="Based on assessments" colorClass="text-green-600" />
        <StatCard title="Attendance" value="94%" subtitle="This month" colorClass="text-green-600" />
        <StatCard title="Assignments" value="3" subtitle="Pending" colorClass="text-yellow-600" />
        <StatCard title="Upcoming Exams" value="3" subtitle="This month" colorClass="text-blue-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <UpcomingAssignments onViewAllClick={() => setAssignmentsModalOpen(true)} />
          <ExamSchedule onViewAllClick={() => setExamsModalOpen(true)} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4"><CalendarDays className="text-gray-500" size={20} /><h3 className="font-semibold text-gray-800">Attendance</h3></div>
            <div className="space-y-5">
              <AttendanceBar month="October" days="22/25 days" percentage={88} />
              <AttendanceBar month="November" days="24/25 days" percentage={96} />
              <AttendanceBar month="December" days="10/12 days" percentage={83} />
            </div>
          </div>
          <CourseMaterials />
        </div>
      </div>

      {/* Modals */}
      <AllAssignmentsModal isOpen={isAssignmentsModalOpen} onClose={() => setAssignmentsModalOpen(false)} />
      <AllExamsModal isOpen={isExamsModalOpen} onClose={() => setExamsModalOpen(false)} />
    </div>
  );
}