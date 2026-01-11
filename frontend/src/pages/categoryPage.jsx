import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/category.css";
import ProductCard from "../components/shop/ProductCard";
import QuickViewModal from "../components/shop/QuickViewModal";

const CategoryPage = () => {
  // Get category slug from URL (e.g., /category/football -> slug = "football")
  const { slug } = useParams();

  // State Management
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Category Configuration - Each category has its own hero image, icon, and description
  const categoryConfig = {
    football: {
      name: "Football",
      icon: "⚽",
      description: "Professional football gear for players of all levels",
      heroImage: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1920&h=400&fit=crop",
      subcategories: ["All", "Boots", "Balls", "Training Equipment", "Jerseys", "Shin Guards"],
      color: "#e63946"
    },
    basketball: {
      name: "Basketball",
      icon: "🏀",
      description: "Top-quality basketball equipment and apparel",
      heroImage: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=1920&h=400&fit=crop",
      subcategories: ["All", "Basketballs", "Shoes", "Jerseys", "Training Gear", "Hoops"],
      color: "#f77f00"
    },
    tennis: {
      name: "Tennis",
      icon: "🎾",
      description: "Premium tennis rackets, balls, and accessories",
      heroImage: "https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=1920&h=400&fit=crop",
      subcategories: ["All", "Rackets", "Tennis Balls", "Shoes", "Apparel", "Bags"],
      color: "#06d6a0"
    },
    running: {
      name: "Running",
      icon: "🏃",
      description: "High-performance running shoes and athletic wear",
      heroImage: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1920&h=400&fit=crop",
      subcategories: ["All", "Running Shoes", "Apparel", "Watches", "Accessories", "Hydration"],
      color: "#118ab2"
    },
    fitness: {
      name: "Fitness",
      icon: "💪",
      description: "Complete fitness equipment for home and gym workouts",
      heroImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=400&fit=crop",
      subcategories: ["All", "Weights", "Yoga", "Cardio", "Accessories", "Apparel"],
      color: "#8338ec"
    },
    swimming: {
      name: "Swimming",
      icon: "🏊",
      description: "Professional swimming gear and accessories",
      heroImage: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1920&h=400&fit=crop",
      subcategories: ["All", "Swimwear", "Goggles", "Caps", "Training Equipment", "Accessories"],
      color: "#2a9d8f"
    }
  };

  // Get current category configuration
  const currentCategory = categoryConfig[slug] || categoryConfig.football;

  // ========================================
  // FETCH PRODUCTS (Replace with your API call)
  // ========================================
  useEffect(() => {
    // Simulate API call - Replace this with your actual API endpoint
    const fetchProducts = async () => {
      setLoading(true);
      
      // Sample products - In production, fetch from: `/api/products/category/${slug}`
      const sampleProducts = [
        {
          _id: "1",
          name: "Pro Football Boot",
          type: "Cleats",
          price: 129.99,
          image: "https://images.unsplash.com/photo-1511886929837-354d827aae26?w=500",
          category: "Football",
          rating: 4.8,
          badge: "bestselling",
          stock: 25,
          brand: "Nike",
          description: "Professional grade football boots with advanced traction technology.",
        },
        {
          _id: "2",
          name: "Premium Basketball",
          type: "Ball",
          price: 59.99,
          image: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=500",
          category: "Basketball",
          rating: 4.9,
          badge: "new",
          stock: 50,
          brand: "Spalding",
          description: "Official size basketball with superior grip and durability.",
        },
        {
          _id: "3",
          name: "Tennis Racket Pro",
          type: "Racket",
          price: 189.99,
          image: "https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=500",
          category: "Tennis",
          rating: 4.7,
          badge: "sale",
          stock: 15,
          brand: "Wilson",
          description: "Lightweight carbon fiber racket for competitive players.",
        },
        {
          _id: "4",
          name: "Running Shoes Elite",
          type: "Footwear",
          price: 149.99,
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
          category: "Running",
          rating: 5.0,
          badge: "new",
          stock: 40,
          brand: "Adidas",
          description: "Ultra-responsive running shoes with boost technology.",
        },
        {
          _id: "5",
          name: "Fitness Dumbbells Set",
          type: "Weights",
          price: 79.99,
          image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500",
          category: "Fitness",
          rating: 4.6,
          badge: "sale",
          stock: 30,
          brand: "Bowflex",
          description: "Adjustable dumbbell set perfect for home workouts.",
        },
        {
          _id: "6",
          name: "Swimming Goggles Pro",
          type: "Accessories",
          price: 34.99,
          image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=500",
          category: "Swimming",
          rating: 4.8,
          badge: "limited",
          stock: 60,
          brand: "Speedo",
          description: "Anti-fog racing goggles with UV protection.",
        },
        {
          _id: "7",
          name: "Yoga Mat Premium",
          type: "Equipment",
          price: 49.99,
          image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
          category: "Fitness",
          rating: 4.5,
          badge: "new",
          stock: 45,
          brand: "Manduka",
          description: "Extra thick yoga mat with superior grip and cushioning.",
        },
        {
          _id: "8",
          name: "Boxing Gloves Pro",
          type: "Gloves",
          price: 89.99,
          image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500",
          category: "Fitness",
          rating: 4.7,
          badge: "bestselling",
          stock: 20,
          brand: "Everlast",
          description: "Premium leather boxing gloves with wrist support.",
        },
        {
          _id: "9",
          name: "Football Training Ball",
          type: "Ball",
          price: 39.99,
          image: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=500",
          category: "Football",
          rating: 4.6,
          badge: "new",
          stock: 35,
          brand: "Adidas",
          description: "Official size training football with enhanced durability.",
        },
        {
          _id: "10",
          name: "Basketball Shoes Pro",
          type: "Footwear",
          price: 159.99,
          image: "https://images.unsplash.com/photo-1515396800500-83f8f21c455c?w=500",
          category: "Basketball",
          rating: 4.9,
          badge: "bestselling",
          stock: 28,
          brand: "Nike",
          description: "High-performance basketball shoes with Air cushioning.",
        },
      ];

      // Simulate network delay
      setTimeout(() => {
        // Filter products by current category
        const categoryProducts = sampleProducts.filter(
          (product) => product.category.toLowerCase() === currentCategory.name.toLowerCase()
        );
        
        setAllProducts(categoryProducts);
        setLoading(false);
      }, 800);
    };

    fetchProducts();
    // Reset to page 1 when category changes
    setCurrentPage(1);
  }, [slug, currentCategory.name]);

  // ========================================
  // FILTERING & SORTING LOGIC
  // ========================================
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Filter by subcategory
    if (selectedSubcategory !== "all") {
      result = result.filter(
        (product) => product.type.toLowerCase() === selectedSubcategory.toLowerCase()
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.reverse();
        break;
      default:
        break;
    }

    return result;
  }, [allProducts, selectedSubcategory, sortBy]);

  // ========================================
  // PAGINATION LOGIC
  // ========================================
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  // ========================================
  // RENDER
  // ========================================
  return (
    <div className="category-page">
      {/* Hero Banner with Category Info */}
      <div
        className="category-hero"
        style={{ backgroundImage: `url(${currentCategory.heroImage})` }}
      >
        <div className="category-hero-overlay"></div>
        <div className="category-hero-content">
          <div className="container">
            {/* Category Header */}
            <div className="category-header">
              <span className="category-icon">{currentCategory.icon}</span>
              <h1>{currentCategory.name}</h1>
              <p>{currentCategory.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subcategory Filter Tabs */}
      <div className="subcategory-filter">
        <div className="container">
          <div className="subcategory-tabs">
            {currentCategory.subcategories.map((subcategory) => (
              <button
                key={subcategory}
                className={`subcategory-tab ${
                  selectedSubcategory === subcategory.toLowerCase() ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedSubcategory(subcategory.toLowerCase());
                  setCurrentPage(1);
                }}
              >
                {subcategory}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="category-content">
        <div className="container">
          {/* Toolbar */}
          <div className="category-toolbar">
            <div className="toolbar-left">
              <p className="results-count">
                Showing {currentProducts.length} of {filteredProducts.length} products
              </p>
            </div>

            <div className="toolbar-right">
              {/* Sort Dropdown */}
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>

              {/* View Toggle */}
              <div className="view-toggle">
                <button
                  className={viewMode === "grid" ? "active" : ""}
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                >
                  <i className="fi fi-br-apps"></i>
                </button>
                <button
                  className={viewMode === "list" ? "active" : ""}
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                >
                  <i className="fi fi-br-list"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading {currentCategory.name} products...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredProducts.length === 0 && (
            <div className="empty-state">
              <i className="fi fi-br-box"></i>
              <h3>No products found</h3>
              <p>We couldn't find any {currentCategory.name.toLowerCase()} products in this category.</p>
              <Link to="/shop" className="btn-reset">
                View All Products
              </Link>
            </div>
          )}

          {/* Products Grid/List */}
          {!loading && filteredProducts.length > 0 && (
            <>
              <div className={`products-${viewMode}`}>
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    viewMode={viewMode}
                    onQuickView={() => setQuickViewProduct(product)}
                  />
                ))}
              </div>

              {/* Pagination */}
              {filteredProducts.length > productsPerPage && (
                <div className="pagination">
                  <button
                    className="page-btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <i className="fi fi-br-angle-left"></i>
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      className={`page-btn ${currentPage === index + 1 ? "active" : ""}`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    className="page-btn"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <i className="fi fi-br-angle-right"></i>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Category Info Section */}
      <div className="category-info-section">
        <div className="container">
          <div className="info-content">
            <h2>Why Choose Our {currentCategory.name} Products?</h2>
            <p>
              We offer premium {currentCategory.name.toLowerCase()} equipment from leading brands
              worldwide. Every product is carefully selected to ensure top quality, durability, and
              performance. Whether you're a beginner or a professional athlete, find everything you
              need to excel in your sport.
            </p>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};

export default CategoryPage;