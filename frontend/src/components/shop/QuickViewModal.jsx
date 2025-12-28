import React, { useState, useEffect } from "react";
import "../../css/shop/quickViewModal.css";

const QuickViewModal = ({ product, onClose }) => {
  // ================================
  // STATE
  // ================================

  const [quantity, setQuantity] = useState(1);

  // Generate a stable random review count (FIX for Math.random in render)
  const [reviewsCount] = useState(() => {
    return Math.floor(Math.random() * 100) + 50;
  }, []);

  // ================================
  // SIDE EFFECTS
  // ================================

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  // ================================
  // HELPER FUNCTIONS (PURE)
  // ================================

  const formatPrice = (price) => price.toFixed(2);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <i key={`full-${i}`} className="fi fi-br-star star-filled" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <i key="half" className="fi fi-br-star-half-stroke star-filled" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <i key={`empty-${i}`} className="fi fi-br-star star-empty" />
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

  // ================================
  // QUANTITY HANDLERS
  // ================================

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity}x ${product.name} to cart!`);
    onClose();
  };

  // ================================
  // RENDER
  // ================================

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <i className="fi fi-br-cross" />
        </button>

        <div className="modal-body">
          {/* Product Image */}
          <div className="modal-image">
            <img src={product.image} alt={product.name} />
            {product.badge && (
              <span
                className={`product-badge ${getBadgeClass(product.badge)}`}
              >
                {product.badge.toUpperCase()}
              </span>
            )}
          </div>

          {/* Product Details */}
          <div className="modal-details">
            <span className="product-category">{product.category}</span>

            <h2 className="product-name">{product.name}</h2>

            {/* Rating */}
            <div className="product-rating">
              <div className="stars">{renderStars(product.rating)}</div>
              <span className="rating-number">
                {product.rating} ({reviewsCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="product-price">
              <span className="price">${formatPrice(product.price)}</span>
              {product.badge === "sale" && (
                <span className="original-price">
                  ${formatPrice(product.price * 1.3)}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="product-description">
              <h4>Description</h4>
              <p>{product.description}</p>
            </div>

            {/* Product Info */}
            <div className="product-info-grid">
              <div className="info-item">
                <span className="info-label">Brand:</span>
                <span className="info-value">{product.brand}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Type:</span>
                <span className="info-value">{product.type}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Stock:</span>
                <span
                  className={`info-value ${
                    product.stock > 0 ? "in-stock" : "out-of-stock"
                  }`}
                >
                  {product.stock > 0
                    ? `${product.stock} available`
                    : "Out of Stock"}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">SKU:</span>
                <span className="info-value">{product._id}</span>
              </div>
            </div>

            {/* Quantity */}
            <div className="quantity-section">
              <label className="quantity-label">Quantity:</label>
              <div className="quantity-selector">
                <button
                  className="qty-btn"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <i className="fi fi-br-minus" />
                </button>

                <input
                  type="number"
                  className="qty-input"
                  value={quantity}
                  min="1"
                  max={product.stock}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 1 && val <= product.stock) {
                      setQuantity(val);
                    }
                  }}
                />

                <button
                  className="qty-btn"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                >
                  <i className="fi fi-br-plus" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="modal-actions">
              <button
                className="btn-add-to-cart"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <i className="fi fi-br-shopping-cart" /> Add to Cart
              </button>

              <button className="btn-wishlist">
                <i className="fi fi-br-heart" /> Add to Wishlist
              </button>
            </div>

            {/* Extra Info */}
            <div className="additional-info">
              <div className="info-row">
                <i className="fi fi-br-truck-side" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="info-row">
                <i className="fi fi-br-undo" />
                <span>30-day return policy</span>
              </div>
              <div className="info-row">
                <i className="fi fi-br-shield-check" />
                <span>100% authentic products guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
