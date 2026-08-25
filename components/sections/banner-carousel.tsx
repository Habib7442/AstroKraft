"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCMSStore } from "@/lib/store/useCMSStore";
import { urlFor } from "@/sanity/lib/image";

export function BannerCarousel() {
  const banners = useCMSStore((state) => state.banners);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Keep currentSlide in range if the CMS banner list shrinks
  useEffect(() => {
    if (banners?.length) {
      setCurrentSlide((previous) => Math.min(previous, banners.length - 1));
    }
  }, [banners?.length]);

  // Auto-slide effect
  useEffect(() => {
    if (!banners || banners.length <= 1 || isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000); // slide every 4 seconds
    return () => clearInterval(interval);
  }, [banners?.length, isHovered]);

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!banners || banners.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!banners || banners.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  if (!banners || banners.length === 0) return null;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full bg-[#120d26] border-b border-[#E2C27A]/20 relative group/carousel overflow-hidden h-[130px] sm:h-[200px] md:h-[270px] lg:h-[340px] select-none"
    >
      {/* Slides wrapper */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner: any, index: number) => {
          const bannerImg = banner.image ? urlFor(banner.image).width(1200).auto('format').url() : "";
          const slideContent = (
            <div className="w-full h-full relative">
              {bannerImg ? (
                <img
                  src={bannerImg}
                  alt={banner.title || "Promotional Banner"}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#120d26] to-[#2A1A5E] text-white">
                  <span className="text-sm font-bold tracking-wider uppercase">{banner.title}</span>
                </div>
              )}
            </div>
          );

          if (banner.link) {
            const isExternal = banner.link.startsWith("http");
            return (
              <a
                key={banner._id || index}
                href={banner.link}
                target={isExternal ? "_blank" : "_self"}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="w-full h-full shrink-0 block cursor-pointer"
              >
                {slideContent}
              </a>
            );
          }

          return (
            <div key={banner._id || index} className="w-full h-full shrink-0">
              {slideContent}
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows (Only show if multiple banners) */}
      {banners.length > 1 && (
        <>
          <button
            onClick={handlePrevSlide}
            aria-label="Previous banner"
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-[#E2C27A] hover:text-black text-white border border-white/10 hover:border-transparent transition-all cursor-pointer opacity-0 group-hover/carousel:opacity-100 focus-visible:opacity-100 z-10 shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextSlide}
            aria-label="Next banner"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-[#E2C27A] hover:text-black text-white border border-white/10 hover:border-transparent transition-all cursor-pointer opacity-0 group-hover/carousel:opacity-100 focus-visible:opacity-100 z-10 shadow-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {banners.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
          {banners.map((_: any, idx: number) => (
            <button
              key={idx}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentSlide(idx);
              }}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                currentSlide === idx ? "bg-[#E2C27A] w-4.5" : "bg-white/40 hover:bg-white/70"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
