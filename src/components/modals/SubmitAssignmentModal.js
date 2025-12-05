"use client";

import { useState } from 'react';
import { X, Upload, File, CheckCircle } from 'lucide-react';

const SubmitAssignmentModal = ({ isOpen, onClose, assignment, onSubmit }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [comments, setComments] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    if (!isOpen || !assignment) return null;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedFile) {
            alert('Please select a file to upload');
            return;
        }

        // Call the onSubmit callback with the submission data
        if (onSubmit) {
            onSubmit({
                assignmentId: assignment.id,
                file: selectedFile,
                comments: comments,
                submittedAt: new Date().toISOString()
            });
        }

        // Reset form
        setSelectedFile(null);
        setComments('');
        onClose();
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="flex justify-between items-start p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Submit Assignment</h2>
                        <p className="text-sm text-gray-600 mt-1">{assignment.title}</p>
                        <p className="text-xs text-gray-500">{assignment.subject}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
                        <X size={24} />
                    </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* File Upload Area */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload File <span className="text-red-500">*</span>
                        </label>
                        <div
                            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragging
                                    ? 'border-purple-500 bg-purple-50'
                                    : selectedFile
                                        ? 'border-green-500 bg-green-50'
                                        : 'border-gray-300 hover:border-purple-400 bg-gray-50'
                                }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => document.getElementById('file-input').click()}
                        >
                            <input
                                id="file-input"
                                type="file"
                                onChange={handleFileChange}
                                className="hidden"
                                accept=".pdf,.doc,.docx,.txt,.zip,.jpg,.jpeg,.png"
                            />

                            {selectedFile ? (
                                <div className="flex flex-col items-center gap-3">
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <CheckCircle size={32} className="text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">{selectedFile.name}</p>
                                        <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedFile(null);
                                        }}
                                        className="text-sm text-red-600 hover:text-red-700 underline"
                                    >
                                        Remove file
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-3">
                                    <div className="bg-purple-100 p-3 rounded-full">
                                        <Upload size={32} className="text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-700">Click to upload or drag and drop</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            PDF, DOC, DOCX, TXT, ZIP, JPG, PNG (max. 10MB)
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Comments */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Comments (Optional)
                        </label>
                        <textarea
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            placeholder="Add any notes or comments for your teacher..."
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                        />
                    </div>

                    {/* Assignment Details */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Assignment Details</h3>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p><span className="font-medium">Due Date:</span> {assignment.dueDate}</p>
                            <p><span className="font-medium">Time Left:</span> <span className={assignment.status === 'Overdue' ? 'text-red-600 font-semibold' : 'text-yellow-600'}>{assignment.timeLeft}</span></p>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 border"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 shadow-sm flex items-center gap-2"
                        >
                            <Upload size={16} />
                            Submit Assignment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubmitAssignmentModal;
