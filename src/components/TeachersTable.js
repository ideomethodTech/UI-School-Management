// src/components/TeachersTable.js
import Avatar from './Avatar';
import { Eye, Trash2, Pencil } from 'lucide-react'; // Added Pencil for edit icon

export default function TeachersTable({ rows = [] }) {
  const data = rows.length ? rows : sampleTeachers();

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white divide-y divide-gray-100'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Info</th>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Teacher ID</th>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Subjects</th>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Classes</th>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Phone</th>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Address</th>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
          </tr>
        </thead>

        <tbody className='bg-white divide-y divide-gray-100'>
          {data.map((r, i) => (
            <tr key={r.teacherId || i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                <div className='flex items-center gap-3'>
                  <Avatar src={r.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${r.name}`} name={r.name} />
                  <div>
                    <div className='font-medium text-gray-900'>{r.name}</div>
                    <div className='text-xs text-gray-500'>{r.email}</div>
                  </div>
                </div>
              </td>

              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{r.teacherId}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{r.subjects}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{r.classes}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{r.phone}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{r.address}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                {/* View/Edit Button */}
                <button className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-colors'>
                  <Pencil size={16} /> {/* Using Pencil for Edit, consistent with other tables */}
                </button>
                {/* Delete Button */}
                <button className='ml-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors'>
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function sampleTeachers() {
  return [
    { name: 'John Doe', email: 'john@doe.com', teacherId: 'TCH001', subjects: 'Math, Geometry', classes: '1B, 2A, 3C', phone: '123-456-7890', address: '123 Main St, Anytown, USA', avatar: '' },
    { name: 'Jane Doe', email: 'jane@doe.com', teacherId: 'TCH002', subjects: 'Physics, Chemistry', classes: '5A, 4B, 3C', phone: '123-456-7891', address: '456 Oak Ave, Otherville, USA', avatar: '' },
    { name: 'Mike Geller', email: 'mike@geller.com', teacherId: 'TCH003', subjects: 'Biology', classes: '5A, 4B, 3C', phone: '123-456-7892', address: '789 Pine Ln, Anyplace, USA', avatar: '' },
    { name: 'Jay French', email: 'jay@gmail.com', teacherId: 'TCH004', subjects: 'History', classes: '5A, 4B, 3C', phone: '123-456-7893', address: '101 Elm Dr, Nowhere, USA', avatar: '' },
    { name: 'Jane Smith', email: 'jane@gmail.com', teacherId: 'TCH005', subjects: 'Music, History', classes: '5A, 4B, 3C', phone: '123-456-7894', address: '202 Birch Ct, Somewhere, USA', avatar: '' },
    { name: 'Anna Santiago', email: 'anna@gmail.com', teacherId: 'TCH006', subjects: 'Physics', classes: '5A, 4B, 3C', phone: '123-456-7895', address: '303 Cedar Rd, There, USA', avatar: '' },
    { name: 'Allen Black', email: 'allen@black.com', teacherId: 'TCH007', subjects: 'English, Spanish', classes: '5A, 4B, 3C', phone: '123-456-7896', address: '404 Willow Way, Everywhere, USA', avatar: '' }
  ];
}