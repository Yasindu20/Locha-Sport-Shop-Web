import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import "../../css/admin/sidebar.css";

const AdminSidebar = ({
  isOpen = true,
  onClose = () => {},
  adminData = {},
  onLogout = () => {},
}) => {
  const menuItems = [
    { title: "Dashboard", icon: "fi fi-sr-dashboard", path: "/admin/dashboard" },
    { title: "Products", icon: "fi fi-sr-box", path: "/admin/products" },
    { title: "Add Product", icon: "fi fi-sr-add", path: "/admin/products/add" },
    { title: "Categories", icon: "fi fi-sr-apps", path: "/admin/categories" },
    { title: "Settings", icon: "fi fi-sr-settings", path: "/admin/settings" },
  ];

  const fullName = adminData?.fullName || "Admin";
  const role = adminData?.role === "super-admin" ? "Super Admin" : "Admin";
  const avatar = adminData?.avatar;

  return (
    <aside className={`admin-sidebar ${isOpen ? "open" : "closed"}`}>
      {/* Header */}
      <div className="admin-sidebar-header">
        <div className="admin-sidebar-logo">
          <img src={Logo} alt="Logo" />
        </div>

        <button
          className="admin-sidebar-close"
          onClick={onClose}
          title="Close sidebar"
        >
          <i className="fi fi-br-cross"></i>
        </button>
      </div>

      {/* Profile */}
      <div className="admin-sidebar-profile">
        <div className="admin-sidebar-avatar">
          {avatar ? (
            <img src={avatar} alt={fullName} />
          ) : (
            <div className="admin-sidebar-avatar-placeholder">
              {fullName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="admin-sidebar-profile-info">
          <h4>{fullName}</h4>
          <p>{role}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="admin-sidebar-nav">
        <ul className="admin-sidebar-nav-list">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `admin-sidebar-nav-link ${isActive ? "active" : ""}`
                }
              >
                <i className={item.icon}></i>
                <span>{item.title}</span>
                {item.badge && (
                  <span className="admin-sidebar-badge">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="admin-sidebar-footer">
        <button
          className="admin-sidebar-btn"
          onClick={() => window.open("/", "_blank")}
        >
          <i className="fi fi-sr-globe"></i>
          <span>View Site</span>
        </button>

        <button
          className="admin-sidebar-btn logout"
          onClick={onLogout}
        >
          <i className="fi fi-sr-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
