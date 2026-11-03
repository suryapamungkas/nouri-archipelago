"use client";

import React, { useState, useTransition } from "react";
import { m, AnimatePresence } from "motion/react";
import {
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  PackageCheck,
  Building2,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import {
  PARTNERSHIP_TYPES,
  B2B_INTEREST_CATEGORIES,
} from "@/lib/constants";
import { useAppInteraction } from "@/components/layout/SmoothScrollProvider";
import {
  submitB2BInquiry,
  type B2BInquiryActionResult,
} from "@/actions/submit-b2b-inquiry";
import { EASE_OUT_EXPO } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function B2BInquiryDrawer() {
  const { isB2BDrawerOpen, closeB2BDrawer, drawerPreset } =
    useAppInteraction();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [partnershipType, setPartnershipType] = useState<string>("distributor");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    B2B_INTEREST_CATEGORIES[0],
  ]);
  const [requestSample, setRequestSample] = useState<boolean>(false);

  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [countryRegion, setCountryRegion] = useState("");
  const [estimatedVolume, setEstimatedVolume] = useState("1x20' FCL (Trial Contract)");
  const [projectNotes, setProjectNotes] = useState("");

  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<B2BInquiryActionResult | null>(null);

  const [prevPreset, setPrevPreset] = useState<typeof drawerPreset>(null);

  if (drawerPreset !== prevPreset) {
    setPrevPreset(drawerPreset);
    if (drawerPreset) {
      if (drawerPreset.partnershipType) {
        setPartnershipType(drawerPreset.partnershipType);
      }
      if (drawerPreset.productCategory) {
        setSelectedCategories([drawerPreset.productCategory]);
      }
      if (typeof drawerPreset.requestSample === "boolean") {
        setRequestSample(drawerPreset.requestSample);
      }
      if (drawerPreset.contextNote) {
        setProjectNotes(drawerPreset.contextNote);
      }
    }
  }

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleResetAndClose = () => {
    closeB2BDrawer();
    setTimeout(() => {
      setStep(1);
      setResult(null);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const response = await submitB2BInquiry({
        partnershipType,
        productCategories:
          selectedCategories.length > 0
            ? selectedCategories
            : [B2B_INTEREST_CATEGORIES[0]],
        requestSample,
        companyName,
        contactName,
        workEmail,
        countryRegion,
        estimatedVolume,
        projectNotes,
      });
      setResult(response);
    });
  };

  return (
    <AnimatePresence>
      {isB2BDrawerOpen && (
        <>
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleResetAndClose}
            className="fixed inset-0 z-50 bg-canvas-dark/65 backdrop-blur-xs"
          />

          {/* Slide-Over Panel */}
          <m.aside
            role="dialog"
            aria-modal="true"
            aria-label="B2B Partnership and Sample Request Drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.42, ease: EASE_OUT_EXPO }}
            data-lenis-prevent
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xl bg-surface-card text-text-primary shadow-2xl border-l border-text-primary/12 flex flex-col justify-between overflow-y-auto"
          >
            {/* Top Drawer Header */}
            <div className="p-6 sm:p-8 border-b border-text-primary/10 sticky top-0 bg-surface-card/95 backdrop-blur-md z-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center font-traceability text-[11px] uppercase tracking-widest text-brand-primary font-semibold">
                    Direct B2B Trade & R&D Sample Desk
                  </span>
                  <h2 className="mt-1 font-editorial text-3xl text-text-primary tracking-tight">
                    Partner With NOURI Global
                  </h2>
                </div>
                <button
                  type="button"
                  aria-label="Close B2B Drawer"
                  onClick={handleResetAndClose}
                  className="p-2 rounded-full bg-canvas-subtle hover:bg-text-primary/10 text-text-primary transition-colors cursor-pointer"
                >
                  <X strokeWidth={1.5} className="w-5 h-5" />
                </button>
              </div>

              {/* 3-Step Progress Indicator */}
              {!result?.success && (
                <div className="mt-5 grid grid-cols-3 gap-2">
                  {[
                    { num: 1, label: "01. Partnership Track" },
                    { num: 2, label: "02. Product & Samples" },
                    { num: 3, label: "03. Volume & Dispatch" },
                  ].map((s) => (
                    <button
                      key={s.num}
                      type="button"
                      onClick={() => setStep(s.num as 1 | 2 | 3)}
                      className={cn(
                        "text-left pt-2 border-t-2 font-traceability text-[11px] transition-colors cursor-pointer",
                        step >= s.num
                          ? "border-brand-primary text-brand-primary font-semibold"
                          : "border-text-primary/15 text-text-secondary"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Body Content */}
            <div className="p-6 sm:p-8 flex-1">
              {result?.success ? (
                <m.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-3xl bg-canvas-light border border-brand-primary/25 p-6 sm:p-8 text-center space-y-5 my-4"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary text-text-inverse">
                    <CheckCircle2 strokeWidth={1.5} className="w-8 h-8 text-brand-gold" />
                  </div>
                  <div>
                    <span className="font-traceability text-xs uppercase tracking-widest text-brand-primary font-semibold">
                      Dossier Registered • Optimistic Dispatch Active
                    </span>
                    <h3 className="mt-1 font-editorial text-3xl text-text-primary">
                      Inquiry Received by Trade Desk
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-text-secondary leading-relaxed">
                      Your technical specification dossier and commercial pricing
                      schedule have been routed to our regional commodity team.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-surface-card border border-text-primary/10 p-4 text-left font-traceability text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Reference ID:</span>
                      <span className="font-bold text-brand-primary">
                        {result.referenceCode}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Assigned Desk:</span>
                      <span className="text-text-primary font-medium">
                        {result.assignedDesk}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Sample Kit Status:</span>
                      <span className="text-brand-accent font-medium">
                        {requestSample
                          ? "DHL Express R&D Kit Queued (48h)"
                          : "Commercial Quote Only"}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="w-full py-3.5 rounded-full bg-brand-primary text-text-inverse text-sm font-medium hover:bg-brand-primary/90 transition-colors cursor-pointer"
                  >
                    Return to NOURI Global
                  </button>
                </m.div>
              ) : (
                <form id="b2b-wizard-form" onSubmit={handleSubmit}>
                  {step === 1 && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-editorial text-2xl text-text-primary">
                          Select Your Partnership Track
                        </h3>
                        <p className="text-xs text-text-secondary mt-1">
                          We tailor MOQ schedules, regulatory COAs, and account
                          routing to your business model.
                        </p>
                      </div>

                      <div className="space-y-2.5 pt-2">
                        {PARTNERSHIP_TYPES.map((pt) => {
                          const isSelected = partnershipType === pt.id;
                          return (
                            <button
                              key={pt.id}
                              type="button"
                              onClick={() => setPartnershipType(pt.id)}
                              className={cn(
                                "w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4",
                                isSelected
                                  ? "bg-brand-primary/8 border-brand-primary shadow-2xs"
                                  : "bg-canvas-light border-text-primary/10 hover:border-text-primary/25"
                              )}
                            >
                              <div>
                                <div className="font-medium text-sm text-text-primary">
                                  {pt.title}
                                </div>
                                <div className="text-xs text-text-secondary mt-0.5">
                                  {pt.subtitle}
                                </div>
                              </div>
                              <span className="font-traceability text-[10px] px-2.5 py-1 rounded-full bg-surface-card border border-text-primary/10 text-brand-primary shrink-0">
                                {pt.moqHint}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-5">
                      <div>
                        <h3 className="font-editorial text-2xl text-text-primary">
                          Select Product Lines & Sample Kit
                        </h3>
                        <p className="text-xs text-text-secondary mt-1">
                          Choose one or more categories for technical specs and
                          optional R&D sample evaluation.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-2">
                        {B2B_INTEREST_CATEGORIES.map((category) => {
                          const isChecked =
                            selectedCategories.includes(category);
                          return (
                            <button
                              key={category}
                              type="button"
                              onClick={() => toggleCategory(category)}
                              className={cn(
                                "w-full text-left p-3.5 rounded-2xl border text-xs font-medium transition-all cursor-pointer flex items-center justify-between",
                                isChecked
                                  ? "bg-brand-primary text-text-inverse border-brand-primary"
                                  : "bg-canvas-light text-text-primary border-text-primary/10 hover:border-brand-primary/40"
                              )}
                            >
                              <span>{category}</span>
                              <CheckCircle2
                                strokeWidth={1.5}
                                className={cn(
                                  "w-4 h-4",
                                  isChecked
                                    ? "text-brand-gold"
                                    : "text-text-secondary/30"
                                )}
                              />
                            </button>
                          );
                        })}
                      </div>

                      {/* Sample Request Toggle Card */}
                      <div
                        onClick={() => setRequestSample((v) => !v)}
                        className={cn(
                          "p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4",
                          requestSample
                            ? "bg-brand-accent/12 border-brand-accent"
                            : "bg-canvas-subtle/60 border-text-primary/12"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <PackageCheck
                            strokeWidth={1.5}
                            className="w-5 h-5 text-brand-accent shrink-0"
                          />
                          <div>
                            <span className="block text-xs font-semibold text-text-primary">
                              Request Physical R&D Sample Evaluation Kit
                            </span>
                            <span className="block text-[11px] text-text-secondary">
                              Dispatched via temperature-controlled DHL Express
                              with SGS COA
                            </span>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={requestSample}
                          onChange={(e) => setRequestSample(e.target.checked)}
                          className="h-4 w-4 accent-brand-accent"
                        />
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-editorial text-2xl text-text-primary">
                          Corporate & Volume Details
                        </h3>
                        <p className="text-xs text-text-secondary mt-1">
                          Direct encrypted submission to our regional commodity
                          & OEM contracting desk.
                        </p>
                      </div>

                      {result?.error && (
                        <div className="p-3 rounded-xl bg-brand-accent/15 border border-brand-accent text-xs text-text-primary">
                          {result.error}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block font-traceability text-[11px] uppercase text-text-secondary mb-1">
                            Company Legal Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="e.g. Nordic Artisan Foods AB"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-light border border-text-primary/15 text-xs text-text-primary focus:outline-2 focus:outline-brand-primary"
                          />
                        </div>

                        <div>
                          <label className="block font-traceability text-[11px] uppercase text-text-secondary mb-1">
                            Your Full Name & Title *
                          </label>
                          <input
                            type="text"
                            required
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            placeholder="e.g. Elena Rostova, Head of Procurement"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-light border border-text-primary/15 text-xs text-text-primary focus:outline-2 focus:outline-brand-primary"
                          />
                        </div>

                        <div>
                          <label className="block font-traceability text-[11px] uppercase text-text-secondary mb-1">
                            Corporate Work Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={workEmail}
                            onChange={(e) => setWorkEmail(e.target.value)}
                            placeholder="procurement@company.com"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-light border border-text-primary/15 text-xs text-text-primary focus:outline-2 focus:outline-brand-primary"
                          />
                        </div>

                        <div>
                          <label className="block font-traceability text-[11px] uppercase text-text-secondary mb-1">
                            Destination Country / Port *
                          </label>
                          <input
                            type="text"
                            required
                            value={countryRegion}
                            onChange={(e) => setCountryRegion(e.target.value)}
                            placeholder="e.g. Netherlands (Port of Rotterdam)"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-light border border-text-primary/15 text-xs text-text-primary focus:outline-2 focus:outline-brand-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-traceability text-[11px] uppercase text-text-secondary mb-1">
                          Estimated Annual / Trial Volume *
                        </label>
                        <select
                          value={estimatedVolume}
                          onChange={(e) => setEstimatedVolume(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-light border border-text-primary/15 text-xs text-text-primary focus:outline-2 focus:outline-brand-primary"
                        >
                          <option value="Pilot R&D Evaluation (250 kg – 1,000 L)">
                            Pilot R&D Evaluation (250 kg – 1,000 L)
                          </option>
                          <option value="1x20' FCL (Trial Contract)">
                            1x20&apos; FCL (Trial Commercial Contract)
                          </option>
                          <option value="2–5 FCL / Month (Regional Distribution)">
                            2–5 FCL / Month (Regional Distribution)
                          </option>
                          <option value="500+ MT / Year Industrial Supply">
                            500+ MT / Year Industrial Bulk Supply
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-traceability text-[11px] uppercase text-text-secondary mb-1">
                          Formulation Specs, Incoterms (FOB/CIF) or Notes
                        </label>
                        <textarea
                          rows={3}
                          value={projectNotes}
                          onChange={(e) => setProjectNotes(e.target.value)}
                          placeholder="Specify target Brix, fat %, private-label packaging format, or required certifications..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-canvas-light border border-text-primary/15 text-xs text-text-primary focus:outline-2 focus:outline-brand-primary"
                        />
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>

            {/* Bottom Sticky Action Footer */}
            {!result?.success && (
              <div className="p-6 sm:p-8 border-t border-text-primary/10 bg-canvas-light/90 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[11px] font-traceability text-text-secondary">
                  <ShieldCheck
                    strokeWidth={1.5}
                    className="w-4 h-4 text-brand-primary shrink-0"
                  />
                  <span>NDA Protected • 24h Trade SLA</span>
                </div>

                <div className="flex items-center gap-2.5">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-surface-card border border-text-primary/15 text-xs font-medium text-text-primary hover:bg-canvas-subtle cursor-pointer"
                    >
                      <ArrowLeft strokeWidth={1.5} className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={() => setStep((s) => (s + 1) as 1 | 2 | 3)}
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-brand-primary text-text-inverse text-xs font-medium hover:bg-brand-primary/90 cursor-pointer"
                    >
                      <span>Continue</span>
                      <ArrowRight strokeWidth={1.5} className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      form="b2b-wizard-form"
                      disabled={isPending}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-accent text-text-inverse text-xs font-medium hover:bg-brand-accent/90 cursor-pointer disabled:opacity-60"
                    >
                      {isPending ? (
                        <>
                          <Loader2
                            strokeWidth={1.5}
                            className="w-3.5 h-3.5 animate-spin"
                          />
                          <span>Dispatching Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Building2 strokeWidth={1.5} className="w-3.5 h-3.5" />
                          <span>Submit B2B & Sample Request</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}
          </m.aside>
        </>
      )}
    </AnimatePresence>
  );
}
