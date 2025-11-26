
"use client";

import { Users, BookOpen, ClipboardCheck, CalendarClock, PlusSquare, GraduationCap, Calendar, UserCheck } from 'lucide-react';

// Reusable Stat Card Component
const StatCard = ({ label, value, subtext, colorClass = 'text-gray-800' }) => (
  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm text-center">
    <p className="text-sm text-gray-500">{label}</p>
    <p className={`text-4xl font-bold mt-1 ${colorClass}`}>{value}</p>
    <p className="text-xs text-gray-500 mt-1">{subtext}</p>
  </div>
);

// My Classes Card
const MyClasses = () => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
    <h3 className="font-bold text-lg text-gray-800 mb-4">My Classes</h3>
    <div className="space-y-4">
      {/* Class Item */}
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-gray-900">Grade 10-A</p>
          <p className="text-sm text-gray-500">45 students</p>
          <p className="text-xs text-gray-500 mt-1">Attendance: 92%</p>
        </div>
        <div className="w-1/3 text-right">
          <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Avg: 78.5</span>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2"><div className="bg-green-500 h-1.5 rounded-full" style={{ width: '92%' }}></div></div>
        </div>
      </div>
      {/* Class Item */}
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-gray-900">Grade 10-B</p>
          <p className="text-sm text-gray-500">42 students</p>
          <p className="text-xs text-gray-500 mt-1">Attendance: 94%</p>
        </div>
        <div className="w-1/3 text-right">
          <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Avg: 82.3</span>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2"><div className="bg-green-500 h-1.5 rounded-full" style={{ width: '94%' }}></div></div>
        </div>
      </div>
      {/* Class Item */}
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-gray-900">Grade 11-A</p>
          <p className="text-sm text-gray-500">48 students</p>
          <p className="text-xs text-gray-500 mt-1">Attendance: 89%</p>
        </div>
        <div className="w-1/3 text-right">
          <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Avg: 75.2</span>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2"><div className="bg-green-500 h-1.5 rounded-full" style={{ width: '89%' }}></div></div>
        </div>
      </div>
    </div>
  </div>
);

// Assignments Card
const Assignments = () => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
    <h3 className="font-bold text-lg text-gray-800">Assignments</h3>
    <p className="text-sm text-gray-500 mb-4">3 active assignments</p>
    <div className="space-y-4">
      {/* Assignment Item */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <p className="font-semibold text-gray-900">Chapter 5 - Quadratic Equations</p>
          <p className="text-sm font-semibold text-purple-600">38/45</p>
        </div>
        <p className="text-xs text-gray-500">10-A • Due: Dec 15, 2024</p>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2"><div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${(38 / 45) * 100}%` }}></div></div>
      </div>
      {/* Assignment Item */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <p className="font-semibold text-gray-900">Chapter 6 - Geometry Practice</p>
          <p className="text-sm font-semibold text-purple-600">35/42</p>
        </div>
        <p className="text-xs text-gray-500">10-B • Due: Dec 18, 2024</p>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2"><div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${(35 / 42) * 100}%` }}></div></div>
      </div>
      {/* Assignment Item */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <p className="font-semibold text-gray-900">Advanced Problems - 11-A</p>
          <p className="text-sm font-semibold text-purple-600">42/48</p>
        </div>
        <p className="text-xs text-gray-500">11-A • Due: Dec 20, 2024</p>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2"><div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${(42 / 48) * 100}%` }}></div></div>
      </div>
    </div>
  </div>
);

// Upcoming Classes Card
const UpcomingClasses = () => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
    <h3 className="font-bold text-lg text-gray-800 mb-4">Upcoming Classes</h3>
    <div className="space-y-3">
      {/* Class Item */}
      <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
        <div>
          <p className="font-semibold text-gray-800">10-A</p>
          <p className="text-sm text-gray-500">Quadratic Equations - Solutions</p>
          <p className="text-xs text-gray-500">Today at 10:00 AM</p>
        </div>
        <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Today</span>
      </div>
      {/* Class Item */}
      <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
        <div>
          <p className="font-semibold text-gray-800">10-B</p>
          <p className="text-sm text-gray-500">Geometry Basics Review</p>
          <p className="text-xs text-gray-500">Tomorrow at 2:00 PM</p>
        </div>
        <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Scheduled</span>
      </div>
      {/* Class Item */}
      <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
        <div>
          <p className="font-semibold text-gray-800">11-A</p>
          <p className="text-sm text-gray-500">Calculus - Limits</p>
          <p className="text-xs text-gray-500">Dec 13 at 11:00 AM</p>
        </div>
        <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Scheduled</span>
      </div>
    </div>
  </div>
);

// Quick Actions Card
const QuickActions = () => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
    <h3 className="font-bold text-lg text-gray-800 mb-4">Quick Actions</h3>
    <div className="space-y-3">
      <button className="w-full flex items-center gap-3 p-3 text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg border"><PlusSquare size={16} /> Create Assignment</button>
      <button className="w-full flex items-center gap-3 p-3 text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg border"><GraduationCap size={16} /> Grade Submissions</button>
      <button className="w-full flex items-center gap-3 p-3 text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg border"><Calendar size={16} /> Schedule Class</button>
      <button className="w-full flex items-center gap-3 p-3 text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg border"><UserCheck size={16} /> Take Attendance</button>
    </div>
  </div>
);

// Performance Insights Card
const PerformanceInsights = () => (
  <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
    <h3 className="font-bold text-lg text-gray-800 mb-4">Performance Insights</h3>
    <div className="space-y-3 text-sm">
      <div className="flex justify-between"><p className="text-gray-600">Class Avg Score</p><p className="font-semibold text-gray-800">78.7%</p></div>
      <div className="flex justify-between"><p className="text-gray-600">Overall Attendance</p><p className="font-semibold text-gray-800">91.7%</p></div>
      <div className="flex justify-between"><p className="text-gray-600">Assignment Submission</p><p className="font-semibold text-gray-800">92%</p></div>
    </div>
  </div>
);


export default function TeacherDashboardHome() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back, Priya Sharma!</h1>
        <p className="text-sm text-gray-500 mt-1">Subject: Mathematics • 10-A, 10-B, 11-A</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Students" value="135" subtext="Across all classes" />
        <StatCard label="Classes" value="3" subtext="This semester" colorClass="text-green-600" />
        <StatCard label="Pending Evaluations" value="12" subtext="To review" colorClass="text-yellow-600" />
        <StatCard label="Upcoming Classes" value="3" subtext="This week" colorClass="text-blue-600" />
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
          <QuickActions />
          <PerformanceInsights />
        </div>
      </div>
    </div>
  );
}