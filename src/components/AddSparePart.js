import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSparePart = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://matangi-backend.onrender.com/api/products")
      .then(response => setProducts(response.data))
      .catch(error => {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products.");
      });
  }, []);

  // Convert image file to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result); // Set Base64 string
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader when request starts
    const sparePartData = {
      name,
      price,
      image, // Base64 encoded image
      productId: selectedProduct,
    };
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from local storage
      await axios.post("https://matangi-backend.onrender.com/api/spareparts", sparePartData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Include the token in the Authorization header
        },
      });
      toast.success("Spare part added successfully!");
      navigate("/admin/spare-parts");
    } catch (error) {
      console.error("Error adding spare part:", error);
      toast.error("Failed to add spare part. Please try again.");
    } finally {
      setLoading(false); // Hide loader when request completes
    }
  };

  const handleBack = () => {
    navigate("/admin/spare-parts"); // Navigate back to the spare parts page
  };

  const styles = {
    addSparePart: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px',
      backgroundColor: '#f4f4f9',
      minHeight: '50vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    form: {
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '400px',
    },
    formGroup: {
      marginBottom: '15px',
      textAlign: 'left',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxSizing: 'border-box',
    },
    select: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxSizing: 'border-box',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#2c3e50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      marginTop: '10px',
    },
    buttonHover: {
      backgroundColor: '#1a252f',
    },
    backButton: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      marginTop: '10px',
    },
    backButtonHover: {
      backgroundColor: '#2980b9',
    },
    error: {
      color: 'red',
      marginTop: '10px',
    },
    loader: {
      margin: '20px 0',
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.addSparePart}>
      <ToastContainer />
      <form style={styles.form} onSubmit={handleSubmit}>
        <h1 style={{ color: 'black' }}>Add Spare Part</h1>
        <div style={styles.formGroup}>
          <label style={styles.label}>Product:</label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            required
            style={styles.select}
          >
            <option value="">Select a product</option>
            {products.map(product => (
              <option key={product._id} value={product._id}>{product.name}</option>
            ))}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Image:</label>
          <input type="file" onChange={handleImageChange} required style={styles.input} />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
          disabled={loading} // Disable button when loading
        >
          {loading ? "Adding..." : "Add Spare Part"}
        </button>
        <button
          type="button"
          style={styles.backButton}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.backButtonHover.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.backButton.backgroundColor)}
          onClick={handleBack}
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default AddSparePart;