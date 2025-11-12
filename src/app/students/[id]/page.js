'use client';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { studentsData } from '@/lib/data';
import {
    FaCheckCircle, FaBookOpen, FaSchool, FaMapMarkerAlt, FaArrowLeft, FaPen, FaTint, FaBirthdayCake, FaEnvelope, FaPhone,
    FaTimes, FaUpload
} from 'react-icons/fa';

export default function StudentDetailPage({ params }) {


    const resolvedParams = React.use(params);
    const student = studentsData.find(s => String(s.id) === resolvedParams.id);

    const [isModalOpen, setIsModalOpen] = useState(false);

    //  we'll use the basic info and add placeholders.
    const [formState, setFormState] = useState({
        username: student?.name.toLowerCase().replace(' ', '') || '',
        email: `user@gmail.com`,
        password: '••••••••',
        firstName: student?.name.split(' ')[0] || '',
        lastName: student?.name.split(' ')[1] || '',
        phone: student?.phone || '',
        address: student?.address || '',
        bloodType: 'A+',
        birthday: 'dd-mm-yyyy',
        sex: 'Male',
    });

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        console.log("Updated data:", formState);
        closeModal();
    };


    const [activeTab, setActiveTab] = useState('workWeek'); // 'workWeek' or 'day'

    // Dummy data for the schedule
    const scheduleData = {
        workWeek: [
            { time: '8:00 AM', events: [null, { name: 'Math' }, null, { name: 'History' }, null] },
            { time: '9:00 AM', events: [null, { name: 'Math' }, { name: 'English' }, { name: 'History' }, null] },
            { time: '10:00 AM', events: [{ name: 'Science' }, null, { name: 'English' }, null, { name: 'Art' }] },
            { time: '11:00 AM', events: [{ name: 'Science' }, null, null, null, { name: 'Art' }] },
            { time: '12:00 PM', events: [null, null, null, null, null] },
            { time: '1:00 PM', events: [{ name: 'Music' }, null, { name: 'P.E.' }, null, null] },
            { time: '2:00 PM', events: [{ name: 'Music' }, { name: 'Geography' }, { name: 'P.E.' }, null, null] },
        ],
        day: [
            { time: '8:00 AM', events: [{ name: 'Math Class' }] },
            { time: '9:00 AM', events: [null] },
            { time: '10:00 AM', events: [{ name: 'Assembly' }] },
            { time: '11:00 AM', events: [null] },
            { time: '12:00 PM', events: [{ name: 'Lunch Break' }] },
        ]


    };

    // Handle case where student is not found
    if (!student) {
        return (
            <div className={styles.container}>
                <h1>Student not found.</h1>
                <Link href="/students">Back to All Students</Link>
            </div>
        );
    }

    const performanceValue = 9.2;
    const performancePercentage = (performanceValue / 10) * 100;

    return (

        <div className={styles.container}>

            <Link href="/students" className={styles.backLink}>
                <FaArrowLeft /> Back to All Students
            </Link>

            <div className={styles.dashboardGrid}>
                {/* -- ROW 1 -- */}
                <div className={`${styles.card} ${styles.profileCard}`}>
                    <div className={styles.profileHeader}>
                        <h2>{student.name}</h2>

                        <button onClick={openModal} className={styles.editButton}><FaPen /></button>
                    </div>
                    <Image src={student.avatar} alt={student.name} width={80} height={80} className={styles.profileAvatar} />
                    <p>Grade {student.grade}</p>
                    <p className={styles.address}>{student.address}</p>

                    <div className={styles.profileContactGrid}>
                        <span><FaTint /> A+</span>
                        <span><FaBirthdayCake /> January 2025</span>
                        <span><FaEnvelope /> user@gmail.com</span>
                        <span><FaPhone /> +1 234 567</span>
                    </div>
                </div>

                <div className={`${styles.card} ${styles.overviewCard}`}>
                    <h4 className={styles.cardTitle}>Overview</h4>
                    <div className={styles.statsGrid}>
                        <div className={styles.statItem}><FaCheckCircle /><div><span>Attendance</span><strong>90%</strong></div></div>
                        <div className={styles.statItem}><FaBookOpen /><div><span>Lessons</span><strong>6</strong></div></div>
                        <div className={styles.statItem}><FaSchool /><div><span>Classes</span><strong>6</strong></div></div>
                        <div className={styles.statItem}><FaMapMarkerAlt /><div><span>Branches</span><strong>2</strong></div></div>
                    </div>
                </div>

                <div className={`${styles.card} ${styles.performanceCard}`}>
                    <h4 className={styles.cardTitle}>Performance</h4>
                    <p className={styles.performanceScore}><strong>{performanceValue} of 10</strong></p>
                    <div className={styles.progressCircle} style={{ '--p': performancePercentage }}>
                        <div className={styles.progressValue}>{performanceValue}</div>
                    </div>
                    <p className={styles.progressLabel}>of 10 max LTS</p>
                </div>

                {/* -- ROW 2 -- */}
                <div className={`${styles.card} ${styles.scheduleCard}`}>
                    <div className={styles.cardHeader}>
                        <h3>Schedule</h3>
                        <div className={styles.tabs}>
                            <button
                                className={activeTab === 'workWeek' ? styles.activeTab : ''}
                                onClick={() => setActiveTab('workWeek')}
                            >
                                Work Week
                            </button>
                            <button
                                className={activeTab === 'day' ? styles.activeTab : ''}
                                onClick={() => setActiveTab('day')}
                            >
                                Day
                            </button>
                        </div>
                    </div>


                    <div className={styles.scheduleGrid}>
                        <div className={styles.timeColumn}>
                            {scheduleData[activeTab].map(({ time }) => (
                                <div key={time} className={styles.timeLabel}>{time}</div>
                            ))}
                        </div>
                        <div className={styles.daysContainer}>

                            {Array.from({ length: scheduleData[activeTab][0].events.length }).map((_, i) => (
                                <div key={i} className={styles.dayColumn}></div>
                            ))}

                            <div className={styles.currentTimeIndicator}></div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.card} ${styles.announcementsCard}`}>
                    <div className={styles.cardHeader}>
                        <h3>Announcements</h3>
                        <Link href="#" className={styles.viewAll}>View All</Link>
                    </div>
                    <div className={styles.announcementList}>
                        <div className={styles.announcementItem} id={styles.announcement1}>
                            <div className={styles.announcementHeader}><strong>Lorem ipsum dolor sit</strong><span>2025-01-01</span></div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpatum, expedita.</p>
                        </div>
                        <div className={styles.announcementItem} id={styles.announcement2}>
                            <div className={styles.announcementHeader}><strong>Lorem ipsum dolor sit</strong><span>2025-01-01</span></div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpatum, expedita.</p>
                        </div>
                    </div>
                </div>

                {isModalOpen && (
                    <div className={styles.overlay} onClick={closeModal}>
                        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                            <div className={styles.modalHeader}>
                                <h2>Create a new teacher</h2>
                                <button onClick={closeModal} className={styles.closeButton}><FaTimes /></button>
                            </div>
                            <form onSubmit={handleUpdate}>
                                <div className={styles.formSection}>
                                    <p className={styles.sectionTitle}>Authentication Information</p>
                                    <div className={styles.formGrid}>
                                        <div className={styles.formGroup}><label>Username</label><input type="text" name="username" value={formState.username} onChange={handleInputChange} /></div>
                                        <div className={styles.formGroup}><label>Email</label><input type="email" name="email" value={formState.email} onChange={handleInputChange} /></div>
                                        <div className={styles.formGroup}><label>Password</label><input type="password" name="password" value={formState.password} onChange={handleInputChange} /></div>
                                    </div>
                                </div>
                                <div className={styles.formSection}>
                                    <p className={styles.sectionTitle}>Personal Information</p>
                                    <div className={styles.formGrid}>
                                        <div className={styles.formGroup}><label>First Name</label><input type="text" name="firstName" value={formState.firstName} onChange={handleInputChange} /></div>
                                        <div className={styles.formGroup}><label>Last Name</label><input type="text" name="lastName" value={formState.lastName} onChange={handleInputChange} /></div>
                                        <div className={styles.formGroup}><label>Phone</label><input type="tel" name="phone" value={formState.phone} onChange={handleInputChange} /></div>
                                        <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}><label>Address</label><input type="text" name="address" value={formState.address} onChange={handleInputChange} /></div>
                                        <div className={styles.formGroup}><label>Blood Type</label><input type="text" name="bloodType" value={formState.bloodType} onChange={handleInputChange} /></div>
                                        <div className={styles.formGroup}><label>Birthday</label><div className={styles.dateInputWrapper}><input type="text" name="birthday" value={formState.birthday} onChange={handleInputChange} /><FaBirthdayCake /></div></div>
                                        <div className={styles.formGroup}><label>Sex</label><select name="sex" value={formState.sex} onChange={handleInputChange}><option>Male</option><option>Female</option></select></div>
                                        <div className={styles.formGroup}><label>&nbsp;</label><button type="button" className={styles.uploadBtn}><FaUpload /> Upload a photo</button></div>
                                    </div>
                                </div>
                                <button type="submit" className={styles.updateBtn}>Update</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>


        </div>
    );
}