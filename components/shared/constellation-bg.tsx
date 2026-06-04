"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

interface Star {
  id: number;
  cx: number;
  cy: number;
  r: number;
  twinkle: boolean;
  delay: string;
}

interface ConstellationLine {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export function ConstellationBg({ className }: { className?: string }) {
  // Deterministic stars list to prevent hydration mismatch.
  const stars: Star[] = useMemo(() => {
    const points = [
      { x: 12, y: 15, r: 1.2, t: true, d: "0s" },
      { x: 28, y: 8, r: 1.5, t: false, d: "0s" },
      { x: 45, y: 22, r: 1.0, t: true, d: "1.5s" },
      { x: 62, y: 14, r: 2.0, t: true, d: "0.5s" },
      { x: 80, y: 25, r: 1.2, t: false, d: "0s" },
      { x: 92, y: 10, r: 1.8, t: true, d: "2s" },

      { x: 8, y: 48, r: 1.5, t: false, d: "0s" },
      { x: 23, y: 38, r: 2.2, t: true, d: "1s" },
      { x: 37, y: 55, r: 1.2, t: true, d: "2.5s" },
      { x: 55, y: 42, r: 2.5, t: false, d: "0s" },
      { x: 74, y: 52, r: 1.5, t: true, d: "0.8s" },
      { x: 88, y: 38, r: 2.0, t: true, d: "1.8s" },

      { x: 15, y: 78, r: 1.8, t: true, d: "2.2s" },
      { x: 30, y: 68, r: 1.2, t: false, d: "0s" },
      { x: 48, y: 85, r: 2.2, t: true, d: "0.3s" },
      { x: 68, y: 75, r: 1.5, t: true, d: "1.2s" },
      { x: 82, y: 88, r: 2.0, t: false, d: "0s" },
      { x: 95, y: 70, r: 1.2, t: true, d: "2.7s" },

      // Extra small stars for depth
      { x: 5, y: 25, r: 0.8, t: true, d: "0.7s" },
      { x: 19, y: 92, r: 0.9, t: true, d: "1.9s" },
      { x: 35, y: 15, r: 0.7, t: false, d: "0s" },
      { x: 50, y: 10, r: 0.8, t: true, d: "1.4s" },
      { x: 67, y: 30, r: 0.9, t: true, d: "2.1s" },
      { x: 78, y: 5, r: 0.7, t: false, d: "0s" },
      { x: 85, y: 60, r: 0.8, t: true, d: "0.2s" },
    ];

    return points.map((p, idx) => ({
      id: idx,
      cx: p.x,
      cy: p.y,
      r: p.r,
      twinkle: p.t,
      delay: p.d,
    }));
  }, []);

  // Fine constellation connection lines between specific stars
  const lines: ConstellationLine[] = useMemo(() => {
    return [
      { id: 1, x1: 12, y1: 15, x2: 28, y2: 8 },
      { id: 2, x1: 28, y1: 8, x2: 45, y2: 22 },
      { id: 3, x1: 45, y1: 22, x2: 23, y2: 38 },
      { id: 4, x1: 23, y1: 38, x2: 8, y2: 48 },

      { id: 5, x1: 62, y1: 14, x2: 80, y2: 25 },
      { id: 6, x1: 80, y1: 25, x2: 88, y2: 38 },
      { id: 7, x1: 88, y1: 38, x2: 74, y2: 52 },
      { id: 8, x1: 74, y1: 52, x2: 55, y2: 42 },
      { id: 9, x1: 55, y1: 42, x2: 62, y2: 14 },

      { id: 10, x1: 15, y1: 78, x2: 30, y2: 68 },
      { id: 11, x1: 30, y1: 68, x2: 48, y2: 85 },
      { id: 12, x1: 48, y1: 85, x2: 68, y2: 75 },
      { id: 13, x1: 68, y1: 75, x2: 82, y2: 88 },
      { id: 14, x1: 82, y1: 88, x2: 95, y2: 70 },
    ];
  }, []);

  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none select-none overflow-hidden opacity-30 dark:opacity-40",
        className
      )}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Constellation Lines */}
        {lines.map((line) => (
          <line
            key={line.id}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke="var(--color-gold)"
            strokeWidth="0.08"
            className="opacity-25 dark:opacity-40"
          />
        ))}

        {/* Stars */}
        {stars.map((star) => (
          <circle
            key={star.id}
            cx={`${star.cx}%`}
            cy={`${star.cy}%`}
            r={star.r * 0.15}
            fill={star.twinkle ? "var(--color-gold)" : "currentColor"}
            className={cn(
              star.twinkle && "motion-safe:animate-pulse",
              "text-muted-foreground/60 dark:text-foreground/80"
            )}
            style={
              star.twinkle
                ? {
                    animationDuration: "3s",
                    animationDelay: star.delay,
                  }
                : undefined
            }
          />
        ))}
      </svg>
    </div>
  );
}
