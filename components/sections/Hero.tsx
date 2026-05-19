"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import NeuralGlobe from "@/components/ui/NeuralGlobe";
import LaunchProgramModal from "./LaunchProgramModal";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.12 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.78, ease: EASE },
  },
};

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="home" className="hero-grid">
      {/* LEFT: Content Panel */}
      <div className="hero-left">
        <div className="hero-left-glow" aria-hidden="true" />

        <motion.div
          className="hero-copy"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Status badge */}
          <motion.div variants={fadeUp} className="hero-status-badge">
            <span className="hero-status-dot" />
            <span>AI Systems&nbsp;&nbsp;·&nbsp;&nbsp;Hackathons&nbsp;&nbsp;·&nbsp;&nbsp;Developer Ecosystems</span>
          </motion.div>

          {/* Section label */}
          <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span className="label-accent-bar" />
            <p className="hero-preheading">THE ARCHITECTURE FOR TECH MOMENTUM</p>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUp} className="hero-headline">
            Build the{" "}
            <span className="hero-headline-gradient">Future</span>
            {" "}Faster.
          </motion.h1>

          {/* Subheadline */}
          <motion.p variants={fadeUp} className="hero-subheadline">
            Knotic engineers AI-powered products, runs high-impact innovation
            programs, and builds developer ecosystems that drive real growth for
            startups and enterprises.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="hero-actions">
            <a
              href="#contact"
              className="hero-launch-cta"
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
            >
              <span>Launch Your Program</span>
              <span className="hero-cta-arrow" aria-hidden="true">→</span>
            </a>
            <a href="#services" className="hero-secondary-cta">
              <span>Explore Services</span>
              <span aria-hidden="true" className="hero-secondary-arrow">↓</span>
            </a>
          </motion.div>

          {/* Trust indicator */}
          <motion.div variants={fadeUp} className="hero-trust">
            <span className="hero-trust-dot" />
            <span>Trusted by developers, startups &amp; innovation teams</span>
          </motion.div>
        </motion.div>
      </div>

      {/* RIGHT: Globe Panel */}
      <div
        className="hero-image-panel"
        style={{ position: "relative", overflow: "hidden", minHeight: "100vh" }}
      >
        <div className="hero-globe-glow" aria-hidden="true" />
        <NeuralGlobe />
      </div>

      <LaunchProgramModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
