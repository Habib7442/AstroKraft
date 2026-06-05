"use client";

import React from "react";
import { MessageCircle, ShieldCheck, Gem, UserCheck, Users } from "lucide-react";
import { Button } from "../ui/button";

import Globe3DDemo from "@/components/3d-globe-demo";

interface HeroProps {
  locale: string;
  dict: any;
}

export function Hero({ locale, dict }: HeroProps) {
  return (
    <section className="relative w-full overflow-hidden border-b border-border pt-26 pb-12 md:pt-32 md:pb-20 lg:pt-28 lg:pb-24 bg-background flex flex-col justify-center items-center">
      {/* Space background image overlay */}
      <img
        src="/assets/hero_bg.webp"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover object-right md:object-center opacity-[0.12] dark:opacity-[0.22] pointer-events-none z-0 select-none"
      />

      {/* Solid Spotlight Overlay (Single Violet/Gold Glows) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[650px] h-[350px] md:h-[650px] rounded-full bg-primary/10 dark:bg-primary/5 blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] md:w-[450px] h-[250px] md:h-[450px] rounded-full bg-gold/5 dark:bg-gold/5 blur-[110px] pointer-events-none z-0" />

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full">
          {/* Left Column: Text Content & CTAs */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-7 md:gap-8 lg:col-span-7 w-full">
            {/* Eyebrow Label */}
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/5 text-[11px] sm:text-xs font-normal tracking-normal text-foreground/90 border border-white/10">
              <span className="text-gold font-semibold">✦</span>
              <span>{dict.hero.eyebrow}</span>
            </span>

            {/* Display Title */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.15] tracking-tight text-foreground text-center lg:text-left max-w-3xl">
              {dict.hero.title}
            </h1>

            {/* Subline Description */}
            <p className="max-w-2xl text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed font-sans text-center lg:text-left">
              {dict.hero.subtitle}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2 justify-center lg:justify-start">
              <div className="w-full sm:w-auto transition-transform duration-150 active:scale-95">
                <Button
                  variant="default"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-8 h-12 text-sm rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
                  asChild
                >
                  <a href={`/${locale}/astrologers`}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {dict.common.whatsapp_cta}
                  </a>
                </Button>
              </div>

              <div className="w-full sm:w-auto transition-transform duration-150 active:scale-95">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-gold/45 text-gold hover:bg-secondary/40 font-semibold px-8 h-12 text-sm rounded-full transition-all cursor-pointer"
                  asChild
                >
                  <a href={`/${locale}/gemstones`}>
                    <Gem className="w-4 h-4 mr-2" />
                    {dict.common.gemstone_cta}
                  </a>
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 mt-6 text-xs text-muted-foreground w-full">
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-gold" />
                <span>{dict.common.verified}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>{dict.common.certified}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-gold" />
                <span>{dict.common.consulted_today}</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Globe Component */}
          <div className="lg:col-span-5 w-full flex justify-center items-center relative h-[350px] sm:h-[450px] lg:h-[500px]">
            <Globe3DDemo className="h-full w-full" locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
