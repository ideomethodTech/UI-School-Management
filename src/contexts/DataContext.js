'use client';

import { createContext, useContext, useState } from 'react';
import { studentsData } from '../app/dashboard/students/data';
import { teachersData } from '../app/dashboard/teachers/data';
import { parentsData } from '../app/dashboard/parents/data';

const DataContext = createContext();

export function DataProvider({ children }) {
    const [students, setStudents] = useState(studentsData);
    const [teachers, setTeachers] = useState(teachersData);
    const [parents, setParents] = useState(parentsData);

    const addStudent = (student) => {
        setStudents(prev => [student, ...prev]);
    };

    const addTeacher = (teacher) => {
        setTeachers(prev => [teacher, ...prev]);
    };

    const addParent = (parent) => {
        setParents(prev => [parent, ...prev]);
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

    return (
        <DataContext.Provider value={{
            students,
            teachers,
            parents,
            addStudent,
            addTeacher,
            addParent,
            updateStudent,
            updateTeacher,
            updateParent,
            deleteStudent,
            deleteTeacher,
            deleteParent
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
