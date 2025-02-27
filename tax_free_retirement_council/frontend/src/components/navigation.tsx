import React, { useState } from "react";
import "../assets/css/navbar.css";
import taxFreeLogo from "../assets/img/tax_free_retirement_council.png";
const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <a href="/" className="logo">
            <img className="Home-Button" src={taxFreeLogo} />
          </a>
        </div>
        <div className={`navbar-center${menuOpen ? "open" : ""}`}>
          <ul className="nav-links">
            <li>
              <a href="/" onClick={() => setMenuOpen(false)}>
                Home
              </a>
            </li>
            <li>
              <a href="/about" onClick={() => setMenuOpen(false)}>
                About Us
              </a>
            </li>
            <li>
              <a href="/services" onClick={() => setMenuOpen(false)}>
                Services
              </a>
            </li>
          </ul>
        </div>
        <div className={`navbar-right${menuOpen ? "open" : ""}`}>
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </div>

          <a className="test-button" href="/test-form">
            Take the Test{" "}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
