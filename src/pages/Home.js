import React from 'react';

const Home = () => {
    return (
        <div style={styles.wrapper}>
            <h1 style={styles.title}>Welcome to Your Task Manager</h1>
            <p style={styles.description}>
                A simple and efficient way to keep track of your tasks and manage your time effectively. 
                Organize your life, boost your productivity, and achieve your goals effortlessly!
            </p>
            <div style={styles.visuals}>
                <img 
                    src="https://img.freepik.com/free-photo/marketing-young-cute-blonde-girl-grey-suit-office-writing-down-notes_140725-165614.jpg?t=st=1729781730~exp=1729785330~hmac=7fb89230f18773a55571b942982683f12723eec7bf5c0f6784cb7c07390d565e&w=1060" 
                    alt="Task Management" 
                    style={styles.image}
                />
            </div>
        </div>
    );
};

const styles = {
    wrapper: {
        background: 'linear-gradient(135deg, #3a6073, #3a3e2d)', // Darker gradient for a professional look
        minHeight: '100vh', // Full height
        display: 'flex', // Flexbox for center alignment
        flexDirection: 'column', // Vertical stacking
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        padding: '20px',
        color: '#f0f0f0', // Light text color
        textAlign: 'center', // Center text alignment
        fontFamily: 'Roboto, sans-serif', // Modern font
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', // Shadow for depth
    },
    title: {
        fontSize: '48px', // Increased title size
        fontWeight: '700', // Bold title
        marginBottom: '10px', // Margin below the title
    },
    description: {
        fontSize: '20px', // Larger description size
        marginBottom: '30px', // Margin below the description
        lineHeight: '1.6', // Better line height for readability
        maxWidth: '600px', // Max width for better readability
    },
    visuals: {
        display: 'flex', // Flexbox for image alignment
        justifyContent: 'center', // Center image
        marginTop: '20px', // Space above the image
    },
    image: {
        width: '100%', // Responsive image width
        maxWidth: '400px', // Max width for the image
        borderRadius: '10px', // Rounded corners for the image
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)', // Shadow for image depth
    },
};

export default Home;
