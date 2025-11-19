// src/components/ParentDashboardHome.js
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // For child's avatar
import { BookOpen, CalendarDays, ClipboardList, CheckCircle, XCircle } from 'lucide-react'; // Icons

// Mock Data for a Parent Dashboard
const mockParentData = {
  parentName: 'Mr./Mrs. Johnson',
  child: {
    name: 'Emily Johnson',
    studentId: 'STU12345',
    grade: 'Grade 9',
    class: 'Class 9A',
    homeroomTeacher: 'Mrs. Davis',
    avatar: 'https://i.pravatar.cc/150?img=47', // Example avatar
  },
  attendancePercentage: 92,
  absencesThisSemester: 5,
  upcomingAssignments: [
    { id: 1, title: 'Math Homework: Algebra II', dueDate: 'Fri, Nov 17', status: 'pending' },
    { id: 2, title: 'Science Project: Photosynthesis', dueDate: 'Wed, Nov 22', status: 'pending' },
    { id: 3, title: 'English Essay: Literary Analysis', dueDate: 'Mon, Nov 27', status: 'pending' },
  ],
  recentGrades: [
    { id: 1, subject: 'Math', grade: 'A-', icon: BookOpen },
    { id: 2, subject: 'English', grade: 'B+', icon: BookOpen },
    { id: 3, subject: 'Science', grade: 'A', icon: BookOpen },
  ],
  recentAnnouncements: [
    { id: 1, text: 'Parent-Teacher Conference Schedule Released', date: 'Nov 10' },
    { id: 2, text: 'School Holiday on Nov 23rd', date: 'Nov 05' },
    { id: 3, text: 'Annual School Fair on Dec 15th', date: 'Nov 01' },
  ],
  schoolEvents: [
    { date: '13', title: 'PTA Meeting' },
    { date: '16', title: 'Museum Trip (Grade 9)' },
    { date: '23', title: 'Sports Day' },
    { date: '25', title: 'Exam Day' },
  ]
};

export default function ParentDashboardHome() {
  const {
    parentName,
    child,
    attendancePercentage,
    absencesThisSemester,
    upcomingAssignments,
    recentGrades,
    recentAnnouncements,
    schoolEvents
  } = mockParentData;

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold text-gray-800'>Welcome Back, {parentName}!</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>

        {/* Child's Profile Card */}
        <div className="card p-5 flex items-center gap-4 col-span-2">
          <Image
            src={child.avatar}
            alt={child.name}
            width={80}
            height={80}
            className="rounded-full object-cover border-2 border-purple-200"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{child.name}</h3>
            <p className="text-sm text-gray-600">Student ID: {child.studentId}</p>
            <p className="text-sm text-gray-600">{child.grade} - {child.class}</p>
            <p className="text-sm text-gray-500">Homeroom: {child.homeroomTeacher}</p>
          </div>
        </div>

        {/* Attendance Overview */}
        <div className="card p-5 col-span-1 flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Attendance Overview</h3>
          <p className="text-4xl font-bold text-green-600">{attendancePercentage}%</p>
          <p className="text-sm text-gray-500 mt-1">{absencesThisSemester} absences this semester</p>
          <Link href="/dashboard/attendance" className="text-purple-600 hover:underline text-sm mt-3 block">View Details</Link>
        </div>

        {/* Recent Announcements */}
        <div className='card p-5 col-span-1'>
          <h3 className='text-lg font-semibold text-gray-800 mb-3'>Recent Announcements</h3>
          <ul className='space-y-2 text-sm text-gray-700'>
            {recentAnnouncements.slice(0, 3).map(announcement => ( // Show top 3
              <li key={announcement.id} className='flex items-center gap-2'>
                <CalendarDays size={16} className="text-gray-500" />
                <span><span className="font-medium">{announcement.date}:</span> {announcement.text}</span>
              </li>
            ))}
          </ul>
          <Link href="/dashboard/announcements" className="text-purple-600 hover:underline text-sm mt-3 block">View All</Link>
        </div>

      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>

        {/* Academic Snapshot: Recent Grades */}
        <div className='card p-6 lg:col-span-1'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>Academic Snapshot: Recent Grades</h3>
          <ul className='space-y-3'>
            {recentGrades.map(grade => (
              <li key={grade.id} className='flex items-center gap-3'>
                <div className='p-2 bg-blue-50 text-blue-600 rounded-md'>
                  <grade.icon size={18} />
                </div>
                <div>
                  <span className='font-medium text-gray-900'>{grade.subject}</span>
                  <span className='ml-2 text-lg font-bold text-purple-600'>{grade.grade}</span>
                </div>
              </li>
            ))}
          </ul>
          <Link href={`/dashboard/students/${child.studentId}/results`} className="text-purple-600 hover:underline text-sm mt-4 block">View Full Report</Link>
        </div>

        {/* Upcoming Assignments */}
        <div className='card p-6 lg:col-span-1'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>Upcoming Assignments</h3>
          <ul className='space-y-4'>
            {upcomingAssignments.map(assignment => (
              <li key={assignment.id} className='flex flex-col'>
                <div className='flex justify-between items-start'>
                  <span className='font-medium text-gray-900'>{assignment.title}</span>
                  <span className='text-xs font-semibold bg-red-100 text-red-800 px-2 py-1 rounded-full'>Due {assignment.dueDate.split(', ')[1]}</span>
                </div>
                <p className='text-sm text-gray-500 mt-1'>Due Date: {assignment.dueDate}</p>
                <Link href={`/dashboard/assignments/${assignment.id}`} className="text-purple-600 hover:underline text-sm mt-2 block">View Details</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* School Events Calendar (simplified) */}
        <div className='card p-6 lg:col-span-1'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>School Events (Nov 2025)</h3>
          <ul className='space-y-3 text-sm text-gray-700'>
            {schoolEvents.map(event => (
              <li key={event.date} className='flex items-center gap-2'>
                <CalendarDays size={18} className="text-gray-500" />
                <span><span className="font-medium">Nov {event.date}:</span> {event.title}</span>
              </li>
            ))}
          </ul>
          <Link href="/dashboard/events" className="text-purple-600 hover:underline text-sm mt-4 block">View All Events</Link>
        </div>

      </div>
    </div>
  );
}