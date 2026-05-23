"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/app/lib/gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35, ease: "power2.out" });
    };

    const addHover = () => ring?.classList.add("hovered");
    const removeHover = () => ring?.classList.remove("hovered");

    window.addEventListener("mousemove", moveCursor);

    const interactables = document.querySelectorAll("a, button, [data-cursor-hover]");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor cursor-dot" />
      <div ref={ringRef} className="custom-cursor cursor-ring" />
    </>
  );
}
