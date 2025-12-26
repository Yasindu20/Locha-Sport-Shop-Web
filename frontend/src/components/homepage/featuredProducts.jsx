import React from "react";
import '../../css/homepage/featured.css';

const FeaturedProducts = () => {
    const products = [
        
    ]

    const formatPrice = (price) => {
        return price.toFixed(2);
    }

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        //full stars
        for (let i=0; i < fullStars; i++) {
            stars.push(
                <i key={`full-${i}`} className="fi fi-br-star-filled"></i>
            );
        }

        //half stars
        if (hasHalfStar) {
            stars.push(
                <i key='half' className="fi fi-br-star-half-stroke star-filled"></i>
            );
        }

        //empty stars
        const emptyStars = 5 - Math.ceil(rating);
        for (let i=0; i< emptyStars; i++) {
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

    return (
        <section className="featured-section">
            <div className="container">
                {/*Section Header*/}
                <div className="section-header">
                    <span className="section-badge">Featured</span>
                    <h2 className="section-title">Trending Right Now</h2>
                    <p className="section-description">
                        Checkout Our Most Popular products loved by athletes worldwide
                    </p>
                </div>

                {/*product grid with .map*/}
                <div className="products-grid">
                    {products.map((product) => (
                        <div key={product._id} className="product-card">
                            {/*product badge(New, Sales, hot, etc)*/}
                            {product.badge && (
                                <span className={`product-badge ${getBadgeClass(product.badge)}`}>
                                    {product.badge.toUpperCase()}
                                </span>
                            )}

                            {/*product image*/}
                            <div className="product-image">
                                <img src={product.image} alt={product.name} />

                                {/*Quick Action Buttons*/}
                                <div className="product-actions">
                                    <button className="action-btn" aria-label="Add to Wishlist">
                                        <i className="fi fi-br-heart"></i>
                                    </button>
                                    <button className="action-btn" aria-label="Quick View">
                                        <i className="fi fi-br-eye"></i>
                                    </button>
                                </div>
                            </div>

                            {/*product info*/}
                            <div className="product-info">
                                <span className="product-category">{product.category}</span>
                                <h3 className="product-name">{product.name}</h3>

                                {/*Star Rating*/}
                                <div className="product-rating">
                                    <div className="stars">{renderStars(product.rating)}</div>
                                    <span className="rating-number">({product.rating})</span>
                                </div>

                                {/*Price and Stock info*/}
                                <div className="product-footer">
                                    <div className="product-price">
                                        <span className="price">${formatPrice(product.price)}</span>
                                        {product.stock < 10 && product.stock > 0 && (
                                            <span className="stock-warning">Only {product.stock} Left!</span>
                                        )}
                                    </div>
                                    <button className="btn-add-cart" disabled={product.stock === 0} title={product.stock === 0 ? 'Out of stock' : 'Add to Cart'}>
                                        <i className="fi fi-br-shopping-cart"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/*View All Products Button*/}
                <div className="featured-cta">
                    <button className="btn-view-all">
                        View All Products 
                        <i className="fi fi-br-arrow-right"></i>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default FeaturedProducts;
