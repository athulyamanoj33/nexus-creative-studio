"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import AnimatedText from "@/app/components/AnimatedText";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    title: "Lumina Fashion",
    category: "E-Commerce · UI/UX",
    year: "2024",
    color: "#6366f1",
    bg: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)",
    size: "large",
  },
  {
    title: "Orbit Finance",
    category: "FinTech · Dashboard",
    year: "2024",
    color: "#06b6d4",
    bg: "linear-gradient(135deg, #0c1a2e 0%, #0e3a5c 50%, #164e63 100%)",
    size: "small",
  },
  {
    title: "Verdant Studio",
    category: "Branding · Web",
    year: "2023",
    color: "#10b981",
    bg: "linear-gradient(135deg, #052e16 0%, #14532d 50%, #166534 100%)",
    size: "small",
  },
  {
    title: "Pulse Health",
    category: "Healthcare · App",
    year: "2024",
    color: "#ec4899",
    bg: "linear-gradient(135deg, #2d0a1f 0%, #701a75 50%, #86198f 100%)",
    size: "large",
  },
  {
    title: "Zephyr Labs",
    category: "SaaS · Platform",
    year: "2023",
    color: "#f59e0b",
    bg: "linear-gradient(135deg, #1c1408 0%, #451a03 50%, #78350f 100%)",
    size: "medium",
  },
  {
    title: "Nova Agency",
    category: "Marketing · Brand",
    year: "2024",
    color: "#6366f1",
    bg: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)",
    size: "medium",
  },
];

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const handleMouseEnter = () => {
    if (reduced || !overlayRef.current) return;
    gsap.to(overlayRef.current, { y: "0%", duration: 0.4, ease: "power3.out" });
  };

  const handleMouseLeave = () => {
    if (reduced || !overlayRef.current) return;
    gsap.to(overlayRef.current, { y: "100%", duration: 0.35, ease: "power3.in" });
  };

  const height = project.size === "large" ? "h-80" : project.size === "medium" ? "h-64" : "h-56";

  return (
    <div
      ref={cardRef}
      className={`portfolio-card relative ${height} rounded-2xl overflow-hidden cursor-none group`}
      data-cursor-hover
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ background: project.bg }}
    >
     
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
          <circle cx="350" cy="50" r="120" fill={project.color} fillOpacity="0.3" />
          <circle cx="50" cy="280" r="80" fill={project.color} fillOpacity="0.2" />
          <circle cx="200" cy="150" r="60" fill="white" fillOpacity="0.05" />
        </svg>
      </div>

     
      <div className="absolute top-5 left-5 right-5 flex justify-between items-start z-10">
        <span className="text-xs text-white/40 tracking-widest uppercase">{project.year}</span>
        <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" strokeWidth={1.5} />
      </div>

   
      <div className="absolute bottom-5 left-5 z-10">
        <h3 className="text-xl font-bold text-white">{project.title}</h3>
        <p className="text-xs text-white/40 mt-1">{project.category}</p>
      </div>

    
      <div
        ref={overlayRef}
        className="absolute inset-0 flex flex-col justify-center items-center gap-3 z-20"
        style={{
          background: `${project.color}dd`,
          backdropFilter: "blur(8px)",
          transform: "translateY(100%)",
        }}
      >
        <span className="text-white font-bold text-lg">{project.title}</span>
        <span className="text-white/70 text-sm">{project.category}</span>
        <div className="mt-2 px-5 py-2 rounded-full border border-white/30 text-white text-xs tracking-wide">
          View Project
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".portfolio-card", {
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-3">Selected Work</p>
          <AnimatedText
            text="Our Portfolio"
            tag="h2"
            className="text-5xl md:text-6xl font-bold text-white block"
            scrollTrigger
          />
        </div>
        <p className="text-white/40 max-w-xs text-sm leading-relaxed">
          A curated selection of projects that shaped industries and delighted users.
        </p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={i} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
