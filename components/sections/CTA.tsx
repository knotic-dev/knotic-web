"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { cta } from "@/data/content";
import Button from "@/components/ui/Button";

// Interfaces for complex point-mass tracking inside the canvas sphere matrix
interface Node {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  z: number;
  r: number;
  pulse: number;
  pulseSpeed: number;
  scattered: boolean;
  sx: number;
  sy: number;
  colorIndex: number;
}

type Edge = [number, number, number];
type Rgb = [number, number, number];

interface ThemePalette {
  isDark: boolean;
  bg: Rgb;
  colors: Rgb[];
}

interface ClickPulse {
  x: number;
  y: number;
  startedAt: number;
  colorIndex: number;
}

// Fixed-seed config mimicking your reference architecture blueprint
const NODE_COUNT = 90;
const EDGE_DIST_RATIO = 0.45;
const SCATTER_DURATION = 1400;
const BRAND_COLORS: Rgb[] = [
  [59, 130, 246],  // Accent Blue
  [34, 211, 238],  // Accent Cyan
  [139, 92, 246], // Accent Purple
];

// Architectural utilities for mathematical modeling & conversions
function fibSphere(n: number): { x: number; y: number; z: number }[] {
  const pts = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    // Modify range boundaries to construct a clean, bottom-weighted semi-globe dome
    const y = 0.1 - (i / (n - 1)) * 1.1; 
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    pts.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
  }
  return pts;
}

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function rgba([r, g, b]: Rgb, alpha: number): string {
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function mixColor(a: Rgb, b: Rgb, t: number): Rgb {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

function cssColorToRgb(value: string, fallback: Rgb): Rgb {
  const cleanValue = value.trim();
  const hex = cleanValue.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (hex) {
    return [
      parseInt(hex[1], 16),
      parseInt(hex[2], 16),
      parseInt(hex[3], 16),
    ];
  }
  const rgb = cleanValue.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (rgb) {
    return [
      parseInt(rgb[1], 10),
      parseInt(rgb[2], 10),
      parseInt(rgb[3], 10),
    ];
  }
  return fallback;
}

export default function CTA() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const edgesRef = useRef<Edge[]>([]);
  const mouseRef = useRef({ x: -999, y: -999 });
  const scatteredRef = useRef(false);
  const scatterTimeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const clickPulseRef = useRef<ClickPulse | null>(null);
  const rGlobeRef = useRef(280);

  const themeRef = useRef<ThemePalette>({
    isDark: true,
    bg: [6, 11, 19],
    colors: BRAND_COLORS,
  });

  // Track state only for UI feedback on the trigger CTA link
  const [scatterActive, setScatterActive] = useState(false);

  // Computes system theme properties natively using modern computed style matrices
  const readTheme = useCallback(() => {
    const root = document.documentElement;
    const styles = getComputedStyle(root);
    const isDarkTheme = root.classList.contains("dark") || !root.classList.contains("light");

    themeRef.current = {
      isDark: isDarkTheme,
      bg: isDarkTheme ? [6, 11, 19] : [248, 250, 252], // Clean light fallback backdrop
      colors: [
        cssColorToRgb(styles.getPropertyValue("--accent"), BRAND_COLORS[0]),
        cssColorToRgb(styles.getPropertyValue("--accent-cyan"), BRAND_COLORS[1]),
        cssColorToRgb(styles.getPropertyValue("--accent-purple"), BRAND_COLORS[2]),
      ],
    };
  }, []);

  const buildEdges = useCallback((nodes: Node[], edgeDist: number) => {
    const edges: Edge[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].ox - nodes[j].ox;
        const dy = nodes[i].oy - nodes[j].oy;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < edgeDist) edges.push([i, j, d]);
      }
    }
    return edges;
  }, []);

  const initScene = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = wrap.offsetWidth;
    const H = wrap.offsetHeight;
    
    // Shift the center calculation down to safely map vector points along a lower arc
    const cx = W / 2;
    const cy = H * 0.95; 
    const R_GLOBE = Math.min(W, H) * 0.75;
    const EDGE_DIST = R_GLOBE * EDGE_DIST_RATIO;

    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    rGlobeRef.current = R_GLOBE;

    const pts = fibSphere(NODE_COUNT);
    nodesRef.current = pts.map((p, index) => {
      const sx = cx + p.x * R_GLOBE;
      const sy = cy + p.y * R_GLOBE * 0.65; // Flatten along y axis slightly for deeper perspective

      return {
        ox: sx,
        oy: sy,
        x: sx,
        y: sy,
        vx: 0,
        vy: 0,
        z: p.z,
        r: 1.0 + Math.random() * 1.2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.02,
        scattered: false,
        sx: 0,
        sy: 0,
        colorIndex: index % themeRef.current.colors.length,
      };
    });
    edgesRef.current = buildEdges(nodesRef.current, EDGE_DIST);
  }, [buildEdges]);

  // Click handler running vectors physics modifications instantly
  const handleScatterTrigger = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || scatteredRef.current) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    clickPulseRef.current = {
      x: clickX,
      y: clickY,
      startedAt: performance.now(),
      colorIndex: Math.floor(Math.random() * 2) + 1,
    };

    scatteredRef.current = true;
    scatterTimeRef.current = performance.now();
    setScatterActive(true);

    nodesRef.current.forEach((n) => {
      const angle = Math.atan2(n.oy - clickY, n.ox - clickX) + (Math.random() - 0.5) * 1.0;
      const speed = 6 + Math.random() * 12;
      n.vx = Math.cos(angle) * speed;
      n.vy = Math.sin(angle) * speed;
      n.scattered = true;
      n.sx = n.x;
      n.sy = n.y;
    });

    window.setTimeout(() => {
      scatteredRef.current = false;
      setScatterActive(false);
    }, SCATTER_DURATION + 600);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !wrap || !ctx) return;

    readTheme();
    initScene();

    const observer = new MutationObserver(() => readTheme());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    const loop = (ts: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;
      const theme = themeRef.current;
      
      const colors = theme.isDark 
        ? theme.colors 
        : [theme.colors[0], theme.colors[1], mixColor(theme.colors[0], theme.colors[1], 0.5)];
      
      const isScattered = scatteredRef.current;
      const elapsed = isScattered ? ts - scatterTimeRef.current : SCATTER_DURATION + 1;
      const tRaw = Math.min(elapsed / SCATTER_DURATION, 1);
      const returnT = easeInOut(tRaw);
      const nodes = nodesRef.current;
      const edges = edgesRef.current;
      const mouse = mouseRef.current;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // Render theme-aware backdrop fill
      ctx.fillStyle = theme.isDark ? "#060b13" : rgba(theme.bg, 1);
      ctx.fillRect(0, 0, W, H);

      // Procedural nodes matrix simulation updates
      nodes.forEach((n) => {
        n.pulse += n.pulseSpeed;
        if (n.scattered && tRaw < 1) {
          const t2 = easeOut(tRaw);
          n.x = n.sx + n.vx * 24 * t2 * (1 - tRaw * 0.8);
          n.y = n.sy + n.vy * 24 * t2 * (1 - tRaw * 0.8);
        } else {
          n.scattered = false;
          n.x += (n.ox - n.x) * (0.04 + returnT * 0.02);
          n.y += (n.oy - n.y) * (0.04 + returnT * 0.02);
        }
      });

      // Pass 1: Render structural linkage vectors
      edges.forEach(([i, j]) => {
        const a = nodes[i];
        const b = nodes[j];
        const midX = (a.x + b.x) / 2;
        const midY = (a.y + b.y) / 2;
        const distM = Math.sqrt((midX - mouse.x) ** 2 + (midY - mouse.y) ** 2);
        const glow = Math.max(0, 1 - distM / 160);
        const zAvg = (a.z + b.z) / 2;
        
        const depthAlpha = theme.isDark
          ? 0.02 + Math.max(0, zAvg) * 0.15
          : 0.12 + Math.max(0, zAvg) * 0.18;
          
        const alpha = Math.min(theme.isDark ? 0.65 : 0.6, depthAlpha + glow * 0.45);
        const color = mixColor(colors[a.colorIndex], colors[b.colorIndex], 0.5 + 0.5 * Math.sin(ts * 0.001 + i));

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = rgba(color, alpha);
        ctx.lineWidth = (theme.isDark ? 0.4 : 0.5) + glow * 0.6;
        ctx.stroke();
      });

      // Pass 2: Core Render Node Point Matrix
      nodes.forEach((n) => {
        const dNodeM = Math.sqrt((n.x - mouse.x) ** 2 + (n.y - mouse.y) ** 2);
        const proximity = Math.max(0, 1 - dNodeM / 120);
        const pulse = 0.5 + 0.5 * Math.sin(n.pulse);
        const depthScale = 0.6 + (n.z + 1) * 0.25;
        const depthAlpha = theme.isDark
          ? 0.15 + Math.max(0, n.z) * 0.55
          : 0.45 + Math.max(0, n.z) * 0.35;
          
        const radius = n.r * depthScale * (0.95 + pulse * 0.1 + proximity * 0.4);
        const alpha = Math.min(1, depthAlpha + proximity * 0.5);
        const color = colors[n.colorIndex];
        const lit = mixColor(color, theme.isDark ? [255, 255, 255] : [15, 23, 42], proximity * 0.2);

        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = rgba(lit, alpha);
        ctx.fill();

        if (proximity > 0.4) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, radius + 2.2, 0, Math.PI * 2);
          ctx.strokeStyle = rgba(color, proximity * (theme.isDark ? 0.6 : 0.45));
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      // Dynamic Shockwave pulse render tracking
      const clickPulse = clickPulseRef.current;
      if (clickPulse) {
        const progress = Math.min((ts - clickPulse.startedAt) / 750, 1);
        const pulseColor = colors[clickPulse.colorIndex] ?? colors[1];
        const radius = 10 + easeOut(progress) * rGlobeRef.current * 0.65;
        const alpha = (1 - progress) * (theme.isDark ? 0.5 : 0.45);

        ctx.beginPath();
        ctx.arc(clickPulse.x, clickPulse.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(pulseColor, alpha);
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (progress >= 1) clickPulseRef.current = null;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    const handleResize = () => initScene();
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => { mouseRef.current = { x: -999, y: -999 }; };

    window.addEventListener("resize", handleResize);
    wrap.addEventListener("mousemove", handleMouseMove);
    wrap.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      wrap.removeEventListener("mousemove", handleMouseMove);
      wrap.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initScene, readTheme]);

  return (
    <section
      id="cta"
      ref={wrapRef}
      onClick={handleScatterTrigger}
      style={{
        position: "relative",
        minHeight: "560px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "100px 32px 60px",
        overflow: "hidden",
        borderBottom: "1px solid var(--border-color, rgba(255,255,255,0.1))",
        cursor: "pointer",
      }}
    >
      {/* ── Dynamic High-Performance HTML5 Canvas Backdrop Layer ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <canvas ref={canvasRef} style={{ display: "block" }} />
      </div>

      {/* Atmospheric Theme-aware Gradient Masking Layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 90%, transparent 25%, var(--bg-primary, #060b13) 80%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* ── Content Layout Panel (Exactly preserved typography positioning) ── */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          pointerEvents: "auto", 
        }}
        onClick={(e) => e.stopPropagation()} // Prevents clicks on textual items from throwing random vectors layout triggers
      >
        <h2
          style={{
            fontFamily: "var(--font-display, inherit)",
            fontSize: "clamp(36px, 5.5vw, 60px)",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.025em",
            color: "var(--text-primary, #ffffff)",
            whiteSpace: "pre-line",
            maxWidth: "800px",
            textShadow: "0 2px 30px rgba(0,240,255,0.1)",
          }}
        >
          {cta.heading}
        </h2>
        
        <p
          style={{
            fontFamily: "var(--font-sans, inherit)",
            fontSize: "14px",
            color: "var(--text-secondary, rgba(248,250,252,0.75))",
            maxWidth: "420px",
            lineHeight: 1.8,
            margin: "0 0 8px 0"
          }}
        >
          {cta.subheading}
        </p>

        <div style={{ transform: "scale(1.05)", transition: "transform 0.2s" }}>
          <Button href="#contact">{cta.buttonLabel}</Button>
        </div>

        {/* Dynamic Visual Trigger Text Hint matching reference panel design */}
        <div 
          style={{
            marginTop: "12px",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.15em",
            color: "var(--text-faint, rgba(255,255,255,0.35))",
            transition: "opacity 0.4s ease",
            opacity: scatterActive ? 0 : 0.7,
            textTransform: "uppercase"
          }}
        >
          Click background to scatter
        </div>
      </div>
    </section>
  );
}