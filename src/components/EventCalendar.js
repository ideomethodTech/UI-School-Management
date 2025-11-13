// src/components/EventCalendar.js
import { ChevronLeft, ChevronRight, Dot } from 'lucide-react';

export default function EventCalendar() {
  const currentMonth = 'November 2025';
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dates = [ // Example dates, you'd generate this dynamically
    null, null, null, 1, 2, 3, 4,
    5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, null
  ];

  const events = {
    7: '06: PTM',
    11: '06: Museum Trip',
    16: '06: Sports Day',
    23: '06: Exam Day',
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Events This Month</h3>

      <div className="flex items-center justify-between mb-4">
        <button className="p-1 rounded-full hover:bg-gray-100 text-gray-600">
          <ChevronLeft size={20} />
        </button>
        <span className="font-medium text-gray-800">{currentMonth}</span>
        <button className="p-1 rounded-full hover:bg-gray-100 text-gray-600">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {daysOfWeek.map(day => (
          <div key={day} className="font-medium text-gray-500">{day}</div>
        ))}
        {dates.map((date, index) => (
          <div
            key={index}
            className={`p-2 rounded-md ${date ? 'text-gray-700' : 'text-gray-300'} 
            ${date && (index % 7 === 5 || index % 7 === 6) ? 'text-red-500' : ''} 
            ${events[date] ? 'relative bg-purple-50 font-semibold' : ''}`}
          >
            {date}
            {events[date] && (
              <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-600 rounded-full"></span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2 text-sm">
        {Object.entries(events).map(([date, description]) => (
          <div key={date} className="flex items-center space-x-2 text-gray-700">
            <Dot size={20} className="text-purple-600" />
            <span>{date}: {description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}