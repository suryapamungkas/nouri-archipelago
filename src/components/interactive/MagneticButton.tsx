"use client";

import React, { useRef } from "react";
import { m, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
  variant?: "primary" | "accent" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export function MagneticButton({
  children,
  className,
  strength = 0.24,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  disabled,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 220, damping: 18, mass: 0.4 });

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    rawX.set((e.clientX - centerX) * strength);
    rawY.set((e.clientY - centerY) * strength);
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const variantClasses: Record<NonNullable<MagneticButtonProps["variant"]>, string> = {
    primary:
      "bg-brand-primary text-text-inverse hover:bg-brand-primary/92 shadow-sm border border-brand-primary/20",
    accent:
      "bg-brand-accent text-text-inverse hover:bg-brand-accent/92 shadow-sm border border-brand-accent/20",
    outline:
      "bg-surface-card/70 text-text-primary border border-text-primary/15 hover:border-brand-primary hover:bg-surface-card",
    ghost:
      "bg-transparent text-text-primary hover:bg-text-primary/6 border border-transparent",
    dark:
      "bg-canvas-dark text-text-inverse hover:bg-canvas-dark/90 border border-text-inverse/15",
  };

  const sizeClasses: Record<NonNullable<MagneticButtonProps["size"]>, string> = {
    sm: "px-4 py-2 text-xs font-medium tracking-wide rounded-full",
    md: "px-5 py-2.5 text-sm font-medium tracking-tight rounded-full",
    lg: "px-7 py-3.5 text-sm md:text-base font-medium tracking-tight rounded-full",
  };

  return (
    <m.button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      whileTap={{ scale: 0.97 }}
      style={{ x, y }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 cursor-pointer select-none transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:opacity-50 disabled:pointer-events-none",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </m.button>
  );
}
