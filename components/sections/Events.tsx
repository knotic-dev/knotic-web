"use client";

import { useState, useEffect } from "react";

export default function Events() {
  const upcomingEvents = [
    {
      title: "AIVerse Delhi",
      date: "6th June",
      link: "https://www.commudle.com/communities/knotic/events/aiverse",
      stats: "AI-focused conference",
      image: "/images/events/upcoming/AIVerse.png",
    },
    {
      title: "Build With TRAE",
      date: "13th June",
      link: "https://luma.com/6kh62ixm",
      stats: "Building with AI",
      image: "/images/events/upcoming/trae.png", 
    },
  ];

  const pastEvents = [
    {
      title: "Hiring Hackathon with Turgon AI",
      date: "21st–22nd February 2026",
      images: ["/images/events/1.jpg", "/images/events/2.png", "/images/events/3.jpeg", "/images/events/4.jpeg"],
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
      images: ["/images/events/fest1.png", "/images/events/fest2.png", "/images/events/fest3.png"],
      metrics: [
        { label: "Registrations", value: "3000+" },
        { label: "Countries", value: "3+" },
        { label: "Mentors", value: "12" },
        { label: "Judges", value: "6" }
      ]
    },
  ];

  const [hoveredIdx, setHoveredIdx] = useState<string | null>(null);
  
  const [activeImgIndexes, setActiveImgIndexes] = useState<{ [key: number]: number }>({
    0: 0,
    1: 0,
  });

  // Automatically cycle through images unless the user is hovering over that specific card
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImgIndexes((prev) => {
        const updated = { ...prev };
        pastEvents.forEach((event, idx) => {
          // Pause auto-rotation for the card that is actively hovered
          if (hoveredIdx !== `past-${idx}`) {
            const currentIdx = prev[idx] || 0;
            updated[idx] = (currentIdx + 1) % event.images.length;
          }
        });
        return updated;
      });
    }, 3000); // 3-second cycle interval length

    return () => clearInterval(timer);
  }, [hoveredIdx, pastEvents]);

  const handlePrevImage = (e: React.MouseEvent, rowIdx: number, totalImages: number) => {
    e.stopPropagation();
    setActiveImgIndexes((prev) => ({
      ...prev,
      [rowIdx]: (prev[rowIdx] - 1 + totalImages) % totalImages,
    }));
  };

  const handleNextImage = (e: React.MouseEvent, rowIdx: number, totalImages: number) => {
    e.stopPropagation();
    setActiveImgIndexes((prev) => ({
      ...prev,
      [rowIdx]: (prev[rowIdx] + 1) % totalImages,
    }));
  };

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
          border-color: var(--text-secondary, rgba(0,0,0,0.15)) !important;
          background-color: var(--bg-secondary, rgba(255, 255, 255, 0.01)) !important;
        }
        .metric-block-value {
          transition: color 0.2s ease, text-shadow 0.2s ease;
        }
        .metric-block:hover .metric-block-value {
          color: #A855F7 !important;
          text-shadow: 0 0 15px rgba(168, 85, 247, 0.6);
        }
        .gallery-nav-btn {
          opacity: 0;
          transition: opacity 0.25s ease, background-color 0.2s ease;
        }
        .past-interactive-row:hover .gallery-nav-btn {
          opacity: 1;
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
                    padding: "24px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "24px",
                    transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease",
                    transform: isHovered ? "translateY(-4px)" : "translateY(0px)",
                  }}
                >
                  <div>
                    {/* Event Banner Container */}
                    <div style={{ 
                      width: "100%", 
                      paddingBottom: "52%", 
                      position: "relative", 
                      borderRadius: "8px", 
                      overflow: "hidden", 
                      marginBottom: "20px",
                      backgroundColor: "rgba(0,0,0,0.2)",
                      border: "1px solid var(--border-color)"
                    }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        style={{ 
                          position: "absolute", 
                          inset: 0, 
                          width: "100%", 
                          height: "100%", 
                          objectFit: "cover" 
                        }} 
                      />
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
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

        {/* ── PAST EVENTS ARCHIVE ── */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)", margin: 0 }}>
              Past Events - Archive
            </h3>
            <span style={{ flexGrow: 1, height: "1px", background: "linear-gradient(90deg, var(--border-color), transparent)" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {pastEvents.map((event, idx) => {
              const key = `past-${idx}`;
              const isHovered = hoveredIdx === key;
              const currentImgIdx = activeImgIndexes[idx] || 0;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredIdx(key)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="past-interactive-row past-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.2fr 1.8fr",
                    gap: "40px",
                    padding: "32px",
                    borderRadius: "16px",
                    border: "1px solid var(--border-color)",
                    backgroundColor: "transparent",
                    opacity: hoveredIdx && !isHovered ? 0.5 : 1,
                    transition: "all 0.25s ease",
                  }}
                >
                  {/* Left Column: Media Presentation and Meta Core Info */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    
                    {/* Landscape Interactive Image Slider Component */}
                    <div 
                      className="past-event-gallery-window"
                      style={{
                        position: "relative",
                        width: "100%",
                        paddingBottom: "56.25%", 
                        borderRadius: "10px",
                        overflow: "hidden",
                        backgroundColor: "rgba(0,0,0,0.2)",
                        border: "1px solid var(--border-color)",
                      }}
                    >
                      {/* Smooth Hardware-Accelerated Sliding Track Container */}
                      <div 
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          transform: `translateX(-${currentImgIdx * 100}%)`,
                          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                      >
                        {event.images.map((imgSrc, imgIdx) => (
                          <div 
                            key={imgIdx} 
                            style={{ 
                              minWidth: "100%", 
                              height: "100%", 
                              position: "relative" 
                            }}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                              src={imgSrc} 
                              alt={`${event.title} scene ${imgIdx + 1}`}
                              style={{ 
                                width: "100%", 
                                height: "100%", 
                                objectFit: "cover",
                                display: "block"
                              }} 
                            />
                          </div>
                        ))}
                      </div>

                      {/* Left Navigation Carousel Trigger */}
                      <button
                        onClick={(e) => handlePrevImage(e, idx, event.images.length)}
                        className="gallery-nav-btn"
                        style={{
                          position: "absolute",
                          left: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          backgroundColor: "rgba(15, 23, 42, 0.75)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          color: "#ffffff",
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 5,
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        ‹
                      </button>

                      {/* Right Navigation Carousel Trigger */}
                      <button
                        onClick={(e) => handleNextImage(e, idx, event.images.length)}
                        className="gallery-nav-btn"
                        style={{
                          position: "absolute",
                          right: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          backgroundColor: "rgba(15, 23, 42, 0.75)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          color: "#ffffff",
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 5,
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        ›
                      </button>

                      {/* Inline Indicator Dots Matrix bar */}
                      <div 
                        style={{
                          position: "absolute",
                          bottom: "12px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          display: "flex",
                          gap: "6px",
                          zIndex: 5
                        }}
                      >
                        {event.images.map((_, dotIdx) => (
                          <button 
                            key={dotIdx}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveImgIndexes((prev) => ({ ...prev, [idx]: dotIdx }));
                            }}
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              border: "none",
                              padding: 0,
                              cursor: "pointer",
                              backgroundColor: currentImgIdx === dotIdx ? "#A855F7" : "rgba(255, 255, 255, 0.4)",
                              transition: "all 0.2s ease"
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Meta Headings Stack */}
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase" }}>
                          {event.date}
                        </span>
                        <span style={{ fontSize: "10px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)", backgroundColor: "var(--bg-secondary, rgba(255,255,255,0.03))", border: "1px solid var(--border-color)", padding: "2px 8px", borderRadius: "4px" }}>
                          Completed
                        </span>
                      </div>
                      <h4 style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-primary)", margin: 0, letterSpacing: "-0.01em" }}>
                        {event.title}
                      </h4>
                    </div>
                  </div>

                  {/* Right Column: Performance Analytics Matrix Panels */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridTemplateRows: "repeat(2, 1fr)", gap: "16px", height: "100%" }}>
                    {event.metrics.map((metric, mIdx) => (
                      <div
                        key={mIdx}
                        className="metric-block"
                        style={{
                          padding: "24px",
                          borderRadius: "12px",
                          backgroundColor: "var(--bg-secondary, rgba(255,255,255,0.01))",
                          border: "1px solid var(--border-color)",
                          textAlign: "center",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "default",
                          transition: "border-color 0.2s ease"
                        }}
                      >
                        <span 
                          className="metric-block-value"
                          style={{ 
                            fontFamily: "var(--font-display, sans-serif)", 
                            fontSize: "32px", 
                            fontWeight: 700, 
                            color: "var(--text-primary)", 
                            marginBottom: "4px" 
                          }}
                        >
                          {metric.value}
                        </span>
                        <span style={{ fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "600" }}>
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

      {/* Media Query Engine Viewport Remapping Rules */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 968px) {
          .past-row {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
            padding: 24px !important;
          }
          .past-row > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .gallery-nav-btn {
            opacity: 1 !important;
          }
        }
        @media (max-width: 640px) {
          .upcoming-highlight-card {
            padding: 24px !important;
          }
          .past-row > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </section>
  );
}