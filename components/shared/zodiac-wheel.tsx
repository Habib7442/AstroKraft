"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ZodiacWheel({ className }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  const glyphs = [
    { symbol: "♈\uFE0E", name: "Aries" },
    { symbol: "♉\uFE0E", name: "Taurus" },
    { symbol: "♊\uFE0E", name: "Gemini" },
    { symbol: "♋\uFE0E", name: "Cancer" },
    { symbol: "♌\uFE0E", name: "Leo" },
    { symbol: "♍\uFE0E", name: "Virgo" },
    { symbol: "♎\uFE0E", name: "Libra" },
    { symbol: "♏\uFE0E", name: "Scorpio" },
    { symbol: "♐\uFE0E", name: "Sagittarius" },
    { symbol: "♑\uFE0E", name: "Capricorn" },
    { symbol: "♒\uFE0E", name: "Aquarius" },
    { symbol: "♓\uFE0E", name: "Pisces" },
  ];


  // Rotate starting point by -90 deg so Aries starts at the top
  const getCoordinates = (index: number, radius: number) => {
    const angleInRadians = ((index * 30 - 90) * Math.PI) / 180;
    const x = 150 + radius * Math.cos(angleInRadians);
    const y = 150 + radius * Math.sin(angleInRadians);
    return {
      x: parseFloat(x.toFixed(4)),
      y: parseFloat(y.toFixed(4)),
    };
  };


  return (
    <div
      className={cn(
        "relative w-full aspect-square max-w-[420px] mx-auto flex items-center justify-center pointer-events-none select-none",
        className
      )}
    >
      <motion.div
        className="w-full h-full"
        animate={shouldReduceMotion ? {} : { rotate: 360 }}
        transition={
          shouldReduceMotion
            ? {}
            : {
                repeat: Infinity,
                duration: 80,
                ease: "linear",
              }
        }
      >
        <svg
          viewBox="0 0 300 300"
          className="w-full h-full text-gold/30 dark:text-gold/20"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
        >
          {/* Outer Ring */}
          <circle cx="150" cy="150" r="140" strokeWidth="1" />
          <circle cx="150" cy="150" r="132" strokeWidth="0.5" strokeDasharray="1 3" />
          
          {/* Middle Ring for Glyphs boundary */}
          <circle cx="150" cy="150" r="108" strokeWidth="0.75" />
          <circle cx="150" cy="150" r="80" strokeWidth="0.75" />

          {/* Inner Medallion Ring */}
          <circle cx="150" cy="150" r="32" strokeWidth="1" />
          <circle cx="150" cy="150" r="26" strokeWidth="0.5" strokeDasharray="2 2" />

          {/* Rays / Slices (12 divisions at 30 deg intervals) */}
          {Array.from({ length: 12 }).map((_, i) => {
            const innerPt = getCoordinates(i, 32);
            const outerPt = getCoordinates(i, 140);
            return (
              <line
                key={i}
                x1={innerPt.x}
                y1={innerPt.y}
                x2={outerPt.x}
                y2={outerPt.y}
                strokeWidth="0.5"
              />
            );
          })}

          {/* Central Star Medallion */}
          <path
            d="M150 134 L154 146 L166 150 L154 154 L150 166 L146 154 L134 150 L146 146 Z"
            fill="var(--color-gold)"
            stroke="var(--color-gold)"
            strokeWidth="0.5"
            className="opacity-70 dark:opacity-85"
          />

          {/* Zodiac Glyphs */}
          {glyphs.map((glyph, i) => {
            // Position glyph in the middle of each sector (offset by 15 deg)
            const coords = getCoordinates(i + 0.5, 94);
            return (
              <text
                key={glyph.name}
                x={coords.x}
                y={coords.y + 4} // adjust baseline offset
                textAnchor="middle"
                className="fill-gold font-sans font-medium text-[13px] opacity-80 dark:opacity-90 select-none pointer-events-none"
                style={{ transformOrigin: `${coords.x}px ${coords.y}px` }}
              >
                {glyph.symbol}
              </text>
            );
          })}
        </svg>
      </motion.div>
    </div>
  );
}
