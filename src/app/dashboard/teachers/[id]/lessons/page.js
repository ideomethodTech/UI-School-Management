"use client";
import Link from "next/link";

const lessonsData = [
    { id: 1, subject: 'Mathematics', class: '5A', time: '08:00 - 09:00' },
    { id: 2, subject: 'Mathematics', class: '4B', time: '09:00 - 10:00' },
    { id: 3, subject: 'Geometry', class: '5A', time: '11:00 - 12:00' },
];

const TeacherLessonsPage = ({ params }) => {
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
       <div className="flex items-center justify-between mb-6">
         <h1 className="text-lg font-semibold">Lessons Schedule</h1>
         <Link href={`/dashboard/teachers/${params.id}`} className="text-sm text-blue-500 underline">Back to Profile</Link>
       </div>

       <div className="space-y-4">
          {lessonsData.map(lesson => (
              <div key={lesson.id} className="flex items-center justify-between p-4 border-l-4 border-yellow-400 bg-yellow-50 rounded-r-md shadow-sm">
                  <div>
                      <h3 className="font-bold text-gray-700">{lesson.subject}</h3>
                      <p className="text-xs text-gray-500">Class: {lesson.class}</p>
                  </div>
                  <span className="text-sm font-medium text-gray-600">{lesson.time}</span>
              </div>
          ))}
       </div>
    </div>
  );
};

export default TeacherLessonsPage;