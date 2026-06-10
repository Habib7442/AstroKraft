"use client";

import React, { useState } from "react";
import { Briefcase, Heart, Coins, Activity, FileText, GraduationCap, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import ASTROLOGERS_DATA from "@/lib/data/astrologer.json";
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

const ASTROLOGERS = ASTROLOGERS_DATA as Record<string, AstrologerInfo>;

const translations = {
  en: {
    title: "WhatsApp Consultation Details",
    titleWithAstrologer: "Consultation with {name}",
    subtitle: "Select a consultation category and fill in your details to start your instant consultation via WhatsApp.",
    categoryLabel: "Select Consultation Category",
    detailsLabel: "Enter Your Birth Details",
    nameLabel: "Full Name",
    namePlaceholder: "Enter your full name",
    dobLabel: "Date of Birth",
    dobPlaceholder: "DD/MM/YYYY (e.g., 15/08/1989)",
    tobLabel: "Time of Birth",
    tobPlaceholder: "HH:MM AM/PM or 24-hr (e.g., 02:30 PM)",
    pobLabel: "Place of Birth",
    pobPlaceholder: "Select place of birth",
    submitBtn: "Consult via WhatsApp",
    validationError: "Please select a category and fill in all details.",
    redirecting: "Redirecting to WhatsApp...",
    categories: {
      career: "Career & Business",
      love: "Love & Marriage",
      finance: "Finance & Wealth",
      health: "Health & Well-being",
      kundli: "Kundli Guidance",
      education: "Education & Studies"
    }
  },
  hin: {
    title: "व्हाट्सएप परामर्श विवरण",
    titleWithAstrologer: "{name} के साथ परामर्श",
    subtitle: "व्हाट्सएप के माध्यम से अपना त्वरित परामर्श शुरू करने के लिए एक श्रेणी चुनें और अपना विवरण भरें।",
    categoryLabel: "परामर्श श्रेणी चुनें",
    detailsLabel: "अपना जन्म विवरण दर्ज करें",
    nameLabel: "पूरा नाम",
    namePlaceholder: "अपना पूरा नाम दर्ज करें",
    dobLabel: "जन्म तिथि",
    dobPlaceholder: "दिन/महीना/साल (जैसे, 15/08/1989)",
    tobLabel: "जन्म समय",
    tobPlaceholder: "समय (जैसे, 02:30 PM या 14:30)",
    pobLabel: "जन्म स्थान",
    pobPlaceholder: "जन्म स्थान चुनें",
    submitBtn: "व्हाट्सएप द्वारा परामर्श करें",
    validationError: "कृपया एक श्रेणी चुनें और सभी विवरण भरें।",
    redirecting: "व्हाट्सएप पर रीडायरेक्ट किया जा रहा है...",
    categories: {
      career: "करियर और व्यवसाय",
      love: "प्रेम और विवाह",
      finance: "वित्त और संपत्ति",
      health: "स्वास्थ्य और कल्याण",
      kundli: "कुंडली मार्गदर्शन",
      education: "शिक्षा और अध्ययन"
    }
  },
  bn: {
    title: "হোয়াটসঅ্যাপ পরামর্শ বিবরণ",
    titleWithAstrologer: "{name}-এর সাথে পরামর্শ",
    subtitle: "হোয়াটসঅ্যাপের মাধ্যমে আপনার তাত্ক্ষণিক পরামর্শ শুরু করতে একটি বিভাগ চয়ন করুন এবং আপনার বিবরণ পূরণ করুন।",
    categoryLabel: "পরামর্শ বিভাগ নির্বাচন করুন",
    detailsLabel: "আপনার জন্মের বিবরণ লিখুন",
    nameLabel: "সম্পূর্ণ নাম",
    namePlaceholder: "আপনার সম্পূর্ণ নাম লিখুন",
    dobLabel: "জন্ম তারিখ",
    dobPlaceholder: "দিন/মাস/বছর (যেমন, 15/08/1989)",
    tobLabel: "জন্মের সময়",
    tobPlaceholder: "সময় (যেমন, 02:30 PM বা 14:30)",
    pobLabel: "জন্মস্থান",
    pobPlaceholder: "জন্মস্থান নির্বাচন করুন",
    submitBtn: "হোয়াটসঅ্যাপের মাধ্যমে পরামর্শ করুন",
    validationError: "দয়া করে একটি বিভাগ চয়ন করুন এবং সমস্ত বিবরণ পূরণ করুন।",
    redirecting: "হোয়াটসঅ্যাপে রিডাইরেক্ট করা হচ্ছে...",
    categories: {
      career: "কর্মজীবন ও ব্যবসা",
      love: "প্রেম ও বিবাহ",
      finance: "অর্থ ও সম্পদ",
      health: "স্বাস্থ্য ও কল্যাণ",
      kundli: "কোষ্ঠী নির্দেশিকা",
      education: "শিক্ষা ও পড়াশোনা"
    }
  }
} as const;

const CITIES = [
  "Silchar, Assam",
  "Karimganj, Assam",
  "Hailakandi, Assam",
  "Guwahati, Assam",
  "Kolkata, West Bengal",
  "Delhi, NCR",
  "Mumbai, Maharashtra",
  "Bengaluru, Karnataka",
  "Chennai, Tamil Nadu",
  "Hyderabad, Telangana",
  "Pune, Maharashtra",
  "Jaipur, Rajasthan",
  "Patna, Bihar",
  "Lucknow, Uttar Pradesh",
  "Ahmedabad, Gujarat",
  "Bhubaneswar, Odisha",
  "Ranchi, Jharkhand",
  "Agartala, Tripura",
  "Shillong, Meghalaya",
  "Imphal, Manipur"
];

interface ConsultationFormProps {
  locale: string;
}

export function ConsultationForm({ locale }: ConsultationFormProps) {
  const activeLocale = ["en", "hin", "bn"].includes(locale) ? locale : "en";
  const t = translations[activeLocale as keyof typeof translations] || translations.en;

  const searchParams = useSearchParams();
  const astrologerKey = searchParams.get("astrologer");
  const selectedAstrologer = astrologerKey ? ASTROLOGERS[astrologerKey] : null;

  const [category, setCategory] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [pob, setPob] = useState<string>("");

  const categoriesList = [
    { id: "career", icon: Briefcase, color: "bg-[#FFE4A0]" },
    { id: "love", icon: Heart, color: "bg-[#E5D5FF]" },
    { id: "finance", icon: Coins, color: "bg-[#FFD0C8]" },
    { id: "health", icon: Activity, color: "bg-[#C6F6D5]" },
    { id: "kundli", icon: FileText, color: "bg-[#FEF08A]" },
    { id: "education", icon: GraduationCap, color: "bg-[#E0F2FE]" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !name || !dob || !time || !pob) {
      toast.error(t.validationError);
      return;
    }

    const categoryLabel = t.categories[category as keyof typeof t.categories] || category;
    
    // Format message for WhatsApp
    const message = `Hello AstroKraft!` + (selectedAstrologer ? ` I would like to get a WhatsApp Consultation with ${selectedAstrologer.name}.` : ` I would like to get a WhatsApp Consultation.`) + `\n\n` +
                    `*Details:*\n` +
                    `• Name: ${name}\n` +
                    `• Category: ${categoryLabel}\n` +
                    `• Date of Birth: ${dob}\n` +
                    `• Time of Birth: ${time}\n` +
                    `• Place of Birth: ${pob}`;
                    
    const isBiprangshu = astrologerKey === "biprangshu_bhattacharjee";
    const phoneNum = selectedAstrologer 
      ? (isBiprangshu ? "6001730761" : "6913230255") 
      : "6913230255";
                    
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=91${phoneNum}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
    
    toast.success(t.redirecting);
    
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 1000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 select-none">
      {/* Page Title & Subtitle */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-serif text-black font-black tracking-tight drop-shadow-[1px_1px_0px_rgba(0,0,0,0.1)] animate-fade-in">
          {selectedAstrologer ? t.titleWithAstrologer.replace("{name}", selectedAstrologer.name) : t.title}
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 font-bold max-w-2xl mx-auto leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Category Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-black uppercase tracking-wider text-center sm:text-left border-b border-zinc-100 pb-2 flex items-center justify-center sm:justify-start gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E2C27A] inline-block animate-pulse" />
            {t.categoryLabel}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
            {categoriesList.map((cat) => {
              const Icon = cat.icon;
              const isSelected = category === cat.id;
              const titleText = t.categories[cat.id as keyof typeof t.categories];

              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={cn(
                    "group relative flex flex-col items-center justify-center text-center p-4 rounded-2xl border transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5",
                    isSelected
                      ? "bg-[#E2C27A] border-[#E2C27A] text-black"
                      : `${cat.color} border-zinc-200/60 text-black`
                  )}
                >
                  <div className="p-2.5 rounded-full border border-zinc-200 bg-white group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 text-black shrink-0" />
                  </div>
                  <h3 className="font-sans text-[11px] sm:text-xs font-bold text-black mt-3 leading-snug uppercase tracking-tight line-clamp-2">
                    {titleText}
                  </h3>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Input Details Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-zinc-150 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-black uppercase tracking-wider border-b border-zinc-100 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E2C27A] inline-block" />
              {t.detailsLabel}
            </h2>

            <div className="space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block">
                  {t.nameLabel}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-black font-semibold placeholder:text-neutral-400 focus:outline-none focus:border-[#E2C27A] focus:ring-1 focus:ring-[#E2C27A]/30 transition-all shadow-sm"
                  placeholder={t.namePlaceholder}
                />
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Date of Birth */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block">
                    {t.dobLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder={t.dobPlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-black font-semibold placeholder:text-neutral-400 focus:outline-none focus:border-[#E2C27A] focus:ring-1 focus:ring-[#E2C27A]/30 transition-all shadow-sm"
                  />
                </div>

                {/* Time of Birth */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block">
                    {t.tobLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder={t.tobPlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-black font-semibold placeholder:text-neutral-400 focus:outline-none focus:border-[#E2C27A] focus:ring-1 focus:ring-[#E2C27A]/30 transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* Place of Birth Dropdown */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block">
                  {t.pobLabel}
                </label>
                <div className="relative w-full">
                  <select
                    required
                    value={pob}
                    onChange={(e) => setPob(e.target.value)}
                    className="w-full px-4 py-3 pr-10 rounded-xl border border-zinc-200 bg-white text-black font-semibold focus:outline-none focus:border-[#E2C27A] focus:ring-1 focus:ring-[#E2C27A]/30 transition-all appearance-none cursor-pointer shadow-sm"
                  >
                    <option value="" disabled className="text-neutral-400">
                      {t.pobPlaceholder}
                    </option>
                    {CITIES.map((city) => (
                      <option key={city} value={city} className="text-black font-semibold">
                        {city}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-zinc-500">
                    <svg className="h-4 w-4 stroke-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#E2C27A] hover:bg-[#d4b36a] text-black shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 font-bold py-3.5 text-sm rounded-full cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider border border-[#E2C27A]/50"
              >
                <MessageSquare className="w-4.5 h-4.5 shrink-0 text-black fill-black" />
                {t.submitBtn}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
