"use client";

import React, { useEffect, useRef, useState } from "react";
import createGlobe, { type Globe } from "cobe";
import { EXPORT_DESTINATIONS, type ExportDestinationPoint } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface GlobalNetworkMapProps {
  compact?: boolean;
  className?: string;
}

const JAKARTA_COORDS: [number, number] = [-6.2088, 106.8456];

export function GlobalNetworkMap({
  compact = false,
  className,
}: GlobalNetworkMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const focusPhiRef = useRef<number | null>(null);

  const [selectedHub, setSelectedHub] = useState<ExportDestinationPoint>(
    EXPORT_DESTINATIONS[0]!
  );
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let phi = 1.85;
    let width = canvas.offsetWidth || 300;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth || 300;
      }
    };
    window.addEventListener("resize", onResize);

    let globe: Globe | null = null;
    let rafId = 0;

    try {
      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width: width * 2,
        height: width * 2,
        phi: 1.85,
        theta: 0.22,
        dark: 0,
        diffuse: 1.35,
        mapSamples: 12000,
        mapBrightness: 5.5,
        baseColor: [0.95, 0.93, 0.89],
        markerColor: [0.82, 0.42, 0.22],
        glowColor: [0.89, 0.87, 0.82],
        arcColor: [0.2, 0.45, 0.3],
        arcWidth: 0.5,
        arcHeight: 0.28,
        markers: EXPORT_DESTINATIONS.map((dest, idx) => ({
          location: [dest.lat, dest.lng],
          size: idx === 0 ? 0.095 : 0.06,
        })),
        arcs: EXPORT_DESTINATIONS.slice(1).map((dest) => ({
          from: JAKARTA_COORDS,
          to: [dest.lat, dest.lng],
        })),
      });

      const animateFrame = () => {
        if (pointerInteracting.current === null) {
          if (focusPhiRef.current !== null) {
            const dist = focusPhiRef.current - phi;
            phi += dist * 0.08;
            if (Math.abs(dist) < 0.01) {
              focusPhiRef.current = null;
            }
          } else if (!prefersReducedMotion) {
            phi += 0.0038;
          }
        }
        globe?.update({
          phi: phi + pointerInteractionMovement.current,
          width: width * 2,
          height: width * 2,
        });
        rafId = requestAnimationFrame(animateFrame);
      };

      rafId = requestAnimationFrame(animateFrame);
    } catch {
      setWebglSupported(false);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      if (globe) {
        globe.destroy();
      }
    };
  }, []);

  const handleSelectHub = (hub: ExportDestinationPoint) => {
    setSelectedHub(hub);
    const targetPhi = ((hub.lng - 90) * Math.PI) / 180;
    focusPhiRef.current = -targetPhi;
  };

  return (
    <div className={cn("relative flex flex-col justify-between h-full", className)}>
      {/* Interactive Globe Canvas Container */}
      <div className="relative mx-auto w-full max-w-[260px] aspect-square flex items-center justify-center">
        {webglSupported ? (
          <canvas
            ref={canvasRef}
            aria-label="Interactive 3D Export Network Globe across 48 countries"
            onPointerDown={(e) => {
              pointerInteracting.current =
                e.clientX - pointerInteractionMovement.current * 200;
              if (canvasRef.current) {
                canvasRef.current.style.cursor = "grabbing";
              }
            }}
            onPointerUp={() => {
              pointerInteracting.current = null;
              if (canvasRef.current) {
                canvasRef.current.style.cursor = "grab";
              }
            }}
            onPointerOut={() => {
              pointerInteracting.current = null;
              if (canvasRef.current) {
                canvasRef.current.style.cursor = "grab";
              }
            }}
            onPointerMove={(e) => {
              if (pointerInteracting.current !== null) {
                const delta = e.clientX - pointerInteracting.current;
                pointerInteractionMovement.current = delta / 200;
              }
            }}
            className="w-full h-full cursor-grab transition-opacity duration-500"
          />
        ) : (
          <div className="w-full h-full rounded-full border border-brand-primary/20 bg-canvas-subtle flex items-center justify-center p-6 text-center">
            <span className="font-traceability text-xs text-text-secondary">
              48 Global Export Markets Active
            </span>
          </div>
        )}
      </div>

      {/* Selected Hub Live Telemetry Card */}
      <div className="mt-2 rounded-2xl bg-canvas-light/90 border border-text-primary/10 p-3">
        <div className="flex items-center justify-between gap-2">
          <span className="font-traceability text-[10px] uppercase tracking-wider text-brand-accent font-semibold">
            {selectedHub.hubType}
          </span>
          <span className="font-traceability text-[10px] text-text-secondary">
            {selectedHub.leadTimeDays}
          </span>
        </div>
        <p className="mt-0.5 font-medium text-xs text-text-primary truncate">
          {selectedHub.name}
        </p>
        <p className="text-[11px] text-text-secondary truncate">
          {selectedHub.volumeShare}
        </p>

        {/* Quick Hub Pills */}
        {!compact && (
          <div className="mt-2.5 flex flex-wrap gap-1">
            {EXPORT_DESTINATIONS.slice(0, 5).map((hub) => {
              const isSelected = hub.name === selectedHub.name;
              const shortCity = hub.name.split(",")[0];
              return (
                <button
                  key={hub.name}
                  type="button"
                  onClick={() => handleSelectHub(hub)}
                  className={cn(
                    "px-2 py-0.5 rounded-full font-traceability text-[10px] transition-colors cursor-pointer",
                    isSelected
                      ? "bg-brand-primary text-text-inverse"
                      : "bg-surface-card text-text-secondary hover:text-text-primary border border-text-primary/10"
                  )}
                >
                  {shortCity}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
