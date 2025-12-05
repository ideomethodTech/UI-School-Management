// src/components/AttendanceTable.js
import { CheckCircle, XCircle, MinusCircle, User, CalendarDays, Pencil } from 'lucide-react'; // ADD PENCIL HERE
import Avatar from '@/components/shared/Avatar';
import { sampleAdminAttendance, sampleTeacherAttendance, sampleStudentAttendance } from '../../mockData/sharedData';

export default function AttendanceTable({ role, studentId, teacherId, rows = [] }) {
  let data = rows.length ? rows : [];

  // Simulate data based on role
  if (!rows.length) {
    if (role === 'admin') {
      data = sampleAdminAttendance;
    } else if (role === 'teacher') {
      data = sampleTeacherAttendance;
    } else if (role === 'student') {
      data = sampleStudentAttendance;
    }
  }

  const renderAdminTable = () => (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white divide-y divide-gray-100'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Student Info</th>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Class</th>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Date</th>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Reported By</th>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-100'>
          {data.map((r, i) => (
            <tr key={r.id || i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                <div className='flex items-center gap-3'>
                  <Avatar src={`https://api.dicebear.com/7.x/initials/svg?seed=${r.studentName}`} name={r.studentName} size="small" />
                  <div className="font-medium text-gray-900">{r.studentName}</div>
                </div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{r.class}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{r.date}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                {r.status === 'present' && <span className="flex items-center text-green-600"><CheckCircle size={16} className="mr-1" /> Present</span>}
                {r.status === 'absent' && <span className="flex items-center text-red-600"><XCircle size={16} className="mr-1" /> Absent</span>}
                {r.status === 'late' && <span className="flex items-center text-yellow-600"><MinusCircle size={16} className="mr-1" /> Late</span>}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{r.reportedBy}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                <button className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-colors'>
                  <Pencil size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderTeacherTable = () => (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white divide-y divide-gray-100'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Student Info</th>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Date</th>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-100'>
          {data.map((r, i) => (
            <tr key={r.id || i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                <div className='flex items-center gap-3'>
                  <Avatar src={`https://api.dicebear.com/7.x/initials/svg?seed=${r.studentName}`} name={r.studentName} size="small" />
                  <div className="font-medium text-gray-900">{r.studentName}</div>
                </div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{r.date}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                {r.status === 'present' && <span className="flex items-center text-green-600"><CheckCircle size={16} className="mr-1" /> Present</span>}
                {r.status === 'absent' && <span className="flex items-center text-red-600"><XCircle size={16} className="mr-1" /> Absent</span>}
                {r.status === 'late' && <span className="flex items-center text-yellow-600"><MinusCircle size={16} className="mr-1" /> Late</span>}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                <button className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-colors'>
                  <Pencil size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderStudentTable = () => (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white divide-y divide-gray-100'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Date</th>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Class</th>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
            <th className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Reported By</th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-100'>
          {data.map((r, i) => (
            <tr key={r.id || i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{r.date}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{r.class}</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                {r.status === 'present' && <span className="flex items-center text-green-600"><CheckCircle size={16} className="mr-1" /> Present</span>}
                {r.status === 'absent' && <span className="flex items-center text-red-600"><XCircle size={16} className="mr-1" /> Absent</span>}
                {r.status === 'late' && <span className="flex items-center text-yellow-600"><MinusCircle size={16} className="mr-1" /> Late</span>}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>{r.reportedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  switch (role) {
    case 'admin':
      return renderAdminTable();
    case 'teacher':
      return renderTeacherTable();
    case 'student':
      return renderStudentTable();
    default:
      return <div className="p-6 text-gray-600 flex items-center gap-2"><CalendarDays size={20} /> Select a role to view attendance.</div>;
  }
}