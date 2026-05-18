"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { process } from "@/data/content";
import SectionLabel from "@/components/ui/SectionLabel";

function PixelGridOverlay() {
  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="pixel-grid-process"
          x="0"
          y="0"
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
        >
          <rect x="0" y="0" width="6" height="6" fill="rgba(59,130,246,0.06)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pixel-grid-process)" />
    </svg>
  );
}

export default function Process() {
  const [active, setActive] = useState(0);
  const total = process.steps.length;
  const step = process.steps[active];

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 5000); // Extended slightly to 5s to let the elegant transition breathe

    return () => clearInterval(interval);
  }, [total]);

  return (
    <section
      id="process"
      style={{ borderBottom: "1px solid var(--border-color)" }}
    >
      {/* Sleek CSS Animations injected locally to keep setup self-contained */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes subtleScale {
          0% { transform: scale(1.06); opacity: 0; filter: blur(4px); }
          100% { transform: scale(1); opacity: 1; filter: blur(0); }
        }
        @keyframes elegantReveal {
          0% { transform: translateY(24px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes lineGrow {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-image { animation: subtleScale 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-text { animation: elegantReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />

      {/* ── Heading ── */}
      <div
        style={{
          padding: "48px 32px",
          textAlign: "center",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(24px, 4vw, 48px)",
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: "var(--text-primary)",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          {process.heading}
        </h2>
      </div>

      {/* ── Step viewer ── */}
      <div className="process-viewer">
        {/* Left: image */}
        <div
          className="process-image-panel"
          style={{ position: "relative", overflow: "hidden", backgroundColor: "#000" }}
        >
          {/* Key triggers remounting, driving the slick pan/zoom look */}
          <div key={`img-${active}`} className="animate-image" style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image
              src={step.image}
              alt={step.title}
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              priority
            />
          </div>

          <PixelGridOverlay />

          {/* Right-edge fade into content panel */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, transparent 80%, var(--bg-primary) 100%)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />

          {/* Ghost step number */}
          <span
            key={`num-${active}`}
            className="animate-text"
            style={{
              position: "absolute",
              bottom: "24px",
              left: "28px",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(64px, 8vw, 96px)",
              fontWeight: 400,
              color: "rgba(139,92,246,0.15)",
              lineHeight: 1,
              zIndex: 3,
              userSelect: "none",
              pointerEvents: "none",
              animationDelay: "0.1s"
            }}
          >
            {String(active + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Right: content */}
        <div
          className="process-content-panel"
          style={{
            borderRight: "1px solid var(--border-color)",
            padding: "36px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <SectionLabel>{process.sectionLabel}</SectionLabel>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                color: "var(--text-faint)",
              }}
            >
              {active + 1}/{total}
            </span>
          </div>

          {/* Content Wrapper with orchestrated delays */}
          <div
            key={`content-${active}`}
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <h3
              className="animate-text"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(22px, 2.5vw, 30px)",
                fontWeight: 700,
                color: "var(--text-primary)",
                lineHeight: 1.2,
                animationDelay: "0.05s",
                opacity: 0 // Prevents flash before animation kicks in
              }}
            >
              {step.title}
            </h3>
            <p
              className="animate-text"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                maxWidth: "340px",
                animationDelay: "0.15s",
                opacity: 0
              }}
            >
              {step.description}
            </p>
          </div>

          {/* Modern Minimalistic Loading Timelines */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {process.steps.map((_, i) => (
              <div
                key={i}
                onClick={() => setActive(i)}
                style={{
                  height: "2px",
                  flex: 1,
                  maxWidth: "40px",
                  backgroundColor: "rgba(255,255,255,0.07)",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                {i === active && (
                  <div 
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      height: "100%",
                      backgroundColor: "var(--accent, var(--accent-purple, #8b5cf6))",
                      animation: "lineGrow 5s linear forwards"
                    }}
                  />
                )}
                {i < active && (
                  <div 
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      height: "100%",
                      width: "100%",
                      backgroundColor: "var(--text-secondary)",
                      opacity: 0.4
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}