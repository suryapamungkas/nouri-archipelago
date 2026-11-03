"use client";

import React, { useState, useId } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "motion/react";
import {
  FileSpreadsheet,
  BookOpen,
  X,
  CheckCircle2,
  MapPin,
  Package,
  ArrowUpRight,
  Download,
} from "lucide-react";
import {
  BRANDS,
  BRAND_CATEGORIES,
  type BrandCategory,
  type BrandPortfolioItem,
} from "@/lib/constants";
import { useAppInteraction } from "@/components/layout/SmoothScrollProvider";
import { EASE_OUT_EXPO } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function BrandShowcase() {
  const { locale, openB2BDrawer } = useAppInteraction();
  const tabLayoutId = useId();

  const [selectedCategory, setSelectedCategory] =
    useState<BrandCategory>("All");
  const [hoveredBrand, setHoveredBrand] = useState<BrandPortfolioItem | null>(
    BRANDS[0] ?? null
  );
  const [modalState, setModalState] = useState<{
    brand: BrandPortfolioItem;
    mode: "story" | "spec";
  } | null>(null);

  const filteredBrands =
    selectedCategory === "All"
      ? BRANDS
      : BRANDS.filter((b) => b.category === selectedCategory);

  const activeAmbientOklch =
    hoveredBrand?.ambientOklch || "oklch(94.2% 0.02 82)";

  return (
    <section
      id="brand-portfolio"
      aria-label="Dynamic Consumer Brand and B2B Ingredient Portfolio"
      style={
        {
          "--section-ambient": activeAmbientOklch,
        } as React.CSSProperties
      }
      className="py-22 lg:py-30 relative overflow-hidden transition-colors duration-700 bg-[var(--section-ambient)]"
    >
      {/* Subtle Ambient Radial Highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-1/4 w-[620px] h-[620px] rounded-full bg-surface-card/55 blur-[120px]"
      />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Header & Category Switcher Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <div className="inline-flex items-center font-traceability text-xs uppercase tracking-[0.2em] text-brand-primary font-semibold">
              <span>DYNAMIC PORTFOLIO & AMBIENT MORPHING</span>
            </div>
            <h2 className="mt-2 font-editorial text-4xl sm:text-5xl lg:text-6xl text-text-primary tracking-tight">
              {locale === "ID"
                ? "Merek Konsumen & Bahan Baku Industri."
                : "Beloved by Consumers. Trusted by Industry."}
            </h2>
          </div>

          {/* Filter Pills with Motion Shared Layout Indicator */}
          <div
            role="tablist"
            aria-label="Filter portfolio by category"
            className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-surface-card/85 backdrop-blur-md border border-text-primary/10 shadow-xs"
          >
            {BRAND_CATEGORIES.map((category) => {
              const isSelected = category === selectedCategory;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "relative px-4 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer z-10",
                    isSelected
                      ? "text-text-inverse"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {isSelected && (
                    <m.span
                      layoutId={`brand-cat-${tabLayoutId}`}
                      transition={{
                        type: "spring",
                        bounce: 0.18,
                        visualDuration: 0.35,
                      }}
                      className="absolute inset-0 rounded-xl bg-brand-primary -z-10"
                    />
                  )}
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Ambient Brand Telemetry Strip */}
        <div className="mb-8 rounded-2xl bg-surface-card/75 backdrop-blur-md border border-text-primary/10 px-5 py-3 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span
              style={{ backgroundColor: hoveredBrand?.cardAccentHex || "#23533A" }}
              className="h-3 w-3 rounded-full transition-colors duration-500"
            />
            <span className="font-traceability uppercase tracking-wider text-text-secondary">
              Ambient Palette Sync:
            </span>
            <span className="font-semibold text-text-primary">
              {hoveredBrand?.name}
            </span>
          </div>
          <div className="font-traceability text-text-secondary flex items-center gap-4">
            <span>Origin: {hoveredBrand?.originName}</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline text-brand-primary font-medium">
              GPS: {hoveredBrand?.originCoordinates}
            </span>
          </div>
        </div>

        {/* Brand Cards Grid */}
        <m.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          <AnimatePresence mode="popLayout">
            {filteredBrands.map((brand) => (
              <m.article
                layout
                key={brand.id}
                initial={{ opacity: 0, scale: 0.95, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 10 }}
                transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                onMouseEnter={() => setHoveredBrand(brand)}
                onFocus={() => setHoveredBrand(brand)}
                className="group rounded-[2rem] border border-text-primary/10 bg-surface-card overflow-hidden shadow-[0_18px_45px_-20px_rgba(20,35,25,0.1)] hover:shadow-[0_28px_65px_-18px_rgba(20,35,25,0.18)] transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Image Container with Fixed Aspect Ratio (CLS = 0.00) */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-canvas-dark">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-canvas-dark/75 via-transparent to-canvas-dark/25" />

                    {/* Top Category & Award Pill */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-surface-card/92 backdrop-blur-md text-text-primary font-traceability text-[10px] uppercase tracking-wider font-semibold">
                        {brand.category}
                      </span>
                      <span
                        style={{ backgroundColor: brand.cardAccentHex }}
                        className="px-3 py-1 rounded-full text-text-inverse font-traceability text-[10px] uppercase tracking-wider font-medium shadow-xs"
                      >
                        {brand.badge}
                      </span>
                    </div>

                    {/* Bottom Origin Coordinates */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-text-inverse/90 font-traceability text-[10px]">
                      <span className="inline-flex items-center gap-1">
                        <MapPin strokeWidth={1.5} className="w-3 h-3 text-brand-gold" />
                        {brand.originName}
                      </span>
                      <span>{brand.originCoordinates}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7">
                    <h3 className="font-editorial text-2xl sm:text-3xl text-text-primary tracking-tight">
                      {brand.name}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-brand-primary">
                      {brand.tagline}
                    </p>
                    <p className="mt-3 text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {brand.storyExcerpt}
                    </p>

                    {/* Nutrition / Technical Highlights */}
                    <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl bg-canvas-light p-3 border border-text-primary/8">
                      {brand.nutritionHighlights.map((hl) => (
                        <div key={hl.label}>
                          <span className="block font-traceability text-[9px] uppercase text-text-secondary truncate">
                            {hl.label}
                          </span>
                          <span className="font-traceability text-xs font-semibold text-text-primary">
                            {hl.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dual Action Footer: Consumer Story + B2B Technical Spec/MOQ */}
                <div className="px-6 pb-6 pt-3 border-t border-text-primary/8 grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      setModalState({ brand, mode: "story" })
                    }
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-canvas-subtle hover:bg-brand-primary/12 text-text-primary text-xs font-medium transition-colors cursor-pointer"
                  >
                    <BookOpen strokeWidth={1.5} className="w-3.5 h-3.5 text-brand-primary" />
                    <span>View Product Story</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setModalState({ brand, mode: "spec" })
                    }
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-brand-primary text-text-inverse hover:bg-brand-primary/90 text-xs font-medium transition-colors cursor-pointer"
                  >
                    <FileSpreadsheet strokeWidth={1.5} className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Tech Spec / MOQ</span>
                  </button>
                </div>
              </m.article>
            ))}
          </AnimatePresence>
        </m.div>
      </div>

      {/* Interactive Product Story & B2B Technical Spec Modal */}
      <AnimatePresence>
        {modalState && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-canvas-dark/70 backdrop-blur-md"
            onClick={() => setModalState(null)}
          >
            <m.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
              className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-[2rem] bg-surface-card border border-text-primary/15 shadow-2xl p-6 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-text-primary/10">
                <div>
                  <span className="font-traceability text-xs uppercase tracking-widest text-brand-primary font-semibold">
                    {modalState.mode === "story"
                      ? "CONSUMER ORIGIN & CULINARY DOSSIER"
                      : "B2B TECHNICAL SPECIFICATION & MOQ SHEET"}
                  </span>
                  <h3 className="mt-1 font-editorial text-3xl text-text-primary">
                    {modalState.brand.name}
                  </h3>
                </div>
                <button
                  type="button"
                  aria-label="Close modal"
                  onClick={() => setModalState(null)}
                  className="p-2 rounded-full bg-canvas-subtle hover:bg-text-primary/10 text-text-primary cursor-pointer"
                >
                  <X strokeWidth={1.5} className="w-5 h-5" />
                </button>
              </div>

              {/* Mode Switcher Tabs inside Modal */}
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setModalState({ ...modalState, mode: "story" })
                  }
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors",
                    modalState.mode === "story"
                      ? "bg-brand-primary text-text-inverse"
                      : "bg-canvas-subtle text-text-secondary"
                  )}
                >
                  Consumer Product Story
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setModalState({ ...modalState, mode: "spec" })
                  }
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors",
                    modalState.mode === "spec"
                      ? "bg-brand-primary text-text-inverse"
                      : "bg-canvas-subtle text-text-secondary"
                  )}
                >
                  B2B Spec Sheet & MOQ
                </button>
              </div>

              {modalState.mode === "story" ? (
                <div className="mt-6 space-y-5">
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden">
                    <Image
                      src={modalState.brand.image}
                      alt={modalState.brand.name}
                      fill
                      sizes="640px"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm text-text-primary leading-relaxed">
                    {modalState.brand.fullStory}
                  </p>
                  <div>
                    <h4 className="font-traceability text-xs uppercase tracking-wider text-text-secondary mb-2.5">
                      Available Retail & Foodservice SKUs
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {modalState.brand.skus.map((sku) => (
                        <div
                          key={sku}
                          className="flex items-center gap-2 p-2.5 rounded-xl bg-canvas-light border border-text-primary/8 text-xs font-medium text-text-primary"
                        >
                          <CheckCircle2
                            strokeWidth={1.5}
                            className="w-4 h-4 text-brand-primary shrink-0"
                          />
                          <span>{sku}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-2xl bg-canvas-light border border-text-primary/10">
                      <span className="font-traceability text-[10px] uppercase text-text-secondary block">
                        Minimum Order Quantity (MOQ)
                      </span>
                      <span className="font-traceability text-xs font-semibold text-text-primary mt-1 block">
                        {modalState.brand.b2bSpecs.moq}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-canvas-light border border-text-primary/10">
                      <span className="font-traceability text-[10px] uppercase text-text-secondary block">
                        Packaging Formats
                      </span>
                      <span className="font-traceability text-xs font-semibold text-text-primary mt-1 block">
                        {modalState.brand.b2bSpecs.packagingFormat}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-canvas-light border border-text-primary/10">
                      <span className="font-traceability text-[10px] uppercase text-text-secondary block">
                        Brix / Purity Standard
                      </span>
                      <span className="font-traceability text-xs font-semibold text-brand-primary mt-1 block">
                        {modalState.brand.b2bSpecs.brixOrPurity}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-canvas-light border border-text-primary/10">
                      <span className="font-traceability text-[10px] uppercase text-text-secondary block">
                        Harmonized HS Code & Shelf Life
                      </span>
                      <span className="font-traceability text-xs font-semibold text-text-primary mt-1 block">
                        HS {modalState.brand.b2bSpecs.hsCode} •{" "}
                        {modalState.brand.b2bSpecs.shelfLife}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-canvas-subtle/70 border border-text-primary/10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Package
                        strokeWidth={1.5}
                        className="w-5 h-5 text-brand-primary shrink-0"
                      />
                      <div>
                        <span className="block text-xs font-semibold text-text-primary">
                          Standard Dispatch Lead Time:{" "}
                          {modalState.brand.b2bSpecs.leadTime}
                        </span>
                        <span className="block text-[11px] text-text-secondary">
                          Includes SGS Certificate of Analysis (COA), Halal &
                          EUDR Polygon Certificate
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-text-primary/10 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const specText = [
                      `NOURI GLOBAL FOODS — TECHNICAL SPECIFICATION SHEET`,
                      `Brand: ${modalState.brand.name}`,
                      `Category: ${modalState.brand.category}`,
                      `Origin: ${modalState.brand.originName} (${modalState.brand.originCoordinates})`,
                      `MOQ: ${modalState.brand.b2bSpecs.moq}`,
                      `Packaging: ${modalState.brand.b2bSpecs.packagingFormat}`,
                      `Standard: ${modalState.brand.b2bSpecs.brixOrPurity}`,
                      `HS Code: ${modalState.brand.b2bSpecs.hsCode}`,
                      `Shelf Life: ${modalState.brand.b2bSpecs.shelfLife}`,
                      `Certifications: ${modalState.brand.certifications.join(", ")}`,
                    ].join("\n");
                    const blob = new Blob([specText], { type: "text/plain" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `${modalState.brand.id}-technical-spec.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-canvas-subtle hover:bg-text-primary/10 text-text-primary text-xs font-medium cursor-pointer"
                >
                  <Download strokeWidth={1.5} className="w-3.5 h-3.5" />
                  <span>Download Spec Sheet</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const selectedBrand = modalState.brand;
                    setModalState(null);
                    openB2BDrawer({
                      partnershipType: "distributor",
                      productCategory: selectedBrand.name,
                      requestSample: true,
                    });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-primary text-text-inverse text-xs font-medium hover:bg-brand-accent transition-colors cursor-pointer"
                >
                  <span>Request Sample & Commercial Quote</span>
                  <ArrowUpRight strokeWidth={1.5} className="w-3.5 h-3.5" />
                </button>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
}
