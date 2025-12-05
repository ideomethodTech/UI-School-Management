'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  FiUsers, FiActivity, FiGrid, FiTrendingUp,
  FiPlus, FiCalendar, FiFileText, FiAlertCircle, FiUsers as FiUserGroup,
  FiX, FiClock, FiUpload
} from 'react-icons/fi';
import { useData } from '@/contexts/DataContext';
import { allPendingTasks, detailedClassPerformance, recentNotices, systemStatusData } from '../../mockData/adminData';

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

// --- Form Components ---
const AddStudentForm = ({ onClose, onAddStudent }) => {
  const [formState, setFormState] = useState({ name: '', id: '', grade: '', phone: '', email: '', avatar: '' });
  const [photoPreview, setPhotoPreview] = useState('');

  const handleInputChange = (e) => setFormState(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setFormState(prevState => ({ ...prevState, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.id.trim()) return alert('Student Name and Student ID are required.');
    const newStudent = { ...formState, avatar: formState.avatar || `https://i.pravatar.cc/40?u=${formState.id}` };
    onAddStudent(newStudent);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div><h2 className="text-2xl font-bold text-gray-800">Create New Student</h2></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label><input name="name" type="text" value={formState.name} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label><input name="id" type="text" value={formState.id} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Grade</label><input name="grade" type="text" value={formState.grade} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input name="phone" type="tel" value={formState.phone} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input name="email" type="email" value={formState.email} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo (optional)</label>
        <div className="flex items-center gap-4">
          {photoPreview && (<Image src={photoPreview} alt="Preview" width={60} height={60} className="rounded-full object-cover" />)}
          <label className="flex-1 cursor-pointer">
            <div className="w-full p-2 border border-dashed border-gray-300 rounded-md hover:border-purple-400 flex items-center justify-center gap-2 text-gray-600 hover:text-purple-600">
              <FiUpload size={18} />
              <span className="text-sm">{photoPreview ? 'Change Photo' : 'Choose Photo'}</span>
            </div>
            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
          </label>
        </div>
      </div>
      <div className="flex justify-end gap-4 pt-4"><button type="button" onClick={onClose} className="px-6 py-2 border rounded-lg text-gray-700 font-semibold hover:bg-gray-100">Cancel</button><button type="submit" className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700">Create</button></div>
    </form>
  );
};

const AddTeacherForm = ({ onClose, onAddTeacher }) => {
  const [formState, setFormState] = useState({ name: '', id: '', subjects: '', classes: '', phone: '', email: '', avatar: '' });
  const [photoPreview, setPhotoPreview] = useState('');

  const handleInputChange = (e) => setFormState(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setFormState(prevState => ({ ...prevState, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.id.trim()) return alert('Teacher Name and Teacher ID are required.');
    const newTeacher = {
      ...formState,
      subjects: formState.subjects.split(',').map(s => s.trim()),
      classes: formState.classes.split(',').map(c => c.trim()),
      avatar: formState.avatar || `https://i.pravatar.cc/150?u=${formState.id}`,
    };
    onAddTeacher(newTeacher);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div><h2 className="text-2xl font-bold text-gray-800">Create New Teacher</h2></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Teacher Name</label><input name="name" type="text" value={formState.name} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Teacher ID</label><input name="id" type="text" value={formState.id} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Subjects (comma separated)</label><input name="subjects" type="text" value={formState.subjects} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Classes (comma separated)</label><input name="classes" type="text" value={formState.classes} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input name="phone" type="tel" value={formState.phone} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input name="email" type="email" value={formState.email} onChange={handleInputChange} className="w-full p-2 border rounded-md" /></div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo (optional)</label>
        <div className="flex items-center gap-4">
          {photoPreview && (<Image src={photoPreview} alt="Preview" width={60} height={60} className="rounded-full object-cover" />)}
          <label className="flex-1 cursor-pointer">
            <div className="w-full p-2 border border-dashed border-gray-300 rounded-md hover:border-purple-400 flex items-center justify-center gap-2 text-gray-600 hover:text-purple-600">
              <FiUpload size={18} />
              <span className="text-sm">{photoPreview ? 'Change Photo' : 'Choose Photo'}</span>
            </div>
            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
          </label>
        </div>
      </div>
      <div className="flex justify-end gap-4 pt-4"><button type="button" onClick={onClose} className="px-6 py-2 border rounded-lg text-gray-700 font-semibold hover:bg-gray-100">Cancel</button><button type="submit" className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700">Create</button></div>
    </form>
  );
};

const ScheduleEventForm = ({ onClose, onAddEvent }) => {
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '10:00',
    endTime: '11:00',
    location: '',
    class: 'All Classes'
  });

  const handleInputChange = (e) => setFormState(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.title.trim()) return alert('Event Name is required.');

    const newEvent = {
      id: Date.now(),
      ...formState
    };
    onAddEvent(newEvent);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div><h2 className="text-2xl font-bold text-gray-800">Schedule Event</h2><p className="text-gray-500 mt-1">Create a new event for your school.</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700">Event Name</label><input name="title" type="text" value={formState.title} onChange={handleInputChange} placeholder="Annual Sports Day" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" required /></div>
        <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700">Description</label><textarea name="description" value={formState.description} onChange={handleInputChange} placeholder="Brief description of the event" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" rows="2"></textarea></div>
        <div className="relative"><label className="block text-sm font-medium text-gray-700">Date</label><input name="date" type="date" value={formState.date} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" required /><FiCalendar className="absolute right-3 top-9 text-gray-400 pointer-events-none" /></div>
        <div className="relative"><label className="block text-sm font-medium text-gray-700">Time</label><input name="startTime" type="time" value={formState.startTime} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" /><FiClock className="absolute right-3 top-9 text-gray-400 pointer-events-none" /></div>
        <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700">Location</label><input name="location" type="text" value={formState.location} onChange={handleInputChange} placeholder="Main ground" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" /></div>
      </div>
      <div className="flex justify-end gap-4"><button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50">Cancel</button><button type="submit" className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700">Schedule Event</button></div>
    </form>
  );
};

const CreateAssignmentForm = ({ onClose, onAddAssignment }) => {
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    class: '',
    subject: '',
    dueDate: new Date().toISOString().split('T')[0],
    totalMarks: '100'
  });

  const handleInputChange = (e) => setFormState(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.title.trim() || !formState.class.trim() || !formState.subject.trim()) {
      return alert('Assignment Title, Class, and Subject are required.');
    }

    const newAssignment = {
      id: Date.now(),
      ...formState,
      teacher: 'Admin'
    };
    onAddAssignment(newAssignment);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div><h2 className="text-2xl font-bold text-gray-800">Create Assignment</h2><p className="text-gray-500 mt-1">Create a new assignment for your students.</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700">Assignment Title</label><input name="title" type="text" value={formState.title} onChange={handleInputChange} placeholder="Chapter 5: Practice Problems" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" required /></div>
        <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700">Description</label><textarea name="description" value={formState.description} onChange={handleInputChange} placeholder="Assignment details" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" rows="2"></textarea></div>
        <div><label className="block text-sm font-medium text-gray-700">Class</label><input name="class" type="text" value={formState.class} onChange={handleInputChange} placeholder="10-A" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" required /></div>
        <div><label className="block text-sm font-medium text-gray-700">Subject</label><input name="subject" type="text" value={formState.subject} onChange={handleInputChange} placeholder="Mathematics" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" required /></div>
        <div className="relative"><label className="block text-sm font-medium text-gray-700">Due Date</label><input name="dueDate" type="date" value={formState.dueDate} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" required /><FiCalendar className="absolute right-3 top-9 text-gray-400 pointer-events-none" /></div>
        <div><label className="block text-sm font-medium text-gray-700">Total Marks</label><input name="totalMarks" type="number" value={formState.totalMarks} onChange={handleInputChange} placeholder="100" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" /></div>
      </div>
      <div className="flex justify-end gap-4"><button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50">Cancel</button><button type="submit" className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700">Create Assignment</button></div>
    </form>
  );
};

// --- Modal Content Components ---
const AllTasksModal = ({ tasks, priorityStyles }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-gray-800">All Pending Tasks</h2>
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
  </div>
);

const ClassPerformanceDetailsModal = ({ performanceData, statusStyles }) => (
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
  </div>
);

// --- Main Admin Dashboard Component ---
function StatCard({ title, value, change, icon: Icon, iconBgColor, iconColor, decorColor }) {
  return (<div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"><div className={`absolute top-0 right-0 w-24 h-24 ${decorColor} rounded-bl-full opacity-50`}></div><div className="relative z-10"><div className="flex items-center justify-between mb-2"><p className="text-sm font-medium text-gray-600">{title}</p><div className={`p-2 ${iconBgColor} rounded-lg`}><Icon className={`h-5 w-5 ${iconColor}`} /></div></div><p className="text-4xl font-bold text-gray-800 mb-1">{value}</p><p className="text-xs text-gray-500">{change}</p></div></div>);
}

const iconMap = {
  FiAlertCircle,
  FiCalendar,
  FiUserGroup
};

export default function AdminDashboardHome() {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState('all');
  const { students, teachers, addStudent, addTeacher, addEvent, addAssignment } = useData();

  const priorityStyles = { high: 'bg-red-100 text-red-700', medium: 'bg-yellow-100 text-yellow-700', low: 'bg-green-100 text-green-700' };
  const statusStyles = { Good: 'bg-blue-100 text-blue-700', Excellent: 'bg-green-100 text-green-700', 'Needs Improvement': 'bg-red-100 text-red-700' };

  // Filter class performance based on selected grade
  const filteredClassPerformance = selectedGrade === 'all'
    ? detailedClassPerformance
    : detailedClassPerformance.filter(cls => cls.name.startsWith(`Grade ${selectedGrade}`));

  return (
    <>
      <div className='space-y-6'>
        <div><h1 className='text-3xl font-bold text-gray-800'>Welcome Back, Admin!</h1><p className='text-gray-500 mt-1'>Manage your school operations efficiently</p></div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <StatCard title="Total Students" value={students.length} change="+12% from last month" icon={FiUsers} iconBgColor="bg-blue-100" iconColor="text-blue-600" decorColor="bg-blue-50" />
          <StatCard title="Active Teachers" value={teachers.length} change="+5% from last month" icon={FiActivity} iconBgColor="bg-teal-100" iconColor="text-teal-600" decorColor="bg-teal-50" />
          <StatCard title="Attendance Rate" value="94%" change="+2% from last month" icon={FiTrendingUp} iconBgColor="bg-purple-100" iconColor="text-purple-600" decorColor="bg-purple-50" />
          <StatCard title="Active Classes" value="45" change="Across 8 grades" icon={FiGrid} iconBgColor="bg-green-100" iconColor="text-green-600" decorColor="bg-green-50" />
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2"><h3 className="text-xl font-semibold text-gray-800">Pending Tasks</h3><button onClick={() => setActiveModal('viewAllTasks')} className="text-sm font-medium text-purple-600 hover:underline">View All &rarr;</button></div>
              <div className="space-y-4 pt-2">{allPendingTasks.slice(0, 4).map((task, index) => (<div key={index} className="flex justify-between items-center border-t pt-4"><div><h4 className="font-semibold text-gray-700 flex items-center">{task.title}<span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${priorityStyles[task.priority]}`}>{task.priority}</span></h4><p className="text-sm text-gray-500">{task.description}</p></div><p className="text-sm text-gray-500 text-right shrink-0">{task.dueDate}</p></div>))}</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold text-gray-800">Class Performance Overview</h3>
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-500 w-32"
                  >
                    <option value="all">All Grades</option>
                    <option value="10">Grade 10</option>
                    <option value="9">Grade 9</option>
                    <option value="8">Grade 8</option>
                  </select>
                </div>
                <button onClick={() => setActiveModal('classPerformanceDetails')} className="text-sm font-medium text-purple-600 hover:underline flex items-center">More Details &rarr;</button>
              </div>
              <div className="overflow-x-auto"><table className="w-full text-left"><thead><tr className="text-sm text-gray-500 font-medium border-b"><th className="py-2 px-4">Class</th><th className="py-2 px-4">Students</th><th className="py-2 px-4">Avg Score</th><th className="py-2 px-4">Status</th></tr></thead><tbody>{filteredClassPerformance.slice(0, 4).map((cls, index) => (<tr key={index} className="border-b last:border-none"><td className="py-4 px-4 font-medium text-gray-800">{cls.name}</td><td className="py-4 px-4 text-gray-600">{cls.students}</td><td className="py-4 px-4 font-semibold text-gray-800">{cls.avgScore}</td><td className="py-4 px-4"><span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[cls.status]}`}>{cls.status}</span></td></tr>))}</tbody></table></div>
            </div>
          </div>
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
              <div className="space-y-4">
                {recentNotices.map((notice, index) => {
                  const IconComponent = iconMap[notice.iconName] || FiAlertCircle;
                  return (
                    <div key={index} className="flex items-start">
                      <IconComponent className={`h-5 w-5 mr-3 mt-1 shrink-0 ${notice.color}`} />
                      <div>
                        <h4 className="font-semibold text-gray-700">{notice.title}</h4>
                        <p className="text-sm text-gray-500">{notice.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{notice.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow" style={{ backgroundColor: '#F8F7FF' }}>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">System Status</h3>
              <div className="space-y-3">{systemStatusData.map((item, index) => (<div key={index} className="flex justify-between items-center text-gray-600"><span>{item.label}</span><div className="flex items-center"><span className={`w-2.5 h-2.5 rounded-full mr-2 ${item.color}`}></span><span className="font-medium">{item.status}</span></div></div>))}</div>
            </div>
          </div>
        </div>
      </div>

      {activeModal === 'addStudent' && <Modal onClose={() => setActiveModal(null)}><AddStudentForm onClose={() => setActiveModal(null)} onAddStudent={addStudent} /></Modal>}
      {activeModal === 'addTeacher' && <Modal onClose={() => setActiveModal(null)}><AddTeacherForm onClose={() => setActiveModal(null)} onAddTeacher={addTeacher} /></Modal>}
      {activeModal === 'scheduleEvent' && <Modal onClose={() => setActiveModal(null)}><ScheduleEventForm onClose={() => setActiveModal(null)} onAddEvent={addEvent} /></Modal>}
      {activeModal === 'createAssignment' && <Modal onClose={() => setActiveModal(null)}><CreateAssignmentForm onClose={() => setActiveModal(null)} onAddAssignment={addAssignment} /></Modal>}
      {activeModal === 'viewAllTasks' && <Modal onClose={() => setActiveModal(null)}><AllTasksModal tasks={allPendingTasks} priorityStyles={priorityStyles} /></Modal>}
      {activeModal === 'classPerformanceDetails' && <Modal onClose={() => setActiveModal(null)} size="2xl"><ClassPerformanceDetailsModal performanceData={detailedClassPerformance} statusStyles={statusStyles} /></Modal>}
    </>
  );
}