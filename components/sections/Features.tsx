"use client";

import { features } from "@/data/content";

export default function Features() {
  return (
    <section className="features-grid">
      {features.map((f, i) => (
        <div
          key={f.title}
          style={{
            padding: "32px 28px",
            borderRight: i < features.length - 1 ? "1px solid var(--border-color)" : "none",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            transition: "background-color 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = "var(--bg-card)";
            e.currentTarget.style.boxShadow = "var(--card-shadow)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "13px", color: "var(--accent-purple)" }}>{f.icon}</span>
            <span style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--text-primary)",
              letterSpacing: "0.01em",
            }}>{f.title}</span>
          </div>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "13px",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
          }}>{f.description}</p>
        </div>
      ))}
    </section>
  );
}