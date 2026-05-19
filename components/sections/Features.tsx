"use client";

import { useState } from "react";
import { features } from "@/data/content";

// Explicit SVG paths matching your layout screenshot exactly
const getCustomIcon = (title: string) => {
  const normalizedTitle = title.toLowerCase();
  
  if (normalizedTitle.includes("builder")) {
    // Blueprint / Architect Grid Icon
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h18v18H3z"/>
        <path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>
      </svg>
    );
  }
  if (normalizedTitle.includes("community")) {
    // Network / Connected Nodes Icon
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <circle cx="6" cy="6" r="2"/>
        <circle cx="18" cy="6" r="2"/>
        <circle cx="18" cy="18" r="2"/>
        <circle cx="6" cy="18" r="2"/>
        <line x1="7.5" y1="7.5" x2="10.5" y2="10.5"/>
        <line x1="16.5" y1="7.5" x2="13.5" y2="10.5"/>
        <line x1="16.5" y1="16.5" x2="13.5" y2="13.5"/>
        <line x1="7.5" y1="16.5" x2="10.5" y2="13.5"/>
      </svg>
    );
  }
  if (normalizedTitle.includes("10,000") || normalizedTitle.includes("10 to")) {
    // Analytics Growth Chart Icon
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"/>
        <path d="m18.7 8-5.1 5.2-2.8-2.7L7 14.3"/>
        <path d="M13 8h5.7V13.7"/>
      </svg>
    );
  }
  // Default Arrow Right ("We Stay Till It Ships")
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  );
};

export default function Features() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section 
      className="features-grid" 
      style={{ 
        width: "100%",
        position: "relative"
      }}
    >
      {features.map((f, i) => {
        const isCurrentHovered = hoveredIdx === i;
        const isAnyHovered = hoveredIdx !== null;

        return (
          <div
            key={f.title}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              padding: "32px 28px",
              borderRight: i < features.length - 1 && !isCurrentHovered 
                ? "1px solid var(--border-color)" 
                : "none",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              flex: 1,
              cursor: "pointer",
              borderRadius: isCurrentHovered ? "8px" : "0px",
              outline: isCurrentHovered ? "2px solid #00f0ff" : "2px solid transparent", 
              outlineOffset: "-2px",
              backgroundColor: isCurrentHovered ? "var(--bg-card)" : "transparent",
              boxShadow: isCurrentHovered ? "var(--card-shadow)" : "none",
              filter: isAnyHovered && !isCurrentHovered ? "blur(4px) opacity(0.5)" : "none",
              transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
            }}
          >
            {/* Header Content */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ 
                display: "flex",
                alignItems: "center",
                fontSize: "13px", 
                color: "var(--accent-purple)" // Restored original theme color variable
              }}>
                {getCustomIcon(f.title)}
              </span>
              <span style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--text-primary)",
                letterSpacing: "0.01em",
                lineHeight: "1.2"
              }}>
                {f.title}
              </span>
            </div>

            {/* Inline description structure */}
            <div 
              style={{
                maxHeight: isCurrentHovered ? "150px" : "0px",
                opacity: isCurrentHovered ? 1 : 0,
                overflow: "hidden",
                transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
              }}
            >
              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                margin: 0,
                paddingTop: "4px"
              }}>
                {f.description}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}