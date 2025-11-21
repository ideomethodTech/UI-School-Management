"use client";
import Link from "next/link";

const assignmentsData = [
    { id: 1, title: 'Chapter 5 Exercises', dueDate: 'Tomorrow', class: '5A' },
    { id: 2, title: 'Geometry Worksheet', dueDate: 'Next Week', class: '4B' },
];

const TeacherAssignmentsPage = ({ params }) => {
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
       <div className="flex items-center justify-between mb-6">
         <h1 className="text-lg font-semibold">Active Assignments</h1>
         <Link href={`/dashboard/teachers/${params.id}`} className="text-sm text-blue-500 underline">Back to Profile</Link>
       </div>

       <div className="grid gap-4">
           {assignmentsData.map(assign => (
               <div key={assign.id} className="p-4 border border-teal-100 bg-teal-50 rounded-md">
                   <div className="flex justify-between mb-2">
                        <h3 className="font-bold text-teal-800">{assign.title}</h3>
                        <span className="text-xs bg-white px-2 py-1 rounded shadow-sm">Due: {assign.dueDate}</span>
                   </div>
                   <p className="text-sm text-gray-500">Assigned to Class: {assign.class}</p>
               </div>
           ))}
       </div>
    </div>
  );
};

export default TeacherAssignmentsPage;
