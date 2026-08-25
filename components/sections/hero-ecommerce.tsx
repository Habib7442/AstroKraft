"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";
import { useCMSStore } from "@/lib/store/useCMSStore";

interface CategoryItem {
  id: string;
  label: {
    en: string;
    hin: string;
    bn: string;
  };
  href: string;
  imageUrl?: string;
}

interface HeroEcommerceProps {
  locale: string;
}

export function HeroEcommerce({ locale }: HeroEcommerceProps) {
  const initialCategories = useCMSStore((state) => state.categories);
  const router = useRouter();
  const pathname = usePathname();
  const activeLocale = ["en", "hin", "bn"].includes(locale) ? locale : "en";

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/` || pathname === "/";

  const handleCategoryClick = (cat: CategoryItem) => {
    const isConsult = cat.href.includes("consultation") || cat.href.includes("consult");
    const isRudraksha = cat.href.includes("rudraksha");
    const isBracelet = cat.href.includes("bracelet") || cat.href.includes("crystal-bracelets");
    const isVastu = cat.href.includes("vastu");
    const targetId = isConsult 
      ? "services-section" 
      : isRudraksha 
        ? "rudraksha-section" 
        : isBracelet
          ? "bracelets-section"
          : isVastu
            ? "vastu-section"
            : "gemstones-section";

    if (isHome) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      router.push(`/${locale}?scroll=${targetId}`);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const scrollToId = params.get("scroll");
      if (scrollToId) {
        const timer = setTimeout(() => {
          const el = document.getElementById(scrollToId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            const url = new URL(window.location.href);
            url.searchParams.delete("scroll");
            window.history.replaceState({}, "", url.pathname + url.search);
          }
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const categoriesList: CategoryItem[] = (initialCategories || []).map((cat: any) => {
    const slugVal = cat.slug?.current || cat.name.toLowerCase().replace(/\s+/g, "-");
    const imageUrl = cat.image ? urlFor(cat.image).width(300).height(300).fit('crop').auto('format').url() : undefined;
    return {
      id: cat._id,
      label: {
        en: cat.name,
        hin: cat.name,
        bn: cat.name
      },
      href: slugVal.includes("consult") 
        ? `/${locale}/consultation` 
        : slugVal.includes("rudraksha")
        ? `/${locale}/rudraksha`
        : (slugVal.includes("bracelet") || slugVal.includes("crystal-bracelets"))
        ? `/${locale}/bracelets`
        : (slugVal.includes("vastu") || slugVal.includes("vastu-products"))
        ? `/${locale}/vastu-products`
        : `/${locale}/gemstones?category=${slugVal}`,
      imageUrl: imageUrl
    };
  });

  return (
    <div 
      className="w-full pt-6 pb-12 select-none relative overflow-hidden border-b border-[#E2C27A]/20"
      style={{
        background: "linear-gradient(135deg, #0B1026 0%, #2A1A5E 50%, #4C1D95 100%)"
      }}
    >
      {/* Stars constellation overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none z-0" />
      
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-8">

        {/* Server-rendered heading & primary CTA — crawlable, not client-only. Kept short: the category grid below is the real navigation. */}
        <div className="flex flex-col items-start text-left gap-3 pt-2">
          <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white max-w-2xl">
            {activeLocale === "hin"
              ? "प्रमाणित रत्न और वैदिक ज्योतिष मार्गदर्शन"
              : activeLocale === "bn"
              ? "প্রত্যয়িত রত্ন ও বৈদিক জ্যোতিষ দিকনির্দেশনা"
              : "Certified Gemstones & Vedic Astrology Guidance"}
          </h1>
          <a
            href={`/${locale}/astrologers`}
            className="inline-flex items-center justify-center bg-[#E2C27A] hover:bg-[#d4b36a] text-black font-bold py-2.5 px-7 rounded-full shadow-sm text-xs sm:text-sm transition-all hover:-translate-y-0.5"
          >
            {activeLocale === "hin" ? "ज्योतिषी से बात करें" : activeLocale === "bn" ? "জ্যোতিষীর সাথে কথা বলুন" : "Talk to an Astrologer"}
          </a>
        </div>

        {/* Today's Counter */}
        <div className="flex justify-start">
          <div className="flex items-center gap-2 bg-white/5 border border-[#E2C27A]/30 px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E2C27A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E2C27A]"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-extrabold tracking-widest text-[#ECD9A0] uppercase">
              {activeLocale === "hin" ? "360+ आज परामर्श लिया" : activeLocale === "bn" ? "৩৬০+ আজ পরামর্শ নিয়েছেন" : "360+ CONSULTED TODAY"}
            </span>
          </div>
        </div>

        {/* Shop By Category — circular avatar style */}
        <div className="flex flex-col gap-3">
          <h2 className="text-sm sm:text-base font-bold text-white/90 px-0.5">
            {activeLocale === "hin" ? "श्रेणी अनुसार खरीदें" : activeLocale === "bn" ? "বিভাগ অনুযায়ী কিনুন" : "Shop By Category"}
          </h2>

          {categoriesList.length === 0 ? (
            <div className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none pb-1">
              {[1, 2, 3, 4, 5].map((idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 shrink-0 animate-pulse">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10" />
                  <div className="w-12 h-2.5 rounded-full bg-white/10" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none pb-1">
              {categoriesList.map((cat) => {
                const labelText = cat.label[activeLocale as keyof typeof cat.label] || cat.label.en;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat)}
                    className="flex flex-col items-center gap-2 shrink-0 w-20 sm:w-24 cursor-pointer group"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#E2C27A]/40 bg-[#FFFDF4] shadow-md group-hover:border-[#E2C27A] group-hover:-translate-y-1 transition-all duration-300">
                      <img
                        src={cat.imageUrl || "/gemstones/placeholder.png"}
                        alt={labelText}
                        className="w-full h-full object-cover select-none"
                        draggable={false}
                      />
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-white/90 group-hover:text-[#E2C27A] text-center leading-tight transition-colors">
                      {labelText}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
