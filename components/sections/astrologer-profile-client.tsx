"use client";

import React, { useState } from "react";
import { 
  Star, Award, MessageCircle, Phone, Mail, MapPin, 
  Copy, Check, ArrowLeft, ShieldCheck, Compass, Languages, Globe
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface AstrologerInfo {
  name: string;
  specialty: Record<string, string>;
  description: Record<string, string>;
  experience: number;
  rating: number;
  reviews: number;
  languages: Record<string, string[]>;
  address: Record<string, string>;
  phone: string;
  email: string;
  fee: number;
  status: "online" | "busy";
  src: string;
}

interface AstrologerProfileClientProps {
  astrologer: AstrologerInfo;
  astrologerId: string;
  locale: string;
}

export default function AstrologerProfileClient({ 
  astrologer, 
  astrologerId, 
  locale 
}: AstrologerProfileClientProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const activeLocale = ["en", "hin", "bn"].includes(locale) ? locale : "en";

  const specialtyText = astrologer.specialty[activeLocale] || astrologer.specialty["en"];
  const descText = astrologer.description[activeLocale] || astrologer.description["en"];
  const addressText = astrologer.address[activeLocale] || astrologer.address["en"];
  const isOnline = astrologer.status === "online";

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    toast.success(`${fieldName} copied to clipboard!`, {
      description: text,
      duration: 3000,
    });
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getPrefilledWhatsappUrl = (name: string) => {
    const isBiprangshu = astrologerId === "biprangshu_bhattacharjee";
    const phoneNum = isBiprangshu ? "6001730761" : "6913230255";
    const text = `Hello AstroKraft! I would like to book a consultation session with ${name}.`;
    return `https://wa.me/91${phoneNum}?text=${encodeURIComponent(text)}`;
  };

  const servicesList = astrologerId === "biprangshu_bhattacharjee" 
    ? [
        { title: "Residential Vastu Audit", desc: "Complete analysis of home layout, energy zones, entrance orientation, and remedies." },
        { title: "Commercial & Office Vastu", desc: "Layout designs for offices, stores, and factories to optimize cash flow and staff productivity." },
        { title: "Vastu Rectification Without Demolition", desc: "Ancient remedies using energy metal rods, pyramids, and colors to correct structural flaws." },
        { title: "Industrial Vastu Consulting", desc: "Layout recommendations for machine placement, raw materials, and administrative zones." }
      ]
    : [
        { title: "Vedic Horoscope (Janam Kundli) Chart Reading", desc: "Deep analysis of planetary alignments, birth charts, and future life predictions." },
        { title: "Kundli Matching & Guna Milan", desc: "Detailed compatibility check for marriage, identifying strengths and planetary remedies." },
        { title: "Career, Finance & Business Astrology", desc: "Optimal business names, career progression paths, and timing analysis for investments." },
        { title: "Gemstone Consultation & Remedies", desc: "Scientific recommendation of birthstones to strengthen weak beneficial planets." }
      ];

  return (
    <div className="relative py-12 px-6 md:px-12 lg:px-16 text-foreground overflow-hidden">
      {/* Dynamic background stars and nebulas */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Back Button / Breadcrumb */}
        <a 
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-gold transition-colors mb-8 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          Back to Astrologers Grid
        </a>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Avatar, Badges, Fee & Quick Contact */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full">
            
            {/* Primary Profile Card */}
            <div className="bg-card/90 backdrop-blur-md border border-gold/30 rounded-2xl p-6 text-center flex flex-col items-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold/20 via-gold to-gold/20" />
              
              {/* Profile image with gold status ring */}
              <div className="relative mb-4">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-gold/70 bg-card p-1.5 shadow-2xl">
                  <img 
                    src={astrologer.src} 
                    alt={astrologer.name} 
                    className="w-full h-full object-cover rounded-full select-none"
                    draggable={false}
                  />
                </div>
                {/* Active pulse status */}
                <span className="absolute bottom-1 right-1 flex h-4 w-4">
                  <span className={cn(
                    "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                    isOnline ? "bg-emerald-400" : "bg-amber-400"
                  )} />
                  <span className={cn(
                    "relative inline-flex rounded-full h-4 w-4 border-2 border-card shadow-sm",
                    isOnline ? "bg-emerald-500" : "bg-amber-500"
                  )} />
                </span>
              </div>

              {/* Name & Title */}
              <h1 className="font-serif text-2xl font-bold tracking-wide text-foreground">
                {astrologer.name}
              </h1>
              
              <p className="text-xs text-gold font-semibold tracking-wider uppercase mt-1">
                {specialtyText}
              </p>

              {/* Status Badge */}
              <span className={cn(
                "inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase border",
                isOnline 
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                  : "bg-amber-500/10 text-amber-400 border-amber-500/20"
              )}>
                {isOnline ? "Online & Ready" : "Currently Busy"}
              </span>

              {/* Rating stars & reviews count */}
              <div className="flex items-center gap-1.5 mt-4 bg-muted border border-border px-3 py-1.5 rounded-full text-xs">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-bold">{astrologer.rating}</span>
                <span className="text-muted-foreground">({astrologer.reviews} reviews)</span>
              </div>

              {/* Experience and City */}
              <div className="w-full grid grid-cols-2 gap-2 mt-6 pt-5 border-t border-border/20 text-xs">
                <div className="flex flex-col items-center p-2 rounded-lg bg-muted/45 border border-border/40">
                  <Award className="w-4 h-4 text-gold mb-1" />
                  <span className="text-[9px] text-muted-foreground uppercase">Experience</span>
                  <span className="font-semibold text-foreground mt-0.5">{astrologer.experience} Years</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-lg bg-muted/45 border border-border/40">
                  <Globe className="w-4 h-4 text-gold mb-1" />
                  <span className="text-[9px] text-muted-foreground uppercase">Location</span>
                  <span className="font-semibold text-foreground mt-0.5">
                    {activeLocale === "hin" ? "भारत" : activeLocale === "bn" ? "ভারত" : "India"}
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-card/90 backdrop-blur-md border border-gold/20 rounded-2xl p-5 relative overflow-hidden">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-sans">Consultation Fee</span>
                  <span className="font-serif font-bold text-2xl text-gold mt-0.5">₹{astrologer.fee.toFixed(2)}</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-gold/10 border border-gold/20 text-[9px] text-gold uppercase tracking-widest font-semibold">
                  Online session
                </span>
              </div>
            </div>

            {/* Quick Contact & Copy Fields Card */}
            <div className="bg-card/90 backdrop-blur-md border border-gold/20 rounded-2xl p-5 flex flex-col gap-4 font-sans text-xs">
              <h4 className="font-serif font-semibold text-foreground uppercase tracking-widest text-[10px] border-b border-border/20 pb-2 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                Verified Contact Details
              </h4>

              {/* Phone field */}
              <div className="flex items-center justify-between gap-2 text-muted-foreground">
                <span>Phone Number</span>
                <div className="flex items-center gap-1.5">
                  <a href={`tel:${astrologer.phone}`} className="font-semibold text-foreground hover:text-gold transition-colors">{astrologer.phone}</a>
                  <button 
                    onClick={() => handleCopy(astrologer.phone, "Phone number")}
                    className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded transition-colors cursor-pointer"
                    title="Copy phone number"
                  >
                    {copiedField === "Phone number" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              {/* Email field */}
              <div className="flex items-center justify-between gap-2 text-muted-foreground">
                <span>Email Address</span>
                <div className="flex items-center gap-1.5 max-w-[200px]">
                  <a href={`mailto:${astrologer.email}`} className="font-semibold text-foreground hover:text-gold transition-colors truncate">{astrologer.email}</a>
                  <button 
                    onClick={() => handleCopy(astrologer.email, "Email address")}
                    className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded transition-colors cursor-pointer shrink-0"
                    title="Copy email address"
                  >
                    {copiedField === "Email address" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              {/* Languages List */}
              <div className="flex items-center justify-between gap-2 text-muted-foreground border-t border-border/20 pt-3 mt-1">
                <span className="flex items-center gap-1"><Languages className="w-3.5 h-3.5 text-gold/80" /> Languages</span>
                <div className="flex flex-wrap justify-end gap-1.5 max-w-[200px]">
                  {astrologer.languages[activeLocale]?.map((lang) => (
                    <span key={lang} className="px-2 py-0.5 rounded bg-neutral-900 border border-white/5 text-[9px] text-foreground font-semibold uppercase">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Address Box */}
              <div className="border-t border-border/20 pt-3 text-[11px] text-muted-foreground flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground uppercase tracking-wider text-[8px]">Practice Address</span>
                  <button 
                    onClick={() => handleCopy(addressText, "Address")}
                    className="p-1 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded transition-colors cursor-pointer"
                    title="Copy address"
                  >
                    {copiedField === "Address" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <span className="leading-relaxed text-foreground/90 font-medium bg-neutral-900/60 p-2 border border-white/5 rounded-lg">{addressText}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Bio, Services & Consultation CTA */}
          <div className="lg:col-span-8 flex flex-col gap-6 w-full h-full">
            
            {/* Bio Card */}
            <div className="bg-card/90 backdrop-blur-md border border-gold/20 rounded-2xl p-6 md:p-8 flex flex-col gap-4 relative overflow-hidden">
            <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-foreground flex items-center gap-2">
              <Compass className="w-5 h-5 text-gold animate-[spin_20s_linear_infinite]" />
              Professional Profile
            </h2>
              <div className="h-px bg-gradient-to-r from-gold/30 via-gold/10 to-transparent" />
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-sans first-letter:text-3xl first-letter:font-serif first-letter:text-gold first-letter:mr-1.5 first-letter:float-left pt-2">
                {descText}
              </p>
            </div>

            {/* Specialties & Services Offered */}
            <div className="bg-card/90 backdrop-blur-md border border-gold/20 rounded-2xl p-6 md:p-8 flex flex-col gap-4">
              <h3 className="font-serif text-xl font-bold text-foreground">
                Expertise & Consultation Offerings
              </h3>
              <div className="h-px bg-border/20 mb-2" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {servicesList.map((service, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-xl bg-neutral-900 border border-white/5 hover:border-gold/30 transition-all flex flex-col gap-1.5 hover:shadow-lg hover:shadow-gold/5 group"
                  >
                    <span className="text-xs font-semibold text-gold tracking-wide group-hover:translate-x-0.5 transition-transform flex items-center gap-1.5">
                      ✦ {service.title}
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action WhatsApp Handoff Box */}
            <div className="bg-gradient-to-r from-primary/20 via-primary/30 to-gold/10 border border-gold/45 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,rgba(220,190,116,0.08),transparent)] before:pointer-events-none flex-1">
              <div className="flex flex-col gap-2 relative z-10 text-center md:text-left">
                <h4 className="font-serif text-lg md:text-xl font-bold text-foreground">
                  Ready to Consulting with {astrologer.name}?
                </h4>
                <p className="text-xs text-muted-foreground max-w-md">
                  Book your session instantly on WhatsApp to secure a slot. Standard response time is under 15 minutes.
                </p>
              </div>

              <a 
                href={getPrefilledWhatsappUrl(astrologer.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex items-center gap-2 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22c35e] hover:to-[#0f7c6f] text-white font-semibold py-3 px-6 rounded-full shadow-xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all text-sm font-sans cursor-pointer shrink-0 active:scale-98"
              >
                <img src="/social-icons/whatsapp.png" alt="WhatsApp" className="w-4 h-4 object-contain shrink-0" />
                Connect on WhatsApp
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
