"use client";
import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/app/lib/gsap";
import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    
    gsap.to(ref.current, {
      y: 8,
      repeat: -1,
      yoyo: true,
      duration: 0.9,
      ease: "power1.inOut",
    });

    
    gsap.to(ref.current, {
      opacity: 0,
      pointerEvents: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "200px top",
        scrub: true,
      },
    });
  }, { scope: ref });

  return (
    <div
      ref={ref}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
    >
      <span className="text-xs tracking-widest uppercase opacity-50 font-light">Scroll</span>
      <ChevronDown className="w-5 h-5 opacity-60" strokeWidth={1.5} />
    </div>
  );
}
