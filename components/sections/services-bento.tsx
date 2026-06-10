"use client";

import Image from "next/image";
import React from "react";
import {
  ArrowRight,
  Compass,
} from "lucide-react";
import servicesData from "@/lib/data/services.json";
import { cn } from "@/lib/utils";

type ServiceCopy = {
  title: string;
  desc: string;
};

type ServicesDictionary = {
  services: {
    title: string;
    subtitle: string;
    cta: string;
    astrologer: ServiceCopy;
    gemstone: ServiceCopy;
    kundli_match: ServiceCopy;
    purohit: ServiceCopy;
    vastu_consult: ServiceCopy;
    vastu_plan: ServiceCopy;
  };
};

interface ServicesBentoProps {
  locale: string;
  dict: ServicesDictionary;
}

export function ServicesBento({ locale, dict }: ServicesBentoProps) {
  const s = dict.services;

  const cards = [
    {
      id: "astrologer",
      serviceId: "astrologer",
      title: s.astrologer.title,
      desc: s.astrologer.desc,
      href: `/${locale}/astrologers`,
      badge: "24/7 Live",
      badgeColor: "bg-green-500/10 text-green-500 dark:text-green-400 border-green-500/20",
      className: "lg:col-span-2 lg:row-span-1",
      glowColor: "color-mix(in srgb, var(--primary) 10%, transparent)",
    },
    {
      id: "gemstone",
      serviceId: "gemstone",
      title: s.gemstone.title,
      desc: s.gemstone.desc,
      href: `/${locale}/gemstones`,
      badge: "Lab Certified",
      badgeColor: "bg-gold/15 text-gold border-gold/30",
      className: "lg:col-span-1 lg:row-span-2",
      isVertical: true,
      glowColor: "color-mix(in srgb, var(--gold-line) 12%, transparent)",
    },
    {
      id: "kundli-match",
      serviceId: "kundli_match",
      title: s.kundli_match.title,
      desc: s.kundli_match.desc,
      href: `/${locale}/tools/matching`,
      badge: "100% Free",
      badgeColor: "bg-blue-500/10 text-blue-500 dark:text-blue-400 border-blue-500/20",
      className: "lg:col-span-1 lg:row-span-1",
      glowColor: "rgba(59, 130, 246, 0.08)",
    },
    {
      id: "purohit",
      serviceId: "purohit",
      title: s.purohit.title,
      desc: s.purohit.desc,
      href: `/${locale}/purohits`,
      badge: "Verified Priest",
      badgeColor: "bg-red-500/10 text-red-500 dark:text-red-400 border-red-500/20",
      className: "lg:col-span-1 lg:row-span-1",
      glowColor: "rgba(239, 68, 68, 0.08)",
    },
    {
      id: "vastu-consult",
      serviceId: "vastu_consult",
      title: s.vastu_consult.title,
      desc: s.vastu_consult.desc,
      href: `/${locale}/vastu`,
      badge: "Expert Audit",
      badgeColor: "bg-purple-500/10 text-purple-500 dark:text-purple-400 border-purple-500/20",
      className: "lg:col-span-1 lg:row-span-1",
      glowColor: "rgba(168, 85, 247, 0.08)",
    },
    {
      id: "vastu-plan",
      serviceId: "vastu_plan",
      title: s.vastu_plan.title,
      desc: s.vastu_plan.desc,
      href: `/${locale}/vastu`,
      badge: "2D Layout",
      badgeColor: "bg-orange-500/10 text-orange-500 dark:text-orange-400 border-orange-500/20",
      className: "lg:col-span-2 lg:row-span-1",
      glowColor: "rgba(249, 115, 22, 0.08)",
    },
  ];



  return (
    <section id="free-tools" className="w-full py-16 md:py-24 bg-surface-muted border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
          <span className="text-gold font-sans font-bold text-xs uppercase tracking-widest inline-flex items-center justify-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>Divine Services</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-foreground">
            {s.title}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base font-sans leading-relaxed">
            {s.subtitle}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(220px,_auto)]">
          {cards.map((card) => {
            const serviceImage = servicesData.find((service) => service.id === card.serviceId)?.image;

            return (
              <a
                key={card.id}
                href={card.href}
                className={cn(
                  "group relative flex flex-col justify-between p-6 sm:p-8 bg-card border border-border rounded-xl transition-all duration-300 hover:border-gold/60 hover:shadow-lg dark:hover:shadow-black/40 overflow-hidden hover:-translate-y-1 hover:scale-[1.015] active:scale-[0.985]",
                  card.className
                )}
              >
                {/* Fine interactive gold hairline highlight */}
                <div className="absolute inset-0 border border-transparent group-hover:border-gold/30 rounded-xl pointer-events-none transition-colors duration-300" />

                {/* Custom radial hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at center, ${card.glowColor} 0%, transparent 70%)`
                  }}
                />

                {/* Top Section */}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    {/* Icon wrapper with soft background */}
                    {serviceImage && (
                      <div className="rounded-full bg-secondary/50 p-1 shadow-sm">
                        <Image
                          src={serviceImage}
                          alt={card.title}
                          width={64}
                          height={64}
                          sizes="64px"
                          className="h-14 w-14 rounded-full object-cover"
                          draggable={false}
                        />
                      </div>
                    )}
                    {/* Custom Badge */}
                    {card.badge && (
                      <span
                        className={cn(
                          "px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border",
                          card.badgeColor
                        )}
                      >
                        {card.badge}
                      </span>
                    )}
                  </div>

                  {/* Text Details */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold text-foreground group-hover:text-gold transition-colors duration-200">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm font-sans leading-relaxed max-w-xl">
                      {card.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom CTA Arrow */}
                <div className="flex items-center gap-1 text-gold font-sans font-semibold text-xs mt-6 self-start group-hover:gap-2 transition-all">
                  <span>{s.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
