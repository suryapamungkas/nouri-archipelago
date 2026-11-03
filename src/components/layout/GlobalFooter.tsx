"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ShieldCheck,
  FileText,
  MapPin,
  Mail,
} from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { useAppInteraction } from "@/components/layout/SmoothScrollProvider";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { NouriLogo } from "@/components/layout/NouriLogo";

const GLOBAL_OFFICES = [
  {
    city: "Jakarta (HQ & Agro-Hub)",
    coords: "06°12'S 106°50'E",
    address: "Menara Nouri, SCBD Lot 18, Jakarta 12190",
    role: "9 Manufacturing Plants & Corporate Treasury",
  },
  {
    city: "Singapore (Biopolis R&D)",
    coords: "01°18'N 103°47'E",
    address: "8 Biomedical Grove, Neuros #05-12, SG 138665",
    role: "Enzymatic Innovation Lab & APAC Commodity Desk",
  },
  {
    city: "Rotterdam (EU Gateway)",
    coords: "51°55'N 004°28'E",
    address: "Maasvlakte Boulevard 410, 3199 LZ Rotterdam",
    role: "22,000 m² Cold-Chain & Cocoa Butter Tank Farm",
  },
  {
    city: "Zurich (ESG & Trade)",
    coords: "47°22'N 008°32'E",
    address: "Bahnhofstrasse 72, 8001 Zürich, Switzerland",
    role: "Global Sustainability Audit & European Accounts",
  },
];

export function GlobalFooter() {
  const { openB2BDrawer } = useAppInteraction();

  return (
    <footer className="relative bg-canvas-dark text-text-inverse overflow-hidden border-t border-text-inverse/10">
      {/* Subtle Organic Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 left-1/2 -translate-x-1/2 w-[960px] h-[420px] rounded-full bg-brand-primary/25 blur-[130px]"
      />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-20 pb-12">
        {/* Top Executive CTA Banner */}
        <div className="rounded-3xl border border-text-inverse/12 bg-text-inverse/[0.03] p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center font-traceability text-xs uppercase tracking-[0.2em] text-brand-gold">
              Global B2B Contracting & OEM Formulation
            </span>
            <h2 className="mt-3 font-editorial text-3xl sm:text-5xl tracking-tight text-text-inverse">
              Ready to formulate, co-manufacture, or source at global scale?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-text-inverse/70 leading-relaxed">
              Request technical spec sheets, FSSC 22000 / Halal certificates, or
              dispatch DHL Express R&D evaluation samples within 48 hours.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 shrink-0">
            <MagneticButton
              variant="accent"
              size="lg"
              onClick={() => openB2BDrawer({ requestSample: true })}
            >
              <span>Request R&D Sample Kit</span>
              <ArrowUpRight strokeWidth={1.5} className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton
              variant="outline"
              size="lg"
              onClick={() =>
                openB2BDrawer({ partnershipType: "distributor" })
              }
              className="bg-transparent text-text-inverse border-text-inverse/20 hover:bg-text-inverse/10 hover:border-text-inverse/40"
            >
              <FileText strokeWidth={1.5} className="w-4 h-4" />
              <span>B2B & Export Inquiry</span>
            </MagneticButton>
          </div>
        </div>

        {/* Global Hubs Strip */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GLOBAL_OFFICES.map((office) => (
            <div
              key={office.city}
              className="rounded-2xl border border-text-inverse/10 bg-text-inverse/[0.02] p-5 hover:border-brand-gold/40 transition-colors"
            >
              <div className="flex items-center justify-between text-xs font-traceability text-brand-gold">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin strokeWidth={1.5} className="w-3.5 h-3.5" />
                  {office.city}
                </span>
                <span className="text-[10px] text-text-inverse/50">
                  {office.coords}
                </span>
              </div>
              <p className="mt-2 text-xs text-text-inverse/80 font-medium">
                {office.address}
              </p>
              <p className="mt-1 text-[11px] text-text-inverse/50">
                {office.role}
              </p>
            </div>
          ))}
        </div>

        {/* Multi-Audience Navigation Grid */}
        <div className="mt-14 pt-12 border-t border-text-inverse/10 grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <NouriLogo variant="dark" />
            <p className="mt-3 text-xs text-text-inverse/60 leading-relaxed">
              {COMPANY.legalName}. Bridging equatorial biodiversity with
              zero-contamination smart manufacturing since {COMPANY.founded}.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-xs font-traceability text-brand-gold">
              <Mail strokeWidth={1.5} className="w-3.5 h-3.5" />
              <span>tradedesk@nouriglobal.com</span>
            </div>
          </div>

          <div>
            <h3 className="font-traceability text-xs uppercase tracking-widest text-brand-gold">
              Consumer Brands
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-text-inverse/70">
              <li>
                <Link href="/brands?brand=velveta-oat" className="hover:text-text-inverse transition-colors">
                  VELVETA™ Oat & Creamery
                </Link>
              </li>
              <li>
                <Link href="/brands?brand=kakao-kultura" className="hover:text-text-inverse transition-colors">
                  KAKAO KULTURA™ Reserve
                </Link>
              </li>
              <li>
                <Link href="/brands?brand=verdantia-tonics" className="hover:text-text-inverse transition-colors">
                  VERDANTIA™ Botanical Elixirs
                </Link>
              </li>
              <li>
                <Link href="/brands?brand=nutri-flora" className="hover:text-text-inverse transition-colors">
                  NUTRIFLORA™ Bio-Actives
                </Link>
              </li>
              <li>
                <Link href="/brands?brand=nusa-culinary" className="hover:text-text-inverse transition-colors">
                  NUSA SPICE™ Gastronomy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-traceability text-xs uppercase tracking-widest text-brand-gold">
              B2B & Industrial
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-text-inverse/70">
              <li>
                <Link href="/solutions#oem" className="hover:text-text-inverse transition-colors">
                  OEM / Private Label UHT
                </Link>
              </li>
              <li>
                <Link href="/solutions#bulk-ingredients" className="hover:text-text-inverse transition-colors">
                  Archipelago Bulk Ingredients
                </Link>
              </li>
              <li>
                <Link href="/solutions#horeca" className="hover:text-text-inverse transition-colors">
                  HoReCa & Café Systems
                </Link>
              </li>
              <li>
                <Link href="/solutions#export-logistics" className="hover:text-text-inverse transition-colors">
                  Global Cold-Chain Export
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openB2BDrawer()}
                  className="hover:text-brand-gold transition-colors text-left cursor-pointer"
                >
                  Request MOQ & Technical COA →
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-traceability text-xs uppercase tracking-widest text-brand-gold">
              ESG & Traceability
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-text-inverse/70">
              <li>
                <Link href="/sustainability" className="hover:text-text-inverse transition-colors">
                  2026 Sustainability Report
                </Link>
              </li>
              <li>
                <Link href="/#traceability-pipeline" className="hover:text-text-inverse transition-colors">
                  Seed-to-Shelf GPS Pipeline
                </Link>
              </li>
              <li>
                <Link href="/sustainability#farmers" className="hover:text-text-inverse transition-colors">
                  18,400+ Smallholder Program
                </Link>
              </li>
              <li>
                <Link href="/sustainability#eudr" className="hover:text-text-inverse transition-colors">
                  EUDR & SBTi FLAG Compliance
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-traceability text-xs uppercase tracking-widest text-brand-gold">
              Governance & Press
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-text-inverse/70">
              <li>
                <Link href="/newsroom" className="hover:text-text-inverse transition-colors">
                  Corporate Newsroom
                </Link>
              </li>
              <li>
                <Link href="/#authority-vault" className="hover:text-text-inverse transition-colors">
                  Food Safety & ISO Vault
                </Link>
              </li>
              <li>
                <Link href="/newsroom#investor-relations" className="hover:text-text-inverse transition-colors">
                  Investor Relations (IDX/ESG)
                </Link>
              </li>
              <li>
                <Link href="/solutions#facilities" className="hover:text-text-inverse transition-colors">
                  12 Smart Manufacturing Plants
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Oversized Editorial Watermark */}
        <div
          aria-hidden="true"
          className="@container mt-12 pt-8 border-t border-text-inverse/10 select-none overflow-hidden"
        >
          <p className="font-editorial text-[clamp(2.25rem,11cqi,10.5rem)] leading-[0.88] tracking-tighter text-text-inverse/[0.05] text-center whitespace-nowrap">
            NOURI ARCHIPELAGO
          </p>
        </div>

        {/* Bottom Legal & Compliance Strip */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-traceability text-text-inverse/50">
          <div className="flex items-center gap-2">
            <ShieldCheck strokeWidth={1.5} className="w-4 h-4 text-brand-gold" />
            <span>
              © {new Date().getFullYear()} {COMPANY.legalName}. All Rights Reserved.
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span>FSSC 22000: FSSC-ID-2026-88412</span>
            <span>•</span>
            <span>HALAL: ID00410000284910925</span>
            <span>•</span>
            <span>US FDA FCE #19402</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
