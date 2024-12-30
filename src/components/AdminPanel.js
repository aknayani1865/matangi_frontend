import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication tokens or any other logout logic
    localStorage.removeItem('token');
    // Redirect to login page
    navigate("/");
  };
  const handleBackToHome = () => {
    navigate("/");
  };
  const styles = {
    adminPanel: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#f4f4f9',
      minHeight: '100vh',
    },
    navbar: {
      width: '100%',
      height: '43px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '15px 30px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    navLinks: {
      listStyleType: 'none',
      display: 'flex',
      gap: '20px',
      margin: 0,
      padding: 0,
    },
    link: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '16px',
      transition: 'color 0.3s',
    },
    linkHover: {
      color: '#f0ad4e',
    },
    logoutButton: {
      backgroundColor: '#e74c3c',
      border: 'none',
      padding: '10px 20px',
      color: 'white',
      cursor: 'pointer',
      borderRadius: '5px',
      transition: 'background-color 0.3s',
    },
    logoutButtonHover: {
      backgroundColor: '#c0392b',
    },
    content: {
      marginTop: '20px',
      width: '100%',
      maxWidth: '1200px',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
  };

  return (
    <div style={styles.adminPanel}>
      <nav style={styles.navbar}>
        <h2 onClick={handleBackToHome} style={{ cursor: "pointer" }}>Admin Panel</h2>
        <ul style={styles.navLinks}>
          <li>
            <Link
              to="/admin"
              style={styles.link}
              onMouseOver={(e) => (e.currentTarget.style.color = styles.linkHover.color)}
              onMouseOut={(e) => (e.currentTarget.style.color = styles.link.color)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/admin/products"
              style={styles.link}
              onMouseOver={(e) => (e.currentTarget.style.color = styles.linkHover.color)}
              onMouseOut={(e) => (e.currentTarget.style.color = styles.link.color)}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/admin/spare-parts"
              style={styles.link}
              onMouseOver={(e) => (e.currentTarget.style.color = styles.linkHover.color)}
              onMouseOut={(e) => (e.currentTarget.style.color = styles.link.color)}
            >
              Spare Parts
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              style={styles.logoutButton}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.logoutButtonHover.backgroundColor)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.logoutButton.backgroundColor)}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <div style={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;