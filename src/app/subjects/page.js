'use client'; // This is now a client component because we need useState

import { useState } from 'react'; // <-- ADD THIS IMPORT
import styles from './page.module.css';
import { FaSearch, FaPlus, FaPen, FaTrashAlt } from 'react-icons/fa';

// We rename the mock data so we can use it as the initial state
const initialSubjectsData = [
    { name: 'Math', teachers: ['Alice Phelps', 'Russell Davidson', 'John Doe', 'Jane Smith'] },
    { name: 'English', teachers: ['Martha B. English', 'William T. Shakespeare'] },
    { name: 'Physics', teachers: ['Louis de Broglie'] },
    { name: 'Chemistry', teachers: ['Nathan Kelly', 'Benjamin Snyder'] },
    { name: 'Biology', teachers: ['Alma Benson', 'Lina Collier'] },
    { name: 'History', teachers: ['Hannah Bowman', 'Betty Obrien'] },
    { name: 'Geography', teachers: ['Lora French', 'Sue Brady'] },
    { name: 'Art', teachers: ['Harriet Alvarado', 'Mayme Keller'] },
    { name: 'Music', teachers: ['Gertrude Roy', 'Rosa Singleton'] },
    { name: 'Literature', teachers: ['Effie Lynch', 'Brett Flowers'] },
];

// This helper component remains unchanged
const TeachersList = ({ teachers }) => {
    const maxVisible = 2;
    const visibleTeachers = teachers.slice(0, maxVisible);
    const hiddenCount = teachers.length - maxVisible;

    return (
        <div className={styles.teachersCell}>
            {visibleTeachers.map(name => (
                <span key={name} className={styles.teacherPill}>{name}</span>
            ))}
            {hiddenCount > 0 && (
                <div className={styles.plusPillContainer}>
                    <span className={`${styles.teacherPill} ${styles.plusPill}`}>+{hiddenCount}</span>
                    <div className={styles.popup}>
                        <div className={styles.popupHeader}>Teachers</div>
                        {teachers.map(name => (
                            <div key={name} className={styles.popupItem}>
                                <span>{name}</span>
                                <div className={styles.popupActions}>
                                    <a href="#">View</a>
                                    <a href="#">Message</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default function SubjectsPage() {
    // ======================================================
    // VVVVVVVVVVVVVVVVVV  START OF NEW LOGIC VVVVVVVVVVVVVVVVV
    // ======================================================

    // State to hold the list of subjects so we can update it
    const [subjects, setSubjects] = useState(initialSubjectsData);
    // State to control the modal's visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    // State for the form input fields
    const [newSubjectName, setNewSubjectName] = useState('');
    const [newTeachers, setNewTeachers] = useState('');

    const handleCreateSubject = (e) => {
        e.preventDefault(); // Prevent page reload on form submit

        if (!newSubjectName.trim()) {
            alert('Please enter a subject name.');
            return;
        }

        const newSubject = {
            name: newSubjectName,
            teachers: newTeachers.split(',').map(name => name.trim()).filter(Boolean),
        };

        setSubjects([...subjects, newSubject]);

        // Clear form and close modal after submission
        setNewSubjectName('');
        setNewTeachers('');
        setIsModalOpen(false);
    };



    return (
        <div className={styles.pageContainer}>
            <main className={styles.mainContent}>
                {/* Toolbar */}
                <div className={styles.toolbar}>
                    <h1>All Subjects</h1>
                    <div className={styles.toolbarActions}>
                        <div className={styles.searchBar}>
                            <FaSearch className={styles.searchIcon} />
                            <input type="text" placeholder="Search..." />
                        </div>
                        {/* This button now opens the modal */}
                        <button className={styles.newSubjectBtn} onClick={() => setIsModalOpen(true)}>
                            <FaPlus />
                            <span>New Subject</span>
                        </button>
                    </div>
                </div>

                {/* Subjects Table */}
                <div className={styles.tableContainer}>
                    <table className={styles.subjectsTable}>
                        <thead>
                            <tr>
                                <th>Subject Name</th>
                                <th>Teachers</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Map over the state variable 'subjects' instead of the constant data */}
                            {subjects.map((subject) => (
                                <tr key={subject.name}>
                                    <td>{subject.name}</td>
                                    <td>
                                        <TeachersList teachers={subject.teachers} />
                                    </td>
                                    <td>
                                        <div className={styles.actionButtons}>
                                            <button className={styles.editBtn}><FaPen /></button>
                                            <button className={styles.deleteBtn}><FaTrashAlt /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination and Footer remain the same */}
                <div className={styles.paginationContainer}>
                    {/* ... pagination JSX ... */}
                </div>
            </main>
            <footer className={styles.footer}>
                {/* ... footer JSX ... */}
            </footer>


            {isModalOpen && (
                <div className={styles.overlay} onClick={() => setIsModalOpen(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <form onSubmit={handleCreateSubject}>
                            <h2 className={styles.modalTitle}>Create Subject</h2>

                            <div className={styles.formGroup}>
                                <label htmlFor="subjectName">Subject name</label>
                                <input
                                    type="text"
                                    id="subjectName"
                                    value={newSubjectName}
                                    onChange={(e) => setNewSubjectName(e.target.value)}
                                    className={styles.formInput}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="teachers">Teachers (comma separated)</label>
                                <input
                                    type="text"
                                    id="teachers"
                                    value={newTeachers}
                                    onChange={(e) => setNewTeachers(e.target.value)}
                                    className={styles.formInput}
                                />
                            </div>

                            <div className={styles.formActions}>
                                <button type="button" onClick={() => setIsModalOpen(false)} className={styles.cancelBtn}>
                                    Cancel
                                </button>
                                <button type="submit" className={styles.createBtn}>
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}