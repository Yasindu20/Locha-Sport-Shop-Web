import React from "react";
import "../css/navbar.css";

const Navbar = () => {
  const toggleMenu = () => {
    const menu = document.querySelector(".mobile-menu");
    menu.classList.toggle("open");
  };

  return (
    <header className="navbar">
      <div className="logo">
        <a href="#">SportsWorld</a>
      </div>
      <nav className="nav-links">
        <a href="#">Home</a>
        <a href="#">Shop</a>
        <a href="#">Categories</a>
        <a href="#">Deals</a>
        <a href="#">Contact</a>
      </nav>
      <div className="search-box">
        <input type="text" placeholder="Search products..." />
        <button><i class="fi fi-br-search"></i></button>
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <div className="mobile-menu">
        <a href="#">Home</a>
        <a href="#">Shop</a>
        <a href="#">Categories</a>
        <a href="#">Deals</a>
        <a href="#">Contact</a>
        <div className="mobile-search">
          <input type="text" placeholder="Search products..." />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
