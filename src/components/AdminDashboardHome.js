// src/components/AdminDashboardHome.js

import { useState } from 'react';
// Make sure you have react-icons installed: npm install react-icons
import {
  FiUsers, FiActivity, FiGrid, FiTrendingUp,
  FiPlus, FiCalendar, FiFileText, FiAlertCircle, FiUsers as FiUserGroup,
  FiX, FiClock
} from 'react-icons/fi';

// --- Reusable Generic Modal Component ---
const Modal = ({ children, onClose, size = 'lg' }) => {
  const sizeClass = size === '2xl' ? 'max-w-2xl' : 'max-w-lg';
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className={`bg-white rounded-xl shadow-2xl p-8 w-full ${sizeClass} relative`} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><FiX size={24} /></button>
        {children}
      </div>
    </div>
  );
};

// --- Form and Detail Modal Components ---

// (Forms for Quick Actions remain the same)
const AddStudentForm = ({ onClose }) => { /* ... Form JSX ... */ return (<form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="space-y-6"><div><h2 className="text-2xl font-bold text-gray-800">Add New Student</h2><p className="text-gray-500 mt-1">Enter the details of the new student to register them in the system.</p></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-gray-700">First Name</label><input type="text" placeholder="John" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" /></div><div><label className="block text-sm font-medium text-gray-700">Last Name</label><input type="text" placeholder="Doe" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" /></div><div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700">Email</label><input type="email" placeholder="john@example.com" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" /></div><div><label className="block text-sm font-medium text-gray-700">Roll Number</label><input type="text" placeholder="101" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" /></div><div><label className="block text-sm font-medium text-gray-700">Class</label><input type="text" placeholder="10-A" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" /></div><div className="md:col-span-2 relative"><label className="block text-sm font-medium text-gray-700">Date of Birth</label><input type="text" placeholder="dd-mm-yyyy" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" /><FiCalendar className="absolute right-3 top-9 text-gray-400" /></div></div><div className="flex justify-end gap-4"><button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50">Cancel</button><button type="submit" className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">Add Student</button></div></form>); };
const AddTeacherForm = ({ onClose }) => { /* ... Form JSX ... */ return (<form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="space-y-6"><div><h2 className="text-2xl font-bold text-gray-800">Add New Teacher</h2><p className="text-gray-500 mt-1">Enter the details of the new teacher to add them to the system.</p></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-gray-700">First Name</label><input type="text" placeholder="Jane" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" /></div><div><label className="block text-sm font-medium text-gray-700">Last Name</label><input type="text" placeholder="Smith" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" /></div><div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700">Email</label><input type="email" placeholder="jane@example.com" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" /></div><div><label className="block text-sm font-medium text-gray-700">Subject</label><input type="text" placeholder="Mathematics" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" /></div><div><label className="block text-sm font-medium text-gray-700">Employee ID</label><input type="text" placeholder="EMP001" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" /></div><div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700">Qualifications</label><input type="text" placeholder="B.Sc, B.Ed" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" /></div></div><div className="flex justify-end gap-4"><button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50">Cancel</button><button type="submit" className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700">Add Teacher</button></div></form>); };
const ScheduleEventForm = ({ onClose }) => { /* ... Form JSX ... */ return (<form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="space-y-6"><div><h2 className="text-2xl font-bold text-gray-800">Schedule Event</h2><p className="text-gray-500 mt-1">Create a new event for your school.</p></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700">Event Name</label><input type="text" placeholder="Annual Sports Day" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" /></div><div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700">Description</label><textarea placeholder="Brief description of the event" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" rows="2"></textarea></div><div className="relative"><label className="block text-sm font-medium text-gray-700">Date</label><input type="text" placeholder="dd-mm-yyyy" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" /><FiCalendar className="absolute right-3 top-9 text-gray-400" /></div><div className="relative"><label className="block text-sm font-medium text-gray-700">Time</label><input type="text" placeholder="--:--" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" /><FiClock className="absolute right-3 top-9 text-gray-400" /></div><div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700">Location</label><input type="text" placeholder="Main ground" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" /></div></div><div className="flex justify-end gap-4"><button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50">Cancel</button><button type="submit" className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700">Schedule Event</button></div></form>); };
const CreateAssignmentForm = ({ onClose }) => { /* ... Form JSX ... */ return (<form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="space-y-6"><div><h2 className="text-2xl font-bold text-gray-800">Create Assignment</h2><p className="text-gray-500 mt-1">Create a new assignment for your students.</p></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700">Assignment Title</label><input type="text" placeholder="Chapter 5: Practice Problems" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" /></div><div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700">Description</label><textarea placeholder="Assignment details" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" rows="2"></textarea></div><div><label className="block text-sm font-medium text-gray-700">Class</label><input type="text" placeholder="10-A" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" /></div><div><label className="block text-sm font-medium text-gray-700">Subject</label><input type="text" placeholder="Mathematics" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" /></div><div className="relative"><label className="block text-sm font-medium text-gray-700">Due Date</label><input type="text" placeholder="dd-mm-yyyy" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" /><FiCalendar className="absolute right-3 top-9 text-gray-400" /></div><div><label className="block text-sm font-medium text-gray-700">Total Marks</label><input type="number" placeholder="100" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" /></div></div><div className="flex justify-end gap-4"><button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50">Cancel</button><button type="submit" className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700">Create Assignment</button></div></form>); };


// --- Modal Content Components ---

const AllTasksModal = ({ tasks, priorityStyles }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">All Pending Tasks</h2>
      {/* ADDED pr-4 for scrollbar spacing */}
      <div className="space-y-4 pt-2 max-h-96 overflow-y-auto pr-4">
        {tasks.map((task, index) => (
          <div key={index} className="flex justify-between items-center border-t pt-4">
            <div>
              <h4 className="font-semibold text-gray-700 flex items-center">{task.title}<span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${priorityStyles[task.priority]}`}>{task.priority}</span></h4>
              <p className="text-sm text-gray-500">{task.description}</p>
            </div>
            <p className="text-sm text-gray-500 text-right shrink-0 ml-4">{task.dueDate}</p>
          </div>
        ))}
      </div>
      {/* REMOVED Close button from bottom */}
    </div>
  );
};

const ClassPerformanceDetailsModal = ({ performanceData, statusStyles }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Detailed Class Performance</h2>
      <div className="overflow-x-auto max-h-96">
        <table className="w-full text-left">
          <thead><tr className="text-sm text-gray-500 font-medium border-b"><th className="py-2 px-4">Class</th><th className="py-2 px-4">Students</th><th className="py-2 px-4">Avg Score</th><th className="py-2 px-4">Teacher</th><th className="py-2 px-4">Attendance</th><th className="py-2 px-4">Status</th></tr></thead>
          <tbody>
            {performanceData.map((cls, index) => (
              <tr key={index} className="border-b last:border-none">
                <td className="py-4 px-4 font-medium text-gray-800">{cls.name}</td><td className="py-4 px-4 text-gray-600">{cls.students}</td><td className="py-4 px-4 font-semibold text-gray-800">{cls.avgScore}</td><td className="py-4 px-4 text-gray-600">{cls.teacher}</td><td className="py-4 px-4 text-gray-600">{cls.attendance}</td><td className="py-4 px-4"><span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[cls.status]}`}>{cls.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* REMOVED Close button from bottom */}
    </div>
  );
};


// --- Main Admin Dashboard Component ---

function StatCard({ title, value, change, icon: Icon, iconBgColor }) {
  return (<div className="bg-white p-6 rounded-lg shadow flex justify-between items-center"><div><p className="text-sm font-medium text-gray-500">{title}</p><p className="text-3xl font-bold text-gray-800 mt-1">{value}</p><p className="text-sm text-gray-500 mt-2">{change}</p></div><div className={`p-4 rounded-lg ${iconBgColor}`}><Icon className="h-6 w-6 text-white" /></div></div>);
}

export default function AdminDashboardHome() {
  const [activeModal, setActiveModal] = useState(null);

  // --- Expanded Data and Styling Helpers ---
  const allPendingTasks = [
    { title: 'Review Exam Results', description: 'Math final exam results need review', priority: 'high', dueDate: 'Today' }, { title: 'Approve New Teachers', description: '3 new teacher registrations pending', priority: 'medium', dueDate: 'Tomorrow' }, { title: 'Update Class Schedule', description: 'Schedule changes for next semester', priority: 'medium', dueDate: 'Dec 15' }, { title: 'Parent Portal Maintenance', description: 'System maintenance scheduled', priority: 'low', dueDate: 'Dec 20' }, { title: 'Finalize Event Budget', description: 'Budget for Annual Day needs approval', priority: 'high', dueDate: 'Dec 22' }, { title: 'Order Library Books', description: 'New curriculum books are pending order', priority: 'low', dueDate: 'Dec 28' },
  ];
  const detailedClassPerformance = [
    { name: 'Grade 10-A', students: 45, avgScore: '78.5%', status: 'Good', teacher: 'Mr. Smith', attendance: '95%' }, { name: 'Grade 10-B', students: 42, avgScore: '82.3%', status: 'Excellent', teacher: 'Ms. Jones', attendance: '97%' }, { name: 'Grade 9-A', students: 48, avgScore: '75.2%', status: 'Good', teacher: 'Mr. Davis', attendance: '92%' }, { name: 'Grade 9-B', students: 46, avgScore: '79.8%', status: 'Good', teacher: 'Mrs. Wilson', attendance: '94%' }, { name: 'Grade 8-A', students: 50, avgScore: '68.1%', status: 'Needs Improvement', teacher: 'Mr. Brown', attendance: '88%' },
  ];
  const recentNotices = [
    { icon: FiAlertCircle, color: 'text-orange-500', title: 'Important Notice', description: 'Annual examination schedule released', time: '2 hours ago' }, { icon: FiCalendar, color: 'text-blue-500', title: 'Event Updated', description: 'Winter break dates have been modified', time: '5 hours ago' }, { icon: FiUserGroup, color: 'text-green-500', title: 'New Enrollment', description: '15 new students enrolled this week', time: '1 day ago' },
  ];
  const systemStatusData = [
    { label: 'Server Status', status: 'Operational', color: 'bg-green-500' }, { label: 'Database', status: 'Connected', color: 'bg-green-500' }, { label: 'Backup Status', status: 'In Progress', color: 'bg-yellow-500' },
  ];
  const priorityStyles = { high: 'bg-red-100 text-red-700', medium: 'bg-yellow-100 text-yellow-700', low: 'bg-green-100 text-green-700' };
  const statusStyles = { Good: 'bg-blue-100 text-blue-700', Excellent: 'bg-green-100 text-green-700', 'Needs Improvement': 'bg-red-100 text-red-700' };

  return (
    <>
      <div className='space-y-6'>
        {/* Header */}
        <div><h1 className='text-3xl font-bold text-gray-800'>Welcome Back, Admin!</h1><p className='text-gray-500 mt-1'>Manage your school operations efficiently</p></div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <StatCard title="Total Students" value="1,234" change="+12% from last month" icon={FiUsers} iconBgColor="bg-blue-500" />
          <StatCard title="Active Teachers" value="89" change="+5% from last month" icon={FiActivity} iconBgColor="bg-teal-500" />
          <StatCard title="Attendance Rate" value="94%" change="+2% from last month" icon={FiTrendingUp} iconBgColor="bg-purple-500" />
          <StatCard title="Active Classes" value="45" change="Across 8 grades" icon={FiGrid} iconBgColor="bg-green-500" />
        </div>

        {/* Main Content */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2"><h3 className="text-xl font-semibold text-gray-800">Pending Tasks</h3><button onClick={() => setActiveModal('viewAllTasks')} className="text-sm font-medium text-purple-600 hover:underline">View All &rarr;</button></div>
              <div className="space-y-4 pt-2">{allPendingTasks.slice(0, 4).map((task, index) => (<div key={index} className="flex justify-between items-center border-t pt-4"><div><h4 className="font-semibold text-gray-700 flex items-center">{task.title}<span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${priorityStyles[task.priority]}`}>{task.priority}</span></h4><p className="text-sm text-gray-500">{task.description}</p></div><p className="text-sm text-gray-500 text-right shrink-0">{task.dueDate}</p></div>))}</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-gray-800">Class Performance Overview</h3><button onClick={() => setActiveModal('classPerformanceDetails')} className="text-sm font-medium text-purple-600 hover:underline flex items-center">More Details &rarr;</button></div>
              <div className="overflow-x-auto"><table className="w-full text-left"><thead><tr className="text-sm text-gray-500 font-medium border-b"><th className="py-2 px-4">Class</th><th className="py-2 px-4">Students</th><th className="py-2 px-4">Avg Score</th><th className="py-2 px-4">Status</th></tr></thead><tbody>{detailedClassPerformance.slice(0, 4).map((cls, index) => (<tr key={index} className="border-b last:border-none"><td className="py-4 px-4 font-medium text-gray-800">{cls.name}</td><td className="py-4 px-4 text-gray-600">{cls.students}</td><td className="py-4 px-4 font-semibold text-gray-800">{cls.avgScore}</td><td className="py-4 px-4"><span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[cls.status]}`}>{cls.status}</span></td></tr>))}</tbody></table></div>
            </div>
          </div>
          {/* Right Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button onClick={() => setActiveModal('addStudent')} className="w-full flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg"><FiPlus className="mr-3" /> Add New Student</button>
                <button onClick={() => setActiveModal('addTeacher')} className="w-full flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg"><FiPlus className="mr-3" /> Add New Teacher</button>
                <button onClick={() => setActiveModal('scheduleEvent')} className="w-full flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg"><FiCalendar className="mr-3" /> Schedule Event</button>
                <button onClick={() => setActiveModal('createAssignment')} className="w-full flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg"><FiFileText className="mr-3" /> Create Assignment</button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Notices</h3>
              <div className="space-y-4">{recentNotices.map((notice, index) => (<div key={index} className="flex items-start"><notice.icon className={`h-5 w-5 mr-3 mt-1 shrink-0 ${notice.color}`} /><div><h4 className="font-semibold text-gray-700">{notice.title}</h4><p className="text-sm text-gray-500">{notice.description}</p><p className="text-xs text-gray-400 mt-1">{notice.time}</p></div></div>))}</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow" style={{ backgroundColor: '#F8F7FF' }}>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">System Status</h3>
              <div className="space-y-3">{systemStatusData.map((item, index) => (<div key={index} className="flex justify-between items-center text-gray-600"><span>{item.label}</span><div className="flex items-center"><span className={`w-2.5 h-2.5 rounded-full mr-2 ${item.color}`}></span><span className="font-medium">{item.status}</span></div></div>))}</div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL RENDERING LOGIC --- */}
      {activeModal === 'addStudent' && <Modal onClose={() => setActiveModal(null)}><AddStudentForm onClose={() => setActiveModal(null)} /></Modal>}
      {activeModal === 'addTeacher' && <Modal onClose={() => setActiveModal(null)}><AddTeacherForm onClose={() => setActiveModal(null)} /></Modal>}
      {activeModal === 'scheduleEvent' && <Modal onClose={() => setActiveModal(null)}><ScheduleEventForm onClose={() => setActiveModal(null)} /></Modal>}
      {activeModal === 'createAssignment' && <Modal onClose={() => setActiveModal(null)}><CreateAssignmentForm onClose={() => setActiveModal(null)} /></Modal>}

      {activeModal === 'viewAllTasks' && <Modal onClose={() => setActiveModal(null)}><AllTasksModal tasks={allPendingTasks} priorityStyles={priorityStyles} /></Modal>}
      {activeModal === 'classPerformanceDetails' && <Modal onClose={() => setActiveModal(null)} size="2xl"><ClassPerformanceDetailsModal performanceData={detailedClassPerformance} statusStyles={statusStyles} /></Modal>}
    </>
  );
}