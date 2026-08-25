"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import GEMS_DATA from "@/lib/data/gems.json";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { productsQuery } from "@/sanity/lib/queries";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ExploreAllButton } from "@/components/shared/ExploreAllButton";
import { SITE } from "@/lib/seo";

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
  productType?: "gemstone" | "rudraksha" | "crystal-bracelets" | "vastu-products";
}

function GemstoneCard({ gem, activeLocale, labels, getPrefilledWhatsappUrl, productType }: GemstoneCardProps) {
  const [selectedTier, setSelectedTier] = useState<"basic" | "semi_premium" | "premium">("basic");
  const [isZoomed, setIsZoomed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const gemName = gem.name[activeLocale] || gem.name["en"];
  const gemDesc = gem.description[activeLocale] || gem.description["en"];

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
  const whatsappUrl = productType === "gemstone"
    ? getPrefilledWhatsappUrl(`${gemName} (${activeTierLabel} Quality)`)
    : getPrefilledWhatsappUrl(gemName);

  return (
    <>
      <CardSpotlight
        color={glowColor}
        radius={180}
        useCanvas={false}
      className={cn(
        "group/gem transition-all duration-300 border rounded-2xl flex flex-col justify-between overflow-hidden p-4 select-none relative shadow-sm hover:shadow-md bg-white hover:-translate-y-1 w-[275px] shrink-0 will-change-transform [transform:translate3d(0,0,0)]",
        productType === "gemstone" ? "min-h-[19rem]" : "min-h-[16rem]"
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
        {/* Large Gemstone Image frame */}
        <div 
          onClick={() => setIsZoomed(true)}
          className="relative w-full h-32 shrink-0 rounded-xl border border-zinc-150/80 bg-zinc-50/50 p-2 overflow-hidden flex items-center justify-center shadow-sm cursor-zoom-in hover:border-[#E2C27A]/80 transition-colors"
        >
          <div
            className="absolute inset-0 opacity-15 blur-md scale-90 pointer-events-none"
            style={{ backgroundColor: glowColor.replace("0.08", "0.4") }}
          />
          <img
            src={gem.src}
            alt={gemName}
            className="h-full object-contain rounded-lg select-none z-10 transition-transform duration-300 group-hover/gem:scale-110"
            draggable={false}
          />
        </div>

        {/* Gemstone Info & Price Row */}
        <div className="flex justify-between items-start gap-2 border-b border-zinc-100 pb-2">
          <div className="flex flex-col gap-0.5 min-w-0 flex-1">
            <h3 className="font-serif text-sm sm:text-base font-bold tracking-wide transition-colors" style={{ color: "#221A3D" }}>
              {gemName}
            </h3>
            <p className="text-[10px] font-medium leading-relaxed line-clamp-2 font-sans h-7" style={{ color: "#4A4566" }}>
              {gemDesc}
            </p>
          </div>

          {/* Price display */}
          <div className="flex flex-col items-end text-right font-sans shrink-0 ml-1">
            <span className="text-[8px] font-bold uppercase tracking-wider" style={{ color: "#6E698A" }}>
              {labels.priceLabel}
            </span>
            <div className="flex flex-col items-end mt-0.5">
              {hasSale && (
                <span className="text-[9px] line-through leading-none font-bold mb-0.5" style={{ color: "#9CA3AF" }}>
                  ₹{activeBase.toLocaleString()}
                </span>
              )}
              <span className="font-serif font-bold text-sm sm:text-base leading-none" style={{ color: "#78350F" }}>
                ₹{displayPrice.toLocaleString()}
              </span>
            </div>
            <span className="text-[8px] font-bold mt-0.5" style={{ color: "#6E698A" }}>
              {labels.pricePerCt}
            </span>
          </div>
        </div>

        {/* Quality Tiers Selection Pills */}
        {productType === "gemstone" && (
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
        )}

      </div>

      {/* Action button */}
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
      </div>
    </CardSpotlight>

    {mounted && isZoomed && createPortal(
      <div 
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-250"
        onClick={() => setIsZoomed(false)}
      >
        {/* Close button */}
        <button 
          className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors z-50 cursor-pointer border-0"
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed(false);
          }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center gap-4 select-none">
          <img
            src={gem.src}
            alt={gemName}
            className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl animate-in zoom-in-95 duration-250 cursor-zoom-out"
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(false);
            }}
            draggable={false}
          />
          <h3 className="text-white text-xl sm:text-2xl font-serif font-bold text-center tracking-wide">
            {gemName}
          </h3>
        </div>
      </div>,
      document.body
    )}
  </>
  );
}

interface GemstoneGridProps {
  locale?: string;
  limit?: number;
  initialProducts?: any[];
  isCarousel?: boolean;
  productType?: "gemstone" | "rudraksha" | "crystal-bracelets" | "vastu-products";
}

export default function GemstoneGrid({ 
  locale = "en", 
  limit, 
  initialProducts, 
  isCarousel = true,
  productType = "gemstone"
}: GemstoneGridProps) {
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
    return `https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  // Filter to gemstones only
  const isGem = (p: any) => {
    const catName = p.category?.name?.toLowerCase() || "";
    const catSlug = p.category?.slug?.current?.toLowerCase() || "";
    return catName.includes("gemstone") || catName.includes("gem") || catSlug.includes("gemstone") || catSlug.includes("gem");
  };

  const isRudraksha = (p: any) => {
    const catName = p.category?.name?.toLowerCase() || "";
    const catSlug = p.category?.slug?.current?.toLowerCase() || "";
    return catName.includes("rudraksha") || catSlug.includes("rudraksha");
  };

  const isCrystalBracelet = (p: any) => {
    const catName = p.category?.name?.toLowerCase() || "";
    const catSlug = p.category?.slug?.current?.toLowerCase() || "";
    return catName.includes("bracelet") || catSlug.includes("bracelet") || catName.includes("crystal") || catSlug.includes("crystal");
  };

  const isVastuProduct = (p: any) => {
    const catName = p.category?.name?.toLowerCase() || "";
    const catSlug = p.category?.slug?.current?.toLowerCase() || "";
    return catName.includes("vastu") || catSlug.includes("vastu");
  };

  const dbProductsFiltered = products.filter(
    productType === "crystal-bracelets"
      ? isCrystalBracelet
      : productType === "rudraksha"
      ? isRudraksha
      : productType === "vastu-products"
      ? isVastuProduct
      : isGem
  );

  // Map products. If database products have items, use them; otherwise, use fallbacks.
  let gemsList: GemInfo[] = [];
  if (dbProductsFiltered.length > 0) {
    gemsList = dbProductsFiltered.map(mapSanityProductToGemInfo);
  } else if (productType === "gemstone") {
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
  } else if (productType === "crystal-bracelets") {
    gemsList = [
      {
        id: "mock-bracelet-1",
        name: {
          en: "Amethyst Crystal Bracelet",
          hin: "एमेथिस्ट क्रिस्टल ब्रेसलेट",
          bn: "অ্যামিথিস্ট ক্রিস্টাল ব্রেসলেট"
        },
        type: {
          en: "Crystal Bracelet",
          hin: "क्रिस्टल ब्रेसलेट",
          bn: "ক্রিস্টাল ব্রেসলেট"
        },
        description: {
          en: "Natural amethyst beads bracelet for mental peace, stress relief, and spiritual growth.",
          hin: "मानसिक शांति, तनाव मुक्ति और आध्यात्मिक विकास के लिए प्राकृतिक एमेथिस्ट ब्रेसलेट।",
          bn: "মানসিক শান্তি, মানসিক চাপ উপশম এবং আধ্যাত্মিক উন্নতির জন্য প্রাকৃতিক অ্যামিথিস্ট ব্রেসলেট।"
        },
        zodiac: {
          en: "Capricorn, Aquarius",
          hin: "मकर, कुंभ",
          bn: "মকর, কুম্ভ"
        },
        ruler: {
          en: "Saturn (Shani)",
          hin: "शनि",
          bn: "শনি"
        },
        origin: {
          en: "Brazil",
          hin: "ब्राजील",
          bn: "ব্রাজিল"
        },
        pricePerCarat: 899,
        isBestSelling: true,
        src: "/assets/gems/amethyst.webp"
      },
      {
        id: "mock-bracelet-2",
        name: {
          en: "Tiger's Eye Bracelet",
          hin: "टाइगर आई ब्रेसलेट",
          bn: "टाइगर्स আই ব্রেসলেট"
        },
        type: {
          en: "Crystal Bracelet",
          hin: "क्रिस्टल ब्रेसলেট",
          bn: "ক্রিস্টাল ব্রেসলেট"
        },
        description: {
          en: "Authentic Tiger's Eye beads for courage, focus, prosperity, and willpower.",
          hin: "साहस, एकाग्रता, समृद्धि और इच्छाशक्ति के लिए प्रामाणिक टाइगर आई ब्रेसलेट।",
          bn: "সাহস, একাগ্রতা, সমৃদ্ধি এবং ইচ্ছাশক্তির জন্য আসল টাইগার্স আই ব্রেসলেট।"
        },
        zodiac: {
          en: "Leo, Gemini",
          hin: "सिंह, मिथुन",
          bn: "সিংহ, মিথুন"
        },
        ruler: {
          en: "Sun & Mars",
          hin: "सूर्य और मंगल",
          bn: "সূর্য ও মঙ্গল"
        },
        origin: {
          en: "South Africa",
          hin: "दक्षिण अफ्रीका",
          bn: "দক্ষিণ আফ্রিকা"
        },
        pricePerCarat: 750,
        isBestSelling: false,
        src: "/assets/gems/citrine.webp"
      },
      {
        id: "mock-bracelet-3",
        name: {
          en: "Rose Quartz Healing Bracelet",
          hin: "रोज क्वार्ट्ज ब्रेसलेट",
          bn: "রোজ কোয়ার্টজ ব্রেসলেট"
        },
        type: {
          en: "Crystal Bracelet",
          hin: "क्रिस्टल ब्रेसলেট",
          bn: "ক্রিস্টাল ব্রেসলেট"
        },
        description: {
          en: "Universal love crystal bracelet to attract positivity, harmony, and emotional healing.",
          hin: "सकारात्मकता, सद्भाव और भावनात्मक उपचार को आकर्षित करने के लिए सार्वभौमिक प्रेम क्रिस्टल ब्रेसलेट।",
          bn: "ইতিবাচকতা, সম্প্রীতি এবং মানসিক নিরাময় আকর্ষণ করার জন্য সার্বজনীন ভালোবাসার ক্রিস্টাল ব্রেসলেট।"
        },
        zodiac: {
          en: "Taurus, Libra",
          hin: "वृष, तुला",
          bn: "বৃষ, তুলা"
        },
        ruler: {
          en: "Venus (Shukra)",
          hin: "शुक्र",
          bn: "শুক্র"
        },
        origin: {
          en: "Madagascar",
          hin: "मेडागास्कर",
          bn: "মাদাগাস্কার"
        },
        pricePerCarat: 999,
        isBestSelling: true,
        src: "/assets/gems/opal.webp"
      }
    ];
  } else if (productType === "vastu-products") {
    gemsList = [
      {
        id: "mock-vastu-1",
        name: {
          en: "Vastu Painting New House",
          hin: "वास्तु पेंटिंग नया घर",
          bn: "বাস্তু পেইন্টিং নতুন বাড়ি"
        },
        type: {
          en: "Vastu Painting",
          hin: "वास्तु पेंटिंग",
          bn: "বাস্তু পেইন্টিং"
        },
        description: {
          en: "Specialized Vastu painting to attract positive energy and prosperity to a new house.",
          hin: "नए घर में सकारात्मक ऊर्जा और समृद्धि को आकर्षित करने के लिए विशेष वास्तु पेंटिंग।",
          bn: "নতুন বাড়িতে ইতিবাচক শক্তি এবং সমৃদ্ধি আকর্ষণ করার জন্য বিশেষ বাস্তু পেইন্টিং।"
        },
        zodiac: {
          en: "All",
          hin: "सभी",
          bn: "সব"
        },
        ruler: {
          en: "Sun (Surya)",
          hin: "सूर्य",
          bn: "সূর্য"
        },
        origin: {
          en: "India",
          hin: "भारत",
          bn: "ভারত"
        },
        pricePerCarat: 2499,
        isBestSelling: true,
        src: "/gemstones/placeholder.png"
      },
      {
        id: "mock-vastu-2",
        name: {
          en: "Vastu Painting Money Flow (flowing river)",
          hin: "वास्तु पेंटिंग मनी फ्लो (बहती नदी)",
          bn: "বাস্তু পেইন্টিং মানি ফ্লো (বহমান নদী)"
        },
        type: {
          en: "Vastu Painting",
          hin: "वास्तु पेंटिंग",
          bn: "বাস্তু পেইন্টিং"
        },
        description: {
          en: "Flowing water painting representing continuous abundance and cash flow.",
          hin: "निरंतर प्रचुरता और धन प्रवाह का प्रतिनिधित्व करने वाली बहती नदी की पेंटिंग।",
          bn: "অবিরাম প্রাচুর্য এবং অর্থ প্রবাহের প্রতিনিধিত্বকারী বহমান নদীর পেইন্টিং।"
        },
        zodiac: {
          en: "All",
          hin: "सभी",
          bn: "সব"
        },
        ruler: {
          en: "Varuna",
          hin: "वरुण",
          bn: "বরুণ"
        },
        origin: {
          en: "India",
          hin: "भारत",
          bn: "ভারত"
        },
        pricePerCarat: 3100,
        isBestSelling: true,
        src: "/gemstones/placeholder.png"
      },
      {
        id: "mock-vastu-3",
        name: {
          en: "Vastu Painting Business Growth (Seven Horses)",
          hin: "वास्तु पेंटिंग बिजनेस ग्रोथ (सात घोड़े)",
          bn: "বাস্তু পেইন্টিং বিজনেস গ্রোথ (সাতটি ঘোড়া)"
        },
        type: {
          en: "Vastu Painting",
          hin: "वास्तु पेंटिंग",
          bn: "বাস্তু পেইন্টিং"
        },
        description: {
          en: "Running seven horses painting to boost success, speed, and business growth.",
          hin: "सफलता, गति और व्यावसायिक विकास को बढ़ावा देने के लिए दौड़ते सात घोड़ों की पेंटिंग।",
          bn: "সাফল্য, গতি এবং ব্যবসায়িক বৃদ্ধি বাড়াতে চলমান সাতটি ঘোড়ার পেইন্টিং।"
        },
        zodiac: {
          en: "All",
          hin: "सभी",
          bn: "সব"
        },
        ruler: {
          en: "Mars (Mangal)",
          hin: "मंगल",
          bn: "মঙ্গল"
        },
        origin: {
          en: "India",
          hin: "भारत",
          bn: "ভারত"
        },
        pricePerCarat: 5100,
        isBestSelling: true,
        src: "/gemstones/placeholder.png"
      },
      {
        id: "mock-vastu-4",
        name: {
          en: "Shree Yantra (brass)",
          hin: "श्री यंत्र (पीतल)",
          bn: "শ্রী যন্ত্র (পিতল)"
        },
        type: {
          en: "Vastu Yantra",
          hin: "वास्तु यंत्र",
          bn: "বাস্তু যন্ত্র"
        },
        description: {
          en: "Brass Shree Yantra for wealth, abundance, and removing financial blocks.",
          hin: "धन, समृद्धि और वित्तीय बाधाओं को दूर करने के लिए पीतल का श्री यंत्र।",
          bn: "সম্পদ, প্রাচুর্য এবং আর্থিক বাধা দূর করতে পিতলের শ্রী যন্ত্র।"
        },
        zodiac: {
          en: "All",
          hin: "सभी",
          bn: "সব"
        },
        ruler: {
          en: "Laxmi",
          hin: "लक्ष्मी",
          bn: "লক্ষ্মী"
        },
        origin: {
          en: "India",
          hin: "भारत",
          bn: "ভারত"
        },
        pricePerCarat: 699,
        isBestSelling: false,
        src: "/gemstones/placeholder.png"
      }
    ];
  }

  // Sort so that Best Sellers appear first
  gemsList = [...gemsList].sort((a, b) => {
    const aBest = a.isBestSelling ? 1 : 0;
    const bBest = b.isBestSelling ? 1 : 0;
    return bBest - aBest;
  });

  if (limit !== undefined) {
    gemsList = gemsList.slice(0, limit);
  }

  if (gemsList.length === 0) return null;

  // Dictionary fallbacks for header elements
  const labelsObj = {
    en: {
      eyebrow: productType === "rudraksha" 
        ? "✦ Sacred Spiritual Beads" 
        : productType === "crystal-bracelets"
        ? "✦ Natural Energy & Healing Bracelets"
        : productType === "vastu-products"
        ? "✦ Harmonious Space & Vastu Remedies"
        : "✦ Certified Remedies & Treasures",
      heading: productType === "rudraksha" 
        ? "Explore Sacred Rudraksha" 
        : productType === "crystal-bracelets"
        ? "Explore Crystal Bracelets"
        : productType === "vastu-products"
        ? "Explore Vastu Products"
        : "Explore Certified Gemstones",
      subheading: productType === "rudraksha"
        ? "Find authentic, laboratory-tested Rudraksha beads to awaken inner peace, energy alignment, and divine protection."
        : productType === "crystal-bracelets"
        ? "Discover authentic healing crystal bracelets configured to align your energy centers, protect your aura, and attract abundance."
        : productType === "vastu-products"
        ? "Optimize the flow of energy in your home or office with our authentic, certified Vastu yantras, paintings, and remedies."
        : "Find lab-certified, natural gemstones aligned with your birth chart. Enhance planetary influences and invite positivity into your life.",
      planet: "Ruler",
      zodiacLabel: "Zodiac",
      origin: "Origin",
      priceLabel: "Price starting at",
      pricePerCt: (productType === "rudraksha" || productType === "crystal-bracelets" || productType === "vastu-products") ? "/ Piece" : "/ Carat",
      inquireBtn: "Inquire",
      buyNowBtn: "Buy Now"
    },
    hin: {
      eyebrow: productType === "rudraksha" 
        ? "✦ पवित्र आध्यात्मिक मनके" 
        : productType === "crystal-bracelets"
        ? "✦ प्राकृतिक ऊर्जा और हीलिंग ब्रेसलेट्स"
        : productType === "vastu-products"
        ? "✦ सामंजस्यपूर्ण स्थान और वास्तु उपाय"
        : "✦ प्रमाणित उपचार और रत्न",
      heading: productType === "rudraksha" 
        ? "प्राकृतिक रुद्राक्ष की खोज करें" 
        : productType === "crystal-bracelets"
        ? "क्रिस्टल ब्रेसलेट्स की खोज करें"
        : productType === "vastu-products"
        ? "वास्तु उत्पादों की खोज करें"
        : "प्रमाणित रत्नों की खोज करें",
      subheading: productType === "rudraksha"
        ? "आंतरिक शांति, ऊर्जा संतुलन और दैवीय सुरक्षा के लिए प्रमाणित, प्राकृतिक रुद्राक्ष मनके खोजें।"
        : productType === "crystal-bracelets"
        ? "ऊर्जा केंद्रों को संतुलित करने, आभा की रक्षा करने और समृद्धि को आकर्षित करने के लिए प्रामाणिक हीलिंग क्रिस्टल ब्रेसलेट्स खोजें।"
        : productType === "vastu-products"
        ? "ऊर्जा के प्रवाह को अनुकूलित करने और सद्भाव लाने के लिए हमारे प्रामाणिक, प्रमाणित वास्तु यंत्र, पेंटिंग और उपचार देखें।"
        : "अपनी जन्म कुंडली के अनुसार प्रमाणित, प्राकृतिक रत्न खोजें। ग्रहों के प्रभावों को बढ़ाएं और जीवन में सकारात्मकता लाएं।",
      planet: "स्वामी",
      zodiacLabel: "राशि",
      origin: "उत्पत्ति",
      priceLabel: "शुरुआती कीमत",
      pricePerCt: (productType === "rudraksha" || productType === "crystal-bracelets" || productType === "vastu-products") ? "/ पीस" : "/ कैरेट",
      inquireBtn: "पूछताछ करें",
      buyNowBtn: "अभी खरीदें"
    },
    bn: {
      eyebrow: productType === "rudraksha" 
        ? "✦ পবিত্র আধ্যাত্মিক রুদ্রাক্ষ" 
        : productType === "crystal-bracelets"
        ? "✦ প্রাকৃতিক শক্তি ও হিলিং ব্রেসলেট"
        : productType === "vastu-products"
        ? "✦ সুসংগত স্থান ও বাস্তু প্রতিকার"
        : "✦ প্রত্যয়িত প্রতিকার ও রত্নাবলী",
      heading: productType === "rudraksha" 
        ? "প্রাকৃতিক রুদ্রাক্ষ অনুসন্ধান করুন" 
        : productType === "crystal-bracelets"
        ? "ক্রিস্টাল ব্রেসলেট অনুসন্ধান করুন"
        : productType === "vastu-products"
        ? "বাস্তু পণ্য অনুসন্ধান করুন"
        : "প্রত্যয়িত রত্ন পাথর খুঁজুন",
      subheading: productType === "rudraksha"
        ? "মানসিক শান্তি, শক্তি নিয়ন্ত্রণ এবং স্বর্গীয় সুরক্ষার জন্য ল্যাব-প্রত্যয়িত প্রাকৃতিক রুদ্রাক্ষ নির্বাচন করুন।"
        : productType === "crystal-bracelets"
        ? "আপনার চক্র নিয়ন্ত্রণ করতে, নেতিবাচক শক্তি দূর করতে এবং সমৃদ্ধি আকর্ষণ করতে আসল ক্রিস্টাল ব্রেসলেট নির্বাচন করুন।"
        : productType === "vastu-products"
        ? "আপনার বাড়ি বা অফিসে শক্তির প্রবাহ উন্নত করতে আমাদের আসল, প্রত্যয়িত বাস্তু যন্ত্র, পেইন্টিং এবং প্রতিকারগুলি আবিষ্কার করুন।"
        : "আপনার জন্মপত্রিকা অনুযায়ী প্রাকৃতিক এবং ল্যাব-প্রত্যয়িত রত্ন পাথর নির্বাচন করুন। গ্রহের শুভ প্রভাব বাড়ান ও জীবনে সাফল্য আনুন।",
      planet: "অধিপতি",
      zodiacLabel: "রাশি",
      origin: "উৎস",
      priceLabel: "মূল্য শুরু",
      pricePerCt: (productType === "rudraksha" || productType === "crystal-bracelets" || productType === "vastu-products") ? "/ পিস" : "/ ক্যারেট",
      inquireBtn: "যোগাযোগ করুন",
      buyNowBtn: "এখনই কিনুন"
    }
  };
  const labels = labelsObj[activeLocale as keyof typeof labelsObj];

  return (
    <section
      id={
        productType === "rudraksha" 
          ? "rudraksha-section" 
          : productType === "crystal-bracelets"
          ? "bracelets-section"
          : productType === "vastu-products"
          ? "vastu-section"
          : "gemstones-section"
      }
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
                      productType={productType}
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
                      productType={productType}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}

        {isCarousel && (
          <ExploreAllButton
            href={
              productType === "rudraksha" 
                ? `/${locale}/rudraksha` 
                : productType === "crystal-bracelets"
                ? `/${locale}/bracelets`
                : productType === "vastu-products"
                ? `/${locale}/vastu-products`
                : `/${locale}/gemstones`
            }
            label={
              productType === "rudraksha"
                ? (activeLocale === "hin" ? "सभी रुद्राक्ष देखें" : activeLocale === "bn" ? "সমস্ত রুদ্রাক্ষ দেখুন" : "Explore All Rudraksha")
                : productType === "crystal-bracelets"
                ? (activeLocale === "hin" ? "सभी ब्रेसलेट्स देखें" : activeLocale === "bn" ? "সমস্ত ব্রেসলেট দেখুন" : "Explore All Bracelets")
                : productType === "vastu-products"
                ? (activeLocale === "hin" ? "सभी वास्तु उत्पाद देखें" : activeLocale === "bn" ? "সমস্ত বাস্তু পণ্য দেখুন" : "Explore All Vastu Products")
                : (activeLocale === "hin" ? "सभी रत्नों की खोज करें" : activeLocale === "bn" ? "সমস্ত রত্ন পাথর দেখুন" : "Explore All Gemstones")
            }
          />
        )}
      </div>
    </section>
  );
}
