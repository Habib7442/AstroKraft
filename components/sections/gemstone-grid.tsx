"use client";

import React, { useState, useEffect, useRef } from "react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import GEMS_DATA from "@/lib/data/gems.json";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { productsQuery } from "@/sanity/lib/queries";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GemInfo {
  id: string;
  name: Record<string, string>;
  type: Record<string, string>;
  description: Record<string, string>;
  zodiac: Record<string, string>;
  ruler: Record<string, string>;
  origin: Record<string, string>;
  pricePerCarat: number;
  priceBasic?: number;
  salePriceBasic?: number;
  priceSemiPremium?: number;
  salePriceSemiPremium?: number;
  pricePremium?: number;
  salePricePremium?: number;
  isBestSelling?: boolean;
  src: string;
}

const GEMS = GEMS_DATA as Record<string, any>;

function mapSanityProductToGemInfo(product: any): GemInfo {
  // Setup a beautiful local image asset fallback if the Sanity image is missing
  let imageUrl = "/gemstones/placeholder.png";
  if (product.image) {
    try {
      imageUrl = urlFor(product.image).width(200).height(200).fit('crop').auto('format').url();
    } catch (e) {
      console.warn("Failed to generate Sanity image URL:", e);
    }
  } else {
    const nameLower = (product.name || "").toLowerCase();
    if (nameLower.includes("ruby")) imageUrl = "/assets/gems/ruby.webp";
    else if (nameLower.includes("amethyst")) imageUrl = "/assets/gems/amethyst.webp";
    else if (nameLower.includes("blue zircon")) imageUrl = "/assets/gems/blue-zircon.webp";
    else if (nameLower.includes("citrine") || nameLower.includes("sunela")) imageUrl = "/assets/gems/citrine.webp";
    else if (nameLower.includes("diamond")) imageUrl = "/assets/gems/diamond.webp";
    else if (nameLower.includes("gomed") || nameLower.includes("hessonite")) imageUrl = "/assets/gems/gomed(hessonite).webp";
    else if (nameLower.includes("opal")) imageUrl = "/assets/gems/opal.webp";
    else if (nameLower.includes("peridot")) imageUrl = "/assets/gems/peridot.webp";
    else if (nameLower.includes("coral") || nameLower.includes("moonga")) imageUrl = "/assets/gems/red-coral(probal).webp";
    else if (nameLower.includes("topaz")) imageUrl = "/assets/gems/topaz-sky-blue.webp";
    else if (nameLower.includes("yellow zircon")) imageUrl = "/assets/gems/yellow-zircon.webp";
    else if (nameLower.includes("zircon")) imageUrl = "/assets/gems/zircon(colorless).webp";
  }

  return {
    id: product._id,
    name: {
      en: product.name,
      hin: product.name,
      bn: product.name
    },
    type: {
      en: product.category?.name || "Gemstone",
      hin: product.category?.name || "रत्न",
      bn: product.category?.name || "রত্ন"
    },
    description: {
      en: product.description || "",
      hin: product.description || "",
      bn: product.description || ""
    },
    zodiac: {
      en: product.rashi?.join(", ") || "All",
      hin: product.rashi?.join(", ") || "सभी",
      bn: product.rashi?.join(", ") || "সব"
    },
    ruler: {
      en: "Various",
      hin: "विविध",
      bn: "विभिन्न"
    },
    origin: {
      en: "Certified",
      hin: "प्रमाणित",
      bn: "প্রত্যয়িত"
    },
    pricePerCarat: product.salePrice ?? product.price,
    priceBasic: product.priceBasic,
    salePriceBasic: product.salePriceBasic,
    priceSemiPremium: product.priceSemiPremium,
    salePriceSemiPremium: product.salePriceSemiPremium,
    pricePremium: product.pricePremium,
    salePricePremium: product.salePricePremium,
    isBestSelling: product.isBestSelling,
    src: imageUrl
  };
}

// Map gemstones to custom, luxurious glow colors representing their physical hue
function getGemGlowColor(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("ruby") || n.includes("manik")) return "rgba(220, 38, 38, 0.08)";
  if (n.includes("amethyst") || n.includes("jamunia")) return "rgba(168, 85, 247, 0.08)";
  if (n.includes("blue zircon")) return "rgba(59, 130, 246, 0.08)";
  if (n.includes("yellow zircon")) return "rgba(234, 179, 8, 0.08)";
  if (n.includes("citrine") || n.includes("sunela")) return "rgba(245, 158, 11, 0.08)";
  if (n.includes("diamond") || n.includes("heera")) return "rgba(200, 200, 200, 0.06)";
  if (n.includes("gomed") || n.includes("hessonite")) return "rgba(217, 119, 6, 0.08)";
  if (n.includes("opal")) return "rgba(236, 72, 153, 0.08)";
  if (n.includes("peridot")) return "rgba(34, 197, 94, 0.08)";
  if (n.includes("coral") || n.includes("moonga")) return "rgba(239, 68, 68, 0.08)";
  if (n.includes("topaz")) return "rgba(14, 165, 233, 0.08)";
  if (n.includes("zircon")) return "rgba(200, 200, 200, 0.06)";
  return "rgba(226, 194, 122, 0.08)";
}

// Map gemstones to soft pastel border/accent colors corresponding to their physical hues
function getGemHexColor(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("ruby") || n.includes("manik")) return "#FFD0C8";
  if (n.includes("amethyst") || n.includes("jamunia")) return "#E5D5FF";
  if (n.includes("blue zircon")) return "#E0F2FE";
  if (n.includes("yellow zircon")) return "#FEF08A";
  if (n.includes("citrine") || n.includes("sunela")) return "#FEF08A";
  if (n.includes("diamond") || n.includes("heera")) return "#F3F4F6";
  if (n.includes("gomed") || n.includes("hessonite")) return "#FFE4A0";
  if (n.includes("opal")) return "#FCE7F3";
  if (n.includes("peridot")) return "#C6F6D5";
  if (n.includes("coral") || n.includes("moonga")) return "#FEE2E2";
  if (n.includes("topaz")) return "#E0F2FE";
  if (n.includes("zircon")) return "#F9FAFB";
  return "#E5D5FF"; // default lavender
}

interface GemstoneCardProps {
  gem: GemInfo;
  activeLocale: string;
  labels: any;
  getPrefilledWhatsappUrl: (name: string) => string;
}

function GemstoneCard({ gem, activeLocale, labels, getPrefilledWhatsappUrl }: GemstoneCardProps) {
  const [selectedTier, setSelectedTier] = useState<"basic" | "semi_premium" | "premium">("basic");
  const gemName = gem.name[activeLocale] || gem.name["en"];
  const gemDesc = gem.description[activeLocale] || gem.description["en"];
  const gemZodiac = gem.zodiac[activeLocale] || gem.zodiac["en"];
  const gemRuler = gem.ruler[activeLocale] || gem.ruler["en"];
  const gemOrigin = gem.origin[activeLocale] || gem.origin["en"];
  
  const cornerColor = getGemHexColor(gemName);
  const glowColor = getGemGlowColor(gemName);

  // Tier pricing fallbacks
  const basicPrice = gem.priceBasic ?? gem.pricePerCarat;
  const basicSalePrice = gem.salePriceBasic ?? (gem.priceBasic ? gem.salePriceBasic : undefined);

  const semiPremiumPrice = gem.priceSemiPremium ?? Math.round(basicPrice * 1.5);
  const semiPremiumSalePrice = gem.salePriceSemiPremium ?? (gem.priceSemiPremium ? gem.salePriceSemiPremium : undefined);

  const premiumPrice = gem.pricePremium ?? Math.round(basicPrice * 2.5);
  const premiumSalePrice = gem.salePricePremium ?? (gem.pricePremium ? gem.salePricePremium : undefined);

  const getActivePrice = () => {
    switch (selectedTier) {
      case "semi_premium":
        return { base: semiPremiumPrice, sale: semiPremiumSalePrice };
      case "premium":
        return { base: premiumPrice, sale: premiumSalePrice };
      case "basic":
      default:
        return { base: basicPrice, sale: basicSalePrice };
    }
  };

  const { base: activeBase, sale: activeSale } = getActivePrice();
  const hasSale = activeSale !== undefined && activeSale !== null && activeSale < activeBase;
  const displayPrice = hasSale ? activeSale! : activeBase;

  const activeTierLabel = selectedTier === "premium" ? "Premium" : selectedTier === "semi_premium" ? "Semi-Premium" : "Basic";
  const whatsappUrl = getPrefilledWhatsappUrl(`${gemName} (${activeTierLabel} Quality)`);

  return (
    <CardSpotlight
      color={glowColor}
      radius={180}
      useCanvas={false}
      className={cn(
        "group/gem transition-all duration-300 border rounded-2xl flex flex-col justify-between overflow-hidden p-4 select-none relative shadow-sm hover:shadow-md bg-white hover:-translate-y-1 min-h-[25rem] w-[275px] shrink-0 will-change-transform [transform:translate3d(0,0,0)]"
      )}
      style={{
        background: `radial-gradient(circle at top right, ${cornerColor}22 0%, rgba(255, 255, 255, 0.9) 60%, rgba(255, 255, 255, 1) 100%)`,
        borderColor: `${cornerColor}cc`
      }}
    >
      {/* Top Product Badge */}
      {gem.isBestSelling && (
        <div className="absolute top-0 left-0 bg-gradient-to-r from-amber-500 via-orange-500 to-[#E2C27A] text-black text-[8px] font-black uppercase tracking-wider px-2.5 py-1 rounded-br-xl shadow-sm z-20 flex items-center gap-0.5 select-none">
          🔥 Best Seller
        </div>
      )}

      <div className="relative flex flex-col gap-3">
        {/* Top image and Price */}
        <div className="flex justify-between items-start gap-3 mt-1">
          {/* Gemstone Image frame */}
          <div className="relative w-20 h-20 shrink-0 rounded-xl border border-zinc-100 bg-zinc-50 p-1.5 overflow-hidden flex items-center justify-center shadow-sm group-hover/gem:scale-105 transition-transform duration-300">
            <div
              className="absolute inset-0 opacity-10 blur-sm scale-75 pointer-events-none"
              style={{ backgroundColor: glowColor.replace("0.08", "0.3") }}
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
            <span className="text-[8px] font-bold uppercase tracking-wider" style={{ color: "#6E698A" }}>
              {labels.priceLabel}
            </span>
            <div className="flex flex-col items-end mt-0.5">
              {hasSale && (
                <span className="text-[9px] line-through leading-none font-bold mb-0.5" style={{ color: "#9CA3AF" }}>
                  ₹{activeBase.toLocaleString()}
                </span>
              )}
              <span className="font-serif font-bold text-base leading-none" style={{ color: "#78350F" }}>
                ₹{displayPrice.toLocaleString()}
              </span>
            </div>
            <span className="text-[8px] font-bold mt-0.5" style={{ color: "#6E698A" }}>
              {labels.pricePerCt}
            </span>
          </div>
        </div>

        {/* Gemstone Info */}
        <div className="flex flex-col gap-1 border-b border-zinc-100 pb-2">
          <h3 className="font-serif text-sm sm:text-base font-bold tracking-wide transition-colors truncate" style={{ color: "#221A3D" }}>
            {gemName}
          </h3>
          <p className="text-[10px] font-medium leading-relaxed line-clamp-2 font-sans h-7" style={{ color: "#4A4566" }}>
            {gemDesc}
          </p>
        </div>

        {/* Planetary & Zodiac details grid */}
        <div className="grid grid-cols-3 gap-1.5 font-sans text-[8px] bg-zinc-50/60 border border-zinc-100 p-1.5 rounded-xl shadow-sm font-bold text-zinc-700">
          <div className="flex flex-col gap-0.5">
            <span className="text-zinc-500 font-bold uppercase tracking-wider scale-95 origin-left">{labels.planet}</span>
            <strong className="text-zinc-900 font-bold truncate">{gemRuler}</strong>
          </div>
          <div className="flex flex-col gap-0.5 border-l border-zinc-150 pl-1.5">
            <span className="text-zinc-500 font-bold uppercase tracking-wider scale-95 origin-left">{labels.zodiacLabel}</span>
            <strong className="text-zinc-900 font-bold truncate">{gemZodiac}</strong>
          </div>
          <div className="flex flex-col gap-0.5 border-l border-zinc-150 pl-1.5">
            <span className="text-zinc-500 font-bold uppercase tracking-wider scale-95 origin-left">{labels.origin}</span>
            <strong className="text-zinc-900 font-bold truncate">{gemOrigin}</strong>
          </div>
        </div>

        {/* Quality Tiers Selection Pills */}
        <div className="flex flex-col gap-1 mt-1">
          <span className="text-[8px] text-zinc-500 font-black uppercase tracking-wider">Select Quality</span>
          <div className="flex bg-zinc-100 border border-zinc-200/60 rounded-full p-0.5 w-full justify-between gap-1 text-[8px] font-black uppercase tracking-wider select-none">
            <button
              onClick={() => setSelectedTier("basic")}
              className={cn(
                "flex-1 py-1 rounded-full text-center transition-all cursor-pointer",
                selectedTier === "basic"
                  ? "bg-[#E2C27A] text-black font-black shadow-sm"
                  : "text-zinc-600 hover:text-zinc-900"
              )}
            >
              Basic
            </button>
            <button
              onClick={() => setSelectedTier("semi_premium")}
              className={cn(
                "flex-1 py-1 rounded-full text-center transition-all cursor-pointer",
                selectedTier === "semi_premium"
                  ? "bg-[#E2C27A] text-black font-black shadow-sm"
                  : "text-zinc-600 hover:text-zinc-900"
              )}
            >
              Semi-Prem
            </button>
            <button
              onClick={() => setSelectedTier("premium")}
              className={cn(
                "flex-1 py-1 rounded-full text-center transition-all cursor-pointer",
                selectedTier === "premium"
                  ? "bg-[#E2C27A] text-black font-black shadow-sm"
                  : "text-zinc-600 hover:text-zinc-900"
              )}
            >
              Premium
            </button>
          </div>
        </div>

        {/* Highlighted EMI Option Section */}
        <div 
          className="mt-1 p-2 rounded-xl flex items-center gap-2 border shadow-sm select-none"
          style={{
            background: "linear-gradient(135deg, #FFFDF5 0%, #FFF9E6 100%)",
            borderColor: `${cornerColor}bb`
          }}
        >
          <div 
            className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${cornerColor}66` }}
          >
            <span className="text-xs">💳</span>
          </div>
          <div className="flex flex-col font-sans leading-tight text-left">
            <strong className="font-bold text-[9px]" style={{ color: "#78350F" }}>
              EMI Option Available
            </strong>
            <span className="font-medium text-[8px]" style={{ color: "#6E698A" }}>
              Bajaj Finance & Card EMI
            </span>
          </div>
        </div>
      </div>

      {/* Actions buttons */}
      <div className="flex items-center gap-1.5 mt-4 border-t border-zinc-100 pt-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1 bg-violet hover:bg-violet-bright text-white border-0 font-bold py-2 px-3 rounded-full shadow-sm text-[9px] font-sans cursor-pointer text-center uppercase tracking-wider transition-all duration-200"
        >
          <img src="/social-icons/whatsapp.png" alt="WhatsApp" className="w-3 h-3 object-contain shrink-0" />
          {labels.inquireBtn}
        </a>
        <button
          disabled
          className="flex-1 text-[9px] font-bold text-zinc-400 py-2 px-3 rounded-full border border-zinc-250 bg-transparent cursor-not-allowed opacity-50 select-none uppercase tracking-wider"
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
  initialProducts?: any[];
  isCarousel?: boolean;
}

export default function GemstoneGrid({ locale = "en", limit, initialProducts, isCarousel = true }: GemstoneGridProps) {
  const activeLocale = ["en", "hin", "bn"].includes(locale) ? locale : "en";
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const [products, setProducts] = useState<any[]>(initialProducts || []);
  const [loading, setLoading] = useState(false);

  // Client-side fetch fallback if products are not passed
  useEffect(() => {
    if (!initialProducts || initialProducts.length === 0) {
      setLoading(true);
      client.fetch(productsQuery)
        .then((data) => {
          setProducts(data || []);
        })
        .catch((err) => {
          console.error("Client fetch error in GemstoneGrid:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [initialProducts]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -290, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 290, behavior: "smooth" });
    }
  };

  const getPrefilledWhatsappUrl = (name: string) => {
    const text = `Hello AstroKraft! I am interested in purchasing the ${name}. Please share availability and lab certificates.`;
    return `https://wa.me/916913230255?text=${encodeURIComponent(text)}`;
  };

  // Filter to gemstones only
  const isGem = (p: any) => {
    const catName = p.category?.name?.toLowerCase() || "";
    const catSlug = p.category?.slug?.current?.toLowerCase() || "";
    return catName.includes("gemstone") || catName.includes("gem") || catSlug.includes("gemstone") || catSlug.includes("gem");
  };

  const dbGemstones = products.filter(isGem);

  // Map products. If database products have gemstones, use them; otherwise, use GEMS fallback.
  let gemsList: GemInfo[] = [];
  if (dbGemstones.length > 0) {
    gemsList = dbGemstones.map(mapSanityProductToGemInfo);
  } else {
    gemsList = Object.values(GEMS).map((gem) => ({
      ...gem,
      name: gem.name,
      type: gem.type,
      description: gem.description,
      zodiac: gem.zodiac,
      ruler: gem.ruler,
      origin: gem.origin,
      pricePerCarat: gem.pricePerCarat,
      src: gem.src
    }));
  }

  // Sort gemstones so that Best Sellers appear first
  gemsList = [...gemsList].sort((a, b) => {
    const aBest = a.isBestSelling ? 1 : 0;
    const bBest = b.isBestSelling ? 1 : 0;
    return bBest - aBest;
  });

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
    <section
      className="w-full py-16 relative overflow-hidden border-t border-zinc-100"
      style={{
        background: "linear-gradient(to bottom, #FFFBF0 0%, #FFF8E7 100%)"
      }}
    >
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Decorative ambient glows */}
      <div className="absolute top-24 left-1/4 w-[400px] h-[400px] rounded-full bg-[#E2C27A]/10 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-24 right-1/4 w-[400px] h-[400px] rounded-full bg-[#E2C27A]/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">

        {/* Section Heading */}
        <div className="border-b border-zinc-150 pb-6">
          <div className="flex flex-col gap-2 text-left">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 border border-[#E2C27A]/30 bg-[#E2C27A]/10 text-amber-800 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider select-none rounded-full w-fit">
              {labels.eyebrow}
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-zinc-900 tracking-wide">
              {labels.heading}
            </h2>
            <p className="max-w-xl text-zinc-600 font-medium text-[11px] sm:text-xs font-sans leading-relaxed">
              {labels.subheading}
            </p>
          </div>
        </div>

        {/* Gems Showcase Horizontal Carousel */}
        {loading ? (
          <div className="flex justify-center items-center py-20 text-amber-800 text-xs font-sans select-none tracking-widest uppercase animate-pulse">
            Loading Certified Gems...
          </div>
        ) : (
          <div className="relative w-full z-10">
            {isCarousel && (
              <>
                {/* Scroll Navigation Arrows on Sides */}
                <button
                  onClick={scrollLeft}
                  className="absolute left-1 sm:-left-8 lg:-left-12 top-1/2 -translate-y-1/2 z-20 bg-violet text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-[#E2C27A] hover:text-black transition-all duration-200 cursor-pointer shadow-lg active:scale-90 select-none"
                  aria-label="Scroll Left"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                
                <button
                  onClick={scrollRight}
                  className="absolute right-1 sm:-right-8 lg:-right-12 top-1/2 -translate-y-1/2 z-20 bg-violet text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-[#E2C27A] hover:text-black transition-all duration-200 cursor-pointer shadow-lg active:scale-90 select-none"
                  aria-label="Scroll Right"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </>
            )}

            {isCarousel ? (
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto gap-5 scrollbar-hide no-scrollbar scroll-smooth py-2 px-1 select-none"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none"
                }}
              >
                {gemsList.map((gem) => {
                  return (
                    <GemstoneCard
                      key={gem.id}
                      gem={gem}
                      activeLocale={activeLocale}
                      labels={labels}
                      getPrefilledWhatsappUrl={getPrefilledWhatsappUrl}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center py-2 px-1">
                {gemsList.map((gem) => {
                  return (
                    <GemstoneCard
                      key={gem.id}
                      gem={gem}
                      activeLocale={activeLocale}
                      labels={labels}
                      getPrefilledWhatsappUrl={getPrefilledWhatsappUrl}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
