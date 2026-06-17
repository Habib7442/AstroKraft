"use client";

import React from "react";
import { BentoGrid } from "@/components/ui/bento-grid";
import ASTROLOGERS_DATA from "@/lib/data/astrologer.json";
import { Star, Award, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface BentoGridDemoProps {
  locale?: string;
}

export default function BentoGridDemo({ locale = "en" }: BentoGridDemoProps) {
  const activeLocale = ["en", "hin", "bn"].includes(locale) ? locale : "en";

  // Order astrologers so Biprangshu is first to align layout
  const orderedKeys = [
    "biprangshu_bhattacharjee",
    "acharya_bhakta_vedanta",
    "acharya_sneha",
    "acharya_abhi_shastri",
    "astrologer_indrajit_dutta",
    "rishi_acharya",
    "test_astrologer"
  ];

  const cardColors: Record<string, string> = {
    biprangshu_bhattacharjee: "bg-[#FFF9E6]",
    acharya_bhakta_vedanta: "bg-[#E5D5FF]",
    acharya_sneha: "bg-[#FFD0C8]",
    acharya_abhi_shastri: "bg-[#FEF08A]",
    astrologer_indrajit_dutta: "bg-[#C6F6D5]",
    rishi_acharya: "bg-[#E0F2FE]",
    test_astrologer: "bg-[#FFF9E6]"
  };

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-base stars-bg relative border-t border-border/40">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-4.5 py-1.5 border border-card-border bg-gold-soft/10 text-gold text-[10px] sm:text-xs font-bold uppercase tracking-wider select-none rounded-full">
            ✦ Divine Team of Experts
          </span>
          <h2 className="t-h2 text-ink">
            Meet Our Master Astrologers
          </h2>
          <p className="max-w-2xl text-ink-body font-medium text-sm sm:text-base font-sans leading-relaxed">
            Consult India's top astrologers and Vastu experts for accurate horoscope compatibility, gemstone selections, and ancient Vedic remedies.
          </p>
        </div>

        {/* Bento Grid */}
        <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[17.5rem]">
          {orderedKeys.map((key) => {
            const ast = ASTROLOGERS[key];
            if (!ast) return null;

            const isMain = key === "biprangshu_bhattacharjee";
            const specialtyText = ast.specialty[activeLocale] || ast.specialty["en"];
            const descText = ast.description[activeLocale] || ast.description["en"];
            const addressText = ast.address[activeLocale] || ast.address["en"];

            const cardCornerColors: Record<string, string> = {
              biprangshu_bhattacharjee: "#FFF9E6",
              acharya_bhakta_vedanta: "#E5D5FF",
              acharya_sneha: "#FFD0C8",
              acharya_abhi_shastri: "#FEF08A",
              astrologer_indrajit_dutta: "#C6F6D5",
              rishi_acharya: "#E0F2FE",
              test_astrologer: "#FFF9E6"
            };
            const cornerColor = cardCornerColors[key] || "#E5D5FF";

            if (isMain) {
              return (
                <div
                  key={key}
                  className={cn(
                    "group/bento shadow-card hover:shadow-cardHover md:col-span-2 md:row-span-2 flex flex-col justify-between rounded-2xl border border-card-border p-6 relative overflow-hidden text-ink-body transition-all duration-300 hover:-translate-y-1 min-h-[30rem] md:min-h-0 will-change-transform [transform:translate3d(0,0,0)] backdrop-blur-md"
                  )}
                  style={{
                    background: `radial-gradient(circle at top right, ${cornerColor} 0%, rgba(255, 255, 255, 0.85) 55%, rgba(255, 255, 255, 0.95) 100%)`
                  }}
                >
                  {/* Top: Profile Header & Layout */}
                  <div className="flex flex-col md:flex-row gap-6 items-stretch relative z-10 h-full w-full">
                    {/* Left/Top: Giant Avatar frame */}
                    <div className="flex flex-col items-start shrink-0">
                      <a href={`/${locale}/astrologers/${key}`} className="block hover:opacity-95 transition-opacity">
                        <div className="relative">
                          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-border bg-card p-1">
                            <img
                              src={ast.src}
                              alt={ast.name}
                              className="w-full h-full object-cover rounded-full select-none"
                              draggable={false}
                            />
                          </div>
                          {/* Live Status indicator */}
                          <span className="absolute bottom-0.5 right-0.5 flex h-3.5 w-3.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-emerald-400" />
                            <span className="relative inline-flex rounded-full h-3.5 w-3.5 border border-card bg-emerald-500 shadow-sm" />
                          </span>
                        </div>
                      </a>

                      {/* Prominent Badges */}
                      <span className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border border-card-border bg-gold-soft/10 text-gold shadow-sm whitespace-nowrap">
                        ✦ Director
                      </span>

                      {/* Languages Spoken */}
                      <div className="flex flex-wrap gap-1.5 mt-3.5 max-w-[120px]">
                        {ast.languages[activeLocale]?.map((lang) => (
                          <span key={lang} className="px-2 py-0.5 rounded border border-violet/20 bg-violet/5 text-violet text-[9px] font-bold uppercase tracking-wider shadow-sm">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right/Bottom: Description and Info */}
                    <div className="flex-1 flex flex-col justify-between gap-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-2.5">
                          <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-ink hover:text-violet transition-colors">
                            <a href={`/${locale}/astrologers/${key}`}>
                              {ast.name}
                            </a>
                          </h3>
                          {/* Rating & reviews */}
                          <div className="flex items-center gap-1.5 bg-base border border-card-border px-3 py-1 rounded-full text-xs font-bold text-gold shadow-sm w-fit whitespace-nowrap shrink-0">
                            <Star className="w-3.5 h-3.5 text-[#B8860B] fill-[#B8860B] shrink-0" />
                            <span>{ast.rating} / 5</span>
                            <span className="text-ink-muted text-[10px] font-bold">({ast.reviews} reviews)</span>
                          </div>
                        </div>

                        <span className="text-xs font-bold text-violet bg-violet/5 border border-violet/10 px-2.5 py-0.5 rounded-full w-fit shadow-sm font-sans tracking-wide">
                          {specialtyText}
                        </span>

                        <p className="text-xs sm:text-sm text-ink-body font-medium leading-relaxed font-sans mt-1">
                          {descText}
                        </p>
                      </div>

                      {/* Detail Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1 text-xs">
                        <div className="flex items-center gap-2.5 text-ink-muted font-bold">
                          <Award className="w-4 h-4 text-ink-muted stroke-[1.5px] shrink-0" />
                          <span>Experience: <strong className="text-ink-body font-bold">{ast.experience} Years</strong></span>
                        </div>
                        <div className="flex items-center gap-2.5 text-ink-muted font-bold">
                          <MapPin className="w-4 h-4 text-ink-muted stroke-[1.5px] shrink-0" />
                          <span className="truncate">Address: <strong className="text-ink-body font-bold">{addressText}</strong></span>
                        </div>
                        <div className="flex items-center gap-2.5 text-ink-muted font-bold font-sans">
                          <Phone className="w-4 h-4 text-ink-muted stroke-[1.5px] shrink-0" />
                          <span>Phone: <a href={`tel:${ast.phone}`} className="hover:text-violet hover:underline transition-colors">{ast.phone}</a></span>
                        </div>
                        <div className="flex items-center gap-2.5 text-ink-muted font-bold font-sans">
                          <Mail className="w-4 h-4 text-ink-muted stroke-[1.5px] shrink-0" />
                          <span className="truncate">Email: <a href={`mailto:${ast.email}`} className="hover:text-violet hover:underline transition-colors">{ast.email}</a></span>
                        </div>
                      </div>

                      {/* Bottom Button */}
                      <div className="flex items-center justify-between gap-4 mt-2 pt-4 border-t border-border/40">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-ink-muted uppercase font-bold tracking-wider">Consultation Fee</span>
                          <span className="font-serif font-bold text-xl text-ink">₹{ast.fee.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <a
                            href={`/${locale}/astrologers/${key}`}
                            className="text-xs font-bold text-violet border border-violet bg-white hover:bg-[#F3EEFB] transition-all px-4 py-2 rounded-full shadow-sm"
                          >
                            View Profile
                          </a>
                          <a
                            href={`/${locale}/consultation?astrologer=${key}`}
                            className="flex items-center justify-center gap-2 bg-violet hover:bg-violet-bright text-white shadow-sm transition-all text-xs font-bold py-2 px-5 rounded-full cursor-pointer border-0"
                          >
                            Consult Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Standard Astrologer Card (col-span-1, row-span-1)
            const isOnline = ast.status === "online";
            return (
              <div
                key={key}
                className={cn(
                  "group/bento shadow-card hover:shadow-cardHover row-span-1 flex flex-col justify-between space-y-3.5 rounded-2xl border border-card-border p-4.5 transition-all duration-300 hover:-translate-y-1 text-ink-body relative overflow-hidden will-change-transform [transform:translate3d(0,0,0)] backdrop-blur-md"
                )}
                style={{
                  background: `radial-gradient(circle at top right, ${cornerColor} 0%, rgba(255, 255, 255, 0.85) 55%, rgba(255, 255, 255, 0.95) 100%)`
                }}
              >
                {/* Header info */}
                <div className="flex items-start justify-between gap-3 relative z-10">
                  {/* Small Avatar Frame with Status */}
                  <div className="relative shrink-0">
                    <a href={`/${locale}/astrologers/${key}`} className="block hover:opacity-95 transition-opacity">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-border bg-card p-0.5">
                        <img
                          src={ast.src}
                          alt={ast.name}
                          className="w-full h-full object-cover rounded-full"
                          draggable={false}
                        />
                      </div>
                      {/* Status Badge */}
                      <span className="absolute bottom-0.5 right-0.5 flex h-3 w-3">
                        <span className={cn(
                          "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                          isOnline ? "bg-emerald-400" : "bg-amber-400"
                        )} />
                        <span className={cn(
                          "relative inline-flex rounded-full h-3 w-3 border border-card",
                          isOnline ? "bg-emerald-500" : "bg-amber-500"
                        )} />
                      </span>
                    </a>
                  </div>

                  {/* Right Header: Rating & Experience */}
                  <div className="flex flex-col items-end text-right gap-1 font-sans text-[10px] font-bold">
                    <div className="flex items-center gap-0.5 bg-base border border-card-border px-1.5 py-0.5 rounded-full shadow-sm text-gold font-bold">
                      <Star className="w-2.5 h-2.5 text-[#B8860B] fill-[#B8860B] shrink-0" />
                      <span>{ast.rating}</span>
                    </div>
                    <span className="text-ink-muted">{ast.experience} Yrs Exp</span>
                  </div>
                </div>

                {/* Body info */}
                <div className="flex-1 flex flex-col justify-between mt-2 gap-3 relative z-10">
                  <div className="flex flex-col gap-1">
                    <h4 className="font-serif font-bold text-sm text-ink tracking-wide hover:text-violet transition-colors">
                      <a href={`/${locale}/astrologers/${key}`}>
                        {ast.name}
                      </a>
                    </h4>
                    <p className="text-[10px] text-violet font-bold bg-violet/5 border border-violet/10 px-2 py-0.5 rounded-full w-fit shadow-sm leading-none">
                      {specialtyText}
                    </p>
                    <p className="text-[11px] text-ink-body font-medium line-clamp-2 leading-relaxed mt-1.5 font-sans">
                      {descText}
                    </p>
                  </div>

                  {/* Actions & Fee */}
                  <div className="flex items-center justify-between border-t border-border/40 pt-3.5 mt-3.5 text-[11px]">
                    <div className="flex flex-col">
                      <span className="text-[8px] text-ink-muted uppercase font-bold tracking-wider">Fee</span>
                      <span className="font-serif font-bold text-ink">₹{ast.fee.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={`/${locale}/astrologers/${key}`}
                        className="text-[10px] font-bold text-violet border border-violet bg-white hover:bg-[#F3EEFB] transition-all py-1.5 px-3 rounded-full shadow-sm"
                      >
                        Profile
                      </a>
                      <a
                        href={`/${locale}/consultation?astrologer=${key}`}
                        className="flex items-center justify-center bg-violet hover:bg-violet-bright text-white transition-all py-1.5 px-3.5 rounded-full shadow-sm text-[10px] font-bold cursor-pointer border-0"
                      >
                        Consult
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}
