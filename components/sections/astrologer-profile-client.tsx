"use client";

import React, { useState } from "react";
import { 
  Star, Award, Phone, Mail, Copy, Check, ArrowLeft, 
  ShieldCheck, Compass, Languages, Globe
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
    <div className="relative py-12 px-6 md:px-12 lg:px-16 text-black overflow-hidden bg-[#FFFDF0]/30 min-h-screen">
      {/* Dynamic background highlights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-amber-200/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-200/10 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Back Button / Breadcrumb */}
        <a 
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-xs text-neutral-600 hover:text-black font-black uppercase tracking-wider border-2 border-black bg-white px-4 py-2 rounded-full shadow-[2px_2px_0px_#000] transition-all hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none mb-8 group w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform stroke-[3px]" />
          Back to Astrologers Grid
        </a>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Avatar, Badges, Fee & Quick Contact */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full">
            
            {/* Primary Profile Card */}
            <div className={cn(
              "border-[3px] border-black rounded-2xl p-6 text-center flex flex-col items-center relative overflow-hidden shadow-[6px_6px_0px_#000]",
              cardColors[astrologerId] || "bg-white"
            )}>
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#FFC000]" />
              
              {/* Profile image with black status ring */}
              <div className="relative mb-4">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-[3px] border-black bg-white p-1 shadow-md">
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
                    "relative inline-flex rounded-full h-4 w-4 border-2 border-black",
                    isOnline ? "bg-emerald-500" : "bg-amber-500"
                  )} />
                </span>
              </div>

              {/* Name & Title */}
              <h1 className="font-serif text-2xl font-black tracking-wide text-black">
                {astrologer.name}
              </h1>
              
              <p className="text-xs text-neutral-500 font-black tracking-wider uppercase mt-1">
                {specialtyText}
              </p>

              {/* Status Badge */}
              <span className={cn(
                "inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase border-2 border-black bg-white shadow-[2px_2px_0px_#000]",
                isOnline ? "text-emerald-600" : "text-amber-600"
              )}>
                <span className={cn("h-1.5 w-1.5 rounded-full border border-black", isOnline ? "bg-emerald-500" : "bg-amber-500")} />
                {isOnline ? "Online & Ready" : "Currently Busy"}
              </span>

              {/* Rating stars & reviews count */}
              <div className="flex items-center gap-1.5 mt-4 bg-white border-2 border-black px-3 py-1.5 rounded-full text-xs font-black shadow-[2px_2px_0px_#000]">
                <Star className="w-4 h-4 text-[#FFC000] fill-[#FFC000] stroke-black stroke-[1.5px]" />
                <span className="font-bold">{astrologer.rating}</span>
                <span className="text-neutral-500 font-black">({astrologer.reviews} reviews)</span>
              </div>

              {/* Experience and City */}
              <div className="w-full grid grid-cols-2 gap-3 mt-6 pt-5 border-t-2 border-black text-xs font-black">
                <div className="flex flex-col items-center p-2 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000]">
                  <Award className="w-4 h-4 text-black stroke-[2px] mb-1" />
                  <span className="text-[8px] text-neutral-500 uppercase tracking-wider scale-95">Experience</span>
                  <span className="font-serif font-black text-black mt-0.5">{astrologer.experience} Years</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000]">
                  <Globe className="w-4 h-4 text-black stroke-[2px] mb-1" />
                  <span className="text-[8px] text-neutral-500 uppercase tracking-wider scale-95">Location</span>
                  <span className="font-serif font-black text-black mt-0.5">
                    {activeLocale === "hin" ? "भारत" : activeLocale === "bn" ? "ভারত" : "India"}
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-[#FFF9E6] border-[3px] border-black rounded-2xl p-5 relative overflow-hidden shadow-[6px_6px_0px_#000] font-black">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Consultation Fee</span>
                  <span className="font-serif font-black text-2xl text-black mt-0.5">₹{astrologer.fee.toFixed(2)}</span>
                </div>
                <span className="px-2.5 py-1 rounded border-2 border-black bg-[#E5D5FF] text-[9px] text-black uppercase tracking-widest font-black shadow-[1.5px_1.5px_0px_#000]">
                  Online session
                </span>
              </div>
            </div>

            {/* Quick Contact & Copy Fields Card */}
            <div className="bg-white border-[3px] border-black rounded-2xl p-5 flex flex-col gap-4 font-sans text-xs shadow-[6px_6px_0px_#000] font-black">
              <h4 className="font-serif font-black text-black uppercase tracking-widest text-[10px] border-b-2 border-black pb-2 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4.5 h-4.5 text-black stroke-[2px]" />
                Verified Contact Details
              </h4>

              {/* Phone field */}
              <div className="flex items-center justify-between gap-2 text-neutral-600">
                <span>Phone Number</span>
                <div className="flex items-center gap-1.5">
                  <a href={`tel:${astrologer.phone}`} className="font-black text-black hover:text-[#FFC000] hover:underline transition-colors">{astrologer.phone}</a>
                  <button 
                    onClick={() => handleCopy(astrologer.phone, "Phone number")}
                    className="p-1.5 text-black hover:bg-black/5 rounded transition-colors cursor-pointer"
                    title="Copy phone number"
                  >
                    {copiedField === "Phone number" ? <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3px]" /> : <Copy className="w-3.5 h-3.5 text-black stroke-[2px]" />}
                  </button>
                </div>
              </div>

              {/* Email field */}
              <div className="flex items-center justify-between gap-2 text-neutral-600">
                <span>Email Address</span>
                <div className="flex items-center gap-1.5 max-w-[200px]">
                  <a href={`mailto:${astrologer.email}`} className="font-black text-black hover:text-[#FFC000] hover:underline transition-colors truncate">{astrologer.email}</a>
                  <button 
                    onClick={() => handleCopy(astrologer.email, "Email address")}
                    className="p-1.5 text-black hover:bg-black/5 rounded transition-colors cursor-pointer shrink-0"
                    title="Copy email address"
                  >
                    {copiedField === "Email address" ? <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3px]" /> : <Copy className="w-3.5 h-3.5 text-black stroke-[2px]" />}
                  </button>
                </div>
              </div>

              {/* Languages List */}
              <div className="flex items-center justify-between gap-2 text-neutral-600 border-t-2 border-black pt-3 mt-1">
                <span className="flex items-center gap-1"><Languages className="w-3.5 h-3.5 text-black stroke-[2px]" /> Languages</span>
                <div className="flex flex-wrap justify-end gap-1.5 max-w-[200px]">
                  {astrologer.languages[activeLocale]?.map((lang) => (
                    <span key={lang} className="px-2 py-0.5 rounded border-2 border-black bg-[#E5D5FF] text-[9px] text-black font-black uppercase shadow-[1.5px_1.5px_0px_#000]">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Address Box */}
              <div className="border-t-2 border-black pt-3 text-[11px] text-neutral-600 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-black text-black uppercase tracking-wider text-[8px]">Practice Address</span>
                  <button 
                    onClick={() => handleCopy(addressText, "Address")}
                    className="p-1 text-black hover:bg-black/5 rounded transition-colors cursor-pointer"
                    title="Copy address"
                  >
                    {copiedField === "Address" ? <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3px]" /> : <Copy className="w-3.5 h-3.5 text-black stroke-[2px]" />}
                  </button>
                </div>
                <span className="leading-relaxed text-neutral-700 font-semibold bg-[#FFF9E6] p-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_#000]">{addressText}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Bio, Services & Consultation CTA */}
          <div className="lg:col-span-8 flex flex-col gap-6 w-full h-full">
            
            {/* Bio Card */}
            <div className="bg-white border-[3px] border-black rounded-2xl p-6 md:p-8 flex flex-col gap-4 relative overflow-hidden shadow-[6px_6px_0px_#000]">
              <h2 className="font-serif text-xl sm:text-2xl font-black tracking-wide text-black flex items-center gap-2">
                <Compass className="w-5 h-5 text-black animate-[spin_20s_linear_infinite] stroke-[2.5px]" />
                Professional Profile
              </h2>
              <div className="h-0.5 bg-black" />
              <p className="text-sm md:text-base text-neutral-700 font-semibold leading-relaxed font-sans first-letter:text-3xl first-letter:font-serif first-letter:text-black first-letter:font-black first-letter:mr-1.5 first-letter:float-left pt-2">
                {descText}
              </p>
            </div>

            {/* Specialties & Services Offered */}
            <div className="bg-white border-[3px] border-black rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-[6px_6px_0px_#000]">
              <h3 className="font-serif text-xl font-black text-black">
                Expertise & Consultation Offerings
              </h3>
              <div className="h-0.5 bg-black" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {servicesList.map((service, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "p-4 rounded-xl border-2 border-black hover:shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all flex flex-col gap-1.5 group cursor-default",
                      itemColors[index % itemColors.length]
                    )}
                  >
                    <span className="text-xs font-black text-black tracking-wide group-hover:translate-x-0.5 transition-transform flex items-center gap-1.5">
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
            <div className="bg-[#FFE896] border-[3px] border-black rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-[6px_6px_0px_#000] flex-1">
              <div className="flex flex-col gap-2 relative z-10 text-center md:text-left text-black font-black">
                <h4 className="font-serif text-lg md:text-xl font-black">
                  Ready to consult with {astrologer.name}?
                </h4>
                <p className="text-xs text-neutral-600 font-semibold max-w-md">
                  Book your session instantly through our consultation form to secure a slot. Standard response time is under 15 minutes.
                </p>
              </div>

              <a 
                href={`/${locale}/consultation?astrologer=${astrologerId}`}
                className="relative z-10 inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-50 text-black border-2 border-black hover:shadow-[4px_4px_0px_#000] hover:-translate-y-[1px] hover:-translate-x-[1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all font-black py-3 px-6 rounded-full shadow-[2.5px_2.5px_0px_#000] text-sm font-sans cursor-pointer shrink-0"
              >
                Book Consultation
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
