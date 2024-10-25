import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../config';

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            showError('Passwords do not match');
        } else {
            axios.post(`${backendUrl}/api/signup`, { username, email, password })
                .then(res => {
                    console.log(res.data);
                    alert('Signup successful. You can now login.');
                    navigate('/STK_Notes_Frontend/login');
                })
                .catch(err => {
                    console.error(err);
                    if (err.response) {
                        showError(err.response.data.message || 'Internal server error. Please try again later.');
                    } else {
                        showError('Failed to connect to the server. Please try again later.');
                    }
                });
        }
    }

    const showError = (errorMessage) => {
        setError(errorMessage);
        setShowToast(true);
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.heading}>Create Your Account</h2>
                <form onSubmit={submitHandler} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label htmlFor='username' style={styles.label}>Username</label>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor='email' style={styles.label}>Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
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
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor='confirmPassword' style={styles.label}>Confirm Password</label>
                        <input
                            type='password'
                            id='confirmPassword'
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <button type='submit' style={styles.button}>Signup</button>
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
        background: 'linear-gradient(to right, #A7C5E5, #F1A7A1)', // New gradient background
        padding: '20px',
    },
    card: {
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#FFFFFF',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)', // Shadow for card
        textAlign: 'center',
    },
    heading: {
        fontSize: '1.8rem',
        color: '#2B3A42',
        marginBottom: '20px',
        fontWeight: '700', // Bolder heading
        fontFamily: 'Arial, sans-serif', // Different font style
    },
    form: {
        width: '100%',
    },
    formGroup: {
        marginBottom: '15px', // Adjusted spacing between form groups
    },
    label: {
        fontSize: '0.9rem',
        color: '#2B3A42',
        marginBottom: '5px',
        display: 'block',
        textAlign: 'left',
        fontFamily: 'Arial, sans-serif', // Different font style
    },
    input: {
        width: '90%', // Decreased width of input placeholders
        padding: '8px 10px',
        fontSize: '0.8rem', // Smaller font size
        borderRadius: '6px',
        border: '1px solid #BDC3C7',
        outline: 'none',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        transition: 'border 0.3s ease, box-shadow 0.3s ease',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#F06D78', // New button color
        color: '#FFFFFF',
        fontSize: '1rem',
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

export default Signup;
