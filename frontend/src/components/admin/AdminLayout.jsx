import { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminData, setAdminData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check authentication and get admin data
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const storedAdminData = localStorage.getItem("adminData");

    if (!token || !storedAdminData) {
      navigate("/admin/login");
      return;
    }

    try {
      const parseAdminData = JSON.parse(storedAdminData);
      setAdminData(parseAdminData);
    } catch (error) {
      console.error("Error parsing admin data: ", error);
      navigate("/admin/login");
    }
  }, [navigate]);

  //Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);

      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    navigate("/admin/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!adminData) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        adminData={adminData}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div
        className={`admin-main ${
          sidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        {/* Header */}
        <AdminHeader
          onToggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
          adminData={adminData}
          onLogout={handleLogout}
        />

        {/* Page Content */}
        <div className="admin-content">
          <Outlet />
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
