import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Knotic — Hack. Build. Scale.",
  description:
    "Knotic helps organizations accelerate innovation through AI systems, hackathons, developer programs, and ecosystem-driven execution.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}