"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
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
        
        {/* Today's Counter (Centered at the top) */}
        <div className="flex justify-center">
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

        {/* Dynamic Categories Grid Layout (Amazon-like style on top of dark celestial bg) */}
        {categoriesList.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 animate-pulse">
            {[1, 2, 3, 4, 5].map((idx, index) => (
              <div
                key={idx}
                className={cn(
                  "bg-[#FFFDF4]/95 border border-[#E2C27A]/20 rounded-2xl p-4 sm:p-5 flex flex-col justify-between h-48",
                  index === 4 && "col-span-2 md:col-span-2 lg:col-span-1"
                )}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {categoriesList.map((cat, index) => {
              const labelText = cat.label[activeLocale as keyof typeof cat.label] || cat.label.en;
              const isLastCard = index === categoriesList.length - 1;
              return (
                <div
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat)}
                  className={cn(
                    "bg-[#FFFDF4]/95 border border-[#E2C27A]/30 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1.5 active:translate-y-0 transition-all duration-300 cursor-pointer group",
                    isLastCard && categoriesList.length === 5 ? "col-span-2 md:col-span-2 lg:col-span-1" : ""
                  )}
                >
                  {isLastCard && categoriesList.length === 5 ? (
                    <div className="flex flex-row lg:flex-col items-center lg:items-stretch justify-between w-full h-full gap-4">
                      {/* Left Side: Content */}
                      <div className="flex flex-col justify-between flex-1 h-full py-1">
                        <h3 className="category-title-custom font-serif text-xs sm:text-sm md:text-base font-bold tracking-wide line-clamp-2 transition-colors duration-300">
                          {labelText}
                        </h3>
                        <div className="text-[10px] sm:text-xs font-sans font-bold text-[#b28b3a] group-hover:text-[#9A6B24] mt-2 flex items-center gap-1 transition-colors duration-300">
                          <span>{activeLocale === "hin" ? "अभी खरीदें" : activeLocale === "bn" ? "এখনই কিনুন" : "Shop Now"}</span>
                          <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </div>
                      </div>
                      
                      {/* Right Side: Image */}
                      <div className="w-[120px] sm:w-[150px] lg:w-full aspect-[4/3] lg:aspect-square rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center relative shrink-0">
                        <img 
                          src={cat.imageUrl || "/gemstones/placeholder.png"} 
                          alt={labelText} 
                          className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-500" 
                          draggable={false}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3">
                        {/* Category Title */}
                        <h3 className="category-title-custom font-serif text-xs sm:text-sm md:text-base font-bold tracking-wide line-clamp-1 transition-colors duration-300">
                          {labelText}
                        </h3>
                        
                        {/* Category Visual Box */}
                        <div className="aspect-square w-full rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center relative">
                          <img 
                            src={cat.imageUrl || "/gemstones/placeholder.png"} 
                            alt={labelText} 
                            className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-500" 
                            draggable={false}
                          />
                        </div>
                      </div>

                      {/* Call-to-action Explore/Shop link at bottom */}
                      <div className="text-[10px] sm:text-xs font-sans font-bold text-[#b28b3a] group-hover:text-[#9A6B24] mt-4 flex items-center gap-1 transition-colors duration-300">
                        <span>{activeLocale === "hin" ? "अभी खरीदें" : activeLocale === "bn" ? "এখনই কিনুন" : "Shop Now"}</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
