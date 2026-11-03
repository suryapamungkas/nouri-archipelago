"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import Lenis from "lenis";
import { LazyMotion, domAnimation, MotionConfig } from "motion/react";
import type { LocaleCode } from "@/lib/constants";

export interface B2BDrawerPreset {
  partnershipType?: string;
  productCategory?: string;
  requestSample?: boolean;
  contextNote?: string;
}

interface AppInteractionContextValue {
  locale: LocaleCode;
  setLocale: (locale: LocaleCode) => void;
  isB2BDrawerOpen: boolean;
  drawerPreset: B2BDrawerPreset | null;
  openB2BDrawer: (preset?: B2BDrawerPreset) => void;
  closeB2BDrawer: () => void;
  scrollToSection: (selector: string) => void;
}

const AppInteractionContext = createContext<AppInteractionContextValue | null>(
  null
);

export function useAppInteraction(): AppInteractionContextValue {
  const ctx = useContext(AppInteractionContext);
  if (!ctx) {
    throw new Error(
      "useAppInteraction must be used within SmoothScrollProvider"
    );
  }
  return ctx;
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState<LocaleCode>("ID");
  const [isB2BDrawerOpen, setIsB2BDrawerOpen] = useState(false);
  const [drawerPreset, setDrawerPreset] = useState<B2BDrawerPreset | null>(
    null
  );
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    setLenisInstance(lenis);

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  useEffect(() => {
    if (!lenisInstance) return;
    if (isB2BDrawerOpen) {
      lenisInstance.stop();
    } else {
      lenisInstance.start();
    }
  }, [isB2BDrawerOpen, lenisInstance]);

  const openB2BDrawer = useCallback((preset?: B2BDrawerPreset) => {
    if (preset) {
      setDrawerPreset(preset);
    } else {
      setDrawerPreset(null);
    }
    setIsB2BDrawerOpen(true);
  }, []);

  const closeB2BDrawer = useCallback(() => {
    setIsB2BDrawerOpen(false);
  }, []);

  const scrollToSection = useCallback(
    (selector: string) => {
      const target = document.querySelector(selector);
      if (!target) return;
      if (lenisInstance) {
        lenisInstance.scrollTo(target as HTMLElement, { offset: -88 });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [lenisInstance]
  );

  const contextValue = useMemo<AppInteractionContextValue>(
    () => ({
      locale,
      setLocale,
      isB2BDrawerOpen,
      drawerPreset,
      openB2BDrawer,
      closeB2BDrawer,
      scrollToSection,
    }),
    [
      locale,
      isB2BDrawerOpen,
      drawerPreset,
      openB2BDrawer,
      closeB2BDrawer,
      scrollToSection,
    ]
  );

  return (
    <AppInteractionContext.Provider value={contextValue}>
      <LazyMotion features={domAnimation}>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LazyMotion>
    </AppInteractionContext.Provider>
  );
}
