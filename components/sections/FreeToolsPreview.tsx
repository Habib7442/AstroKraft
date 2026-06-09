"use client";

import React from "react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Compass, HeartHandshake, Calendar, Orbit } from "lucide-react";
import { cn } from "@/lib/utils";

interface FreeToolsPreviewProps {
  locale?: string;
}

const translations = {
  en: {
    eyebrow: "✦ 100% Free Celestial Calculations",
    heading: "Interactive Vedic Astrology Tools",
    subheading: "Gain immediate clarity on your birth chart, compatibility score, and planetary alignments with our precise digital engines.",
    kundliTitle: "Free Kundli & Birth Chart",
    kundliDesc: "Instantly calculate your detailed Vedic birth chart, planetary degrees, ascendant lagna, and major Vimshottari dasha cycles.",
    matchingTitle: "Kundli Matching (Guna Milan)",
    matchingDesc: "Evaluate compatibility matching points out of 36 gunas, analyze potential Manglik dosha clashes, and generate a beautiful shareable verdict.",
    panchangTitle: "Daily Panchang & Muhurat",
    panchangDesc: "Track auspicious timings, Tithi, Nakshatra, Yoga, and Karana localized precisely for your coordinate location.",
    horoscopeTitle: "Daily Horoscope Forecasting",
    horoscopeDesc: "Receive accurate zodiac predictions for career, finance, relationship, and health guidance based on your sign.",
    exploreBtn: "Launch Tool",
    comingSoon: "Coming Soon",
    viewAllBtn: "Explore All Free Tools ✦"
  },
  hin: {
    eyebrow: "✦ 100% मुफ़्त आकाशीय गणना",
    heading: "पारस्परिक वैदिक ज्योतिष उपकरण",
    subheading: "हमारे सटीक डिजिटल इंजनों के माध्यम से अपनी जन्म कुंडली, अनुकूलता स्कोर और ग्रहों के गोचर पर त्वरित स्पष्टता प्राप्त करें।",
    kundliTitle: "निःशुल्क कुंडली और जन्म चक्र",
    kundliDesc: "अपनी विस्तृत जन्म कुंडली, लग्न/राशि, ग्रहों की स्थिति और विंशोत्तरी महादशा समय चक्र तुरंत जानें।",
    matchingTitle: "कुंडली मिलान (गुण मिलान)",
    matchingDesc: "३६ गुणों में से अनुकूलता अंक प्राप्त करें, मांगलिक दोष प्रभावों की जांच करें और एक सुंदर साझा करने योग्य रिपोर्ट बनाएं।",
    panchangTitle: "दैनिक पंचांग और शुभ मुहूर्त",
    panchangDesc: "अपने स्थान के अनुसार दैनिक शुभ समय, तिथि, नक्षत्र, करण और शुभ मुहूर्त की जानकारी प्राप्त करें।",
    horoscopeTitle: "दैनिक राशिफल भविष्यफल",
    horoscopeDesc: "अपने सूर्य/चंद्र राशि के आधार पर करियर, वित्त, रिश्ते और स्वास्थ्य पर आधारित दैनिक भविष्यफल देखें।",
    exploreBtn: "उपकरण खोलें",
    comingSoon: "शीघ्र आ रहा है",
    viewAllBtn: "सभी निःशुल्क उपकरण देखें ✦"
  },
  bn: {
    eyebrow: "✦ ১০০% সম্পূর্ণ নিখরচায় গণনা",
    heading: "বৈদিক জ্যোতিষ গণনা সরঞ্জাম",
    subheading: "আমাদের নিখুঁত ডিজিটাল জ্যোতিষ ইঞ্জিনের সাহায্যে আপনার জন্ম কোষ্ঠী, সামঞ্জস্য স্কোর এবং গ্রহের গতিবিধি সম্পর্কে তাত্ক্ষণিক তথ্য জানুন।",
    kundliTitle: "বিনামূল্যে কোষ্ঠী ও জন্ম ছক",
    kundliDesc: "আপনার লগ্ন/রাশি, সঠিক ডিগ্রী অনুযায়ী গ্রহের অবস্থান এবং সম্পূর্ণ বিংশোত্তরী দশার চক্র তাত্ক্ষণিকভাবে জানুন।",
    matchingTitle: "কোষ্ঠী মেলাও ও গুণ মিলন",
    matchingDesc: "৩৬ গুণের সাহায্যে বিবাহ সামঞ্জস্য গণনা করুন, মাঙ্গলিক দোষের মিল পরীক্ষা করুন এবং একটি সুন্দর শেয়ার করার মত রিপোর্ট পান।"    ,
    panchangTitle: "দৈনিক পঞ্জিকা ও শুভ মুহূর্ত",
    panchangDesc: "আপনার শহরের অবস্থান অনুযায়ী আজকের দিনপঞ্জিকা, তিথি, নক্ষত্র এবং শুভ মুহূর্তের হদিস পান।",
    horoscopeTitle: "দৈনিক রাশিফল পূর্বাভাস",
    horoscopeDesc: "আপনার রাশির উপর ভিত্তি করে কর্মজীবন, শিক্ষা, অর্থ ও স্বাস্থ্য সম্পর্কে সঠিক দৈনিক রাশিফল পূর্বাভাস পান।",
    exploreBtn: "টুল চালু করুন",
    comingSoon: "শীঘ্রই আসছে",
    viewAllBtn: "সব নিখরচায় সরঞ্জাম দেখুন ✦"
  }
} as const;

const toolColors = [
  "bg-[#FEF08A]", // pastel yellow
  "bg-[#E5D5FF]", // pastel purple
  "bg-[#FFD0C8]", // pastel peach
  "bg-[#C6F6D5]", // pastel green
];

interface FreeToolCardProps {
  tool: {
    title: string;
    desc: string;
    href: string;
    icon: React.ComponentType<any>;
    active: boolean;
    glowColor: string;
  };
  t: {
    comingSoon: string;
    exploreBtn: string;
  };
  index: number;
}

function FreeToolCard({ tool, t, index }: FreeToolCardProps) {
  const Icon = tool.icon;

  return (
    <CardSpotlight
      color={tool.glowColor}
      radius={300}
      useCanvas={false}
      className={cn(
        "group relative border-[3px] border-black rounded-2xl flex flex-col justify-between overflow-hidden p-8 select-none text-black shadow-[4px_4px_0px_#000] transition-all duration-200 min-h-[16rem]",
        tool.active 
          ? cn(toolColors[index % toolColors.length], "hover:shadow-[6px_6px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000] cursor-pointer") 
          : "bg-neutral-50/70 border-dashed opacity-60 cursor-not-allowed"
      )}
      style={{}}
    >
      <div className="relative flex flex-col gap-5">
        <div className="flex justify-between items-start">
          {/* Icon wrapper */}
          <div className={cn(
            "p-3 rounded-2xl border-2 border-black bg-white shadow-[2px_2px_0px_#000] w-fit",
            !tool.active && "opacity-50"
          )}>
            <Icon className="w-6 h-6 stroke-[2.5px] text-black" />
          </div>

          {/* Coming Soon status badge */}
          {!tool.active && (
            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-wider uppercase bg-white border-2 border-black shadow-[1.5px_1.5px_0px_#000] text-black">
              {t.comingSoon}
            </span>
          )}
        </div>

        {/* Title & Description */}
        <div className="space-y-2.5">
          <h3 className="font-serif text-xl font-black text-black">
            {tool.title}
          </h3>
          <p className="text-neutral-600 font-semibold text-xs leading-relaxed max-w-lg">
            {tool.desc}
          </p>
        </div>
      </div>

      {/* Launch / Explore Button */}
      <div className="mt-8 pt-5 border-t-2 border-black flex justify-end">
        {tool.active ? (
          <a href={tool.href} className="w-full sm:w-auto">
            <button className="w-full sm:w-auto text-xs font-black uppercase tracking-wider py-2.5 px-6 rounded-full border-2 border-black bg-white hover:bg-neutral-50 hover:shadow-[3px_3px_0px_#000] hover:-translate-y-[0.5px] hover:-translate-x-[0.5px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer shadow-[2px_2px_0px_#000]">
              {t.exploreBtn}
            </button>
          </a>
        ) : (
          <button disabled className="w-full sm:w-auto text-xs font-black uppercase tracking-wider py-2.5 px-6 rounded-full border-2 border-black bg-neutral-100 text-neutral-400 cursor-not-allowed opacity-60">
            {t.comingSoon}
          </button>
        )}
      </div>
    </CardSpotlight>
  );
}

export default function FreeToolsPreview({ locale = "en" }: FreeToolsPreviewProps) {
  const activeLocale = ["en", "hin", "bn"].includes(locale) ? locale : "en";
  const t = translations[activeLocale as keyof typeof translations] || translations.en;

  const tools = [
    {
      title: t.kundliTitle,
      desc: t.kundliDesc,
      href: `/${locale}/tools/kundli`,
      icon: Compass,
      active: true,
      glowColor: "rgba(220, 180, 80, 0.12)", // Champagne Gold Glow
    },
    {
      title: t.matchingTitle,
      desc: t.matchingDesc,
      href: `/${locale}/tools/matching`,
      icon: HeartHandshake,
      active: true,
      glowColor: "rgba(168, 85, 247, 0.12)", // Amethyst Purple Glow
    },
    {
      title: t.panchangTitle,
      desc: t.panchangDesc,
      href: `/${locale}/tools/panchang`,
      icon: Calendar,
      active: true,
      glowColor: "rgba(34, 197, 94, 0.08)", // Emerald Green Glow
    },
    {
      title: t.horoscopeTitle,
      desc: t.horoscopeDesc,
      href: "#",
      icon: Orbit,
      active: false,
      glowColor: "rgba(59, 130, 246, 0.08)", // Blue Glow
    },
  ];

  return (
    <section className="w-full py-16 px-6 md:px-12 lg:px-16 bg-[#FFFDF0]/30 relative overflow-hidden border-t-[3px] border-black">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-200/5 blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-4.5 py-1.5 border-2 border-black bg-[#FFC000] text-black text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-[2.5px_2.5px_0px_#000] select-none rounded-full">
            {t.eyebrow}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-black">
            {t.heading}
          </h2>
          <p className="max-w-2xl text-black font-semibold text-sm sm:text-base font-sans leading-relaxed">
            {t.subheading}
          </p>
        </div>

        {/* Tools Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {tools.map((tool, index) => (
            <FreeToolCard key={index} tool={tool} t={t} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-6">
          <a
            href={`/${locale}/tools`}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-black bg-white hover:bg-neutral-50 text-black hover:shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000] text-xs font-black font-sans transition-all cursor-pointer shadow-[3px_3px_0px_#000]"
          >
            {t.viewAllBtn}
          </a>
        </div>

      </div>
    </section>
  );
}
