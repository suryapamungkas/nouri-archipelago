"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowUpRight, Building2 } from "lucide-react";
import { SensoryHero } from "@/components/sections/SensoryHero";
import { AuthorityBentoGrid } from "@/components/sections/AuthorityBentoGrid";
import { BrandShowcase } from "@/components/sections/BrandShowcase";
import { SustainabilityImpact } from "@/components/sections/SustainabilityImpact";
import { NEWSROOM_ARTICLES } from "@/lib/constants";
import { useAppInteraction } from "@/components/layout/SmoothScrollProvider";
import { MagneticButton } from "@/components/interactive/MagneticButton";

const DynamicTraceabilityTimeline = dynamic(
  () =>
    import("@/components/sections/TraceabilityTimeline").then(
      (mod) => mod.TraceabilityTimeline
    ),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[600px] w-full bg-canvas-dark text-text-inverse flex items-center justify-center">
        <span className="font-traceability text-xs uppercase tracking-widest text-brand-gold">
          Loading Seed-to-Shelf Telemetry Pipeline...
        </span>
      </div>
    ),
  }
);

export default function GlobalCompanyProfilePage() {
  const { locale, openB2BDrawer } = useAppInteraction();

  return (
    <>
      {/* Module 2: Sensory Editorial Hero */}
      <SensoryHero />

      {/* Module 3: Apple-Style Impact & Authority Bento Grid */}
      <AuthorityBentoGrid />

      {/* Module 4: Dynamic Brand & Product Portfolio Switcher */}
      <BrandShowcase />

      {/* Module 5: Scrollytelling "Seed-to-Shelf" Traceability Pipeline */}
      <DynamicTraceabilityTimeline />

      {/* Module 6: Interactive ESG & Sustainability Dashboard */}
      <SustainabilityImpact />

      {/* Executive Corporate Newsroom & B2B Contracting Strip */}
      <section
        aria-label="Corporate Press and Investor Dispatches"
        className="py-20 lg:py-26 border-t border-text-primary/10 bg-canvas-subtle/50"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center font-traceability text-xs uppercase tracking-[0.2em] text-brand-primary font-semibold">
                CORPORATE DISPATCH & INVESTOR NEWSROOM
              </span>
              <h2 className="mt-2 font-editorial text-4xl sm:text-5xl text-text-primary tracking-tight">
                {locale === "ID"
                  ? "Wawasan Ekspansi, R&D & Tata Kelola."
                  : "Global Expansion & Scientific Milestones."}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/newsroom"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-surface-card border border-text-primary/15 text-xs font-medium text-text-primary hover:border-brand-primary transition-colors"
              >
                <span>View All Press Releases</span>
                <ArrowUpRight strokeWidth={1.5} className="w-3.5 h-3.5" />
              </Link>
              <MagneticButton
                variant="primary"
                size="sm"
                onClick={() => openB2BDrawer()}
              >
                <Building2 strokeWidth={1.5} className="w-3.5 h-3.5" />
                <span>Open B2B Desk</span>
              </MagneticButton>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {NEWSROOM_ARTICLES.map((article) => (
              <Link
                key={article.id}
                href={`/newsroom#${article.id}`}
                className="group rounded-3xl border border-text-primary/10 bg-surface-card p-6 flex flex-col justify-between hover:border-brand-primary/40 hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 font-traceability text-[10px]">
                    <span className="uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary font-semibold">
                      {article.category}
                    </span>
                    <span className="text-text-secondary">{article.date}</span>
                  </div>
                  <h3 className="mt-4 font-editorial text-2xl text-text-primary group-hover:text-brand-primary transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="mt-2.5 text-xs text-text-secondary leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-text-primary/8 flex items-center justify-between font-traceability text-[11px]">
                  <span className="text-brand-accent font-semibold">
                    {article.metricTag}
                  </span>
                  <span className="inline-flex items-center gap-1 text-text-primary group-hover:translate-x-0.5 transition-transform">
                    Read <ArrowUpRight strokeWidth={1.5} className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
