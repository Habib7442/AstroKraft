"use client";

import React, { useState, useEffect } from "react";
import { 
  Star, Award, Phone, Mail, Copy, Check, ArrowLeft, 
  ShieldCheck, Compass, Languages, Globe
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useZego } from "@/components/providers/zego-provider";

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

const cardColors: Record<string, string> = {
  biprangshu_bhattacharjee: "bg-[#FFF9E6]",
  acharya_bhakta_vedanta: "bg-[#E5D5FF]",
  acharya_sneha: "bg-[#FFD0C8]",
  acharya_abhi_shastri: "bg-[#FEF08A]",
  astrologer_indrajit_dutta: "bg-[#C6F6D5]",
  rishi_acharya: "bg-[#E0F2FE]"
};

const itemColors = [
  "bg-[#FFF9E6]", // pastel yellow
  "bg-[#E5D5FF]", // pastel purple
  "bg-[#FFD0C8]", // pastel peach
  "bg-[#C6F6D5]", // pastel green
  "bg-[#E0F2FE]", // pastel blue
];

export default function AstrologerProfileClient({ 
  astrologer, 
  astrologerId, 
  locale 
}: AstrologerProfileClientProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const { startCall } = useZego();
  const activeLocale = ["en", "hin", "bn"].includes(locale) ? locale : "en";

  useEffect(() => {
    setHasMounted(true);
  }, []);

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

  const isAstrologerSession = hasMounted && typeof window !== "undefined" && window.location.search.includes("role=astrologer");

  return (
    <div className="relative py-12 px-4 sm:px-6 lg:px-8 text-black overflow-hidden bg-[#FFFDF0]/30 min-h-screen">
      {/* Dynamic background highlights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-amber-200/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-200/10 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Back Button / Breadcrumb */}
        <a 
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-xs text-neutral-600 hover:text-black font-bold uppercase tracking-wider border border-zinc-200 bg-white px-4 py-2 rounded-full shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-px hover:shadow-md mb-8 group w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform stroke-[2px]" />
          Back to Astrologers Grid
        </a>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Avatar, Badges, Fee & Quick Contact */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full">
            
            {/* Primary Profile Card */}
            <div className={cn(
              "border border-zinc-150 rounded-2xl p-6 text-center flex flex-col items-center relative overflow-hidden shadow-sm",
              cardColors[astrologerId] || "bg-white"
            )}>
              <div className="absolute top-0 left-0 w-full h-1 bg-[#E2C27A]" />
              
              {/* Profile image with status ring */}
              <div className="relative mb-4">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border border-zinc-200 bg-white p-1 shadow-sm">
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
                    "relative inline-flex rounded-full h-4 w-4 border-2 border-white",
                    isOnline ? "bg-emerald-500" : "bg-amber-500"
                  )} />
                </span>
              </div>

              {/* Name & Title */}
              <h1 className="font-serif text-2xl font-bold tracking-wide text-black">
                {astrologer.name}
              </h1>
              
              <p className="text-xs text-[#b28b3a] bg-[#E2C27A]/10 border border-[#E2C27A]/30 px-2.5 py-0.5 rounded-full font-bold font-sans shadow-sm mt-2 leading-none w-fit">
                {specialtyText}
              </p>

              {/* Status Badge */}
              <span className={cn(
                "inline-flex items-center gap-1.5 mt-3.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase border border-zinc-200 bg-white shadow-sm",
                isOnline ? "text-emerald-700" : "text-amber-700"
              )}>
                <span className={cn("h-1.5 w-1.5 rounded-full", isOnline ? "bg-emerald-500" : "bg-amber-500")} />
                {isOnline ? "Online & Ready" : "Currently Busy"}
              </span>

              {/* Rating stars & reviews count */}
              <div className="flex items-center gap-1.5 mt-4 bg-white border border-zinc-200 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
                <Star className="w-4 h-4 text-[#E2C27A] fill-[#E2C27A]" />
                <span className="font-bold">{astrologer.rating}</span>
                <span className="text-neutral-400 font-bold">({astrologer.reviews} reviews)</span>
              </div>

              {/* Experience and City */}
              <div className="w-full grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-zinc-100 text-xs font-bold">
                <div className="flex flex-col items-center p-2 rounded-xl bg-white border border-zinc-150 shadow-sm">
                  <Award className="w-4 h-4 text-zinc-400 stroke-[1.5px] mb-1" />
                  <span className="text-[8px] text-neutral-400 uppercase tracking-wider scale-95">Experience</span>
                  <span className="font-serif font-bold text-black mt-0.5">{astrologer.experience} Years</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-xl bg-white border border-zinc-150 shadow-sm">
                  <Globe className="w-4 h-4 text-zinc-400 stroke-[1.5px] mb-1" />
                  <span className="text-[8px] text-neutral-400 uppercase tracking-wider scale-95">Location</span>
                  <span className="font-serif font-bold text-black mt-0.5">
                    {activeLocale === "hin" ? "भारत" : activeLocale === "bn" ? "ভারত" : "India"}
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-[#FFF9E6]/40 border border-zinc-200 rounded-2xl p-5 relative overflow-hidden shadow-sm font-bold">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider">Consultation Fee</span>
                  <span className="font-serif font-bold text-2xl text-black mt-0.5">₹{astrologer.fee.toFixed(2)}</span>
                </div>
                <span className="px-2.5 py-1 rounded border border-zinc-200 bg-white text-[9px] text-zinc-700 uppercase tracking-widest font-bold shadow-sm">
                  Online session
                </span>
              </div>
            </div>

            {/* Quick Contact & Copy Fields Card */}
            <div className="bg-white border border-zinc-150 rounded-2xl p-5 flex flex-col gap-4 font-sans text-xs shadow-sm font-bold">
              <h4 className="font-serif font-bold text-black uppercase tracking-wider text-[10px] border-b border-zinc-100 pb-2 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4.5 h-4.5 text-zinc-400 stroke-[1.5px]" />
                Verified Contact Details
              </h4>

              {/* Phone field */}
              <div className="flex items-center justify-between gap-2 text-neutral-500">
                <span>Phone Number</span>
                <div className="flex items-center gap-1.5">
                  <a href={`tel:${astrologer.phone}`} className="font-bold text-black hover:text-primary hover:underline transition-colors">{astrologer.phone}</a>
                  <button 
                    onClick={() => handleCopy(astrologer.phone, "Phone number")}
                    className="p-1.5 text-zinc-500 hover:bg-black/5 rounded transition-colors cursor-pointer"
                    title="Copy phone number"
                  >
                    {copiedField === "Phone number" ? <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2px]" /> : <Copy className="w-3.5 h-3.5 text-zinc-400 stroke-[1.5px]" />}
                  </button>
                </div>
              </div>

              {/* Email field */}
              <div className="flex items-center justify-between gap-2 text-neutral-500">
                <span>Email Address</span>
                <div className="flex items-center gap-1.5 max-w-[200px]">
                  <a href={`mailto:${astrologer.email}`} className="font-bold text-black hover:text-primary hover:underline transition-colors truncate">{astrologer.email}</a>
                  <button 
                    onClick={() => handleCopy(astrologer.email, "Email address")}
                    className="p-1.5 text-zinc-500 hover:bg-black/5 rounded transition-colors cursor-pointer shrink-0"
                    title="Copy email address"
                  >
                    {copiedField === "Email address" ? <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2px]" /> : <Copy className="w-3.5 h-3.5 text-zinc-400 stroke-[1.5px]" />}
                  </button>
                </div>
              </div>

              {/* Languages List */}
              <div className="flex items-center justify-between gap-2 text-neutral-500 border-t border-zinc-100 pt-3 mt-1">
                <span className="flex items-center gap-1"><Languages className="w-3.5 h-3.5 text-zinc-400 stroke-[1.5px]" /> Languages</span>
                <div className="flex flex-wrap justify-end gap-1.5 max-w-[200px]">
                  {astrologer.languages[activeLocale]?.map((lang) => (
                    <span key={lang} className="px-2.5 py-1 rounded border border-purple-200/50 bg-purple-50 text-[9px] text-purple-700 font-bold uppercase shadow-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Address Box */}
              <div className="border-t border-zinc-100 pt-3 text-[11px] text-neutral-500 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-400 uppercase tracking-wider text-[8px]">Practice Address</span>
                  <button 
                    onClick={() => handleCopy(addressText, "Address")}
                    className="p-1 text-zinc-500 hover:bg-black/5 rounded transition-colors cursor-pointer"
                    title="Copy address"
                  >
                    {copiedField === "Address" ? <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3px]" /> : <Copy className="w-3.5 h-3.5 text-zinc-500 stroke-[1.5px]" />}
                  </button>
                </div>
                <span className="leading-relaxed text-zinc-700 font-semibold bg-[#FFF9E6]/40 p-2.5 border border-zinc-200/60 rounded-xl block shadow-sm">{addressText}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Bio, Services & Consultation CTA */}
          <div className="lg:col-span-8 flex flex-col gap-6 w-full h-full">
            
            {/* Bio Card */}
            <div className="bg-white border border-zinc-150 rounded-2xl p-6 md:p-8 flex flex-col gap-4 relative overflow-hidden shadow-sm">
              <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-black flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#E2C27A] animate-[spin_20s_linear_infinite] stroke-[1.5px]" />
                Professional Profile
              </h2>
              <div className="h-px bg-zinc-100" />
              <p className="text-sm md:text-base text-neutral-700 font-semibold leading-relaxed font-sans first-letter:text-3xl first-letter:font-serif first-letter:text-black first-letter:font-bold first-letter:mr-1.5 first-letter:float-left pt-2">
                {descText}
              </p>
            </div>

            {/* Specialties & Services Offered */}
            <div className="bg-white border border-zinc-150 rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-black">
                Expertise & Consultation Offerings
              </h3>
              <div className="h-px bg-zinc-100" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {servicesList.map((service, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "p-4 rounded-xl border border-zinc-150 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-1.5 group cursor-default",
                      itemColors[index % itemColors.length]
                    )}
                  >
                    <span className="text-xs font-bold text-black tracking-wide flex items-center gap-1.5">
                      ✦ {service.title}
                    </span>
                    <p className="text-xs text-neutral-600 font-semibold leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action WhatsApp Handoff Box */}
            <div className="bg-[#FFF9E6]/60 border border-[#E2C27A]/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-sm flex-1">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#E2C27A]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col gap-2 relative z-10 text-center md:text-left text-black font-bold">
                <h4 className="font-serif text-lg md:text-xl font-bold">
                  {isAstrologerSession ? "Astrologer Sandbox Mode" : `Ready to consult with ${astrologer.name}?`}
                </h4>
                <p className="text-xs text-neutral-600 font-semibold max-w-md">
                  {isAstrologerSession 
                    ? "Your browser is successfully acting as the receiver client. Leave this tab open in the background to receive calls." 
                    : "Book your session instantly through our consultation form to secure a slot. Standard response time is under 15 minutes."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 relative z-10 shrink-0 w-full sm:w-auto">
                {isAstrologerSession ? (
                  <div className="inline-flex items-center justify-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold py-3 px-6 rounded-full text-xs font-sans animate-pulse">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Listening for Incoming Calls...
                  </div>
                ) : (
                  <>
                    <button 
                      onClick={() => startCall(astrologerId, astrologer.name)}
                      className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 font-bold py-3 px-6 rounded-full shadow-sm text-sm font-sans cursor-pointer border border-emerald-400/50"
                    >
                      <Phone className="w-4 h-4 fill-white" />
                      Call Now
                    </button>

                    <a 
                      href={`/${locale}/consultation?astrologer=${astrologerId}`}
                      className="inline-flex items-center justify-center gap-2 bg-[#E2C27A] hover:bg-[#d4b36a] text-black hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 font-bold py-3 px-6 rounded-full shadow-sm text-sm font-sans cursor-pointer border border-[#E2C27A]/50"
                    >
                      Book Consultation
                    </a>
                  </>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
