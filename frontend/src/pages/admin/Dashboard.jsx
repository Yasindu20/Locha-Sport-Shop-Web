import {  Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../../css/admin/Dashboard.css";

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch Statistics
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem("adminToken");
                const response = await fetch("http://localhost:5000/api/admin/products/stats", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setStats(data);
                }
            } catch (error) {
                console.error("Error fetching stats: ", error);
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, []);

    // Stats cards configuration
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
      icon: "fi fi-sr-exclamation-triangle",
      color: "#f44336",
      link: "/admin/products?stock=0",
    },
    {
      title: "Low Stock",
      value: stats?.lowStock || 0,
      icon: "fi fi-sr-alert",
      color: "#ff9800",
      link: "/admin/products?stock=low",
    },
  ];

  return (
    <div className="admin-dashboard">
      {/* Page Header */}
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back! Here's what's happening with your store.</p>
        </div>
        <Link to="/admin/products/add" className="btn-primary">
          <i className="fi fi-sr-add"></i>
          Add New Product
        </Link>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading statistics...</p>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="stats-grid">
            {statsCards.map((card, index) => (
              <Link to={card.link} key={index} className="stat-card">
                <div className="stat-icon" style={{ background: card.color }}>
                  <i className={card.icon}></i>
                </div>
                <div className="stat-info">
                  <h3>{card.value}</h3>
                  <p>{card.title}</p>
                </div>
                <i className="fi fi-br-arrow-right stat-arrow"></i>
              </Link>
            ))}
          </div>

          {/* Category Statistics */}
          <div className="dashboard-row">
            <div className="dashboard-card">
              <div className="card-header">
                <h3>Products by Category</h3>
                <Link to="/admin/categories" className="link-view-all">
                  View All
                </Link>
              </div>
              <div className="category-list">
                {stats?.categoryStats?.map((cat, index) => (
                  <div key={index} className="category-item">
                    <div className="category-info">
                      <span className="category-name">{cat._id || "Uncategorized"}</span>
                      <span className="category-count">{cat.count} products</span>
                    </div>
                    <div className="category-bar">
                      <div
                        className="category-bar-fill"
                        style={{
                          width: `${(cat.count / stats.totalProducts) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Brands */}
            <div className="dashboard-card">
              <div className="card-header">
                <h3>Top Brands</h3>
              </div>
              <div className="brands-list">
                {stats?.brandStats?.map((brand, index) => (
                  <div key={index} className="brand-item">
                    <div className="brand-rank">{index + 1}</div>
                    <div className="brand-info">
                      <span className="brand-name">{brand._id || "Unknown"}</span>
                      <span className="brand-count">{brand.count} products</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="quick-actions">
              <Link to="/admin/products/add" className="action-btn">
                <i className="fi fi-sr-add"></i>
                <span>Add Product</span>
              </Link>
              <Link to="/admin/products" className="action-btn">
                <i className="fi fi-sr-box"></i>
                <span>Manage Products</span>
              </Link>
              <Link to="/admin/categories" className="action-btn">
                <i className="fi fi-sr-apps"></i>
                <span>Manage Categories</span>
              </Link>
              <Link to="/admin/settings" className="action-btn">
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