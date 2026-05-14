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
            transition: "background-color 0.2s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--bg-card)")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "13px", color: "var(--text-primary)" }}>{f.icon}</span>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--text-primary)",
              letterSpacing: "0.04em",
            }}>{f.title}</span>
          </div>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: "var(--text-muted)",
            lineHeight: 1.7,
          }}>{f.description}</p>
        </div>
      ))}
    </section>
  );
}