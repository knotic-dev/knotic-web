"use client";

import { useState } from "react";
import { faq } from "@/data/content";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      style={{
        borderBottom: "1px solid var(--border-color)",
        padding: "80px 24px",
        backgroundColor: "var(--bg-primary, transparent)",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "clamp(250px, 30vw, 360px) 1fr",
          gap: "48px",
          alignItems: "start",
        }}
        className="faq-minimal-grid"
      >
        {/* Modern, Low-Profile Sticky Header Panel */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            position: "sticky",
            top: "40px",
          }}
        >
          <div style={{ width: "fit-content" }}>
            <SectionLabel>FAQ</SectionLabel>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display, sans-serif)",
              fontSize: "clamp(24px, 2.5vw, 32px)",
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              margin: 0,
            }}
          >
            {faq.heading}
          </h2>
          <div style={{ marginTop: "8px" }}>
          </div>
        </div>

        {/* Ultra-Slim Accordion Stream */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {faq.items.map((item, i) => {
            const isOpen = open === item.id;
            
            return (
              <div
                key={item.id}
                style={{
                  borderBottom: "1px solid var(--border-color, rgba(255,255,255,0.08))",
                  transition: "background-color 0.2s ease",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : item.id)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    padding: "20px 0", // Stripped horizontal padding for a sleek, edge-to-edge finish
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: "24px",
                  }}
                >
                  {/* Subtle Premium Serial Number */}
                  <span
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "11px",
                      color: isOpen ? "var(--accent, #00f0ff)" : "var(--text-faint, #64748b)",
                      transition: "color 0.2s ease",
                      minWidth: "24px",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Clean Question Text */}
                  <span
                    style={{
                      fontFamily: "var(--font-sans, sans-serif)",
                      fontSize: "15px",
                      fontWeight: isOpen ? 500 : 400,
                      color: isOpen ? "var(--text-primary)" : "var(--text-secondary)",
                      lineHeight: 1.4,
                      flexGrow: 1,
                      transition: "color 0.2s ease",
                    }}
                  >
                    {item.question}
                  </span>

                  {/* Ultra-minimal Micro Indicator */}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      flexShrink: 0,
                    }}
                  >
                    <path
                      d="M1 3.5L5 7.5L9 3.5"
                      stroke={isOpen ? "var(--accent, #00f0ff)" : "var(--text-faint, #64748b)"}
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* CSS Transition Wrapper for Smooth Height Alteration */}
                <div
                  style={{
                    maxHeight: isOpen ? "200px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div
                    style={{
                      padding: "0 0 24px 48px", // Indented nicely right under the question string
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-sans, sans-serif)",
                        fontSize: "14px",
                        color: "var(--text-secondary, #94a3b8)",
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Global CSS Inject to safely handle responsive viewport wrapping without adding a heavy CSS module */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .faq-minimal-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .faq-minimal-grid > div:first-child {
            position: relative !important;
            top: 0 !important;
          }
        }
      `}} />
    </section>
  );
}