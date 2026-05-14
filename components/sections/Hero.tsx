"use client";
import Image from "next/image";
import { site } from "@/data/content";
import Button from "@/components/ui/Button";

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
        <div style={{ flex: 1 }} />

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(52px, 6vw, 80px)",
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
          }}
        >
          {site.tagline}
        </h1>

        <div style={{ flex: 1 }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--text-muted)",
              lineHeight: 1.8,
              maxWidth: "300px",
            }}
          >
            {site.description}
          </p>
          <div>
            <Button href="#services">Free Demo</Button>
          </div>
        </div>
      </div>

      {/* ── Right panel: image ── */}
      <div
        className="hero-image-panel"
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "100vh",
          backgroundColor: "#000",
        }}
      >
        <Image
          src="/images/hero.jpg"
          alt={`${site.name} — ${site.tagline}`}
          fill
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center 20%",
            opacity: 0.92,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, transparent 75%, #000 100%)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
      </div>
    </section>
  );
}
