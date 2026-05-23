"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "@/app/lib/gsap";

const CustomCursor = dynamic(() => import("@/app/components/CustomCursor"), { ssr: false });
const Hero = dynamic(() => import("@/app/sections/Hero"), { ssr: false });
const Services = dynamic(() => import("@/app/sections/Services"), { ssr: false });
const Portfolio = dynamic(() => import("@/app/sections/Portfolio"), { ssr: false });
const Testimonials = dynamic(() => import("@/app/sections/Testimonials"), { ssr: false });
const Contact = dynamic(() => import("@/app/sections/Contact"), { ssr: false });
const Footer = dynamic(() => import("@/app/sections/Footer"), { ssr: false });

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete,
        });
      },
    });

    tl.to(progressRef.current, { width: "100%", duration: 1.8, ease: "power2.inOut" });
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "#0f172a" }}
    >
      <div className="relative flex flex-col items-center gap-8">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" }}
          >
            <span className="text-white font-black text-xl">N</span>
          </div>
          <span className="text-white font-bold text-2xl tracking-tight">NEXUS</span>
        </div>
        <div className="w-48 h-px bg-white/10 relative overflow-hidden rounded-full">
          <div
            ref={progressRef}
            className="absolute inset-y-0 left-0 w-0 rounded-full"
            style={{ background: "linear-gradient(90deg, #6366f1, #ec4899)" }}
          />
        </div>
        <span ref={countRef} className="text-white/30 text-xs tracking-widest uppercase">Loading</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <CustomCursor />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
