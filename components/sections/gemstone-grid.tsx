"use client";

import React, { useState } from "react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import GEMS_DATA from "@/lib/data/gems.json";
import { cn } from "@/lib/utils";

interface GemInfo {
  id: string;
  name: Record<string, string>;
  type: Record<string, string>;
  description: Record<string, string>;
  zodiac: Record<string, string>;
  ruler: Record<string, string>;
  origin: Record<string, string>;
  pricePerCarat: number;
  src: string;
  benefits: Record<string, string[]>;
}

const GEMS = GEMS_DATA as Record<string, GemInfo>;

// Map gemstones to custom, luxurious glow colors representing their physical hue
const GLOW_COLORS: Record<string, string> = {
  ruby: "rgba(220, 38, 38, 0.12)", // Crimson Red
  amethyst: "rgba(168, 85, 247, 0.12)", // Deep Purple
  blue_zircon: "rgba(59, 130, 246, 0.12)", // Sky Blue
  citrine: "rgba(245, 158, 11, 0.12)", // Amber Yellow
  diamond: "rgba(255, 255, 255, 0.10)", // Diamond White
  gomed: "rgba(217, 119, 6, 0.12)", // Honey Hessonite
  opal: "rgba(236, 72, 153, 0.12)", // Iridescent Pink/Opal
  peridot: "rgba(34, 197, 94, 0.12)", // Olive Green
  red_coral: "rgba(239, 68, 68, 0.12)", // Vibrant Coral Red
  topaz_sky_blue: "rgba(14, 165, 233, 0.12)", // Sky Blue Topaz
  yellow_zircon: "rgba(234, 179, 8, 0.12)", // Golden Yellow
  zircon_colorless: "rgba(255, 255, 255, 0.10)" // Colorless Zircon
};

// Map gemstones to gorgeous, light pastel backgrounds corresponding to their physical hues
const gemCardColors: Record<string, string> = {
  ruby: "bg-[#FFD0C8]",          // Pastel Soft Red
  amethyst: "bg-[#E5D5FF]",      // Pastel Royal Purple
  blue_zircon: "bg-[#E0F2FE]",   // Pastel Sky Blue
  citrine: "bg-[#FEF08A]",       // Pastel Amber Yellow
  diamond: "bg-[#F3F4F6]",       // Pastel Diamond White
  gomed: "bg-[#FFE4A0]",         // Pastel Honey Yellow
  opal: "bg-[#FCE7F3]",          // Pastel Opal Pink
  peridot: "bg-[#C6F6D5]",       // Pastel Olive Green
  red_coral: "bg-[#FEE2E2]",      // Pastel Coral Red
  topaz_sky_blue: "bg-[#E0F2FE]", // Pastel Topaz Blue
  yellow_zircon: "bg-[#FEF08A]",  // Pastel Yellow Zircon
  zircon_colorless: "bg-[#F9FAFB]" // Pastel Colorless Zircon
};

interface GemstoneCardProps {
  gem: GemInfo;
  activeLocale: string;
  labels: any;
  glowColor: string;
  getPrefilledWhatsappUrl: (name: string) => string;
}

function GemstoneCard({ gem, activeLocale, labels, glowColor, getPrefilledWhatsappUrl }: GemstoneCardProps) {
  const gemName = gem.name[activeLocale] || gem.name["en"];
  const gemDesc = gem.description[activeLocale] || gem.description["en"];
  const gemZodiac = gem.zodiac[activeLocale] || gem.zodiac["en"];
  const gemRuler = gem.ruler[activeLocale] || gem.ruler["en"];
  const gemOrigin = gem.origin[activeLocale] || gem.origin["en"];
  const gemBenefits = gem.benefits[activeLocale] || gem.benefits["en"] || [];

  return (
    <CardSpotlight
      color={glowColor}
      radius={280}
      useCanvas={false} // Default false to prevent WebGL multiple context scroll lag
      className={cn(
        "group/gem transition-all duration-200 border-[3px] border-black rounded-2xl flex flex-col justify-between overflow-hidden p-6 select-none relative text-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000] min-h-[30rem] will-change-transform [transform:translate3d(0,0,0)]",
        gemCardColors[gem.id] || "bg-white"
      )}
      style={{}}
    >
      <div className="relative flex flex-col gap-4">
        
        {/* Top image and Type Badge */}
        <div className="flex justify-between items-start gap-4">
          {/* Gemstone Image frame with localized shadow outline */}
          <div className="relative w-24 h-24 shrink-0 rounded-xl border-2 border-black bg-white p-1.5 overflow-hidden flex items-center justify-center shadow-[2.5px_2.5px_0px_#000] group-hover/gem:scale-105 transition-transform duration-300">
            <div
              className="absolute inset-0 opacity-10 blur-sm scale-75 pointer-events-none"
              style={{ backgroundColor: glowColor.replace("0.12", "0.5") }}
            />
            <img
              src={gem.src}
              alt={gemName}
              className="w-full h-full object-contain rounded-lg select-none"
              draggable={false}
            />
          </div>

          {/* Right Head: Price display */}
          <div className="flex flex-col items-end text-right font-sans">
            <span className="text-[9px] text-neutral-500 font-black uppercase tracking-wider">{labels.priceLabel}</span>
            <span className="font-serif font-black text-black text-lg leading-none mt-1">₹{gem.pricePerCarat.toLocaleString()}</span>
            <span className="text-[9px] text-neutral-500 font-black mt-0.5">{labels.pricePerCt}</span>
          </div>
        </div>

        {/* Gemstone Info */}
        <div className="flex flex-col gap-1.5 mt-1 border-b-2 border-black pb-3">
          <h3 className="font-serif text-lg md:text-xl font-black tracking-wide text-black">
            {gemName}
          </h3>
          <p className="text-[11px] text-neutral-600 font-semibold leading-relaxed line-clamp-3 font-sans">
            {gemDesc}
          </p>
        </div>

        {/* Planetary & Zodiac details grid */}
        <div className="grid grid-cols-3 gap-2 font-sans text-[10px] bg-white border-2 border-black p-2 rounded-xl shadow-[2px_2px_0px_#000] font-black">
          <div className="flex flex-col gap-0.5">
            <span className="text-neutral-500 font-black uppercase tracking-wider scale-95 origin-left">{labels.planet}</span>
            <strong className="text-black font-black truncate">{gemRuler}</strong>
          </div>
          <div className="flex flex-col gap-0.5 border-l-2 border-black pl-2">
            <span className="text-neutral-500 font-black uppercase tracking-wider scale-95 origin-left">{labels.zodiacLabel}</span>
            <strong className="text-black font-black truncate">{gemZodiac}</strong>
          </div>
          <div className="flex flex-col gap-0.5 border-l-2 border-black pl-2">
            <span className="text-neutral-500 font-black uppercase tracking-wider scale-95 origin-left">{labels.origin}</span>
            <strong className="text-black font-black truncate">{gemOrigin}</strong>
          </div>
        </div>

        {/* Bullet Benefits List */}
        <div className="flex flex-col gap-1.5 font-sans text-xs pt-1">
          <ul className="flex flex-col gap-1 text-[11px] text-neutral-600 font-semibold">
            {gemBenefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-1.5 leading-snug">
                <span className="text-black font-black mt-0.5 shrink-0 select-none">✦</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Actions buttons */}
      <div className="flex items-center gap-2 mt-5 border-t-2 border-black pt-4">
        <a
          href={getPrefilledWhatsappUrl(gemName)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#FFC000] hover:bg-[#FFC000]/95 text-black border-2 border-black hover:shadow-[3px_3px_0px_#000] hover:-translate-y-[1px] hover:-translate-x-[1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all font-black py-2.5 px-4 rounded-full shadow-[2px_2px_0px_#000] text-[10px] font-sans cursor-pointer text-center uppercase tracking-wider"
        >
          <img src="/social-icons/whatsapp.png" alt="WhatsApp" className="w-3.5 h-3.5 object-contain shrink-0" />
          {labels.inquireBtn}
        </a>
        <button
          disabled
          className="flex-1 text-[10px] font-black text-neutral-400 py-2.5 px-4 rounded-full border-2 border-black bg-neutral-100 cursor-not-allowed opacity-60 select-none uppercase tracking-wider"
        >
          {labels.buyNowBtn}
        </button>
      </div>
    </CardSpotlight>
  );
}

interface GemstoneGridProps {
  locale?: string;
  limit?: number;
}

export default function GemstoneGrid({ locale = "en", limit }: GemstoneGridProps) {
  const activeLocale = ["en", "hin", "bn"].includes(locale) ? locale : "en";

  const getPrefilledWhatsappUrl = (name: string) => {
    const text = `Hello AstroKraft! I am interested in purchasing the ${name}. Please share availability and lab certificates.`;
    return `https://wa.me/916913230255?text=${encodeURIComponent(text)}`;
  };

  let gemsList = Object.values(GEMS);
  const showViewAll = limit !== undefined && gemsList.length > limit;
  if (limit !== undefined) {
    gemsList = gemsList.slice(0, limit);
  }

  // Dictionary fallbacks for header elements
  const labelsObj = {
    en: {
      eyebrow: "✦ Certified Remedies & Treasures",
      heading: "Explore Certified Gemstones",
      subheading: "Find lab-certified, natural gemstones aligned with your birth chart. Enhance planetary influences and invite positivity into your life.",
      planet: "Ruler",
      zodiacLabel: "Zodiac",
      origin: "Origin",
      priceLabel: "Price starting at",
      pricePerCt: "/ Carat",
      inquireBtn: "Inquire",
      buyNowBtn: "Buy Now"
    },
    hin: {
      eyebrow: "✦ प्रमाणित उपचार और रत्न",
      heading: "प्रमाणित रत्नों की खोज करें",
      subheading: "अपनी जन्म कुंडली के अनुसार प्रमाणित, प्राकृतिक रत्न खोजें। ग्रहों के प्रभावों को बढ़ाएं और जीवन में सकारात्मकता लाएं।",
      planet: "स्वामी",
      zodiacLabel: "राशि",
      origin: "उत्पत्ति",
      priceLabel: "शुरुआती कीमत",
      pricePerCt: "/ कैरेट",
      inquireBtn: "पूछताछ करें",
      buyNowBtn: "अभी खरीदें"
    },
    bn: {
      eyebrow: "✦ প্রত্যয়িত প্রতিকার ও রত্নাবলী",
      heading: "প্রত্যয়িত রত্ন পাথর খুঁজুন",
      subheading: "আপনার জন্মপত্রিকা অনুযায়ী প্রাকৃতিক এবং ল্যাব-প্রত্যয়িত রত্ন পাথর নির্বাচন করুন। গ্রহের শুভ প্রভাব বাড়ান ও জীবনে সাফল্য আনুন।",
      planet: "অধিপতি",
      zodiacLabel: "রাশি",
      origin: "উৎস",
      priceLabel: "মূল্য শুরু",
      pricePerCt: "/ ক্যারেট",
      inquireBtn: "যোগাযোগ করুন",
      buyNowBtn: "এখনই কিনুন"
    }
  };
  const labels = labelsObj[activeLocale as keyof typeof labelsObj];

  return (
    <section className="w-full py-16 px-6 md:px-12 lg:px-16 bg-[#FFFDF0]/30 relative overflow-hidden border-t-[3px] border-black">
      {/* Decorative ambient glows */}
      <div className="absolute top-24 left-1/4 w-[400px] h-[400px] rounded-full bg-amber-200/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-24 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-200/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-4.5 py-1.5 border-2 border-black bg-[#FFC000] text-black text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-[2.5px_2.5px_0px_#000] select-none rounded-full">
            {labels.eyebrow}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-black">
            {labels.heading}
          </h2>
          <p className="max-w-2xl text-black font-semibold text-sm sm:text-base font-sans leading-relaxed">
            {labels.subheading}
          </p>
        </div>
        {/* Gems Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {gemsList.map((gem) => {
            const glowColor = GLOW_COLORS[gem.id] || "rgba(110, 79, 203, 0.12)";
            return (
              <GemstoneCard
                key={gem.id}
                gem={gem}
                activeLocale={activeLocale}
                labels={labels}
                glowColor={glowColor}
                getPrefilledWhatsappUrl={getPrefilledWhatsappUrl}
              />
            );
          })}
        </div>
        {showViewAll && (
          <div className="flex justify-center mt-12">
            <a
              href={`/${locale}/gemstones`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-black bg-white hover:bg-neutral-50 text-black hover:shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000] text-xs font-black font-sans transition-all cursor-pointer shadow-[3px_3px_0px_#000]"
            >
              {activeLocale === "hin" ? "सभी रत्नों की खोज करें ✦" : activeLocale === "bn" ? "সব রত্ন পাথর দেখুন ✦" : "Explore All Gemstones ✦"}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
