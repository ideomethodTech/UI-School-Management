'use client';

import { useState } from 'react';
import styles from './page.module.css';
import { FaSearch, FaPlus, FaPen, FaTrashAlt } from 'react-icons/fa';

// Mock data for the initial list of announcements
const initialAnnouncementsData = [
    { id: 1, title: 'About 4A Math Test', class: '4A', date: '2025-01-01' },
    { id: 2, title: 'About 3A Math Test', class: '3A', date: '2025-01-01' },
    { id: 3, title: 'About 3B Math Test', class: '3B', date: '2025-01-01' },
    { id: 4, title: 'About 6A Math Test', class: '6A', date: '2025-01-01' },
    { id: 5, title: 'About 8C Math Test', class: '8C', date: '2025-01-01' },
    { id: 6, title: 'About 2A Math Test', class: '2A', date: '2025-01-01' },
    { id: 7, title: 'About 4C Math Test', class: '4C', date: '2025-01-01' },
    { id: 8, title: 'About 4B Math Test', class: '4B', date: '2025-01-01' },
];

// Main page component
export default function AnnouncementsPage() {
    // State for managing the list of announcements
    const [announcements, setAnnouncements] = useState(initialAnnouncementsData);

    // State for Create/Edit modals
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('create');

    // State for form inputs
    const [currentAnnouncement, setCurrentAnnouncement] = useState(null); // Used for editing
    const [formState, setFormState] = useState({ title: '', class: '', date: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    // --- Modal Control Functions ---
    const openModal = (type, announcement = null) => {
        setModalType(type);
        if (type === 'edit' && announcement) {
            setCurrentAnnouncement(announcement);
            setFormState({ title: announcement.title, class: announcement.class, date: announcement.date });
        } else {
            setCurrentAnnouncement(null);
            setFormState({ title: '', class: '', date: '' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    // --- CRUD Function Handlers ---

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!formState.title.trim()) {
            alert('Title is required.');
            return;
        }

        if (modalType === 'create') {
            const newAnnouncement = { id: Date.now(), ...formState }; // Use timestamp for unique ID
            setAnnouncements(current => [...current, newAnnouncement]);
        } else if (modalType === 'edit') {
            setAnnouncements(current =>
                current.map(a =>
                    a.id === currentAnnouncement.id ? { ...a, ...formState } : a
                )
            );
        }
        closeModal();
    };

    const handleDelete = (announcementIdToDelete) => {
        if (window.confirm('Are you sure you want to delete this announcement?')) {
            setAnnouncements(current => current.filter(a => a.id !== announcementIdToDelete));
        }
    };

    return (
        <div className={styles.container}>
            {/* Toolbar */}
            <div className={styles.toolbar}>
                <h1>All Announcements</h1>
                <div className={styles.toolbarActions}>
                    <div className={styles.searchBar}>
                        <FaSearch className={styles.searchIcon} />
                        <input type="text" placeholder="Search..." />
                    </div>
                    <button className={styles.newBtn} onClick={() => openModal('create')}>
                        <FaPlus />
                        <span>New</span>
                    </button>
                </div>
            </div>

            {/* Main Content Card */}
            <div className={styles.contentCard}>
                <div className={styles.tableContainer}>
                    <table className={styles.announcementsTable}>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Class</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {announcements.map((announcement) => (
                                <tr key={announcement.id}>
                                    <td>{announcement.title}</td>
                                    <td>{announcement.class}</td>
                                    <td>{announcement.date}</td>
                                    <td>
                                        <div className={styles.actionButtons}>
                                            <button className={styles.editBtn} onClick={() => openModal('edit', announcement)}><FaPen /></button>
                                            <button className={styles.deleteBtn} onClick={() => handleDelete(announcement.id)}><FaTrashAlt /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for creating/editing an announcement */}
            {isModalOpen && (
                <div className={styles.overlay} onClick={closeModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <form onSubmit={handleSubmit}>
                            <h2 className={styles.modalTitle}>{modalType === 'create' ? 'Create Announcement' : 'Edit Announcement'}</h2>

                            <div className={styles.formGroup}>
                                <label htmlFor="title">Title</label>
                                <input id="title" name="title" type="text" value={formState.title} onChange={handleInputChange} className={styles.formInput} />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="class">Class</label>
                                <input id="class" name="class" type="text" value={formState.class} onChange={handleInputChange} className={styles.formInput} />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="date">Date</label>
                                <input id="date" name="date" type="date" value={formState.date} onChange={handleInputChange} className={styles.formInput} />
                            </div>

                            <div className={styles.formActions}>
                                <button type="button" className={styles.cancelBtn} onClick={closeModal}>Cancel</button>
                                <button type="submit" className={styles.createBtn}>{modalType === 'create' ? 'Create' : 'Save'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}