import React, { useState, useEffect, useMemo } from "react";
import "../css/shop.css";
import ProductCard from "../components/shop/ProductCard";
import FilterSidebar from "../components/shop/FilterSidebar";
import QuickViewModal from "../components/shop/QuickViewModal";

const Shop = () => {
  const [allProducts, setAllProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");

  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 500],
    brands: [],
    minRating: 0,
  });

  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const [showFilters, setShowFilters] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const sampleProducts = [
        {
          _id: "1",
          name: "Pro Football Boot",
          type: "Cleats",
          price: 129.99,
          image:
            "https://images.unsplash.com/photo-1511886929837-354d827aae26?w=500",
          category: "Football",
          rating: 4.8,
          badge: "bestselling",
          stock: 25,
          brand: "Nike",
          description:
            "Professional grade football boots with advanced traction technology.",
        },
        {
          _id: "2",
          name: "Premium Basketball",
          type: "Ball",
          price: 59.99,
          image:
            "https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=500",
          category: "Basketball",
          rating: 4.9,
          badge: "new",
          stock: 50,
          brand: "Spalding",
          description:
            "Official size basketball with superior grip and durability.",
        },
        {
          _id: "3",
          name: "Tennis Racket Pro",
          type: "Racket",
          price: 189.99,
          image:
            "https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=500",
          category: "Tennis",
          rating: 4.7,
          badge: "sale",
          stock: 15,
          brand: "Wilson",
          description:
            "Lightweight carbon fiber racket for competitive players.",
        },
        {
          _id: "4",
          name: "Running Shoes Elite",
          type: "Footwear",
          price: 149.99,
          image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
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
          image:
            "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500",
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
          image:
            "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=500",
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
          image:
            "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
          category: "Fitness",
          rating: 4.5,
          badge: "new",
          stock: 45,
          brand: "Manduka",
          description:
            "Extra thick yoga mat with superior grip and cushioning.",
        },
        {
          _id: "8",
          name: "Boxing Gloves Pro",
          type: "Gloves",
          price: 89.99,
          image:
            "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500",
          category: "Fitness",
          rating: 4.7,
          badge: "bestselling",
          stock: 20,
          brand: "Everlast",
          description: "Premium leather boxing gloves with wrist support.",
        },
      ];

      setAllProducts(sampleProducts);
      setLoading(false);
    }, 1000);
  }, []);

  //filtering Logic
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    //filter by category
    if (filters.categories.length > 0) {
        result = result.filter(product =>
            filters.categories.includes(product.category)
        );
    }

    //filer by price range
    result = result.filter(product =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    //filter by brand
    if (filters.brands.length > 0) {
        result = result.filter(product =>
            filters.brands.includes(product.brand)
        );
    }

    //filter by minimum rating
    result = result.filter(product =>
        product.rating >= filters.minRating
    );

    //filter by search query
    if (searchQuery) {
        result = result.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }

    //apply sorting
    switch (sortBy) {
        case 'price-low' :
            result.sort((a,b) => a.price - b.price);
            break;
        case 'price-high' :
            result.sort((a,b) => b.price - a.price);
            break;
        case 'rating' :
            result.sort((a,b) => b.rating - a.rating);
            break;
        case 'newest' :
            result.sort((a,b) => a._id.localeCompare(b._id));
            break;
        default:
            break;
    }
    return result;
  }, [filters, allProducts, searchQuery, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchQuery, sortBy]);

  //pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ========================================
  // RENDER
  // ========================================
  return (
    <div className="shop-page">
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <div className="container">
          <a href="/">Home</a>
          <span className="separator">/</span>
          <span className="current">Shop</span>
        </div>
      </div>

      {/* Page Header */}
      <div className="shop-header">
        <div className="container">
          <h1>Shop All Products</h1>
          <p>Showing {filteredProducts.length} of {allProducts.length} products</p>
        </div>
      </div>

      {/* Main Shop Content */}
      <div className="shop-content">
        <div className="shop-container">
          <div className="shop-layout">
            {/* Filter Sidebar */}
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
            />

            {/* Products Area */}
            <div className="products-area">
              {/* Toolbar */}
              <div className="products-toolbar">
                <div className="toolbar-left">
                  <button
                    className="btn-filter-mobile"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <i className="fi fi-br-filter"></i>
                    Filters
                  </button>

                  <div className="search-box">
                    <i className="fi fi-br-search"></i>
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="toolbar-right">
                  <select
                    className="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                  </select>

                  <div className="view-toggle">
                    <button
                      className={viewMode === 'grid' ? 'active' : ''}
                      onClick={() => setViewMode('grid')}
                      aria-label="Grid view"
                    >
                      <i className="fi fi-br-apps"></i>
                    </button>
                    <button
                      className={viewMode === 'list' ? 'active' : ''}
                      onClick={() => setViewMode('list')}
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
                  <p>Loading products...</p>
                </div>
              )}

              {/* Empty State */}
              {!loading && filteredProducts.length === 0 && (
                <div className="empty-state">
                  <i className="fi fi-br-box"></i>
                  <h3>No products found</h3>
                  <p>Try adjusting your filters or search query</p>
                  <button
                    className="btn-reset"
                    onClick={() => {
                      setFilters({
                        categories: [],
                        priceRange: [0, 500],
                        brands: [],
                        minRating: 0,
                      });
                      setSearchQuery('');
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              )}

              {/* Products Grid/List */}
              {!loading && filteredProducts.length > 0 && (
                <div className={`products-${viewMode}`}>
                  {currentProducts.map(product => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      viewMode={viewMode}
                      onQuickView={() => setQuickViewProduct(product)}
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {!loading && filteredProducts.length > productsPerPage && (
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
                      className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
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
            </div>
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

export default Shop;
