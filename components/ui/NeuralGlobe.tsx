"use client";

import { useCallback, useEffect, useRef } from "react";

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
  bgSecondary: Rgb;
  textFaint: Rgb;
  colors: Rgb[];
}

interface ClickPulse {
  x: number;
  y: number;
  startedAt: number;
  colorIndex: number;
}

const NODE_COUNT = 120;
const EDGE_DIST_RATIO = 0.42;
const SCATTER_DURATION = 1400;
const BRAND_COLORS: Rgb[] = [
  [59, 130, 246],
  [34, 211, 238],
  [139, 92, 246],
];

function fibSphere(n: number): { x: number; y: number; z: number }[] {
  const pts = [];
  const phi = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
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
      Number.parseInt(hex[1], 16),
      Number.parseInt(hex[2], 16),
      Number.parseInt(hex[3], 16),
    ];
  }

  const rgb = cleanValue.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (rgb) {
    return [
      Number.parseInt(rgb[1], 10),
      Number.parseInt(rgb[2], 10),
      Number.parseInt(rgb[3], 10),
    ];
  }

  return fallback;
}

export default function NeuralGlobe() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const edgesRef = useRef<Edge[]>([]);
  const mouseRef = useRef({ x: -999, y: -999 });
  const scatteredRef = useRef(false);
  const scatterTimeRef = useRef(0);
  const rafRef = useRef<number>(0);
  const hintRef = useRef<HTMLDivElement>(null);
  const clickPulseRef = useRef<ClickPulse | null>(null);
  const rGlobeRef = useRef(170);
  const themeRef = useRef<ThemePalette>({
    isDark: true,
    bg: [15, 23, 42],
    bgSecondary: [30, 41, 59],
    textFaint: [100, 116, 139],
    colors: BRAND_COLORS,
  });

  const readTheme = useCallback(() => {
    const root = document.documentElement;
    const styles = getComputedStyle(root);

    themeRef.current = {
      isDark: root.classList.contains("dark"),
      bg: cssColorToRgb(styles.getPropertyValue("--bg-primary"), [248, 250, 252]),
      bgSecondary: cssColorToRgb(styles.getPropertyValue("--bg-secondary"), [255, 255, 255]),
      textFaint: cssColorToRgb(styles.getPropertyValue("--text-faint"), [100, 116, 139]),
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
    const cx = W / 2;
    const cy = H / 2;
    const R_GLOBE = Math.min(W, H) * 0.4;
    const EDGE_DIST = R_GLOBE * EDGE_DIST_RATIO;

    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    rGlobeRef.current = R_GLOBE;

    const pts = fibSphere(NODE_COUNT);
    nodesRef.current = pts.map((p, index) => {
      const sx = cx + p.x * R_GLOBE;
      const sy = cy + p.y * R_GLOBE;

      return {
        ox: sx,
        oy: sy,
        x: sx,
        y: sy,
        vx: 0,
        vy: 0,
        z: p.z,
        r: 1.2 + Math.random() * 0.8,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.025,
        scattered: false,
        sx: 0,
        sy: 0,
        colorIndex: index % themeRef.current.colors.length,
      };
    });
    edgesRef.current = buildEdges(nodesRef.current, EDGE_DIST);
  }, [buildEdges]);

  const scatter = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || scatteredRef.current) return;

    const rect = canvas.getBoundingClientRect();
    clickPulseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      startedAt: performance.now(),
      colorIndex: Math.floor(Math.random() * 2) + 1,
    };
    scatteredRef.current = true;
    scatterTimeRef.current = performance.now();

    if (hintRef.current) hintRef.current.style.opacity = "0";

    nodesRef.current.forEach((n) => {
      const angle =
        Math.atan2(n.oy - canvas.clientHeight / 2, n.ox - canvas.clientWidth / 2) +
        (Math.random() - 0.5) * 1.2;
      const speed = 5 + Math.random() * 10;

      n.vx = Math.cos(angle) * speed;
      n.vy = Math.sin(angle) * speed;
      n.scattered = true;
      n.sx = n.x;
      n.sy = n.y;
    });

    window.setTimeout(() => {
      scatteredRef.current = false;
      if (hintRef.current) hintRef.current.style.opacity = "1";
    }, SCATTER_DURATION + 600);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !wrap || !ctx) return;

    readTheme();
    initScene();

    const observer = new MutationObserver(() => {
      readTheme();
    });
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
      const accentBlend = mixColor(colors[1], colors[2], 0.45);
      const isScattered = scatteredRef.current;
      const elapsed = isScattered ? ts - scatterTimeRef.current : SCATTER_DURATION + 1;
      const tRaw = Math.min(elapsed / SCATTER_DURATION, 1);
      const returnT = easeInOut(tRaw);
      const nodes = nodesRef.current;
      const edges = edgesRef.current;
      const mouse = mouseRef.current;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const background = ctx.createRadialGradient(
        W * 0.5,
        H * 0.46,
        0,
        W * 0.5,
        H * 0.5,
        Math.max(W, H) * 0.68,
      );
      if (theme.isDark) {
        background.addColorStop(0, rgba(mixColor(theme.bg, accentBlend, 0.2), 1));
        background.addColorStop(0.6, rgba(theme.bg, 0.94));
        background.addColorStop(1, rgba([4, 10, 24], 1));
      } else {
        background.addColorStop(0, rgba(mixColor([255, 255, 255], colors[1], 0.36), 1));
        background.addColorStop(0.5, rgba(mixColor(theme.bg, colors[0], 0.08), 1));
        background.addColorStop(1, rgba([246, 250, 255], 1));
      }
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, W, H);

      if (!theme.isDark) {
        const globeGlow = ctx.createRadialGradient(
          W * 0.5,
          H * 0.49,
          0,
          W * 0.5,
          H * 0.5,
          rGlobeRef.current * 1.12,
        );
        globeGlow.addColorStop(0, rgba(mixColor(colors[0], colors[1], 0.55), 0.2));
        globeGlow.addColorStop(0.58, rgba(colors[1], 0.09));
        globeGlow.addColorStop(1, rgba(colors[0], 0));
        ctx.fillStyle = globeGlow;
        ctx.beginPath();
        ctx.arc(W * 0.5, H * 0.5, rGlobeRef.current * 1.12, 0, Math.PI * 2);
        ctx.fill();
      }

      nodes.forEach((n) => {
        n.pulse += n.pulseSpeed;

        if (n.scattered && tRaw < 1) {
          const t2 = easeOut(tRaw);
          n.x = n.sx + n.vx * 28 * t2 * (1 - tRaw * 0.8);
          n.y = n.sy + n.vy * 28 * t2 * (1 - tRaw * 0.8);
        } else {
          n.scattered = false;
          n.x += (n.ox - n.x) * (0.045 + returnT * 0.015);
          n.y += (n.oy - n.y) * (0.045 + returnT * 0.015);
        }
      });

      edges.forEach(([i, j]) => {
        const a = nodes[i];
        const b = nodes[j];
        const midX = (a.x + b.x) / 2;
        const midY = (a.y + b.y) / 2;
        const distM = Math.sqrt((midX - mouse.x) ** 2 + (midY - mouse.y) ** 2);
        const glow = Math.max(0, 1 - distM / 150);
        const zAvg = (a.z + b.z) / 2;
        const depthAlpha = theme.isDark
          ? 0.035 + Math.max(0, zAvg) * 0.2
          : 0.18 + Math.max(0, zAvg) * 0.24;
        const alpha = Math.min(theme.isDark ? 0.9 : 0.88, depthAlpha + glow * 0.56);
        const color = mixColor(
          colors[a.colorIndex],
          colors[b.colorIndex],
          0.5 + 0.5 * Math.sin(ts * 0.0008 + i),
        );

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = rgba(color, alpha);
        ctx.lineWidth = (theme.isDark ? 0.3 : 0.42) + glow * 0.86;
        ctx.stroke();
      });

      nodes.forEach((n) => {
        const dNodeM = Math.sqrt((n.x - mouse.x) ** 2 + (n.y - mouse.y) ** 2);
        const proximity = Math.max(0, 1 - dNodeM / 100);
        const pulse = 0.5 + 0.5 * Math.sin(n.pulse);
        const depthScale = 0.5 + (n.z + 1) * 0.28;
        const depthAlpha = theme.isDark
          ? 0.22 + Math.max(0, n.z) * 0.5
          : 0.58 + Math.max(0, n.z) * 0.34;
        const radius = n.r * depthScale * (0.9 + pulse * 0.12 + proximity * 0.35);
        const alpha = Math.min(1, depthAlpha + proximity * 0.44);
        const color = colors[n.colorIndex];
        const lit = mixColor(color, theme.isDark ? [255, 255, 255] : [15, 23, 42], proximity * 0.12);

        if (!theme.isDark) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = rgba(color, 0.035 + proximity * 0.08);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = rgba(lit, alpha);
        ctx.fill();

        if (proximity > 0.35) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, radius + 1.7, 0, Math.PI * 2);
          ctx.strokeStyle = rgba(color, proximity * (theme.isDark ? 0.55 : 0.42));
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      });

      const clickPulse = clickPulseRef.current;
      if (clickPulse) {
        const progress = Math.min((ts - clickPulse.startedAt) / 720, 1);
        const pulseColor = colors[clickPulse.colorIndex] ?? colors[1];
        const radius = 18 + easeOut(progress) * rGlobeRef.current * 0.52;
        const alpha = (1 - progress) * (theme.isDark ? 0.48 : 0.5);

        ctx.beginPath();
        ctx.arc(clickPulse.x, clickPulse.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(pulseColor, alpha);
        ctx.lineWidth = 1.4;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(clickPulse.x, clickPulse.y, Math.max(4, radius * 0.12), 0, Math.PI * 2);
        ctx.fillStyle = rgba(pulseColor, alpha * 0.32);
        ctx.fill();

        if (progress >= 1) clickPulseRef.current = null;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    const handleResize = () => {
      initScene();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -999, y: -999 };
    };

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
    <div
      ref={wrapRef}
      onClick={scatter}
      className="neural-globe"
      aria-label="Interactive neural mesh globe. Click to scatter nodes."
      role="img"
    >
      <canvas ref={canvasRef} className="neural-globe-canvas" />
      <div ref={hintRef} className="neural-globe-hint">
        CLICK TO SCATTER
      </div>
    </div>
  );
}
