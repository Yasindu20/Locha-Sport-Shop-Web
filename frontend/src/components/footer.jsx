import React from "react";
import "../css/footer.css";
import Logo from "../assets/logo.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-col">
              <div className="footer-logo">
                <img src={Logo} alt="Sport World Logo" />
              </div>
              <p className="footer-description">
                Your Trusted Partner for premium Sports Equirements. Empowering
                athletes since 2020.
              </p>
              <div className="social-links">
                <a href="#" aria-label="Facebook">
                  <i className="fi fi-brands-facebook"></i>
                </a>
                <a href="#" aria-label="Whatsapp">
                  <i class="fi fi-brands-whatsapp"></i>
                </a>
                <a href="#" aria-label="Instagram">
                  <i class="fi fi-brands-instagram"></i>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-links">
                <li>
                  <a href="#">Shop All</a>
                </li>
                <li>
                  <a href="#">New Arrivals</a>
                </li>
                <li>
                  <a href="#">Best Selling</a>
                </li>
                <li>
                  <a href="#">Deals & Offers</a>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="footer-col">
              <h3 className="footer-title">Custermer Service</h3>
              <ul className="footer-links">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Shop Now</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="/about">About Us</a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-col">
              <h3 className="footer-title">Get In Touch</h3>
              <ul className="footer-links">
                <li>
                  <a href="tel:0777807806">
                    <i class="fi fi-br-phone-call" /> 077 780 7806
                  </a>
                </li>
                <li>
                  <a href="tel:0112503093">
                    <i class="fi fi-br-phone-rotary" /> 011 250 3093
                  </a>
                </li>
                <li>
                  <a href="mailto:info@sportsworld.lk">
                    <i class="fi fi-br-envelope" /> info@sportsworld.lk
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p className="copyright">
              © 2025 Sport World. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
