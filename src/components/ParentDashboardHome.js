// src/components/ParentDashboardHome.js
"use client";

import React from 'react';
import Link from 'next/link';
import { User, Calendar, DollarSign, Phone, ArrowRight } from 'lucide-react';

// Mock Data for Parent Dashboard
const mockParentData = {
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

export default function ParentDashboardHome() {
  const { parentName, child, alerts, academicPerformance, upcomingEvents, feeStatus, quickContacts, attendance } = mockParentData;

  return (
    <div className='p-1 space-y-4'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold text-gray-800'>Welcome Back, {parentName}!</h1>
        <p className='text-gray-600 mt-1'>Your child: {child.name} • {child.class}</p>
      </div>

      {/* Alert Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {alerts.map(alert => (
          <div key={alert.id} className={`card p-4 border-l-4 ${alert.borderColor} ${alert.bgColor}`}>
            <h3 className='font-semibold text-gray-800 mb-1'>{alert.title}</h3>
            <p className='text-sm text-gray-600'>{alert.message}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>

        {/* Left Column - Academic Performance (Spans 2 columns) */}
        <div className='lg:col-span-2 space-y-6'>

          {/* Academic Performance */}
          <div className='card p-6 relative'>
            <Link
              href="/dashboard/performance"
              className="absolute top-5 right-5 text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1 transition-colors"
            >
              View All <ArrowRight size={16} />
            </Link>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-xl font-bold text-gray-800'>Academic Performance</h2>
            </div>
            <div className='space-y-4'>
              {academicPerformance.map(subject => (
                <div key={subject.id} className={`p-4 rounded-lg ${subject.id === 5 ? 'bg-purple-50' : 'bg-white'}`}>
                  <div className='flex items-center justify-between mb-2'>
                    <h3 className='font-semibold text-gray-800'>{subject.subject}</h3>
                    <div className='flex items-center gap-4'>
                      <span className='text-sm text-gray-500'>Previous: {subject.previous}</span>
                      <span className='text-green-600 text-sm'>↑ {subject.change}</span>
                      <span className='text-2xl font-bold text-gray-800'>{subject.score}</span>
                    </div>
                  </div>
                  <div className='h-2 bg-gray-200 rounded-full overflow-hidden'>
                    <div
                      className='h-full bg-green-500 rounded-full transition-all duration-500'
                      style={{ width: `${subject.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance Overview */}
          <div className='card p-6'>
            <h2 className='text-xl font-bold text-gray-800 mb-6'>Attendance Overview</h2>
            <div className='space-y-6'>
              {attendance.map(month => (
                <div key={month.id}>
                  <div className='flex items-center justify-between mb-2'>
                    <h3 className='font-semibold text-gray-800'>{month.month}</h3>
                    <span className='text-green-600 font-bold'>{month.percentage}%</span>
                  </div>
                  <p className='text-sm text-gray-500 mb-2'>{month.days}</p>
                  <div className='h-2 bg-gray-200 rounded-full overflow-hidden'>
                    <div
                      className='h-full bg-green-500 rounded-full transition-all duration-500'
                      style={{ width: `${month.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Info Cards */}
        <div className='space-y-6'>

          {/* Student Info */}
          <div className='card p-6 bg-purple-50'>
            <div className='flex items-center gap-2 mb-4'>
              <User size={20} className='text-gray-700' />
              <h2 className='text-lg font-bold text-gray-800'>Student Info</h2>
            </div>
            <div className='space-y-3'>
              <div>
                <p className='text-xs text-gray-500 uppercase tracking-wider mb-1'>NAME</p>
                <p className='font-semibold text-gray-800'>{child.name}</p>
              </div>
              <div>
                <p className='text-xs text-gray-500 uppercase tracking-wider mb-1'>CLASS</p>
                <p className='font-semibold text-gray-800'>{child.class}</p>
              </div>
              <div>
                <p className='text-xs text-gray-500 uppercase tracking-wider mb-1'>ROLL NUMBER</p>
                <p className='font-semibold text-gray-800'>{child.rollNumber}</p>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className='card p-6'>
            <div className='flex items-center gap-2 mb-4'>
              <Calendar size={20} className='text-gray-700' />
              <h2 className='text-lg font-bold text-gray-800'>Upcoming Events</h2>
            </div>
            <div className='space-y-4'>
              {upcomingEvents.map(event => (
                <div key={event.id} className='border-b border-gray-100 last:border-0 pb-3 last:pb-0'>
                  <h3 className='font-semibold text-gray-800 text-sm'>{event.title}</h3>
                  <p className='text-xs text-gray-500 mt-1'>{event.date}</p>
                  <p className='text-xs text-gray-500'>{event.time} • {event.location}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Fee Status */}
          <div className='card p-6 relative'>
            <Link
              href="/dashboard/fee-status"
              className="absolute top-5 right-5 text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1 transition-colors"
            >
              View Fee Details <ArrowRight size={16} />
            </Link>
            <div className='flex items-center gap-2 mb-4'>
              <DollarSign size={20} className='text-gray-700' />
              <h2 className='text-lg font-bold text-gray-800'>Fee Status</h2>
            </div>
            <div className='space-y-3'>
              {feeStatus.map(fee => (
                <div key={fee.id} className='flex items-center justify-between py-2 border-b border-gray-100 last:border-0'>
                  <div>
                    <p className='font-medium text-gray-800 text-sm'>{fee.term}</p>
                    <p className='text-xs text-gray-500'>{fee.amount}</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${fee.statusColor}`}>
                    {fee.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Contacts */}
          <div className='card p-6'>
            <div className='flex items-center gap-2 mb-4'>
              <Phone size={20} className='text-gray-700' />
              <h2 className='text-lg font-bold text-gray-800'>Quick Contacts</h2>
            </div>
            <div className='space-y-4'>
              {quickContacts.map(contact => (
                <div key={contact.id}>
                  <p className='text-xs text-gray-500 uppercase tracking-wider mb-1'>{contact.role}</p>
                  <p className='font-semibold text-gray-800 text-sm'>{contact.name}</p>
                  <p className='text-xs text-purple-600'>{contact.contact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}