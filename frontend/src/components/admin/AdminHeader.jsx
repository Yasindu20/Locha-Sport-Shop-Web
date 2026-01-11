import { useNavigate } from "react-router-dom";
import "../../css/admin/header.css";
import { useEffect, useState, useRef } from "react";

const AdminHeader = ({
  onToggleSidebar = () => {},
  sidebarOpen = false,
  adminData = {},
  onLogout = () => {},
}) => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  // Safe admin values
  const fullName = adminData?.fullName || "Admin";
  const role =
    adminData?.role === "super-admin" ? "Super Admin" : "Admin";
  const avatar = adminData?.avatar;

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="admin-header">
      {/* Left Section */}
      <div className="admin-header-left">
        <button
          className="admin-header-btn-toggle"
          onClick={onToggleSidebar}
        >
          <i className="fi fi-br-menu-burger"></i>
        </button>

        <div className="admin-header-title">
          <h2>Admin Panel</h2>
        </div>
      </div>

      {/* Right Section */}
      <div className="admin-header-right">
        {/* Notifications */}
        <button
          className="admin-header-btn"
          title="Notifications"
        >
          <i className="fi fi-sr-bell"></i>
          <span className="admin-header-notification-badge">
            3
          </span>
        </button>

        {/* User Menu */}
        <div
          className="admin-header-user-menu"
          ref={userMenuRef}
        >
          <button
            className="admin-header-user-trigger"
            onClick={() =>
              setShowUserMenu((prev) => !prev)
            }
          >
            {avatar ? (
              <img src={avatar} alt={fullName} />
            ) : (
              <div className="admin-header-avatar-placeholder">
                {fullName.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="admin-header-user-info">
              <span className="admin-header-user-name">
                {fullName}
              </span>
              <span className="admin-header-user-role">
                {role}
              </span>
            </div>

            <i
              className={`fi ${
                showUserMenu
                  ? "fi-br-angle-up"
                  : "fi-br-angle-down"
              }`}
            ></i>
          </button>

          {/* Dropdown */}
          {showUserMenu && (
            <div className="admin-header-dropdown">
              <button
                className="admin-header-dropdown-item"
                onClick={() => {
                  navigate("/admin/profile");
                  setShowUserMenu(false);
                }}
              >
                <i className="fi fi-sr-user"></i>
                <span>My Profile</span>
              </button>

              <button
                className="admin-header-dropdown-item"
                onClick={() => {
                  navigate("/admin/settings");
                  setShowUserMenu(false);
                }}
              >
                <i className="fi fi-sr-settings"></i>
                <span>Settings</span>
              </button>

              <div className="admin-header-dropdown-divider"></div>

              <button
                className="admin-header-dropdown-item"
                onClick={onLogout}
              >
                <i className="fi fi-sr-sign-out-alt"></i>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
