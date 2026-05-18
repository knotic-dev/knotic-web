"use client";

import { useState } from "react";

export default function Events() {
  const upcomingEvents = [
    {
      title: "AIVerse Delhi",
      date: "6th June",
      link: "https://www.commudle.com/communities/knotic/events/aiverse",
      stats: "AI-focused conference",
    },
    {
      title: "Build With TRAE",
      date: "13th June",
      link: "https://luma.com/6kh62ixm",
      stats: "Building with AI",
    },
  ];

  const pastEvents = [
    {
      title: "Hiring Hackathon with Turgon AI",
      date: "21st–22nd February 2026",
      metrics: [
        { label: "Registrations", value: "3600+" },
        { label: "Countries", value: "8+" },
        { label: "Mentors", value: "15" },
        { label: "Judges", value: "4" }
      ]
    },
    {
      title: "Hackathon with Agora",
      date: "14th–15th November 2025",
      metrics: [
        { label: "Registrations", value: "3000+" },
        { label: "Countries", value: "3+" },
        { label: "Mentors", value: "12" },
        { label: "Judges", value: "6" }
      ]
    },
  ];

  const [hoveredIdx, setHoveredIdx] = useState<string | null>(null);

  return (
    <section
      id="events"
      style={{
        padding: "100px 24px",
        backgroundColor: "var(--bg-primary, transparent)",
        borderBottom: "1px solid var(--border-color)",
        overflow: "hidden",
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes radarPulse {
          0% { transform: scale(0.6); opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .beacon-ring {
          animation: radarPulse 2s infinite cubic-bezier(0.215, 0.610, 0.355, 1);
        }
        .upcoming-highlight-card {
          background-color: var(--bg-secondary, rgba(255, 255, 255, 0.02));
          border: 1px solid var(--accent-cyan, #00f0ff) !important;
        }
        .upcoming-highlight-card:hover {
          box-shadow: 0 12px 30px -10px rgba(0, 240, 255, 0.25) !important;
        }
        .past-interactive-row:hover {
          border-color: var(--text-secondary, rgba(0,0,0,0.3)) !important;
          background-color: var(--bg-secondary, rgba(0, 0, 0, 0.02)) !important;
        }
        .metric-block-value {
          transition: color 0.2s ease, text-shadow 0.2s ease;
        }
        /* Purple glow effect on number hover */
        .metric-block:hover .metric-block-value {
          color: #A855F7 !important;
          text-shadow: 0 0 15px rgba(168, 85, 247, 0.6);
        }
      `}} />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* SECTION HEADER */}
        <div style={{ marginBottom: "64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <span style={{ display: "inline-block", width: "4px", height: "18px", backgroundColor: "var(--accent-cyan, #00f0ff)", borderRadius: "99px" }} />
            <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.2em", color: "#A855F7", fontWeight: "600" }}>
              Events
            </span>
          </div>
          <h2 style={{ fontFamily: "var(--font-display, sans-serif)", fontSize: "clamp(34px, 4vw, 48px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.025em", color: "var(--text-primary)", margin: 0 }}>
            Past & Upcoming Events
          </h2>
        </div>

        {/* ── UPCOMING EVENTS ── */}
        <div style={{ marginBottom: "80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--accent-cyan, #00f0ff)", margin: 0 }}>
              Live & Upcoming Events
            </h3>
            <span style={{ flexGrow: 1, height: "1px", background: "linear-gradient(90deg, var(--border-color), transparent)" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))", gap: "24px" }}>
            {upcomingEvents.map((event, idx) => {
              const key = `upcoming-${idx}`;
              const isHovered = hoveredIdx === key;

              return (
                <a
                  key={idx}
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="upcoming-highlight-card"
                  onMouseEnter={() => setHoveredIdx(key)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    padding: "36px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "28px",
                    transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease",
                    transform: isHovered ? "translateY(-4px)" : "translateY(0px)",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(0, 240, 255, 0.08)", padding: "4px 12px", borderRadius: "99px", border: "1px solid rgba(0, 240, 255, 0.2)" }}>
                        <span style={{ position: "relative", display: "inline-flex", width: "6px", height: "6px" }}>
                          <span className="beacon-ring" style={{ position: "absolute", inset: 0, borderRadius: "50%", backgroundColor: "var(--accent-cyan, #00f0ff)" }} />
                          <span style={{ position: "relative", borderRadius: "50%", width: "6px", height: "6px", backgroundColor: "var(--accent-cyan, #00f0ff)" }} />
                        </span>
                        <span style={{ fontSize: "10px", color: "var(--accent-cyan, #00f0ff)", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          Upcoming
                        </span>
                      </div>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-secondary)", fontWeight: "500" }}>
                        {event.date}
                      </span>
                    </div>

                    <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "24px", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 8px 0" }}>
                      {event.title}
                    </h4>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>
                      {event.stats}
                    </p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: "600", color: "var(--text-primary)", transition: "color 0.2s ease" }}>
                    <span style={{ borderBottom: "1px solid currentColor" }}>Register for Event</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: isHovered ? "translate(3px, -3px)" : "none", transition: "transform 0.2s ease" }}>
                      <path d="M3.5 10.5L10.5 3.5M10.5 3.5H5.25M10.5 3.5V8.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* ── PAST EVENTS ── */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)", margin: 0 }}>
              Past Events - Archive
            </h3>
            <span style={{ flexGrow: 1, height: "1px", background: "linear-gradient(90deg, var(--border-color), transparent)" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {pastEvents.map((event, idx) => {
              const key = `past-${idx}`;
              const isHovered = hoveredIdx === key;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredIdx(key)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="past-interactive-row past-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                    gap: "32px",
                    padding: "32px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-color)",
                    backgroundColor: "transparent",
                    opacity: hoveredIdx && !isHovered ? 0.4 : 1,
                    transition: "all 0.25s ease",
                  }}
                >
                  {/* Left Panel */}
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase" }}>
                        {event.date}
                      </span>
                      <span style={{ fontSize: "10px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)", backgroundColor: "var(--bg-secondary, rgba(0,0,0,0.04))", border: "1px solid var(--border-color)", padding: "2px 8px", borderRadius: "4px" }}>
                        Completed
                      </span>
                    </div>
                    <h4 style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>
                      {event.title}
                    </h4>
                  </div>

                  {/* Right Panel with Purple Hover Effects */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
                    {event.metrics.map((metric, mIdx) => (
                      <div
                        key={mIdx}
                        className="metric-block"
                        style={{
                          padding: "12px",
                          borderRadius: "8px",
                          backgroundColor: "var(--bg-secondary, rgba(0,0,0,0.02))",
                          border: "1px solid var(--border-color)",
                          textAlign: "center",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          cursor: "default"
                        }}
                      >
                        <span 
                          className="metric-block-value"
                          style={{ 
                            fontFamily: "var(--font-display, sans-serif)", 
                            fontSize: "18px", 
                            fontWeight: 700, 
                            color: "var(--text-primary)", 
                            marginBottom: "2px" 
                          }}
                        >
                          {metric.value}
                        </span>
                        <span style={{ fontSize: "10px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.02em", fontWeight: 500 }}>
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Breakpoint layout engines */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 968px) {
          .past-row {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            padding: 24px !important;
          }
          .past-row > div:first-child {
            align-items: flex-start !important;
          }
          .past-row > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .upcoming-highlight-card {
            padding: 24px !important;
          }
        }
      `}} />
    </section>
  );
}