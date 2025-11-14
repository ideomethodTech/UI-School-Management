'use client'; // This component uses state, so it must be a Client Component
import { useState } from 'react';
import styles from './page.module.css';
import { FaUser, FaSave, FaEye, FaEyeSlash } from 'react-icons/fa';
import LogoutModal from '../logout/page.js';

export default function SettingsPage() {
    // State for form inputs
    const [formData, setFormData] = useState({
        firstName: 'Vrinda',
        lastName: 'Devadas',
        email: 'vrinda@campusflow.com',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });




    // State for password visibility
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you would add validation and send this data to your backend API
        if (formData.newPassword !== formData.confirmPassword) {
            alert("New passwords do not match!");
            return;
        }
        console.log("Saving account changes:", formData);
        alert("Account changes saved successfully! (Check console for data)");
    };

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);


    const handleLogout = () => {

        console.log("Logging out...");
        setIsLogoutModalOpen(false); // Close the modal
        // Redirect to login page, e.g., router.push('/login');
        alert("You have been logged out.");
    };

    return (
        <div className={styles.container}>
            <p className={styles.pageSubtitle}>Manage your account settings</p>

            <div className={styles.settingsCard}>
                <div className={styles.header}>
                    <FaUser className={styles.headerIcon} />
                    <h2>Account Settings</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Personal Info Section */}
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} className={styles.formInput} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} className={styles.formInput} />
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className={styles.formInput} />
                    </div>

                    <hr className={styles.divider} />

                    {/* Change Password Section */}
                    <h3 className={styles.sectionTitle}>Change Password</h3>
                    <div className={styles.formGroup}>
                        <label htmlFor="currentPassword">Current Password</label>
                        <input type="password" id="currentPassword" name="currentPassword" placeholder="Enter current password" value={formData.currentPassword} onChange={handleInputChange} className={styles.formInput} />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="newPassword">New Password</label>
                        <div className={styles.passwordWrapper}>
                            <input type={showNewPassword ? 'text' : 'password'} id="newPassword" name="newPassword" placeholder="Enter new password" value={formData.newPassword} onChange={handleInputChange} className={styles.formInput} />
                            <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className={styles.eyeIcon}>
                                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className={styles.passwordWrapper}>
                            <input type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" placeholder="Confirm new password" value={formData.confirmPassword} onChange={handleInputChange} className={styles.formInput} />
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className={styles.eyeIcon}>
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>


                    <button type="submit" className={styles.saveButton}>
                        <FaSave />
                        Save Account Changes
                    </button>

                    <div className={styles.logoutSection}>
                        <button onClick={() => setIsLogoutModalOpen(true)} className={styles.logoutButton}>
                            Logout
                        </button>
                    </div>

                    <LogoutModal
                        isOpen={isLogoutModalOpen}
                        onClose={() => setIsLogoutModalOpen(false)}
                        onConfirm={handleLogout}
                    />
                </form>
            </div>
        </div>
    );
}