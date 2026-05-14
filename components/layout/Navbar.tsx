"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { nav } from "@/data/content";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "center",
          padding: scrolled ? "12px 24px" : "0",
          transition: "padding 0.4s ease",
          pointerEvents: "none",
        }}
      >
        <header
          style={{
            pointerEvents: "auto",
            width: "100%",
            maxWidth: scrolled ? "860px" : "1400px",
            height: "52px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            backgroundColor: scrolled
              ? "rgba(var(--bg-primary-rgb), 0.72)"
              : "transparent",
            backdropFilter: scrolled ? "blur(16px)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
            borderRadius: scrolled ? "999px" : "0",
            border: scrolled
              ? "1px solid var(--border-color)"
              : "1px solid transparent",
            boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.08)" : "none",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Logo */}
          <a
            href="#home"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Image
              src="/images/knotic-logo.png"
              alt="Knotic"
              width={110}
              height={28}
              className="logo-full"
              style={{ objectFit: "contain" }}
              priority
            />
            <Image
              src="/images/knotic-icon.png"
              alt="Knotic"
              width={28}
              height={28}
              className="logo-icon"
              style={{ objectFit: "contain" }}
              priority
            />
          </a>

          {/* Desktop: nav links + toggle */}
          <div
            className="nav-desktop"
            style={{ display: "flex", alignItems: "center", gap: "2px" }}
          >
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setActive(item.label)}
                style={{
                  padding: "4px 12px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.07em",
                  textDecoration: "none",
                  borderRadius: "999px",
                  backgroundColor:
                    active === item.label
                      ? "var(--nav-active-bg)"
                      : "transparent",
                  color:
                    active === item.label
                      ? "var(--nav-active-text)"
                      : "var(--text-muted)",
                  transition: "all 0.2s ease",
                }}
              >
                {item.label}
              </a>
            ))}
            <div style={{ marginLeft: "8px" }}>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile: hamburger only */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            style={{
              display: "none", // shown via CSS
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
              width: "32px",
              height: "32px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "4px",
            }}
          >
            {menuOpen ? (
              // X icon
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <line
                  x1="2"
                  y1="2"
                  x2="14"
                  y2="14"
                  stroke="var(--text-muted)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <line
                  x1="14"
                  y1="2"
                  x2="2"
                  y2="14"
                  stroke="var(--text-muted)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              // Hamburger icon
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <line
                  x1="2"
                  y1="4"
                  x2="14"
                  y2="4"
                  stroke="var(--text-muted)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <line
                  x1="2"
                  y1="8"
                  x2="14"
                  y2="8"
                  stroke="var(--text-muted)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <line
                  x1="2"
                  y1="12"
                  x2="14"
                  y2="12"
                  stroke="var(--text-muted)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </header>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "72px",
            left: "16px",
            right: "16px",
            zIndex: 49,
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            borderRadius: "16px",
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.16)",
          }}
        >
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => {
                setActive(item.label);
                setMenuOpen(false);
              }}
              style={{
                padding: "12px 16px",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                letterSpacing: "0.07em",
                textDecoration: "none",
                borderRadius: "10px",
                backgroundColor:
                  active === item.label
                    ? "var(--nav-active-bg)"
                    : "transparent",
                color:
                  active === item.label
                    ? "var(--nav-active-text)"
                    : "var(--text-muted)",
                transition: "all 0.2s ease",
              }}
            >
              {item.label}
            </a>
          ))}

          {/* Divider */}
          <div
            style={{
              height: "1px",
              backgroundColor: "var(--border-color)",
              margin: "4px 8px",
            }}
          />

          {/* Theme toggle row */}
          <div style={{ padding: "8px 16px" }}>
            <ThemeToggle />
          </div>
        </div>
      )}
    </>
  );
}
