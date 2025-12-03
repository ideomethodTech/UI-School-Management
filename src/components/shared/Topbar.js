"use client";

import { Search, MessageSquare, Bell, ChevronDown, School, X } from 'lucide-react';
import Avatar from '@/components/shared/Avatar';
import { useUser } from '@/contexts/UserContext';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';


// Mock data for announcements
const announcementsData = [
  { id: 1, title: 'Annual Sports Day - December 28', content: 'All students are requested to participate in the sports day.', date: 'Dec 10' },
  { id: 2, title: 'Winter Break Extended', content: 'Winter break extended till January 8, 2025.', date: 'Dec 8' },
  { id: 3, title: 'Science Fair Registration Open', content: 'Register for the inter-school science fair by December 20.', date: 'Dec 5' },
];


const AnnouncementsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Announcements</h2>
            <p className="text-sm text-gray-500">Latest announcements and notifications</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-gray-500 bg-gray-100 hover:bg-gray-200 border border-gray-200">
            <X size={20} />
          </button>
        </div>
        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {announcementsData.map(announcement => (
            <div key={announcement.id} className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
              <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
              <p className="text-xs text-gray-400 text-right mt-2">{announcement.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};




export default function Topbar() {
  const { currentUserRole, setCurrentUserRole } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [announcementsOpen, setAnnouncementsOpen] = useState(false); // State for announcements modal
  const dropdownRef = useRef(null);
  const router = useRouter();

  const userDisplayNames = {
    admin: 'Admin',
    teacher: 'Teacher',
    student: 'Student',
    parent: 'Parent',
  };

  const currentUserName = userDisplayNames[currentUserRole] || 'Guest User';

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);


  const handleRoleChange = (newRole) => {
    setCurrentUserRole(newRole);
    setDropdownOpen(false);
    router.push('/dashboard/home');
  };

  return (
    <>
      <header className='bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm'>
        <div className='flex items-center gap-4'>
          <div className="flex lg:hidden items-center gap-3">
            <School size={28} className="text-purple-600" />
            <div className="font-semibold text-xl text-gray-800">School</div>
          </div>
          <div className='relative hidden md:block'>
            <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
            <input
              placeholder='Search School Management...'
              className='rounded-full border border-gray-300 pl-10 pr-4 py-2 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 w-64'
            />
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <button className='p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors'>
            <MessageSquare size={20} />
          </button>
          <div className='relative'>
            {/* Bell button now opens the modal */}
            <button
              onClick={() => setAnnouncementsOpen(true)}
              className='p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors'
            >
              <Bell size={20} />
            </button>
            <span className='absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white'></span>
          </div>

          <div className='flex items-center gap-2 relative' ref={dropdownRef}>
            <Avatar src={`https://api.dicebear.com/7.x/initials/svg?seed=${currentUserName}`} name={currentUserName} />
            <div className='hidden sm:block'>
              <div className='font-medium text-gray-800 text-sm'>{currentUserName.split('(')[0].trim()}</div>
              <div className='text-xs text-gray-500'>{currentUserRole.charAt(0).toUpperCase() + currentUserRole.slice(1)}</div>
            </div>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className='p-1 rounded-full text-gray-500 hover:bg-gray-100 transition-colors'
            >
              <ChevronDown size={16} />
            </button>

            {dropdownOpen && (
              <div className='absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10'>
                <div className='py-1'>
                  <div className='block px-4 py-2 text-xs text-gray-400'>Switch Role</div>
                  {Object.keys(userDisplayNames).map((role) => (
                    <button
                      key={role}
                      onClick={() => handleRoleChange(role)}
                      className={`block w-full text-left px-4 py-2 text-sm ${currentUserRole === role ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                      {userDisplayNames[role]}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Render the modal */}
      <AnnouncementsModal isOpen={announcementsOpen} onClose={() => setAnnouncementsOpen(false)} />
    </>
  );
}