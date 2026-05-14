import Image from "next/image";
import { site, nav } from "@/data/content";

export default function Footer() {
  return (
    <footer
      id="contact"
      style={{
        borderTop: "1px solid var(--border-color)",
        backgroundColor: "var(--bg-primary)",
      }}
    >
      {/* Top: logo + nav */}
      <div
        className="footer-top"
        //   style={{
        //     display: "flex",
        //     alignItems: "center",
        //     justifyContent: "space-between",
        //     padding: "20px 32px",
        //     borderBottom: "1px solid var(--border-color)",
        //     maxWidth: "1400px",
        //     margin: "0 auto",
        //   }}
      >
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
            style={{ objectFit: "contain" }}
          />
        </a>
        <div
          className="footer-nav"
          style={{ display: "flex", alignItems: "center", gap: "24px" }}
        >
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--text-muted)",
                textDecoration: "none",
                letterSpacing: "0.07em",
                transition: "color 0.2s ease",
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* Middle: contact */}
      <div
        className="footer-middle"
        style={{
          padding: "40px 32px",
          borderBottom: "1px solid var(--border-color)",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <a
          href={`mailto:${site.email}`}
          style={{
            display: "block",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(24px, 3vw, 40px)",
            color: "var(--text-primary)",
            textDecoration: "none",
            marginBottom: "16px",
            transition: "opacity 0.2s ease",
          }}
        >
          {site.email}
        </a>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--text-muted)",
            marginBottom: "4px",
          }}
        >
          {site.phone}
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--text-muted)",
            lineHeight: 1.8,
          }}
        >
          {site.address.street}
          <br />
          {site.address.city}
          <br />
          {site.address.country}
        </p>
      </div>

      {/* Bottom: copyright + socials */}
      <div
        className="footer-bottom"
        // style={{
        //   display: "flex",
        //   alignItems: "center",
        //   justifyContent: "space-between",
        //   padding: "14px 32px",
        //   maxWidth: "1400px",
        //   margin: "0 auto",
        // }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: "var(--text-faint)",
            letterSpacing: "0.05em",
          }}
        >
          All rights reserved.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {["Terms & Conditions", "Privacy Policy"].map((t) => (
              <a
                key={t}
                href="#"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  color: "var(--text-faint)",
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                }}
              >
                {t}
              </a>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {[
              { href: site.social.twitter, label: "𝕏" },
              { href: site.social.instagram, label: "◎" },
              { href: site.social.linkedin, label: "in" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
