"use client";
import { useState, useRef } from "react";
import { services } from "@/data/content";

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [coords, setCoords] = useState({ x: 50, y: 30 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCoords({ x, y });
  };

  const getTerminalLogs = () => {
    switch (hoveredIndex) {
      case 0:
        return [
          "> [KNOTIC_ENG] Initializing hackathon engine...",
          "> Configuring prize allocation matrix... Success.",
          "> Deploying registration gateway tokens...",
          "> Status: Pipeline live. Ready for portal launch."
        ];
      case 1:
        return [
          "> [KNOTIC_DEV] Scaling developer core systems...",
          "> Routing traffic through cloud architectures...",
          "> Compiling SaaS MVP boilerplate packages...",
          "> Status: System optimization threshold at 100%."
        ];
      case 2:
        return [
          "> [KNOTIC_AI] Initializing agent cluster arrays...",
          "> Connecting to core LLM operational pipelines...",
          "> Executing automated task automation matrix...",
          "> Status: Operational load successfully reduced by 42%."
        ];
      default:
        return [
          "> [KNOTIC_SYS] Core engine sitting idle...",
          "> Monitoring infrastructure telemetry hooks...",
          "> Hover over services below to inspect clusters...",
          "> Status: All localized platform networks operational."
        ];
    }
  };

  return (
    <section
      id="services"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        width: "100%",
        backgroundColor: "var(--bg-primary)", // Dynamically adapts globally
        padding: "120px 48px",
        boxSizing: "border-box",
        borderBottom: "1px solid var(--border-color)",
        position: "relative",
        overflow: "hidden",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* ADAPTIVE GLOWING MESH LAYER */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background: `
            radial-gradient(
              circle 500px at ${coords.x}% ${coords.y}%, 
              rgba(34, 211, 238, 0.08) 0%, 
              rgba(59, 130, 246, 0.04) 45%, 
              transparent 100%
            ),
            radial-gradient(
              circle 700px at 80% 20%, 
              rgba(59, 130, 246, 0.03) 0%, 
              transparent 100%
            )
          `,
          filter: "blur(50px)",
          transition: "background 0.1s ease-out",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        
        {/* SPLIT HEADER CONTAINER */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "64px",
            marginBottom: "100px",
            width: "100%",
          }}
        >
          {/* Left Text Block */}
          <div style={{ flex: "1 1 500px", maxWidth: "600px" }}>
            <span
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "#3B82F6",
                fontWeight: "600",
                display: "block",
                marginBottom: "16px",
              }}
            >
              All Services
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 4vw, 52px)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)", // Uses core theme variables
                margin: "0 0 20px 0",
              }}
            >
              {services.heading}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "16px",
                color: "var(--text-secondary)", // Uses core theme variables
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {services.subheading}
            </p>
          </div>

          {/* DUAL-THEME PREMIUM TERMINAL */}
          <div 
            style={{ 
              flex: "1 1 450px", 
              maxWidth: "540px",
              width: "100%",
              // Uses var(--border-color) tinted alphas so it shifts nicely
              backgroundColor: "var(--bg-card-hover, rgba(15, 23, 42, 0.03))",
              border: "1px solid var(--border-color)",
              borderRadius: "12px",
              padding: "20px",
              backdropFilter: "blur(12px)",
              fontFamily: "monospace",
              fontSize: "13px",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              borderColor: hoveredIndex !== null ? "#3B82F6" : "var(--border-color)",
              boxShadow: hoveredIndex !== null ? "0 20px 40px -12px rgba(59, 130, 246, 0.12)" : "0 10px 30px -10px rgba(0, 0, 0, 0.08)"
            }}
          >
            {/* Terminal Top Window Deck */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px" }}>
              <div style={{ display: "flex", gap: "6px" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#EF4444", opacity: 0.8 }}></span>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#F59E0B", opacity: 0.8 }}></span>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#10B981", opacity: 0.8 }}></span>
              </div>
              <span style={{ color: "var(--text-secondary)", opacity: 0.5, fontSize: "11px", letterSpacing: "0.05em" }}>
                {hoveredIndex !== null ? `pillar_0${hoveredIndex + 1}.log` : "orchestrator.env"}
              </span>
            </div>
            
            {/* Real-time responsive console stream */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", minHeight: "110px", justifyContent: "center" }}>
              {getTerminalLogs().map((log, i) => {
                const isSuccess = log.includes("Success") || log.includes("100%") || log.includes("reduced");
                const isHeader = log.startsWith("> [");
                
                return (
                  <div 
                    key={i} 
                    style={{ 
                      // Uses clean semantic highlights, falling back to global dark/light secondary text variables
                      color: isSuccess ? "#10B981" : isHeader ? "#3B82F6" : "var(--text-secondary)",
                      fontWeight: isHeader ? "600" : "400",
                      opacity: isSuccess || isHeader ? 1 : 0.8,
                      transition: "all 0.2s ease"
                    }}
                  >
                    {log}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* MATRIX LAYOUT GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "48px",
            width: "100%",
          }}
        >
          {services.items.map((item, idx) => {
            const isHovered = hoveredIndex === idx;
            const anyHovered = hoveredIndex !== null;

            return (
              <div
                key={item.title}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  paddingTop: "24px",
                  transition: "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  opacity: anyHovered && !isHovered ? 0.35 : 1,
                  cursor: "default",
                }}
              >
                {/* Accent Top Border Indicator */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: isHovered ? "100%" : "24px",
                    height: "2px",
                    backgroundColor: isHovered ? "#3B82F6" : "var(--border-color)",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />

                {/* Index Identifier */}
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: isHovered ? "#3B82F6" : "var(--text-secondary)",
                    opacity: isHovered ? 1 : 0.6,
                    transition: "all 0.3s ease",
                    marginBottom: "20px",
                  }}
                >
                  0{idx + 1}
                </span>

                {/* Core Text Context */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "22px",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      margin: 0,
                      letterSpacing: "-0.01em",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {item.title}
                    <span
                      style={{
                        fontSize: "16px",
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? "translateX(0)" : "translateX(-8px)",
                        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                        color: "#3B82F6",
                      }}
                    >
                      →
                    </span>
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}