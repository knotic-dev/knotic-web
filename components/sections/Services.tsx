"use client";
import Image from "next/image";
import { services } from "@/data/content";
import Button from "@/components/ui/Button";

function ServiceImageCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      style={{
        borderRadius: "6px",
        overflow: "hidden",
        width: "100%",
        position: "relative",
        height: "200px",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: "cover" }}
        sizes="(max-width: 640px) 100vw, 50vw"
      />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────

function ServiceCard({
  title,
  description,
  image,
  borderRight = false,
  borderBottom = false,
}: {
  title: string;
  description: string;
  image: string;
  borderRight?: boolean;
  borderBottom?: boolean;
}) {
  return (
    <div
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        borderRight: borderRight ? "1px solid var(--border-color)" : "none",
        borderBottom: borderBottom ? "1px solid var(--border-color)" : "none",
        transition: "background-color 0.2s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = "var(--bg-card-hover)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "transparent")
      }
    >
      <ServiceImageCard src={image} alt={title} />
      <div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "18px",
            fontWeight: 400,
            color: "var(--text-primary)",
            marginBottom: "6px",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--text-muted)",
            lineHeight: 1.7,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="services-outer"
      style={{ borderBottom: "1px solid var(--border-color)" }}
    >
      {/* Top row */}
      <div
        className="services-top-row"
        //   style={{
        //     display: "grid",
        //     gridTemplateColumns: "1fr 1fr",
        //     borderBottom: "1px solid var(--border-color)",
        //   }}
      >
        {/* Left intro */}
        <div
          className="services-intro"
          style={{
            borderRight: "1px solid var(--border-color)",
            padding: "48px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
            }}
          >
            {services.heading}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--text-muted)",
              lineHeight: 1.8,
              maxWidth: "280px",
            }}
          >
            {services.subheading}
          </p>
          <div>
            <Button href="#contact">{services.cta}</Button>
          </div>
        </div>

        {/* Right: first service */}
        <ServiceCard
          title={services.items[0].title}
          description={services.items[0].description}
          image={services.items[0].image}
        />
      </div>

      {/* Bottom row */}
      <div className="services-bottom-row"
    //   style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
      >
        <ServiceCard
          title={services.items[1].title}
          description={services.items[1].description}
          image={services.items[1].image}
          borderRight
        />
        <ServiceCard
          title={services.items[2].title}
          description={services.items[2].description}
          image={services.items[2].image}
        />
      </div>
    </section>
  );
}
