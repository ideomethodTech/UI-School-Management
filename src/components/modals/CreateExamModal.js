"use client";

import { useState } from 'react';
import { X, Calendar, Clock, FileText } from 'lucide-react';

const CreateExamModal = ({ isOpen, onClose, onCreate }) => {
    const [formData, setFormData] = useState({
        title: '',
        subject: 'Mathematics',
        class: '10-A',
        date: '',
        duration: '',
        totalMarks: '100',
        description: ''
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

        const newExam = {
            id: Date.now(),
            title: formData.title,
            subject: formData.subject,
            class: formData.class,
            date: formData.date ? new Date(formData.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD',
            duration: formData.duration ? `${formData.duration} hours` : 'TBD',
            marks: `${formData.totalMarks} marks`,
            status: 'Upcoming',
            statusColor: 'bg-blue-100 text-blue-700'
        };

        if (onCreate) {
            onCreate(newExam);
        }

        // Reset form
        setFormData({
            title: '',
            subject: 'Mathematics',
            class: '10-A',
            date: '',
            duration: '',
            totalMarks: '100',
            description: ''
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Create New Exam</h2>
                        <p className="text-sm text-gray-500">Schedule a new exam for your class</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-gray-100"><X size={24} /></button>
                </div>

                {/* Modal Body - Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Exam Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., Mid-Term Exam - Mathematics"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                            <input
                                type="text"
                                name="class"
                                value={formData.class}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 cursor-pointer"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (hours)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    step="0.5"
                                    placeholder="e.g. 2"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                                />
                                <Clock className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Total Marks</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    name="totalMarks"
                                    value={formData.totalMarks}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                                />
                                <FileText className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description / Topics</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Topics covered in this exam..."
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                        ></textarea>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 border"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 shadow-sm"
                        >
                            Create Exam
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateExamModal;
