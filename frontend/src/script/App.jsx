import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Public Components
import Navbar from "../components/navbar";
import Footer from "../components/footer";

// Public Pages
import Home from "../pages/home";
import About from "../pages/about";
import Contact from "../pages/contact";
import Shop from "../pages/shop";
import Categories from "../pages/categories";
import CategoryPage from "../pages/categoryPage";
import Deals from "../pages/deals";

// Admin Components
import AdminLayout from "../components/admin/AdminLayout";
import ProtectedRoute from "../components/admin/ProtectedRoute";

// Admin Pages
import AdminLogin from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import ProductsList from "../pages/admin/ProductsList";
import ProductForm from "../pages/admin/ProductForm";

import "../css/App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* ============================================
            PUBLIC ROUTES (With Navbar & Footer)
            ============================================ */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/category" element={<Categories />} />
                <Route path="/category/:slug" element={<CategoryPage />} />
                <Route path="/deals" element={<Deals />} />
              </Routes>
              <Footer />
            </>
          }
        />

        {/* ============================================
            ADMIN LOGIN (No Layout)
            ============================================ */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ============================================
            ADMIN ROUTES (Protected with Admin Layout)
            ============================================ */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard */}
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* Products Management */}
          <Route path="products" element={<ProductsList />} />
          <Route path="products/add" element={<ProductForm />} />
          <Route path="products/edit/:id" element={<ProductForm />} />

          {/* Categories - Coming Soon */}
          <Route
            path="categories"
            element={
              <div className="coming-soon-page">
                <h2>Categories Management</h2>
                <p>Coming Soon</p>
              </div>
            }
          />

          {/* Orders - Coming Soon */}
          <Route
            path="orders"
            element={
              <div className="coming-soon-page">
                <h2>Orders Management</h2>
                <p>Coming Soon</p>
              </div>
            }
          />

          {/* Customers - Coming Soon */}
          <Route
            path="customers"
            element={
              <div className="coming-soon-page">
                <h2>Customers Management</h2>
                <p>Coming Soon</p>
              </div>
            }
          />

          {/* Analytics - Coming Soon */}
          <Route
            path="analytics"
            element={
              <div className="coming-soon-page">
                <h2>Analytics Dashboard</h2>
                <p>Coming Soon</p>
              </div>
            }
          />

          {/* Settings - Coming Soon */}
          <Route
            path="settings"
            element={
              <div className="coming-soon-page">
                <h2>Settings</h2>
                <p>Coming Soon</p>
              </div>
            }
          />

          {/* Profile - Coming Soon */}
          <Route
            path="profile"
            element={
              <div className="coming-soon-page">
                <h2>My Profile</h2>
                <p>Coming Soon</p>
              </div>
            }
          />
        </Route>

        {/* ============================================
            404 NOT FOUND
            ============================================ */}
        <Route
          path="*"
          element={
            <div className="not-found-page">
              <h1>404 - Page Not Found</h1>
              <p>The page you're looking for doesn't exist.</p>
              <a href="/">Go Home</a>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
