export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily: "var(--font-mono)",
      fontSize: "10px",
      fontWeight: 400,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    }}>
      <span style={{ color: "var(--text-muted)" }}>|</span>
      {children}
    </span>
  );
}