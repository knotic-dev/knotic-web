"use client";
import Image from "next/image";
import { cta } from "@/data/content";
import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "520px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "80px 32px",
        overflow: "hidden",
        borderBottom: "1px solid var(--border-color)",
        backgroundColor: "#000",
      }}
    >
      {/* ── Background image ── */}
      <Image
        src="/images/cta-bg.jpg"
        alt=""
        fill
        priority
        style={{
          objectFit: "cover",
          objectPosition: "center 30%",  /* show more of the lit city area */
          opacity: 0.92,                  /* nearly full — let the dark photo speak */
        }}
      />

      {/* Thin fade strips at top & bottom only — fades to black not off-white */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, #000 0%, transparent 12%, transparent 82%, #000 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── Content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 5.5vw, 64px)",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#ffffff",
            whiteSpace: "pre-line",
          }}
        >
          {cta.heading}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "rgba(255,255,255,0.55)",
            maxWidth: "340px",
            lineHeight: 1.8,
          }}
        >
          {cta.subheading}
        </p>
        <Button href="#contact">{cta.buttonLabel}</Button>
      </div>
    </section>
  );
}