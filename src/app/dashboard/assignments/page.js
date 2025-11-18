import styles from './page.module.css';
import { FaSearch } from 'react-icons/fa';

// Mock data for the assignments list
const assignmentsData = [
    { subject: 'Math', class: '1A', teacher: 'Anthony Boone', dueDate: '2025-01-01' },
    { subject: 'English', class: '2A', teacher: 'Clifford Bowen', dueDate: '2025-01-01' },
    { subject: 'Science', class: '3A', teacher: 'Catherine Malone', dueDate: '2025-01-01' },
    { subject: 'Social Studies', class: '1B', teacher: 'Willie Medina', dueDate: '2025-01-01' },
    { subject: 'Art', class: '4A', teacher: 'Jose Ruiz', dueDate: '2025-01-01' },
    { subject: 'Music', class: '5A', teacher: 'Katharine Owens', dueDate: '2025-01-01' },
    { subject: 'History', class: '6A', teacher: 'Shawn Norman', dueDate: '2025-01-01' },
    { subject: 'Geography', class: '6B', teacher: 'Don Holloway', dueDate: '2025-01-01' },
    { subject: 'Physics', class: '7A', teacher: 'Franklin Gregory', dueDate: '2025-01-01' },
    { subject: 'Chemistry', class: '8A', teacher: 'Danny Nguyen', dueDate: '2025-01-01' },
];

export default function AssignmentsPage() {
    return (
        <div className={styles.container}>
            {/* Header Toolbar */}
            <div className={styles.toolbar}>
                <h1>All Assignments</h1>
                <div className={styles.searchBar}>
                    <FaSearch className={styles.searchIcon} />
                    <input type="text" placeholder="Search..." />
                </div>
            </div>

            {/* Main Content Card */}
            <div className={styles.contentCard}>
                <div className={styles.tableContainer}>
                    <table className={styles.assignmentsTable}>
                        <thead>
                            <tr>
                                <th>Subject Name</th>
                                <th>Class</th>
                                <th>Teacher</th>
                                <th>Due Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignmentsData.map((assignment, index) => (
                                <tr key={index}>
                                    <td>{assignment.subject}</td>
                                    <td>{assignment.class}</td>
                                    <td>{assignment.teacher}</td>
                                    <td>{assignment.dueDate}</td>
                                    <td></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className={styles.paginationContainer}>
                    <span className={styles.paginationInfo}>Showing 1–10 of 10</span>
                    <div className={styles.paginationControls}>
                        <button disabled>Prev</button>
                        <button className={styles.activePage}>1</button>
                        <button>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}