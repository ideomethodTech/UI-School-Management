// src/components/ProfileDetails.js
"use client";

import { useUser } from '@/contexts/UserContext';
import Avatar from './Avatar';
// ADD Users HERE
import { Mail, Phone, MapPin, Briefcase, CalendarDays, BookOpen, Users } from 'lucide-react';
import { useState } from 'react';

export default function ProfileDetails() {
  const { currentUserRole } = useUser();
  const [editMode, setEditMode] = useState(false); // For future edit functionality

  // Sample data based on role
  const getUserProfileData = (role) => {
    switch (role) {
      case 'admin':
        return {
          name: 'Admin',
          email: 'admin@school.com',
          phone: '+1 (555) 123-4567',
          address: '789 Admin Way, City, Country',
          role: 'Administrator',
          department: 'Management',
          joined: '2020-03-15',
          avatarSrc: 'https://api.dicebear.com/7.x/initials/svg?seed=AkshatMaheshwari',
        };
      case 'teacher':
        return {
          name: 'Jane Doe',
          email: 'jane.doe@school.com',
          phone: '+1 (555) 987-6543',
          address: '456 Teacher Lane, City, Country',
          role: 'Teacher',
          subjects: 'Mathematics, Physics',
          classes: 'Grade 9, Grade 10',
          joined: '2021-09-01',
          avatarSrc: 'https://api.dicebear.com/7.x/initials/svg?seed=JaneDoe',
        };
      case 'student':
        return {
          name: 'John Smith',
          email: 'john.smith@school.com',
          phone: '+1 (555) 567-8901',
          address: '101 Student Dorm, City, Country',
          role: 'Student',
          grade: '10',
          class: '10B',
          enrolled: '2022-08-20',
          avatarSrc: 'https://api.dicebear.com/7.x/initials/svg?seed=JohnSmith',
        };
      case 'parent': // Example for parent
        return {
          name: 'Maria Lee',
          email: 'maria.lee@email.com',
          phone: '+1 (555) 234-5678',
          address: '321 Parent Home, City, Country',
          role: 'Parent',
          children: ['John Lee (Grade 5)', 'Sarah Lee (Grade 2)'],
          avatarSrc: 'https://api.dicebear.com/7.x/initials/svg?seed=MariaLee',
        };
      default:
        return {
          name: 'Guest User',
          email: 'guest@school.com',
          role: 'Guest',
          avatarSrc: 'https://api.dicebear.com/7.x/initials/svg?seed=GuestUser',
        };
    }
  };

  const profile = getUserProfileData(currentUserRole);

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
          <h2 className='text-2xl font-semibold text-gray-800'>My Profile</h2>
          {/*
          <button
            onClick={() => setEditMode(!editMode)}
            className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors text-sm shadow-md"
          >
            {editMode ? 'Save Changes' : 'Edit Profile'}
          </button>
          */}
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <Avatar src={profile.avatarSrc} name={profile.name} size="large" className="w-24 h-24 md:w-32 md:h-32 text-4xl" />
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-bold text-gray-900">{profile.name}</h3>
            <p className="text-lg text-purple-600 font-medium">{profile.role}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100 pt-6">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail size={20} className="text-gray-500" />
            <span>Email: <span className="font-medium">{profile.email}</span></span>
          </div>
          {profile.phone && (
            <div className="flex items-center gap-3 text-gray-700">
              <Phone size={20} className="text-gray-500" />
              <span>Phone: <span className="font-medium">{profile.phone}</span></span>
            </div>
          )}
          {profile.address && (
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin size={20} className="text-gray-500" />
              <span>Address: <span className="font-medium">{profile.address}</span></span>
            </div>
          )}
          {profile.department && (
            <div className="flex items-center gap-3 text-gray-700">
              <Briefcase size={20} className="text-gray-500" />
              <span>Department: <span className="font-medium">{profile.department}</span></span>
            </div>
          )}
          {profile.subjects && (
            <div className="flex items-center gap-3 text-gray-700">
              <BookOpen size={20} className="text-gray-500" />
              <span>Subjects: <span className="font-medium">{profile.subjects}</span></span>
            </div>
          )}
          {profile.classes && (
            <div className="flex items-center gap-3 text-gray-700">
              <Users size={20} className="text-gray-500" />
              <span>Classes: <span className="font-medium">{profile.classes}</span></span>
            </div>
          )}
          {profile.grade && (
            <div className="flex items-center gap-3 text-gray-700">
              <Users size={20} className="text-gray-500" /> {/* Reusing Users icon */}
              <span>Grade: <span className="font-medium">{profile.grade}</span></span>
            </div>
          )}
          {profile.class && (
            <div className="flex items-center gap-3 text-gray-700">
              <Users size={20} className="text-gray-500" />
              <span>Class: <span className="font-medium">{profile.class}</span></span>
            </div>
          )}
          {(profile.joined || profile.enrolled) && (
            <div className="flex items-center gap-3 text-gray-700">
              <CalendarDays size={20} className="text-gray-500" />
              <span>{profile.joined ? 'Joined On:' : 'Enrolled On:'} <span className="font-medium">{profile.joined || profile.enrolled}</span></span>
            </div>
          )}
          {profile.children && (
            <div className="flex flex-col col-span-1 md:col-span-2 gap-2 text-gray-700">
              <div className="flex items-center gap-3">
                <Users size={20} className="text-gray-500" />
                <span className="font-medium">Children:</span>
              </div>
              <ul className="list-disc list-inside ml-6 text-sm">
                {profile.children.map((child, index) => (
                  <li key={index}>{child}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}