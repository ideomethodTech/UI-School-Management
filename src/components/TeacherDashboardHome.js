// src/components/TeacherDashboardHome.js
"use client"; // This component will likely have interactive elements

import React from 'react';
import Link from 'next/link'; // <--- ADDED: Import Link from next/link
import { BookOpen, Users, CalendarDays, ClipboardList } from 'lucide-react'; // Example icons
// Removed Pencil from this import as it's not used in this specific component's provided code.
// If you intend to use it, you'd add it back here:
// import { BookOpen, Users, CalendarDays, ClipboardList, Pencil } from 'lucide-react';

// Mock Data for a Teacher Dashboard
const mockTeacherData = {
  name: 'Mrs. Davis',
  totalClasses: 4,
  totalStudents: 120,
  pendingAssignments: 15,
  upcomingLessons: [
    { id: 1, title: 'Algebra II - Chapter 5 Review', class: 'Math 101', date: 'Mon, Nov 13' },
    { id: 2, title: 'Biology - Photosynthesis Lab', class: 'Science 202', date: 'Tue, Nov 14' },
  ],
  recentAnnouncements: [
    { id: 1, text: 'Parent-Teacher Conference Schedule', date: 'Nov 10' },
    { id: 2, text: 'School Holiday on Nov 23rd', date: 'Nov 05' },
  ],
  classOverview: [
    { class: 'Math 101', avgGrade: '88%', attendance: '95%' },
    { class: 'Science 202', avgGrade: '92%', attendance: '92%' },
    { class: 'Math 102', avgGrade: '85%', attendance: '90%' },
  ],
  events: [ // Simplified event list for a teacher
    { date: '13', title: 'Parent-Teacher Meeting' },
    { date: '16', title: 'Field Trip Planning' },
    { date: '23', title: 'Exam Day' },
  ]
};


export default function TeacherDashboardHome() {
  const { name, totalClasses, totalStudents, pendingAssignments, upcomingLessons, recentAnnouncements, classOverview, events } = mockTeacherData;

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold text-gray-800'>Welcome Back, {name}!</h1>

      {/* Quick Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        <div className="card p-5 flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-full text-purple-600">
            <BookOpen size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Total Classes</h3>
            <p className="text-2xl font-bold text-purple-600">{totalClasses}</p>
          </div>
        </div>

        <div className="card p-5 flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-full text-blue-600">
            <Users size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Total Students</h3>
            <p className="text-2xl font-bold text-blue-600">{totalStudents}</p>
          </div>
        </div>

        <div className="card p-5 flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-full text-green-600">
            <ClipboardList size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Pending Assignments</h3>
            <p className="text-2xl font-bold text-green-600">{pendingAssignments}</p>
          </div>
        </div>

        {/* Events Calendar Card (simplified) */}
        <div className="card p-5 col-span-1 lg:col-span-1 flex flex-col justify-between">
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Events This Month (Nov 2025)</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                    {events.map(event => (
                        <li key={event.date} className="flex items-center gap-2">
                            <CalendarDays size={16} className="text-gray-500" />
                            <span><span className="font-medium">{event.date}:</span> {event.title}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <Link href="/dashboard/events" className="text-purple-600 hover:underline text-sm mt-4 block">View All Events</Link>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Upcoming Lessons */}
        <div className='card p-6 lg:col-span-1'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>Upcoming Lessons</h3>
          <ul className='space-y-4'>
            {upcomingLessons.map(lesson => (
              <li key={lesson.id} className='flex flex-col'>
                <div className='flex justify-between items-start'>
                  <span className='font-medium text-gray-900'>{lesson.title}</span>
                  <span className='text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full'>{lesson.class}</span>
                </div>
                <p className='text-sm text-gray-500 mt-1'>{lesson.date}</p>
                <Link href={`/dashboard/lessons/${lesson.id}`} className="text-purple-600 hover:underline text-sm mt-2 block">View Details</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Announcements */}
        <div className='card p-6 lg:col-span-1'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>Recent Announcements</h3>
          <ul className='space-y-4'>
            {recentAnnouncements.map(announcement => (
              <li key={announcement.id} className='flex flex-col'>
                <span className='font-medium text-gray-900'>{announcement.text}</span>
                <p className='text-sm text-gray-500 mt-1'>{announcement.date}</p>
                <Link href="/dashboard/announcements" className="text-purple-600 hover:underline text-sm mt-2 block">Read More</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Classroom Overview Table */}
        <div className='card p-6 lg:col-span-1'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>Classroom Overview</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3">Class</th>
                  <th scope="col" className="px-4 py-3">Avg. Grade</th>
                  <th scope="col" className="px-4 py-3">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {classOverview.map((classData, index) => (
                  <tr key={index} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">{classData.class}</td>
                    <td className="px-4 py-2">{classData.avgGrade}</td>
                    <td className="px-4 py-2">{classData.attendance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link href="/dashboard/classes" className="text-purple-600 hover:underline text-sm mt-4 block">View All Classes</Link>
        </div>

      </div>
    </div>
  );
}