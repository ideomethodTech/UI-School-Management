"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, Trash2, Pencil } from "lucide-react"; // Ensure you have lucide-react installed

// Mock Data matching your screenshot
const teachersData = [
  {
    id: 1,
    teacherId: "T102938",
    name: "Emma Baker",
    email: "emma@example.com",
    photo: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1200",
    subjects: ["Mathematics"],
    classes: ["5A"],
    phone: "737-234-563",
    address: "23 Elm St, Springfield",
  },
  {
    id: 2,
    teacherId: "T293847",
    name: "Olivia Davis",
    email: "olivia@example.com",
    photo: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1200",
    subjects: ["English"],
    classes: ["1B"],
    phone: "644-224-667",
    address: "456 Oak Ave, Maplewood",
  },
  // ... add more dummy data here
];

const TeachersTable = () => {
  const renderRow = (item) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purple-50 transition-colors"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.photo}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-600">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell p-4">{item.teacherId}</td>
      <td className="hidden md:table-cell p-4">{item.subjects.join(", ")}</td>
      <td className="hidden md:table-cell p-4">{item.classes.join(", ")}</td>
      <td className="hidden md:table-cell p-4">{item.phone}</td>
      <td className="hidden lg:table-cell p-4">{item.address}</td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          {/* View Button: Box removed, transparent bg */}
          <Link href={`/dashboard/teachers/${item.id}`}>
            <button className="p-2 text-blue-500 hover:text-blue-700 transition-colors">
              <Eye size={18} />
            </button>
          </Link>
          {/* Delete Button: Box removed, transparent bg */}
          <button className="p-2 text-purple-500 hover:text-purple-700 transition-colors">
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Table Header */}
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left text-gray-500 text-sm">
            <th className="p-4">Info</th>
            <th className="hidden md:table-cell p-4">Teacher ID</th>
            <th className="hidden md:table-cell p-4">Subjects</th>
            <th className="hidden md:table-cell p-4">Classes</th>
            <th className="hidden md:table-cell p-4">Phone</th>
            <th className="hidden lg:table-cell p-4">Address</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>{teachersData.map((item) => renderRow(item))}</tbody>
      </table>
      
      {/* Pagination (Static for visual) */}
      <div className="p-4 flex items-center justify-between text-gray-500 text-sm">
         <button className="bg-slate-100 px-3 py-1 rounded-md hover:bg-slate-200" disabled>Prev</button>
         <div className="flex gap-2">
             <button className="bg-blue-100 text-blue-600 px-2 rounded-sm">1</button>
             <button className="hover:bg-slate-100 px-2 rounded-sm">2</button>
         </div>
         <button className="bg-slate-100 px-3 py-1 rounded-md hover:bg-slate-200">Next</button>
      </div>
    </div>
  );
};

export default TeachersTable;