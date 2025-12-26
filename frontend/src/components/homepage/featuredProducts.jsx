import React from "react";
import '../../css/homepage/featured.css';

const FeaturedProducts = () => {
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
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
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
                                    <button className="action-button" aria-label="Quick View">
                                        <i className="fi fi-br-eye"></i>
                                    </button>
                                </div>
                            </div>

                            {/*product info*/}

                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FeaturedProducts;
