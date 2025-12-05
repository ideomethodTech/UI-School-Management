"use client";

import { useState } from 'react';
import { Users, BookOpen, ClipboardCheck, CalendarClock, PlusSquare, GraduationCap, Calendar, CheckCircle } from 'lucide-react';
import GradeSubmissionsModal from '../modals/GradeSubmissionsModal';
import CreateAssignmentModal from '../modals/CreateAssignmentModal';
import ScheduleClassModal from '../modals/ScheduleClassModal';
import {
  dashboardStats,
  dashboardMyClasses,
  dashboardAssignments,
  dashboardUpcomingClasses,
  dashboardPerformanceInsights
} from '../../mockData/teacherData';

// Reusable Stat Card Component
const StatCard = ({ label, value, subtext, icon: Icon, iconBgColor, iconColor, decorColor }) => (
  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
    <div className={`absolute top-0 right-0 w-24 h-24 ${decorColor} rounded-bl-full opacity-50`}></div>
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <div className={`p-2 ${iconBgColor} rounded-lg`}>
          <Icon className={`h-5 w-5 ${iconColor}`} size={18} />
        </div>
      </div>
      <p className="text-4xl font-bold text-gray-800 mb-1">{value}</p>
      <p className="text-xs text-gray-500">{subtext}</p>
    </div>
  </div>
);

// My Classes Card
const MyClasses = () => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
    <h3 className="font-bold text-lg text-gray-800 mb-4">My Classes</h3>
    <div className="space-y-4">
      {dashboardMyClasses.map((cls, index) => (
        <div key={index} className="flex justify-between items-center">
          <div>
            <p className="font-semibold text-gray-900">{cls.name}</p>
            <p className="text-sm text-gray-500">{cls.students}</p>
            <p className="text-xs text-gray-500 mt-1">Attendance: {cls.attendance}</p>
          </div>
          <div className="w-1/3 text-right">
            <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Avg: {cls.avgScore}</span>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2"><div className="bg-green-500 h-1.5 rounded-full" style={{ width: cls.progress }}></div></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Assignments Card
const Assignments = () => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
    <h3 className="font-bold text-lg text-gray-800">Assignments</h3>
    <p className="text-sm text-gray-500 mb-4">3 active assignments</p>
    <div className="space-y-4">
      {dashboardAssignments.map((assignment, index) => (
        <div key={index}>
          <div className="flex justify-between items-center mb-1">
            <p className="font-semibold text-gray-900">{assignment.title}</p>
            <p className="text-sm font-semibold text-purple-600">{assignment.submitted}</p>
          </div>
          <p className="text-xs text-gray-500">{assignment.meta}</p>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2"><div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${assignment.progress}%` }}></div></div>
        </div>
      ))}
    </div>
  </div>
);

// Upcoming Classes Card
const UpcomingClasses = () => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
    <h3 className="font-bold text-lg text-gray-800 mb-4">Upcoming Classes</h3>
    <div className="space-y-3">
      {dashboardUpcomingClasses.map((cls, index) => (
        <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
          <div>
            <p className="font-semibold text-gray-800">{cls.name}</p>
            <p className="text-sm text-gray-500">{cls.topic}</p>
            <p className="text-xs text-gray-500">{cls.time}</p>
          </div>
          <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2 py-1 rounded-full">{cls.status}</span>
        </div>
      ))}
    </div>
  </div>
);

// Quick Actions Card
const QuickActions = ({ onCreateAssignment, onGradeSubmissions, onScheduleClass }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
    <h3 className="font-bold text-lg text-gray-800 mb-4">Quick Actions</h3>
    <div className="space-y-3">
      <button
        onClick={onCreateAssignment}
        className="w-full flex items-center gap-3 p-3 text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg border"
      >
        <PlusSquare size={16} /> Create Assignment
      </button>
      <button
        onClick={onGradeSubmissions}
        className="w-full flex items-center gap-3 p-3 text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg border"
      >
        <GraduationCap size={16} /> Grade Submissions
      </button>
      <button
        onClick={onScheduleClass}
        className="w-full flex items-center gap-3 p-3 text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg border"
      >
        <Calendar size={16} /> Schedule Class
      </button>
    </div>
  </div>
);

// Performance Insights Card
const PerformanceInsights = () => (
  <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
    <h3 className="font-bold text-lg text-gray-800 mb-4">Performance Insights</h3>
    <div className="space-y-3 text-sm">
      <div className="flex justify-between"><p className="text-gray-600">Class Avg Score</p><p className="font-semibold text-gray-800">{dashboardPerformanceInsights.classAvgScore}</p></div>
      <div className="flex justify-between"><p className="text-gray-600">Overall Attendance</p><p className="font-semibold text-gray-800">{dashboardPerformanceInsights.overallAttendance}</p></div>
      <div className="flex justify-between"><p className="text-gray-600">Assignment Submission</p><p className="font-semibold text-gray-800">{dashboardPerformanceInsights.assignmentSubmission}</p></div>
    </div>
  </div>
);

// Toast Notification Component
const Toast = ({ message, onClose }) => (
  <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-fade-in-up">
    <CheckCircle size={20} className="text-green-400" />
    <p className="text-sm font-medium">{message}</p>
  </div>
);

export default function TeacherDashboardHome() {
  const icons = [Users, BookOpen, ClipboardCheck, CalendarClock];
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateAssignment = (newAssignment) => {
    // Save to localStorage so it appears in the Assignments page
    const existingStored = JSON.parse(localStorage.getItem('teacher_assignments') || '[]');
    const updatedStored = [newAssignment, ...existingStored];
    localStorage.setItem('teacher_assignments', JSON.stringify(updatedStored));

    showToast('Assignment created successfully!');
  };

  const handleScheduleClass = (scheduledClass) => {
    // Save to localStorage so it appears in the Classes page
    const existingStored = JSON.parse(localStorage.getItem('teacher_scheduled_classes') || '[]');
    const updatedStored = [scheduledClass, ...existingStored];
    localStorage.setItem('teacher_scheduled_classes', JSON.stringify(updatedStored));

    showToast('Class scheduled successfully!');
  };

  return (
    <div className='space-y-6 relative'>
      {/* Toast Notification */}
      {toastMessage && <Toast message={toastMessage} />}

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back, Priya Sharma!</h1>
        <p className="text-sm text-gray-500 mt-1">Subject: Mathematics • 10-A, 10-B, 11-A</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <StatCard
            key={index}
            label={stat.label}
            value={stat.value}
            subtext={stat.subtext}
            icon={icons[index]}
            iconBgColor={stat.iconBgColor}
            iconColor={stat.iconColor}
            decorColor={stat.decorColor}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <MyClasses />
          <Assignments />
          <UpcomingClasses />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <QuickActions
            onCreateAssignment={() => setIsAssignmentModalOpen(true)}
            onGradeSubmissions={() => setIsGradeModalOpen(true)}
            onScheduleClass={() => setIsScheduleModalOpen(true)}
          />
          <PerformanceInsights />
        </div>
      </div>

      {/* Grade Submissions Modal */}
      <GradeSubmissionsModal
        isOpen={isGradeModalOpen}
        onClose={() => setIsGradeModalOpen(false)}
      />

      {/* Create Assignment Modal */}
      <CreateAssignmentModal
        isOpen={isAssignmentModalOpen}
        onClose={() => setIsAssignmentModalOpen(false)}
        onCreate={handleCreateAssignment}
      />

      {/* Schedule Class Modal */}
      <ScheduleClassModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSchedule={handleScheduleClass}
      />
    </div>
  );
}