import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import "../../css/admin/sidebar.css";

/**
 * ADMIN SIDEBAR COMPONENT
 * Navigation sidebar for admin panel
 */
const AdminSidebar = ({ isOpen, onClose, adminData, onLogout }) => {
  const menuItems = [
    {
      title: "Dashboard",
      icon: "fi fi-sr-dashboard",
      path: "/admin/dashboard",
    },
    {
      title: "Products",
      icon: "fi fi-sr-box",
      path: "/admin/products",
    },
    {
      title: "Add Product",
      icon: "fi fi-sr-add",
      path: "/admin/products/add",
    },
    {
      title: "Categories",
      icon: "fi fi-sr-apps",
      path: "/admin/categories",
    },
    {
      title: "Orders",
      icon: "fi fi-sr-shopping-cart",
      path: "/admin/orders",
      badge: "Soon",
    },
    {
      title: "Customers",
      icon: "fi fi-sr-users",
      path: "/admin/customers",
      badge: "Soon",
    },
    {
      title: "Analytics",
      icon: "fi fi-sr-chart-line-up",
      path: "/admin/analytics",
      badge: "Soon",
    },
    {
      title: "Settings",
      icon: "fi fi-sr-settings",
      path: "/admin/settings",
    },
  ];

  return (
    <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="logo">
          <img src={Logo} alt="Sports World Logo" />
        </div>
        <button className="close-sidebar" onClick={onClose}>
          <i className="fi fi-br-cross"></i>
        </button>
      </div>

      {/* Admin Profile */}
      <div className="admin-profile">
        <div className="profile-avatar">
          {adminData.avatar ? (
            <img src={adminData.avatar} alt={adminData.fullName} />
          ) : (
            <div className="avatar-placeholder">
              {adminData.fullName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="profile-info">
          <h4>{adminData.fullName}</h4>
          <p>{adminData.role === "super-admin" ? "Super Admin" : "Admin"}</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""} ${item.badge ? "has-badge" : ""}`
                }
              >
                <i className={item.icon}></i>
                <span>{item.title}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <button className="btn-back-to-site" onClick={() => window.open("/", "_blank")}>
          <i className="fi fi-sr-globe"></i>
          <span>View Site</span>
        </button>
        <button className="btn-logout" onClick={onLogout}>
          <i className="fi fi-sr-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;