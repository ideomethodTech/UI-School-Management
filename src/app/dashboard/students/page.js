'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; // <--- ADDED
import styles from './page.module.css';
import { FaSearch, FaPlus, FaEye, FaTrashAlt } from 'react-icons/fa';

export const studentsData = [
    // Added 'teacherId' to mock data for filtering demonstration
    { id: '1234567890', teacherId: '2', name: 'John Doe', grade: 5, phone: '1234567890', address: '123 Main St, Anytown, USA', avatar: 'https://i.pravatar.cc/100?img=11' },
    { id: '1234567891', teacherId: '2', name: 'Jane Doe', grade: 5, phone: '1234567890', address: '123 Main St, Anytown, USA', avatar: 'https://i.pravatar.cc/100?img=12' },
    { id: '1234567892', teacherId: '1', name: 'Mike Geller', grade: 5, phone: '1234567890', address: '123 Main St, Anytown, USA', avatar: 'https://i.pravatar.cc/100?img=13' },
    { id: '1234567893', teacherId: '2', name: 'Jay French', grade: 5, phone: '1234567890', address: '123 Main St, Anytown, USA', avatar: 'https://i.pravatar.cc/100?img=14' },
    { id: '1234567894', teacherId: '1', name: 'Jane Smith', grade: 5, phone: '1234567890', address: '123 Main St, Anytown, USA', avatar: 'https://i.pravatar.cc/100?img=15' },
    { id: '1234567895', teacherId: '2', name: 'Anna Santiago', grade: 5, phone: '1234567890', address: '123 Main St, Anytown, USA', avatar: 'https://i.pravatar.cc/100?img=16' },
    { id: '1234567896', teacherId: '1', name: 'Allen Black', grade: 5, phone: '1234567890', address: '123 Main St, Anytown, USA', avatar: 'https://i.pravatar.cc/100?img=17' },
];

// Main page component
export default function StudentsPage() {
    // Hook to get URL parameters
    const searchParams = useSearchParams(); // <--- ADDED
    const teacherIdFilter = searchParams.get('teacherId'); // <--- ADDED

    // State for managing the list of students
    const [students, setStudents] = useState(studentsData);

    // Filter logic: if teacherIdFilter exists, show only those students
    const displayedStudents = teacherIdFilter 
        ? students.filter(s => s.teacherId === teacherIdFilter)
        : students;

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

    // Function Handlers

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
            // Assign a default teacherId for new students (logic depends on your backend)
            teacherId: '2', 
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

                {/* Optional: Filter Notification */}
                {teacherIdFilter && (
                     <div className="mb-4 p-2 bg-purple-50 text-purple-700 text-sm rounded flex items-center gap-2 mx-5">
                        <span>Filtering by Teacher ID: <b>{teacherIdFilter}</b></span>
                        <Link href="/dashboard/students" className="underline text-xs ml-2">Clear Filter</Link>
                    </div>
                )}

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
    {displayedStudents.length > 0 ? (
        displayedStudents.map((student) => (
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
                    {/* --- UPDATED ACTIONS SECTION START --- */}
                    <div className="flex items-center gap-2">
                        <Link href={`/dashboard/students/${student.id}`}>
                            {/* View Button: Transparent background, Blue Icon */}
                            <button className="p-2 text-blue-500 hover:text-blue-700 transition-colors">
                                <FaEye size={18} />
                            </button>
                        </Link>
                        {/* Delete Button: Transparent background, Red/Pink Icon */}
                        <button 
                            className="p-2 text-red-500 hover:text-red-700 transition-colors" 
                            onClick={() => handleDeleteStudent(student.id)}
                        >
                            <FaTrashAlt size={18} />
                        </button>
                    </div>
                    {/* --- UPDATED ACTIONS SECTION END --- */}
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>No students found.</td>
        </tr>
    )}
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