"use client";
import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/app/lib/gsap";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  tag?: string;
  delay?: number;
  stagger?: number;
  scrollTrigger?: boolean;
  triggerStart?: string;
}

export default function AnimatedText({
  text,
  className = "",
  style,
  tag: Tag = "span",
  delay = 0,
  stagger = 0.03,
  scrollTrigger = false,
  triggerStart = "top 80%",
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const words = text.split(" ");

  useGSAP(() => {
    if (!ref.current || reduced) return;
    const chars = ref.current.querySelectorAll(".char");

    const animProps = {
      opacity: 0,
      y: 40,
      rotateX: -45,
      stagger,
      delay,
      duration: 0.6,
      ease: "power3.out",
    };

    if (scrollTrigger) {
      gsap.from(chars, {
        ...animProps,
        scrollTrigger: {
          trigger: ref.current,
          start: triggerStart,
          toggleActions: "play none none none",
        },
      });
    } else {
      gsap.from(chars, animProps);
    }
  }, { scope: ref });

  return (
    
    <Tag ref={ref} className={`${className} overflow-hidden`} style={style} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.25em]" aria-hidden>
          {word.split("").map((char, ci) => (
            <span
              key={ci}
              className="char inline-block"
              style={{ transformOrigin: "bottom center", perspective: "600px" }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
