'use client';

import { createContext, useContext, useState } from 'react';
import { studentsData } from '../app/dashboard/students/data';
import { teachersData } from '../app/dashboard/teachers/data';
import { parentsData } from '../app/dashboard/parents/data';
import { initialEventsData } from '../mockData/adminData';
import { initialAssignmentsData } from '../mockData/adminData';

const DataContext = createContext();

export function DataProvider({ children }) {
    const [students, setStudents] = useState(studentsData);
    const [teachers, setTeachers] = useState(teachersData);
    const [parents, setParents] = useState(parentsData);
    const [events, setEvents] = useState(initialEventsData);
    const [assignments, setAssignments] = useState(initialAssignmentsData);

    const addStudent = (student) => {
        setStudents(prev => [student, ...prev]);
    };

    const addTeacher = (teacher) => {
        setTeachers(prev => [teacher, ...prev]);
    };

    const addParent = (parent) => {
        setParents(prev => [parent, ...prev]);
    };

    const addEvent = (event) => {
        setEvents(prev => [...prev, event]);
    };

    const addAssignment = (assignment) => {
        setAssignments(prev => [...prev, assignment]);
    };

    const updateStudent = (id, updatedStudent) => {
        setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updatedStudent } : s));
    };

    const updateTeacher = (id, updatedTeacher) => {
        setTeachers(prev => prev.map(t => t.id === id ? { ...t, ...updatedTeacher } : t));
    };

    const updateParent = (id, updatedParent) => {
        setParents(prev => prev.map(p => p.id === id ? { ...p, ...updatedParent } : p));
    };

    const deleteStudent = (id) => {
        setStudents(prev => prev.filter(s => s.id !== id));
    };

    const deleteTeacher = (id) => {
        setTeachers(prev => prev.filter(t => t.id !== id));
    };

    const deleteParent = (id) => {
        setParents(prev => prev.filter(p => p.id !== id));
    };

    const updateAssignment = (id, updatedAssignment) => {
        setAssignments(prev => prev.map(a => a.id === id ? { ...a, ...updatedAssignment } : a));
    };

    const deleteAssignment = (id) => {
        setAssignments(prev => prev.filter(a => a.id !== id));
    };

    const updateEvent = (id, updatedEvent) => {
        setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updatedEvent } : e));
    };

    const deleteEvent = (id) => {
        setEvents(prev => prev.filter(e => e.id !== id));
    };

    return (
        <DataContext.Provider value={{
            students,
            teachers,
            parents,
            events,
            assignments,
            addStudent,
            addTeacher,
            addParent,
            addEvent,
            addAssignment,
            updateStudent,
            updateTeacher,
            updateParent,
            updateAssignment,
            updateEvent,
            deleteStudent,
            deleteTeacher,
            deleteParent,
            deleteAssignment,
            deleteEvent
        }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
}
