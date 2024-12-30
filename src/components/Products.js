import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://matangi-backend.onrender.com/api/products")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from local storage
      await axios.delete(`https://matangi-backend.onrender.com/api/products/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}` // Include the token in the Authorization header
        }
      });
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const styles = {
    products: {
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
    <div style={styles.products}>
      <div style={styles.header}>
        <h1 style={{color:'black'}}>Products</h1>
        <button
          style={styles.addButton}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.addButtonHover.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.addButton.backgroundColor)}
          onClick={() => navigate("/admin/products/add")}
        >
          Add Product
        </button>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td style={styles.td}>{product.name}</td>
              <td style={styles.td}>
                <button
                  style={styles.actionButton}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.actionButtonHover.backgroundColor)}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.actionButton.backgroundColor)}
                  onClick={() => window.open(product.image.url, "_blank")}
                >
                  View Image
                </button>
                <button
                  style={styles.actionButton}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.actionButtonHover.backgroundColor)}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.actionButton.backgroundColor)}
                  onClick={() => navigate(`/admin/products/update/${product._id}`)}
                >
                  Update
                </button>
                <button
                  style={{ ...styles.actionButton, ...styles.deleteButton }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.deleteButtonHover.backgroundColor)}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.deleteButton.backgroundColor)}
                  onClick={() => handleDelete(product._id)}
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

export default Products;