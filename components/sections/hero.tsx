"use client";

import Image from "next/image";
import React from "react";
import { ShieldCheck, Phone, UserCheck, Lock } from "lucide-react";
import { Button } from "../ui/button";

import Globe3DDemo from "@/components/3d-globe-demo";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import servicesData from "@/lib/data/services.json";
import { cn } from "@/lib/utils";

const ZODIAC_WHEEL_SRC = "/assets/zodiac_wheel.png?v=20260610";

type HeroDictionary = {
  hero: {
    subtitle: string;
  };
  services: {
    cta: string;
  };
  common: {
    verified: string;
    certified: string;
  };
};

interface HeroProps {
  locale: string;
  dict: HeroDictionary;
}

function calculateConsultedCount(): number {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const totalMinutes = hours * 60 + minutes;

  return 50 + Math.floor(totalMinutes / 15) * 5;
}

export function Hero({ locale, dict }: HeroProps) {
  const activeLocale = ["en", "hin", "bn"].includes(locale) ? locale : "en";

  const [consultedCount, setConsultedCount] = React.useState(calculateConsultedCount);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setConsultedCount(calculateConsultedCount());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const getConsultedText = (count: number) => {
    if (activeLocale === "hin") {
      return `आज ${count} लोगों ने परामर्श लिया है`;
    }
    if (activeLocale === "bn") {
      return `আজ ${count} জন মানুষ পরামর্শ নিয়েছেন`;
    }
    return `${count} PEOPLE CONSULTED TODAY`;
  };

  const getConfidentialText = () => {
    if (activeLocale === "hin") {
      return "100% सुरक्षित और गोपनीय";
    }
    if (activeLocale === "bn") {
      return "100% সুরক্ষিত ও গোপনীয়";
    }
    return "100% Private & Secure";
  };
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

  const serviceButtonStyles: Record<string, string> = {
    astrologer: "text-[#b28b3a] border-amber-200/50 bg-amber-50/40 group-hover:bg-[#FFE4A0] group-hover:text-black group-hover:border-[#FFE4A0]",
    gemstone: "text-purple-700 border-purple-200/50 bg-purple-50/40 group-hover:bg-[#E5D5FF] group-hover:text-black group-hover:border-[#E5D5FF]",
    purohit: "text-rose-600 border-rose-200/50 bg-rose-50/40 group-hover:bg-[#FFD0C8] group-hover:text-black group-hover:border-[#FFD0C8]",
    vastu_consult: "text-emerald-700 border-emerald-200/50 bg-emerald-50/40 group-hover:bg-[#C6F6D5] group-hover:text-black group-hover:border-[#C6F6D5]",
    vastu_plan: "text-sky-700 border-sky-200/50 bg-sky-50/40 group-hover:bg-[#E0F2FE] group-hover:text-black group-hover:border-[#E0F2FE]",
    kundli_match: "text-yellow-700 border-yellow-250/50 bg-yellow-50/40 group-hover:bg-[#FEF08A] group-hover:text-black group-hover:border-[#FEF08A]"
  };

  return (
    <section
      className="relative w-full overflow-hidden border-b border-[#E2C27A]/20 pt-20 pb-8 md:pt-32 md:pb-16 lg:pt-32 lg:pb-28 flex flex-col justify-center items-center"
      style={{
        background: 'linear-gradient(135deg, #0A1A3F, #103A4A)'
      }}
    >
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none z-0" />

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-center w-full">
          {/* Left Column: Text Content & CTAs */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-7 md:gap-8 lg:col-span-7 w-full order-1">
            {/* Top Badges: Eyebrow label */}
            <div className="flex flex-wrap gap-2.5 items-center justify-center lg:justify-start">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 border border-[#E2C27A]/30 bg-white/10 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm select-none rounded-full backdrop-blur-md">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{getConsultedText(consultedCount)}</span>
              </span>
            </div>

            {/* Display Title & Zodiac Wheel */}
            <div className="flex flex-col md:flex-row items-center justify-center lg:justify-start gap-5 w-full">
              <h1 className="max-w-3xl">
                <PointerHighlight
                  rectangleClassName="border border-[#E2C27A]/40 bg-[#2A1A5E]/40 shadow-lg rounded-2xl backdrop-blur-md"
                  pointerClassName="text-[#E2C27A] fill-[#E2C27A]"
                  containerClassName="inline-block"
                >
                  <span className="font-serif text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.15] tracking-tight text-white px-6 py-2.5 relative z-10 flex items-baseline select-none">
                    Astro<span className="text-[#E2C27A]">Kraft</span>
                    <span className="inline-flex items-center justify-center border border-white/60 rounded-full w-5 h-5 sm:w-6 sm:h-6 text-[8px] sm:text-[10px] font-bold font-sans ml-1.5 sm:ml-2 select-none self-start mt-1.5 sm:mt-2.5 shrink-0 text-white/90">
                      TM
                    </span>
                  </span>
                </PointerHighlight>
              </h1>
              {/* Spinning Zodiac Wheel Badge */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 select-none animate-spin-slow">
                <img
                  src={ZODIAC_WHEEL_SRC}
                  alt="Zodiac Wheel"
                  className="w-full h-full object-cover rounded-full"
                  draggable={false}
                />
              </div>
            </div>

            {/* Social Proof: Overlapping Avatars & 4.9/5 Rating */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 select-none w-full">
              {/* Overlapping Avatar Group */}
              <div className="flex -space-x-3.5">
                <img
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#E2C27A]/40 object-cover bg-white shadow-sm transition-transform hover:-translate-y-1 hover:z-10"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Client Avatar 1"
                />
                <img
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#E2C27A]/40 object-cover bg-white shadow-sm transition-transform hover:-translate-y-1 hover:z-10"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                  alt="Client Avatar 2"
                />
                <img
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#E2C27A]/40 object-cover bg-white shadow-sm transition-transform hover:-translate-y-1 hover:z-10"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                  alt="Client Avatar 3"
                />
                <img
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#E2C27A]/40 object-cover bg-white shadow-sm transition-transform hover:-translate-y-1 hover:z-10"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
                  alt="Client Avatar 4"
                />
              </div>

              {/* Rating and Count */}
              <div className="flex flex-col items-center lg:items-start gap-0.5">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-[#E2C27A] text-sm sm:text-base">★</span>
                    ))}
                  </div>
                  <span className="font-sans text-xs sm:text-sm font-bold text-white bg-white/10 border border-[#E2C27A]/30 px-2.5 py-0.5 rounded-full shadow-sm">
                    4.9/5 Rating
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold text-zinc-300 uppercase tracking-wider">
                  {activeLocale === "hin"
                    ? "10,000+ से अधिक संतुष्ट उपयोगकर्ता"
                    : activeLocale === "bn"
                    ? "১০,০০০+ এর বেশি সন্তুষ্ট ব্যবহারকারী"
                    : "Trusted by 10,000+ happy seekers"}
                </span>
              </div>
            </div>

            {/* Subline Description */}
            <p className="max-w-2xl text-zinc-200 font-semibold text-sm sm:text-base md:text-lg leading-relaxed font-sans text-center lg:text-left">
              {dict.hero.subtitle}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col gap-3 w-full sm:w-auto items-center lg:items-start">
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2 justify-center lg:justify-start">
                <div className="w-full sm:w-auto transition-transform duration-150 active:scale-95">
                  <Button
                    variant="default"
                    size="lg"
                    className="w-full bg-[#E2C27A] hover:bg-[#E2C27A]/95 text-black border-0 font-bold px-8 h-12 text-sm rounded-full transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 active:translate-y-[1px]"
                    asChild
                  >
                    <a href={`/${locale}/consultation`}>
                      <img src="/social-icons/whatsapp.png" alt="WhatsApp" className="w-4 h-4 object-contain shrink-0" />
                      {labels.whatsapp}
                    </a>
                  </Button>
                </div>

                <div className="w-full sm:w-auto transition-transform duration-150 active:scale-95">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full bg-transparent hover:bg-white/5 text-white border border-[#E2C27A] font-bold px-8 h-12 text-sm rounded-full transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm hover:-translate-y-0.5 active:translate-y-[1px]"
                    asChild
                  >
                    <a href="tel:+916913230255">
                      <Phone className="w-4 h-4 shrink-0 text-[#E2C27A]" />
                      {labels.call}
                    </a>
                  </Button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Globe Component */}
          <div className="lg:col-span-5 w-full flex justify-center items-center relative h-[350px] sm:h-[450px] lg:h-[500px] order-4 lg:order-2">
            <Globe3DDemo className="h-full w-full" locale={locale} />
          </div>

          {/* Divine Services Quick Access Row */}
          <div className="w-full flex flex-col gap-5 relative z-20 order-2 lg:order-3 lg:col-span-12 mt-2 lg:mt-12">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-2">
              <span className="inline-flex items-center gap-1 px-4 py-1.5 border border-[#E2C27A]/30 bg-white/10 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md">
                ✦ {activeLocale === "hin" ? "हमारी सेवाएं" : activeLocale === "bn" ? "আমাদের পরিষেবা" : "Our Services"}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 w-full">
              {servicesData.map((service) => {
                const titleText = service.title[activeLocale as keyof typeof service.title] || service.title.en;
                const descText = service.desc[activeLocale as keyof typeof service.desc] || service.desc.en;

                return (
                  <a
                    href={service.isExternal ? service.link : `/${locale}${service.link}`}
                    target={service.isExternal ? "_blank" : undefined}
                    rel={service.isExternal ? "noopener noreferrer" : undefined}
                    key={service.id}
                    className="group relative flex flex-col items-center justify-between text-center p-5 rounded-2xl border border-zinc-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-1 active:translate-y-0 transition-all duration-300 cursor-pointer overflow-hidden"
                  >
                    {/* Service Image Frame */}
                    <div className="flex flex-col items-center w-full">
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-200">
                        <Image
                          src={service.image}
                          alt={titleText}
                          width={80}
                          height={80}
                          sizes="(max-width: 640px) 64px, 80px"
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

                    <span className={cn(
                      "inline-flex items-center gap-1 text-[8px] sm:text-[9px] font-bold mt-5 px-3 py-1.5 rounded-full border shadow-sm transition-all duration-200 uppercase",
                      serviceButtonStyles[service.id as keyof typeof serviceButtonStyles] || "border-zinc-200 bg-white text-zinc-700"
                    )}>
                      {dict.services.cta} →
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center lg:justify-center gap-3 sm:gap-4 mt-8 lg:mt-12 text-[10px] sm:text-xs font-bold text-white w-full order-3 lg:order-4 lg:col-span-12">
            <div className="flex items-center justify-center gap-1.5 px-3 py-2 border border-[#E2C27A]/30 bg-[#2A1A5E]/40 text-white select-none rounded-xl col-span-1 shadow-sm">
              <UserCheck className="w-4 h-4 text-[#E2C27A] stroke-[2px] shrink-0" />
              <span className="truncate">{dict.common.verified}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 px-3 py-2 border border-[#E2C27A]/30 bg-[#2A1A5E]/40 text-white select-none rounded-xl col-span-1 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#E2C27A] stroke-[2px] shrink-0" />
              <span className="truncate">{dict.common.certified}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 px-3 py-2 border border-[#E2C27A]/30 bg-[#2A1A5E]/40 text-white select-none rounded-xl col-span-2 sm:col-span-1 w-full sm:w-auto shadow-sm">
              <Lock className="w-4 h-4 text-[#E2C27A] stroke-[2px] shrink-0" />
              <span>{getConfidentialText()}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
