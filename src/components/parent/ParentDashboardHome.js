// src/components/ParentDashboardHome.js
"use client";

import React from 'react';
import Link from 'next/link';
import { User, Calendar, DollarSign, Phone, ArrowRight } from 'lucide-react';
import { mockParentData } from '../../mockData/parentData';

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