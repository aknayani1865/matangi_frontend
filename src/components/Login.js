import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a token exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      // If a token is found, redirect to the admin page
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://matangi-backend.onrender.com/api/admin/login", { email, password });
      localStorage.setItem("token", response.data.token);
      toast.success("Login successfully!");
      navigate("/admin");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const styles = {
    body: {
      margin: 0,
      padding: 0,
      height: "100vh",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f4f4f9",
    },
    login: {
      backgroundColor: "white",
      padding: "40px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      width: "300px",
      textAlign: "center",
    },
    heading: {
      marginBottom: "20px",
      color: "#333",
    },
    formGroup: {
      marginBottom: "15px",
      textAlign: "left",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      color: "#555",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#2c3e50",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
      marginTop: "10px",
    },
    buttonHover: {
      backgroundColor: "#1a252f",
    },
    backButton: {
      backgroundColor: "#ddd",
      color: "#333",
      marginTop: "15px",
    },
    error: {
      color: "red",
      marginTop: "10px",
    },
  };

  return (
    <div style={styles.body}>
      <ToastContainer />
      <div style={styles.login}>
        <h2 style={styles.heading}>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
          >
            Login
          </button>
          {error && <p style={styles.error}>{error}</p>}
        </form>
        <button
          onClick={handleBack}
          style={{ ...styles.button, ...styles.backButton }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Login;
