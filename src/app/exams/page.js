import styles from './page.module.css';
import { FaSearch } from 'react-icons/fa';

// Mock data for the exams list
const examsData = [
    { subject: 'Math', class: '1A', teacher: 'Martha Morris', date: '2025-01-01' },
    { subject: 'English', class: '2A', teacher: 'Randall Garcia', date: '2025-01-01' },
    { subject: 'Science', class: '3A', teacher: 'Myrtie Scott', date: '2025-01-01' },
    { subject: 'Social Studies', class: '1B', teacher: 'Alvin Swanson', date: '2025-01-01' },
    { subject: 'Art', class: '4A', teacher: 'Mabelle Wallace', date: '2025-01-01' },
    { subject: 'Music', class: '5A', teacher: 'Dale Thompson', date: '2025-01-01' },
    { subject: 'History', class: '6A', teacher: 'Allie Conner', date: '2025-01-01' },
    { subject: 'Geography', class: '6B', teacher: 'Hunter Fuller', date: '2025-01-01' },
    { subject: 'Physics', class: '7A', teacher: 'Lois Lindsey', date: '2025-01-01' },
    { subject: 'Chemistry', class: '8A', teacher: 'Vera Soto', date: '2025-01-01' },
];

export default function ExamsPage() {
    return (
        <div className={styles.container}>
            {/* Header Toolbar */}
            <div className={styles.toolbar}>
                <h1>All Exams</h1>
                <div className={styles.searchBar}>
                    <FaSearch className={styles.searchIcon} />
                    <input type="text" placeholder="Search..." />
                </div>
            </div>

            {/* Main Content Card */}
            <div className={styles.contentCard}>
                <div className={styles.tableContainer}>
                    <table className={styles.examsTable}>
                        <thead>
                            <tr>
                                <th>Subject Name</th>
                                <th>Class</th>
                                <th>Teacher</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {examsData.map((exam, index) => (
                                <tr key={index}>
                                    <td>{exam.subject}</td>
                                    <td>{exam.class}</td>
                                    <td>{exam.teacher}</td>
                                    <td>{exam.date}</td>
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