"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn, formatNumber } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  durationMs?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  durationMs = 1800,
  className,
}: AnimatedCounterProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState<number>(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasAnimated) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();

          if (prefersReducedMotion) {
            setDisplayValue(value);
            return;
          }

          const startTime = performance.now();
          let rafId = 0;

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            // Expo ease-out curve: 1 - 2^(-10t)
            const eased =
              progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setDisplayValue(value * eased);

            if (progress < 1) {
              rafId = requestAnimationFrame(tick);
            } else {
              setDisplayValue(value);
            }
          };

          rafId = requestAnimationFrame(tick);
          return () => cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, durationMs, hasAnimated]);

  const formatted =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : formatNumber(Math.round(displayValue));

  return (
    <span
      ref={containerRef}
      className={cn("font-traceability tabular-nums", className)}
    >
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
