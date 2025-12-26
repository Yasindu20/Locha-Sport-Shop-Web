import "../../css/homepage/promo.css";
import React, { useState, useEffect } from "react";

const SLIDE_DURATION = 5000;

const Promo = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Discover Amazing Adventures",
      subtitle: "Explore breathtaking destinations around the world",
      landscapeImage:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
      portraitImage:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920&fit=crop",
    },
    {
      id: 2,
      title: "Urban Excellence",
      subtitle: "Experience the pulse of modern city life",
      landscapeImage:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop",
      portraitImage:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1080&h=1920&fit=crop",
    },
    {
      id: 3,
      title: "Nature's Serenity",
      subtitle: "Find peace in the beauty of natural landscapes",
      landscapeImage:
        "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=1920&h=1080&fit=crop",
      portraitImage:
        "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=1080&h=1920&fit=crop",
    },
  ];

  useEffect(() => {
    setProgress(0);
    const start = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / SLIDE_DURATION) * 100, 100));
    }, 50);

    const slideTimeout = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(slideTimeout);
    };
  }, [currentSlide, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="hero-slider">
      <div
        className="slides-container"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="slide">
            <picture>
              <source
                media="(orientation: landscape)"
                srcSet={slide.landscapeImage}
              />
              <source
                media="(orientation: portrait)"
                srcSet={slide.portraitImage}
              />
              <img src={slide.landscapeImage} alt={slide.title} />
            </picture>

            <div className="slide-overlay" />

            <div className="slide-content">
              <div className="content-wrapper">
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-subtitle">{slide.subtitle}</p>
                <button className="slide-button">Explore Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Timer */}
      <div className="slide-timer">
        <div className="slide-timer-bar" style={{ width: `${progress}%` }} />
      </div>

      {/* Dots */}
      <div className="dot-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Promo;
