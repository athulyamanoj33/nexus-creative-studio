"use client";
import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import ParallaxLayer from "@/app/components/ParallaxLayer";
import { Layers, Zap, Globe, Palette, Code2, BarChart3 } from "lucide-react";

const SERVICES = [
  {
    icon: Layers,
    title: "Brand Identity",
    desc: "We craft distinctive visual languages that make your brand impossible to ignore — logos, systems, guidelines.",
    color: "#6366f1",
    tag: "Strategy",
  },
  {
    icon: Code2,
    title: "Web Development",
    desc: "Pixel-perfect, performant, and accessible. We engineer experiences that load fast and feel alive.",
    color: "#ec4899",
    tag: "Engineering",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Interface design rooted in human psychology. Every click, scroll, and hover is intentional.",
    color: "#06b6d4",
    tag: "Design",
  },
  {
    icon: Globe,
    title: "Digital Strategy",
    desc: "Data-driven roadmaps that align creative output with measurable business goals.",
    color: "#6366f1",
    tag: "Consulting",
  },
  {
    icon: Zap,
    title: "Motion & Animation",
    desc: "GSAP, Framer, WebGL — we speak the language of movement to create unforgettable interactions.",
    color: "#ec4899",
    tag: "Animation",
  },
  {
    icon: BarChart3,
    title: "Growth & Analytics",
    desc: "We don't just build — we measure, iterate, and optimize for maximum impact.",
    color: "#06b6d4",
    tag: "Growth",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || reduced) return;

    const ctx = gsap.context(() => {
      
      const cards = cardsRef.current;
      if (!cards) return;

      const totalWidth = cards.scrollWidth - window.innerWidth + 80;

      gsap.to(cards, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

     
      gsap.from(".service-card", {
        opacity: 0,
        y: 60,
        scale: 0.9,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0a0f1e]"
      style={{ height: "100vh" }}
    >
     
      <ParallaxLayer speed={0.3} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />
      </ParallaxLayer>
      <ParallaxLayer speed={0.6} className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full blur-3xl opacity-10"
          style={{ background: "radial-gradient(circle, #ec4899, transparent)" }} />
      </ParallaxLayer>
      <ParallaxLayer speed={1.0} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full blur-3xl opacity-5"
          style={{ background: "radial-gradient(circle, #06b6d4, transparent)", transform: "translate(-50%,-50%)" }} />
      </ParallaxLayer>

      
      <div className="absolute top-16 left-[clamp(2rem,5vw,5rem)] z-10">
        <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-2">What we do</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white">Our Services</h2>
      </div>

     
      <div className="absolute top-16 right-[clamp(2rem,5vw,5rem)] z-10 flex items-center gap-2 text-white/30 text-sm">
        <span>Drag to explore</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>

      
      <div
        ref={cardsRef}
        className="absolute top-1/2 -translate-y-1/2 flex gap-6 pl-[clamp(2rem,10vw,10rem)] pr-20 will-change-transform"
        style={{ paddingTop: "4rem" }}
      >
        {SERVICES.map((svc, i) => {
          const Icon = svc.icon;
          return (
            <div
              key={i}
              className="service-card flex-shrink-0 w-80 rounded-2xl p-8 border border-white/5 bg-white/[0.03] backdrop-blur-sm
                hover:border-white/15 transition-all duration-500 group relative overflow-hidden"
              data-cursor-hover
            >
             
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(circle at 50% 0%, ${svc.color}22, transparent 60%)` }}
              />

              <div className="relative z-10">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: `${svc.color}22`, border: `1px solid ${svc.color}40` }}
                >
                  <Icon className="w-5 h-5" style={{ color: svc.color }} strokeWidth={1.5} />
                </div>

                <span className="text-xs tracking-widest uppercase text-white/30 mb-3 block">
                  {svc.tag}
                </span>

                <h3 className="text-xl font-bold text-white mb-3">{svc.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{svc.desc}</p>

                <div className="mt-6 flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all"
                  style={{ color: svc.color }}>
                  <span>Learn more</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
