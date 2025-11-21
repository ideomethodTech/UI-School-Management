"use client";
import Link from "next/link";

const meetingsData = [
    { id: 1, date: '2025-02-10', teacher: 'Mrs. Baker (Math)', purpose: 'Discuss Academic Performance', notes: 'Scheduled' },
    { id: 2, date: '2024-12-15', teacher: 'Mr. Green (Science)', purpose: 'Term End Review', notes: 'Completed. Positive feedback.' },
];

const StudentMeetingsPage = ({ params }) => {
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
       <div className="flex items-center justify-between mb-6">
         <h1 className="text-lg font-semibold">Parent-Teacher Meetings</h1>
         <Link href={`/dashboard/students/${params.id}`} className="text-sm text-blue-500 underline">Back to Profile</Link>
       </div>
       <div className="space-y-4">
          {meetingsData.map(m => (
            <div key={m.id} className="p-4 border-l-4 border-orange-400 bg-orange-50 rounded-r-md shadow-sm">
                <div className="flex justify-between">
                    <h3 className="font-bold text-gray-800">{m.teacher}</h3>
                    <span className="text-sm text-gray-500">{m.date}</span>
                </div>
                <p className="text-sm font-medium text-gray-700 mt-1">{m.purpose}</p>
                <p className="text-xs text-gray-500 mt-2 italic">Notes: {m.notes}</p>
            </div>
          ))}
       </div>
    </div>
  );
};
export default StudentMeetingsPage;