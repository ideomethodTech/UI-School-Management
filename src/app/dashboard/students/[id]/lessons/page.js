"use client";
import Link from "next/link";

const lessonsData = [
    { id: 1, subject: 'Math', topic: 'Algebra Basics', date: 'Today', status: 'Upcoming' },
    { id: 2, subject: 'Science', topic: 'Photosynthesis', date: 'Tomorrow', status: 'Upcoming' },
    { id: 3, subject: 'History', topic: 'World War II', date: 'Yesterday', status: 'Completed' },
];

const StudentLessonsPage = ({ params }) => {
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
       <div className="flex items-center justify-between mb-6">
         <h1 className="text-lg font-semibold">Curriculum & Lessons</h1>
         <Link href={`/dashboard/students/${params.id}`} className="text-sm text-blue-500 underline">Back to Profile</Link>
       </div>
       <div className="grid gap-4">
          {lessonsData.map(l => (
            <div key={l.id} className={`p-4 border rounded-md flex justify-between items-center ${l.status === 'Completed' ? 'bg-gray-50 opacity-75' : 'bg-purple-50'}`}>
                <div>
                    <h3 className="font-bold text-gray-700">{l.subject}: {l.topic}</h3>
                    <p className="text-xs text-gray-500">{l.date}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${l.status === 'Completed' ? 'bg-green-200 text-green-700' : 'bg-blue-200 text-blue-700'}`}>
                    {l.status}
                </span>
            </div>
          ))}
       </div>
    </div>
  );
};
export default StudentLessonsPage;