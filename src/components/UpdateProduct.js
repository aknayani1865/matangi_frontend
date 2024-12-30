import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState({ name: "", image: null });
  const [newImage, setNewImage] = useState(null); // Separate state for new image
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from local storage
        const response = await axios.get(`https://matangi-backend.onrender.com/api/products/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}` // Include the token in the Authorization header
          }
        });
        setProduct(response.data);
        toast.success("Product details fetched successfully!");
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to fetch product details.");
      }
    };

    fetchProduct();
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
      const updatedProduct = {
        name: product.name,
        newImage, // Send new image if it exists
        imageToRemove: product.image ? product.image.public_id : null, // Send public_id of the image to remove
      };
      const token = localStorage.getItem("token"); // Retrieve the token from local storage
      await axios.put(`https://matangi-backend.onrender.com/api/products/${id}`, updatedProduct, {
        headers: {
          "Authorization": `Bearer ${token}` // Include the token in the Authorization header
        }
      });
      toast.success("Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product. Please try again.");
    }
  };

  const handleBack = () => {
    navigate("/admin/products"); // Navigate back to the products page
  };

  const styles = {
    updateProduct: {
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
    <div style={styles.updateProduct}>
      <ToastContainer />
      <form style={styles.form} onSubmit={handleSubmit}>
        <h1 style={{ color: 'black' }}>Update Product</h1>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Image:</label>
          <input type="file" onChange={handleImageChange} style={styles.input} />
          {product.image && (
            <img src={product.image.url} alt="Product" style={styles.imagePreview} />
          )}
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
        >
          Update Product
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

export default UpdateProduct;