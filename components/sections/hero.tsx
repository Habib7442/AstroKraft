"use client";

import Image from "next/image";
import React from "react";
import { ShieldCheck, Phone, UserCheck, Lock, Briefcase, Heart, Coins, Activity, FileText, GraduationCap, X, MessageSquare } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

import Globe3DDemo from "@/components/3d-globe-demo";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import servicesData from "@/lib/data/services.json";
import { cn } from "@/lib/utils";

const ZODIAC_WHEEL_SRC = "/assets/zodiac_wheel.png?v=20260610";

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

const modalTranslations = {
  en: {
    title: "Enter Your Birth Details",
    nameLabel: "Full Name",
    namePlaceholder: "Enter your full name",
    dobLabel: "Date of Birth",
    dobPlaceholder: "DD/MM/YYYY (e.g., 15/08/1989)",
    tobLabel: "Time of Birth",
    tobPlaceholder: "HH:MM AM/PM or 24-hr (e.g., 02:30 PM)",
    pobLabel: "Place of Birth",
    pobPlaceholder: "Select place of birth",
    submitBtn: "Consult via WhatsApp",
    validationError: "Please fill in all details.",
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
    title: "अपना जन्म विवरण दर्ज करें",
    nameLabel: "पूरा नाम",
    namePlaceholder: "अपना पूरा नाम दर्ज करें",
    dobLabel: "जन्म तिथि",
    dobPlaceholder: "दिन/महीना/साल (जैसे, 15/08/1989)",
    tobLabel: "जन्म समय",
    tobPlaceholder: "समय (जैसे, 02:30 PM)",
    pobLabel: "जन्म स्थान",
    pobPlaceholder: "जन्म स्थान चुनें",
    submitBtn: "व्हाट्सएप द्वारा परामर्श करें",
    validationError: "कृपया सभी विवरण भरें।",
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
    title: "আপনার জন্মের বিবরণ লিখুন",
    nameLabel: "সম্পূর্ণ নাম",
    namePlaceholder: "আপনার সম্পূর্ণ নাম লিখুন",
    dobLabel: "জন্ম তারিখ",
    dobPlaceholder: "দিন/মাস/বছর (যেমন, 15/08/1989)",
    tobLabel: "জন্মের সময়",
    tobPlaceholder: "সময় (যেমন, 02:30 PM)",
    pobLabel: "জন্মস্থান",
    pobPlaceholder: "জন্মস্থান নির্বাচন করুন",
    submitBtn: "হোয়াটসঅ্যাপের মাধ্যমে পরামর্শ করুন",
    validationError: "দয়া করে সমস্ত বিবরণ পূরণ করুন।",
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
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    dob: "",
    time: "",
    pob: ""
  });

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

  const tModal = modalTranslations[activeLocale as keyof typeof modalTranslations] || modalTranslations.en;

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !formData.name || !formData.dob || !formData.time || !formData.pob) {
      toast.error(tModal.validationError);
      return;
    }

    const categoryLabel = tModal.categories[selectedCategory as keyof typeof tModal.categories] || selectedCategory;

    const message = `Hello AstroKraft! I would like to get a WhatsApp Consultation.\n\n` +
                    `*Details:*\n` +
                    `• Name: ${formData.name}\n` +
                    `• Category: ${categoryLabel}\n` +
                    `• Date of Birth: ${formData.dob}\n` +
                    `• Time of Birth: ${formData.time}\n` +
                    `• Place of Birth: ${formData.pob}`;

    const whatsappUrl = `https://api.whatsapp.com/send/?phone=916913230255&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
    
    toast.success(tModal.redirecting);
    
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsModalOpen(false);
      setFormData({ name: "", dob: "", time: "", pob: "" });
    }, 1000);
  };

  const heroCategories = [
    { id: "career", icon: Briefcase, color: "bg-[#FFE4A0]", label: { en: "CAREER &\nBUSINESS", hin: "करियर और\nव्यवसाय", bn: "কর্মজীবন ও\nব্যবসা" } },
    { id: "love", icon: Heart, color: "bg-[#E5D5FF]", label: { en: "LOVE &\nMARRIAGE", hin: "प्रेम और\nविवाह", bn: "প্রেম ও\nবিবাহ" } },
    { id: "finance", icon: Coins, color: "bg-[#FFD0C8]", label: { en: "FINANCE &\nWEALTH", hin: "वित्त और\nसंपत्ति", bn: "অর্থ ও\nসম্পদ" } },
    { id: "health", icon: Activity, color: "bg-[#C6F6D5]", label: { en: "HEALTH &\nWELL-BEING", hin: "स्वास्थ्य और\nकल्याण", bn: "স্বাস্থ্য ও\nকল্যাণ" } },
    { id: "kundli", icon: FileText, color: "bg-[#FEF08A]", label: { en: "KUNDLI\nGUIDANCE", hin: "कुंडली\nमार्गदर्शन", bn: "কোষ্ঠী\nনির্দেশিকা" } },
    { id: "education", icon: GraduationCap, color: "bg-[#E0F2FE]", label: { en: "EDUCATION &\nSTUDIES", hin: "शिक्षा और\nअध्ययन", bn: "শিক্ষা ও\nপড়াশোনা" } }
  ];

  return (
    <section
      className="relative w-full overflow-hidden border-b border-[#E2C27A]/20 pt-20 pb-8 md:pt-32 md:pb-16 lg:pt-32 lg:pb-28 flex flex-col justify-center items-center"
      style={{
        background: 'linear-gradient(135deg, #0B1026, #2A1A5E, #4C1D95)'
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none z-0" />

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-center w-full">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-7 md:gap-8 lg:col-span-7 w-full order-1">
            <div className="flex flex-wrap gap-2.5 items-center justify-center lg:justify-start">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 border border-[#E2C27A]/30 bg-white/10 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm select-none rounded-full backdrop-blur-md">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{getConsultedText(consultedCount)}</span>
              </span>
            </div>

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
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 select-none animate-spin-slow">
                <img
                  src={ZODIAC_WHEEL_SRC}
                  alt="Zodiac Wheel"
                  className="w-full h-full object-cover rounded-full"
                  draggable={false}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 select-none w-full">
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

            <div className="w-full flex flex-col gap-3 items-center lg:items-start select-none">
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E2C27A] inline-block animate-pulse shrink-0" />
                {activeLocale === "hin" ? "परामर्श श्रेणी चुनें" : activeLocale === "bn" ? "পরামর্শ বিভাগ নির্বাচন করুন" : "Select Consultation Category"}
              </div>
              
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3.5 w-full max-w-2xl">
                {heroCategories.map((cat) => {
                  const Icon = cat.icon;
                  const titleText = cat.label[activeLocale as keyof typeof cat.label] || cat.label.en;
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.id)}
                      className={cn(
                        "group flex flex-col items-center justify-center p-3 rounded-2xl border border-zinc-200/25 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 text-black",
                        cat.color
                      )}
                    >
                      <div className="p-2 rounded-full border border-zinc-200 bg-white group-hover:scale-105 transition-transform shrink-0">
                        <Icon className="w-4 h-4 text-black shrink-0" />
                      </div>
                      <h3 className="font-sans text-[8px] sm:text-[9px] font-black text-black mt-2 leading-tight uppercase tracking-tight text-center whitespace-pre-line shrink-0">
                        {titleText}
                      </h3>
                    </button>
                  );
                })}
              </div>
            </div>

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

          <div className="lg:col-span-5 w-full flex justify-center items-center relative h-[350px] sm:h-[450px] lg:h-[500px] order-4 lg:order-2">
            <Globe3DDemo className="h-full w-full" locale={locale} />
          </div>
        </div>
      </div>

      {isModalOpen && selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in select-none">
          <div className="relative w-full max-w-lg bg-white border border-zinc-150 rounded-3xl p-6 sm:p-8 shadow-2xl animate-scale-up space-y-6">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-black rounded-full hover:bg-zinc-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 text-center pb-3 border-b border-zinc-100">
              <span className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase text-black",
                heroCategories.find(c => c.id === selectedCategory)?.color
              )}>
                {React.createElement(heroCategories.find(c => c.id === selectedCategory)?.icon || Briefcase, { className: "w-3 h-3 text-black shrink-0" })}
                {tModal.categories[selectedCategory as keyof typeof tModal.categories]}
              </span>
              <h2 className="text-xl font-extrabold text-black uppercase tracking-wide">
                {tModal.title}
              </h2>
            </div>

            <form onSubmit={handleModalSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-zinc-700 block">
                  {tModal.nameLabel}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-250 bg-white text-black font-semibold placeholder:text-neutral-400 focus:outline-none focus:border-[#E2C27A] focus:ring-1 focus:ring-[#E2C27A]/30 transition-all shadow-sm"
                  placeholder={tModal.namePlaceholder}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-700 block">
                    {tModal.dobLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    placeholder={tModal.dobPlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-250 bg-white text-black font-semibold placeholder:text-neutral-400 focus:outline-none focus:border-[#E2C27A] focus:ring-1 focus:ring-[#E2C27A]/30 transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-zinc-700 block">
                    {tModal.tobLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder={tModal.tobPlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-250 bg-white text-black font-semibold placeholder:text-neutral-400 focus:outline-none focus:border-[#E2C27A] focus:ring-1 focus:ring-[#E2C27A]/30 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-zinc-700 block">
                  {tModal.pobLabel}
                </label>
                <div className="relative w-full">
                  <select
                    required
                    value={formData.pob}
                    onChange={(e) => setFormData({ ...formData, pob: e.target.value })}
                    className="w-full px-4 py-2.5 pr-10 rounded-xl border border-zinc-250 bg-white text-black font-semibold focus:outline-none focus:border-[#E2C27A] focus:ring-1 focus:ring-[#E2C27A]/30 transition-all appearance-none cursor-pointer shadow-sm"
                  >
                    <option value="" disabled className="text-neutral-400">
                      {tModal.pobPlaceholder}
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

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#E2C27A] hover:bg-[#d4b36a] text-black shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 font-bold py-3 text-sm rounded-full cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider border border-[#E2C27A]/50"
                >
                  <MessageSquare className="w-4.5 h-4.5 shrink-0 text-black fill-black" />
                  {tModal.submitBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
