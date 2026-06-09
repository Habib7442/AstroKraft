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
    "rishi_acharya"
  ];

  const cardColors: Record<string, string> = {
    biprangshu_bhattacharjee: "bg-[#FFF9E6]",
    acharya_bhakta_vedanta: "bg-[#E5D5FF]",
    acharya_sneha: "bg-[#FFD0C8]",
    acharya_abhi_shastri: "bg-[#FEF08A]",
    astrologer_indrajit_dutta: "bg-[#C6F6D5]",
    rishi_acharya: "bg-[#E0F2FE]"
  };

  return (
    <section className="w-full py-16 px-6 md:px-12 lg:px-16 bg-[#FFFDF0]/50 relative border-t-[3px] border-black">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-4.5 py-1.5 border-2 border-black bg-[#FFC000] text-black text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-[2.5px_2.5px_0px_#000] select-none rounded-full">
            ✦ Divine Team of Experts
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-black">
            Meet Our Master Astrologers
          </h2>
          <p className="max-w-2xl text-black font-semibold text-sm sm:text-base font-sans leading-relaxed">
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

            if (isMain) {
              return (
                <div
                  key={key}
                  className={cn(
                    "group/bento shadow-[5px_5px_0px_#000] md:col-span-2 md:row-span-2 flex flex-col justify-between rounded-2xl border-[3px] border-black p-6 relative overflow-hidden text-black transition-all duration-200 hover:shadow-[7px_7px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000] min-h-[30rem] md:min-h-0 will-change-transform [transform:translate3d(0,0,0)]",
                    cardColors[key] || "bg-white"
                  )}
                >
                  {/* Top: Profile Header & Layout */}
                  <div className="flex flex-col md:flex-row gap-6 items-stretch relative z-10 h-full w-full">
                    {/* Left/Top: Giant Avatar frame */}
                    <div className="flex flex-col items-start shrink-0">
                      <a href={`/${locale}/astrologers/${key}`} className="block hover:opacity-95 transition-opacity">
                        <div className="relative">
                          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-[3px] border-black bg-white shadow-[3px_3px_0px_#000] p-1">
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
                            <span className="relative inline-flex rounded-full h-3.5 w-3.5 border-2 border-black bg-emerald-500 shadow-sm" />
                          </span>
                        </div>
                      </a>

                      {/* Prominent Badges */}
                      <span className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black tracking-wider uppercase border-2 border-black bg-white text-black shadow-[2px_2px_0px_#000] whitespace-nowrap">
                        ✦ Director
                      </span>

                      {/* Languages Spoken */}
                      <div className="flex flex-wrap gap-1.5 mt-3.5 max-w-[120px]">
                        {ast.languages[activeLocale]?.map((lang) => (
                          <span key={lang} className="px-2 py-0.5 rounded border-2 border-black bg-[#E5D5FF] text-[9px] text-black font-black uppercase tracking-wider shadow-[1.5px_1.5px_0px_#000]">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right/Bottom: Description and Info */}
                    <div className="flex-1 flex flex-col justify-between gap-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-black pb-2.5">
                          <h3 className="font-serif text-2xl sm:text-3xl font-black tracking-tight text-black hover:text-[#FFC000] transition-colors">
                            <a href={`/${locale}/astrologers/${key}`}>
                              {ast.name}
                            </a>
                          </h3>
                          {/* Rating & reviews */}
                          <div className="flex items-center gap-1.5 bg-white border-2 border-black px-3 py-1 rounded-full text-xs font-black text-black shadow-[2px_2px_0px_#000] w-fit whitespace-nowrap shrink-0">
                            <Star className="w-3.5 h-3.5 text-[#FFC000] fill-[#FFC000] stroke-black stroke-2 shrink-0" />
                            <span>{ast.rating} / 5</span>
                            <span className="text-neutral-500 text-[10px] font-black">({ast.reviews} reviews)</span>
                          </div>
                        </div>

                        <span className="text-xs font-black text-black bg-white border-2 border-black px-2.5 py-0.5 rounded-full w-fit shadow-[1.5px_1.5px_0px_#000] font-sans tracking-wide">
                          {specialtyText}
                        </span>

                        <p className="text-xs sm:text-sm text-neutral-600 font-semibold leading-relaxed font-sans mt-1">
                          {descText}
                        </p>
                      </div>

                      {/* Detail Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1 text-xs">
                        <div className="flex items-center gap-2.5 text-neutral-600 font-black">
                          <Award className="w-4 h-4 text-black stroke-[2.5px] shrink-0" />
                          <span>Experience: <strong className="text-black font-black">{ast.experience} Years</strong></span>
                        </div>
                        <div className="flex items-center gap-2.5 text-neutral-600 font-black">
                          <MapPin className="w-4 h-4 text-black stroke-[2.5px] shrink-0" />
                          <span className="truncate">Address: <strong className="text-black font-black">{addressText}</strong></span>
                        </div>
                        <div className="flex items-center gap-2.5 text-neutral-600 font-black font-sans">
                          <Phone className="w-4 h-4 text-black stroke-[2.5px] shrink-0" />
                          <span>Phone: <a href={`tel:${ast.phone}`} className="hover:text-[#FFC000] hover:underline transition-colors">{ast.phone}</a></span>
                        </div>
                        <div className="flex items-center gap-2.5 text-neutral-600 font-black font-sans">
                          <Mail className="w-4 h-4 text-black stroke-[2.5px] shrink-0" />
                          <span className="truncate">Email: <a href={`mailto:${ast.email}`} className="hover:text-[#FFC000] hover:underline transition-colors">{ast.email}</a></span>
                        </div>
                      </div>

                      {/* Bottom Button */}
                      <div className="flex items-center justify-between gap-4 mt-2 pt-4 border-t-2 border-black">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-neutral-500 uppercase font-black tracking-wider">Consultation Fee</span>
                          <span className="font-serif font-black text-xl text-black">₹{ast.fee.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <a
                            href={`/${locale}/astrologers/${key}`}
                            className="text-xs font-black text-black hover:bg-neutral-50 hover:shadow-[3px_3px_0px_#000] hover:-translate-y-[1px] hover:-translate-x-[1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all px-4 py-2 rounded-full border-2 border-black bg-white shadow-[2px_2px_0px_#000]"
                          >
                            View Profile
                          </a>
                          <a
                            href={`/${locale}/consultation?astrologer=${key}`}
                            className="flex items-center justify-center gap-2 bg-[#FFC000] hover:bg-[#FFC000]/95 text-black border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:-translate-y-[1px] hover:-translate-x-[1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all text-xs font-black py-2 px-5 rounded-full cursor-pointer"
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
                  "group/bento shadow-[4px_4px_0px_#000] row-span-1 flex flex-col justify-between space-y-3.5 rounded-2xl border-[3px] border-black p-4.5 transition-all duration-200 hover:shadow-[6px_6px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000] text-black relative overflow-hidden will-change-transform [transform:translate3d(0,0,0)]",
                  cardColors[key] || "bg-white"
                )}
              >
                {/* Header info */}
                <div className="flex items-start justify-between gap-3 relative z-10">
                  {/* Small Avatar Frame with Status */}
                  <div className="relative shrink-0">
                    <a href={`/${locale}/astrologers/${key}`} className="block hover:opacity-95 transition-opacity">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-black bg-[#FFE4A0] shadow-[2px_2px_0px_#000] p-0.5">
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
                          "relative inline-flex rounded-full h-3 w-3 border-2 border-black",
                          isOnline ? "bg-emerald-500" : "bg-amber-500"
                        )} />
                      </span>
                    </a>
                  </div>

                  {/* Right Header: Rating & Experience */}
                  <div className="flex flex-col items-end text-right gap-1 font-sans text-[10px] font-black">
                    <div className="flex items-center gap-0.5 bg-white border border-black px-1.5 py-0.5 rounded-full shadow-[1px_1px_0px_#000] text-black font-black">
                      <Star className="w-2.5 h-2.5 text-[#FFC000] fill-[#FFC000] stroke-black stroke-[1.5px] shrink-0" />
                      <span>{ast.rating}</span>
                    </div>
                    <span className="text-neutral-500">{ast.experience} Yrs Exp</span>
                  </div>
                </div>

                {/* Body info */}
                <div className="flex-1 flex flex-col justify-between mt-2 gap-3 relative z-10">
                  <div className="flex flex-col gap-1">
                    <h4 className="font-serif font-black text-sm text-black tracking-wide hover:text-[#FFC000] transition-colors">
                      <a href={`/${locale}/astrologers/${key}`}>
                        {ast.name}
                      </a>
                    </h4>
                    <p className="text-[10px] text-black font-black bg-white border border-black px-2 py-0.5 rounded-full w-fit shadow-[1px_1px_0px_#000] leading-none">
                      {specialtyText}
                    </p>
                    <p className="text-[11px] text-neutral-600 font-semibold line-clamp-2 leading-relaxed mt-1.5 font-sans">
                      {descText}
                    </p>
                  </div>

                  {/* Actions & Fee */}
                  <div className="flex items-center justify-between border-t-2 border-black pt-3.5 mt-3.5 text-[11px]">
                    <div className="flex flex-col">
                      <span className="text-[8px] text-neutral-500 uppercase font-black tracking-wider">Fee</span>
                      <span className="font-serif font-black text-black">₹{ast.fee.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={`/${locale}/astrologers/${key}`}
                        className="text-[10px] font-black text-black hover:bg-neutral-50 hover:shadow-[3px_3px_0px_#000] hover:-translate-y-[1px] hover:-translate-x-[1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all py-1.5 px-3 rounded-full border-2 border-black bg-white shadow-[2px_2px_0px_#000]"
                      >
                        Profile
                      </a>
                      <a
                        href={`/${locale}/consultation?astrologer=${key}`}
                        className="flex items-center justify-center bg-[#FFC000] hover:bg-[#FFC000]/95 text-black hover:shadow-[3px_3px_0px_#000] hover:-translate-y-[1px] hover:-translate-x-[1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all py-1.5 px-3.5 rounded-full border-2 border-black shadow-[2px_2px_0px_#000] text-[10px] font-black cursor-pointer"
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
