"use client";

import React from "react";
import { Newspaper, ArrowUpRight, ShieldCheck, Building2 } from "lucide-react";
import { NEWSROOM_ARTICLES, COMPANY } from "@/lib/constants";
import { useAppInteraction } from "@/components/layout/SmoothScrollProvider";
import { MagneticButton } from "@/components/interactive/MagneticButton";

const GOVERNANCE_BOARD = [
  {
    name: "Hendra Kusuma, MBA",
    role: "Chief Executive Officer & Executive Chairman",
    bio: "30+ years leading APAC agribusiness & specialty ingredients industrialization.",
  },
  {
    name: "Dr. Arya Wirawan, Ph.D.",
    role: "Chief Sustainability & Food Science Officer",
    bio: "Former ETH Zurich enzymologist; architect of NOURI's Biopolis R&D Campus.",
  },
  {
    name: "Claire Van Der Berg",
    role: "Managing Director, European Trade & Rotterdam Hub",
    bio: "20 years in global cocoa & botanical lipid supply chains across EMEA.",
  },
  {
    name: "Kenji Takahashi",
    role: "VP of Global Quality Assurance & GFSI Compliance",
    bio: "Master auditor overseeing FSSC 22000 v6, ISO 17025, and zero-recall protocols.",
  },
];

export default function NewsroomPage() {
  const { openB2BDrawer } = useAppInteraction();

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Hero */}
        <div className="rounded-[2.25rem] bg-canvas-dark text-text-inverse p-8 sm:p-14 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 font-traceability text-xs uppercase tracking-[0.2em] text-brand-gold">
              <Newspaper strokeWidth={1.5} className="w-3.5 h-3.5" />
              Corporate Press, Investor Relations & Governance
            </span>
            <h1 className="mt-3 font-editorial text-4xl sm:text-6xl tracking-tight leading-[1.04]">
              Dispatches from Our Global Operations & Labs.
            </h1>
            <p className="mt-4 text-sm sm:text-base text-text-inverse/75 leading-relaxed">
              Official press releases, quarterly sustainability disclosures, WIPO
              patent filings, and corporate governance updates from{" "}
              {COMPANY.legalName}.
            </p>
          </div>
          <MagneticButton
            variant="accent"
            size="lg"
            onClick={() =>
              openB2BDrawer({
                partnershipType: "investor-media",
              })
            }
          >
            <span>Media & Investor Desk</span>
            <ArrowUpRight strokeWidth={1.5} className="w-4 h-4" />
          </MagneticButton>
        </div>

        {/* Articles Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-7">
          {NEWSROOM_ARTICLES.map((article) => (
            <article
              key={article.id}
              id={article.id}
              className="rounded-[2rem] border border-text-primary/10 bg-surface-card p-7 sm:p-9 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2 font-traceability text-xs">
                  <span className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-semibold uppercase">
                    {article.category}
                  </span>
                  <span className="text-text-secondary">
                    {article.date} • {article.readTime}
                  </span>
                </div>
                <h2 className="mt-5 font-editorial text-3xl sm:text-4xl text-text-primary leading-tight">
                  {article.title}
                </h2>
                <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-text-primary/10 flex items-center justify-between">
                <span className="font-traceability text-xs text-brand-accent font-semibold">
                  {article.metricTag}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    openB2BDrawer({
                      partnershipType: "investor-media",
                      contextNote: `Press Inquiry regarding: ${article.title}`,
                    })
                  }
                  className="inline-flex items-center gap-1 text-xs font-medium text-brand-primary hover:underline cursor-pointer"
                >
                  <span>Request Full Press Briefing</span>
                  <ArrowUpRight strokeWidth={1.5} className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Executive Governance Section */}
        <div
          id="governance"
          className="mt-20 rounded-[2.25rem] border border-text-primary/10 bg-canvas-subtle/60 p-8 sm:p-12"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-text-primary/10">
            <div>
              <span className="font-traceability text-xs uppercase tracking-widest text-brand-primary font-semibold">
                CORPORATE GOVERNANCE & EXECUTIVE COUNCIL
              </span>
              <h2 className="mt-2 font-editorial text-3xl sm:text-5xl text-text-primary">
                Stewardship Led by Food Scientists & Supply-Chain Veterans.
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 font-traceability text-xs text-text-secondary">
              <ShieldCheck strokeWidth={1.5} className="w-4 h-4 text-brand-primary" />
              Dual External Audit: EY & SGS Global
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {GOVERNANCE_BOARD.map((leader) => (
              <div
                key={leader.name}
                className="rounded-2xl bg-surface-card border border-text-primary/10 p-5"
              >
                <Building2
                  strokeWidth={1.5}
                  className="w-5 h-5 text-brand-primary"
                />
                <h3 className="mt-3 font-editorial text-2xl text-text-primary">
                  {leader.name}
                </h3>
                <p className="font-traceability text-[11px] text-brand-accent font-medium mt-0.5">
                  {leader.role}
                </p>
                <p className="mt-2.5 text-xs text-text-secondary leading-relaxed">
                  {leader.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
