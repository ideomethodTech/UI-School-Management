// src/components/AttendanceCourseFilter.js
"use client";

import { ChevronDown, ChevronUp, GraduationCap, BookOpen } from 'lucide-react';
import { useState } from 'react';

export default function AttendanceCourseFilter({ onFilterChange }) {
  const [openSections, setOpenSections] = useState({
    class: true,
    subject: true,
  });

  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // School-appropriate data
  const classes = [
    { id: 'c1', name: 'Class 10-A', code: '10-A', students: 32 },
    { id: 'c2', name: 'Class 10-B', code: '10-B', students: 30 },
    { id: 'c3', name: 'Class 9-A', code: '9-A', students: 28 },
    { id: 'c4', name: 'Class 9-B', code: '9-B', students: 29 },
    { id: 'c5', name: 'Class 8-A', code: '8-A', students: 25 },
  ];

  const subjects = [
    { id: 's1', name: 'Mathematics', code: 'MATH', teacher: 'Priya Sharma' },
    { id: 's2', name: 'English', code: 'ENG', teacher: 'Ramesh Kumar' },
    { id: 's3', name: 'Science', code: 'SCI', teacher: 'Dr. Anjali' },
    { id: 's4', name: 'Social Studies', code: 'SS', teacher: 'Vikram Singh' },
    { id: 's5', name: 'Computer Science', code: 'CS', teacher: 'Neha Patel' },
  ];

  const handleClassChange = (classCode, className) => {
    setSelectedClass(classCode);
    if (onFilterChange) {
      onFilterChange({ class: classCode, className, subject: selectedSubject });
    }
  };

  const handleSubjectChange = (subjectName, subjectCode) => {
    setSelectedSubject(subjectName);
    if (onFilterChange) {
      onFilterChange({ class: selectedClass, subject: subjectName, subjectCode });
    }
  };

  return (
    <div className="w-72 bg-white border-r border-gray-200 p-4 space-y-6">
      <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
        <GraduationCap size={20} className="text-purple-600" />
        <span>Filters</span>
      </div>

      <div className="space-y-4">
        {/* Class/Grade Section */}
        <div className="border-b border-gray-100 pb-4">
          <button
            onClick={() => toggleSection('class')}
            className="flex justify-between items-center w-full text-left text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
          >
            <div className="flex items-center gap-2">
              <GraduationCap size={16} />
              <span>Class / Grade</span>
            </div>
            {openSections.class ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {openSections.class && (
            <div className="mt-3 space-y-2">
              {classes.map(cls => (
                <div
                  key={cls.id}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${selectedClass === cls.code
                      ? 'bg-purple-100 border-2 border-purple-500'
                      : 'hover:bg-gray-50 border-2 border-transparent'
                    }`}
                  onClick={() => handleClassChange(cls.code, cls.name)}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="classFilter"
                      id={`class-${cls.id}`}
                      checked={selectedClass === cls.code}
                      onChange={() => handleClassChange(cls.code, cls.name)}
                      className="form-radio text-purple-600"
                    />
                    <label htmlFor={`class-${cls.id}`} className="text-sm font-medium text-gray-700 cursor-pointer">
                      {cls.name}
                    </label>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {cls.students} students
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Subject Section */}
        <div>
          <button
            onClick={() => toggleSection('subject')}
            className="flex justify-between items-center w-full text-left text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
          >
            <div className="flex items-center gap-2">
              <BookOpen size={16} />
              <span>Subject</span>
            </div>
            {openSections.subject ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {openSections.subject && (
            <div className="mt-3 space-y-2">
              {subjects.map(subject => (
                <div
                  key={subject.id}
                  className={`p-2 rounded-lg cursor-pointer transition-colors ${selectedSubject === subject.name
                      ? 'bg-purple-100 border-2 border-purple-500'
                      : 'hover:bg-gray-50 border-2 border-transparent'
                    }`}
                  onClick={() => handleSubjectChange(subject.name, subject.code)}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <input
                      type="radio"
                      name="subjectFilter"
                      id={`subject-${subject.id}`}
                      checked={selectedSubject === subject.name}
                      onChange={() => handleSubjectChange(subject.name, subject.code)}
                      className="form-radio text-purple-600"
                    />
                    <label htmlFor={`subject-${subject.id}`} className="text-sm font-medium text-gray-700 cursor-pointer">
                      {subject.name}
                    </label>
                  </div>
                  <div className="ml-6">
                    <p className="text-xs text-gray-500">Code: {subject.code}</p>
                    <p className="text-xs text-gray-500">Teacher: {subject.teacher}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Selected Filters Summary */}
      <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
        <h4 className="text-xs font-semibold text-purple-800 mb-2">Selected Filters</h4>
        <div className="space-y-1 text-xs text-purple-700">
          <p><span className="font-medium">Class:</span> {selectedClass}</p>
          <p><span className="font-medium">Subject:</span> {selectedSubject}</p>
        </div>
      </div>
    </div>
  );
}