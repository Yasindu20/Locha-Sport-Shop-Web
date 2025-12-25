import React from 'react'
import "../../css/homepage/hero.css";

const Hero = () => {
  return (
    <section className='hero-section'>
      <div className='hero-overlay'></div>

      <div className='hero-content'>
        <span className='hero-badge'>
          <i className='fi fi-brsparkles'></i>
          New Collection 2025
        </span>

        {/*main headline*/}
        <h1 className='hero-title'>
          Unleash Your 
          <span className='highlight'>Athletic Potential</span>
        </h1>

        {/*Supporting text*/}
        <p className='hero-description'>
          Premium sports gear designed for Champions.
          Quality equirements that pushes your limits.
        </p>

        {/*Call-to-actions buttons*/}
        <div className='hero-buttons'>
          <button className='btn-primary'>
            Shop Now 
            <i className='fi fi-br-arrow-right'></i>
          </button>
          <button className='btn-secondary'>
            Explore Categories 
          </button>
        </div>

        {/*Trust Indicators*/}
        <div className='hero-stats'>
          <div className='stat-item'>
            <h3>10k+</h3>
            <p>Happy Athletes</p>
          </div>
          <div className='stat-item'>
            <h3>500+</h3>
            <p>Premium Products</p>
          </div>
          <div className='stat-items'>
            <h3>50+</h3>
            <p>Sport Categories</p>
          </div>
        </div>
      </div>

      {/*Decorative elements*/}
      <div className='hero-decoration'>
        <div className='circle circle-1'></div>
        <div className='circle circle-2'></div>
        <div className='circle circle-3'></div>
      </div>
    </section>
  );
};

export default Hero;
