"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import ASTROLOGERS_DATA from "@/lib/data/astrologer.json";
import { MessageSquare } from "lucide-react";
import type { Astrologer } from "@/types/sanity";

interface AstrologerInfo {
  name: string;
  specialty: Record<string, string>;
  description: Record<string, string>;
  experience: number;
  rating: number;
  reviews: number;
  languages: Record<string, string[]>;
  address: Record<string, string>;
  phone: string;
  email: string;
  fee: number;
  status: "online" | "busy";
  src: string;
}

const ASTROLOGERS = ASTROLOGERS_DATA as Record<string, AstrologerInfo>;

interface AstrologersRowProps {
  locale: string;
  astrologers?: Astrologer[];
}

export function AstrologersRow({ locale, astrologers = [] }: AstrologersRowProps) {
  const activeLocale = ["en", "hin", "bn"].includes(locale) ? locale : "en";

  // Normalize Sanity data and static mock fallback data
  const list = (astrologers && astrologers.length > 0)
    ? astrologers.map(item => {
        const slugVal = item.slug?.current || item.name.toLowerCase().replace(/\s+/g, "-");
        const photoUrl = item.photo ? urlFor(item.photo).width(200).height(200).fit('crop').auto('format').url() : "/placeholder-image.jpg";
        const specialtyText = item.consultationCategory?.title || item.specializations?.[0] || "Vedic Astrology";
        return {
          id: item._id,
          slug: slugVal,
          name: item.name,
          photoUrl: photoUrl,
          specialty: specialtyText,
          languages: item.languages || [],
          fee: item.baseFee || 0
        };
      })
    : Object.entries(ASTROLOGERS).map(([key, ast]) => {
        const specialtyText = ast.specialty[activeLocale] || ast.specialty["en"];
        const langs = ast.languages[activeLocale] || ast.languages["en"] || [];
        return {
          id: key,
          slug: key,
          name: ast.name,
          photoUrl: ast.src,
          specialty: specialtyText,
          languages: langs,
          fee: ast.fee
        };
      });

  return (
    <section id="astrologers-section" className="w-full py-16 bg-base stars-bg relative overflow-hidden border-b border-border/40">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 px-4.5 py-1.5 border border-card-border bg-gold-soft/10 text-gold text-[10px] sm:text-xs font-bold uppercase tracking-wider select-none rounded-full">
            ✦ {activeLocale === "hin" ? "दिव्य विशेषज्ञों की टीम" : activeLocale === "bn" ? "ঐশ্বরিক বিশেষজ্ঞ দল" : "Divine Team of Experts"}
          </span>
          <h2 className="t-h2 text-ink">
            {activeLocale === "hin" ? "हमारे मास्टर ज्योतिषी" : activeLocale === "bn" ? "আমাদের মাস্টার জ্যোতিষী" : "Meet Our Master Astrologers"}
          </h2>
        </div>

        {/* Astrologers Horizontal Scroll Row */}
        <div 
          className="flex overflow-x-auto gap-4 sm:gap-5 w-full no-scrollbar scroll-smooth py-2 px-1 select-none"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none"
          }}
        >
          {list.map((ast) => {
            return (
              <div
                key={ast.id}
                className="group relative flex flex-col justify-between p-5 rounded-2xl border border-card-border bg-white shadow-card hover:shadow-cardHover hover:-translate-y-1 active:translate-y-0 transition-all duration-300 w-[190px] sm:w-[220px] shrink-0"
              >
                <div className="flex flex-col items-center w-full">
                  {/* Photo (round frame) */}
                  <a href={`/${locale}/astrologers/${ast.slug}`} className="block hover:opacity-95 transition-opacity">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-border bg-card p-1">
                      <img
                        src={ast.photoUrl}
                        alt={ast.name}
                        className="w-full h-full object-cover rounded-full select-none"
                        draggable={false}
                      />
                    </div>
                  </a>

                  {/* Name */}
                  <h3 className="font-sans text-xs sm:text-sm font-extrabold text-ink mt-4 tracking-tight text-center line-clamp-1 uppercase hover:text-violet transition-colors">
                    <a href={`/${locale}/astrologers/${ast.slug}`}>
                      {ast.name}
                    </a>
                  </h3>

                  {/* Expertise / Specialty */}
                  <span className="mt-2 text-[10px] font-bold text-violet bg-violet/5 border border-violet/10 px-2 py-0.5 rounded-full w-fit shadow-sm font-sans tracking-wide text-center truncate max-w-full uppercase">
                    {ast.specialty}
                  </span>

                  {/* Languages */}
                  <div className="flex flex-wrap justify-center gap-1 mt-3">
                    {ast.languages.slice(0, 3).map((lang) => (
                      <span key={lang} className="px-1.5 py-0.5 rounded border border-violet/20 bg-violet/5 text-violet text-[9px] font-bold uppercase tracking-wider shadow-sm">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Consultation Fee & Booking Action */}
                <div className="flex flex-col gap-3 mt-5 pt-3.5 border-t border-border/40 w-full">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[9px] text-ink-muted uppercase font-bold tracking-wider">Fee</span>
                    <span className="font-serif font-black text-sm sm:text-base text-ink">₹{ast.fee.toFixed(2)}</span>
                  </div>

                  <a
                    href={`/${locale}/consultation?astrologer=${ast.slug}`}
                    className="flex items-center justify-center gap-1.5 bg-[#E2C27A] hover:bg-[#d4b36a] text-black shadow-sm transition-all text-[10px] font-black py-2.5 px-4 rounded-xl uppercase tracking-wider border border-[#E2C27A]/50"
                  >
                    <MessageSquare className="w-3.5 h-3.5 shrink-0 text-black fill-black" />
                    <span>Consult Now</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
