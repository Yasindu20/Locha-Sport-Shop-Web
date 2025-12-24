import "../css/hero.css";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <>
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

        <button
          onClick={prevSlide}
          className="nav-button nav-prev"
          aria-label="Previous slide"
        >
          <ChevronLeft size={32} />
        </button>

        <button
          onClick={nextSlide}
          className="nav-button nav-next"
          aria-label="Next slide"
        >
          <ChevronRight size={32} />
        </button>

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
    </>
  );
};

export default Hero;
