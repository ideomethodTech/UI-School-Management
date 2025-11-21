"use client";
import Link from "next/link";
import Image from "next/image";

const studentsData = [
    { id: 1, name: 'John Doe', teacherId: '2', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Jane Doe', teacherId: '2', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Mike Ross', teacherId: '1', avatar: 'https://i.pravatar.cc/150?img=3' },
];

const TeacherStudentsPage = ({ params }) => {
  // We simulate filtering by "2" because params.id might be complex
  const filteredStudents = studentsData.filter(s => s.teacherId === '2'); 

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
       <div className="flex items-center justify-between mb-6">
         <h1 className="text-lg font-semibold">Students assigned to Teacher {params.id}</h1>
         <Link href={`/dashboard/teachers/${params.id}`} className="text-sm text-blue-500 underline">Back to Profile</Link>
       </div>

       <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-gray-50 uppercase">
             <tr>
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">ID</th>
             </tr>
          </thead>
          <tbody>
             {filteredStudents.map(student => (
                 <tr key={student.id} className="border-b hover:bg-purple-50">
                    <td className="px-4 py-3 flex items-center gap-3">
                       <Image src={student.avatar} width={30} height={30} alt="" className="rounded-full"/>
                       <span className="font-medium text-gray-900">{student.name}</span>
                    </td>
                    <td className="px-4 py-3">{student.id}</td>
                 </tr>
             ))}
          </tbody>
       </table>
    </div>
  );
};

export default TeacherStudentsPage;