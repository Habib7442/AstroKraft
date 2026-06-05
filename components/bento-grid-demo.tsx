"use client";

import React from "react";
import { BentoGrid } from "@/components/ui/bento-grid";
import ASTROLOGERS_DATA from "@/lib/data/astrologer.json";
import { Star, Award, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface AstrologerInfo {
  name: string;
  specialty: Record<string, string>;
  description: Record<string, string>;
  experience: number;
  rating: number;
  reviews: number;
  languages: Record<string, string[]>;
  city: Record<string, string>;
  address: Record<string, string>;
  phone: string;
  email: string;
  fee: number;
  status: "online" | "busy";
  src: string;
}

const ASTROLOGERS = ASTROLOGERS_DATA as Record<string, AstrologerInfo>;

interface BentoGridDemoProps {
  locale?: string;
}

export default function BentoGridDemo({ locale = "en" }: BentoGridDemoProps) {
  const activeLocale = ["en", "hin", "bn"].includes(locale) ? locale : "en";

  const getPrefilledWhatsappUrl = (name: string) => {
    const text = `Hello AstroKraft! I would like to book a consultation session with ${name}.`;
    return `https://wa.me/916913230255?text=${encodeURIComponent(text)}`;
  };

  // Order astrologers so Biprangshu is first to align layout
  const orderedKeys = [
    "biprangshu_bhattacharjee",
    "acharya_bhakta_vedanta",
    "acharya_sneha",
    "acharya_abhi_shastri",
    "astrologer_indrajit_dutta",
    "rishi_acharya"
  ];

  return (
    <section className="w-full py-16 px-6 md:px-12 lg:px-16 bg-background/50 relative border-t border-border/30">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 text-xs text-gold border border-white/10 font-sans tracking-wide">
            ✦ Divine Team of Experts
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Meet Our Master Astrologers
          </h2>
          <p className="max-w-2xl text-muted-foreground text-sm sm:text-base font-sans">
            Consult India's top astrologers and Vastu experts for accurate horoscope compatibility, gemstone selections, and ancient Vedic remedies.
          </p>
        </div>

        {/* Bento Grid */}
        <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[16rem]">
          {orderedKeys.map((key) => {
            const ast = ASTROLOGERS[key];
            if (!ast) return null;

            const isMain = key === "biprangshu_bhattacharjee";
            const specialtyText = ast.specialty[activeLocale] || ast.specialty["en"];
            const descText = ast.description[activeLocale] || ast.description["en"];
            const addressText = ast.address[activeLocale] || ast.address["en"];

            if (isMain) {
              return (
                <div
                  key={key}
                  className="group/bento shadow-xl md:col-span-2 md:row-span-2 flex flex-col justify-between rounded-xl border border-gold bg-gradient-to-b from-card/85 via-card/75 to-primary/5 p-6 relative overflow-hidden text-foreground transition duration-350 hover:shadow-gold/10 hover:border-gold/90 min-h-[30rem] md:min-h-0"
                >
                  {/* Decorative background glow */}
                  <div className="absolute -right-20 -top-20 w-[300px] h-[300px] rounded-full bg-gold/10 blur-[80px] pointer-events-none" />
                  <div className="absolute -left-20 -bottom-20 w-[300px] h-[300px] rounded-full bg-primary/10 blur-[80px] pointer-events-none" />

                  {/* Top: Profile Header & Layout */}
                  <div className="flex flex-col sm:flex-row gap-6 relative z-10 h-full">
                    {/* Left/Top: Giant Avatar frame */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className="relative">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-gold bg-neutral-900 shadow-2xl p-1">
                          <img
                            src={ast.src}
                            alt={ast.name}
                            className="w-full h-full object-cover rounded-full select-none"
                            draggable={false}
                          />
                        </div>
                        {/* Live Status indicator */}
                        <span className="absolute bottom-1 right-1 flex h-4 w-4">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-emerald-400" />
                          <span className="relative inline-flex rounded-full h-4 w-4 border-2 border-card bg-emerald-500 shadow-sm" />
                        </span>
                      </div>

                      {/* Prominent Badges */}
                      <span className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase border bg-gold/10 text-gold border-gold/30">
                        ✦ Founder & Director
                      </span>
                    </div>

                    {/* Right/Bottom: Description and Info */}
                    <div className="flex-1 flex flex-col justify-between gap-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/25 pb-2">
                          <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                            {ast.name}
                          </h3>
                          {/* Rating & reviews */}
                          <div className="flex items-center gap-1.5 bg-neutral-900/40 border border-white/5 px-2.5 py-1 rounded-full text-[11px] w-fit">
                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            <span className="font-bold text-foreground">{ast.rating} / 5</span>
                            <span className="text-muted-foreground">({ast.reviews} reviews)</span>
                          </div>
                        </div>

                        <span className="text-sm font-semibold text-gold font-sans tracking-wide">
                          {specialtyText}
                        </span>

                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
                          {descText}
                        </p>
                      </div>

                      {/* Detail Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1 text-xs">
                        <div className="flex items-center gap-2.5 text-muted-foreground">
                          <Award className="w-4 h-4 text-gold shrink-0" />
                          <span>Experience: <strong className="text-foreground">{ast.experience} Years</strong></span>
                        </div>
                        <div className="flex items-center gap-2.5 text-muted-foreground">
                          <MapPin className="w-4 h-4 text-gold shrink-0" />
                          <span className="truncate">Address: <strong className="text-foreground">{addressText}</strong></span>
                        </div>
                        <div className="flex items-center gap-2.5 text-muted-foreground font-sans">
                          <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                          <span>Phone: <a href={`tel:${ast.phone}`} className="hover:text-gold transition-colors">{ast.phone}</a></span>
                        </div>
                        <div className="flex items-center gap-2.5 text-muted-foreground font-sans">
                          <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                          <span className="truncate">Email: <a href={`mailto:${ast.email}`} className="hover:text-gold transition-colors">{ast.email}</a></span>
                        </div>
                      </div>

                      {/* Bottom Button */}
                      <div className="flex items-center justify-between gap-4 mt-2 pt-4 border-t border-border/20">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-muted-foreground uppercase font-sans">Consultation Fee</span>
                          <span className="font-serif font-bold text-lg text-gold font-serif">₹{ast.fee.toFixed(2)}</span>
                        </div>
                        <a
                          href={getPrefilledWhatsappUrl(ast.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary hover:to-primary/80 text-primary-foreground font-semibold py-2 px-5 rounded-full shadow-lg shadow-primary/20 transition-all text-xs font-sans cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          Consult Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Standard Astrologer Card (col-span-1, row-span-1)
            const isOnline = ast.status === "online";
            return (
              <div
                key={key}
                className="group/bento shadow-md row-span-1 flex flex-col justify-between space-y-3.5 rounded-xl border border-border/40 bg-card/60 backdrop-blur-md p-4.5 transition duration-300 hover:shadow-lg hover:shadow-gold/5 hover:border-gold/45 text-foreground dark:border-border/30 dark:bg-card/40 relative overflow-hidden"
              >
                {/* Header info */}
                <div className="flex items-start justify-between gap-3 relative z-10">
                  {/* Small Avatar Frame with Status */}
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gold/40 bg-neutral-900 shadow p-0.5">
                      <img
                        src={ast.src}
                        alt={ast.name}
                        className="w-full h-full object-cover rounded-full"
                        draggable={false}
                      />
                    </div>
                    {/* Status Badge */}
                    <span className="absolute bottom-0.5 right-0.5 flex h-3 w-3">
                      <span className={cn(
                        "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                        isOnline ? "bg-emerald-400" : "bg-amber-400"
                      )} />
                      <span className={cn(
                        "relative inline-flex rounded-full h-3 w-3 border border-card shadow-sm",
                        isOnline ? "bg-emerald-500" : "bg-amber-500"
                      )} />
                    </span>
                  </div>

                  {/* Right Header: Rating & Experience */}
                  <div className="flex flex-col items-end text-right gap-1 font-sans text-[10px]">
                    <div className="flex items-center gap-1 text-gold font-bold">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{ast.rating} / 5</span>
                    </div>
                    <span className="text-muted-foreground">{ast.experience} Yrs Exp</span>
                  </div>
                </div>

                {/* Body info */}
                <div className="flex-1 flex flex-col justify-between mt-2 gap-3 relative z-10">
                  <div className="flex flex-col gap-1">
                    <h4 className="font-serif font-bold text-sm text-foreground tracking-wide group-hover/bento:text-gold transition-colors">
                      {ast.name}
                    </h4>
                    <p className="text-[10px] text-gold font-semibold leading-none">
                      {specialtyText}
                    </p>
                    <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed mt-1.5 font-sans">
                      {descText}
                    </p>
                  </div>

                  {/* Actions & Fee */}
                  <div className="flex items-center justify-between border-t border-border/20 pt-2.5 mt-1 text-[11px]">
                    <div className="flex flex-col">
                      <span className="text-[8px] text-muted-foreground uppercase font-sans">Fee</span>
                      <span className="font-serif font-bold text-gold font-serif">₹{ast.fee.toFixed(2)}</span>
                    </div>
                    <a
                      href={getPrefilledWhatsappUrl(ast.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 bg-secondary hover:bg-gold hover:text-neutral-950 text-foreground py-1 px-3 rounded-full border border-border/20 transition-all text-[10px] font-semibold cursor-pointer"
                    >
                      <MessageCircle className="w-3 h-3" />
                      Consult
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}
