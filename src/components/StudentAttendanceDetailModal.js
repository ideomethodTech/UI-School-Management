// src/components/StudentAttendanceDetailModal.js
import { X } from 'lucide-react';

export default function StudentAttendanceDetailModal({ student, onClose }) {
  if (!student) return null;

  // Sample student result data for the modal
  const sampleStudentResults = [
    { name: 'Unit 1 - Manage meeting (BMIS1)', status: 'PASS', score: '85', date: '15.01.2020 - 04.11.2020' },
    { name: 'Appointment 1: Provision new marketing (B-DM-BMIS1)', status: 'PASS', score: '90', date: '15.01.2020 - 04.11.2020' },
    { name: 'Assignment 2: BMIS (BMIS)', status: 'Distinction', score: '92', date: '20.02.2020 - 20.02.2020' },
    { name: 'No failed Submissions', status: '', score: '', date: '' },
    { name: 'Assignment 1: DPR test (B-DM-BMIS1)', status: 'PASS', score: '88', date: '15.01.2020 - 04.11.2020' },
  ];

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>

        <h3 className="text-xl font-semibold text-gray-800 mb-4">Student Name: {student.name}</h3>

        <div className="flex border-b border-gray-200">
          <button className="px-4 py-2 text-purple-600 border-b-2 border-purple-600 font-medium text-sm">Attendance</button>
          <button className="px-4 py-2 text-gray-600 hover:text-purple-600 text-sm">Results</button>
        </div>

        <div className="mt-4 space-y-3">
          {sampleStudentResults.map((result, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
              <div>
                <p className="font-medium text-gray-800">{result.name}</p>
                <p className="text-xs text-gray-500">{result.date}</p>
              </div>
              <div className="text-right">
                {result.status && <p className={`text-sm font-semibold ${result.status === 'PASS' || result.status === 'Distinction' ? 'text-green-600' : 'text-red-600'}`}>{result.status}</p>}
                {result.score && <p className="text-xs text-gray-600">Score: {result.score}</p>}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <p className="text-sm font-semibold text-gray-700">Total Hours: {student.totalHeldHours}</p>
        </div>

      </div>
    </div>
  );
}