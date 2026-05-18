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
        backgroundColor: "#0f172a",
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
          objectPosition: "center 30%",
          opacity: 0.75,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(59,130,246,0.4) 0%, rgba(34,211,238,0.3) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, #0f172a 0%, transparent 15%, transparent 80%, #0f172a 100%)",
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
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: "#ffffff",
            whiteSpace: "pre-line",
            textShadow: "0 2px 24px rgba(34,211,238,0.25)",
          }}
        >
          {cta.heading}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
            color: "rgba(248,250,252,0.85)",
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