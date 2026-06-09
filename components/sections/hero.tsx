"use client";

import React from "react";
import { ShieldCheck, Phone, UserCheck, Users } from "lucide-react";
import { Button } from "../ui/button";

import Globe3DDemo from "@/components/3d-globe-demo";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import servicesData from "@/lib/data/services.json";

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

  const bgColors = {
    astrologer: "bg-[#FFE4A0]",
    gemstone: "bg-[#E5D5FF]",
    purohit: "bg-[#FFD0C8]",
    vastu_consult: "bg-[#C6F6D5]",
    vastu_plan: "bg-[#E0F2FE]",
    kundli_match: "bg-[#FEF08A]"
  };

  const hoverColors = {
    astrologer: "hover:bg-[#FFD166]",
    gemstone: "hover:bg-[#D3BFFF]",
    purohit: "hover:bg-[#FFAEA0]",
    vastu_consult: "hover:bg-[#A3F1BE]",
    vastu_plan: "hover:bg-[#B3E1FC]",
    kundli_match: "hover:bg-[#FDE047]"
  };

  return (
    <section
      className="relative w-full overflow-hidden border-b-[3px] border-black pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-32 lg:pb-28 flex flex-col justify-center items-center"
      style={{
        background: 'linear-gradient(to bottom, #FFE896 0%, #FFFDF0 100%)'
      }}
    >
      {/* Brutalist Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none z-0" />

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center w-full">
          {/* Left Column: Text Content & CTAs */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-7 md:gap-8 lg:col-span-7 w-full">
            {/* Top Badges: Eyebrow label */}
            <div className="flex flex-wrap gap-2.5 items-center justify-center lg:justify-start">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 border-[2px] border-black bg-white text-black text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] select-none rounded-full">
                <span className="text-[#FFC000] font-black drop-shadow-[1px_1px_0px_#000]">✦</span>
                <span>{dict.hero.eyebrow}</span>
              </span>
            </div>

            {/* Display Title */}
            <h1 className="max-w-3xl flex justify-center lg:justify-start">
              <PointerHighlight
                rectangleClassName="border-[3px] border-black bg-white shadow-[6px_6px_0px_#000] rounded-2xl"
                pointerClassName="text-black fill-black"
                containerClassName="inline-block"
              >
                <span className="font-serif text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.15] tracking-tight text-black px-6 py-2.5 relative z-10 flex items-baseline select-none">
                  Astro<span className="text-[#FFC000] drop-shadow-[2.5px_2.5px_0px_#000]">Kraft</span>
                </span>
              </PointerHighlight>
            </h1>

            {/* Subline Description */}
            <p className="max-w-2xl text-black font-semibold text-sm sm:text-base md:text-lg leading-relaxed font-sans text-center lg:text-left">
              {dict.hero.subtitle}
            </p>

            {/* Action CTAs & Low Friction Checklist */}
            <div className="flex flex-col gap-3 w-full sm:w-auto items-center lg:items-start">
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2 justify-center lg:justify-start">
                <div className="w-full sm:w-auto transition-transform duration-150 active:scale-95">
                  <Button
                    variant="default"
                    size="lg"
                    className="w-full bg-white hover:bg-neutral-100 text-black border-[2.5px] border-black shadow-[4px_4px_0px_#000] hover:shadow-[5px_5px_0px_#000] hover:-translate-y-[1px] hover:-translate-x-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000] font-black px-8 h-12 text-sm rounded-full transition-all cursor-pointer flex items-center justify-center gap-2"
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
                    className="w-full bg-[#FFC000] hover:bg-[#FFC000]/90 text-black border-[2.5px] border-black shadow-[4px_4px_0px_#000] hover:shadow-[5px_5px_0px_#000] hover:-translate-y-[1px] hover:-translate-x-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000] font-black px-8 h-12 text-sm rounded-full transition-all cursor-pointer flex items-center justify-center gap-2"
                    asChild
                  >
                    <a href="tel:+916913230255">
                      <Phone className="w-4 h-4 shrink-0 text-black" />
                      {labels.call}
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-6 text-xs font-black text-black w-full">
              <div className="flex items-center gap-1.5 px-3.5 py-2 border-[2px] border-black bg-white shadow-[2px_2px_0px_#000] select-none rounded-xl">
                <UserCheck className="w-4 h-4 text-[#FFC000] stroke-[3px]" />
                <span>{dict.common.verified}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-2 border-[2px] border-black bg-white shadow-[2px_2px_0px_#000] select-none rounded-xl">
                <ShieldCheck className="w-4 h-4 text-[#FFC000] stroke-[3px]" />
                <span>{dict.common.certified}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-2 border-[2px] border-black bg-white shadow-[2px_2px_0px_#000] select-none rounded-xl">
                <Users className="w-4 h-4 text-[#FFC000] stroke-[3px]" />
                <span>{dict.common.consulted_today}</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Globe Component */}
          <div className="lg:col-span-5 w-full flex justify-center items-center relative h-[350px] sm:h-[450px] lg:h-[500px]">
            <Globe3DDemo className="h-full w-full" locale={locale} />
          </div>
        </div>

        {/* Divine Services Quick Access Row */}
        <div className="mt-20 md:mt-24 lg:mt-28 w-full flex flex-col gap-8 relative z-20">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-2">
            <span className="inline-flex items-center gap-1 px-4 py-2 border-[2px] border-black bg-white text-black text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-[2.5px_2.5px_0px_#000] rounded-full">
              ✦ {dict.services.title}
            </span>
            <p className="text-xs sm:text-sm text-black/90 font-bold max-w-2xl">
              {dict.services.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 w-full">
            {servicesData.map((service) => {
              const titleText = service.title[activeLocale as keyof typeof service.title] || service.title.en;
              const descText = service.desc[activeLocale as keyof typeof service.desc] || service.desc.en;
              const cardBg = bgColors[service.id as keyof typeof bgColors] || "bg-white";
              const cardHoverBg = hoverColors[service.id as keyof typeof hoverColors] || "hover:bg-white";

              return (
                <a
                  href={service.isExternal ? service.link : `/${locale}${service.link}`}
                  target={service.isExternal ? "_blank" : undefined}
                  rel={service.isExternal ? "noopener noreferrer" : undefined}
                  key={service.id}
                  className={`group relative flex flex-col items-center justify-between text-center p-5 rounded-2xl border-[3px] border-black ${cardBg} ${cardHoverBg} shadow-[5px_5px_0px_#000] hover:shadow-[7px_7px_0px_#000] hover:-translate-y-1 hover:-translate-x-1 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000] transition-all duration-200 cursor-pointer overflow-hidden`}
                >
                  {/* Service Image Frame */}
                  <div className="flex flex-col items-center w-full">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-black bg-white shadow-[2px_2px_0px_#000] group-hover:scale-105 transition-transform duration-200">
                      <img
                        src={service.image}
                        alt={titleText}
                        className="w-full h-full object-cover select-none p-0.5"
                        draggable={false}
                      />
                    </div>

                    <h3 className="font-sans text-xs sm:text-sm font-extrabold text-black mt-4 tracking-tight line-clamp-2 uppercase">
                      {titleText}
                    </h3>

                    <p className="text-[10px] sm:text-xs text-black/75 font-bold mt-1.5 leading-snug line-clamp-2">
                      {descText}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[8px] sm:text-[9px] font-extrabold mt-5 px-3 py-1.5 rounded-full border-2 border-black bg-white text-black shadow-[2px_2px_0px_#000] group-hover:bg-[#FFC000] group-hover:shadow-[3px_3px_0px_#000] transition-all duration-200 uppercase">
                    {dict.services.cta} →
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
