"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function AnimatedCounter({ value, duration = 1200 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animDuration = prefersReduced ? 0 : duration;
    let startTime: number | null = null;
    let frameId: number;

    const tick = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress =
        animDuration === 0 ? 1 : Math.min((timestamp - startTime) / animDuration, 1);
      setDisplay(Math.round(value * easeOutCubic(progress)));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [started, value, duration]);

  return <span ref={ref}>{display.toLocaleString()}</span>;
}
