// src/app/dashboard/subjects/page.js
'use client';

import { useState } from 'react';
import styles from './page.module.css'; // Make sure this path is correct
import { FaSearch, FaPlus, FaPencilAlt, FaTrashAlt } from 'react-icons/fa'; // Changed FaPen to FaPencilAlt for a slightly different icon

// Initial mock data for subjects
const initialSubjectsData = [
    { id: 'sub001', name: 'Math', teachers: ['Alice Phelps', 'Russell Davidson', 'John Doe', 'Jane Smith'] },
    { id: 'sub002', name: 'English', teachers: ['Martha B. English', 'William T. Shakespeare'] },
    { id: 'sub003', name: 'Physics', teachers: ['Louis de Broglie'] },
    { id: 'sub004', name: 'Chemistry', teachers: ['Nathan Kelly', 'Benjamin Snyder'] },
    { id: 'sub005', name: 'Biology', teachers: ['Alma Benson', 'Lina Collier'] },
    { id: 'sub006', name: 'History', teachers: ['Hannah Bowman', 'Betty Obrien'] },
    { id: 'sub007', name: 'Geography', teachers: ['Lora French', 'Sue Brady'] },
    { id: 'sub008', name: 'Art', teachers: ['Harriet Alvarado', 'Mayme Keller'] },
    { id: 'sub009', name: 'Music', teachers: ['Gertrude Roy', 'Rosa Singleton'] },
    { id: 'sub010', name: 'Literature', teachers: ['Effie Lynch', 'Brett Flowers'] },
];

// Helper component for displaying teachers with a "popup" for more
const TeachersList = ({ teachers }) => {
    const maxVisible = 2; // Maximum teachers to show before '+X more'
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
                                {/* You might link these to teacher profiles or message functions */}
                                <div className={styles.popupActions}>
                                    <a href="#" className={styles.popupActionLink}>View</a>
                                    <a href="#" className={styles.popupActionLink}>Message</a>
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
    const [subjects, setSubjects] = useState(initialSubjectsData);
    const [searchTerm, setSearchTerm] = useState(''); // State for search input
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newSubjectName, setNewSubjectName] = useState('');
    const [newTeachers, setNewTeachers] = useState(''); // Comma-separated teacher names

    const handleCreateSubject = (e) => {
        e.preventDefault();

        if (!newSubjectName.trim()) {
            alert('Please enter a subject name.');
            return;
        }

        const newSubject = {
            id: `sub${Date.now()}`, // Simple unique ID
            name: newSubjectName.trim(),
            teachers: newTeachers.split(',').map(name => name.trim()).filter(Boolean),
        };

        setSubjects(prevSubjects => [...prevSubjects, newSubject]);
        setNewSubjectName('');
        setNewTeachers('');
        setIsModalOpen(false);
    };

    const handleDeleteSubject = (subjectIdToDelete) => {
        if (window.confirm('Are you sure you want to delete this subject?')) {
            setSubjects(prevSubjects => prevSubjects.filter(subject => subject.id !== subjectIdToDelete));
        }
    };

    const filteredSubjects = subjects.filter(subject =>
        subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.teachers.some(teacher => teacher.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className={styles.pageWrapper}> {/* Using pageWrapper for overall padding */}
            <main className={styles.mainContent}>
                {/* Toolbar */}
                <div className={styles.toolbar}>
                    <h1>All Subjects</h1>
                    <div className={styles.toolbarActions}>
                        <div className={styles.searchBar}>
                            <FaSearch className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Search subjects..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className={styles.newBtn} onClick={() => setIsModalOpen(true)}>
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
                                <th className={styles.actionsHeader}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSubjects.map((subject) => (
                                <tr key={subject.id}>
                                    <td>{subject.name}</td>
                                    <td>
                                        <TeachersList teachers={subject.teachers} />
                                    </td>
                                    <td>
                                        <div className={styles.actionButtons}>
                                            <button className={styles.editBtn}>
                                                <FaPencilAlt /> {/* Using FaPencilAlt */}
                                            </button>
                                            <button
                                                className={styles.deleteBtn}
                                                onClick={() => handleDeleteSubject(subject.id)}
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination and Footer - simplified for now */}
                {/* <div className={styles.paginationContainer}>
                    <p className={styles.footerText}>Showing 1 to {filteredSubjects.length} of {subjects.length} entries</p>
                </div> */}
            </main>

            {/* Modal for creating a new subject */}
            {isModalOpen && (
                <div className={styles.overlay} onClick={() => setIsModalOpen(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <form onSubmit={handleCreateSubject}>
                            <h2 className={styles.modalTitle}>Create New Subject</h2>

                            <div className={styles.formGroup}>
                                <label htmlFor="subjectName">Subject Name</label>
                                <input
                                    type="text"
                                    id="subjectName"
                                    value={newSubjectName}
                                    onChange={(e) => setNewSubjectName(e.target.value)}
                                    className={styles.formInput}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="teachers">Teachers (comma-separated names)</label>
                                <input
                                    type="text"
                                    id="teachers"
                                    value={newTeachers}
                                    onChange={(e) => setNewTeachers(e.target.value)}
                                    className={styles.formInput}
                                    placeholder="e.g., John Doe, Jane Smith"
                                />
                            </div>

                            <div className={styles.formActions}>
                                <button type="button" onClick={() => setIsModalOpen(false)} className={styles.cancelBtn}>
                                    Cancel
                                </button>
                                <button type="submit" className={styles.createBtn}>
                                    Create Subject
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}