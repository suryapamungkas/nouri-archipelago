"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  m,
  AnimatePresence,
  useScroll,
  useSpring,
} from "motion/react";
import {
  ChevronDown,
  ArrowUpRight,
  Globe,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import {
  MEGA_MENU_GROUPS,
  type LocaleCode,
  type MegaMenuGroup,
  type NavCategoryItem,
} from "@/lib/constants";
import { useAppInteraction } from "@/components/layout/SmoothScrollProvider";
import { MagneticButton } from "@/components/interactive/MagneticButton";
import { NouriLogo } from "@/components/layout/NouriLogo";
import { cn } from "@/lib/utils";

const LOCALES: Array<{ code: LocaleCode; label: string; region: string }> = [
  { code: "ID", label: "ID", region: "Indonesia (HQ)" },
  { code: "EN", label: "EN", region: "International (EN)" },
  { code: "GLOBAL", label: "GLB", region: "Global Trade Desk" },
];

export function GlobalHeader() {
  const { locale, setLocale, openB2BDrawer } = useAppInteraction();
  const [isCompact, setIsCompact] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<NavCategoryItem | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => {
      setIsCompact(window.scrollY > 44);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeGroup: MegaMenuGroup | undefined = MEGA_MENU_GROUPS.find(
    (g) => g.id === activeGroupId
  );

  const previewImg =
    hoveredItem?.previewImage || activeGroup?.featured.image || "/images/hero-culinary.png";

  return (
    <header
      onMouseLeave={() => {
        setActiveGroupId(null);
        setHoveredItem(null);
      }}
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
    >
      {/* Top 2px Reading / Scroll Progress Bar */}
      <div className="w-full h-[2px] bg-text-primary/8 overflow-hidden">
        <m.div
          style={{ scaleX, transformOrigin: "0% 50%" }}
          className="h-full w-full bg-gradient-to-r from-brand-primary via-brand-accent to-brand-gold"
        />
      </div>

      <div
        className={cn(
          "mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 transition-all duration-300",
          isCompact ? "pt-2" : "pt-4"
        )}
      >
        <div
          className={cn(
            "relative flex items-center justify-between rounded-2xl border border-text-primary/10 glass-editorial shadow-[0_8px_32px_-12px_rgba(20,35,25,0.08)] transition-all duration-300 px-4 sm:px-6",
            isCompact ? "h-14" : "h-18"
          )}
        >
          {/* Left: Brand Identity */}
          <Link
            href="/"
            aria-label="NOURI Maison d'Archipel Home"
            className="flex items-center group focus-visible:outline-2 focus-visible:outline-brand-primary rounded-lg"
          >
            <NouriLogo variant="light" compact={isCompact} />
          </Link>

          {/* Center: Multi-Audience Mega-Menu Triggers */}
          <nav
            aria-label="Primary Multi-Audience Navigation"
            className="hidden lg:flex items-center gap-1"
          >
            {MEGA_MENU_GROUPS.map((group) => {
              const isActive = activeGroupId === group.id;
              return (
                <div
                  key={group.id}
                  onMouseEnter={() => {
                    setActiveGroupId(group.id);
                    setHoveredItem(null);
                  }}
                  className="relative"
                >
                  <Link
                    href={group.href}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-colors",
                      isActive
                        ? "bg-brand-primary/10 text-brand-primary"
                        : "text-text-primary/85 hover:text-text-primary hover:bg-text-primary/5"
                    )}
                  >
                    <span>{group.label[locale]}</span>
                    <ChevronDown
                      strokeWidth={1.5}
                      className={cn(
                        "w-3.5 h-3.5 transition-transform duration-200",
                        isActive && "rotate-180 text-brand-accent"
                      )}
                    />
                  </Link>
                </div>
              );
            })}
            <Link
              href="/newsroom"
              onMouseEnter={() => setActiveGroupId(null)}
              className="px-3.5 py-2 rounded-full text-sm font-medium text-text-primary/85 hover:text-text-primary hover:bg-text-primary/5 transition-colors"
            >
              {locale === "ID" ? "Ruang Berita" : "Newsroom"}
            </Link>
          </nav>

          {/* Right: Language/Region Switcher + Action CTA */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Language / Region Pill */}
            <div
              role="group"
              aria-label="Language and region selector"
              className="inline-flex items-center rounded-full bg-canvas-subtle/90 p-0.5 border border-text-primary/10"
            >
              <Globe
                strokeWidth={1.5}
                className="w-3.5 h-3.5 text-text-secondary ml-2 mr-1"
              />
              {LOCALES.map((loc) => (
                <button
                  key={loc.code}
                  type="button"
                  onClick={() => setLocale(loc.code)}
                  title={loc.region}
                  className={cn(
                    "px-2 py-1 text-[11px] font-traceability font-medium rounded-full transition-all cursor-pointer",
                    locale === loc.code
                      ? "bg-surface-card text-brand-primary shadow-2xs"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {loc.label}
                </button>
              ))}
            </div>

            {/* Dual Action CTA: Partner With Us (B2B) */}
            <MagneticButton
              variant="primary"
              size="sm"
              onClick={() => openB2BDrawer()}
              className="py-2.5 px-4"
            >
              <span>
                {locale === "ID" ? "Kemitraan B2B" : "Partner With Us (B2B)"}
              </span>
              <ArrowUpRight strokeWidth={1.5} className="w-3.5 h-3.5" />
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => openB2BDrawer()}
              className="md:hidden px-3 py-1.5 rounded-full bg-brand-primary text-text-inverse text-xs font-medium"
            >
              B2B Inquiry
            </button>
            <button
              type="button"
              aria-label="Toggle Navigation Menu"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="p-2 rounded-xl border border-text-primary/10 bg-surface-card/80 text-text-primary"
            >
              {mobileMenuOpen ? (
                <X strokeWidth={1.5} className="w-5 h-5" />
              ) : (
                <Menu strokeWidth={1.5} className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mega-Menu Dropdown Panel */}
        <AnimatePresence>
          {activeGroup && (
            <m.div
              key={activeGroup.id}
              initial={{ opacity: 0, y: 8, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.99 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block mt-2 rounded-3xl border border-text-primary/12 bg-surface-card/98 backdrop-blur-xl shadow-[0_24px_60px_-15px_rgba(18,32,24,0.16)] overflow-hidden"
            >
              <div className="grid grid-cols-12 gap-0">
                {/* Left 7 Cols: Audience-Segmented Links */}
                <div className="col-span-7 p-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-text-primary/8">
                      <span className="font-traceability text-xs uppercase tracking-widest text-brand-primary font-medium">
                        {activeGroup.audienceTag}
                      </span>
                      <span className="font-traceability text-[11px] text-text-secondary">
                        ISO 22000 • FSSC v6 • Halal Global Verified
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {activeGroup.items.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          onClick={() => setActiveGroupId(null)}
                          onMouseEnter={() => setHoveredItem(item)}
                          className="group/item flex flex-col justify-between p-3.5 rounded-2xl border border-transparent hover:border-text-primary/10 hover:bg-canvas-light transition-all"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-medium text-sm text-text-primary group-hover/item:text-brand-primary transition-colors">
                                {item.title}
                              </span>
                              {item.badge && (
                                <span className="px-2 py-0.5 text-[10px] font-traceability uppercase tracking-wider rounded-full bg-brand-primary/10 text-brand-primary">
                                  {item.badge}
                                </span>
                              )}
                              {item.metric && (
                                <span className="font-traceability text-[11px] text-brand-accent">
                                  {item.metric}
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-xs text-text-secondary leading-relaxed line-clamp-2">
                              {item.subtitle}
                            </p>
                          </div>
                          <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-brand-primary opacity-0 group-hover/item:opacity-100 transition-opacity">
                            <span>Explore specification</span>
                            <ArrowUpRight strokeWidth={1.5} className="w-3 h-3" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-text-primary/8 flex items-center justify-between text-xs text-text-secondary">
                    <div className="flex items-center gap-2">
                      <ShieldCheck
                        strokeWidth={1.5}
                        className="w-4 h-4 text-brand-primary"
                      />
                      <span>
                        Direct B2B COA, Halal & EUDR Traceability Dossiers Available
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveGroupId(null);
                        openB2BDrawer();
                      }}
                      className="font-medium text-brand-primary hover:underline cursor-pointer inline-flex items-center gap-1"
                    >
                      <span>Request Technical Sample</span>
                      <ArrowUpRight strokeWidth={1.5} className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right 5 Cols: Interactive Visual Preview Card */}
                <div className="col-span-5 bg-canvas-subtle/60 p-7 border-l border-text-primary/8 flex flex-col justify-between">
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-canvas-dark">
                    <Image
                      src={previewImg}
                      alt={hoveredItem?.title || activeGroup.featured.title}
                      fill
                      sizes="(max-width: 1200px) 40vw, 480px"
                      className="object-cover transition-transform duration-500 scale-102"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-canvas-dark/80 via-canvas-dark/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-text-inverse">
                      <span className="font-traceability text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-canvas-dark/70 backdrop-blur-md border border-text-inverse/15">
                        {hoveredItem?.title || activeGroup.featured.eyebrow}
                      </span>
                      <span className="font-traceability text-xs text-brand-gold font-medium">
                        {activeGroup.featured.metricValue}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-editorial text-2xl text-text-primary">
                      {hoveredItem ? hoveredItem.title : activeGroup.featured.title}
                    </h4>
                    <p className="mt-1.5 text-xs text-text-secondary leading-relaxed">
                      {hoveredItem
                        ? hoveredItem.subtitle
                        : activeGroup.featured.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-text-primary/10 flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] font-traceability uppercase text-text-secondary">
                        {activeGroup.featured.metricLabel}
                      </span>
                      <span className="font-traceability text-sm font-semibold text-text-primary">
                        {activeGroup.featured.metricValue}
                      </span>
                    </div>
                    <Link
                      href={
                        hoveredItem
                          ? hoveredItem.href
                          : activeGroup.featured.ctaHref
                      }
                      onClick={() => setActiveGroupId(null)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-primary text-text-inverse text-xs font-medium hover:bg-brand-accent transition-colors"
                    >
                      <span>{activeGroup.featured.ctaLabel}</span>
                      <ArrowUpRight strokeWidth={1.5} className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Mobile Drawer Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <m.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden mt-2 rounded-3xl border border-text-primary/12 bg-surface-card p-5 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-text-primary/10">
                <span className="font-traceability text-xs uppercase tracking-wider text-text-secondary">
                  Region & Language
                </span>
                <div className="flex gap-1">
                  {LOCALES.map((loc) => (
                    <button
                      key={loc.code}
                      type="button"
                      onClick={() => setLocale(loc.code)}
                      className={cn(
                        "px-2.5 py-1 text-xs font-traceability rounded-full",
                        locale === loc.code
                          ? "bg-brand-primary text-text-inverse"
                          : "bg-canvas-subtle text-text-secondary"
                      )}
                    >
                      {loc.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                {MEGA_MENU_GROUPS.map((group) => (
                  <div
                    key={group.id}
                    className="rounded-2xl bg-canvas-light p-3.5 border border-text-primary/8"
                  >
                    <Link
                      href={group.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between font-medium text-sm text-brand-primary"
                    >
                      <span>{group.label[locale]}</span>
                      <ArrowUpRight strokeWidth={1.5} className="w-4 h-4" />
                    </Link>
                    <div className="mt-2.5 grid grid-cols-1 gap-2">
                      {group.items.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-xs text-text-secondary hover:text-text-primary py-1 flex items-center justify-between"
                        >
                          <span>{item.title}</span>
                          {item.badge && (
                            <span className="font-traceability text-[10px] text-brand-accent">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                <Link
                  href="/newsroom"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-2xl bg-canvas-light p-3.5 border border-text-primary/8 font-medium text-sm text-text-primary"
                >
                  {locale === "ID" ? "Ruang Berita & Pers" : "Corporate Newsroom"}
                </Link>
              </div>

              <div className="mt-4 pt-4 border-t border-text-primary/10">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openB2BDrawer();
                  }}
                  className="w-full py-3 rounded-full bg-brand-primary text-text-inverse text-sm font-medium flex items-center justify-center gap-2"
                >
                  <span>Partner With Us (B2B & Samples)</span>
                  <ArrowUpRight strokeWidth={1.5} className="w-4 h-4" />
                </button>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
