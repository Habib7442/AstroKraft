"use client";

import React from "react";
import { ShieldCheck, Phone, UserCheck, Users } from "lucide-react";
import { Button } from "../ui/button";

import Globe3DDemo from "@/components/3d-globe-demo";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

interface HeroProps {
  locale: string;
  dict: any;
}

export function Hero({ locale, dict }: HeroProps) {
  const activeLocale = ["en", "hin", "bn"].includes(locale) ? locale : "en";
  const labelsObj = {
    en: {
      whatsapp: "WhatsApp Consultation",
      call: "Call Consultation"
    },
    hin: {
      whatsapp: "व्हाट्सएप परामर्श",
      call: "कॉल परामर्श"
    },
    bn: {
      whatsapp: "হোয়াটসঅ্যাপ পরামর্শ",
      call: "কল পরামর্শ"
    }
  };
  const labels = labelsObj[activeLocale as keyof typeof labelsObj] || labelsObj.en;

  return (
    <section 
      className="relative w-full overflow-hidden border-b border-border pt-26 pb-12 md:pt-32 md:pb-20 lg:pt-28 lg:pb-24 flex flex-col justify-center items-center"
      style={{
        background: 'radial-gradient(circle at 75% 45%, rgba(255, 192, 0, 0.22) 0%, transparent 60%), radial-gradient(circle at 20% 35%, rgba(255, 192, 0, 0.15) 0%, transparent 50%), linear-gradient(to bottom, rgba(255, 192, 0, 0.25) 0%, rgba(255, 192, 0, 0.08) 50%, var(--background) 100%)'
      }}
    >
      {/* Modern gold/blueprint grid background */}
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)] bg-[linear-gradient(to_right,rgba(255,192,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,192,0,0.06)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none z-0" />

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full">
          {/* Left Column: Text Content & CTAs */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-7 md:gap-8 lg:col-span-7 w-full">
            {/* Top Badges: Eyebrow label */}
            <div className="flex flex-wrap gap-2.5 items-center justify-center lg:justify-start">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-[11px] sm:text-xs font-semibold tracking-wide text-accent border border-primary/25 select-none uppercase">
                <span className="text-accent font-bold">✦</span>
                <span>{dict.hero.eyebrow}</span>
              </span>
            </div>

            {/* Display Title */}
            <h1 className="max-w-3xl flex justify-center lg:justify-start">
              <PointerHighlight
                rectangleClassName="border-gold/60 dark:border-gold/80 bg-gold/5"
                pointerClassName="text-gold fill-gold"
                containerClassName="inline-block"
              >
                <span className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.15] tracking-tight text-foreground px-4 py-1 relative z-10 flex items-baseline select-none">
                  Astro<span className="text-gold">Kraft</span>
                </span>
              </PointerHighlight>
            </h1>

            {/* Subline Description */}
            <p className="max-w-2xl text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed font-sans text-center lg:text-left">
              {dict.hero.subtitle}
            </p>

            {/* Action CTAs & Low Friction Checklist */}
            <div className="flex flex-col gap-3 w-full sm:w-auto items-center lg:items-start">
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2 justify-center lg:justify-start">
                <div className="w-full sm:w-auto transition-transform duration-150 active:scale-95">
                  <Button
                    variant="default"
                    size="lg"
                    className="w-full bg-foreground hover:bg-foreground/90 text-white font-semibold px-8 h-12 text-sm rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 border-0"
                    asChild
                  >
                    <a href="https://api.whatsapp.com/send/?phone=916913230255&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
                      <img src="/social-icons/whatsapp.png" alt="WhatsApp" className="w-4 h-4 object-contain shrink-0" />
                      {labels.whatsapp}
                    </a>
                  </Button>
                </div>

                <div className="w-full sm:w-auto transition-transform duration-150 active:scale-95">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-gold/45 text-gold hover:bg-secondary/40 font-semibold px-8 h-12 text-sm rounded-full transition-all cursor-pointer flex items-center justify-center gap-2"
                    asChild
                  >
                    <a href="tel:+916913230255">
                      <Phone className="w-4 h-4 shrink-0" />
                      {labels.call}
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Trust Badges (Restored clean simple line) */}
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
