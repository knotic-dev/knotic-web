import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
}

export default function Button({ children, href, onClick, variant = "primary" }: ButtonProps) {
  const style: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 14px",
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    letterSpacing: "0.08em",
    cursor: "pointer",
    textDecoration: "none",
    whiteSpace: "nowrap",
    border: `1px solid ${variant === "primary" ? "var(--btn-border)" : "var(--border-color)"}`,
    backgroundColor: variant === "primary" ? "var(--btn-bg)" : "transparent",
    color: variant === "primary" ? "var(--btn-text)" : "var(--text-primary)",
    transition: "opacity 0.2s ease",
  };

  const Arrow = () => (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "18px",
      height: "18px",
      border: "1px solid currentColor",
      fontSize: "10px",
      lineHeight: 1,
    }}>⊕</span>
  );

  if (href) {
    return (
      <a href={href} style={style}>
        {children}
        <Arrow />
      </a>
    );
  }

  return (
    <button onClick={onClick} style={style}>
      {children}
      <Arrow />
    </button>
  );
}