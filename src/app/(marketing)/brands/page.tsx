"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { BrandShowcase } from "@/components/sections/BrandShowcase";
import { useAppInteraction } from "@/components/layout/SmoothScrollProvider";
import { MagneticButton } from "@/components/interactive/MagneticButton";

export default function BrandsPage() {
  const { openB2BDrawer } = useAppInteraction();

  return (
    <div className="pt-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pb-8">
        <div className="rounded-[2.25rem] bg-canvas-dark text-text-inverse p-8 sm:p-14 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center font-traceability text-xs uppercase tracking-[0.2em] text-brand-gold">
              FMCG Consumer Brands & Culinary Craft
            </span>
            <h1 className="mt-3 font-editorial text-4xl sm:text-6xl tracking-tight">
              Category-Defining Products Across 62,000+ Retail Doors.
            </h1>
            <p className="mt-4 text-sm sm:text-base text-text-inverse/75 leading-relaxed">
              Every NOURI consumer brand is formulated in our Singapore-Jakarta
              enzymatic gastronomy labs with clean-label ingredients, full EUDR
              polygon traceability, and Halal Global compliance.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <MagneticButton
              variant="accent"
              size="lg"
              onClick={() =>
                openB2BDrawer({
                  partnershipType: "distributor",
                  requestSample: true,
                })
              }
            >
              <span>Become a Regional Distributor</span>
              <ArrowUpRight strokeWidth={1.5} className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>
      </div>

      <BrandShowcase />
    </div>
  );
}
