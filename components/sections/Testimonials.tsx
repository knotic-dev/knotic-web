"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { testimonials } from "@/data/content";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const total = testimonials.length;
  const t = testimonials[active];

  // Automate moving to the next testimonial infinitely every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 5000);

    return () => clearInterval(interval);
  }, [total]);

  return (
    <section
      style={{
        borderBottom: "1px solid var(--border-color)",
        padding: "72px 32px",
        textAlign: "center",
        overflow: "hidden" // Keeps incoming glide states neat and isolated
      }}
    >
      {/* Sleek, Premium CSS Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes elegantReveal {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-quote { animation: elegantReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-profile { animation: elegantReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards; }
      `}} />

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}>
        <SectionLabel>Testimonials</SectionLabel>
      </div>

      {/* Force remount using a combined text key to rerun the clean transitions */}
      <div key={`text-block-${active}`} style={{ display: "flex", flexDirection: "column", minHeight: "180px", justifyContent: "center" }}>
        <blockquote
          className="animate-quote"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(24px, 3.5vw, 35px)",
            fontWeight: 700,
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
            color: "var(--text-primary)",
            maxWidth: "780px",
            margin: "0 auto 32px",
            opacity: 0
          }}
        >
          &ldquo;{t.quote}&rdquo;
        </blockquote>

        <div className="animate-profile" style={{ opacity: 0 }}>
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
        </div>
      </div>

      {/* Avatar row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px", // Slightly relaxed for the scale change breathing room
        }}
      >
        {testimonials.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setActive(i)} // Keeps click navigation active if people want to skip manually
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
              opacity: i === active ? 1 : 0.4, // Softly dims inactive targets for strong focus
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
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