"use client";
import Link from "next/link";

const progressData = [
    { term: 'Term 1', overallGrade: 'A', attendance: '95%', remarks: 'Excellent start to the year.' },
    { term: 'Term 2', overallGrade: 'A-', attendance: '92%', remarks: 'Good participation, needs focus on Physics.' },
];

const StudentProgressPage = ({ params }) => {
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
       <div className="flex items-center justify-between mb-6">
         <h1 className="text-lg font-semibold">Yearly Progress Report</h1>
         <Link href={`/dashboard/students/${params.id}`} className="text-sm text-blue-500 underline">Back to Profile</Link>
       </div>
       <div className="grid gap-6">
          {progressData.map((p, idx) => (
            <div key={idx} className="p-6 border rounded-md bg-indigo-50">
                <h2 className="text-xl font-bold text-indigo-900 mb-4">{p.term} Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded shadow-sm text-center">
                        <p className="text-gray-500 text-xs uppercase">Overall Grade</p>
                        <p className="text-2xl font-bold text-indigo-600">{p.overallGrade}</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm text-center">
                        <p className="text-gray-500 text-xs uppercase">Attendance</p>
                        <p className="text-2xl font-bold text-green-600">{p.attendance}</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm">
                        <p className="text-gray-500 text-xs uppercase mb-1">Teacher Remarks</p>
                        <p className="text-sm text-gray-700">{p.remarks}</p>
                    </div>
                </div>
            </div>
          ))}
       </div>
    </div>
  );
};
export default StudentProgressPage;