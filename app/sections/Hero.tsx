"use client";
import { useRef, useEffect } from "react";
import { gsap, useGSAP } from "@/app/lib/gsap";
import { useMousePosition } from "@/app/hooks/useMousePosition";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import AnimatedText from "@/app/components/AnimatedText";
import ScrollIndicator from "@/app/components/ScrollIndicator";
import MagneticButton from "@/app/components/MagneticButton";

const SHAPES = [
  { size: 300, x: "10%", y: "15%", color: "rgba(99,102,241,0.12)", delay: 0, speed: { x: 0.03, y: 0.02 } },
  { size: 200, x: "75%", y: "20%", color: "rgba(236,72,153,0.1)", delay: 0.2, speed: { x: -0.04, y: 0.03 } },
  { size: 150, x: "60%", y: "65%", color: "rgba(6,182,212,0.1)", delay: 0.4, speed: { x: 0.02, y: -0.04 } },
  { size: 100, x: "20%", y: "70%", color: "rgba(99,102,241,0.08)", delay: 0.6, speed: { x: -0.03, y: -0.02 } },
  { size: 80, x: "85%", y: "50%", color: "rgba(236,72,153,0.08)", delay: 0.8, speed: { x: 0.05, y: 0.01 } },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const shapesRef = useRef<HTMLDivElement[]>([]);
  const mouse = useMousePosition();
  const reduced = useReducedMotion();

 
  useEffect(() => {
    if (reduced) return;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const dx = mouse.x - centerX;
    const dy = mouse.y - centerY;

    shapesRef.current.forEach((el, i) => {
      if (!el) return;
      const s = SHAPES[i].speed;
      gsap.to(el, {
        x: dx * s.x,
        y: dy * s.y,
        duration: 1.2,
        ease: "power2.out",
      });
    });
  }, [mouse, reduced]);

  useGSAP(() => {
    if (!sectionRef.current || reduced) return;
    const ctx = gsap.context(() => {
      
      gsap.from(".float-shape", {
        scale: 0,
        opacity: 0,
        duration: 1.4,
        stagger: 0.15,
        ease: "elastic.out(1, 0.6)",
      });

      
      gsap.from(".hero-badge", {
        opacity: 0,
        y: -20,
        duration: 0.6,
        delay: 0.2,
      });

      
      gsap.from(".hero-cta", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.12,
        delay: 1.4,
        ease: "power3.out",
      });

      
      gsap.from(".hero-line", {
        scaleX: 0,
        duration: 1,
        delay: 1.2,
        ease: "power3.out",
        transformOrigin: "left center",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-mesh"
    >
      
      {SHAPES.map((shape, i) => (
        <div
          key={i}
          ref={(el) => { if (el) shapesRef.current[i] = el; }}
          className="float-shape absolute rounded-full blur-3xl pointer-events-none will-change-transform"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            background: shape.color,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(248,250,252,1) 1px, transparent 1px), linear-gradient(90deg, rgba(248,250,252,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

     
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-white/60 tracking-wide">Available for projects</span>
        </div>

        <AnimatedText
          text="We Build Digital"
          tag="h1"
          className="block text-[clamp(3rem,8vw,7rem)] font-bold leading-none tracking-tight text-white mb-2"
          delay={0.4}
          stagger={0.03}
        />
        <AnimatedText
          text="Experiences"
          tag="h1"
          className="block text-[clamp(3rem,8vw,7rem)] font-bold leading-none tracking-tight mb-6"
          style={{ background: "linear-gradient(135deg, #6366f1, #ec4899, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" } as React.CSSProperties}
          delay={0.7}
          stagger={0.035}
        />

        <div className="hero-line h-px w-24 mx-auto bg-white/20 my-6" />

        <p className="hero-cta text-[clamp(1rem,2vw,1.25rem)] text-white/50 max-w-xl mx-auto leading-relaxed mb-10">
          NEXUS is a creative studio crafting immersive digital experiences that captivate, convert, and endure.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            className="hero-cta px-8 py-4 rounded-full font-semibold text-white text-sm tracking-wide transition-all"
            style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" } as React.CSSProperties}
          >
            View Our Work
          </MagneticButton>
          <MagneticButton
            className="hero-cta px-8 py-4 rounded-full font-semibold text-white/80 text-sm tracking-wide border border-white/15 hover:border-white/30 transition-all backdrop-blur-sm"
          >
            Get In Touch
          </MagneticButton>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
