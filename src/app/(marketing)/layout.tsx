"use client";

import React from "react";
import dynamic from "next/dynamic";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { GlobalHeader } from "@/components/layout/GlobalHeader";
import { GlobalFooter } from "@/components/layout/GlobalFooter";

const DynamicB2BInquiryDrawer = dynamic(
  () =>
    import("@/components/interactive/B2BInquiryDrawer").then(
      (mod) => mod.B2BInquiryDrawer
    ),
  { ssr: false }
);

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScrollProvider>
      <div className="flex min-h-screen flex-col">
        <GlobalHeader />
        <main className="flex-1">{children}</main>
        <GlobalFooter />
        <DynamicB2BInquiryDrawer />
      </div>
    </SmoothScrollProvider>
  );
}
