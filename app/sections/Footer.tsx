"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { GitFork, Share2, Heart, Link, ArrowUpRight } from "lucide-react";

const SOCIALS = [
  { icon: Share2, label: "Twitter", href: "#" },
  { icon: GitFork, label: "GitHub", href: "#" },
  { icon: Heart, label: "Instagram", href: "#" },
  { icon: Link, label: "LinkedIn", href: "#" },
];

const NAV = ["Work", "Services", "About", "Blog", "Contact"];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(() => {
    if (!footerRef.current || reduced) return;

    const ctx = gsap.context(() => {
      
      gsap.from(footerRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "top top",
          scrub: 1,
        },
      });

      gsap.from(".footer-content > *", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, { scope: footerRef });

  return (
    <footer
      ref={footerRef}
      className="relative py-20 px-6 overflow-hidden will-change-transform"
      style={{ background: "#050810" }}
    >
     
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none overflow-hidden">
        <span
          className="text-[clamp(5rem,15vw,12rem)] font-black tracking-tight whitespace-nowrap opacity-[0.04] text-white"
          style={{ lineHeight: 1 }}
        >
          NEXUS
        </span>
      </div>

      <div className="footer-content max-w-6xl mx-auto relative z-10">
        
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 pb-16 border-b border-white/5">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" }}>
                <span className="text-white text-xs font-black">N</span>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">NEXUS</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              A creative studio building the digital experiences of tomorrow — today.
            </p>
          </div>

          <div className="flex flex-wrap gap-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-white/20 mb-4">Navigation</p>
              <ul className="space-y-2">
                {NAV.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1 group"
                    >
                      {item}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-white/20 mb-4">Social</p>
              <div className="flex flex-col gap-2">
                {SOCIALS.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors group"
                  >
                    <Icon
                      className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300"
                      strokeWidth={1.5}
                    />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

       
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} NEXUS Creative Studio. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a key={item} href="#" className="text-xs text-white/20 hover:text-white/40 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
