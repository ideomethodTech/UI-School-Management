import styles from './page.module.css';
import { FaSignOutAlt } from 'react-icons/fa';

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
    // If the modal isn't supposed to be open, render nothing.
    if (!isOpen) {
        return null;
    }

    return (
        // The overlay is the dark background. Clicking it will close the modal.
        <div className={styles.overlay} onClick={onClose}>
            {/* This prevents clicks inside the modal from closing it */}
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.iconWrapper}>
                    <FaSignOutAlt />
                </div>
                <h2>Logout Confirmation</h2>
                <p>Are you sure you want to log out from your account?</p>
                <div className={styles.buttonContainer}>
                    <button onClick={onClose} className={`${styles.btn} ${styles.cancelBtn}`}>
                        No, Cancel
                    </button>
                    <button onClick={onConfirm} className={`${styles.btn} ${styles.confirmBtn}`}>
                        Yes, Logout
                    </button>
                </div>
            </div>
        </div>
    );
}