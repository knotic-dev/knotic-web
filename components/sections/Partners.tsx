"use client";                              // ← add this, needed for useTheme
import Image from "next/image";
import { useTheme } from "next-themes";
import { partners } from "@/data/content";

const REPEATS = 6;

export default function Partners() {
  const { resolvedTheme } = useTheme();
  const blendMode = resolvedTheme === "dark" ? "screen" : "multiply";

  const items = Array.from({ length: REPEATS }, () => partners).flat();

  return (
    <section style={{ borderBottom: "1px solid var(--border-color)", padding: "28px 0" }}>
      <p style={{
        fontFamily: "var(--font-mono)",
        fontSize: "9px",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "var(--text-faint)",
        textAlign: "center",
        marginBottom: "20px",
      }}>
        Our Trusted Partners
      </p>

      <div style={{ maxWidth: "600px", margin: "0 auto", overflow: "hidden", position: "relative" }}>
        {/* Left fade */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: "80px",
          background: "linear-gradient(to right, var(--bg-primary) 0%, transparent 100%)",
          zIndex: 2, pointerEvents: "none",
        }} />
        {/* Right fade */}
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: "80px",
          background: "linear-gradient(to left, var(--bg-primary) 0%, transparent 100%)",
          zIndex: 2, pointerEvents: "none",
        }} />

        {/* Scrolling track */}
        <div
          className="marquee-track"
          style={{ display: "flex", alignItems: "center", width: "max-content", animation: "marquee 18s linear infinite" }}
        >
          {items.map((p, i) => (
            <div
              key={i}
              style={{
                padding: "0 40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "160px",      // ← fixed slot, keeps all logos same space
                height: "40px",
                flexShrink: 0,
              }}
            >
              <Image
                src={p.logo}
                alt={p.name}
                height={28}
                width={120}
                style={{
                  objectFit: "contain",
                  maxHeight: "28px",
                  width: "auto",
                  filter: "grayscale(100%)",
                  opacity: 0.6,
                  mixBlendMode: blendMode as any,   // ← kills black bg on dark, white bg on light
                  transition: "opacity 0.2s ease, filter 0.2s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "1";
                  (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "0.6";
                  (e.currentTarget as HTMLImageElement).style.filter = "grayscale(100%)";
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-${100 / REPEATS}%); }
        }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>
    </section>
  );
}