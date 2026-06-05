"use client";

import React from "react";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { cn } from "@/lib/utils";

interface PointerHighlightTextProps {
  /** The full text sentence/string containing the words to highlight */
  text: string;
  /** The exact word or phrase to be wrapped with the pointer highlight animation */
  highlight: string;
  /** Optional class name for the wrapper element */
  className?: string;
  /** Optional class name for the highlighted word */
  highlightClassName?: string;
  /** Custom border/rectangle styles for the pointer highlight box */
  rectangleClassName?: string;
  /** Custom pointer cursor SVG color/styles */
  pointerClassName?: string;
}

export function PointerHighlightText({
  text,
  highlight,
  className,
  highlightClassName,
  rectangleClassName,
  pointerClassName,
}: PointerHighlightTextProps) {
  if (!highlight) {
    return <span className={className}>{text}</span>;
  }

  // Split the text case-insensitively while preserving the matched separator groups
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));

  return (
    <span className={cn("inline-flex flex-wrap items-center gap-x-2 gap-y-1.5", className)}>
      {parts.map((part, index) => {
        const isHighlight = part.toLowerCase() === highlight.toLowerCase();
        return isHighlight ? (
          <PointerHighlight
            key={index}
            rectangleClassName={cn("border-gold/60 dark:border-gold/80 bg-gold/5", rectangleClassName)}
            pointerClassName={cn("text-gold fill-gold", pointerClassName)}
            containerClassName="inline-block"
          >
            <span className={cn("text-gold px-1.5 font-bold relative z-10", highlightClassName)}>
              {part}
            </span>
          </PointerHighlight>
        ) : (
          <span key={index}>{part}</span>
        );
      })}
    </span>
  );
}

export default PointerHighlightText;
