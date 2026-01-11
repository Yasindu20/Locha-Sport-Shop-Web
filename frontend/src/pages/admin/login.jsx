import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/admin/login.css";

/**
 * ADMIN LOGIN PAGE
 * Handles admin authentication
 */
const AdminLogin = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user types
    if (error) setError("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save token and admin data to localStorage
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminData", JSON.stringify(data.admin));

      // Redirect to dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        {/* Left Side - Branding */}
        <div className="login-branding">
          <div className="branding-content">
            <div className="brand-icon">
              <i className="fi fi-sr-shield-check"></i>
            </div>
            <h1>Sports World</h1>
            <h2>Admin Panel</h2>
            <p>Manage your sports shop efficiently</p>
            <div className="features">
              <div className="feature-item">
                <i className="fi fi-sr-check-circle"></i>
                <span>Product Management</span>
              </div>
              <div className="feature-item">
                <i className="fi fi-sr-check-circle"></i>
                <span>Order Tracking</span>
              </div>
              <div className="feature-item">
                <i className="fi fi-sr-check-circle"></i>
                <span>Analytics Dashboard</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-section">
          <div className="form-container">
            <div className="form-header">
              <h2>Welcome Back</h2>
              <p>Sign in to your admin account</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-message">
                <i className="fi fi-sr-exclamation-circle"></i>
                <span>{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="login-form">
              {/* Email Input */}
              <div className="form-group">
                <label htmlFor="email">
                  <i className="fi fi-sr-envelope"></i>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@sportsworld.com"
                  required
                  autoComplete="email"
                />
              </div>

              {/* Password Input */}
              <div className="form-group">
                <label htmlFor="password">
                  <i className="fi fi-sr-lock"></i>
                  Password
                </label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                  >
                    <i className={`fi ${showPassword ? "fi-sr-eye-crossed" : "fi-sr-eye"}`}></i>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-login"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    <i className="fi fi-sr-sign-in-alt"></i>
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="form-footer">
              <p>
                <i className="fi fi-sr-info"></i>
                For security reasons, only authorized personnel can access this panel
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="bg-decoration">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
    </div>
  );
};

export default AdminLogin;
