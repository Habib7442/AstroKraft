"use client";

import React, { useState, useMemo } from "react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import GEMS_DATA from "@/lib/data/gems.json";
import { Star, Award, MapPin, Compass, Sparkles } from "lucide-react";
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

interface GemstoneGridProps {
  locale?: string;
}

// Map gemstones to custom, luxurious glow colors representing their physical hue
const GLOW_COLORS: Record<string, string> = {
  ruby: "rgba(220, 38, 38, 0.15)", // Crimson Red
  amethyst: "rgba(168, 85, 247, 0.15)", // Deep Purple
  blue_zircon: "rgba(59, 130, 246, 0.15)", // Sky Blue
  citrine: "rgba(245, 158, 11, 0.15)", // Amber Yellow
  diamond: "rgba(255, 255, 255, 0.12)", // Diamond White
  gomed: "rgba(217, 119, 6, 0.15)", // Honey Hessonite
  opal: "rgba(236, 72, 153, 0.15)", // Iridescent Pink/Opal
  peridot: "rgba(34, 197, 94, 0.15)", // Olive Green
  red_coral: "rgba(239, 68, 68, 0.15)", // Vibrant Coral Red
  topaz_sky_blue: "rgba(14, 165, 233, 0.15)", // Sky Blue Topaz
  yellow_zircon: "rgba(234, 179, 8, 0.15)", // Golden Yellow
  zircon_colorless: "rgba(255, 255, 255, 0.12)" // Colorless Zircon
};

export default function GemstoneGrid({ locale = "en" }: GemstoneGridProps) {
  const activeLocale = ["en", "hin", "bn"].includes(locale) ? locale : "en";

  const getPrefilledWhatsappUrl = (name: string) => {
    const text = `Hello AstroKraft! I am interested in purchasing the ${name}. Please share availability and lab certificates.`;
    return `https://wa.me/916913230255?text=${encodeURIComponent(text)}`;
  };

  const gemsList = Object.values(GEMS);

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
    <section className="w-full py-16 px-6 md:px-12 lg:px-16 bg-background relative overflow-hidden">
      {/* Decorative ambient glows */}
      <div className="absolute top-24 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-24 right-1/4 w-[400px] h-[400px] rounded-full bg-gold/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 text-xs text-gold border border-white/10 font-sans tracking-wide">
            {labels.eyebrow}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {labels.heading}
          </h2>
          <p className="max-w-2xl text-muted-foreground text-sm sm:text-base font-sans leading-relaxed">
            {labels.subheading}
          </p>
        </div>

        {/* Gems Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {gemsList.map((gem) => {
              const gemName = gem.name[activeLocale] || gem.name["en"];
              const gemType = gem.type[activeLocale] || gem.type["en"];
              const gemDesc = gem.description[activeLocale] || gem.description["en"];
              const gemZodiac = gem.zodiac[activeLocale] || gem.zodiac["en"];
              const gemRuler = gem.ruler[activeLocale] || gem.ruler["en"];
              const gemOrigin = gem.origin[activeLocale] || gem.origin["en"];
              const gemBenefits = gem.benefits[activeLocale] || gem.benefits["en"] || [];

              const glowColor = GLOW_COLORS[gem.id] || "rgba(110, 79, 203, 0.12)";

              return (
                <CardSpotlight
                  key={gem.id}
                  color={glowColor}
                  radius={280}
                  useCanvas={false} // Default false to prevent WebGL multiple context scroll lag
                  className="bg-card/75 border border-gold/15 dark:border-gold/20 hover:border-gold/40 text-foreground transition-all duration-300 rounded-2xl flex flex-col justify-between overflow-hidden shadow-2xl p-6 select-none will-change-transform [transform:translate3d(0,0,0)]"
                >
                  <div className="relative flex flex-col gap-4">
                    
                    {/* Top image and Type Badge */}
                    <div className="flex justify-between items-start gap-4">
                      {/* Gemstone Image frame with localized glow background */}
                      <div className="relative w-24 h-24 shrink-0 rounded-xl border border-gold/30 bg-neutral-950/40 p-1.5 overflow-hidden flex items-center justify-center shadow-lg group">
                        <div
                          className="absolute inset-0 opacity-20 blur-md scale-75 group-hover:scale-100 transition-transform duration-300 pointer-events-none"
                          style={{ backgroundColor: glowColor.replace("0.15", "0.6").replace("0.12", "0.6") }}
                        />
                        <img
                          src={gem.src}
                          alt={gemName}
                          className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-110 select-none"
                          draggable={false}
                        />
                      </div>

                      {/* Right Head: Type Badge & Price display */}
                      <div className="flex flex-col items-end text-right gap-1.5 font-sans">
                        <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full bg-white/5 border border-white/10 text-muted-foreground">
                          {gemType}
                        </span>
                        <div className="flex flex-col items-end">
                          <span className="text-[9px] text-muted-foreground uppercase">{labels.priceLabel}</span>
                          <span className="font-serif font-bold text-gold text-base">₹{gem.pricePerCarat.toLocaleString()}</span>
                          <span className="text-[9px] text-muted-foreground">{labels.pricePerCt}</span>
                        </div>
                      </div>
                    </div>

                    {/* Gemstone Info */}
                    <div className="flex flex-col gap-1.5 mt-1 border-b border-border/20 pb-3">
                      <h3 className="font-serif text-lg md:text-xl font-bold tracking-wide text-foreground">
                        {gemName}
                      </h3>
                      <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-3 font-sans">
                        {gemDesc}
                      </p>
                    </div>

                    {/* Planetary & Zodiac details grid */}
                    <div className="grid grid-cols-3 gap-2 font-sans text-[10px] bg-neutral-950/20 border border-white/5 p-2 rounded-lg">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-muted-foreground font-medium uppercase tracking-wider scale-95 origin-left">{labels.planet}</span>
                        <strong className="text-foreground truncate">{gemRuler}</strong>
                      </div>
                      <div className="flex flex-col gap-0.5 border-l border-border/20 pl-2">
                        <span className="text-muted-foreground font-medium uppercase tracking-wider scale-95 origin-left">{labels.zodiacLabel}</span>
                        <strong className="text-gold truncate">{gemZodiac}</strong>
                      </div>
                      <div className="flex flex-col gap-0.5 border-l border-border/20 pl-2">
                        <span className="text-muted-foreground font-medium uppercase tracking-wider scale-95 origin-left">{labels.origin}</span>
                        <strong className="text-foreground truncate">{gemOrigin}</strong>
                      </div>
                    </div>

                    {/* Bullet Benefits List */}
                    <div className="flex flex-col gap-1.5 font-sans text-xs pt-1">
                      <ul className="flex flex-col gap-1 text-[11px] text-muted-foreground">
                        {gemBenefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-1.5 leading-snug">
                            <span className="text-gold mt-0.5 shrink-0 select-none">✦</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center gap-2 mt-5 border-t border-border/25 pt-4">
                    <a
                      href={getPrefilledWhatsappUrl(gemName)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22c35e] hover:to-[#0f7c6f] text-white font-semibold py-2 px-4 rounded-full shadow-lg shadow-emerald-500/10 transition-all text-[11px] font-sans cursor-pointer text-center"
                    >
                      <img src="/social-icons/whatsapp.png" alt="WhatsApp" className="w-3.5 h-3.5 object-contain shrink-0" />
                      {labels.inquireBtn}
                    </a>
                    <button
                      disabled
                      className="flex-1 text-[11px] font-semibold text-muted-foreground/40 py-2 px-4 rounded-full border border-border/10 bg-neutral-900/20 cursor-not-allowed opacity-50 select-none"
                    >
                      {labels.buyNowBtn}
                    </button>
                  </div>
                </CardSpotlight>
              );
            })}
          </div>
        </div>
      </section>
  );
}
