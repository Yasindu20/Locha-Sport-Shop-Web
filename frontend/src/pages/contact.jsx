import React from "react";
import "../css/contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <header className="contact-header">
        <h1>Contact Us</h1>
        <p>Sports World – Havelock Town</p>
      </header>
      <div className="contact-container">
        <div className="infoBox">
          <h2>Store Information</h2>

          <p>
            <strong>Address:</strong>
            <br />
            153 Havelock Road,
            <br />
            Colombo 00500,
            <br />
            Sri Lanka
          </p>

          <p>
            <strong>Phone:</strong>
            <br />
            <a href="tel:0777807806">077 780 7806</a>
            <br />
            <a href="tel:0112503093">011 250 3093</a>
          </p>

          <p>
            <strong>Email:</strong>
            <br />
            <a href="mailto:info@sportsworld.lk">info@sportsworld.lk</a>
          </p>

          <p>
            <strong>Opening Hours:</strong>
            <br />
            Monday – Sunday
            <br />
            9:00 AM – 7:00 PM
          </p>

          <a
            href="https://wa.me/94777807806"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp"
          >
            Chat on WhatsApp
          </a>
        </div>

        {/* Contact Form */}
        <div className="formBox">
          <h2>Send Us a Message</h2>
          <form className="form">
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email Address" required />
            <input type="text" placeholder="Phone Number (optional)" />
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Your Message" rows="5" required />
            <button type="submit">Send Message</button>
          </form>
          <small>We usually respond within 24 hours.</small>
        </div>
      </div>
      {/* Map */}
      <div className="mapBox">
        <iframe
          title="Sports World Havelock Town"
          src="https://www.google.com/maps?q=Sports+World+Havelock+Road+Colombo&output=embed"
          width="100%"
          height="300"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>
      {/* Footer */}{" "}
      <footer className="contact-footer">
        {" "}
        <p>Your information is safe with us and will not be shared.</p>{" "}
        <p>© {new Date().getFullYear()} Sports World – Havelock Town</p>{" "}
      </footer>
    </div>
  );
};

export default Contact;
