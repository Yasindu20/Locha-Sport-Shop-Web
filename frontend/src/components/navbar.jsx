import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";
import Logo from "../assets/logo.svg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="logo">
          <a href="/">
            <img src={Logo} alt="Logo" />
          </a>
        </div>

        <div className="nav-center">
          <nav className="nav-links">
            <a href="/">Home</a>
            <a href="/shop">Shop</a>
            <a href="/category">Categories</a>
            <a href="#">Deals</a>
            <a href="/contact">Contact</a>
            <a href="/about">About</a>
          </nav>
        </div>

        <div className="nav-right">
          <div className="search-box">
            <input type="text" placeholder="Search products..." />
            <button>
              <i className="fi fi-br-search"></i>
            </button>
          </div>
          <button
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <i className="fi fi-br-menu-burger"></i>
          </button>
        </div>
      </header>

      <div
        className={`overlay ${menuOpen ? "active" : ""}`}
        onClick={toggleMenu}
      ></div>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-menu-header">
          <h3>Menu</h3>
          <button
            className="close-btn"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <i className="fi fi-br-cross"></i>
          </button>
        </div>

        <a href="#" onClick={toggleMenu}>
          <i className="fi fi-br-home"></i> Home
        </a>
        <a href="#" onClick={toggleMenu}>
          <i className="fi fi-br-shopping-bag"></i> Shop
        </a>
        <a href="#" onClick={toggleMenu}>
          <i className="fi fi-br-apps"></i> Categories
        </a>
        <a href="#" onClick={toggleMenu}>
          <i className="fi fi-br-badge-percent"></i> Deals
        </a>
        <a href="#" onClick={toggleMenu}>
          <i className="fi fi-br-envelope"></i> Contact
        </a>

        <div className="mobile-search">
          <input type="text" placeholder="Search products..." />
        </div>
      </div>
    </>
  );
};

export default Navbar;
