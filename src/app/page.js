import styles from './page.module.css';
import Image from 'next/image';
import {
  FaSearch, FaBell, FaBullhorn, FaUserGraduate, FaChalkboardTeacher,
  FaShieldAlt, FaCalendarAlt, FaStar, FaBolt
} from 'react-icons/fa';

export default function Dashboard() {

  const announcements = [
    { title: 'About 4A Math Test', class: 'Class 4A', date: '1/12/2025' },              //placeholder data
    { title: 'Annual Sports Day Registration', class: 'All Classes', date: '1/10/2025' },
    { title: 'Science Fair Guidelines', class: 'Class 6-10', date: '1/8/2025' },
  ];

  return (
    <main className={styles.main}>
      <div className={styles.container}>

        <header className={styles.header}>
          <div className={styles.navLeft}>
            <div className={styles.logo}>
              <FaStar color="#7c3aed" size="1.5em" />
              <span>CampusFlow</span>
            </div>
            <nav className={styles.navLinks}>
              <a href="#" className={styles.active}>Home</a>
              <a href="#">Announcements</a>
            </nav>
          </div>
          <div className={styles.navRight}>
            <div className={styles.searchBar}>
              <FaSearch color="#6b7280" />
              <input type="text" placeholder="Search announcements" />
            </div>
            <div className={styles.headerActions}>
              <button className={styles.announcementsBtn}>
                <FaBullhorn /> Announcements
              </button>
              <div className={styles.notificationIcon}>
                <FaBell />
                <span className={styles.notificationBadge}>3</span>
              </div>
              <div className={styles.userProfile}>
                <Image src={null} alt="User Avatar" width={40} height={40} style={{ borderRadius: '50%' }} />
                <div className={styles.userInfo}>
                  <div>Name</div>
                  <div>Admin</div>
                </div>
              </div>
            </div>
          </div>
        </header>


        <div className={styles.dashboardGrid}>                                 {/* Main Dashboard Content */}
          <div className={styles.mainContent}>
            <section className={styles.hero}>
              <div className={styles.heroTag}>Announcements</div>
              <h1>Stay informed with school-wide updates</h1>
              <p>CampusFlow centralizes all your announcements in one place. Browse, search, and manage updates for students, teachers, and parents.</p>
              <div className={styles.heroButtons}>
                <button className={`${styles.btn} ${styles.btnPrimary}`}>
                  <FaBullhorn /> View all announcements
                </button>
                <button className={`${styles.btn} ${styles.btnSecondary}`}>
                  <FaBolt /> Quick create
                </button>
              </div>
            </section>

            <section className={styles.statsContainer}>
              <div className={styles.statCard}>
                <p>Teachers</p>
                <div className={styles.statValue}>
                  <FaChalkboardTeacher className={styles.statIcon} /> 124
                </div>
              </div>
              <div className={styles.statCard}>
                <p>Students</p>
                <div className={styles.statValue}>
                  <FaUserGraduate className={styles.statIcon} /> 1,240
                </div>
              </div>
              <div className={styles.statCard}>
                <p>Security</p>
                <div className={styles.statValue}>
                  <FaShieldAlt className={styles.statIcon} /> SSO
                </div>
              </div>
            </section>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.recentAnnouncements}>
              <div className={styles.recentHeader}>
                <h2>Recent announcements</h2>
                <a href="#" className={styles.viewAllLink}>View all</a>
              </div>
              <div>
                {announcements.map((item, index) => (
                  <div key={index} className={styles.announcementItem}>
                    <div>
                      <div className={styles.announcementTitle}>{item.title}</div>
                      <div className={styles.announcementClass}>{item.class}</div>
                    </div>
                    <div className={styles.announcementDate}>
                      <FaCalendarAlt /> {item.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Quick Overview Table */}
        <section className={styles.overviewContainer}>
          <div className={styles.overviewHeader}>
            <h2>Quick overview</h2>
            <a href="#" className={styles.viewAllLink}>Open announcements</a>
          </div>
          <table className={styles.overviewTable}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Class</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.class}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

      </div>
    </main>
  );
}