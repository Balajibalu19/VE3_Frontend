// NoteDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { backendUrl } from '../config';

const NoteDetail = () => {
    const { noteId } = useParams();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${backendUrl}/api/note/${noteId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setNote(response.data);
            } catch (error) {
                console.error(error);
                setError('Error fetching the note. Please try again later.');
                navigate('/STK_Notes_Frontend/dashboard');
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [noteId, navigate]);

    if (loading) {
        return <h2 style={styles.loading}>Loading...</h2>;
    }

    if (error) {
        return <h2 style={styles.error}>{error}</h2>;
    }

    if (!note) {
        return <h2 style={styles.error}>Note not found.</h2>;
    }

    return (
        <div style={styles.noteDetailContainer}>
            <h2 style={styles.noteTitle}>{note.title}</h2>
            <p style={styles.noteContent}>{note.content}</p>
            <button style={styles.backButton} onClick={() => navigate(-1)}>
                Back to Dashboard
            </button>
        </div>
    );
};

const styles = {
    noteDetailContainer: {
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        margin: 'auto',
        marginTop: '20px',
    },
    noteTitle: {
        fontSize: '24px',
        color: '#007bff',
        marginBottom: '10px',
    },
    noteContent: {
        fontSize: '18px',
        color: '#495057',
    },
    backButton: {
        padding: '10px 15px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
        transition: 'background-color 0.3s',
    },
    loading: {
        textAlign: 'center',
        marginTop: '20px',
    },
    error: {
        textAlign: 'center',
        color: '#dc3545',
        marginTop: '20px',
    },
};

export default NoteDetail;


