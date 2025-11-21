"use client";
import Link from "next/link";

const activitiesData = [
    { id: 1, name: 'Chess Club', role: 'Member', achievement: 'School Tournament Runner-up' },
    { id: 2, name: 'Soccer Team', role: 'Goalkeeper', achievement: 'Regional Qualifiers' },
];

const StudentActivitiesPage = ({ params }) => {
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
       <div className="flex items-center justify-between mb-6">
         <h1 className="text-lg font-semibold">Extracurricular Activities</h1>
         <Link href={`/dashboard/students/${params.id}`} className="text-sm text-blue-500 underline">Back to Profile</Link>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activitiesData.map(act => (
            <div key={act.id} className="p-4 border border-pink-200 bg-pink-50 rounded-md hover:shadow-md transition">
                <h3 className="text-lg font-bold text-pink-700 mb-1">{act.name}</h3>
                <p className="text-sm text-gray-700">Role: <span className="font-medium">{act.role}</span></p>
                <p className="text-xs text-gray-500 mt-2">Achievement: {act.achievement}</p>
            </div>
          ))}
       </div>
    </div>
  );
};
export default StudentActivitiesPage;