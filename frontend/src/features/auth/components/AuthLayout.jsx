/* src/features/auth/components/AuthLayout.jsx 
| -- Auth Layout Component
| -- wrapper layout for authentication pages, providing consistent styling and structure.
 */
import React from 'react';

const AuthLayout = ({ children }) => {
    return (
        <div style={styles.container}>
            {/* Left Side (Branding and Image) */}
            <div style={styles.left}>
                <div style={styles.branding}>
                    <h1 style={styles.title}>Hotel Management System</h1>
                    <p style={styles.subtitle}>Manage bookings, rooms, and guests efficiently.</p>
                </div>
                <div style={styles.imageContainer}>
                    <img
                        src="/assets/hotel.jpg"
                        alt="Hotel"
                        style={styles.image}
                    />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
