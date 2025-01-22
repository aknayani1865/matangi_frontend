import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SpareParts.css";
import './team.css';
import Footer from "./Footer";
import Logo from "../assets/images/logo.png"

const SpareParts = () => {
  const { productId } = useParams(); // Get product ID from the URL
  const navigate = useNavigate(); // Hook to handle navigation
  const [spareParts, setSpareParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch spare parts from the backend using the product ID
    const fetchSpareParts = async () => {
      try {
        console.log(productId);
        const response = await axios.get(`https://matangi-backend.onrender.com/api/spareparts/spareparts/${productId}`);
        console.log(response.data);
        setSpareParts(response.data);
      } catch (err) {
        console.error("Error fetching spare parts:", err);
        setError("Failed to load spare parts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSpareParts();
  }, [productId]);

  // Navigate back to the homepage
  const handleBackToHome = () => {
    navigate("/");
  };
  const handleLoginNavigation = () => {
    navigate("/login");
  };
  return (
    <div className="page-container">

      <div className="spare-parts">
       <nav className="navbar">
       <span className="nname" onClick={handleBackToHome} style={{ cursor: "pointer" }}>
       <img className="logo" src={Logo} alt="Matangi Automobiles" />
       </span>
        <button className="login-button" onClick={handleLoginNavigation}>
          Login
        </button>
      </nav>
      <h1 className="head">Spare Parts</h1>

      {loading ? (
        <p>Loading spare parts...</p>
      ) : error ? (
        <p>{error}</p>
      ) : spareParts.length > 0 ? (
        <div className="container1 spare-parts-container">
          <div className="crow">
              {spareParts.map((part, index)=> (
                <div className="ccol">
                  <div key={index} className="card">
                      <img src={part.image.url} alt={part.name} className="photo" />
                      <div className="content description">
                          <h2 className="title">{part.name}</h2>
                          <p className="title">Price: ₹{part.price}</p>
                        </div>
                    </div>
              </div>
              ))

              }
            </div>
      </div>
      ) : (
        <p>No spare parts available for this product.</p>
      )}

      {/* Back to Homepage Button */}
      <div className="back-button-container">
        <button className="back-button" onClick={handleBackToHome}>
          Back to Homepage
        </button>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default SpareParts;