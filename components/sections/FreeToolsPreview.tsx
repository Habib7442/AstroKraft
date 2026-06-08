"use client";

import React, { useState } from "react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Compass, HeartHandshake, Calendar, Orbit } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
}

function FreeToolCard({ tool, t }: FreeToolCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = tool.icon;

  // Color variables for background and border gradients
  const baseBorderColor = tool.glowColor.replace("0.12", "0.22").replace("0.08", "0.12");
  const activeBorderColor = tool.glowColor.replace("0.12", "0.65").replace("0.08", "0.35");
  
  const baseBg = `radial-gradient(circle at 12% 12%, ${tool.glowColor.replace("0.12", "0.06").replace("0.08", "0.03")}, rgba(12, 10, 22, 0.95) 75%)`;
  
  const boxShadow = isHovered 
    ? `0 10px 30px -10px ${tool.glowColor.replace("0.12", "0.40").replace("0.08", "0.20")}`
    : "none";

  return (
    <CardSpotlight
      color={tool.glowColor}
      radius={300}
      useCanvas={false}
      className={cn(
        "text-foreground transition-all duration-300 rounded-2xl flex flex-col justify-between overflow-hidden shadow-2xl p-8 border backdrop-blur-md relative select-none will-change-transform [transform:translate3d(0,0,0)]",
        tool.active ? "hover:-translate-y-1 cursor-pointer" : "opacity-60 cursor-not-allowed"
      )}
      style={{
        background: baseBg,
        borderColor: isHovered ? activeBorderColor : baseBorderColor,
        boxShadow: boxShadow,
      }}
      onMouseEnter={() => tool.active && setIsHovered(true)}
      onMouseLeave={() => tool.active && setIsHovered(false)}
    >
      <div className="relative flex flex-col gap-5">
        <div className="flex justify-between items-start">
          {/* Icon frame with dynamic border color matching its theme */}
          <div 
            className={cn(
              "p-3.5 rounded-xl border shadow-inner flex items-center justify-center transition-transform duration-300 bg-neutral-950/60",
              tool.active ? "text-gold" : "text-muted-foreground",
              isHovered && "scale-110"
            )}
            style={{
              borderColor: isHovered ? activeBorderColor : baseBorderColor,
              boxShadow: isHovered ? `0 0 14px ${tool.glowColor.replace("0.12", "0.3")}` : "none"
            }}
          >
            <Icon className="w-6 h-6" />
          </div>

          {/* Coming Soon status badge */}
          {!tool.active && (
            <span className="px-3 py-1 rounded-full text-[9px] font-semibold tracking-widest uppercase bg-white/5 border border-white/10 text-muted-foreground">
              {t.comingSoon}
            </span>
          )}
        </div>

        {/* Title & Description */}
        <div className="space-y-2.5">
          <h3 className={cn(
            "font-serif text-xl font-bold tracking-wide transition-colors",
            tool.active && isHovered ? "text-gold" : "text-foreground"
          )}>
            {tool.title}
          </h3>
          <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed font-sans max-w-lg">
            {tool.desc}
          </p>
        </div>
      </div>

      {/* Launch / Explore Button */}
      <div className="mt-8 pt-5 border-t border-border/10 flex justify-end">
        {tool.active ? (
          <a href={tool.href} className="w-full sm:w-auto">
            <Button 
              variant="outline" 
              className="w-full sm:w-auto text-xs font-semibold py-2 px-6 rounded-full border-gold/40 hover:border-gold text-gold hover:text-foreground bg-neutral-900/50 hover:bg-neutral-900 transition-all shadow-lg hover:shadow-gold/10"
            >
              {t.exploreBtn}
            </Button>
          </a>
        ) : (
          <Button disabled variant="outline" className="w-full sm:w-auto text-xs font-semibold py-2 px-6 rounded-full border-border/10 bg-neutral-900/10">
            {t.comingSoon}
          </Button>
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
      href: "#",
      icon: Calendar,
      active: false,
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
    <section className="w-full py-16 px-6 md:px-12 lg:px-16 bg-background relative overflow-hidden border-t border-border/20">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 text-xs text-gold border border-white/10 font-sans tracking-wide">
            {t.eyebrow}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {t.heading}
          </h2>
          <p className="max-w-2xl text-muted-foreground text-sm sm:text-base font-sans leading-relaxed">
            {t.subheading}
          </p>
        </div>

        {/* Tools Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {tools.map((tool, index) => (
            <FreeToolCard key={index} tool={tool} t={t} />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-6">
          <a
            href={`/${locale}/tools`}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-gold/40 hover:border-gold bg-neutral-900/50 hover:bg-neutral-900 text-gold hover:text-foreground text-xs font-semibold font-sans transition-all cursor-pointer shadow-lg hover:shadow-gold/10"
          >
            {t.viewAllBtn}
          </a>
        </div>

      </div>
    </section>
  );
}
