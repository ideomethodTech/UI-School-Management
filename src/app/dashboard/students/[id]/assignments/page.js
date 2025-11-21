"use client";
import Link from "next/link";

const assignmentsData = [
    { id: 1, title: 'Math Worksheet #4', subject: 'Mathematics', due: 'Tomorrow', status: 'Pending' },
    { id: 2, title: 'Science Project', subject: 'Science', due: 'Next Week', status: 'In Progress' },
    { id: 3, title: 'Reading Log', subject: 'English', due: 'Yesterday', status: 'Submitted' },
];

const StudentAssignmentsPage = ({ params }) => {
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
       <div className="flex items-center justify-between mb-6">
         <h1 className="text-lg font-semibold">Assignments</h1>
         <Link href={`/dashboard/students/${params.id}`} className="text-sm text-blue-500 underline">Back to Profile</Link>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assignmentsData.map(a => (
            <div key={a.id} className="p-4 border border-yellow-200 bg-yellow-50 rounded-md">
                <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold bg-white px-2 py-1 rounded text-gray-500">{a.subject}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${a.status==='Submitted'?'text-green-600':'text-red-500'}`}>{a.status}</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{a.title}</h3>
                <p className="text-sm text-gray-500">Due: {a.due}</p>
            </div>
          ))}
       </div>
    </div>
  );
};
export default StudentAssignmentsPage;