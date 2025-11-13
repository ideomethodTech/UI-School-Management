// src/components/AttendanceCalendar.js
"use client";

import { ChevronLeft, ChevronRight, Dot } from 'lucide-react';
import { useState } from 'react';

// Helper to get days in a month (simplified)
const getDaysInMonth = (year, month) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

// Helper to get first day of month (0-Sunday, 6-Saturday)
const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

export default function AttendanceCalendar({ onDateSelect }) {
  const [currentDate, setCurrentDate] = useState(new Date()); // Today's date
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month); // Day of the week for the 1st of the month

  const goToPreviousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Simulate attendance data (e.g., green for present, red for absent)
  // This would come from props/context in a real app
  const simulatedAttendance = {
    '2023-10-10': 'present',
    '2023-10-12': 'absent',
    '2023-10-15': 'present',
    '2023-10-18': 'late',
    '2023-10-20': 'present',
    '2023-10-21': 'absent',
    '2023-10-22': 'present',
    '2023-10-26': 'present', // Current day for highlight
  };

  const getDayStatusColor = (date) => {
    const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD
    const status = simulatedAttendance[dateString];
    switch (status) {
      case 'present': return 'bg-green-500';
      case 'absent': return 'bg-red-500';
      case 'late': return 'bg-yellow-500';
      default: return 'bg-gray-300'; // No entry
    }
  };

  const isToday = (day) => {
    const today = new Date();
    return day.getDate() === today.getDate() &&
           day.getMonth() === today.getMonth() &&
           day.getFullYear() === today.getFullYear();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm w-full">
      <div className="flex items-center justify-between mb-4">
        <button onClick={goToPreviousMonth} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronLeft size={20} />
        </button>
        <h3 className="text-lg font-semibold text-gray-800">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <button onClick={goToNextMonth} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-600 mb-2">
        {dayNames.map(day => <div key={day}>{day}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array(firstDay).fill(null).map((_, i) => <div key={`empty-${i}`} className="p-2"></div>)} {/* Empty leading cells */}
        {daysInMonth.map((day, index) => {
          const dayNum = day.getDate();
          const isCurrentDay = isToday(day);
          const dateString = day.toISOString().split('T')[0];
          const hasAttendance = simulatedAttendance[dateString];

          return (
            <div
              key={index}
              onClick={() => onDateSelect && onDateSelect(day)}
              className={`p-2 rounded-md cursor-pointer relative transition-all duration-200
                ${isCurrentDay ? 'bg-purple-100 border border-purple-400' : 'hover:bg-gray-50'}
                ${isCurrentDay && hasAttendance ? 'ring-2 ring-purple-600' : ''}
              `}
            >
              <span className={`block text-center text-sm ${isCurrentDay ? 'font-bold text-purple-800' : 'text-gray-800'}`}>
                {dayNum}
              </span>
              {hasAttendance && (
                <Dot size={20} className={`absolute bottom-0 right-0 ${getDayStatusColor(day)} rounded-full text-white`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}