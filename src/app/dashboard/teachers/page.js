// src/app/dashboard/teachers/page.js
"use client";

import { useState } from 'react';
import Link from 'next/link'; // Not directly used here, but good practice for future links
import Image from 'next/image'; // For avatar preview in modal, if you implement it
import styles from './page.module.css';
import { FaSearch, FaPlus } from 'react-icons/fa'; // Only FaSearch and FaPlus are used directly here
import TeachersTable from '@/components/TeachersTable'; // Import your TeachersTable component

// Mock data for the initial list of teachers
export const teachersData = [
    { name: 'John Doe', email: 'john@doe.com', teacherId: 'TCH001', subjects: 'Math, Geometry', classes: '1B, 2A, 3C', phone: '123-456-7890', address: '123 Main St, Anytown, USA', avatar: 'https://i.pravatar.cc/100?img=68' },
    { name: 'Jane Doe', email: 'jane@doe.com', teacherId: 'TCH002', subjects: 'Physics, Chemistry', classes: '5A, 4B, 3C', phone: '123-456-7891', address: '456 Oak Ave, Otherville, USA', avatar: 'https://i.pravatar.cc/100?img=69' },
    { name: 'Mike Geller', email: 'mike@geller.com', teacherId: 'TCH003', subjects: 'Biology', classes: '5A, 4B, 3C', phone: '123-456-7892', address: '789 Pine Ln, Anyplace, USA', avatar: 'https://i.pravatar.cc/100?img=70' },
    { name: 'Jay French', email: 'jay@gmail.com', teacherId: 'TCH004', subjects: 'History', classes: '5A, 4B, 3C', phone: '123-456-7893', address: '101 Elm Dr, Nowhere, USA', avatar: 'https://i.pravatar.cc/100?img=71' },
    { name: 'Jane Smith', email: 'jane@gmail.com', teacherId: 'TCH005', subjects: 'Music, History', classes: '5A, 4B, 3C', phone: '123-456-7894', address: '202 Birch Ct, Somewhere, USA', avatar: 'https://i.pravatar.cc/100?img=72' },
    { name: 'Anna Santiago', email: 'anna@gmail.com', teacherId: 'TCH006', subjects: 'Physics', classes: '5A, 4B, 3C', phone: '123-456-7895', address: '303 Cedar Rd, There, USA', avatar: 'https://i.pravatar.cc/100?img=73' },
    { name: 'Allen Black', email: 'allen@black.com', teacherId: 'TCH007', subjects: 'English, Spanish', classes: '5A, 4B, 3C', phone: '123-456-7896', address: '404 Willow Way, Everywhere, USA', avatar: 'https://i.pravatar.cc/100?img=74' }
];

export default function TeachersPage() {
    const [teachers, setTeachers] = useState(teachersData);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formState, setFormState] = useState({
        name: '', email: '', teacherId: '', subjects: '', classes: '', phone: '', address: '', avatar: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const openModal = () => {
        setFormState({ name: '', email: '', teacherId: '', subjects: '', classes: '', phone: '', address: '', avatar: '' }); // Reset form
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleCreateTeacher = (event) => {
        event.preventDefault();
        if (!formState.name.trim() || !formState.teacherId.trim()) {
            alert('Teacher Name and Teacher ID are required.');
            return;
        }

        const newTeacher = {
            // Using a simple timestamp for a unique ID for new entries. In a real app, this would be from a backend.
            id: Date.now().toString(),
            name: formState.name,
            email: formState.email,
            teacherId: formState.teacherId,
            subjects: formState.subjects,
            classes: formState.classes,
            phone: formState.phone,
            address: formState.address,
            // Generate a random avatar if not provided
            avatar: formState.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${formState.name}`,
        };

        setTeachers(currentTeachers => [newTeacher, ...currentTeachers]);
        closeModal();
    };

    const handleDeleteTeacher = (teacherIdToDelete) => {
        if (window.confirm('Are you sure you want to delete this teacher?')) {
            setTeachers(currentTeachers => currentTeachers.filter(teacher => teacher.teacherId !== teacherIdToDelete));
        }
    };

    const filteredTeachers = teachers.filter(teacher =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.teacherId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.subjects.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <main className={styles.mainContent}>
                {/* Toolbar */}
                <div className={styles.toolbar}>
                    <h1>All Teachers</h1>
                    <div className={styles.toolbarActions}>
                        <div className={styles.searchBar}>
                            <FaSearch className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Search teachers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className={styles.newBtn} onClick={openModal}>
                            <FaPlus />
                            <span>New Teacher</span>
                        </button>
                    </div>
                </div>

                {/* Teachers Table */}
                <div className={styles.tableContainer}>
                    {/* Pass the filtered teachers and the delete handler to the TeachersTable */}
                    <TeachersTable rows={filteredTeachers} onDelete={handleDeleteTeacher} />
                </div>
            </main>

            {/* Modal for creating a new teacher */}
            {isModalOpen && (
                <div className={styles.overlay} onClick={closeModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <form onSubmit={handleCreateTeacher}>
                            <h2 className={styles.modalTitle}>Create Teacher</h2>

                            <div className={styles.formGroup}>
                                <label htmlFor="name">Teacher Name</label>
                                <input id="name" name="name" type="text" value={formState.name} onChange={handleInputChange} className={styles.formInput} required />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email</label>
                                <input id="email" name="email" type="email" value={formState.email} onChange={handleInputChange} className={styles.formInput} />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="teacherId">Teacher ID</label>
                                <input id="teacherId" name="teacherId" type="text" value={formState.teacherId} onChange={handleInputChange} className={styles.formInput} required />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="subjects">Subjects (comma-separated)</label>
                                <input id="subjects" name="subjects" type="text" value={formState.subjects} onChange={handleInputChange} className={styles.formInput} />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="classes">Classes (comma-separated)</label>
                                <input id="classes" name="classes" type="text" value={formState.classes} onChange={handleInputChange} className={styles.formInput} />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="phone">Phone</label>
                                <input id="phone" name="phone" type="tel" value={formState.phone} onChange={handleInputChange} className={styles.formInput} />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="address">Address</label>
                                <input id="address" name="address" type="text" value={formState.address} onChange={handleInputChange} className={styles.formInput} />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="avatar">Avatar URL (optional)</label>
                                <input id="avatar" name="avatar" type="text" value={formState.avatar} onChange={handleInputChange} className={styles.formInput} />
                            </div>

                            <div className={styles.formActions}>
                                <button type="button" className={styles.cancelBtn} onClick={closeModal}>Cancel</button>
                                <button type="submit" className={styles.createBtn}>Create Teacher</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}