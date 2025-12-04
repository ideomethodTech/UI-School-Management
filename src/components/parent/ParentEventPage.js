// src/components/ParentEventPage.js
"use client";

import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';
import { EVENT_CATEGORIES, parentEventsData as mockEvents } from '../../mockData/parentData';

export default function ParentEventPage() {
    const [currentMonth, setCurrentMonth] = useState('November 2025');
    const [selectedDate, setSelectedDate] = useState(null);

    // Generate calendar for November 2025
    const generateCalendar = () => {
        const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        // November 2025 starts on Saturday (index 6)
        // Creating a 6-week (42 cells) calendar grid for proper display
        const dates = [
            null, null, null, null, null, null, 1,    // Week 1
            2, 3, 4, 5, 6, 7, 8,                       // Week 2
            9, 10, 11, 12, 13, 14, 15,                 // Week 3
            16, 17, 18, 19, 20, 21, 22,                // Week 4
            23, 24, 25, 26, 27, 28, 29,                // Week 5
            30, null, null, null, null, null, null     // Week 6
        ];

        // Days that have events (for demonstration)
        const eventDates = [10, 17, 19, 28];

        return { daysOfWeek, dates, eventDates };
    };

    const { daysOfWeek, dates, eventDates } = generateCalendar();

    // Get the first event to display as selected
    const selectedEvent = mockEvents[0];

    return (
        <div className='p-6 space-y-6 max-w-7xl mx-auto'>
            {/* Header */}
            <div className='mb-6'>
                <h1 className='text-3xl font-bold text-gray-800'>School Events</h1>
                <p className='text-gray-600 mt-1'>Stay updated with important school events and activities</p>
            </div>

            {/* Main Content Grid */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* Left Column - Calendar */}
                <div className='lg:col-span-1'>
                    <div className='bg-purple-50 text-gray-800 rounded-lg shadow-md p-6 border border-purple-100'>
                        <h2 className='text-xl font-bold mb-6 text-purple-900'>Calendar</h2>

                        {/* Month Navigation */}
                        <div className='flex items-center justify-between mb-6'>
                            <button className='p-2 rounded-full hover:bg-purple-100 transition-colors text-purple-700'>
                                <ChevronLeft size={20} />
                            </button>
                            <span className='font-semibold text-lg text-purple-900'>{currentMonth}</span>
                            <button className='p-2 rounded-full hover:bg-purple-100 transition-colors text-purple-700'>
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        {/* Calendar Grid */}
                        <div className='w-full'>
                            {/* Days of Week */}
                            <div className='grid grid-cols-7 gap-1 text-center text-xs font-medium mb-3'>
                                {daysOfWeek.map((day, index) => (
                                    <div key={index} className='p-2 text-purple-600 font-semibold'>{day}</div>
                                ))}
                            </div>

                            {/* Dates */}
                            <div className='grid grid-cols-7 gap-1 text-center text-sm'>
                                {dates.map((date, index) => (
                                    <div
                                        key={index}
                                        className={`
                                            p-2 rounded-md transition-colors cursor-pointer min-h-[36px] flex items-center justify-center
                                            ${!date ? 'invisible' : ''}
                                            ${eventDates.includes(date)
                                                ? 'bg-purple-600 text-white font-bold hover:bg-purple-700 shadow-sm'
                                                : 'text-gray-700 hover:bg-purple-100'}
                                        `}
                                    >
                                        {date || ''}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Legend */}
                        <div className='mt-6 pt-6 border-t border-purple-200 flex items-center gap-2'>
                            <div className='w-3 h-3 bg-purple-600 rounded-sm'></div>
                            <span className='text-sm text-purple-700'>Days with events</span>
                        </div>
                    </div>
                </div>

                {/* Right Column - Events */}
                <div className='lg:col-span-2 space-y-6'>
                    {/* Selected Date Event */}
                    <div className='bg-white rounded-lg shadow-md p-6 bg-purple-50 border-l-4 border-purple-600'>
                        <div className='flex items-start justify-between mb-4'>
                            <div>
                                <h3 className='text-lg font-bold text-gray-800 mb-1'>{selectedEvent.displayDate}</h3>
                                <h2 className='text-2xl font-bold text-gray-800 mb-2'>{selectedEvent.title}</h2>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${EVENT_CATEGORIES[selectedEvent.category].color}`}>
                                    {EVENT_CATEGORIES[selectedEvent.category].label}
                                </span>
                            </div>
                        </div>
                        <p className='text-gray-700 mb-4'>{selectedEvent.description}</p>
                        <div className='flex flex-col gap-2 text-sm text-gray-600'>
                            <div className='flex items-center gap-2'>
                                <Clock size={16} className='text-purple-600' />
                                <span>{selectedEvent.time}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <MapPin size={16} className='text-purple-600' />
                                <span>{selectedEvent.location}</span>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Events */}
                    <div className='bg-white rounded-lg shadow-md p-6'>
                        <div className='flex items-center gap-2 mb-6'>
                            <Calendar size={20} className='text-purple-600' />
                            <h2 className='text-xl font-bold text-gray-800'>Upcoming Events</h2>
                        </div>

                        <div className='space-y-4'>
                            {mockEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className='p-4 rounded-lg border border-gray-100 hover:border-purple-300 hover:bg-purple-50 transition-all cursor-pointer'
                                >
                                    <div className='flex items-start justify-between'>
                                        <div className='flex-1'>
                                            <div className='flex items-center gap-3 mb-2'>
                                                <h3 className='font-semibold text-gray-800'>{event.title}</h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${EVENT_CATEGORIES[event.category].color}`}>
                                                    {EVENT_CATEGORIES[event.category].label}
                                                </span>
                                            </div>
                                            <p className='text-sm text-gray-600 mb-3'>{event.description}</p>
                                            <div className='flex flex-col gap-1 text-sm text-gray-500'>
                                                <div className='flex items-center gap-2'>
                                                    <Clock size={14} />
                                                    <span>{event.time}</span>
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                    <MapPin size={14} />
                                                    <span>{event.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='text-right ml-4'>
                                            <span className='text-sm font-semibold text-purple-600'>{event.shortDate}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Event Types Legend */}
                    <div className='bg-white rounded-lg shadow-md p-6'>
                        <h3 className='text-lg font-bold text-gray-800 mb-4'>Event Types</h3>
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                            {Object.entries(EVENT_CATEGORIES).map(([key, category]) => (
                                <div key={key} className='flex items-center gap-2'>
                                    <div className={`w-3 h-3 rounded-full ${category.dotColor}`}></div>
                                    <span className='text-sm text-gray-700'>{category.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
