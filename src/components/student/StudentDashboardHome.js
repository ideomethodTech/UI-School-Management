// src/components/StudentDashboardHome.js
import { useState } from 'react';
import { CalendarDays, X, ArrowRight, BookOpen, FileText, Download, Clock, MapPin, Calendar, GraduationCap, UserCheck, CalendarClock } from 'lucide-react';
import { allAssignmentsData, allExamsData, courseMaterialsData, attendanceData } from '../../mockData/studentData';

// --- MODAL & DATA for ASSIGNMENTS ---

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

const StatCard = ({ title, value, subtitle, icon: Icon, iconBgColor, iconColor, decorColor }) => (
  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
    <div className={`absolute top-0 right-0 w-24 h-24 ${decorColor} rounded-bl-full opacity-50`}></div>
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <div className={`p-2 ${iconBgColor} rounded-lg`}>
          <Icon className={`h-5 w-5 ${iconColor}`} size={18} />
        </div>
      </div>
      <p className="text-4xl font-bold text-gray-800 mb-1">{value}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
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
      {courseMaterialsData.map((material) => (
        <div key={material.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-3"><FileText size={20} className="text-purple-600" /><div><p className="font-medium text-sm">{material.title}</p><p className="text-xs text-gray-500">{material.subject}</p></div></div>
          <button className="p-2 text-gray-500 hover:text-purple-600"><Download size={18} /></button>
        </div>
      ))}
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
        <StatCard title="Overall Grade" value="A" subtitle="Based on assessments" icon={GraduationCap} iconBgColor="bg-purple-100" iconColor="text-purple-600" decorColor="bg-purple-50" />
        <StatCard title="Attendance" value="94%" subtitle="This month" icon={UserCheck} iconBgColor="bg-green-100" iconColor="text-green-600" decorColor="bg-green-50" />
        <StatCard title="Assignments" value="3" subtitle="Pending" icon={FileText} iconBgColor="bg-yellow-100" iconColor="text-yellow-600" decorColor="bg-yellow-50" />
        <StatCard title="Upcoming Exams" value="3" subtitle="This month" icon={CalendarClock} iconBgColor="bg-blue-100" iconColor="text-blue-600" decorColor="bg-blue-50" />
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
              {attendanceData.map((data, index) => (
                <AttendanceBar key={index} month={data.month} days={data.days} percentage={data.percentage} />
              ))}
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