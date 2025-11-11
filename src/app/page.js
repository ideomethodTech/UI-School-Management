'use client'; // This MUST be the very first line of the file

import { useState } from 'react';
import styles from './page.module.css';
import { FaSearch, FaPlus, FaPen, FaTrashAlt } from 'react-icons/fa';

// Initial data for our subjects list
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

// Helper component for rendering the teacher list with the popup
const TeachersList = ({ teachers }) => {
  const maxVisible = 2;
  const visibleTeachers = teachers.slice(0, maxVisible);
  const hiddenCount = teachers.length - maxVisible;

  return (
    <div className={styles.teachersCell}>
      {visibleTeachers.map(name => <span key={name} className={styles.teacherPill}>{name}</span>)}
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

// This is now your main Homepage component
export default function HomePage() {
  // State for managing the list of subjects
  const [subjects, setSubjects] = useState(initialSubjectsData);
  // State for controlling if the modal is open or closed
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State for the form inputs
  const [newSubjectName, setNewSubjectName] = useState('');
  const [newTeachers, setNewTeachers] = useState('');


  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(null); // To store the subject being edited
  const [updatedSubjectName, setUpdatedSubjectName] = useState('');
  const [updatedTeachers, setUpdatedTeachers] = useState('');

  // Function to handle form submission
  const handleCreateSubject = (event) => {
    event.preventDefault(); // Stop the page from reloading
    if (!newSubjectName.trim()) {
      alert('Subject name is required.');
      return;
    }

    const newSubject = {
      name: newSubjectName,
      teachers: newTeachers.split(',').map(name => name.trim()).filter(Boolean),
    };

    setSubjects(currentSubjects => [...currentSubjects, newSubject]);

    // Reset the form and close the modal
    setNewSubjectName('');
    setNewTeachers('');
    setIsModalOpen(false);
  };

  const handleDeleteSubject = (subjectNameToDelete) => {
    // Add a confirmation dialog for safety
    if (window.confirm(`Are you sure you want to delete the subject "${subjectNameToDelete}"?`)) {
      setSubjects(currentSubjects =>
        currentSubjects.filter(subject => subject.name !== subjectNameToDelete)
      );
    }
  };

  // <-- NEW: Function to open the edit modal and populate it with data
  const openEditModal = (subjectToEdit) => {
    setCurrentSubject(subjectToEdit);
    setUpdatedSubjectName(subjectToEdit.name);
    setUpdatedTeachers(subjectToEdit.teachers.join(', ')); // Convert array to string for input field
    setIsEditModalOpen(true);
  };

  // <-- NEW: Function to handle the submission of the edit form
  const handleUpdateSubject = (event) => {
    event.preventDefault();
    if (!updatedSubjectName.trim()) { alert('Subject name is required.'); return; }

    setSubjects(currentSubjects =>
      currentSubjects.map(subject =>
        subject.name === currentSubject.name // Find the original subject
          ? { // Return the updated subject object
            name: updatedSubjectName,
            teachers: updatedTeachers.split(',').map(name => name.trim()).filter(Boolean)
          }
          : subject // Return other subjects unchanged
      )
    );

    setIsEditModalOpen(false);
    setCurrentSubject(null);
  };

  return (
    <>
      <main className={styles.mainContent}>
        {/* Toolbar */}
        <div className={styles.toolbar}>
          <h1>All Subjects</h1>
          <div className={styles.toolbarActions}>
            <div className={styles.searchBar}>
              <FaSearch className={styles.searchIcon} />
              <input type="text" placeholder="Search..." />
            </div>
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
              {subjects.map((subject, index) => (
                <tr key={`${subject.name}-${index}`}>
                  <td>{subject.name}</td>
                  <td><TeachersList teachers={subject.teachers} /></td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button className={styles.editBtn} onClick={() => openEditModal(subject)}><FaPen /></button>
                      <button className={styles.deleteBtn} onClick={() => handleDeleteSubject(subject.name)}><FaTrashAlt /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination and Footer */}
        <div className={styles.paginationContainer}>
          <span className={styles.paginationInfo}>Showing 1-{subjects.length} of {subjects.length}</span>
          <div className={styles.paginationControls}>
            <button>Prev</button>
            <button className={styles.activePage}>1</button>
            <button>2</button>
            <button>3</button>
            <button>Next</button>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <span>© 2025 CampusFlow. All rights reserved.</span>
        <span>Built with love for modern schools.</span>
      </footer>

      {/* Modal for creating a new subject */}
      {isModalOpen && (
        <div className={styles.overlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleCreateSubject}>
              <h2 className={styles.modalTitle}>Create Subject</h2>
              <div className={styles.formGroup}>
                <label htmlFor="subjectName">Subject name</label>
                <input
                  id="subjectName"
                  type="text"
                  value={newSubjectName}
                  onChange={(e) => setNewSubjectName(e.target.value)}
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="teachers">Teachers (comma separated)</label>
                <input
                  id="teachers"
                  type="text"
                  value={newTeachers}
                  onChange={(e) => setNewTeachers(e.target.value)}
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>
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


      {isEditModalOpen && (
        <div className={styles.overlay} onClick={() => setIsEditModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleUpdateSubject}>
              <h2 className={styles.modalTitle}>Edit Subject</h2>
              <div className={styles.formGroup}>
                <label htmlFor="editSubjectName">Subject name</label>
                <input
                  id="editSubjectName"
                  type="text"
                  value={updatedSubjectName}
                  onChange={(e) => setUpdatedSubjectName(e.target.value)}
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="editTeachers">Teachers (comma separated)</label>
                <input
                  id="editTeachers"
                  type="text"
                  value={updatedTeachers}
                  onChange={(e) => setUpdatedTeachers(e.target.value)}
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                <button type="submit" className={styles.createBtn}>Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}