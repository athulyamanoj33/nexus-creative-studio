"use client";
import { useRef, ReactNode } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number; // 0.5 = slow, 1 = normal, 1.5 = fast
  className?: string;
}

export default function ParallaxLayer({
  children,
  speed = 0.5,
  className = "",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(() => {
    if (!ref.current || reduced) return;

    gsap.to(ref.current, {
      y: () => -(window.innerHeight * (speed - 1) * 0.5),
      ease: "none",
      scrollTrigger: {
        trigger: ref.current.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
