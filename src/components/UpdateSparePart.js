import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateSparePart = () => {
  const { id } = useParams(); // Get the spare part ID from the URL
  const [sparePart, setSparePart] = useState({ name: "", price: "", image: null, product: "" });
  const [newImage, setNewImage] = useState(null); // Separate state for new image
  const [products, setProducts] = useState([]); // State for products list
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSparePart = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from local storage
        const response = await axios.get(`https://matangi-backend.onrender.com/api/spareparts/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}` // Include the token in the Authorization header
          }
        });
        setSparePart(response.data);
        toast.success("Spare part details fetched successfully!");
      } catch (error) {
        console.error("Error fetching spare part:", error);
        toast.error("Failed to fetch spare part details.");
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://matangi-backend.onrender.com/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products.");
      }
    };

    fetchSparePart();
    fetchProducts();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setNewImage(reader.result); // Store new image as Base64
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedSparePart = {
        name: sparePart.name,
        price: sparePart.price,
        newImage, // Send new image if it exists
        imageToRemove: sparePart.image ? sparePart.image.public_id : null, // Send public_id of the image to remove
        newProductId: sparePart.product, // Send new product ID if changed
      };
      const token = localStorage.getItem("token"); // Retrieve the token from local storage
      await axios.put(`https://matangi-backend.onrender.com/api/spareparts/${id}`, updatedSparePart, {
        headers: {
          "Authorization": `Bearer ${token}` // Include the token in the Authorization header
        }
      });
      toast.success("Spare part updated successfully!");
      navigate("/admin/spare-parts");
    } catch (error) {
      console.error("Error updating spare part:", error);
      toast.error("Failed to update spare part. Please try again.");
    }
  };

  const handleBack = () => {
    navigate("/admin/spare-parts"); // Navigate back to the spare parts page
  };

  const styles = {
    updateSparePart: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px',
      backgroundColor: '#f4f4f9',
      minHeight: '100vh',
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
    imagePreview: {
      maxWidth: '200px',
      marginTop: '10px',
    },
  };

  return (
    <div style={styles.updateSparePart}>
      <ToastContainer />
      <form style={styles.form} onSubmit={handleSubmit}>
        <h1 style={{ color: 'black' }}>Update SparePart</h1>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            value={sparePart.name}
            onChange={(e) => setSparePart({ ...sparePart, name: e.target.value })}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Price:</label>
          <input
            type="number"
            value={sparePart.price}
            onChange={(e) => setSparePart({ ...sparePart, price: e.target.value })}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Product:</label>
          <select
            value={sparePart.product}
            onChange={(e) => setSparePart({ ...sparePart, product: e.target.value })}
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
          <label style={styles.label}>Image:</label>
          <input type="file" onChange={handleImageChange} style={styles.input} />
          {sparePart.image && (
            <img src={sparePart.image.url} alt="Spare Part" style={styles.imagePreview} />
          )}
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
        >
          Update Spare Part
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

export default UpdateSparePart;