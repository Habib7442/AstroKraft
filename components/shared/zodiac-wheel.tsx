import React from "react";
import { cn } from "@/lib/utils";

export function ZodiacWheel({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-full aspect-square max-w-[420px] mx-auto flex items-center justify-center pointer-events-none select-none",
        className
      )}
    >
      <img
        src="/assets/zodiac_wheel.png"
        alt="Zodiac Wheel"
        className="w-full h-full object-contain opacity-80 dark:opacity-90 rounded-full"
      />
    </div>
  );
}
