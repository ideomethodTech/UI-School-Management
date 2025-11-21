"use client";

import Link from "next/link";

// Mock Data (ideally this comes from an API)
const classesData = [
  { id: 1, name: "5A", grade: 5, supervisorId: "T102938" },
  { id: 2, name: "4B", grade: 4, supervisorId: "T102938" },
  { id: 3, name: "3C", grade: 3, supervisorId: "OTHER" },
];

const TeacherClassesPage = ({ params }) => {
  const teacherId = params.id; 
  
  // Filter classes for this specific teacher
  // Note: In a real app, you'd likely fetch only this teacher's classes from the backend
  const filteredClasses = classesData.filter(c => c.supervisorId === "T102938"); // Simulating match

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
       <div className="flex items-center justify-between mb-6">
         <h1 className="text-lg font-semibold">Classes for Teacher {teacherId}</h1>
         <Link href={`/dashboard/teachers/${teacherId}`} className="text-sm text-blue-500 underline">
            Back to Profile
         </Link>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClasses.map((cls) => (
            <div key={cls.id} className="p-4 border rounded-md shadow-sm hover:shadow-md transition bg-sky-50">
               <h2 className="text-xl font-bold text-gray-700">{cls.name}</h2>
               <p className="text-sm text-gray-500">Grade: {cls.grade}</p>
            </div>
          ))}
       </div>
    </div>
  );
};

export default TeacherClassesPage;