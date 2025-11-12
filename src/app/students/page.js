'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { studentsData as initialStudentsData } from '@/lib/data';
import { FaSearch, FaPlus, FaEye, FaTrashAlt } from 'react-icons/fa';

// Main page component
export default function StudentsPage() {
    // State for managing the list of students
    const [students, setStudents] = useState(initialStudentsData);

    // State for modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State for the new student form inputs
    const [formState, setFormState] = useState({
        name: '', id: '', grade: '', phone: '', address: '', avatar: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const openModal = () => {
        // Reset form when opening
        setFormState({ name: '', id: '', grade: '', phone: '', address: '', avatar: '' });
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    // --- CRUD Function Handlers ---

    const handleCreateStudent = (event) => {
        event.preventDefault();
        if (!formState.name.trim() || !formState.id.trim()) {
            alert('Student Name and Student ID are required.');
            return;
        }

        const newStudent = {
            id: formState.id,
            name: formState.name,
            grade: formState.grade,
            phone: formState.phone,
            address: formState.address,
            // Use a default avatar if none is provided
            avatar: formState.avatar || `https://i.pravatar.cc/40?u=${formState.id}`,
        };

        setStudents(currentStudents => [newStudent, ...currentStudents]);
        closeModal();
    };

    const handleDeleteStudent = (studentIdToDelete) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            setStudents(currentStudents => currentStudents.filter(student => student.id !== studentIdToDelete));
        }
    };

    return (
        <>
            <main className={styles.mainContent}>
                {/* Toolbar */}
                <div className={styles.toolbar}>
                    <h1>All Students</h1>
                    <div className={styles.toolbarActions}>
                        <div className={styles.searchBar}>
                            <FaSearch className={styles.searchIcon} />
                            <input type="text" placeholder="Search..." />
                        </div>
                        <button className={styles.newStudentBtn} onClick={openModal}>
                            <FaPlus />
                            <span>New Student</span>
                        </button>
                    </div>
                </div>

                {/* Students Table */}
                <div className={styles.tableContainer}>
                    <table className={styles.studentsTable}>
                        <thead>
                            <tr>
                                <th>Info</th>
                                <th>Student ID</th>
                                <th>Grade</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td>
                                        <div className={styles.infoCell}>
                                            <Image src={student.avatar} alt={student.name} width={40} height={40} className={styles.avatar} />
                                            <div>
                                                <div className={styles.studentName}>{student.name}</div>
                                                <div className={styles.studentGrade}>Grade {student.grade}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{student.id}</td>
                                    <td>{student.grade}</td>
                                    <td>{student.phone}</td>
                                    <td>{student.address}</td>
                                    <td>
                                        <div className={styles.actionButtons}>
                                            <Link href={`/students/${student.id}`}>
                                                <button className={styles.viewBtn}><FaEye /></button>
                                            </Link>
                                            <button className={styles.deleteBtn} onClick={() => handleDeleteStudent(student.id)}><FaTrashAlt /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* Modal for creating a new student */}
            {isModalOpen && (
                <div className={styles.overlay} onClick={closeModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <form onSubmit={handleCreateStudent}>
                            <h2 className={styles.modalTitle}>Create Student</h2>

                            <div className={styles.formGroup}>
                                <label htmlFor="name">Student name</label>
                                <input id="name" name="name" type="text" value={formState.name} onChange={handleInputChange} className={styles.formInput} />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="id">Student ID</label>
                                <input id="id" name="id" type="text" value={formState.id} onChange={handleInputChange} className={styles.formInput} />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="grade">Grade</label>
                                <input id="grade" name="grade" type="text" value={formState.grade} onChange={handleInputChange} className={styles.formInput} />
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
                                <button type="submit" className={styles.createBtn}>Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}