import React from "react";
import '../../css/homepage/categories.css';

const Categories = () => {
    return (
        <section className="categories-section">
            <div className="container">
                {/*Section Header*/}
                <div className="section-header">
                    <span className="section-badge">Explore</span>
                    <h2 className="section-title">Shop by Sport</h2>
                    <p className="section-description">
                        Find the perfect gear for your favorite sport.
                    </p>
                </div>

                {/*Call in action button*/}
                <div className="categories-cta">
                    <button className="btn-view-all">
                        View All Categories
                        <i className="fi fi-br-arrow-right"></i>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Categories