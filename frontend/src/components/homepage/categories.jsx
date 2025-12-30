import React from "react";
import { Link } from "react-router-dom"; 
import '../../css/homepage/categories.css';

const Categories = () => {
    const categories = [
        {
            name: 'Football',
            icon: '⚽',
            count: 156,
            color: '#e63946',
            slug: 'football'
        },
        {
            name: 'Basketball',
            icon: '🏀',
            count: 98,
            color: '#f77f00',
            slug: 'basketball'
        },
        {
            name: 'Tennis',
            icon: '🎾',
            count: 124,
            color: '#06d6a0',
            slug: 'tennis'
        },
        {
            name: 'Running',
            icon: '🏃',
            count: 203,
            color: '#118ab2',
            slug: 'running'
        },
        {
            name: 'Fitness',
            icon: '💪',
            count: 287,
            color: '#8338ec',
            slug: 'fitness'
        },
        {
            name: 'Swimming',
            icon: '🏊',
            count: 89,
            color: '#2a9d8f',
            slug: 'swimming'
        }
    ];

    return (
        <section className="categories-section">
            <div className="container">
                {/* Section Header */}
                <div className="section-header">
                    <span className="section-badge">Explore</span>
                    <h2 className="section-title">Shop by Sport</h2>
                    <p className="section-description">
                        Find the perfect gear for your favorite sport.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="categories-grid">
                    {categories.map((category) => (
                        <Link 
                            key={category.name}
                            to={`/category/${category.slug}`}
                            className="category-card"
                            style={{ '--category-color': category.color }}
                        >
                            <div className="category-icon">{category.icon}</div>
                            <h3 className="category-name">{category.name}</h3>
                            <p className="category-count">{category.count} Products</p>
                            <div className="category-arrow">
                                <i className="fi fi-br-arrow-right"></i>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Call to Action Button */}
                <div className="categories-cta">
                    <Link to="/shop" className="btn-view-all">
                        View All Categories
                        <i className="fi fi-br-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Categories;