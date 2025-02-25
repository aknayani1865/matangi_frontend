import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Tractor, Loader2, LogIn, Menu as MenuIcon } from "lucide-react";
import axios from "axios";
import "./Home.css";
import Footer from "./Footer";
import Logo from "../assets/images/logo.png";
import { Menu, MenuItem, IconButton } from "@mui/material";

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); // State for Menu anchor element
  const navigate = useNavigate();

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem("token"); // Example for token in localStorage
    if (isAdminLoggedIn) {
      // Redirect to the admin panel if logged in
      window.location.href = "/admin"; // Redirect to the admin panel
    }
    // Fetch vehicles from the API
    axios.get("https://matangi-backend.onrender.com/api/products")
      .then(response => {
        setVehicles(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError("Failed to load vehicles");
        setLoading(false);
      });
  }, []);

  const handleNavigation = (type) => {
    navigate(`/spare-parts/${type}`);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.name.toLowerCase().includes(searchTerm)
  );
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
      <div className="home">
      {/* Navbar */}
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

      {/* Landing Section */}
      <div className="landing-section">
        <div className="overlay">
          <h1 className="head">Welcome to Matangi Engineering</h1>
          <p>Your one-stop shop for all tractor spare parts!</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a vehicle..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Vehicle Cards */}
      <div className="images-container">
        {loading ? (
          <p>Loading vehicles...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle) => (
            <div
              className="image-card"
              key={vehicle._id}
              onClick={() => handleNavigation(vehicle._id)}
            >
              <img src={vehicle.image.url} alt={vehicle.name} />
              <p>{vehicle.name}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No vehicles found. Try a different search.</p>
        )}
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default Home;
