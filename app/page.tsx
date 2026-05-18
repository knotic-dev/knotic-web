import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Partners from "@/components/sections/Partners";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Services from "@/components/sections/Services";
import Features from "@/components/sections/Features";
import Events from "@/components/sections/Events";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <Navbar />
      <Hero />
      <Partners />
      <Events />
      <Services />
      <Features />
      <Process />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}