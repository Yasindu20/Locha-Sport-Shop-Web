import React from "react";
import "../css/about.css";

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-overlay">
          <h1>About Sports World</h1>
          <p>Gear Up. Play Strong. Perform Better.</p>
        </div>
      </section>

      {/* About Content */}
      <section className="about-content">
        <h2>Sports World | Havelock Town</h2>
        <p>
          Sports World is a leading sportswear and sports equipment store
          located in Havelock Town, Colombo, dedicated to serving athletes,
          fitness enthusiasts, and sports lovers across Sri Lanka.
        </p>

        <p>
          We provide authentic, high-quality sports gear from internationally
          recognized brands to support performance, comfort, and durability. As
          an authorized distributor of global sports brands, we specialize in
          badminton equipment, sports apparel, footwear, accessories, and
          training gear.
        </p>

        <p>
          Whether you are a beginner or a competitive athlete, our expert team
          helps you find the right equipment to match your game. Trusted by
          individuals, clubs, and schools, Sports World is committed to
          delivering reliable sports solutions.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="card">
          <h3>Our Mission</h3>
          <p>
            To deliver premium sports equipment and apparel with expert
            guidance, helping every athlete perform at their best.
          </p>
        </div>

        <div className="card">
          <h3>Our Vision</h3>
          <p>
            To be Sri Lanka’s most trusted sports retail destination, promoting
            active lifestyles and sporting excellence nationwide.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <h2>Why Choose Sports World</h2>
        <ul>
          <li>Authorized seller of genuine international sports brands</li>
          <li>Wide range of sportswear, rackets, footwear, and accessories</li>
          <li>Expert advice from sports-focused professionals</li>
          <li>Trusted by athletes, clubs, and sports communities</li>
          <li>Conveniently located in Havelock Town, Colombo</li>
        </ul>
      </section>

      {/* Visit Section */}
      <section className="visit-us">
        <h2>Visit Sports World Today</h2>
        <p>
          Discover world-class sports gear, expert recommendations, and
          exceptional service — all under one roof.
        </p>

        <div className="visit-details">
          <span>
            <i class="fi fi-sr-marker" /> Havelock Town, Colombo
          </span>
          <span>
            <i class="fi fi-sr-shuttlecock" /> Badminton & Sports Equipment
          </span>
          <span>
            <i class="fi fi-sr-soccer-boots"/> Sportswear, Footwear &
            Accessories
          </span>
        </div>
      </section>
    </div>
  );
};

export default About;
