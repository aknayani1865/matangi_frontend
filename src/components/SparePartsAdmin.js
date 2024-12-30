import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SparePartsAdmin = () => {
  const [spareParts, setSpareParts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpareParts = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from local storage
        const response = await axios.get("https://matangi-backend.onrender.com/api/spareparts", {
          headers: {
            "Authorization": `Bearer ${token}` // Include the token in the Authorization header
          }
        });
        setSpareParts(response.data);
      } catch (error) {
        console.error("Error fetching spare parts:", error);
        toast.error("Failed to fetch spare parts.");
      }
    };

    fetchSpareParts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from local storage
      await axios.delete(`https://matangi-backend.onrender.com/api/spareparts/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}` // Include the token in the Authorization header
        }
      });
      setSpareParts(spareParts.filter(part => part._id !== id));
      toast.success("Spare part deleted successfully!");
    } catch (error) {
      console.error("Error deleting spare part:", error);
      toast.error("Failed to delete spare part.");
    }
  };

  const styles = {
    sparePartsAdmin: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px',
      backgroundColor: '#f4f4f9',
      minHeight: '100vh',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    addButton: {
      backgroundColor: '#2c3e50',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    addButtonHover: {
      backgroundColor: '#1a252f',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    th: {
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '10px',
      textAlign: 'left',
    },
    td: {
      padding: '10px',
      borderBottom: '1px solid #ddd',
    },
    actionButton: {
      marginRight: '10px',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      padding: '5px 10px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    actionButtonHover: {
      backgroundColor: '#2980b9',
    },
    deleteButton: {
      backgroundColor: '#e74c3c',
    },
    deleteButtonHover: {
      backgroundColor: '#c0392b',
    },
  };

  return (
    <div style={styles.sparePartsAdmin}>
      <ToastContainer />
      <div style={styles.header}>
        <h1 style={{color:'black'}}>Spare Parts</h1>
        <button
          style={styles.addButton}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.addButtonHover.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.addButton.backgroundColor)}
          onClick={() => navigate("/admin/spare-parts/add")}
        >
          Add Spare Part
        </button>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Product</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {spareParts.map(part => (
            <tr key={part._id}>
              <td style={styles.td}>{part.name}</td>
              <td style={styles.td}>{part.price}</td>
              <td style={styles.td}>{part.product.name}</td>
              <td style={styles.td}>
                <button
                  style={styles.actionButton}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.actionButtonHover.backgroundColor)}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.actionButton.backgroundColor)}
                  onClick={() => window.open(part.image.url, "_blank")}
                >
                  View Image
                </button>
                <button
                  style={styles.actionButton}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.actionButtonHover.backgroundColor)}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.actionButton.backgroundColor)}
                  onClick={() => navigate(`/admin/spare-parts/update/${part._id}`)}
                >
                  Update
                </button>
                <button
                  style={{ ...styles.actionButton, ...styles.deleteButton }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.deleteButtonHover.backgroundColor)}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.deleteButton.backgroundColor)}
                  onClick={() => handleDelete(part._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SparePartsAdmin;