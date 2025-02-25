import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SpareParts.css";
import './team.css';
import Footer from "./Footer";
import Logo from "../assets/images/logo.png"
import { Menu, MenuItem, IconButton } from "@mui/material";
import { Search, Tractor, Loader2, LogIn, Menu as MenuIcon } from "lucide-react";

const SpareParts = () => {
  const { productId } = useParams(); // Get product ID from the URL
  const navigate = useNavigate(); // Hook to handle navigation
  const [spareParts, setSpareParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); // State for Menu anchor element


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
  // Open the dropdown menu
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Set the element that the menu will be anchored to
  };

  // Close the dropdown menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="page-container">

      <div className="spare-parts">
      <nav className="navbar">
          <span
            className="nname"
            onClick={handleBackToHome}
            style={{ cursor: "pointer" }}
          >
            <img className="logo" src={Logo} alt="Matangi Automobiles" />
          </span>

          {/* Menu Icon */}
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleMenuClick}
            aria-label="menu"
          >
            <MenuIcon size={24} />
          </IconButton>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLoginNavigation}>Login</MenuItem>
            {/* You can add more menu items here */}
          </Menu>
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
