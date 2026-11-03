"use client";

import React from "react";
import Image from "next/image";
import {
  Factory,
  FlaskConical,
  Ship,
  ChefHat,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { useAppInteraction } from "@/components/layout/SmoothScrollProvider";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { AuthorityBentoGrid } from "@/components/sections/AuthorityBentoGrid";

const B2B_PILLARS = [
  {
    id: "oem",
    code: "TURNKEY OEM & ODM",
    title: "Custom Co-Manufacturing & Private Label",
    subtitle: "Aseptic UHT Cartons, Sleek Cans, Retort Pouches & Spray-Dried Powders",
    moq: "From 5,000 Liters (Pilot) to 50M Units/Year",
    description:
      "Formulate with our 240+ food scientists in Singapore Biopolis & Jakarta. We provide end-to-end liquid processing, enzymatic oat/nut milk hydrolysis, UHT Prisma/Edge filling, and regulatory label clearance for EU, US FDA, JAKIM, and BPOM.",
    specs: [
      "Tetra Pak A3/Speed & Combibloc Aseptic Lines",
      "High-Pressure Processing (HPP 6,000 bar) Cold Chain",
      "Nitrogen-Flushed Sleek Can & Glass Bottling",
      "14-Day Rapid Benchtop to Industrial Pilot Trial",
    ],
  },
  {
    id: "bulk-ingredients",
    code: "INDUSTRIAL COMMODITIES",
    title: "Bulk Specialty Ingredients & Extracts",
    subtitle: "Single-Origin Cocoa Derivatives, Coconut Cream & Supercritical Oleoresins",
    moq: "1x20' FCL (18 MT) or 24 MT Heated ISO Tank",
    description:
      "Direct industrial supply of prime-pressed deodorized cocoa butter, alkalized cocoa powders, 24–30% fat aseptic coconut cream, and supercritical CO₂ spice extracts with full 550-pesticide LC-MS/MS Certificates of Analysis.",
    specs: [
      "200kg Aseptic Steel Drums & 1,000L Stainless IBCs",
      "24 MT Heated ISO Tank Farms in Jakarta & Rotterdam",
      "RSPO Identity Preserved & 100% EUDR GeoJSON Polygons",
      "Automated SAP / EDI Lot Traceability Integration",
    ],
  },
  {
    id: "horeca",
    code: "CULINARY & BARISTA SERVICE",
    title: "HoReCa, Specialty Café & Hotel Supply",
    subtitle: "Micro-Foam Plant Dairy, Couverture Pistoles & 1:8 Cold-Brew BIBs",
    moq: "1 Pallet Mixed SKU or Regional Distributor Dispatch",
    description:
      "Trusted by 4,800+ specialty coffee chains, 5-star hotel groups, and artisanal bakeries across Tokyo, Melbourne, Singapore, Dubai, and London.",
    specs: [
      "Steam-Stable at 68°C in High-Acid Espresso",
      "10L Bag-in-Box Nitrogen Cold-Brew Dispense Systems",
      "2.5kg Re-sealable Chef Couverture Coins (68%–85%)",
      "Dedicated Barista & Pastry Chef Technical Training",
    ],
  },
  {
    id: "export-logistics",
    code: "GLOBAL COLD-CHAIN",
    title: "48-Market Export & Reefer Logistics",
    subtitle: "Satellite-Monitored Sea & Air Freight from Equatorial Ports to Global Hubs",
    moq: "FOB Jakarta/Surabaya or DDP Rotterdam/Singapore/LA",
    description:
      "Our integrated trade desk manages customs clearance, phytosanitary certificates, EUR.1 / RCEP preferential tariffs, and real-time IoT container telemetry (-18°C to +16°C).",
    specs: [
      "48-Hour Buffer Stock Delivery from Port of Rotterdam",
      "99.3% On-Time In-Full (OTIF) Global Contractual SLA",
      "Real-Time Satellite Temperature & Shock Telemetry",
      "Full Halal, Kosher, EU Organic & FDA Prior Notice",
    ],
  },
];

export default function SolutionsPage() {
  const { openB2BDrawer } = useAppInteraction();

  return (
    <div className="pt-28 pb-16">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Hero Banner */}
        <div className="relative rounded-[2.25rem] overflow-hidden bg-canvas-dark text-text-inverse p-8 sm:p-14 border border-text-primary/12">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 font-traceability text-xs uppercase tracking-[0.2em] text-brand-gold">
              <Factory strokeWidth={1.5} className="w-4 h-4" />
              B2B Industrial Solutions, OEM & Global Supply
            </span>
            <h1 className="mt-3 font-editorial text-4xl sm:text-6xl tracking-tight leading-[1.04]">
              Bio-Industrial Precision Built for Tier-1 CPG & Foodservice.
            </h1>
            <p className="mt-4 text-sm sm:text-base text-text-inverse/75 leading-relaxed">
              From 1,000-liter R&D pilot batches in Singapore Biopolis to
              10,000-metric-ton annual commodity contracts delivered via our
              Rotterdam and Jakarta tank farms.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <MagneticButton
                variant="accent"
                size="lg"
                onClick={() =>
                  openB2BDrawer({
                    partnershipType: "oem",
                    requestSample: true,
                  })
                }
              >
                <span>Request OEM / Bulk Sample Kit</span>
                <ArrowUpRight strokeWidth={1.5} className="w-4 h-4" />
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* 4 B2B Division Cards */}
        <div
          id="facilities"
          className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-7"
        >
          {B2B_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              id={pillar.id}
              className="rounded-[2rem] border border-text-primary/10 bg-surface-card p-7 sm:p-9 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-text-primary/8">
                  <span className="font-traceability text-xs uppercase tracking-wider text-brand-primary font-semibold">
                    {pillar.code}
                  </span>
                  <span className="font-traceability text-xs text-brand-accent font-medium">
                    {pillar.moq}
                  </span>
                </div>
                <h2 className="mt-4 font-editorial text-3xl sm:text-4xl text-text-primary">
                  {pillar.title}
                </h2>
                <p className="mt-1 text-xs font-medium text-brand-primary">
                  {pillar.subtitle}
                </p>
                <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                  {pillar.description}
                </p>

                <div className="mt-5 space-y-2">
                  {pillar.specs.map((spec) => (
                    <div
                      key={spec}
                      className="flex items-center gap-2 text-xs text-text-primary bg-canvas-light p-2.5 rounded-xl border border-text-primary/8"
                    >
                      <CheckCircle2
                        strokeWidth={1.5}
                        className="w-4 h-4 text-brand-primary shrink-0"
                      />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-text-primary/10 flex items-center justify-between">
                <span className="font-traceability text-[11px] text-text-secondary inline-flex items-center gap-1.5">
                  <ShieldCheck strokeWidth={1.5} className="w-4 h-4 text-brand-primary" />
                  FSSC 22000 v6 & Halal Certified
                </span>
                <button
                  type="button"
                  onClick={() =>
                    openB2BDrawer({
                      partnershipType:
                        pillar.id === "oem"
                          ? "oem"
                          : pillar.id === "horeca"
                          ? "horeca"
                          : "bulk-ingredients",
                      requestSample: true,
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-primary text-text-inverse text-xs font-medium hover:bg-brand-accent transition-colors cursor-pointer"
                >
                  <span>Inquire {pillar.title.split(" ")[0]}</span>
                  <ArrowUpRight strokeWidth={1.5} className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AuthorityBentoGrid />
    </div>
  );
}
