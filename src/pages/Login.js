import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../config.js';

const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 5000); // Hide the toast after 5 seconds
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${backendUrl}/api/login`, { email, password })
            .then(res => {
                console.log(res.data);
                const token = res.data.token;

                // Store the token in local storage
                localStorage.setItem('token', token);
                props.setLoggedIn(true);
                navigate('/STK_Notes_Frontend/dashboard');
            })
            .catch(err => {
                console.error('Error:', err);
                if (err.response) {
                    showError(err.response.data.message);
                } else {
                    showError('Failed to connect to the server. Please try again later.');
                }
            });
    }

    const showError = (errorMessage) => {
        setError(errorMessage);
        setShowToast(true);
    }

    return (
        <div style={styles.container}>
            <div style={styles.overlay}></div> {/* Overlay for better readability */}
            <div style={styles.card}>
                <h2 style={styles.heading}>Login</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label htmlFor='email' style={styles.label}>Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor='password' style={styles.label}>Password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <button type='submit' style={styles.button}>Login</button>
                    </div>
                </form>
                {showToast && (
                    <div style={styles.toast}>
                        {error}
                        <div style={styles.toastProgress}></div>
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'url("") no-repeat center center fixed', // Replace with your image URL
        backgroundSize: 'cover', // Ensures the image covers the whole background
        position: 'relative',
        padding: '20px',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay to improve text visibility
        zIndex: 1,
    },
    card: {
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#FFFFFF',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)', // Stronger shadow
        textAlign: 'center',
        position: 'relative', // Positioning for the card above overlay
        zIndex: 2, // Ensure the card is above the overlay
    },
    heading: {
        fontSize: '2.5rem',
        color: '#2C3E50',
        marginBottom: '20px',
        fontWeight: '600',
    },
    form: {
        width: '100%',
    },
    formGroup: {
        marginBottom: '25px', // Increased space between form groups
    },
    label: {
        fontSize: '1.1rem',
        color: '#34495E',
        marginBottom: '8px', // Increased margin for better spacing
        display: 'block',
        textAlign: 'left', // Align labels to the left
    },
    input: {
        width: '90%', // Reduced width for input fields
        margin: '0 auto', // Center the input fields
        padding: '12px 15px', // Added extra padding for a comfortable feel
        fontSize: '0.9rem', // Decreased font size for placeholders
        borderRadius: '6px',
        border: '1px solid #BDC3C7',
        transition: 'border 0.3s ease, box-shadow 0.3s ease',
        outline: 'none',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Shadow for inputs
    },
    button: {
        width: '100%',
        padding: '12px 15px', // Added extra padding for comfort
        backgroundColor: '#3498DB',
        color: '#FFFFFF',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
    },
    toast: {
        marginTop: '20px',
        padding: '12px 20px',
        backgroundColor: '#E74C3C',
        color: '#FFFFFF',
        borderRadius: '6px',
        textAlign: 'center',
        position: 'relative',
    },
    toastProgress: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: '4px',
        backgroundColor: '#FF6F61',
        width: '100%',
        animation: 'progress 5s linear',
    },
};

export default Login;
