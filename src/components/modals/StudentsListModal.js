"use client";
import Modal from '@/components/modals/Modal';
import { Mail, Phone } from 'lucide-react';
import { mockStudents } from '../../mockData/modalData';

const StudentsListModal = ({ isOpen, onClose, classData }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Students - ${classData?.name || 'Class'}`} size="lg">
            <div className="space-y-4">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-4 py-3">Roll No</th>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Contact Info</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockStudents.map((student) => (
                                <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium text-gray-900">{student.rollNo}</td>
                                    <td className="px-4 py-3 font-medium text-gray-800">{student.name}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-xs">
                                                <Mail size={12} className="text-gray-400" />
                                                <span>{student.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs">
                                                <Phone size={12} className="text-gray-400" />
                                                <span>{student.phone}</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default StudentsListModal;
