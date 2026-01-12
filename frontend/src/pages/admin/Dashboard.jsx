import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../../css/admin/dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await fetch(
          "http://localhost:5000/api/admin/products/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching stats: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsCards = [
    {
      title: "Total Products",
      value: stats?.totalProducts || 0,
      icon: "fi fi-sr-box",
      color: "#667eea",
      link: "/admin/products",
    },
    {
      title: "Featured Products",
      value: stats?.featuredProducts || 0,
      icon: "fi fi-sr-star",
      color: "#ffc107",
      link: "/admin/products?featured=true",
    },
    {
      title: "Out of Stock",
      value: stats?.outOfStock || 0,
      icon: "fi fi-sr-triangle-warning",
      color: "#f44336",
      link: "/admin/products?stock=0",
    },
    {
      title: "Low Stock",
      value: stats?.lowStock || 0,
      icon: "fi fi-sr-light-emergency-on",
      color: "#ff9800",
      link: "/admin/products?stock=low",
    },
  ];

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back! Here's what's happening with your store.</p>
        </div>

        <Link to="/admin/products/add" className="admin-dashboard-btn-primary">
          <i className="fi fi-sr-add"></i>
          Add New Product
        </Link>
      </div>

      {loading ? (
        <div className="admin-dashboard-loading">
          <div className="spinner"></div>
          <p>Loading statistics...</p>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="admin-dashboard-stats-grid">
            {statsCards.map((card, index) => (
              <Link
                to={card.link}
                key={index}
                className="admin-dashboard-stat-card"
              >
                <div
                  className="admin-dashboard-stat-icon"
                  style={{ background: card.color }}
                >
                  <i className={card.icon}></i>
                </div>

                <div className="admin-dashboard-stat-info">
                  <h3>{card.value}</h3>
                  <p>{card.title}</p>
                </div>

                <i className="fi fi-br-arrow-right admin-dashboard-stat-arrow"></i>
              </Link>
            ))}
          </div>

          {/* Row */}
          <div className="admin-dashboard-row">
            {/* Categories */}
            <div className="admin-dashboard-card">
              <div className="admin-dashboard-card-header">
                <h3>Products by Category</h3>
                <Link
                  to="/admin/categories"
                  className="admin-dashboard-link"
                >
                  View All
                </Link>
              </div>

              <div className="admin-dashboard-category-list">
                {stats?.categoryStats?.map((cat, index) => (
                  <div key={index} className="admin-dashboard-category-item">
                    <div className="admin-dashboard-category-info">
                      <span className="admin-dashboard-category-name">
                        {cat._id || "Uncategorized"}
                      </span>
                      <span className="admin-dashboard-category-count">
                        {cat.count} products
                      </span>
                    </div>

                    <div className="admin-dashboard-category-bar">
                      <div
                        className="admin-dashboard-category-bar-fill"
                        style={{
                          width: `${
                            (cat.count / stats.totalProducts) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="admin-dashboard-card">
              <div className="admin-dashboard-card-header">
                <h3>Top Brands</h3>
              </div>

              <div className="admin-dashboard-brands-list">
                {stats?.brandStats?.map((brand, index) => (
                  <div key={index} className="admin-dashboard-brand-item">
                    <div className="admin-dashboard-brand-rank">
                      {index + 1}
                    </div>

                    <div className="admin-dashboard-brand-info">
                      <span className="admin-dashboard-brand-name">
                        {brand._id || "Unknown"}
                      </span>
                      <span className="admin-dashboard-brand-count">
                        {brand.count} products
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="admin-dashboard-card">
            <div className="admin-dashboard-card-header">
              <h3>Quick Actions</h3>
            </div>

            <div className="admin-dashboard-quick-actions">
              <Link to="/admin/products/add" className="admin-dashboard-action">
                <i className="fi fi-sr-add"></i>
                <span>Add Product</span>
              </Link>

              <Link to="/admin/products" className="admin-dashboard-action">
                <i className="fi fi-sr-box"></i>
                <span>Manage Products</span>
              </Link>

              <Link to="/admin/categories" className="admin-dashboard-action">
                <i className="fi fi-sr-apps"></i>
                <span>Manage Categories</span>
              </Link>

              <Link to="/admin/settings" className="admin-dashboard-action">
                <i className="fi fi-sr-settings"></i>
                <span>Settings</span>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
