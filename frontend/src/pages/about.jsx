import React from "react";
import "../css/About.css";

// Import brand logos
import logo1 from "../assets/brands/logo1.svg";
import logo2 from "../assets/brands/logo2.svg";
import logo3 from "../assets/brands/logo3.svg";
import logo4 from "../assets/brands/logo4.svg";

const brands = [logo1, logo2, logo3, logo4, logo1, logo2, logo3, logo4];

const About = () => {
  return (
    <div className="about-container">
      {/* HERO */}
      <section className="about-hero">
        <h1>Fuel Your Performance</h1>
        <p>
          Premium sportswear, footwear, and equipment from globally authorized
          brands — built for champions.
        </p>
      </section>

      {/* ABOUT */}
      <section className="about-content">
        <h2>Who We Are</h2>
        <p>
          We are a trusted sports retail brand delivering high-performance gear
          for athletes, fitness enthusiasts, and everyday champions. Every
          product we sell is 100% authentic and sourced directly from authorized
          distributors.
        </p>
      </section>

      {/* BRANDS */}
      <section className="brand-section">
        <div className="brand-slider">
          <div className="brand-track">
            {brands.concat(brands).map((logo, i) => (
              <div className="brand-logo" key={i}>
                <img src={logo} alt="brand logo" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="why-us">
        <h2>Why Choose Us</h2>
        <div className="why-grid">
          <div className="why-card">
            <i className="fi fi-br-shield-trust" />
            <p>100% Authorized Products</p>
          </div>
          <div className="why-card">
            <i className="fi fi-br-user-fast-running" />
            <p>Fast & Secure Delivery</p>
          </div>
          <div className="why-card">
            <i className="fi fi-br-trust-alt" />
            <p>Trusted Sports Experts</p>
          </div>
          <div className="why-card">
            <i className="fi fi-br-user-headset" />
            <p>Dedicated Customer Support</p>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="location-section">
        <div className="location-wrapper">
          <div className="location-header">
            <h2>Visit Our Store</h2>
            <p>
              Experience premium sports gear in-store and get expert guidance
              from our team.
            </p>
          </div>

          <div className="location-card">
            <div className="location-details">
              <div className="detail-item">
                <span>
                  <i className="fi fi-sr-marker" />
                </span>
                <div>
                  <h4>Address</h4>
                  <p>123 Sports Avenue, Colombo</p>
                </div>
              </div>

              <div className="detail-item">
                <span>
                  <i className="fi fi-br-phone-call" />
                </span>
                <div>
                  <h4>Phone</h4>
                  <p>+94 77 123 4567</p>
                </div>
              </div>

              <div className="detail-item">
                <span>
                  <i className="fi fi-br-envelope" />
                </span>
                <div>
                  <h4>Email</h4>
                  <p>support@sportshop.com</p>
                </div>
              </div>

              <div className="detail-item">
                <span>
                  <i className="fi fi-br-alarm-clock" />
                </span>
                <div>
                  <h4>Business Hours</h4>
                  <p>Mon – Sat | 9:00 AM – 8:00 PM</p>
                </div>
              </div>
            </div>

            <div className="map-box">
              <iframe
                title="Sports World Havelock Town"
                src="https://www.google.com/maps?q=Sports+World+Havelock+Road+Colombo&output=embed"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
