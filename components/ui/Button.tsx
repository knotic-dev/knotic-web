"use client";
import React, { useState } from "react";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
}

export default function Button({ children, href, onClick, variant = "primary" }: ButtonProps) {
  const [hovered, setHovered] = useState(false);

  const isPrimary = variant === "primary";

  const style: React.CSSProperties = isPrimary
    ? {
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 20px",
        fontFamily: "var(--font-sans)",
        fontSize: "14px",
        fontWeight: 500,
        letterSpacing: "0.01em",
        cursor: "pointer",
        textDecoration: "none",
        whiteSpace: "nowrap",
        border: "none",
        borderRadius: "10px",
        backgroundColor: hovered ? "var(--btn-bg-hover)" : "var(--btn-bg)",
        color: "var(--btn-text)",
        boxShadow: hovered ? "0 6px 20px rgba(59, 130, 246, 0.4)" : "var(--btn-shadow)",
        transform: hovered ? "translateY(-1px)" : "none",
        transition: "all 0.25s ease",
      }
    : {
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 20px",
        fontFamily: "var(--font-sans)",
        fontSize: "14px",
        fontWeight: 500,
        letterSpacing: "0.01em",
        cursor: "pointer",
        textDecoration: "none",
        whiteSpace: "nowrap",
        borderRadius: "10px",
        border: "1px solid var(--btn-ghost-border)",
        backgroundColor: "var(--btn-ghost-bg)",
        color: "var(--btn-ghost-text)",
        boxShadow: hovered ? "var(--btn-ghost-glow)" : "none",
        transform: hovered ? "translateY(-1px)" : "none",
        transition: "all 0.25s ease",
      };

  const Arrow = () => (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "18px",
        height: "18px",
        borderRadius: "50%",
        backgroundColor: isPrimary ? "rgba(255,255,255,0.2)" : "rgba(34,211,238,0.15)",
        fontSize: "11px",
        lineHeight: 1,
      }}
    >
      →
    </span>
  );

  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  if (href) {
    return (
      <a href={href} style={style} {...handlers}>
        {children}
        <Arrow />
      </a>
    );
  }

  return (
    <button onClick={onClick} style={style} {...handlers}>
      {children}
      <Arrow />
    </button>
  );
}
