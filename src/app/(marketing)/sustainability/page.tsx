"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Leaf, ArrowUpRight } from "lucide-react";
import { SustainabilityImpact } from "@/components/sections/SustainabilityImpact";
import { useAppInteraction } from "@/components/layout/SmoothScrollProvider";
import { MagneticButton } from "@/components/interactive/MagneticButton";

const DynamicTraceabilityTimeline = dynamic(
  () =>
    import("@/components/sections/TraceabilityTimeline").then(
      (mod) => mod.TraceabilityTimeline
    ),
  { ssr: false }
);

export default function SustainabilityPage() {
  const { openB2BDrawer } = useAppInteraction();

  return (
    <div className="pt-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pb-8">
        <div className="rounded-[2.25rem] bg-brand-primary text-text-inverse p-8 sm:p-14 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 font-traceability text-xs uppercase tracking-[0.2em] text-brand-gold">
              <Leaf strokeWidth={1.5} className="w-3.5 h-3.5" />
              SBTi 1.5°C Validated • 99.8% EUDR Deforestation-Free
            </span>
            <h1 className="mt-3 font-editorial text-4xl sm:text-6xl tracking-tight leading-[1.04]">
              Radical Transparency from Equatorial Soil to Port.
            </h1>
            <p className="mt-4 text-sm sm:text-base text-text-inverse/80 leading-relaxed">
              Explore our audited Scope 1, 2 & FLAG emissions reduction
              trajectory, closed-loop water reclamation, and living-income
              agroforestry programs across 18,400+ smallholder farms.
            </p>
          </div>
          <MagneticButton
            variant="accent"
            size="lg"
            onClick={() =>
              openB2BDrawer({
                partnershipType: "investor-media",
                contextNote: "ESG Audit & EUDR Polygon Dossier Request",
              })
            }
          >
            <span>Request EUDR & ESG Audit Dossier</span>
            <ArrowUpRight strokeWidth={1.5} className="w-4 h-4" />
          </MagneticButton>
        </div>
      </div>

      <SustainabilityImpact />
      <DynamicTraceabilityTimeline />
    </div>
  );
}
