import Link from 'next/link';
import styles from './Sidebar.module.css';
import {
    FaHome, FaChalkboardTeacher, FaUserGraduate, FaUserFriends, FaBook,
    FaRegListAlt, FaPencilAlt, FaFileSignature, FaRegChartBar, FaCalendarCheck,
    FaCalendarAlt, FaEnvelope, FaBullhorn
} from 'react-icons/fa';

const menuItems = [

    { href: '/', icon: FaHome, label: 'Home' },
    { href: '/teachers', icon: FaChalkboardTeacher, label: 'Teachers' },
    // est of the menu items....
];

export default function Sidebar({ isOpen }) {
    return (
        // 'open' class is added conditionally based on the isOpen prop
        <nav className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            <div className={styles.menuHeader}>
                {/* We can add a logo here if needed when it's open */}
                <span>MENU</span>
            </div>
            <ul>
                {menuItems.map((item) => (
                    <li key={item.label}>
                        <Link href={item.href}>
                            <item.icon className={styles.icon} />
                            <span className={styles.label}>{item.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}