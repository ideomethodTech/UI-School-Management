// src/components/Topbar.js
"use client"; // Needs to be a client component to use `useUser` context

import { Search, MessageSquare, Bell, ChevronDown, School } from 'lucide-react';
import Avatar from './Avatar';
import { useUser } from '@/contexts/UserContext'; // Import useUser hook
import { useState, useRef, useEffect } from 'react'; // Import hooks for dropdown

export default function Topbar() {
  const { currentUserRole, setCurrentUserRole } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const userDisplayNames = {
    admin: 'Admin',
    teacher: 'Teacher',
    student: 'Student',
    parent: 'Parent', // Example for a parent role
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);


  const handleRoleChange = (newRole) => {
    setCurrentUserRole(newRole);
    setDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <header className='bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm'>
      <div className='flex items-center gap-4'>
        {/* Only show "School" logo on mobile/smaller screens where sidebar is hidden */}
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
          <button className='p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors'>
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
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      currentUserRole === role ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-100'
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
  );
}