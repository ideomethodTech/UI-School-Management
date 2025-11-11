'use client'; // This component needs state, so it must be a Client Component

import { useState } from 'react';
import styles from './page.module.css';
import { FaSearch, FaPlus, FaPen, FaTrashAlt } from 'react-icons/fa';

// Mock data for the initial list of parents
const initialParentsData = [
    { name: 'John Doe', email: 'john@doe.com', students: ['Sarah Brewer'], phone: '1234567890', address: '123 Main St, Anytown, USA' },
    { name: 'Jane Doe', email: 'jane@doe.com', students: ['Cecilia Bradley'], phone: '1234567890', address: '123 Main St, Anytown, USA' },
    { name: 'Mike Geller', email: 'mike@geller.com', students: ['Fanny Caldwell'], phone: '1234567890', address: '123 Main St, Anytown, USA' },
    { name: 'Jay French', email: 'jay@geller.com', students: ['Mollie Fitzgerald', 'Ian Bryant'], phone: '1234567890', address: '123 Main St, Anytown, USA' },
    { name: 'Jane Smith', email: 'mable@geller.com', students: ['Mable Harvey'], phone: '1234567890', address: '123 Main St, Anytown, USA' },
    { name: 'Anna Santiago', email: 'anna@gmail.com', students: ['Joel Lambert'], phone: '1234567890', address: '123 Main St, Anytown, USA' },
    { name: 'Allen Black', email: 'allen@black.com', students: ['Carrie', 'Lilly'], phone: '1234567890', address: '123 Main St, Anytown, USA' },
];

// Main page component
export default function ParentsPage() {
    // State for managing the list of parents
    const [parents, setParents] = useState(initialParentsData);

    // State for Create/Edit modals
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('create'); // 'create' or 'edit'

    // State for form inputs
    const [currentParent, setCurrentParent] = useState(null); // Used for editing
    const [parentName, setParentName] = useState('');
    const [parentEmail, setParentEmail] = useState('');
    const [studentNames, setStudentNames] = useState('');
    const [parentPhone, setParentPhone] = useState('');
    const [parentAddress, setParentAddress] = useState('');

    // --- Modal Control Functions ---
    const openModal = (type, parent = null) => {
        setModalType(type);
        if (type === 'edit' && parent) {
            setCurrentParent(parent);
            setParentName(parent.name);
            setParentEmail(parent.email);
            setStudentNames(parent.students.join(', '));
            setParentPhone(parent.phone);
            setParentAddress(parent.address);
        } else {
            setCurrentParent(null);
            setParentName('');
            setParentEmail('');
            setStudentNames('');
            setParentPhone('');
            setParentAddress('');
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // --- CRUD Function Handlers ---

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!parentName.trim() || !parentEmail.trim()) {
            alert('Parent name and email are required.');
            return;
        }

        const studentArray = studentNames.split(',').map(name => name.trim()).filter(Boolean);

        if (modalType === 'create') {
            const newParent = { name: parentName, email: parentEmail, students: studentArray, phone: parentPhone, address: parentAddress };
            setParents(currentParents => [...currentParents, newParent]);
        } else if (modalType === 'edit') {
            setParents(currentParents =>
                currentParents.map(p =>
                    p.email === currentParent.email ? { ...p, name: parentName, email: parentEmail, students: studentArray, phone: parentPhone, address: parentAddress } : p
                )
            );
        }
        closeModal();
    };

    const handleDelete = (parentEmailToDelete) => {
        if (window.confirm('Are you sure you want to delete this parent?')) {
            setParents(currentParents => currentParents.filter(p => p.email !== parentEmailToDelete));
        }
    };

    return (
        <>
            <main className={styles.mainContent}>
                {/* Toolbar */}
                <div className={styles.toolbar}>
                    <h1>All Parents</h1>
                    <div className={styles.toolbarActions}>
                        <div className={styles.searchBar}>
                            <FaSearch className={styles.searchIcon} />
                            <input type="text" placeholder="Search..." />
                        </div>
                        <button className={styles.newParentBtn} onClick={() => openModal('create')}>
                            <FaPlus />
                            <span>New Parent</span>
                        </button>
                    </div>
                </div>

                {/* Parents Table */}
                <div className={styles.tableContainer}>
                    <table className={styles.parentsTable}>
                        <thead>
                            <tr>
                                <th>Info</th>
                                <th>Student Names</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parents.map((parent) => (
                                <tr key={parent.email}>
                                    <td>
                                        <div className={styles.infoCell}>
                                            <div className={styles.parentName}>{parent.name}</div>
                                            <div className={styles.parentEmail}>{parent.email}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.studentsCell}>
                                            {parent.students.map(student => (
                                                <span key={student} className={styles.studentPill}>{student}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td>{parent.phone}</td>
                                    <td>{parent.address}</td>
                                    <td>
                                        <div className={styles.actionButtons}>
                                            <button className={styles.editBtn} onClick={() => openModal('edit', parent)}><FaPen /></button>
                                            <button className={styles.deleteBtn} onClick={() => handleDelete(parent.email)}><FaTrashAlt /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* Modal for creating/editing a parent */}
            {isModalOpen && (
                <div className={styles.overlay} onClick={closeModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <form onSubmit={handleSubmit}>
                            <h2 className={styles.modalTitle}>{modalType === 'create' ? 'Create Parent' : 'Edit Parent'}</h2>

                            <div className={styles.formGroup}>
                                <label htmlFor="parentName">Parent Name</label>
                                <input id="parentName" type="text" value={parentName} onChange={(e) => setParentName(e.target.value)} className={styles.formInput} />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="parentEmail">Email</label>
                                <input id="parentEmail" type="email" value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} className={styles.formInput} />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="studentNames">Student Names (comma separated)</label>
                                <input id="studentNames" type="text" value={studentNames} onChange={(e) => setStudentNames(e.target.value)} className={styles.formInput} />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="parentPhone">Phone</label>
                                <input id="parentPhone" type="tel" value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} className={styles.formInput} />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="parentAddress">Address</label>
                                <input id="parentAddress" type="text" value={parentAddress} onChange={(e) => setParentAddress(e.target.value)} className={styles.formInput} />
                            </div>

                            <div className={styles.formActions}>
                                <button type="button" className={styles.cancelBtn} onClick={closeModal}>Cancel</button>
                                <button type="submit" className={styles.createBtn}>{modalType === 'create' ? 'Create' : 'Update'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}