import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashBoard from './pages/DashBoard';
import NewNote from './pages/NewNote';
import NotFound from './pages/NotFound';
import NoteDetail from './pages/NoteDetail'; // Import the new NoteDetail component

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <div className="App" style={styles.app}>
      {/* Header */}
      <header style={styles.header}>
        <Link to="/STK_Notes_Frontend" style={styles.title}>
          <h1>Organize and Track Your Tasks</h1>
        </Link>
        <nav style={styles.nav}>
          {loggedIn ? (
            <>
              <Link to="/STK_Notes_Frontend/dashboard">
                <button className="btn dashboard_btn" style={styles.button}>Dashboard</button>
              </Link>
              <Link to="/STK_Notes_Frontend">
                <button className="btn logout_btn" style={styles.button} onClick={handleLogout}>Logout</button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/STK_Notes_Frontend/login">
                <button className="btn login_btn" style={styles.button}>Login</button>
              </Link>
              <Link to="/STK_Notes_Frontend/signup">
                <button className="btn signup_btn" style={styles.button}>Signup</button>
              </Link>
            </>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <Routes>
          <Route path="/STK_Notes_Frontend" element={<Home />} />
          <Route path="/STK_Notes_Frontend/signup" element={<Signup />} />
          <Route path="/STK_Notes_Frontend/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/STK_Notes_Frontend/dashboard" element={<DashBoard loggedIn={loggedIn} />} />
          <Route path="/STK_Notes_Frontend/newnote" element={<NewNote loggedIn={loggedIn} />} />
          <Route path="/STK_Notes_Frontend/note/:id" element={<NoteDetail />} /> {/* Route for note details */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <h2 style={styles.footerText}>Task &copy; 2024</h2>
          <div style={styles.iconContainer}>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={styles.iconLink}>
              <img src="https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png" alt="Facebook" style={styles.icon} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={styles.iconLink}>
              <img src="https://img.icons8.com/ios-filled/50/ffffff/twitter.png" alt="Twitter" style={styles.icon} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={styles.iconLink}>
              <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png" alt="Instagram" style={styles.icon} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" style={styles.iconLink}>
              <img src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png" alt="LinkedIn" style={styles.icon} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Styles for the App component
const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#F3F4F6', // Light gray background
    color: '#333',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#4A90E2', // Blue header
    padding: '20px 30px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
  },
  title: {
    textDecoration: 'none',
    color: '#FFFFFF', // White title color
    fontSize: '30px', // Increased font size
    fontWeight: '700', // Bold title
  },
  nav: {
    display: 'flex',
    gap: '15px',
  },
  button: {
    padding: '10px 25px', // Increased button padding
    borderRadius: '30px', // More rounded buttons
    border: 'none',
    cursor: 'pointer',
    background: '#F39C12', // Orange button background
    color: '#FFFFFF', // White button text
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.2)', // Button shadow
    transition: 'background 0.3s ease, transform 0.2s ease',
    fontWeight: '600',
    fontSize: '16px', // Font size for buttons
  },
  main: {
    flex: 1,
    padding: '30px',
    background: '#FFFFFF', // White main content area
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Main content shadow
  },
  footer: {
    textAlign: 'center',
    padding: '30px 0',
    background: '#2C3E50', // Darker background for footer
    color: '#FFFFFF',
    position: 'relative',
  },
  footerContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  footerText: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px', // Space between icons
  },
  iconLink: {
    display: 'inline-block',
  },
  icon: {
    width: '30px', // Icon size
    height: '30px',
    transition: 'transform 0.3s ease', // Animation on hover
  },
};

export default App;
