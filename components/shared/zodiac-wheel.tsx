import React from "react";
import { cn } from "@/lib/utils";

const ZODIAC_WHEEL_SRC = "/assets/zodiac_wheel.png?v=20260610";

export function ZodiacWheel({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-full aspect-square max-w-[420px] mx-auto flex items-center justify-center pointer-events-none select-none",
        className
      )}
    >
      <img
        src={ZODIAC_WHEEL_SRC}
        alt="Zodiac Wheel"
        className="w-full h-full object-contain opacity-80 dark:opacity-90 rounded-full"
      />
    </div>
  );
}
