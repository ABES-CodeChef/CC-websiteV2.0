import React from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom";
import { FaInstagram, FaEnvelope, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Left Section */}
      <div className="footer-section footer-left">
        <div className="footer-title">
          <h2>CodeChef</h2>
          <h3>ABESEC Chapter</h3>
        </div>
        <a href="#contact" className="footer-contact-btn">CONTACT US</a>
        <p className="footer-copy">© 2025 CodeChef ABES EC. All rights reserved.</p>
      </div>

      {/* Center Section */}
      <div className="footer-section footer-center">
  <nav className="footer-nav">
    <a href="/" className="active">Home</a>
    <Link to="/events">Events</Link>
    <a href="/team">Team</a>
    <a href="#achievements">Achievements</a>
  </nav>
</div>

      {/* Right Section */}
      <div className="footer-section footer-right">
        <p className="footer-address">
          19th KM Stone, NH-09, Ghaziabad - 201009,<br></br> Uttar Pradesh, India<br />
          +91 120 713 5112
        </p>
        <div className="footer-social">
          <a href="mailto:chapter@abesec.edu.in" aria-label="Email"><FaEnvelope /></a>
          <a href="https://instagram.com" target="_blank" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn"><FaLinkedin /></a>
        </div>
      </div>

      <div className="footer-accent"></div>
    </footer>
  );
};

export default Footer;
