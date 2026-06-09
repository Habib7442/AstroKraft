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

// Deep luxury colored background fills (themes the main card body in dark mode)
const CARD_BG_COLORS: Record<string, string> = {
  ruby: "rgba(35, 12, 16, 0.85)",          // Deep Wine Red
  amethyst: "rgba(22, 12, 36, 0.85)",      // Deep Royal Amethyst
  blue_zircon: "rgba(12, 20, 42, 0.85)",   // Deep Sapphire Blue
  citrine: "rgba(32, 22, 12, 0.85)",       // Deep Amber Orange
  diamond: "rgba(20, 20, 24, 0.85)",       // Deep Charcoal/Plat
  gomed: "rgba(30, 18, 12, 0.85)",         // Deep Cinnamon/Hessonite
  opal: "rgba(32, 15, 28, 0.85)",          // Deep Rosé Opal
  peridot: "rgba(12, 28, 16, 0.85)",       // Deep Jade/Peridot Green
  red_coral: "rgba(35, 12, 12, 0.85)",      // Deep Coral Crimson
  topaz_sky_blue: "rgba(10, 24, 38, 0.85)", // Deep Sky Topaz Blue
  yellow_zircon: "rgba(30, 26, 12, 0.85)",  // Deep Gold Zircon
  zircon_colorless: "rgba(18, 18, 20, 0.85)" // Deep Obsidian Grey
};

interface GemstoneCardProps {
  gem: GemInfo;
  activeLocale: string;
  labels: any;
  glowColor: string;
  getPrefilledWhatsappUrl: (name: string) => string;
}

function GemstoneCard({ gem, activeLocale, labels, glowColor, getPrefilledWhatsappUrl }: GemstoneCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const gemName = gem.name[activeLocale] || gem.name["en"];
  const gemDesc = gem.description[activeLocale] || gem.description["en"];
  const gemZodiac = gem.zodiac[activeLocale] || gem.zodiac["en"];
  const gemRuler = gem.ruler[activeLocale] || gem.ruler["en"];
  const gemOrigin = gem.origin[activeLocale] || gem.origin["en"];
  const gemBenefits = gem.benefits[activeLocale] || gem.benefits["en"] || [];

  // Color variables for background and border gradients
  const baseBorderColor = glowColor.replace("0.15", "0.22").replace("0.12", "0.18");
  const activeBorderColor = glowColor.replace("0.15", "0.50").replace("0.12", "0.40");
  
  const cardBgColor = CARD_BG_COLORS[gem.id] || "rgba(13, 11, 26, 0.95)";
  
  const baseBg = `radial-gradient(circle at 20% 20%, ${glowColor.replace("0.15", "0.08").replace("0.12", "0.05")}, ${cardBgColor} 70%)`;
  
  const boxShadow = isHovered 
    ? `0 12px 30px -10px ${glowColor.replace("0.15", "0.25").replace("0.12", "0.18")}`
    : "none";

  return (
    <CardSpotlight
      color={glowColor}
      radius={280}
      useCanvas={false} // Default false to prevent WebGL multiple context scroll lag
      className="text-foreground transition-all duration-300 rounded-2xl flex flex-col justify-between overflow-hidden shadow-2xl p-6 select-none border will-change-transform [transform:translate3d(0,0,0)]"
      style={{
        background: baseBg,
        borderColor: isHovered ? activeBorderColor : baseBorderColor,
        boxShadow: boxShadow,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex flex-col gap-4">
        
        {/* Top image and Type Badge */}
        <div className="flex justify-between items-start gap-4">
          {/* Gemstone Image frame with localized glow background */}
          <div className="relative w-24 h-24 shrink-0 rounded-xl border border-gold/30 bg-muted/45 p-1.5 overflow-hidden flex items-center justify-center shadow-lg group">
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

          {/* Right Head: Price display */}
          <div className="flex flex-col items-end text-right font-sans">
            <span className="text-[9px] text-muted-foreground uppercase">{labels.priceLabel}</span>
            <span className="font-serif font-bold text-gold text-base leading-none mt-1">₹{gem.pricePerCarat.toLocaleString()}</span>
            <span className="text-[9px] text-muted-foreground mt-0.5">{labels.pricePerCt}</span>
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
        <div className="grid grid-cols-3 gap-2 font-sans text-[10px] bg-muted/40 border border-border/40 p-2 rounded-lg">
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold/40 hover:border-gold bg-neutral-900/50 hover:bg-neutral-900 text-gold hover:text-foreground text-xs font-semibold font-sans transition-all cursor-pointer shadow-lg hover:shadow-gold/10"
              >
                {activeLocale === "hin" ? "सभी रत्नों की खोज करें ✦" : activeLocale === "bn" ? "সব রত্ন পাথর দেখুন ✦" : "Explore All Gemstones ✦"}
              </a>
            </div>
          )}
        </div>
      </section>
  );
}
