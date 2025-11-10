import Image from 'next/image';
import styles from './Header.module.css';
import { FaSearch, FaBell, FaStar } from 'react-icons/fa';

// The toggleSidebar function is received as a prop
export default function Header({ toggleSidebar }) {
    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                {/* This button will open and close the sidebar */}
                <button onClick={toggleSidebar} className={styles.menuButton}>
                    <FaStar color="#7c3aed" size="1.75em" />
                    <span>CampusFlow</span>
                </button>
                <nav className={styles.navLinks}>
                    <a href="#" className={styles.active}>Home</a>
                    <a href="#">Announcements</a>
                </nav>
            </div>

            <div className={styles.rightSection}>
                <div className={styles.searchBar}>
                    <FaSearch color="#6b7280" />
                    <input type="text" placeholder="Search announcements" />
                </div>
                <div className={styles.headerActions}>
                    <button className={styles.announcementsBtn}>
                        Announcements
                    </button>
                    <div className={styles.notificationIcon}>
                        <FaBell />
                        <span className={styles.notificationBadge}>3</span>
                    </div>
                    <div className={styles.userProfile}>
                        <Image src="https://i.pravatar.cc/40" alt="User Avatar" width={40} height={40} className={styles.avatar} />
                        <div className={styles.userInfo}>
                            <div>Name</div>
                            <div>Admin</div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}