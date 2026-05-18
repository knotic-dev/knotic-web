"use client";
import { useState } from "react";
import { faq } from "@/data/content";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="pricing"
      style={{ borderBottom: "1px solid var(--border-color)" }}
    >
      <div
        className="faq-grid"
        //   style={{
        //     display: "grid",
        //     gridTemplateColumns: "1fr 1fr",
        //     minHeight: "360px",
        //   }}
      >
        {/* Left */}
        <div
          className="faq-left"
          style={{
            borderRight: "1px solid var(--border-color)",
            padding: "48px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          <SectionLabel>FAQ</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
              color: "var(--text-primary)",
              whiteSpace: "pre-line",
            }}
          >
            {faq.heading}
          </h2>
          <div>
            <Button href="#contact">{faq.cta}</Button>
          </div>
        </div>

        {/* Right: accordion */}
        <div>
          {faq.items.map((item, i) => (
            <div
              key={item.id}
              style={{
                borderTop: "1px solid var(--border-color)",
                borderBottom:
                  i === faq.items.length - 1
                    ? "1px solid var(--border-color)"
                    : "none",
              }}
            >
              <button
                onClick={() => setOpen(open === item.id ? null : item.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 32px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  gap: "16px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    color: "var(--text-primary)",
                    lineHeight: 1.5,
                  }}
                >
                  {item.question}
                </span>
                <span
                  style={{
                    color: "var(--slate)",
                    fontSize: "18px",
                    lineHeight: 1,
                    flexShrink: 0,
                    transform:
                      open === item.id ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                    display: "inline-block",
                  }}
                >
                  +
                </span>
              </button>
              {open === item.id && (
                <div style={{ padding: "0 32px 18px" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                      lineHeight: 1.8,
                    }}
                  >
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
