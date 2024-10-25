import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import UpdateNote from '../components/UpdateNote';
import { backendUrl } from '../config';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'; // Import icons

const DashBoard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [notes, setNotes] = useState([]);
    const [updateNoteId, setUpdateNoteId] = useState(null);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${backendUrl}/api/dashboard`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUsername(response.data.username);
            setNotes(response.data.notes);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/STK_Notes_Frontend/login');
        } else {
            fetchData();
        }
    }, [navigate]);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${backendUrl}/api/newnote/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const newNotes = notes.filter(note => note._id !== id);
            setNotes(newNotes);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = (noteId) => {
        setUpdateNoteId(noteId);
    };

    const handleUpdateNoteClose = () => {
        setUpdateNoteId(null);
    };

    const handleViewDetails = (noteId) => {
        navigate(`/STK_Notes_Frontend/note/${noteId}`);
    };

    return (
        <div style={styles.dashboard}>
            <div style={styles.header}>
                <h2 style={styles.greeting}>Hey, {username}</h2>
                <Link to="/STK_Notes_Frontend/newnote">
                    <button style={styles.newTaskBtn}>
                        <FaPlus style={{ marginRight: '5px' }} /> New Task
                    </button>
                </Link>
            </div>
            {loading ? (
                <h2 style={styles.loading}>Loading...</h2>
            ) : (
                <div style={styles.userNotes}>
                    {notes && notes.length === 0 ? (
                        <h2 style={styles.noNotesMessage}>No notes available. Create a new note.</h2>
                    ) : (
                        notes.map(note => (
                            <div key={note._id} style={styles.noteContainer} onClick={() => handleViewDetails(note._id)}>
                                <h3 style={styles.noteTitle}>{note.title}</h3>
                                <p style={styles.noteContent}>{note.content.length > 100 ? `${note.content.substring(0, 100)}...` : note.content}</p>
                                <div style={styles.buttonContainer}>
                                    <button 
                                        style={styles.editButton} 
                                        onClick={(e) => { e.stopPropagation(); handleUpdate(note._id); }}>
                                        <FaEdit style={{ marginRight: '5px' }} /> Edit
                                    </button>
                                    <button 
                                        style={styles.deleteButton} 
                                        onClick={(e) => { e.stopPropagation(); handleDelete(note._id); }}>
                                        <FaTrash style={{ marginRight: '5px' }} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {updateNoteId && (
                <UpdateNote
                    noteId={updateNoteId}
                    onClose={handleUpdateNoteClose}
                    onUpdate={fetchData}
                />
            )}
        </div>
    );
};

const styles = {
    dashboard: {
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    greeting: {
        color: '#343a40',
        fontSize: '24px',
        fontWeight: 'bold',
    },
    newTaskBtn: {
        padding: '10px 15px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        transition: 'background-color 0.3s',
    },
    loading: {
        textAlign: 'center',
    },
    userNotes: {
        marginTop: '20px',
    },
    noNotesMessage: {
        textAlign: 'center',
        color: '#868e96',
    },
    noteContainer: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '20px',
        margin: '10px 0',
        cursor: 'pointer',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
    },
    noteTitle: {
        color: '#007bff',
        fontSize: '22px',
        margin: '0 0 10px',
    },
    noteContent: {
        color: '#495057',
        fontSize: '16px',
        margin: '0 0 15px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    editButton: {
        padding: '5px 10px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
    },
    deleteButton: {
        padding: '5px 10px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
    },
};

export default DashBoard;
