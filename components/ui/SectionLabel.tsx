export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="section-label-tag">
      <span className="label-accent-bar" aria-hidden />
      {children}
    </span>
  );
}
