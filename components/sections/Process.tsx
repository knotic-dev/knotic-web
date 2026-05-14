"use client";
import { useState } from "react";
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
          <rect x="0" y="0" width="6" height="6" fill="rgba(0,0,0,0.07)" />
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

  return (
    <section
      id="process"
      style={{ borderBottom: "1px solid var(--border-color)" }}
    >
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
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
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
          style={{ position: "relative", overflow: "hidden" }}
        >
          <Image
            key={step.image}
            src={step.image}
            alt={step.title}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
              transition: "opacity 0.4s ease",
            }}
          />

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
            style={{
              position: "absolute",
              bottom: "24px",
              left: "28px",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(64px, 8vw, 96px)",
              fontWeight: 400,
              color: "rgba(255,255,255,0.24)",
              lineHeight: 1,
              zIndex: 3,
              userSelect: "none",
              pointerEvents: "none",
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
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--text-muted)",
              }}
            >
              {active + 1}/{total}
            </span>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(22px, 2.5vw, 30px)",
                fontWeight: 400,
                color: "var(--text-primary)",
                lineHeight: 1.2,
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--text-muted)",
                lineHeight: 1.8,
                maxWidth: "300px",
              }}
            >
              {step.description}
            </p>
          </div>

          {/* Dots + nav */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {process.steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  height: "1px",
                  width: i === active ? "36px" : "16px",
                  backgroundColor:
                    i === active
                      ? "var(--text-primary)"
                      : "var(--border-color)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
            <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
              {(["← Prev", "Next →"] as const).map((label, i) => (
                <button
                  key={label}
                  onClick={() =>
                    setActive((p) =>
                      i === 0 ? Math.max(0, p - 1) : Math.min(total - 1, p + 1),
                    )
                  }
                  disabled={i === 0 ? active === 0 : active === total - 1}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    color: "var(--text-muted)",
                    border: "1px solid var(--border-color)",
                    backgroundColor: "transparent",
                    padding: "4px 10px",
                    cursor: "pointer",
                    opacity: (i === 0 ? active === 0 : active === total - 1)
                      ? 0.2
                      : 1,
                    transition: "all 0.2s ease",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
