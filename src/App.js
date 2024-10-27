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
          <h1 style={styles.heading}>Organize and Track Your Tasks</h1>
        </Link>
        <nav style={styles.nav}>
          {loggedIn ? (
            <>
              <Link to="/STK_Notes_Frontend/dashboard">
                <button style={styles.button}>Dashboard</button>
              </Link>
              <Link to="/STK_Notes_Frontend">
                <button style={styles.button} onClick={handleLogout}>Logout</button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/STK_Notes_Frontend/login">
                <button style={styles.button}>Login</button>
              </Link>
              <Link to="/STK_Notes_Frontend/signup">
                <button style={styles.button}>Signup</button>
              </Link>
            </>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <Routes>
          <Route path="/Task_FrontendVE3" element={<Home />} />
          <Route path="/STK_Notes_Frontend/signup" element={<Signup />} />
          <Route path="/STK_Notes_Frontend/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/STK_Notes_Frontend/dashboard" element={<DashBoard loggedIn={loggedIn} />} />
          <Route path="/STK_Notes_Frontend/newnote" element={<NewNote loggedIn={loggedIn} />} />
          <Route path="/STK_Notes_Frontend/note/:id" element={<NoteDetail />} />
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
    backgroundColor: '#F3F4F6',
    color: '#333',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#4A90E2',
    padding: '20px 30px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
  },
  title: {
    textDecoration: 'none',
    color: '#FFFFFF',
  },
  heading: {
    fontSize: '26px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  nav: {
    display: 'flex',
    gap: '15px',
  },
  button: {
    padding: '10px 25px',
    borderRadius: '25px',
    border: '2px solid transparent',
    cursor: 'pointer',
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: '14px',
    background: 'linear-gradient(45deg, #FF7E5F, #FD3A69)',
    transition: 'all 0.4s ease, background 0.8s ease',
    boxShadow: '0 4px 8px rgba(255, 126, 95, 0.4)',
    backgroundSize: '200% 200%',
    animation: 'gradientShift 5s ease infinite',
    display: 'inline-block',
    position: 'relative',
    overflow: 'hidden',
  },
  main: {
    flex: 1,
    padding: '30px',
    background: '#FFFFFF',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  footer: {
    textAlign: 'center',
    padding: '30px 0',
    background: '#2C3E50',
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
    gap: '15px',
  },
  iconLink: {
    display: 'inline-block',
  },
  icon: {
    width: '30px',
    height: '30px',
    transition: 'transform 0.3s ease',
  },
};

// CSS Keyframes for Gradient Animation
const gradientAnimation = `
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
`;

// Inject the keyframes animation into the document
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(gradientAnimation, styleSheet.cssRules.length);

export default App;
