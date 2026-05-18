"use client";
import NeuralGlobe from "@/components/NeuralGlobe";

const heroKickerItems = [
  "HACKATHONS & EVENTS",
  "AI SCALING & DEVELOPMENT",
  "MENTORSHIP & NETWORKING",
  "ENTERPRISE & SOLUTIONS",
];

export default function Hero() {
  return (
    <section id="home" className="hero-grid">
      <div
        className="hero-left"
        style={{
          borderRight: "1px solid var(--border-color)",
          padding: "0 40px 40px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingTop: "52px",
        }}
      >
        <div className="hero-copy">
          <div className="hero-kicker-wrap" aria-label="Knotic focus areas">
            <span className="hero-kicker-cycle" aria-hidden="true">
              {heroKickerItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </span>
            <span className="sr-only">
              HACKATHONS, AI SCALING, MENTORSHIP, ENTERPRISE
            </span>
          </div>

          <p className="hero-preheading">THE ARCHITECTURE FOR TECH MOMENTUM</p>

          <h1 className="hero-headline">
            Build the Future Faster.
          </h1>

          <p className="hero-subheadline">
          Knotic designs hyper-focused hackathons, nurtures elite developer communities, and connects rising talent with 1:1 mentorship from global tech leaders to build, launch, and scale production-ready AI systems for modern enterprises.
          </p>

          <div className="hero-actions">
            <a
              href="#contact"
              className="hero-launch-cta"
            >
              <span>Launch Your Program</span>
              <span aria-hidden="true">↗</span>
            </a>

            <a href="#services" className="hero-secondary-cta">
              <span>Explore Ecosystem</span>
              <span aria-hidden="true" className="hero-secondary-arrow">
                ↓
              </span>
            </a>
          </div>
        </div>
      </div>

      <div
        className="hero-image-panel"
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "100vh",
        }}
      >
        <NeuralGlobe />
      </div>
    </section>
  );
}
