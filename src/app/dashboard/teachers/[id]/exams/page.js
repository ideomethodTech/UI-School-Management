"use client";
import Link from "next/link";

const examsData = [
    { id: 1, title: 'Math Mid-Term', date: '2025-03-15' },
    { id: 2, title: 'Algebra Quiz', date: '2025-03-20' },
];

const TeacherExamsPage = ({ params }) => {
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
       <div className="flex items-center justify-between mb-6">
         <h1 className="text-lg font-semibold">Upcoming Exams</h1>
         <Link href={`/dashboard/teachers/${params.id}`} className="text-sm text-blue-500 underline">Back to Profile</Link>
       </div>

       <ul className="space-y-2">
           {examsData.map(exam => (
               <li key={exam.id} className="p-4 bg-pink-50 rounded-md flex justify-between items-center">
                   <span className="font-medium text-pink-700">{exam.title}</span>
                   <span className="text-sm text-gray-500">{exam.date}</span>
               </li>
           ))}
       </ul>
    </div>
  );
};

export default TeacherExamsPage;