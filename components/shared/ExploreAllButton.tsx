"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExploreAllButtonProps {
  href: string;
  label: string;
  className?: string;
}

export function ExploreAllButton({ href, label, className }: ExploreAllButtonProps) {
  return (
    <div className="flex justify-center w-full mt-6 select-none">
      <Link
        href={href}
        className={cn(
          "group inline-flex items-center gap-2 px-8 py-3 rounded-full border border-violet text-violet hover:bg-violet hover:text-white bg-transparent font-black text-[11px] uppercase tracking-widest transition-all duration-300 shadow-sm hover:shadow-md active:scale-95",
          className
        )}
      >
        <span>{label}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
      </Link>
    </div>
  );
}
