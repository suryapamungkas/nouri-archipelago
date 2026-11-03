"use client";

import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  m,
  AnimatePresence,
  useScroll,
  useTransform,
} from "motion/react";
import {
  Factory,
  Globe2,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
  Copy,
  Check,
} from "lucide-react";
import { CERTIFICATIONS, type CertificationVaultItem } from "@/lib/constants";
import { AnimatedCounter } from "@/components/interactive/AnimatedCounter";
import { useAppInteraction } from "@/components/layout/SmoothScrollProvider";
import { fadeInUp, EASE_OUT_EXPO } from "@/lib/animations";
import { cn } from "@/lib/utils";

const DynamicGlobalNetworkMap = dynamic(
  () =>
    import("@/components/sections/GlobalNetworkMap").then(
      (mod) => mod.GlobalNetworkMap
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[310px] w-full rounded-2xl bg-canvas-subtle/60 animate-pulse flex items-center justify-center">
        <span className="font-traceability text-xs text-text-secondary">
          Initializing 3D Export Telemetry...
        </span>
      </div>
    ),
  }
);

const CAPACITY_BREAKDOWN = [
  { line: "Aseptic UHT & Plant Dairy", mt: "120,000 MT", share: 42 },
  { line: "Single-Origin Cocoa & Lipids", mt: "95,000 MT", share: 33 },
  { line: "Botanical Extracts & Powders", mt: "70,000 MT", share: 25 },
];

export function AuthorityBentoGrid() {
  const { locale, openB2BDrawer } = useAppInteraction();
  const [selectedCert, setSelectedCert] = useState<CertificationVaultItem>(
    CERTIFICATIONS[0]!
  );
  const [copiedReg, setCopiedReg] = useState(false);

  const bannerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ["start end", "end start"],
  });
  const bannerParallaxY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const handleCopyRegistration = (regNo: string) => {
    navigator.clipboard?.writeText(regNo);
    setCopiedReg(true);
    setTimeout(() => setCopiedReg(false), 1800);
  };

  return (
    <section
      id="authority-vault"
      aria-label="Global Scale and Food Safety Authority"
      className="py-20 lg:py-28 relative"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-traceability text-xs uppercase tracking-[0.2em] text-brand-primary font-semibold">
              INDUSTRIAL SCALE & REGULATORY AUTHORITY
            </span>
            <h2 className="mt-2 font-editorial text-4xl sm:text-5xl lg:text-6xl text-text-primary tracking-tight">
              {locale === "ID"
                ? "Otoritas Manufaktur & Kepatuhan Global."
                : "Engineered for Global Food Security."}
            </h2>
          </div>
          <p className="max-w-md text-sm text-text-secondary leading-relaxed">
            {locale === "ID"
              ? "Infrastruktur produksi berstandar GFSI, jaringan rantai dingin lintas benua, dan sertifikasi keamanan pangan yang dapat diverifikasi secara instan."
              : "Every metric is audited by third-party global bodies (SGS, TÜV Rheinland, LRQA), giving enterprise buyers total supply-chain confidence."}
          </p>
        </div>

        {/* 12-Column Apple-Style Modular Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* KARTU 1 (Span 5): Animated Number Counter Production Capacity */}
          <m.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={0}
            className="lg:col-span-5 rounded-[2rem] border border-text-primary/10 bg-surface-card p-7 sm:p-8 shadow-[0_16px_40px_-18px_rgba(20,35,25,0.07)] flex flex-col justify-between relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-traceability text-xs font-medium">
                <Factory strokeWidth={1.5} className="w-3.5 h-3.5" />
                12 SMART PLANTS
              </span>
              <span className="font-traceability text-xs text-text-secondary">
                99.98% OEE UPTIME
              </span>
            </div>

            <div className="my-7">
              <span className="block font-traceability text-xs uppercase tracking-widest text-text-secondary">
                {locale === "ID"
                  ? "Kapasitas Produksi Tahunan"
                  : "Annual Production Capacity"}
              </span>
              <div className="mt-2 flex items-baseline gap-2 flex-wrap">
                <AnimatedCounter
                  value={285000}
                  suffix="+"
                  className="font-editorial text-5xl sm:text-6xl lg:text-[4.25rem] text-text-primary tracking-tight leading-none"
                />
                <span className="font-traceability text-lg sm:text-xl font-semibold text-brand-primary">
                  MT / Year
                </span>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-text-secondary leading-relaxed">
                Zero-contamination stainless processing lines across Java,
                Sumatra, Singapore Biopolis, and Port of Rotterdam.
              </p>
            </div>

            {/* Capacity Allocation Bars */}
            <div className="space-y-3 pt-5 border-t border-text-primary/8">
              {CAPACITY_BREAKDOWN.map((item) => (
                <div key={item.line}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium text-text-primary">
                      {item.line}
                    </span>
                    <span className="font-traceability text-text-secondary">
                      {item.mt}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-canvas-subtle overflow-hidden">
                    <m.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: item.share / 50 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
                      style={{ transformOrigin: "0% 50%" }}
                      className="h-full w-full rounded-full bg-brand-primary"
                    />
                  </div>
                </div>
              ))}
            </div>
          </m.div>

          {/* KARTU 2 (Span 4): Interactive Global Reach (WebGL Cobe Globe) */}
          <m.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={1}
            className="lg:col-span-4 rounded-[2rem] border border-text-primary/10 bg-surface-card p-6 sm:p-7 shadow-[0_16px_40px_-18px_rgba(20,35,25,0.07)] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/12 text-brand-accent font-traceability text-xs font-medium">
                <Globe2 strokeWidth={1.5} className="w-3.5 h-3.5" />
                48 EXPORT MARKETS
              </span>
              <span className="font-traceability text-[11px] text-text-secondary">
                Drag or Select Hub
              </span>
            </div>

            <div className="my-2 flex-1">
              <DynamicGlobalNetworkMap />
            </div>
          </m.div>

          {/* KARTU 3 (Span 3): Food Safety & Certification Vault */}
          <m.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={2}
            className="lg:col-span-3 rounded-[2rem] border border-text-primary/10 bg-canvas-dark text-text-inverse p-6 sm:p-7 shadow-[0_16px_40px_-18px_rgba(20,35,25,0.18)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 font-traceability text-[11px] uppercase tracking-wider text-brand-gold">
                  <ShieldCheck strokeWidth={1.5} className="w-4 h-4" />
                  Compliance Vault
                </span>
                <span className="font-traceability text-[10px] px-2 py-0.5 rounded-full bg-brand-primary text-text-inverse">
                  GFSI Verified
                </span>
              </div>

              <h3 className="mt-3 font-editorial text-2xl text-text-inverse">
                Food Safety & Halal Registry
              </h3>
              <p className="mt-1 text-xs text-text-inverse/65">
                Click or hover any badge to inspect active registration numbers:
              </p>

              {/* Interactive Badge Selector Pills */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {CERTIFICATIONS.map((cert) => {
                  const isActive = cert.id === selectedCert.id;
                  return (
                    <button
                      key={cert.id}
                      type="button"
                      onClick={() => setSelectedCert(cert)}
                      onMouseEnter={() => setSelectedCert(cert)}
                      className={cn(
                        "px-2.5 py-1.5 rounded-xl font-traceability text-[11px] font-medium transition-all cursor-pointer border",
                        isActive
                          ? "bg-brand-gold text-canvas-dark border-brand-gold shadow-xs"
                          : "bg-text-inverse/6 text-text-inverse/80 border-text-inverse/12 hover:bg-text-inverse/12"
                      )}
                    >
                      {cert.code}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Certificate Telemetry Detail Box */}
            <AnimatePresence mode="wait">
              <m.div
                key={selectedCert.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="mt-5 rounded-2xl bg-text-inverse/[0.06] border border-text-inverse/12 p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-traceability text-[10px] uppercase tracking-wider text-brand-gold">
                    {selectedCert.auditScore}
                  </span>
                  <CheckCircle2
                    strokeWidth={1.5}
                    className="w-4 h-4 text-brand-gold shrink-0"
                  />
                </div>
                <p className="mt-1 font-medium text-xs text-text-inverse">
                  {selectedCert.name}
                </p>
                <p className="mt-1 text-[11px] text-text-inverse/65 leading-relaxed">
                  {selectedCert.scope}
                </p>

                <div className="mt-3 pt-2.5 border-t border-text-inverse/10 flex items-center justify-between gap-2">
                  <div>
                    <span className="block text-[9px] font-traceability uppercase text-text-inverse/50">
                      Registration No.
                    </span>
                    <span className="font-traceability text-xs text-brand-gold font-medium">
                      {selectedCert.regNumber}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopyRegistration(selectedCert.regNumber)
                    }
                    title="Copy registration code"
                    className="p-1.5 rounded-lg bg-text-inverse/10 hover:bg-text-inverse/20 text-text-inverse transition-colors cursor-pointer"
                  >
                    {copiedReg ? (
                      <Check strokeWidth={1.5} className="w-3.5 h-3.5 text-brand-gold" />
                    ) : (
                      <Copy strokeWidth={1.5} className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </m.div>
            </AnimatePresence>
          </m.div>

          {/* KARTU 4 (Span 12 - Full Width Banner): Sustainability Vision Quote with Subtle Parallax */}
          <m.div
            ref={bannerRef}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={3}
            className="lg:col-span-12 relative rounded-[2.25rem] overflow-hidden border border-text-primary/12 min-h-[340px] sm:min-h-[380px] flex items-center"
          >
            {/* Parallax Image Container */}
            <m.div
              style={{ y: bannerParallaxY }}
              className="absolute -inset-y-12 inset-x-0 pointer-events-none"
            >
              <Image
                src="/images/sustainability-farm.png"
                alt="Regenerative Indonesian agroforestry terraces at sunrise"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </m.div>
            <div className="absolute inset-0 bg-gradient-to-r from-canvas-dark/92 via-canvas-dark/75 to-canvas-dark/45" />

            <div className="relative z-10 w-full p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
              <div className="max-w-3xl">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand-gold/20 border border-brand-gold/40 text-brand-gold font-traceability text-xs uppercase tracking-widest">
                  Regenerative Agroforestry & Net-Zero 2040 Charter
                </span>
                <blockquote className="mt-4 font-editorial text-2xl sm:text-4xl lg:text-[2.75rem] text-text-inverse leading-[1.12] tracking-tight">
                  “Great food cannot exist on a depleted planet. Every ton of
                  cacao, oats, and botanicals we refine must enrich the volcanic
                  watersheds and farming families that nurtured it.”
                </blockquote>
                <div className="mt-5 flex flex-wrap items-center gap-4 font-traceability text-xs text-text-inverse/75">
                  <span className="text-brand-gold font-semibold">
                    DR. ARYA WIRAWAN • CHIEF SUSTAINABILITY & FOOD SCIENCE OFFICER
                  </span>
                  <span>•</span>
                  <span>64,200 HECTARES SATELLITE-VERIFIED</span>
                </div>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    openB2BDrawer({
                      partnershipType: "investor-media",
                      contextNote: "Requesting Full Quality & ESG Compliance Dossier",
                    })
                  }
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand-gold text-canvas-dark font-medium text-sm hover:bg-brand-gold/90 transition-colors cursor-pointer shadow-lg"
                >
                  <span>Download Quality & ESG Charter</span>
                  <ArrowUpRight strokeWidth={1.5} className="w-4 h-4" />
                </button>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
