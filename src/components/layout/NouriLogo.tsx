import React from "react";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface NouriLogoProps {
  variant?: "light" | "dark";
  showSubtitle?: boolean;
  compact?: boolean;
  className?: string;
}

/**
 * Luxury Maison Monogram & Wordmark inspired by classic French heritage houses (Louis Vuitton style).
 * Features an interlocking high-contrast Roman Serif "N" & "A" (Nouri Archipelago) with parallel
 * diagonal stems, crisp bracketed flat serifs, and four-pointed concave diamond star florets.
 */
export function NouriMonogramIcon({
  className,
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("shrink-0 select-none", className)}
    >
      {/* Subtle Outer Heritage Frame */}
      <rect
        x="1.5"
        y="1.5"
        width="45"
        height="45"
        rx="9"
        className={cn(
          "transition-colors duration-300",
          variant === "light"
            ? "fill-canvas-dark stroke-brand-gold/45 group-hover:stroke-brand-gold"
            : "fill-text-inverse/[0.04] stroke-brand-gold/45 group-hover:stroke-brand-gold"
        )}
        strokeWidth="1"
      />

      {/* Inner Hairline Filigree Border */}
      <rect
        x="4"
        y="4"
        width="40"
        height="40"
        rx="6.5"
        className="stroke-brand-gold/20"
        strokeWidth="0.6"
      />

      {/* Top-Left & Bottom-Right 4-Pointed Monogram Floret Stars (LV Motif) */}
      <path
        d="M10.5 7.2C10.5 9.1 11.1 9.7 13 9.7C11.1 9.7 10.5 10.3 10.5 12.2C10.5 10.3 9.9 9.7 8 9.7C9.9 9.7 10.5 9.1 10.5 7.2Z"
        className="fill-brand-gold/85"
      />
      <path
        d="M37.5 35.8C37.5 37.7 38.1 38.3 40 38.3C38.1 38.3 37.5 38.9 37.5 40.8C37.5 38.9 36.9 38.3 35 38.3C36.9 38.3 37.5 37.7 37.5 35.8Z"
        className="fill-brand-gold/85"
      />

      {/* INTERLOCKING LETTER 'A' (Archipelago) — Shifted Upper-Right in Classic Monogram Style */}
      <g className="fill-brand-gold">
        {/* Top Apex Flat Serif of A */}
        <rect x="21.8" y="8.2" width="6.2" height="1.35" />
        {/* Left Hairline Diagonal Leg of A */}
        <path d="M24.2 8.8L25.6 8.8L13.2 33.8L11.7 33.8L24.2 8.8Z" />
        {/* Right High-Contrast Bold Diagonal Leg of A (Parallel to N diagonal) */}
        <path d="M23.8 8.8L27.2 8.8L39.6 33.8L36.1 33.8L23.8 8.8Z" />
        {/* Horizontal Crossbar of A */}
        <rect x="17.2" y="23.4" width="15.8" height="1.4" />
        {/* Bottom-Left Flat Serif of A */}
        <rect x="9.6" y="33.0" width="5.8" height="1.4" />
        {/* Bottom-Right Flat Serif of A */}
        <rect x="34.0" y="33.0" width="6.8" height="1.4" />
      </g>

      {/* INTERLOCKING LETTER 'N' (Nouri) — Foreground Classic Roman Serif */}
      <g className="fill-text-inverse">
        {/* Left Hairline Vertical Stem of N */}
        <rect x="10.2" y="14.0" width="1.55" height="24.2" />
        {/* Right Hairline Vertical Stem of N */}
        <rect x="27.8" y="14.0" width="1.55" height="24.2" />
        {/* Central High-Contrast Bold Diagonal Stem of N */}
        <path d="M10.2 14.0L14.1 14.0L29.35 38.2L25.6 38.2L10.2 14.0Z" />
        {/* Top-Left Flat Roman Serif of N */}
        <rect x="7.5" y="14.0" width="6.8" height="1.45" />
        {/* Bottom-Left Flat Roman Serif of N */}
        <rect x="7.5" y="36.8" width="6.2" height="1.45" />
        {/* Top-Right Flat Roman Serif of N */}
        <rect x="25.0" y="14.0" width="6.8" height="1.45" />
      </g>
    </svg>
  );
}

export function NouriLogo({
  variant = "light",
  showSubtitle = true,
  compact = false,
  className,
}: NouriLogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-3.5 group", className)}>
      <NouriMonogramIcon
        variant={variant}
        className={cn(
          "transition-transform duration-300 group-hover:scale-[1.03]",
          compact ? "h-9 w-9" : "h-10 w-10"
        )}
      />

      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "font-editorial text-xl sm:text-[22px] tracking-[0.26em] uppercase leading-none",
              variant === "light" ? "text-text-primary" : "text-text-inverse"
            )}
          >
            NOURI
          </span>
          {/* Subtle 4-point star separator */}
          <svg
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
            className="w-2.5 h-2.5 text-brand-gold shrink-0 -ml-0.5"
          >
            <path
              d="M6 0.5C6 4.2 7.8 6 11.5 6C7.8 6 6 7.8 6 11.5C6 7.8 4.2 6 0.5 6C4.2 6 6 4.2 6 0.5Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {showSubtitle && (
          <span
            className={cn(
              "font-traceability text-[9px] uppercase tracking-[0.24em] mt-1 leading-none",
              variant === "light"
                ? "text-text-secondary"
                : "text-brand-gold/80"
            )}
          >
            Maison d&apos;Archipel • {COMPANY.founded}
          </span>
        )}
      </div>
    </div>
  );
}
