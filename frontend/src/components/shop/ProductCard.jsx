import React from "react";
import "../../css/shop/productCard.css";

const ProductCard = ({ product, viewMode, onQuickView }) => {
  // ========================================
  // HELPER FUNCTIONS
  // ========================================
  
  const formatPrice = (price) => {
    return price.toFixed(2);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <i key={`full-${i}`} className="fi fi-br-star star-filled"></i>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <i key="half" className="fi fi-br-star-half-stroke star-filled"></i>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <i key={`empty-${i}`} className="fi fi-br-star star-empty"></i>
      );
    }

    return stars;
  };

  const getBadgeClass = (badge) => {
    const badgeClasses = {
      new: "badge-new",
      sale: "badge-sale",
      bestselling: "badge-bestselling",
      limited: "badge-limited",
    };
    return badgeClasses[badge] || "";
  };

  // ========================================
  // HANDLERS
  // ========================================
  
  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent link navigation
    // TODO: Implement add to cart functionality
    alert(`Added ${product.name} to cart!`);
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    // TODO: Implement wishlist functionality
    alert(`Added ${product.name} to wishlist!`);
  };

  // ========================================
  // RENDER - GRID VIEW
  // ========================================
  if (viewMode === 'grid') {
    return (
      <div className="product-card-grid">
        {/* Badge */}
        {product.badge && (
          <span className={`product-badge ${getBadgeClass(product.badge)}`}>
            {product.badge.toUpperCase()}
          </span>
        )}

        {/* Product Image */}
        <div className="product-image">
          <img src={product.image} alt={product.name} />
          
          {/* Quick Actions */}
          <div className="product-actions">
            <button 
              className="action-btn" 
              onClick={handleAddToWishlist}
              aria-label="Add to wishlist"
            >
              <i className="fi fi-br-heart"></i>
            </button>
            <button 
              className="action-btn" 
              onClick={onQuickView}
              aria-label="Quick view"
            >
              <i className="fi fi-br-eye"></i>
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <span className="product-category">{product.category}</span>
          <h3 className="product-name">{product.name}</h3>
          
          {/* Rating */}
          <div className="product-rating">
            <div className="stars">{renderStars(product.rating)}</div>
            <span className="rating-number">({product.rating})</span>
          </div>

          {/* Price & Stock */}
          <div className="product-footer">
            <div className="product-price">
              <span className="price">${formatPrice(product.price)}</span>
              {product.stock < 10 && product.stock > 0 && (
                <span className="stock-warning">Only {product.stock} left!</span>
              )}
              {product.stock === 0 && (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </div>
            <button 
              className="btn-add-cart" 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              title={product.stock === 0 ? 'Out of stock' : 'Add to Cart'}
            >
              <i className="fi fi-br-shopping-cart"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // RENDER - LIST VIEW
  // ========================================
  return (
    <div className="product-card-list">
      {/* Badge */}
      {product.badge && (
        <span className={`product-badge ${getBadgeClass(product.badge)}`}>
          {product.badge.toUpperCase()}
        </span>
      )}

      {/* Product Image */}
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      {/* Product Details */}
      <div className="product-details">
        <div className="product-main-info">
          <span className="product-category">{product.category}</span>
          <h3 className="product-name">{product.name}</h3>
          
          {/* Rating */}
          <div className="product-rating">
            <div className="stars">{renderStars(product.rating)}</div>
            <span className="rating-number">({product.rating})</span>
          </div>

          {/* Description */}
          <p className="product-description">{product.description}</p>

          {/* Brand & Stock Info */}
          <div className="product-meta">
            <span className="brand">
              <i className="fi fi-br-label"></i>
              {product.brand}
            </span>
            {product.stock > 0 ? (
              <span className="in-stock">
                <i className="fi fi-br-check"></i>
                In Stock ({product.stock})
              </span>
            ) : (
              <span className="out-of-stock">
                <i className="fi fi-br-cross"></i>
                Out of Stock
              </span>
            )}
          </div>
        </div>

        {/* Price & Actions */}
        <div className="product-actions-section">
          <div className="product-price">
            <span className="price">${formatPrice(product.price)}</span>
          </div>

          <div className="action-buttons">
            <button 
              className="btn-add-cart-list" 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <i className="fi fi-br-shopping-cart"></i>
              Add to Cart
            </button>
            <button 
              className="btn-quick-view" 
              onClick={onQuickView}
            >
              <i className="fi fi-br-eye"></i>
              Quick View
            </button>
            <button 
              className="btn-wishlist-list" 
              onClick={handleAddToWishlist}
              aria-label="Add to wishlist"
            >
              <i className="fi fi-br-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;