"use client";
import { useRef, useEffect } from "react";
import { gsap, useGSAP } from "@/app/lib/gsap";
import { useScrollVelocity } from "@/app/hooks/useScrollVelocity";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import AnimatedText from "@/app/components/AnimatedText";

const TESTIMONIALS = [
  {
    quote: "NEXUS transformed our digital presence completely. The animations are buttery smooth and our conversion rate jumped 40%.",
    author: "Sarah Chen",
    role: "CEO, Lumina",
    avatar: "SC",
    color: "#6366f1",
  },
  {
    quote: "Working with NEXUS was unlike any agency experience we've had. They care deeply about craft and it shows.",
    author: "Marcus Weber",
    role: "CPO, Orbit Finance",
    avatar: "MW",
    color: "#ec4899",
  },
  {
    quote: "The attention to micro-interactions alone was worth every penny. Our users keep commenting on how the site feels alive.",
    author: "Priya Nair",
    role: "Head of Design, Pulse Health",
    avatar: "PN",
    color: "#06b6d4",
  },
  {
    quote: "Delivered on time, on budget, and frankly beyond what we imagined. NEXUS is our permanent agency partner.",
    author: "James Liu",
    role: "Founder, Zephyr Labs",
    avatar: "JL",
    color: "#10b981",
  },
  {
    quote: "The team just gets it — they blend engineering precision with genuine creative vision. Rare combination.",
    author: "Amara Osei",
    role: "Marketing Director, Verdant",
    avatar: "AO",
    color: "#f59e0b",
  },
];

function MarqueeTrack({ direction = 1, speed = 1 }: { direction?: number; speed?: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const velocity = useScrollVelocity();
  const reduced = useReducedMotion();
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (!trackRef.current || reduced) return;

    const el = trackRef.current;
    const baseSpeed = 50 * speed; 

    tweenRef.current = gsap.to(el, {
      x: direction > 0 ? "-50%" : "0%",
      duration: baseSpeed,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => `${parseFloat(x) % 50}%`,
      },
    });

    if (direction < 0) {
      gsap.set(el, { x: "-50%" });
      tweenRef.current = gsap.to(el, {
        x: "0%",
        duration: baseSpeed,
        ease: "none",
        repeat: -1,
      });
    }

    return () => {
      tweenRef.current?.kill();
    };
  }, [direction, speed, reduced]);

  
  useEffect(() => {
    if (!tweenRef.current || reduced) return;
    const boost = 1 + velocity * 0.15;
    tweenRef.current.timeScale(boost);
  }, [velocity, reduced]);

  const items = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => { pausedRef.current = true; tweenRef.current?.pause(); }}
      onMouseLeave={() => { pausedRef.current = false; tweenRef.current?.play(); }}
    >
      <div ref={trackRef} className="flex gap-6 will-change-transform" style={{ width: "max-content" }}>
        {items.map((t, i) => (
          <div
            key={i}
            className="w-80 flex-shrink-0 rounded-2xl p-6 border border-white/5 bg-white/[0.02] backdrop-blur-sm"
            data-cursor-hover
          >
            <div className="flex mb-4">
              {[...Array(5)].map((_, s) => (
                <svg key={s} className="w-4 h-4" viewBox="0 0 24 24" fill={t.color}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>

            <p className="text-white/70 text-sm leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>

            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: `${t.color}44`, border: `1px solid ${t.color}66` }}
              >
                {t.avatar}
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{t.author}</p>
                <p className="text-white/40 text-xs">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".testimonials-header", {
        opacity: 0,
        y: 40,
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
    <section ref={sectionRef} className="py-32 overflow-hidden" style={{ background: "#080d1a" }}>
      <div className="testimonials-header text-center px-6 mb-16">
        <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-3">What people say</p>
        <AnimatedText
          text="Client Love"
          tag="h2"
          className="text-5xl md:text-6xl font-bold text-white block"
          scrollTrigger
        />
      </div>

      <div className="space-y-6">
        <MarqueeTrack direction={1} speed={0.8} />
        <MarqueeTrack direction={-1} speed={1.1} />
      </div>
    </section>
  );
}
