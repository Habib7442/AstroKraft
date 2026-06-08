"use client";

import React, { useState, useMemo } from "react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import GEMS_DATA from "@/lib/data/gems.json";
import { Star, Award, MapPin, Compass, Search, Filter, Sparkles } from "lucide-react";
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

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | "precious" | "semi-precious">("all");
  const [selectedZodiac, setSelectedZodiac] = useState<string>("all");

  const getPrefilledWhatsappUrl = (name: string) => {
    const text = `Hello AstroKraft! I am interested in purchasing the ${name}. Please share availability and lab certificates.`;
    return `https://wa.me/916913230255?text=${encodeURIComponent(text)}`;
  };

  // Extract all unique zodiacs for filter dropdown list based on locale
  const zodiacList = useMemo(() => {
    const list = new Set<string>();
    Object.values(GEMS).forEach((gem) => {
      const zodiacVal = gem.zodiac[activeLocale] || gem.zodiac["en"];
      // Split if comma/slash separated
      zodiacVal.split(/[\/,]/).forEach((z) => {
        const clean = z.trim();
        if (clean) list.add(clean);
      });
    });
    return Array.from(list).sort();
  }, [activeLocale]);

  // Filter gems based on search query, type, and zodiac
  const filteredGems = useMemo(() => {
    return Object.values(GEMS).filter((gem) => {
      const nameText = (gem.name[activeLocale] || gem.name["en"]).toLowerCase();
      const descText = (gem.description[activeLocale] || gem.description["en"]).toLowerCase();
      const zodiacText = (gem.zodiac[activeLocale] || gem.zodiac["en"]).toLowerCase();
      const rulerText = (gem.ruler[activeLocale] || gem.ruler["en"]).toLowerCase();
      
      const query = searchQuery.toLowerCase();

      // Search matching
      const matchesSearch = 
        nameText.includes(query) || 
        descText.includes(query) || 
        zodiacText.includes(query) || 
        rulerText.includes(query);

      // Type matching
      const isPrecious = (gem.type["en"] || "").toLowerCase().includes("precious");
      const matchesType = 
        selectedType === "all" ||
        (selectedType === "precious" && isPrecious) ||
        (selectedType === "semi-precious" && !isPrecious);

      // Zodiac matching
      const matchesZodiac = 
        selectedZodiac === "all" ||
        zodiacText.includes(selectedZodiac.toLowerCase());

      return matchesSearch && matchesType && matchesZodiac;
    });
  }, [searchQuery, selectedType, selectedZodiac, activeLocale]);

  // Dictionary fallbacks for header elements
  const labelsObj = {
    en: {
      eyebrow: "✦ Certified Remedies & Treasures",
      heading: "Explore Certified Gemstones",
      subheading: "Find lab-certified, natural gemstones aligned with your birth chart. Enhance planetary influences and invite positivity into your life.",
      searchPlaceholder: "Search by gem name, planet, zodiac...",
      filterAll: "All Gems",
      filterPrecious: "Precious",
      filterSemi: "Semi-Precious",
      zodiacPlaceholder: "Filter by Zodiac",
      zodiacAll: "All Zodiacs",
      planet: "Ruler",
      zodiacLabel: "Zodiac",
      origin: "Origin",
      priceLabel: "Price starting at",
      pricePerCt: "/ Carat",
      inquireBtn: "Inquire",
      certBtn: "View Details",
      noResults: "No gemstones matched your filters. Try adjusting your query."
    },
    hin: {
      eyebrow: "✦ प्रमाणित उपचार और रत्न",
      heading: "प्रमाणित रत्नों की खोज करें",
      subheading: "अपनी जन्म कुंडली के अनुसार प्रमाणित, प्राकृतिक रत्न खोजें। ग्रहों के प्रभावों को बढ़ाएं और जीवन में सकारात्मकता लाएं।",
      searchPlaceholder: "रत्न, ग्रह, राशि द्वारा खोजें...",
      filterAll: "सभी रत्न",
      filterPrecious: "बहुमूल्य",
      filterSemi: "उपरत्न",
      zodiacPlaceholder: "राशि द्वारा फ़िल्टर करें",
      zodiacAll: "सभी राशियां",
      planet: "स्वामी",
      zodiacLabel: "राशि",
      origin: "उत्पत्ति",
      priceLabel: "शुरुआती कीमत",
      pricePerCt: "/ कैरेट",
      inquireBtn: "पूछताछ करें",
      certBtn: "विवरण देखें",
      noResults: "आपके फ़िल्टर से कोई रत्न मेल नहीं खाया। कृपया पुन: प्रयास करें।"
    },
    bn: {
      eyebrow: "✦ প্রত্যয়িত প্রতিকার ও রত্নাবলী",
      heading: "প্রত্যয়িত রত্ন পাথর খুঁজুন",
      subheading: "আপনার জন্মপত্রিকা অনুযায়ী প্রাকৃতিক এবং ল্যাব-প্রত্যয়িত রত্ন পাথর নির্বাচন করুন। গ্রহের শুভ প্রভাব বাড়ান ও জীবনে সাফল্য আনুন।",
      searchPlaceholder: "রত্ন, গ্রহ বা রাশি দিয়ে খুঁজুন...",
      filterAll: "সব রত্ন",
      filterPrecious: "মূল্যবান রত্ন",
      filterSemi: "উপরত্ন",
      zodiacPlaceholder: "রাশি অনুযায়ী খুঁজুন",
      zodiacAll: "সব রাশি",
      planet: "অধিপতি",
      zodiacLabel: "রাশি",
      origin: "উৎস",
      priceLabel: "মূল্য শুরু",
      pricePerCt: "/ ক্যারেট",
      inquireBtn: "যোগাযোগ করুন",
      certBtn: "বিস্তারিত দেখুন",
      noResults: "কোনো রত্ন পাথর পাওয়া যায়নি। অন্য ফিল্টার চেষ্টা করুন।"
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

        {/* Filters Controls Panel */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card/40 border border-border/40 p-4 rounded-2xl backdrop-blur-md relative z-20">
          
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={labels.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-neutral-900/60 rounded-lg border border-border/80 focus:border-gold/60 focus:outline-none text-foreground placeholder-muted-foreground transition-all font-sans"
            />
          </div>

          {/* Filter options group */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end">
            
            {/* Precious/Semi-Precious Type Select */}
            <div className="flex items-center bg-neutral-900/80 p-1 rounded-lg border border-border/80 text-xs font-sans">
              <button
                onClick={() => setSelectedType("all")}
                className={cn(
                  "px-3 py-1.5 rounded transition-all cursor-pointer",
                  selectedType === "all" ? "bg-gold/15 text-gold font-semibold" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {labels.filterAll}
              </button>
              <button
                onClick={() => setSelectedType("precious")}
                className={cn(
                  "px-3 py-1.5 rounded transition-all cursor-pointer",
                  selectedType === "precious" ? "bg-gold/15 text-gold font-semibold" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {labels.filterPrecious}
              </button>
              <button
                onClick={() => setSelectedType("semi-precious")}
                className={cn(
                  "px-3 py-1.5 rounded transition-all cursor-pointer",
                  selectedType === "semi-precious" ? "bg-gold/15 text-gold font-semibold" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {labels.filterSemi}
              </button>
            </div>

            {/* Zodiac Selector */}
            <div className="relative font-sans text-xs shrink-0">
              <select
                value={selectedZodiac}
                onChange={(e) => setSelectedZodiac(e.target.value)}
                className="appearance-none bg-neutral-900/80 pl-3 pr-8 py-2.5 rounded-lg border border-border/80 focus:border-gold/60 focus:outline-none text-foreground cursor-pointer transition-all"
              >
                <option value="all">{labels.zodiacAll}</option>
                {zodiacList.map((zodiac) => (
                  <option key={zodiac} value={zodiac}>
                    {zodiac}
                  </option>
                ))}
              </select>
              {/* Custom Dropdown Chevron */}
              <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center text-muted-foreground">
                <Filter className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>
        </div>

        {/* Gems Showcase Grid */}
        {filteredGems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {filteredGems.map((gem) => {
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
                      className="flex-1 text-[11px] font-semibold text-muted-foreground hover:text-gold transition-colors py-2 px-4 rounded-full border border-border/10 bg-neutral-900/40 hover:bg-neutral-900 cursor-pointer"
                    >
                      {labels.certBtn}
                    </button>
                  </div>

                </CardSpotlight>
              );
            })}
          </div>
        ) : (
          /* Empty / No results view */
          <div className="flex flex-col items-center justify-center text-center gap-4 bg-card/25 border border-border/40 p-12 rounded-2xl backdrop-blur-md">
            <Compass className="w-12 h-12 text-gold animate-spin-slow" />
            <p className="text-sm text-muted-foreground max-w-sm font-sans">
              {labels.noResults}
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
