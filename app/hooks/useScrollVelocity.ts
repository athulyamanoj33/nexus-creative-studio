"use client";
import { useState, useEffect, useRef } from "react";

export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const now = Date.now();
        const dt = now - lastTime.current;
        const dy = window.scrollY - lastScrollY.current;
        const v = Math.abs(dy / (dt || 1)) * 10;
        setVelocity(Math.min(v, 10));
        lastScrollY.current = window.scrollY;
        lastTime.current = now;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return velocity;
}
