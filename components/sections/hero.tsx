"use client";

import React from "react";
import { MessageCircle, ShieldCheck, Gem, UserCheck, Users } from "lucide-react";
import { Button } from "../ui/button";

interface HeroProps {
  locale: string;
  dict: any;
}

export function Hero({ locale, dict }: HeroProps) {
  return (
    <section className="relative w-full overflow-hidden border-b border-border pt-8 pb-16 md:pt-12 md:pb-24 lg:pt-16 lg:pb-32 bg-background flex flex-col justify-center items-center">
      {/* Solid Spotlight Overlay (Single Violet/Gold Glows) */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-primary/10 dark:bg-primary/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full bg-gold/10 dark:bg-gold/5 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 lg:px-16 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Content Left */}
          <div className="lg:col-span-7 flex flex-col items-start text-left gap-6">
            {/* Eyebrow Label */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/50 text-[10px] sm:text-xs font-semibold tracking-wider text-gold uppercase border border-gold/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{dict.hero.eyebrow}</span>
            </span>

            {/* Display Title */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-foreground text-left">
              {dict.hero.title}
            </h1>

            {/* Subline Description */}
            <p className="max-w-xl text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed font-sans text-left">
              {dict.hero.subtitle}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2 justify-start">
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
            <div className="flex flex-wrap justify-start gap-x-6 gap-y-3 mt-6 text-xs text-muted-foreground border-t border-border/60 pt-6 w-full">
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

          {/* Right Section Blank (Reserved for future imagery) */}
          <div className="lg:col-span-5 flex justify-center items-center relative min-h-[150px] sm:min-h-[250px] lg:min-h-[350px] w-full" />
        </div>
      </div>
    </section>
  );
}
