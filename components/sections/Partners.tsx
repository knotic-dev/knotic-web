// import { partners } from "@/data/content";

// export default function Partners() {
//   return (
//     <section style={{
//       borderBottom: "1px solid var(--border-color)",
//       padding: "28px 32px",
//     }}>
//       <p style={{
//         fontFamily: "var(--font-mono)",
//         fontSize: "9px",
//         letterSpacing: "0.2em",
//         textTransform: "uppercase",
//         color: "var(--text-faint)",
//         textAlign: "center",
//         marginBottom: "20px",
//       }}>
//         Our Trusted Partners
//       </p>
//       <div style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         gap: "40px",
//         flexWrap: "wrap",
//       }}>
//         {partners.map((p) => (
//           <div key={p.name} style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "6px",
//             fontFamily: "var(--font-mono)",
//             fontSize: "13px",
//             color: "var(--text-muted)",
//             cursor: "default",
//           }}>
//             {p.icon && <span>{p.icon}</span>}
//             <span>{p.name}</span>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

import { partners } from "@/data/content";

const REPEATS = 6;

export default function Partners() {
  const items = Array.from({ length: REPEATS }, () => partners).flat();

  return (
    <section
      style={{
        borderBottom: "1px solid var(--border-color)",
        padding: "28px 0",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--text-faint)",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Our Trusted Partners
      </p>

      {/* Constrained window — only ~4 items visible */}
      <div
        style={{
          maxWidth: "600px",
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
            width: "80px",
            background: "linear-gradient(to right, var(--bg-primary) 0%, transparent 100%)",
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
            width: "80px",
            background: "linear-gradient(to left, var(--bg-primary) 0%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Scrolling track */}
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
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                color: "var(--text-muted)",
                padding: "0 32px",
                whiteSpace: "nowrap",
                cursor: "default",
              }}
            >
              {p.icon && <span>{p.icon}</span>}
              <span>{p.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-${100 / REPEATS}%); }
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}