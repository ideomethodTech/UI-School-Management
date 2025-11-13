// src/components/ResultsTable.js
import { Pencil, Trash2 } from 'lucide-react';

export default function ResultsTable({ role, studentId, teacherId, rows = [] }) {
  let data = rows.length ? rows : [];

  // Simulate data based on role
  if (!rows.length) {
    if (role === 'admin') {
      data = sampleResults(); // Admin sees all results
    } else if (role === 'teacher') {
      data = sampleResults().filter(r => r.teacherId === teacherId); // Teacher sees only their students' results
    } else if (role === 'student') {
      data = sampleResults().filter(r => r.studentId === studentId); // Student sees only their results
    }
  }

  // Define columns based on role
  const getColumns = () => {
    switch (role) {
      case 'student':
        return [
          { header: 'Subject Name', accessor: 'subject' },
          { header: 'Score', accessor: 'score' },
          { header: 'Teacher', accessor: 'teacherName' },
          { header: 'Class', accessor: 'className' },
          { header: 'Date', accessor: 'date' },
        ];
      default: // Admin, Teacher and others
        return [
          { header: 'Subject Name', accessor: 'subject' },
          { header: 'Student', accessor: 'studentName' },
          { header: 'Score', accessor: 'score' },
          { header: 'Teacher', accessor: 'teacherName' },
          { header: 'Class', accessor: 'className' },
          { header: 'Date', accessor: 'date' },
          { header: 'Actions', accessor: 'actions' },
        ];
    }
  };

  const columns = getColumns();

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white divide-y divide-gray-100'>
        <thead className='bg-gray-50'>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className='text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className='bg-white divide-y divide-gray-100'>
          {data.map((r, i) => (
            <tr key={r.id || i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {columns.map((col, idx) => (
                <td key={idx} className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                  {col.accessor === 'actions' ? (
                    <>
                      <button className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-colors'>
                        <Pencil size={16} />
                      </button>
                      <button className='ml-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors'>
                        <Trash2 size={16} />
                      </button>
                    </>
                  ) : (
                    r[col.accessor]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Full sample results data for all roles to filter from
function sampleResults() {
  return [
    { id: 1, subject: 'Math', studentName: 'John Smith', studentId: 'STD001', score: 90, teacherName: 'Mr. Johnson', teacherId: 'TCH001', className: '1A', date: '2025-01-01' },
    { id: 2, subject: 'English', studentName: 'John Smith', studentId: 'STD001', score: 85, teacherName: 'Ms. Williams', teacherId: 'TCH002', className: '1A', date: '2025-01-02' },
    { id: 3, subject: 'Science', studentName: 'Alice Green', studentId: 'STD002', score: 92, teacherName: 'Mr. Johnson', teacherId: 'TCH001', className: '2B', date: '2025-01-01' },
    { id: 4, subject: 'Social Studies', studentName: 'Alice Green', studentId: 'STD002', score: 88, teacherName: 'Ms. Davis', teacherId: 'TCH003', className: '2B', date: '2025-01-02' },
    { id: 5, subject: 'Art', studentName: 'Bob White', studentId: 'STD003', score: 95, teacherName: 'Ms. Garcia', teacherId: 'TCH004', className: '3C', date: '2025-01-03' },
    { id: 6, subject: 'Music', studentName: 'Bob White', studentId: 'STD003', score: 78, teacherName: 'Mr. Martinez', teacherId: 'TCH005', className: '3C', date: '2025-01-04' },
    { id: 7, subject: 'History', studentName: 'John Smith', studentId: 'STD001', score: 80, teacherName: 'Mr. Johnson', teacherId: 'TCH001', className: '1A', date: '2025-01-03' },
    { id: 8, subject: 'Geography', studentName: 'Alice Green', studentId: 'STD002', score: 91, teacherName: 'Ms. Williams', teacherId: 'TCH002', className: '2B', date: '2025-01-04' },
    { id: 9, subject: 'Physics', studentName: 'Bob White', studentId: 'STD003', score: 87, teacherName: 'Ms. Davis', teacherId: 'TCH003', className: '3C', date: '2025-01-05' },
    { id: 10, subject: 'Chemistry', studentName: 'John Smith', studentId: 'STD001', score: 93, teacherName: 'Ms. Garcia', teacherId: 'TCH004', className: '1A', date: '2025-01-06' },
    // Add more sample data with different studentIds and teacherIds as needed
  ];
}