"use client";

import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import servicesData from "@/lib/data/services.json";

interface ServicesRowProps {
  locale: string;
  dict: any;
}

const serviceButtonStyles: Record<string, string> = {
  astrologer: "text-[#b28b3a] border-amber-200/50 bg-amber-50/40 group-hover:bg-[#FFE4A0] group-hover:text-black group-hover:border-[#FFE4A0]",
  gemstone: "text-purple-700 border-purple-200/50 bg-purple-50/40 group-hover:bg-[#E5D5FF] group-hover:text-black group-hover:border-[#E5D5FF]",
  purohit: "text-rose-600 border-rose-200/50 bg-rose-50/40 group-hover:bg-[#FFD0C8] group-hover:text-black group-hover:border-[#FFD0C8]",
  vastu_consult: "text-emerald-700 border-emerald-200/50 bg-emerald-50/40 group-hover:bg-[#C6F6D5] group-hover:text-black group-hover:border-[#C6F6D5]",
  vastu_plan: "text-sky-700 border-sky-200/50 bg-sky-50/40 group-hover:bg-[#E0F2FE] group-hover:text-black group-hover:border-[#E0F2FE]",
  kundli_match: "text-yellow-700 border-yellow-250/50 bg-yellow-50/40 group-hover:bg-[#FEF08A] group-hover:text-black group-hover:border-[#FEF08A]"
};

export function ServicesRow({ locale, dict }: ServicesRowProps) {
  const activeLocale = ["en", "hin", "bn"].includes(locale) ? locale : "en";

  return (
    <section className="w-full py-16 px-6 md:px-12 lg:px-16 bg-base stars-bg relative overflow-hidden border-b border-border/40">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 px-4.5 py-1.5 border border-card-border bg-gold-soft/10 text-gold text-[10px] sm:text-xs font-bold uppercase tracking-wider select-none rounded-full">
            ✦ {activeLocale === "hin" ? "दिव्य सेवाएं" : activeLocale === "bn" ? "স্বর্গীয় পরিষেবা" : "Divine Offerings"}
          </span>
          <h2 className="t-h2 text-ink">
            {activeLocale === "hin" ? "हमारी प्रीमियम सेवाएं" : activeLocale === "bn" ? "আমাদের প্রিমিয়াম পরিষেবা" : "Our Premium Services"}
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 w-full">
          {servicesData.map((service) => {
            const titleText = service.title[activeLocale as keyof typeof service.title] || service.title.en;
            const descText = service.desc[activeLocale as keyof typeof service.desc] || service.desc.en;

            return (
              <a
                href={service.isExternal ? service.link : `/${locale}${service.link}`}
                target={service.isExternal ? "_blank" : undefined}
                rel={service.isExternal ? "noopener noreferrer" : undefined}
                key={service.id}
                className="group relative flex flex-col items-center justify-between text-center p-5 rounded-2xl border border-card-border bg-white shadow-card hover:shadow-cardHover hover:-translate-y-1 active:translate-y-0 transition-all duration-300 cursor-pointer overflow-hidden min-h-[16rem]"
              >
                {/* Service Details */}
                <div className="flex flex-col items-center w-full">
                  {/* Image Frame */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-200 bg-base p-1">
                    <Image
                      src={service.image}
                      alt={titleText}
                      width={80}
                      height={80}
                      sizes="(max-width: 640px) 64px, 80px"
                      className="w-full h-full object-cover rounded-full select-none"
                      draggable={false}
                    />
                  </div>

                  <h3 className="font-sans text-xs sm:text-sm font-extrabold text-ink mt-4 tracking-tight line-clamp-2 uppercase">
                    {titleText}
                  </h3>

                  <p className="text-[10px] sm:text-xs text-ink-body font-semibold mt-1.5 leading-snug line-clamp-2">
                    {descText}
                  </p>
                </div>

                {/* Explore Button */}
                <span className={cn(
                  "inline-flex items-center gap-1 text-[8px] sm:text-[9px] font-bold mt-5 px-3 py-1.5 rounded-full border shadow-sm transition-all duration-200 uppercase",
                  serviceButtonStyles[service.id as keyof typeof serviceButtonStyles] || "border-zinc-200 bg-white text-zinc-700"
                )}>
                  {dict.services.cta} →
                </span>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
