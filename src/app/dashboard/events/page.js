'use client';

import { useState } from 'react';
import styles from './page.module.css';
import { FaSearch, FaPlus, FaPen, FaTrashAlt, FaCalendarAlt, FaClock } from 'react-icons/fa';

// Mock data for the initial list of events
const initialEventsData = [
    { id: 1, title: 'Lake Trip', class: '1A', date: '2025-01-01', startTime: '10:00', endTime: '11:00' },
    { id: 2, title: 'Picnic', class: '2A', date: '2025-01-01', startTime: '10:00', endTime: '11:00' },
    { id: 3, title: 'Beach Trip', class: '3A', date: '2025-01-01', startTime: '10:00', endTime: '11:00' },
    { id: 4, title: 'Museum Trip', class: '4A', date: '2025-01-01', startTime: '10:00', endTime: '11:00' },
    { id: 5, title: 'Music Concert', class: '5A', date: '2025-01-01', startTime: '10:00', endTime: '11:00' },
    { id: 6, title: 'Magician Show', class: '1B', date: '2025-01-01', startTime: '10:00', endTime: '11:00' },
    { id: 7, title: 'Lake Trip', class: '2B', date: '2025-01-01', startTime: '10:00', endTime: '11:00' },
    { id: 8, title: 'Cycling Race', class: '3B', date: '2025-01-01', startTime: '10:00', endTime: '11:00' },
];

// Main page component
export default function EventsPage() {
    // State for managing the list of events
    const [events, setEvents] = useState(initialEventsData);

    // State for Create/Edit modals
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('create'); // 'create' or 'edit'

    // State for form inputs
    const [currentEvent, setCurrentEvent] = useState(null); // Used for editing
    const [formState, setFormState] = useState({
        title: '', class: '', date: '13-11-2025', startTime: '10:00', endTime: '11:00'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    // --- Modal Control Functions ---
    const openModal = (type, event = null) => {
        setModalType(type);
        if (type === 'edit' && event) {
            setCurrentEvent(event);
            setFormState({
                title: event.title,
                class: event.class,
                date: event.date,
                startTime: event.startTime,
                endTime: event.endTime
            });
        } else {
            setCurrentEvent(null);
            setFormState({ title: '', class: '', date: '13-11-2025', startTime: '10:00', endTime: '11:00' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    // --- CRUD Function Handlers ---

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!formState.title.trim()) {
            alert('Event Title is required.');
            return;
        }

        if (modalType === 'create') {
            const newEvent = { id: Date.now(), ...formState }; // Use timestamp for unique ID
            setEvents(currentEvents => [...currentEvents, newEvent]);
        } else if (modalType === 'edit') {
            setEvents(currentEvents =>
                currentEvents.map(e =>
                    e.id === currentEvent.id ? { ...e, ...formState } : e
                )
            );
        }
        closeModal();
    };

    const handleDelete = (eventIdToDelete) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            setEvents(currentEvents => currentEvents.filter(e => e.id !== eventIdToDelete));
        }
    };

    return (
        <div className={styles.container}>
            {/* Toolbar */}
            <div className={styles.toolbar}>
                <h1>All Events</h1>
                <div className={styles.toolbarActions}>
                    <div className={styles.searchBar}>
                        <FaSearch className={styles.searchIcon} />
                        <input type="text" placeholder="Search..." />
                    </div>
                    <button className={styles.newEventBtn} onClick={() => openModal('create')}>
                        <FaPlus />
                        <span>New Event</span>
                    </button>
                </div>
            </div>

            {/* Main Content Card */}
            <div className={styles.contentCard}>
                <div className={styles.tableContainer}>
                    <table className={styles.eventsTable}>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Class</th>
                                <th>Date</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event) => (
                                <tr key={event.id}>
                                    <td>{event.title}</td>
                                    <td>{event.class}</td>
                                    <td>{event.date}</td>
                                    <td>{event.startTime}</td>
                                    <td>{event.endTime}</td>
                                    <td>
                                        <div className={styles.actionButtons}>
                                            <button className={styles.editBtn} onClick={() => openModal('edit', event)}><FaPen /></button>
                                            <button className={styles.deleteBtn} onClick={() => handleDelete(event.id)}><FaTrashAlt /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className={styles.paginationContainer}>
                    <span className={styles.paginationInfo}>Showing 1–{events.length} of {events.length}</span>
                    <div className={styles.paginationControls}>
                        <button disabled>Prev</button>
                        <button className={styles.activePage}>1</button>
                        <button>Next</button>
                    </div>
                </div>
            </div>

            {/* Modal for creating/editing an event */}
            {isModalOpen && (
                <div className={styles.overlay} onClick={closeModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <form onSubmit={handleSubmit}>
                            <h2 className={styles.modalTitle}>{modalType === 'create' ? 'Create Event' : 'Edit Event'}</h2>

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
                                <div className={styles.inputWithIcon}>
                                    <input id="date" name="date" type="text" value={formState.date} onChange={handleInputChange} className={styles.formInput} />
                                    <FaCalendarAlt className={styles.inputIcon} />
                                </div>
                            </div>

                            <div className={styles.timeInputsGrid}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="startTime">Start Time</label>
                                    <div className={styles.inputWithIcon}>
                                        <input id="startTime" name="startTime" type="text" value={formState.startTime} onChange={handleInputChange} className={styles.formInput} />
                                        <FaClock className={styles.inputIcon} />
                                    </div>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="endTime">End Time</label>
                                    <div className={styles.inputWithIcon}>
                                        <input id="endTime" name="endTime" type="text" value={formState.endTime} onChange={handleInputChange} className={styles.formInput} />
                                        <FaClock className={styles.inputIcon} />
                                    </div>
                                </div>
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