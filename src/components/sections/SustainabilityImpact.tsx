"use client";

import React, { useState, useId } from "react";
import { m, AnimatePresence } from "motion/react";
import {
  Leaf,
  Droplets,
  Recycle,
  HeartHandshake,
  Download,
  CheckCircle2,
  SlidersHorizontal,
  FileText,
} from "lucide-react";
import {
  ESG_DASHBOARD_METRICS,
  type EsgMetricCategory,
} from "@/lib/constants";
import { useAppInteraction } from "@/components/layout/SmoothScrollProvider";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { EASE_OUT_EXPO } from "@/lib/animations";
import { cn } from "@/lib/utils";

const METRIC_ICONS: Record<EsgMetricCategory["id"], React.ReactNode> = {
  carbon: <Leaf strokeWidth={1.5} className="w-4 h-4" />,
  water: <Droplets strokeWidth={1.5} className="w-4 h-4" />,
  packaging: <Recycle strokeWidth={1.5} className="w-4 h-4" />,
  farmers: <HeartHandshake strokeWidth={1.5} className="w-4 h-4" />,
};

export function SustainabilityImpact() {
  const { locale } = useAppInteraction();
  const pillId = useId();

  const [selectedMetricId, setSelectedMetricId] =
    useState<EsgMetricCategory["id"]>("carbon");
  const [simulationYearIdx, setSimulationYearIdx] = useState<number>(3); // Default 2026 (YTD)
  const [downloadingDoc, setDownloadingDoc] = useState<string | null>(null);

  const activeMetric =
    ESG_DASHBOARD_METRICS.find((m) => m.id === selectedMetricId) ??
    ESG_DASHBOARD_METRICS[0]!;

  const activeYearPoint =
    activeMetric.yearlyComparison[simulationYearIdx] ??
    activeMetric.yearlyComparison[3]!;

  const handleDownloadReport = (
    docType: "esg-report" | "corporate-deck"
  ) => {
    setDownloadingDoc(docType);
    const title =
      docType === "esg-report"
        ? "NOURI_GLOBAL_2026_SUSTAINABILITY_ESG_REPORT.txt"
        : "NOURI_GLOBAL_2026_CORPORATE_PROFILE_DECK.txt";

    const content = [
      `====================================================================`,
      `NOURI GLOBAL FOODS — OFFICIAL EXECUTIVE DISCLOSURE (${new Date().getFullYear()})`,
      `Document: ${title}`,
      `Audited By: Ernst & Young (GHG Protocol / SBTi FLAG) & SGS Global`,
      `====================================================================`,
      ``,
      `1. EXECUTIVE SUMMARY`,
      `- Annual Production Capacity: 285,000+ MT across 12 Smart Plants`,
      `- Global Export Network: 48 Countries (Jakarta, Singapore, Rotterdam, Zurich)`,
      `- Smallholder Agroforestry Network: 18,400+ Partner Farmers (+24.2% Fair Premium)`,
      ``,
      `2. RADICAL ESG PERFORMANCE METRICS (YTD 2026 vs NET-ZERO TARGET)`,
      ...ESG_DASHBOARD_METRICS.map(
        (m) =>
          `• ${m.label} (${m.labelId}): Current ${m.currentValue} | Target ${m.targetValue} by ${m.targetYear} (${m.deltaBadge})`
      ),
      ``,
      `3. FOOD SAFETY & COMPLIANCE REGISTRY`,
      `- FSSC 22000 v6.0: FSSC-ID-2026-88412`,
      `- ISO 9001:2015: QMS-TR-01-100-229481`,
      `- Halal MUI / Global: ID00410000284910925`,
      `- US FDA Registration: FDA-FCE-19402`,
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = title;
    a.click();
    URL.revokeObjectURL(url);

    setTimeout(() => setDownloadingDoc(null), 2000);
  };

  return (
    <section
      id="esg-dashboard"
      aria-label="Interactive ESG and Sustainability Impact Dashboard"
      className="py-22 lg:py-30 bg-canvas-light relative overflow-hidden"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Top Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <span className="inline-flex items-center font-traceability text-xs uppercase tracking-[0.2em] text-brand-primary font-semibold">
              RADICAL ESG TRANSPARENCY & NET-ZERO LEDGER
            </span>
            <h2 className="mt-2 font-editorial text-4xl sm:text-5xl lg:text-6xl text-text-primary tracking-tight">
              {locale === "ID"
                ? "Transparansi Keberlanjutan Tanpa Kompromi."
                : "Numbers We Print on Every Carton."}
            </h2>
          </div>

          {/* Instant Download Buttons for ESG Report & Corporate Deck */}
          <div className="flex flex-wrap items-center gap-3">
            <MagneticButton
              variant="primary"
              size="md"
              onClick={() => handleDownloadReport("esg-report")}
            >
              {downloadingDoc === "esg-report" ? (
                <CheckCircle2 strokeWidth={1.5} className="w-4 h-4 text-brand-gold" />
              ) : (
                <Download strokeWidth={1.5} className="w-4 h-4 text-brand-gold" />
              )}
              <span>
                {downloadingDoc === "esg-report"
                  ? "Downloaded ESG Report!"
                  : "Annual Sustainability Report (PDF)"}
              </span>
            </MagneticButton>

            <MagneticButton
              variant="outline"
              size="md"
              onClick={() => handleDownloadReport("corporate-deck")}
            >
              {downloadingDoc === "corporate-deck" ? (
                <CheckCircle2 strokeWidth={1.5} className="w-4 h-4 text-brand-primary" />
              ) : (
                <FileText strokeWidth={1.5} className="w-4 h-4 text-brand-primary" />
              )}
              <span>
                {downloadingDoc === "corporate-deck"
                  ? "Downloaded Profile Deck!"
                  : "Corporate Profile Deck"}
              </span>
            </MagneticButton>
          </div>
        </div>

        {/* Interactive Metric Category Toggle Bar */}
        <div
          role="tablist"
          aria-label="Select sustainability impact dimension"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
        >
          {ESG_DASHBOARD_METRICS.map((metric) => {
            const isSelected = metric.id === selectedMetricId;
            return (
              <button
                key={metric.id}
                role="tab"
                aria-selected={isSelected}
                type="button"
                onClick={() => setSelectedMetricId(metric.id)}
                className={cn(
                  "relative z-10 text-left p-5 rounded-3xl border transition-all cursor-pointer overflow-hidden",
                  isSelected
                    ? "text-text-inverse border-brand-primary shadow-md"
                    : "bg-surface-card text-text-primary border-text-primary/10 hover:border-brand-primary/40"
                )}
              >
                {isSelected && (
                  <m.div
                    layoutId={`esg-tab-${pillId}`}
                    transition={{
                      type: "spring",
                      bounce: 0.15,
                      visualDuration: 0.38,
                    }}
                    className="absolute inset-0 bg-brand-primary -z-10"
                  />
                )}
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "p-2 rounded-xl",
                      isSelected
                        ? "bg-text-inverse/15 text-brand-gold"
                        : "bg-brand-primary/10 text-brand-primary"
                    )}
                  >
                    {METRIC_ICONS[metric.id]}
                  </span>
                  <span
                    className={cn(
                      "font-traceability text-[11px] font-medium px-2.5 py-0.5 rounded-full",
                      isSelected
                        ? "bg-brand-gold/20 text-brand-gold"
                        : "bg-canvas-subtle text-text-secondary"
                    )}
                  >
                    Target {metric.targetYear}
                  </span>
                </div>

                <p className="mt-3.5 font-editorial text-2xl leading-none">
                  {locale === "ID" ? metric.labelId : metric.label}
                </p>
                <p
                  className={cn(
                    "mt-1 font-traceability text-xs",
                    isSelected ? "text-text-inverse/80" : "text-text-secondary"
                  )}
                >
                  {metric.currentValue} • {metric.deltaBadge}
                </p>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Dashboard Panel */}
        <AnimatePresence mode="wait">
          <m.div
            key={activeMetric.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            className="rounded-[2.25rem] border border-text-primary/12 bg-surface-card p-6 sm:p-10 shadow-[0_20px_50px_-20px_rgba(20,35,25,0.08)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left 5 Cols: Metric Overview + Interactive Year Trajectory Slider */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div>
                  <span className="font-traceability text-xs uppercase tracking-widest text-brand-accent font-semibold">
                    {activeMetric.shortTitle}
                  </span>
                  <h3 className="mt-1 font-editorial text-3xl sm:text-4xl text-text-primary">
                    {locale === "ID"
                      ? activeMetric.labelId
                      : activeMetric.label}
                  </h3>
                  <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                    {activeMetric.summary}
                  </p>
                </div>

                {/* Current vs Net-Zero Target Highlight Box */}
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="rounded-2xl bg-canvas-light border border-text-primary/10 p-4">
                    <span className="font-traceability text-[10px] uppercase tracking-wider text-text-secondary block">
                      Selected Milestone ({activeYearPoint.year})
                    </span>
                    <span className="mt-1 font-editorial text-3xl text-brand-primary block">
                      {activeYearPoint.displayActual}
                    </span>
                    <span className="font-traceability text-[11px] text-text-secondary">
                      {activeMetric.unit}
                    </span>
                  </div>

                  <div className="rounded-2xl bg-canvas-dark text-text-inverse p-4">
                    <span className="font-traceability text-[10px] uppercase tracking-wider text-brand-gold block">
                      {activeMetric.targetYear} Horizon Goal
                    </span>
                    <span className="mt-1 font-editorial text-3xl text-text-inverse block">
                      {activeMetric.targetValue}
                    </span>
                    <span className="font-traceability text-[11px] text-brand-gold">
                      {activeMetric.deltaBadge}
                    </span>
                  </div>
                </div>

                {/* Interactive Timeline Slider Control */}
                <div className="rounded-2xl bg-canvas-subtle/70 border border-text-primary/10 p-5">
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className="inline-flex items-center gap-1.5 font-medium text-text-primary">
                      <SlidersHorizontal
                        strokeWidth={1.5}
                        className="w-3.5 h-3.5 text-brand-primary"
                      />
                      Interactive Trajectory Scrubber
                    </span>
                    <span className="font-traceability font-semibold text-brand-primary">
                      {activeYearPoint.year}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={activeMetric.yearlyComparison.length - 1}
                    step={1}
                    value={simulationYearIdx}
                    aria-label="Scrub through sustainability milestone years"
                    onChange={(e) =>
                      setSimulationYearIdx(Number(e.target.value))
                    }
                    className="w-full accent-brand-primary cursor-pointer"
                  />
                  <div className="mt-2 flex justify-between font-traceability text-[10px] text-text-secondary">
                    {activeMetric.yearlyComparison.map((pt, idx) => (
                      <button
                        key={pt.year}
                        type="button"
                        onClick={() => setSimulationYearIdx(idx)}
                        className={cn(
                          "cursor-pointer transition-colors",
                          idx === simulationYearIdx
                            ? "text-brand-primary font-bold"
                            : "hover:text-text-primary"
                        )}
                      >
                        {pt.year.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="font-traceability text-[11px] text-text-secondary">
                  ✓ {activeMetric.methodologyNote}
                </p>
              </div>

              {/* Right 7 Cols: Comparative Trajectory Chart & Key Initiatives */}
              <div className="lg:col-span-7 space-y-6">
                {/* Bar Comparison Chart: NOURI Actual vs Industry Benchmark */}
                <div className="rounded-3xl bg-canvas-light border border-text-primary/10 p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-text-primary/8">
                    <div>
                      <span className="font-traceability text-xs uppercase tracking-wider text-text-secondary block">
                        Performance vs Global F&B Industry Baseline
                      </span>
                      <h4 className="font-editorial text-2xl text-text-primary">
                        2020 — {activeMetric.targetYear} Verified Trajectory
                      </h4>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-traceability">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-brand-primary" />
                        NOURI Actual / Target
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-text-secondary">
                        <span className="h-2.5 w-2.5 rounded-full bg-brand-accent/45" />
                        Sector Average
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 sm:gap-5 items-end h-52 pt-4">
                    {activeMetric.yearlyComparison.map((point, idx) => {
                      const isCurrentSelected = idx === simulationYearIdx;
                      return (
                        <button
                          key={point.year}
                          type="button"
                          onClick={() => setSimulationYearIdx(idx)}
                          className={cn(
                            "group flex flex-col items-center h-full justify-end cursor-pointer rounded-xl p-1.5 transition-colors",
                            isCurrentSelected
                              ? "bg-brand-primary/8 ring-1 ring-brand-primary/30"
                              : "hover:bg-text-primary/4"
                          )}
                        >
                          <span className="font-traceability text-[10px] font-semibold text-text-primary mb-1.5">
                            {point.displayActual}
                          </span>
                          <div className="w-full flex items-end justify-center gap-1.5 h-34">
                            <m.div
                              initial={{ scaleY: 0 }}
                              animate={{ scaleY: point.actual / 100 }}
                              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                              style={{ transformOrigin: "50% 100%" }}
                              className={cn(
                                "w-3.5 sm:w-5 h-full rounded-t-lg transition-colors",
                                isCurrentSelected
                                  ? "bg-brand-primary"
                                  : "bg-brand-primary/75 group-hover:bg-brand-primary"
                              )}
                            />
                            <m.div
                              initial={{ scaleY: 0 }}
                              animate={{ scaleY: point.benchmark / 100 }}
                              transition={{
                                duration: 0.6,
                                delay: 0.05,
                                ease: EASE_OUT_EXPO,
                              }}
                              style={{ transformOrigin: "50% 100%" }}
                              className="w-2.5 sm:w-3.5 h-full rounded-t-lg bg-brand-accent/40"
                            />
                          </div>
                          <span
                            className={cn(
                              "mt-2 font-traceability text-[10px] truncate max-w-full",
                              isCurrentSelected
                                ? "text-brand-primary font-bold"
                                : "text-text-secondary"
                            )}
                          >
                            {point.year}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3 Concrete Initiatives Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {activeMetric.keyInitiatives.map((init) => (
                    <div
                      key={init.title}
                      className="rounded-2xl bg-canvas-light border border-text-primary/10 p-4 flex flex-col justify-between"
                    >
                      <div>
                        <span className="font-traceability text-xs font-semibold text-brand-accent block">
                          {init.metric}
                        </span>
                        <h5 className="mt-1 font-medium text-sm text-text-primary">
                          {init.title}
                        </h5>
                        <p className="mt-1.5 text-xs text-text-secondary leading-relaxed">
                          {init.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </m.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
