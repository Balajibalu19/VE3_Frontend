import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../config';

const NewNote = (props) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            // If token does not exist, navigate to login page
            navigate('/STK_Notes_Frontend/login');
        }
    }, []);

    const SubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${backendUrl}/api/newnote`, { title, content }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response.data;
            if (response.status === 201) {
                console.log(data.message);
                setTitle('');
                setContent('');
                navigate('/STK_Notes_Frontend/dashboard');
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div style={styles.newNoteContainer}>
            <div style={styles.nNRow1}>
                <Link to='/STK_Notes_Frontend/dashboard'>
                    <h3 style={styles.dashboardLink}>DashBoard</h3>
                </Link>
                <span style={styles.breadcrumb}>/ New Task</span>
            </div>
            <h2 style={styles.addNoteTag}>Add Task</h2>
            <form style={styles.newNoteForm} onSubmit={SubmitHandler}>
                <div style={styles.formGroup}>
                    <label htmlFor='title' style={styles.label}><h3>Title:</h3></label>
                    <input
                        type='text'
                        id='title'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        style={styles.inputField}
                        placeholder="Enter Task Title..."
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor='content' style={styles.label}><h3>Content:</h3></label>
                    <textarea
                        id='content'
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        style={styles.textArea}
                        placeholder="Enter Task Content..."
                    ></textarea>
                </div>
                <div style={styles.formGroup}>
                    <button style={styles.addNoteBtn} type='submit'>Add </button>
                </div>
            </form>
        </div>
    );
}

const styles = {
    newNoteContainer: {
        maxWidth: '700px',
        margin: '50px auto',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    nNRow1: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
    },
    dashboardLink: {
        color: '#007bff',
        textDecoration: 'none',
        fontSize: '18px',
        fontWeight: 'bold',
    },
    breadcrumb: {
        marginLeft: '10px',
        color: '#6c757d',
    },
    addNoteTag: {
        textAlign: 'center',
        color: '#343a40',
        fontSize: '28px',
        marginBottom: '30px',
    },
    newNoteForm: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        fontSize: '18px',
        color: '#495057',
    },
    inputField: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ced4da',
        outline: 'none',
        transition: 'border-color 0.2s ease-in-out',
        marginTop: '5px',
    },
    inputFieldFocus: {
        borderColor: '#80bdff',
    },
    textArea: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ced4da',
        outline: 'none',
        transition: 'border-color 0.2s ease-in-out',
        marginTop: '5px',
        minHeight: '150px',
        resize: 'vertical',
    },
    addNoteBtn: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: '#fff',
        fontSize: '16px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease-in-out',
    },
    addNoteBtnHover: {
        backgroundColor: '#218838',
    },
};

export default NewNote;
