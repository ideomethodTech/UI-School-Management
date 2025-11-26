// src/app/dashboard/settings/page.js
'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import {
    FaUser,
    FaSave,
    FaEye,
    FaEyeSlash,
    FaShieldAlt,
    FaPencilAlt,
    FaTrash,
    FaPlus
} from 'react-icons/fa';
import LogoutModal from '../logout/page.js';
import { useUser } from '@/contexts/UserContext'; // 1. Import the useUser hook

// Admin Modal Component (no changes needed here)
const AdminModal = ({ isOpen, onClose, onSave, admin }) => {
    const [formData, setFormData] = useState({ name: '', email: '', role: 'Admin' });
    useEffect(() => {
        if (isOpen) {
            if (admin) setFormData({ name: admin.name, email: admin.email, role: admin.role });
            else setFormData({ name: '', email: '', role: 'Admin' });
        }
    }, [admin, isOpen]);
    if (!isOpen) return null;
    const handleInputChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };

    return (
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <h2 className={styles.modalHeader}>{admin ? 'Edit Admin' : 'Add New Admin'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}><label htmlFor="adminName">Full Name</label><input type="text" id="adminName" name="name" value={formData.name} onChange={handleInputChange} className={styles.formInput} required /></div>
                    <div className={styles.formGroup}><label htmlFor="adminEmail">Email Address</label><input type="email" id="adminEmail" name="email" value={formData.email} onChange={handleInputChange} className={styles.formInput} required /></div>
                    <div className={styles.formGroup}><label htmlFor="adminRole">Role</label><select id="adminRole" name="role" value={formData.role} onChange={handleInputChange} className={styles.formInput}><option value="Admin">Admin</option><option value="Super Admin">Super Admin</option></select></div>
                    <div className={styles.modalFooter}><button type="button" onClick={onClose} className={`${styles.modalButton} ${styles.cancelButton}`}>Cancel</button><button type="submit" className={`${styles.modalButton} ${styles.saveModalButton}`}>Save</button></div>
                </form>
            </div>
        </div>
    );
};


export default function SettingsPage() {
    const { currentUserRole } = useUser(); // 2. Get the current user's role

    // State for form inputs
    const [formData, setFormData] = useState({
        firstName: 'Vrinda',
        lastName: 'Devadas',
        email: 'vrinda@campusflow.com',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    // ... (all other state and handlers remain the same)
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [admins, setAdmins] = useState([
        { id: 1, name: 'Akshat Maheshwari', email: 'akshat@campusflow.com', role: 'Super Admin', status: 'Active' },
        { id: 2, name: 'Priya Sharma', email: 'priya@campusflow.com', role: 'Admin', status: 'Active' },
        { id: 3, name: 'Raj Kumar', email: 'raj@campusflow.com', role: 'Admin', status: 'Inactive' },
    ]);
    const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
    const [currentAdmin, setCurrentAdmin] = useState(null);
    const handleInputChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) { alert("New passwords do not match!"); return; }
        console.log("Saving account changes:", formData);
        alert("Account changes saved successfully!");
    };
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const handleLogout = () => { console.log("Logging out..."); setIsLogoutModalOpen(false); alert("You have been logged out."); };
    const handleOpenAddModal = () => { setCurrentAdmin(null); setIsAdminModalOpen(true); };
    const handleOpenEditModal = (admin) => { setCurrentAdmin(admin); setIsAdminModalOpen(true); };
    const handleCloseAdminModal = () => { setIsAdminModalOpen(false); setCurrentAdmin(null); };
    const handleSaveAdmin = (adminData) => {
        if (currentAdmin) {
            setAdmins(admins.map(ad => ad.id === currentAdmin.id ? { ...ad, ...adminData } : ad));
        } else {
            setAdmins([...admins, { id: Date.now(), ...adminData, status: 'Active' }]);
        }
        handleCloseAdminModal();
    };
    const handleDeleteAdmin = (adminId) => {
        if (window.confirm('Are you sure you want to delete this admin?')) {
            setAdmins(admins.filter(ad => ad.id !== adminId));
        }
    };

    return (
        <div className={styles.container}>
            <p className={styles.pageSubtitle}>Manage your account settings</p>

            <div className={styles.settingsCard}>
                <div className={styles.header}><FaUser className={styles.headerIcon} /><h2>Account Settings</h2></div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}><label htmlFor="firstName">First Name</label><input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} className={styles.formInput} /></div>
                        <div className={styles.formGroup}><label htmlFor="lastName">Last Name</label><input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} className={styles.formInput} /></div>
                    </div>
                    <div className={styles.formGroup}><label htmlFor="email">Email Address</label><input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className={styles.formInput} /></div>
                    <hr className={styles.divider} />
                    <h3 className={styles.sectionTitle}>Change Password</h3>
                    <div className={styles.formGroup}><label htmlFor="currentPassword">Current Password</label><input type="password" id="currentPassword" name="currentPassword" placeholder="Enter current password" value={formData.currentPassword} onChange={handleInputChange} className={styles.formInput} /></div>
                    <div className={styles.formGroup}><label htmlFor="newPassword">New Password</label><div className={styles.passwordWrapper}><input type={showNewPassword ? 'text' : 'password'} id="newPassword" name="newPassword" placeholder="Enter new password" value={formData.newPassword} onChange={handleInputChange} className={styles.formInput} /><button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className={styles.eyeIcon}>{showNewPassword ? <FaEyeSlash /> : <FaEye />}</button></div></div>
                    <div className={styles.formGroup}><label htmlFor="confirmPassword">Confirm Password</label><div className={styles.passwordWrapper}><input type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" placeholder="Confirm new password" value={formData.confirmPassword} onChange={handleInputChange} className={styles.formInput} /><button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className={styles.eyeIcon}>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</button></div></div>
                    <button type="submit" className={styles.saveButton}><FaSave /> Save Account Changes</button>
                    <div className={styles.logoutSection}><button type="button" onClick={() => setIsLogoutModalOpen(true)} className={styles.logoutButton}>Logout</button></div>
                    <LogoutModal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} onConfirm={handleLogout} />
                </form>
            </div>

            {/* 3. Wrap the "Manage Admins" section in a conditional check */}
            {currentUserRole === 'admin' && (
                <>
                    {/* Manage Admins Section */}
                    <div className={styles.adminCard}>
                        <div className={styles.adminHeader}>
                            <div className={styles.header}><FaShieldAlt className={styles.headerIcon} /><h2>Manage Admins</h2></div>
                            <button onClick={handleOpenAddModal} className={styles.addAdminButton}><FaPlus /> Add Admin</button>
                        </div>
                        <div className={styles.adminList}>
                            {admins.map(admin => (
                                <div key={admin.id} className={styles.adminItem}>
                                    <div className={styles.adminInfo}>
                                        <div className={styles.adminAvatar}><FaUser /></div>
                                        <div className={styles.adminDetails}><span className={styles.adminName}>{admin.name}</span><span className={styles.adminEmail}>{admin.email}</span></div>
                                    </div>
                                    <div className={styles.adminMeta}><span className={styles.adminRole}>{admin.role}</span><span className={`${styles.adminStatus} ${admin.status === 'Active' ? styles.statusActive : styles.statusInactive}`}>{admin.status}</span></div>
                                    <div className={styles.adminActions}>
                                        <button onClick={() => handleOpenEditModal(admin)} className={styles.actionButton} aria-label="Edit Admin"><FaPencilAlt /></button>
                                        <button onClick={() => handleDeleteAdmin(admin.id)} className={styles.actionButton} aria-label="Delete Admin"><FaTrash /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Admin Modal for Add/Edit */}
                    <AdminModal isOpen={isAdminModalOpen} onClose={handleCloseAdminModal} onSave={handleSaveAdmin} admin={currentAdmin} />
                </>
            )}
        </div>
    );
}