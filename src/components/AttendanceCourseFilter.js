// src/components/AttendanceCourseFilter.js
"use client";

import { ChevronDown, ChevronUp, BookOpen, Users, Tag } from 'lucide-react';
import { useState } from 'react';

export default function AttendanceCourseFilter() {
  const [openSections, setOpenSections] = useState({
    course: true,
    subject: true,
    group: true,
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Sample data for demonstration
  const courses = [
    { id: 'c1', name: 'Diploma of Accounting (NIV)', code: 'DIP001' },
    { id: 'c2', name: 'Bachelor of Business (ACC)', code: 'BAC001' },
  ];
  const subjects = [
    { id: 's1', name: 'Subject B (BMIS)', code: 'BMIS01' },
    { id: 's2', name: 'Subject A (BMIS)', code: 'BMIS02' },
    { id: 's3', name: 'Web Dev Basics', code: 'WEB001' },
  ];
  const groups = [
    { id: 'g1', name: 'Group B', code: 'GRPB' },
    { id: 'g2', name: 'Group A', code: 'GRPA' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 space-y-6">
      <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
        <BookOpen size={20} />
        <span>Course</span>
      </div>

      <div className="space-y-4">
        {/* Course Section */}
        <div className="border-b border-gray-100 pb-4">
          <button
            onClick={() => toggleSection('course')}
            className="flex justify-between items-center w-full text-left text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
          >
            Course
            {openSections.course ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {openSections.course && (
            <div className="mt-2 space-y-1">
              {courses.map(course => (
                <div key={course.id} className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 cursor-pointer">
                  <input type="radio" name="courseFilter" id={`course-${course.id}`} className="form-radio text-purple-600" />
                  <label htmlFor={`course-${course.id}`}>{course.name} ({course.code})</label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Subject Section */}
        <div className="border-b border-gray-100 pb-4">
          <button
            onClick={() => toggleSection('subject')}
            className="flex justify-between items-center w-full text-left text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
          >
            Subject
            {openSections.subject ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {openSections.subject && (
            <div className="mt-2 space-y-1">
              {subjects.map(subject => (
                <div key={subject.id} className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 cursor-pointer">
                  <input type="radio" name="subjectFilter" id={`subject-${subject.id}`} className="form-radio text-purple-600" />
                  <label htmlFor={`subject-${subject.id}`}>{subject.name} ({subject.code})</label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Group Section */}
        <div>
          <button
            onClick={() => toggleSection('group')}
            className="flex justify-between items-center w-full text-left text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
          >
            Group
            {openSections.group ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {openSections.group && (
            <div className="mt-2 space-y-1">
              {groups.map(group => (
                <div key={group.id} className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 cursor-pointer">
                  <input type="radio" name="groupFilter" id={`group-${group.id}`} className="form-radio text-purple-600" />
                  <label htmlFor={`group-${group.id}`}>{group.name} ({group.code})</label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}