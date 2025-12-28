import React, { useState } from "react";
import "../../css/shop/filterSidebar.css";

const FilterSidebar = ({ filters, setFilters, showFilters, setShowFilters }) => {
  // ========================================
  // AVAILABLE FILTER OPTIONS
  // ========================================
  
  const categories = [
    { name: 'Football', count: 45 },
    { name: 'Basketball', count: 38 },
    { name: 'Tennis', count: 29 },
    { name: 'Running', count: 52 },
    { name: 'Fitness', count: 67 },
    { name: 'Swimming', count: 23 },
  ];

  const brands = [
    { name: 'Nike', count: 42 },
    { name: 'Adidas', count: 38 },
    { name: 'Puma', count: 25 },
    { name: 'Under Armour', count: 20 },
    { name: 'Reebok', count: 18 },
    { name: 'New Balance', count: 15 },
  ];

  const ratings = [
    { stars: 5, label: '5 Stars' },
    { stars: 4, label: '4 Stars & Up' },
    { stars: 3, label: '3 Stars & Up' },
    { stars: 2, label: '2 Stars & Up' },
  ];

  // Local state for price range slider
  const [priceRange, setPriceRange] = useState(filters.priceRange);

  // ========================================
  // FILTER HANDLERS
  // ========================================
  
  /**
   * Handles category checkbox changes
   * Adds or removes category from filters array
   */
  const handleCategoryChange = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category) // Remove if exists
      : [...filters.categories, category]; // Add if doesn't exist
    
    setFilters({ ...filters, categories: newCategories });
  };

  /**
   * Handles brand checkbox changes
   */
  const handleBrandChange = (brand) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    
    setFilters({ ...filters, brands: newBrands });
  };

  /**
   * Handles rating filter change
   */
  const handleRatingChange = (rating) => {
    setFilters({ ...filters, minRating: rating });
  };

  /**
   * Handles price range change from slider
   * Uses local state for smooth sliding, updates parent on release
   */
  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(e.target.value);
    setPriceRange(newRange);
  };

  /**
   * Updates parent filter state when user releases slider
   */
  const handlePriceRelease = () => {
    setFilters({ ...filters, priceRange: priceRange });
  };

  /**
   * Resets all filters to default
   */
  const handleResetFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 500],
      brands: [],
      minRating: 0,
    });
    setPriceRange([0, 500]);
  };

  // ========================================
  // RENDER
  // ========================================
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`filter-overlay ${showFilters ? 'active' : ''}`}
        onClick={() => setShowFilters(false)}
      />

      {/* Sidebar */}
      <aside className={`filter-sidebar ${showFilters ? 'open' : ''}`}>
        {/* Mobile Header */}
        <div className="filter-header">
          <h3>Filters</h3>
          <button 
            className="close-btn"
            onClick={() => setShowFilters(false)}
            aria-label="Close filters"
          >
            <i className="fi fi-br-cross"></i>
          </button>
        </div>

        {/* Reset Button */}
        <button className="btn-reset-filters" onClick={handleResetFilters}>
          <i className="fi fi-br-refresh"></i>
          Reset All Filters
        </button>

        {/* Category Filter */}
        <div className="filter-group">
          <h4 className="filter-title">Categories</h4>
          <div className="filter-options">
            {categories.map((category) => (
              <label key={category.name} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category.name)}
                  onChange={() => handleCategoryChange(category.name)}
                />
                <span className="checkbox-custom"></span>
                <span className="label-text">
                  {category.name}
                  <span className="count">({category.count})</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="filter-group">
          <h4 className="filter-title">Price Range</h4>
          <div className="price-range-container">
            <div className="price-display">
              <span>${priceRange[0]}</span>
              <span>-</span>
              <span>${priceRange[1]}</span>
            </div>
            
            <div className="dual-range-slider">
              {/* Min Price Slider */}
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange(e, 0)}
                onMouseUp={handlePriceRelease}
                onTouchEnd={handlePriceRelease}
                className="slider slider-min"
              />
              {/* Max Price Slider */}
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(e, 1)}
                onMouseUp={handlePriceRelease}
                onTouchEnd={handlePriceRelease}
                className="slider slider-max"
              />
            </div>

            {/* Quick Price Buttons */}
            <div className="price-quick-select">
              <button onClick={() => {
                setPriceRange([0, 50]);
                setFilters({ ...filters, priceRange: [0, 50] });
              }}>
                Under $50
              </button>
              <button onClick={() => {
                setPriceRange([50, 150]);
                setFilters({ ...filters, priceRange: [50, 150] });
              }}>
                $50 - $150
              </button>
              <button onClick={() => {
                setPriceRange([150, 500]);
                setFilters({ ...filters, priceRange: [150, 500] });
              }}>
                Over $150
              </button>
            </div>
          </div>
        </div>

        {/* Brand Filter */}
        <div className="filter-group">
          <h4 className="filter-title">Brands</h4>
          <div className="filter-options">
            {brands.map((brand) => (
              <label key={brand.name} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand.name)}
                  onChange={() => handleBrandChange(brand.name)}
                />
                <span className="checkbox-custom"></span>
                <span className="label-text">
                  {brand.name}
                  <span className="count">({brand.count})</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div className="filter-group">
          <h4 className="filter-title">Customer Rating</h4>
          <div className="filter-options">
            {ratings.map((rating) => (
              <label key={rating.stars} className="radio-label">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === rating.stars}
                  onChange={() => handleRatingChange(rating.stars)}
                />
                <span className="radio-custom"></span>
                <span className="label-text">
                  <div className="rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i} 
                        className={`fi fi-br-star ${i < rating.stars ? 'filled' : ''}`}
                      />
                    ))}
                  </div>
                  <span>{rating.label}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Active Filters Summary (Mobile) */}
        <div className="active-filters-mobile">
          <button 
            className="btn-apply-filters"
            onClick={() => setShowFilters(false)}
          >
            Apply Filters
          </button>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;