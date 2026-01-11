import React, { useState } from "react";
import "../css/contact.css";

const Contact = () => {
  const [contactPageFormData, setContactPageFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "orders",
    message: "",
  });

  const [contactPageErrors, setContactPageErrors] = useState({});
  const [contactPageSubmitted, setContactPageSubmitted] = useState(false);
  const [contactPageLoading, setContactPageLoading] = useState(false);

  const handleChange = (e) => {
    setContactPageFormData({
      ...contactPageFormData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let errors = {};

    if (!contactPageFormData.name.trim()) errors.name = "Name is required";

    if (!contactPageFormData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(contactPageFormData.email)) {
      errors.email = "Enter a valid email";
    }

    if (!contactPageFormData.message.trim())
      errors.message = "Message is required";

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setContactPageErrors(validationErrors);
      return;
    }

    setContactPageErrors({});
    setContactPageLoading(true);

    setTimeout(() => {
      setContactPageLoading(false);
      setContactPageSubmitted(true);
      setContactPageFormData({
        name: "",
        email: "",
        phone: "",
        subject: "orders",
        message: "",
      });
    }, 1500);
  };

  return (
    <div className="contact-page-wrapper">
      {/* Hero */}
      <div className="contact-page-hero">
        <h1>Contact Us</h1>
        <p>We’re here to help with all your sports needs</p>
      </div>

      <div className="contact-page-container">
        {/* Form */}
        <div className="contact-page-form">
          <h2>Send Us a Message</h2>

          {contactPageSubmitted && (
            <div className="contact-page-success">
              ✅ Your message has been sent successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="contact-page-form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={contactPageFormData.name}
                onChange={handleChange}
              />
              {contactPageErrors.name && (
                <span className="contact-page-error">
                  {contactPageErrors.name}
                </span>
              )}
            </div>

            <div className="contact-page-form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                value={contactPageFormData.email}
                onChange={handleChange}
              />
              {contactPageErrors.email && (
                <span className="contact-page-error">
                  {contactPageErrors.email}
                </span>
              )}
            </div>

            <div className="contact-page-form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={contactPageFormData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="contact-page-form-group">
              <label>Subject</label>
              <select
                name="subject"
                value={contactPageFormData.subject}
                onChange={handleChange}
              >
                <option value="orders">Orders</option>
                <option value="products">Products</option>
                <option value="returns">Returns</option>
                <option value="general">General Inquiry</option>
              </select>
            </div>

            <div className="contact-page-form-group">
              <label>Message *</label>
              <textarea
                rows="4"
                name="message"
                value={contactPageFormData.message}
                onChange={handleChange}
              />
              {contactPageErrors.message && (
                <span className="contact-page-error">
                  {contactPageErrors.message}
                </span>
              )}
            </div>

            <button
              className="contact-page-button"
              type="submit"
              disabled={contactPageLoading}
            >
              {contactPageLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Info */}
        <div className="contact-page-info">
          <h2>Contact Information</h2>
          <p>
            <strong>
              <i className="fi fi-sr-marker" />
              Address:
            </strong>{" "}
            123 Sports Avenue, Colombo
          </p>
          <p>
            <strong>
              <i className="fi fi-br-phone-call" />
              Phone:
            </strong>{" "}
            +94 77 123 4567
          </p>
          <p>
            <strong>
              <i className="fi fi-br-envelope" />
              Email:
            </strong>{" "}
            support@sportshop.com
          </p>
          <p>
            <strong>
              <i className="fi fi-br-alarm-clock" />
              Hours:
            </strong>{" "}
            Mon - Sat: 9 AM - 8 PM
          </p>

          <div className="contact-page-social">
            <a href="#">
              <i class="fi fi-brands-facebook" />
              Facebook
            </a>
            <a href="#">
              <i class="fi fi-brands-instagram" />
              Instagram
            </a>
            <a href="#">
              <i class="fi fi-brands-whatsapp" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
