"use client";

import React, { useState } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "motion/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  ShieldCheck,
  Compass,
  Play,
  Layers,
  FileCheck2,
} from "lucide-react";
import { useAppInteraction } from "@/components/layout/SmoothScrollProvider";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { wordRevealContainer, wordRevealChild, EASE_OUT_EXPO } from "@/lib/animations";
import { cn } from "@/lib/utils";

const HERO_SCENES = [
  {
    id: "origin",
    code: "EQUATORIAL ORIGIN",
    label: "Raw Botanical & Cacao Harvest",
    image: "/images/hero-culinary.png",
    telemetry: "LOT #NR-8841 • BALI & GAYO HIGHLANDS • BRIX 24.8°",
    caption:
      "Single-estate Trinitario cacao, volcanic highlands arabica, and cold-pressed botanicals harvested across 64,200 polygon-mapped hectares.",
  },
  {
    id: "craft",
    code: "CONSUMER FMCG CRAFT",
    label: "Barista Oat & Culinary Creamery",
    image: "/images/brand-oat-dairy.png",
    telemetry: "ENZYMATIC HYDROLYSIS • ZERO ADDED CANE SUGAR",
    caption:
      "Loved in 62,000+ specialty cafés and retail aisles across APAC, Europe, and North America.",
  },
  {
    id: "facility",
    code: "BIO-INDUSTRIAL SCALE",
    label: "Zero-Contamination Smart Plants",
    image: "/images/smart-rnd-facility.png",
    telemetry: "FSSC 22000 V6 • 285,000+ MT/YEAR CAPACITY",
    caption:
      "12 automated aseptic UHT, supercritical CO₂ extraction, and cryogenic milling facilities.",
  },
] as const;

export function SensoryHero() {
  const { locale, openB2BDrawer, scrollToSection } = useAppInteraction();
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [activeAudiencePill, setActiveAudiencePill] = useState<
    "consumer" | "b2b" | "esg"
  >("consumer");

  const activeScene = HERO_SCENES[activeSceneIndex] ?? HERO_SCENES[0];

  const headlineWords =
    locale === "ID"
      ? [
          "Dari",
          "Tanah",
          "Vulkanik",
          "Nusantara",
          "Menuju",
          "Meja",
          "Kuliner",
          "Dunia.",
        ]
      : [
          "From",
          "Volcanic",
          "Equatorial",
          "Soil",
          "to",
          "the",
          "World’s",
          "Table.",
        ];

  const handleQuickRoute = (route: "consumer" | "b2b" | "esg") => {
    setActiveAudiencePill(route);
    if (route === "consumer") {
      scrollToSection("#brand-portfolio");
    } else if (route === "b2b") {
      openB2BDrawer({ partnershipType: "distributor" });
    } else {
      scrollToSection("#esg-dashboard");
    }
  };

  return (
    <section
      aria-label="Editorial Sensory Hero"
      className="relative min-h-[96vh] pt-28 pb-14 lg:pt-34 lg:pb-20 overflow-hidden flex flex-col justify-between"
    >
      {/* Ambient Subtle Radial Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 right-[8%] w-[540px] h-[540px] rounded-full bg-brand-accent/12 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-[5%] w-[600px] h-[440px] rounded-full bg-brand-primary/10 blur-[140px]"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Top Editorial Metadata Bar */}
        <m.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-text-primary/10"
        >
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-canvas-subtle border border-text-primary/10">
            <span className="h-2 w-2 rounded-full bg-brand-primary animate-pulse" />
            <span className="font-traceability text-[11px] uppercase tracking-[0.16em] text-text-primary font-medium">
              {locale === "ID"
                ? "Ekosistem FMCG, B2B Ingredients & Rantai Pasok Global"
                : "Global FMCG Brands • B2B Specialty Ingredients • Cold-Chain"}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-6 font-traceability text-xs text-text-secondary">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck strokeWidth={1.5} className="w-4 h-4 text-brand-primary" />
              FSSC 22000 v6 & Halal Global
            </span>
            <span>•</span>
            <span>285,000+ MT Annual Output</span>
            <span>•</span>
            <span className="text-brand-accent font-medium">48 Export Markets</span>
          </div>
        </m.div>

        {/* Main Hero Editorial Split Layout */}
        <div className="mt-8 lg:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left 7 Columns: Staggered Kinetic Typography & Story */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <m.h1
              key={locale}
              variants={wordRevealContainer}
              initial="hidden"
              animate="visible"
              className="font-editorial text-[2.85rem] sm:text-6xl lg:text-[4.65rem] xl:text-[5.25rem] text-text-primary tracking-tight leading-[1.02] flex flex-wrap gap-x-3.5 gap-y-1"
            >
              {headlineWords.map((word, idx) => {
                const isHighlight =
                  word === "Vulkanik" ||
                  word === "Dunia." ||
                  word === "Equatorial" ||
                  word === "Table.";
                return (
                  <span
                    key={`${word}-${idx}`}
                    className="inline-block overflow-hidden pb-1"
                  >
                    <m.span
                      variants={wordRevealChild}
                      className={cn(
                        "inline-block",
                        isHighlight && "italic text-brand-primary"
                      )}
                    >
                      {word}
                    </m.span>
                  </span>
                );
              })}
            </m.h1>

            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.35, ease: EASE_OUT_EXPO }}
              className="mt-6 max-w-2xl text-base sm:text-lg text-text-secondary leading-relaxed"
            >
              {locale === "ID"
                ? "NOURI menggabungkan pertanian regeneratif 18.400+ petani lokal, laboratorium bioproses berstandar ISO 17025 di Singapura & Jakarta, serta 12 fasilitas manufaktur cerdas untuk menyuplai merek konsumen dan bahan baku industri kelas dunia."
                : "NOURI unites 18,400+ regenerative smallholder farms, ISO 17025 enzymatic gastronomy labs in Singapore & Jakarta, and 12 zero-contamination smart plants to craft category-defining consumer brands and industrial B2B ingredients."}
            </m.p>

            {/* Primary Hero CTAs */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.48, ease: EASE_OUT_EXPO }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <MagneticButton
                variant="primary"
                size="lg"
                onClick={() => scrollToSection("#brand-portfolio")}
              >
                <span>
                  {locale === "ID"
                    ? "Jelajahi Portofolio Produk"
                    : "Explore Brand Portfolio"}
                </span>
                <ArrowDownRight strokeWidth={1.5} className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                variant="outline"
                size="lg"
                onClick={() => openB2BDrawer({ requestSample: true })}
              >
                <span>
                  {locale === "ID"
                    ? "Minta Sampel B2B & Spesifikasi"
                    : "Request B2B Sample & Spec"}
                </span>
                <ArrowUpRight strokeWidth={1.5} className="w-4 h-4" />
              </MagneticButton>
            </m.div>

            {/* Key Micro-Telemetry Strip */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 pt-6 border-t border-text-primary/10 w-full grid grid-cols-3 gap-4 sm:gap-8"
            >
              <div>
                <span className="font-traceability text-xs uppercase tracking-wider text-text-secondary block">
                  {locale === "ID" ? "Kapasitas Tahunan" : "Annual Capacity"}
                </span>
                <span className="font-editorial text-2xl sm:text-3xl text-text-primary">
                  285,000+ <span className="text-sm font-traceability text-brand-primary">MT</span>
                </span>
              </div>
              <div>
                <span className="font-traceability text-xs uppercase tracking-wider text-text-secondary block">
                  {locale === "ID" ? "Ketertelusuran Kebun" : "Polygon Traceability"}
                </span>
                <span className="font-editorial text-2xl sm:text-3xl text-text-primary">
                  99.8% <span className="text-sm font-traceability text-brand-accent">EUDR</span>
                </span>
              </div>
              <div>
                <span className="font-traceability text-xs uppercase tracking-wider text-text-secondary block">
                  {locale === "ID" ? "Jaringan Distribusi" : "Global Distribution"}
                </span>
                <span className="font-editorial text-2xl sm:text-3xl text-text-primary">
                  48 <span className="text-sm font-traceability text-brand-primary">Countries</span>
                </span>
              </div>
            </m.div>
          </div>

          {/* Right 5 Columns: Cinematic Sensory Showcase with Scene Switcher */}
          <m.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.2, ease: EASE_OUT_EXPO }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/4.6] w-full rounded-[2rem] overflow-hidden border border-text-primary/12 bg-canvas-dark shadow-[0_32px_80px_-20px_rgba(20,35,25,0.28)] group">
              {/* Native HTML5 Video Loop with Poster & Instant Fallback + Interactive Scene Image */}
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={activeScene.image}
                className="sr-only"
                aria-hidden="true"
              />

              <AnimatePresence mode="wait">
                <m.div
                  key={activeScene.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeScene.image}
                    alt={activeScene.label}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-canvas-dark/92 via-canvas-dark/25 to-canvas-dark/30" />
                </m.div>
              </AnimatePresence>

              {/* Top Overlay Telemetry Badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-dark border border-text-inverse/15 text-text-inverse">
                  <Play
                    strokeWidth={1.5}
                    className="w-3 h-3 text-brand-gold fill-brand-gold"
                  />
                  <span className="font-traceability text-[10px] tracking-widest uppercase">
                    {activeScene.code}
                  </span>
                </div>
                <span className="font-traceability text-[10px] px-2.5 py-1 rounded-full bg-brand-primary/90 text-text-inverse border border-text-inverse/15">
                  LIVE TELEMETRY
                </span>
              </div>

              {/* Bottom Sensory Story & Reel Switcher */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10 flex flex-col justify-end">
                <span className="font-traceability text-[10px] uppercase tracking-[0.18em] text-brand-gold">
                  {activeScene.telemetry}
                </span>
                <h2 className="mt-1 font-editorial text-2xl sm:text-3xl text-text-inverse">
                  {activeScene.label}
                </h2>
                <p className="mt-1.5 text-xs text-text-inverse/80 leading-relaxed">
                  {activeScene.caption}
                </p>

                {/* Interactive Reel Tabs */}
                <div className="mt-4 pt-3 border-t border-text-inverse/15 grid grid-cols-3 gap-2">
                  {HERO_SCENES.map((scene, idx) => {
                    const isCurrent = idx === activeSceneIndex;
                    return (
                      <button
                        key={scene.id}
                        type="button"
                        onClick={() => setActiveSceneIndex(idx)}
                        className={cn(
                          "text-left p-2 rounded-xl border transition-all cursor-pointer",
                          isCurrent
                            ? "bg-text-inverse/15 border-brand-gold/70 text-text-inverse"
                            : "bg-canvas-dark/40 border-text-inverse/10 text-text-inverse/60 hover:text-text-inverse"
                        )}
                      >
                        <span className="block font-traceability text-[9px] uppercase tracking-wider text-brand-gold">
                          0{idx + 1}
                        </span>
                        <span className="block text-[11px] font-medium truncate mt-0.5">
                          {scene.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </m.div>
        </div>

        {/* Interactive Quick-Router Pill (Spec Module 2 Requirement) */}
        <m.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.65, ease: EASE_OUT_EXPO }}
          className="mt-10 lg:mt-14 flex justify-center"
        >
          <div className="w-full max-w-4xl rounded-2xl sm:rounded-full border border-text-primary/12 bg-surface-card/90 backdrop-blur-md p-2 sm:px-4 sm:py-2.5 shadow-[0_14px_40px_-12px_rgba(20,35,25,0.1)] flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 pl-2">
              <Compass
                strokeWidth={1.5}
                className="w-4 h-4 text-brand-primary shrink-0"
              />
              <span className="font-traceability text-xs font-medium text-text-secondary">
                {locale === "ID" ? "Saya mencari:" : "I am looking for:"}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handleQuickRoute("consumer")}
                className={cn(
                  "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer",
                  activeAudiencePill === "consumer"
                    ? "bg-brand-primary text-text-inverse shadow-xs"
                    : "bg-canvas-subtle text-text-primary hover:bg-brand-primary/10"
                )}
              >
                <span>
                  {locale === "ID"
                    ? "Produk Konsumen (FMCG)"
                    : "Consumer Brands (FMCG)"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickRoute("b2b")}
                className={cn(
                  "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer",
                  activeAudiencePill === "b2b"
                    ? "bg-brand-accent text-text-inverse shadow-xs"
                    : "bg-canvas-subtle text-text-primary hover:bg-brand-accent/15"
                )}
              >
                <Layers strokeWidth={1.5} className="w-3.5 h-3.5" />
                <span>
                  {locale === "ID"
                    ? "Kemitraan B2B & Ekspor"
                    : "B2B Partnership & Export"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickRoute("esg")}
                className={cn(
                  "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer",
                  activeAudiencePill === "esg"
                    ? "bg-canvas-dark text-text-inverse shadow-xs"
                    : "bg-canvas-subtle text-text-primary hover:bg-text-primary/10"
                )}
              >
                <FileCheck2 strokeWidth={1.5} className="w-3.5 h-3.5" />
                <span>
                  {locale === "ID"
                    ? "Laporan ESG & Investor"
                    : "ESG Report & Investors"}
                </span>
              </button>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
