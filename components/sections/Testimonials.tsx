"use client";
import { useState } from "react";
import Image from "next/image";
import { testimonials } from "@/data/content";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section
      style={{
        borderBottom: "1px solid var(--border-color)",
        padding: "72px 32px",
        textAlign: "center",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}>
        <SectionLabel>Testimonials</SectionLabel>
      </div>

      <blockquote
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(24px, 3.5vw, 40px)",
          fontWeight: 700,
          lineHeight: 1.25,
          letterSpacing: "-0.01em",
          color: "var(--text-primary)",
          maxWidth: "780px",
          margin: "0 auto 32px",
          transition: "opacity 0.3s ease",
        }}
      >
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "14px",
          color: "var(--text-primary)",
          marginBottom: "4px",
        }}
      >
        {t.name}
      </p>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "13px",
          color: "var(--text-secondary)",
          marginBottom: "24px",
        }}
      >
        {t.title}
      </p>

      {/* Avatar row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        {testimonials.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setActive(i)}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border:
                i === active
                  ? "2px solid var(--accent-cyan)"
                  : "2px solid var(--border-color)",
              backgroundColor: "var(--bg-card)",
              cursor: "pointer",
              padding: 0,
              overflow: "hidden",          
              position: "relative",
              transform: i === active ? "scale(1.15)" : "scale(1)",
              transition: "all 0.2s ease",
              flexShrink: 0,
            }}
          >
            <Image
              src={item.avatar}
              alt={item.name}
              fill
              style={{ objectFit: "cover" }}
              sizes="36px"
            />
          </button>
        ))}
      </div>
    </section>
  );
}