"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { partners } from "@/data/content";
import type { CSSProperties } from "react";

const REPEATS = 6;

type PartnerItem = {
  type: "partner";
  name: string;
  logo?: string;
  wide?: boolean;
};

type MarqueeItem = PartnerItem;

const partnerSet: MarqueeItem[] = [
  ...partners.map<PartnerItem>((partner) => ({
    type: "partner",
    ...partner,
  })),
];

export default function Partners() {
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent SSR/client mismatch
  const blendMode: CSSProperties["mixBlendMode"] =
    mounted && resolvedTheme === "dark"
      ? "screen"
      : "multiply";

  const items = Array.from({ length: REPEATS }, () => partnerSet).flat();

  return (
    <section
      style={{
        borderBottom: "1px solid var(--border-color)",
        padding: "28px 0",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "11px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--text-faint)",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Our Trusted Partners
      </p>

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Left fade */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "44px",
            background:
              "linear-gradient(to right, var(--bg-primary) 0%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Right fade */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "44px",
            background:
              "linear-gradient(to left, var(--bg-primary) 0%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <div
          className="marquee-track"
          style={{
            display: "flex",
            alignItems: "center",
            width: "max-content",
            animation: "marquee 18s linear infinite",
          }}
        >
          {items.map((p, i) => (
            <div
              key={i}
              style={{
                padding: "0 32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "200px",
                height: "60px",
                flexShrink: 0,
              }}
            >
              {p.logo ? (
                <div
                  className={
                    p.wide
                      ? "partner-logo-wrap partner-logo-wrap--wide"
                      : "partner-logo-wrap"
                  }
                >
                  <Image
                    src={p.logo}
                    alt={p.name}
                    fill
                    sizes={p.wide ? "180px" : "140px"}
                    style={{
                      objectFit: "contain",
                      objectPosition: "center",
                      filter: "grayscale(100%)",
                      opacity: 0.75,
                      mixBlendMode: blendMode,
                      transition:
                        "opacity 0.2s ease, filter 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "1";
                      e.currentTarget.style.filter = "grayscale(0%)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "0.75";
                      e.currentTarget.style.filter =
                        "grayscale(100%)";
                    }}
                  />
                </div>
              ) : (
                <span
                  style={{
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    fontWeight: 700,
                    letterSpacing: "0.01em",
                    opacity: 0.72,
                    whiteSpace: "nowrap",
                  }}
                >
                  {p.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-${100 / REPEATS}%); }
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        .partner-logo-wrap {
          position: relative;
          width: 140px;
          height: 28px;
        }

        .partner-logo-wrap--wide {
          width: 180px;
        }
      `}</style>
    </section>
  );
}