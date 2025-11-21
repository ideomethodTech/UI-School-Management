"use client";
import Link from "next/link";

const resultsData = [
    { id: 1, subject: 'Mathematics', score: 95, grade: 'A+', date: '2025-01-15', type: 'Mid-Term' },
    { id: 2, subject: 'Science', score: 88, grade: 'A', date: '2025-01-18', type: 'Mid-Term' },
    { id: 3, subject: 'English', score: 92, grade: 'A+', date: '2025-01-20', type: 'Mid-Term' },
];

const StudentResultsPage = ({ params }) => {
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
       <div className="flex items-center justify-between mb-6">
         <h1 className="text-lg font-semibold">Academic Results</h1>
         <Link href={`/dashboard/students/${params.id}`} className="text-sm text-blue-500 underline">Back to Profile</Link>
       </div>

       <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-gray-50 uppercase">
             <tr>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Exam Type</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Grade</th>
                <th className="px-4 py-3 hidden md:table-cell">Date</th>
             </tr>
          </thead>
          <tbody>
             {resultsData.map(res => (
                 <tr key={res.id} className="border-b hover:bg-sky-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{res.subject}</td>
                    <td className="px-4 py-3">{res.type}</td>
                    <td className="px-4 py-3 font-bold text-gray-700">{res.score}/100</td>
                    <td className="px-4 py-3 text-green-600 font-bold">{res.grade}</td>
                    <td className="px-4 py-3 hidden md:table-cell">{res.date}</td>
                 </tr>
             ))}
          </tbody>
       </table>
    </div>
  );
};
export default StudentResultsPage;