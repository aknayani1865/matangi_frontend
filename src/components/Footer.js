import React from "react";
import { FaPhoneAlt } from "react-icons/fa"; // FontAwesome icon for phone
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>Matangi Engineering</h2>
        <p>Office No-22, Omega Complex, Gondal Road, Rajkot</p>
        <p>
          <strong>Name:</strong> Parth Mehta
        </p>
        <p>
          <strong>
            <FaPhoneAlt /> Phone:
          </strong>{" "}
          <a href="tel:+919510725922">+91 9510725922</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
