// src/app/dashboard/events/page.js
'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal, Plus, Pencil, Trash2, CalendarDays, Clock } from 'lucide-react';

// Mock data for the initial list of events
const initialEventsData = [
    { id: 1, title: 'Lake Trip', class: '1A', date: '2025-01-01', startTime: '10:00', endTime: '11:00' },
    { id: 2, title: 'Picnic', class: '2A', date: '2025-01-01', startTime: '10:00', endTime: '11:00' },
    { id: 3, title: 'Beach Trip', class: '3A', date: '2025-01-01', startTime: '10:00', endTime: '11:00' },
    { id: 4, title: 'Museum Trip', class: '4A', date: '2025-01-01', startTime: '10:00', endTime: '11:00' },
    { id: 5, title: 'Music Concert', class: '5A', date: '2025-01-01', startTime: '10:00', endTime: '11:00' },
    { id: 6, title: 'Magician Show', class: '1B', date: '2025-01-01', startTime: '10:00', endTime: '11:00' },
    { id: 7, title: 'Lake Trip', class: '2B', date: '2025-01-01', startTime: '10:00', endTime: '11:00' },
    { id: 8, title: 'Cycling Race', class: '3B', date: '2025-01-01', startTime: '10:00', endTime: '11:00' },
];

// Main page component
export default function EventsPage() {
    const [events, setEvents] = useState(initialEventsData);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('create');
    const [currentEvent, setCurrentEvent] = useState(null);
    const [formState, setFormState] = useState({
        title: '', class: '', date: '', startTime: '10:00', endTime: '11:00'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const openModal = (type, event = null) => {
        setModalType(type);
        if (type === 'edit' && event) {
            setCurrentEvent(event);
            setFormState({ ...event });
        } else {
            setCurrentEvent(null);
            const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
            setFormState({ title: '', class: '', date: today, startTime: '10:00', endTime: '11:00' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formState.title.trim()) {
            alert('Event Title is required.');
            return;
        }

        if (modalType === 'create') {
            setEvents(prev => [...prev, { id: Date.now(), ...formState }]);
        } else {
            setEvents(prev => prev.map(evt => (evt.id === currentEvent.id ? { ...evt, ...formState } : evt)));
        }
        closeModal();
    };

    const handleDelete = (eventIdToDelete) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            setEvents(prev => prev.filter(e => e.id !== eventIdToDelete));
        }
    };

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.class.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='p-6 space-y-6'>
            {/* Header */}
            <div className='flex items-center justify-between'>
                <div>
                    <h2 className='text-2xl font-semibold text-gray-800'>All Events</h2>
                </div>
                <div className='flex items-center gap-3'>
                    <div className='relative'>
                        <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                        <input
                            placeholder='Search events...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='rounded-full border border-gray-300 pl-10 pr-4 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400'
                        />
                    </div>
                    <button className='p-2 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'>
                        <SlidersHorizontal size={20} />
                    </button>
                    <button onClick={() => openModal('create')} className='p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 shadow-md'>
                        <Plus size={20} />
                    </button>
                </div>
            </div>

            {/* Table Container */}
            <div className='bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm'>
                <table className='w-full text-sm text-left text-gray-600'>
                    <thead className='bg-gray-50 text-xs text-gray-700 uppercase'>
                        <tr>
                            <th scope='col' className='px-6 py-3'>Title</th>
                            <th scope='col' className='px-6 py-3'>Class</th>
                            <th scope='col' className='px-6 py-3'>Date</th>
                            <th scope='col' className='px-6 py-3'>Start Time</th>
                            <th scope='col' className='px-6 py-3'>End Time</th>
                            <th scope='col' className='px-10 py-3 text-right'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEvents.map((event) => (
                            <tr key={event.id} className='bg-white border-b hover:bg-gray-50'>
                                <td className='px-6 py-4 font-medium text-gray-900'>{event.title}</td>
                                <td className='px-6 py-4'>{event.class}</td>
                                <td className='px-6 py-4'>{event.date}</td>
                                <td className='px-6 py-4'>{event.startTime}</td>
                                <td className='px-6 py-4'>{event.endTime}</td>
                                <td className='px-6 py-4'>
                                    <div className='flex items-center justify-end gap-2'>
                                        <button onClick={() => openModal('edit', event)} className='p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200'>
                                            <Pencil size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(event.id)} className='p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200'>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for creating/editing an event */}
            {isModalOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50' onClick={closeModal}>
                    <div className='bg-white rounded-lg shadow-xl p-8 w-full max-w-lg' onClick={(e) => e.stopPropagation()}>
                        <form onSubmit={handleSubmit}>
                            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
                                {modalType === 'create' ? 'Create New Event' : 'Edit Event'}
                            </h2>

                            <div className='space-y-4'>
                                {/* Event Title and Class */}
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div>
                                        <label htmlFor='title' className='block mb-2 text-sm font-medium text-gray-700'>Title</label>
                                        <input id='title' name='title' type='text' value={formState.title} onChange={handleInputChange} className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300' required />
                                    </div>
                                    <div>
                                        <label htmlFor='class' className='block mb-2 text-sm font-medium text-gray-700'>Class</label>
                                        <input id='class' name='class' type='text' value={formState.class} onChange={handleInputChange} className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300' />
                                    </div>
                                </div>

                                {/* Date Input */}
                                <div>
                                    <label htmlFor='date' className='block mb-2 text-sm font-medium text-gray-700'>Date</label>
                                    <div className='relative'>
                                        <CalendarDays size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                                        <input id='date' name='date' type='date' value={formState.date} onChange={handleInputChange} className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300' />
                                    </div>
                                </div>

                                {/* Time Inputs */}
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div>
                                        <label htmlFor='startTime' className='block mb-2 text-sm font-medium text-gray-700'>Start Time</label>
                                        <div className='relative'>
                                            <Clock size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                                            <input id='startTime' name='startTime' type='time' value={formState.startTime} onChange={handleInputChange} className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300' />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor='endTime' className='block mb-2 text-sm font-medium text-gray-700'>End Time</label>
                                        <div className='relative'>
                                            <Clock size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                                            <input id='endTime' name='endTime' type='time' value={formState.endTime} onChange={handleInputChange} className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className='flex justify-end gap-4 mt-8'>
                                <button type='button' onClick={closeModal} className='px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 border'>
                                    Cancel
                                </button>
                                <button type='submit' className='px-5 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 shadow-sm'>
                                    {modalType === 'create' ? 'Create Event' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}