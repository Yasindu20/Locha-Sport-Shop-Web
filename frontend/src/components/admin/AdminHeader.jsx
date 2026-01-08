import { useNavigate } from "react-router-dom";
import "../../css/admin/header.css";
import { useEffect, useState, useRef } from "react";

const AdminHeader = ({ onToggleSidebar, sidebarOpen,  adminData, onLogout }) => {
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const userMenuRef = useRef(null);

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
    <header className="admin-header">
      {/* Left Section */}
      <div className="header-left">
        <button className="btn-toggle-sidebar" onClick={onToggleSidebar}>
          <i className={`fi ${sidebarOpen ? "fi-br-menu-burger" : "fi-br-menu-burger"}`}></i>
        </button>
        <div className="header-title">
          <h2>Admin Panel</h2>
        </div>
      </div>

      {/* Right Section */}
      <div className="header-right">
        {/* Notifications */}
        <button className="header-btn" title="Notifications">
          <i className="fi fi-sr-bell"></i>
          <span className="notification-badge">3</span>
        </button>

        {/* User Menu */}
        <div className="user-menu" ref={userMenuRef}>
          <button
            className="user-menu-trigger"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            {adminData.avatar ? (
              <img src={adminData.avatar} alt={adminData.fullName} />
            ) : (
              <div className="avatar-placeholder">
                {adminData.fullName.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="user-info">
              <span className="user-name">{adminData.fullName}</span>
              <span className="user-role">
                {adminData.role === "super-admin" ? "Super Admin" : "Admin"}
              </span>
            </div>
            <i className={`fi ${showUserMenu ? "fi-br-angle-up" : "fi-br-angle-down"}`}></i>
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <div className="user-dropdown">
              <button
                className="dropdown-item"
                onClick={() => {
                  navigate("/admin/profile");
                  setShowUserMenu(false);
                }}
              >
                <i className="fi fi-sr-user"></i>
                <span>My Profile</span>
              </button>
              <button
                className="dropdown-item"
                onClick={() => {
                  navigate("/admin/settings");
                  setShowUserMenu(false);
                }}
              >
                <i className="fi fi-sr-settings"></i>
                <span>Settings</span>
              </button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={onLogout}>
                <i className="fi fi-sr-sign-out-alt"></i>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default AdminHeader