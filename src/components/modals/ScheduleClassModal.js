"use client";

import { useState } from 'react';
import { X } from 'lucide-react';

const ScheduleClassModal = ({ isOpen, onClose, onSchedule }) => {
    const [formData, setFormData] = useState({
        className: '10-A',
        roomNo: 'Room 101',
        date: '',
        time: '',
        topic: ''
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create the scheduled class object
        const scheduledClass = {
            id: Date.now(),
            name: `Class ${formData.className}`,
            section: `Mathematics - ${formData.className}`,
            students: 32,
            schedule: formData.date ? new Date(formData.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : 'TBD',
            time: formData.time || 'TBD',
            location: formData.roomNo,
            topic: formData.topic || 'General Class'
        };

        // Call the onSchedule callback if provided
        if (onSchedule) {
            onSchedule(scheduledClass);
        }

        // Reset form and close modal
        setFormData({
            className: '10-A',
            roomNo: 'Room 101',
            date: '',
            time: '',
            topic: ''
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="flex justify-between items-start p-6 pb-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Schedule Class</h2>
                        <p className="text-sm text-gray-500">Schedule a new class session</p>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>

                {/* Modal Body - Form */}
                <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                            <input
                                type="text"
                                name="className"
                                value={formData.className}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 border-2 border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Room No.</label>
                            <input
                                type="text"
                                name="roomNo"
                                value={formData.roomNo}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-500 cursor-pointer"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-500 cursor-pointer"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
                        <input
                            type="text"
                            name="topic"
                            value={formData.topic}
                            onChange={handleChange}
                            placeholder="e.g., Quadratic Equations"
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-500"
                        />
                    </div>

                    {/* Modal Footer */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 shadow-sm"
                        >
                            Schedule Class
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ScheduleClassModal;
