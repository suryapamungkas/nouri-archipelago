"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  MapPin,
  CheckCircle2,
  QrCode,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { TRACEABILITY_PIPELINE } from "@/lib/constants";
import { useAppInteraction } from "@/components/layout/SmoothScrollProvider";
import { cn } from "@/lib/utils";

const SAMPLE_BATCH_LOTS = [
  {
    lotCode: "LOT #NR-2026-0891",
    product: "VELVETA™ Barista Oat Milk 1L",
    originPlot: "Subang & Pangajaran Highland Plot #A-42 (07°11'S 107°36'E)",
    harvestDate: "2026-09-14",
    labAssay: "ISO-17025 Pass • Beta-Glucan 1.84% • Zero Pesticide",
    vessel: "Maersk Eindhoven • Reefer +4.0°C → Rotterdam",
  },
  {
    lotCode: "LOT #KK-2026-4410",
    product: "KAKAO KULTURA™ 72% Ransiki Couverture",
    originPlot: "Ransiki Agroforestry Co-op West Papua (01°30'S 134°10'E)",
    harvestDate: "2026-08-28",
    labAssay: "Flavanols 928mg/100g • Cadmium <0.12 ppm (EU Compliant)",
    vessel: "ONE Apus • Controlled Temp +16.0°C → Yokohama",
  },
  {
    lotCode: "LOT #VD-2026-9204",
    product: "VERDANTIA™ Java Turmeric & Yuzu Tonic",
    originPlot: "Merapi Volcanic Organic Cooperative (07°46'S 110°22'E)",
    harvestDate: "2026-10-02",
    labAssay: "HPP 6,000 Bar • Active Curcuminoids 86.4mg",
    vessel: "CMA CGM Palais Royal → Singapore & Dubai",
  },
];

export function TraceabilityTimeline() {
  const { locale } = useAppInteraction();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [scrollProgressPct, setScrollProgressPct] = useState(0);
  const [selectedBatch, setSelectedBatch] = useState(SAMPLE_BATCH_LOTS[0]!);
  const [isReducedMotionOrMobile, setIsReducedMotionOrMobile] = useState(false);

  useEffect(() => {
    const checkEnvironment = () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const mobile = window.innerWidth < 1024;
      setIsReducedMotionOrMobile(reduced || mobile);
    };

    checkEnvironment();
    window.addEventListener("resize", checkEnvironment);
    return () => window.removeEventListener("resize", checkEnvironment);
  }, []);

  useEffect(() => {
    if (isReducedMotionOrMobile) return;

    let ctx: { revert: () => void } | null = null;
    let isCancelled = false;

    async function initGsapHorizontalScroll() {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");

      if (isCancelled) return;

      const gsap = gsapModule.default || gsapModule.gsap;
      const ScrollTrigger =
        scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;

      gsap.registerPlugin(ScrollTrigger);

      const sectionEl = sectionRef.current;
      const trackEl = trackRef.current;
      const pathEl = svgPathRef.current;

      if (!sectionEl || !trackEl) return;

      if (pathEl) {
        const totalLength = pathEl.getTotalLength();
        pathEl.style.strokeDasharray = `${totalLength}`;
        pathEl.style.strokeDashoffset = `${totalLength}`;
      }

      ctx = gsap.context(() => {
        const getScrollAmount = () => {
          const trackWidth = trackEl.scrollWidth;
          const viewportWidth = window.innerWidth;
          return -(trackWidth - viewportWidth + 96);
        };

        gsap.to(trackEl, {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: sectionEl,
            start: "top top",
            end: () => `+=${Math.max(trackEl.scrollWidth - window.innerWidth + 300, 1400)}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              setScrollProgressPct(Math.round(p * 100));
              const stepIdx = Math.min(
                TRACEABILITY_PIPELINE.length - 1,
                Math.floor(p * TRACEABILITY_PIPELINE.length)
              );
              setActiveStepIndex(stepIdx);

              if (pathEl) {
                const len = pathEl.getTotalLength();
                pathEl.style.strokeDashoffset = `${len * (1 - p)}`;
              }
            },
          },
        });
      }, sectionEl);
    }

    initGsapHorizontalScroll();

    return () => {
      isCancelled = true;
      if (ctx) {
        ctx.revert();
      }
    };
  }, [isReducedMotionOrMobile]);

  return (
    <section
      id="traceability-pipeline"
      aria-label="Seed to Shelf Scrollytelling Traceability Pipeline"
      className="relative bg-canvas-dark text-text-inverse overflow-hidden"
    >
      {/* Pinned Scrollytelling Wrapper */}
      <div
        ref={sectionRef}
        className={cn(
          "relative w-full",
          !isReducedMotionOrMobile
            ? "min-h-screen flex flex-col justify-between py-12 lg:py-16"
            : "py-20"
        )}
      >
        {/* Top Header + SVG Progress Pipeline Indicator */}
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="inline-flex items-center font-traceability text-xs uppercase tracking-[0.2em] text-brand-gold">
                SEED-TO-SHELF BLOCKCHAIN & GPS TRACEABILITY
              </span>
              <h2 className="mt-2 font-editorial text-4xl sm:text-5xl lg:text-6xl text-text-inverse tracking-tight">
                {locale === "ID"
                  ? "Ketertelusuran Penuh dari Kebun ke Rak Dunia."
                  : "Four Stages. Unbroken Chain of Custody."}
              </h2>
            </div>

            {/* Step Pills + Scroll Progress Telemetry */}
            <div className="flex flex-wrap items-center gap-2">
              {TRACEABILITY_PIPELINE.map((stage, idx) => {
                const isActive = idx <= activeStepIndex;
                return (
                  <div
                    key={stage.step}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full font-traceability text-xs border transition-colors flex items-center gap-1.5",
                      isActive
                        ? "bg-brand-gold text-canvas-dark border-brand-gold font-semibold"
                        : "bg-text-inverse/5 text-text-inverse/60 border-text-inverse/12"
                    )}
                  >
                    <span>{stage.title}</span>
                  </div>
                );
              })}
              {!isReducedMotionOrMobile && (
                <span className="ml-2 font-traceability text-xs text-brand-gold">
                  {scrollProgressPct}%
                </span>
              )}
            </div>
          </div>

          {/* Continuous SVG Connecting Path (Drawn dynamically via ScrollTrigger) */}
          <div className="mt-6 relative h-6 w-full hidden lg:block">
            <svg
              viewBox="0 0 1200 24"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d="M 0 12 C 200 12, 250 4, 400 12 C 550 20, 650 4, 800 12 C 950 20, 1050 12, 1200 12"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                ref={svgPathRef}
                d="M 0 12 C 200 12, 250 4, 400 12 C 550 20, 650 4, 800 12 C 950 20, 1050 12, 1200 12"
                stroke="oklch(78.2% 0.12 85)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Horizontal Scrollytelling Cards Track (or Responsive Grid in Reduced-Motion / Mobile) */}
        <div className="mt-8 w-full overflow-hidden">
          <div
            ref={trackRef}
            className={cn(
              "px-4 sm:px-6 lg:px-10",
              !isReducedMotionOrMobile
                ? "flex items-stretch gap-7 w-max"
                : "mx-auto max-w-[1440px] grid grid-cols-1 md:grid-cols-2 gap-6"
            )}
          >
            {TRACEABILITY_PIPELINE.map((stage, idx) => (
              <article
                key={stage.step}
                className={cn(
                  "rounded-[2rem] border border-text-inverse/14 bg-text-inverse/[0.04] backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between transition-colors hover:border-brand-gold/50",
                  !isReducedMotionOrMobile
                    ? "w-[85vw] sm:w-[540px] lg:w-[600px] shrink-0"
                    : "w-full"
                )}
              >
                <div>
                  {/* Top Stage Number & Telemetry Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-text-inverse/10">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold text-canvas-dark font-editorial text-2xl font-bold">
                        {stage.step}
                      </span>
                      <div>
                        <span className="block font-traceability text-[10px] uppercase tracking-widest text-brand-gold">
                          {stage.phaseCode}
                        </span>
                        <span className="font-traceability text-xs text-text-inverse/70 inline-flex items-center gap-1">
                          <MapPin strokeWidth={1.5} className="w-3 h-3 text-brand-gold" />
                          {stage.location}
                        </span>
                      </div>
                    </div>
                    <span className="font-traceability text-[10px] px-2.5 py-1 rounded-full bg-brand-primary/80 text-text-inverse border border-text-inverse/15">
                      {stage.coordinates}
                    </span>
                  </div>

                  {/* Stage Image + Headline Split */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                    <div className="sm:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden bg-canvas-dark border border-text-inverse/10">
                      <Image
                        src={stage.image}
                        alt={stage.title}
                        fill
                        sizes="(max-width: 640px) 90vw, 240px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-canvas-dark/70 via-transparent to-transparent" />
                      <span className="absolute bottom-2 left-2.5 right-2.5 font-traceability text-[9px] text-brand-gold truncate">
                        {stage.telemetryBadge}
                      </span>
                    </div>

                    <div className="sm:col-span-7">
                      <h3 className="font-editorial text-3xl text-text-inverse tracking-tight">
                        {stage.title}
                      </h3>
                      <p className="mt-0.5 text-xs font-medium text-brand-gold">
                        {stage.subtitle}
                      </p>
                      <p className="mt-2.5 text-xs sm:text-sm text-text-inverse/75 leading-relaxed">
                        {stage.description}
                      </p>
                    </div>
                  </div>

                  {/* 3 Quantitative Metrics */}
                  <div className="mt-5 grid grid-cols-3 gap-2.5">
                    {stage.metrics.map((mItem) => (
                      <div
                        key={mItem.label}
                        className="rounded-2xl bg-canvas-dark/60 border border-text-inverse/10 p-3"
                      >
                        <span className="block font-traceability text-[9px] uppercase text-text-inverse/50">
                          {mItem.monoCode}
                        </span>
                        <span className="mt-0.5 block font-editorial text-xl sm:text-2xl text-brand-gold">
                          {mItem.value}
                        </span>
                        <span className="block text-[11px] text-text-inverse/75 truncate">
                          {mItem.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Verification Checkpoints */}
                <div className="mt-5 pt-4 border-t border-text-inverse/10 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    {stage.verifications.map((ver) => (
                      <span
                        key={ver}
                        className="inline-flex items-center gap-1 text-[11px] font-traceability text-text-inverse/80 bg-text-inverse/6 px-2.5 py-1 rounded-lg"
                      >
                        <CheckCircle2
                          strokeWidth={1.5}
                          className="w-3 h-3 text-brand-gold shrink-0"
                        />
                        {ver}
                      </span>
                    ))}
                  </div>
                  {idx < TRACEABILITY_PIPELINE.length - 1 && (
                    <ArrowRight
                      strokeWidth={1.5}
                      className="w-4 h-4 text-brand-gold hidden sm:block"
                    />
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom Interactive Live Batch Passport Inspector */}
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10 mt-8">
          <div className="rounded-2xl border border-text-inverse/15 bg-text-inverse/[0.04] p-4 sm:p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-brand-gold/15 text-brand-gold border border-brand-gold/30">
                <QrCode strokeWidth={1.5} className="w-5 h-5" />
              </div>
              <div>
                <span className="font-traceability text-[10px] uppercase tracking-widest text-brand-gold block">
                  Interactive GPS Batch Passport Lookup
                </span>
                <p className="text-xs text-text-inverse/80">
                  Select an active production lot to inspect live farm-to-port
                  chain of custody:
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {SAMPLE_BATCH_LOTS.map((lot) => {
                const isSelected = lot.lotCode === selectedBatch.lotCode;
                return (
                  <button
                    key={lot.lotCode}
                    type="button"
                    onClick={() => setSelectedBatch(lot)}
                    className={cn(
                      "px-3 py-1.5 rounded-xl font-traceability text-xs transition-all cursor-pointer border",
                      isSelected
                        ? "bg-brand-gold text-canvas-dark border-brand-gold font-semibold"
                        : "bg-canvas-dark/60 text-text-inverse/75 border-text-inverse/15 hover:text-text-inverse"
                    )}
                  >
                    {lot.lotCode}
                  </button>
                );
              })}
            </div>

            <div className="w-full lg:w-auto rounded-xl bg-canvas-dark/80 border border-text-inverse/12 px-4 py-2.5 text-xs font-traceability flex flex-wrap items-center gap-3">
              <ShieldCheck strokeWidth={1.5} className="w-4 h-4 text-brand-gold shrink-0" />
              <span className="text-brand-gold font-semibold">
                {selectedBatch.product}
              </span>
              <span className="text-text-inverse/50">|</span>
              <span className="text-text-inverse/85">{selectedBatch.originPlot}</span>
              <span className="text-text-inverse/50">|</span>
              <span className="text-text-inverse/75">{selectedBatch.vessel}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
