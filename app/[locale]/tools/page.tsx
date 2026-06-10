import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { isValidLocale } from "@/lib/seo";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Compass, HeartHandshake, Calendar, Sparkles, Orbit, Hash } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageParams {
  locale: string;
}

const translations = {
  en: {
    title: "Free Vedic Astrology Tools",
    subtitle: "Explore our suite of genuinely free, premium Vedic calculation tools engineered to guide your life path.",
    kundliTitle: "Free Kundli & Birth Chart",
    kundliDesc: "Generate your detailed Vedic birth chart, planetary placements, Lagna/Rashi signs, and Vimshottari Dasha timelines instantly.",
    matchingTitle: "Kundli Matching (Guna Milan)",
    matchingDesc: "Calculate 36-guna horoscope compatibility, evaluate Manglik Dosha matching, and get detailed emotional & behavioral verdicts.",
    panchangTitle: "Daily Panchang & Muhurat",
    panchangDesc: "Track daily auspicious timings, Tithi, Nakshatra, Yoga, Karana, and Subh Muhurat localized for your location.",
    horoscopeTitle: "Daily Horoscope Forecasts",
    horoscopeDesc: "Get accurate daily, weekly, and monthly zodiac forecasts for career, health, finance, and relationship guidance.",
    tarotTitle: "Daily Tarot Card Reading",
    tarotDesc: "Draw cards from the mystical celestial deck to gain instant intuitive answers and cosmic guidance.",
    numerologyTitle: "Numerology Calculator",
    numerologyDesc: "Discover your life path number, destiny number, and lucky celestial colors based on your name and birth date.",
    comingSoon: "Coming Soon",
    exploreBtn: "Open Tool",
  },
  hin: {
    title: "निःशुल्क वैदिक ज्योतिष उपकरण",
    subtitle: "अपने जीवन पथ को निर्देशित करने के लिए डिज़ाइन किए गए निःशुल्क, प्रीमियम वैदिक ज्योतिष उपकरणों का अन्वेषण करें।",
    kundliTitle: "निःशुल्क कुंडली और जन्म चक्र",
    kundliDesc: "अपनी विस्तृत वैदिक जन्म कुंडली, ग्रहों की स्थिति, लग्न/राशि और विंशोत्तरी दशा विवरण तुरंत प्राप्त करें।",
    matchingTitle: "गुण मिलान (कुंडली मिलान)",
    matchingDesc: "विवाह के लिए ३६-गुण अनुकूलता की गणना करें, मांगलिक दोष मिलान देखें और विस्तृत भावनात्मक विश्लेषण प्राप्त करें।",
    panchangTitle: "दैनिक पंचांग और शुभ मुहूर्त",
    panchangDesc: "अपने स्थान के लिए दैनिक शुभ समय, तिथि, नक्षत्र, योग, करण और शुभ मुहूर्त की जानकारी प्राप्त करें।",
    horoscopeTitle: "दैनिक राशिफल पूर्वानुमान",
    horoscopeDesc: "करियर, स्वास्थ्य, वित्त और रिश्तों के मार्गदर्शन के लिए सटीक दैनिक, साप्ताहिक और मासिक राशिफल प्राप्त करें।",
    tarotTitle: "दैनिक टैরো कार्ड रीडिंग",
    tarotDesc: "तत्काल सहज उत्तर और ब्रह्मांडीय मार्गदर्शन प्राप्त करने के लिए रहस्यमय आकाशीय डेक से कार्ड चुनें।",
    numerologyTitle: "अंकशास्त्र कैलकुलेटर",
    numerologyDesc: "अपने नाम और जन्म तिथि के आधार पर अपने जीवन पथ अंक, भाग्य अंक और शुभ रंग की खोज करें।",
    comingSoon: "शीघ्र आ रहा है",
    exploreBtn: "उपकरण खोलें",
  },
  bn: {
    title: "বিনামূল্যে বৈদিক জ্যোতিষ সরঞ্জাম",
    subtitle: "আপনার জীবন পথ পরিচালনার জন্য তৈরি আমাদের সম্পূর্ণ নিখরচায় ও প্রিমিয়াম বৈদিক গণনা সরঞ্জামগুলি অন্বেষণ করুন।",
    kundliTitle: "বিনামূল্যে কোষ্ঠী ও জন্ম ছক",
    kundliDesc: "আপনার বৈদিক জন্ম ছক, গ্রহের অবস্থান, লগ্ন/রাশি এবং বিংশোত্তরী দশার বিবরণ তাত্ক্ষণিকভাবে তৈরি করুন।",
    matchingTitle: "কোষ্ঠী মেলাও ও গুণ মিলন",
    matchingDesc: "কোষ্ঠী মিলিয়ে ৩৬-গুণের সামঞ্জস্যের হিসাব করুন, মাঙ্গলিক দোষের মিল পরীক্ষা করুন এবং আবেগগত রায় পান।",
    panchangTitle: "দৈনিক পঞ্জিকা ও শুভ মুহূর্ত",
    panchangDesc: "দৈনিক শুভ সময়, তিথি, নক্ষত্র, যোগ, করণ এবং শুভ মুহুর্তের হদিস পান আপনার নিজস্ব শহরের জন্য।",
    horoscopeTitle: "দৈনিক রাশিফল পূর্বাবভাস",
    horoscopeDesc: "কর্মজীবন, স্বাস্থ্য, অর্থ এবং সম্পর্কের পথ দেখানোর জন্য সঠিক দৈনিক, সাপ্তাহিক এবং মাসিক রাশিফল পান।",
    tarotTitle: "দৈনিক ট্যারোট কার্ড রিডিং",
    tarotDesc: "তাত্ক্ষণিক অন্তর্দৃষ্টিপূর্ণ উত্তর এবং মহাজাগতিক দিকনির্দেশ পেতে রহস্যময় ডেক থেকে কার্ড তুলুন।",
    numerologyTitle: "সংখ্যাবিজ্ঞান ক্যালকুলেটর",
    numerologyDesc: "সংখ্যাবিজ্ঞান অনুযায়ী আপনার জীবন পথ সংখ্যা, ভাগ্য সংখ্যা এবং শুভ রঙ আবিষ্কার করুন।",
    comingSoon: "শীঘ্রই আসছে",
    exploreBtn: "সরঞ্জাম খুলুন",
  }
} as const;

const toolColors = [
  "bg-[#FEF08A]", // pastel yellow
  "bg-[#E5D5FF]", // pastel purple
  "bg-[#FFD0C8]", // pastel peach
  "bg-[#C6F6D5]", // pastel green
  "bg-[#E0F2FE]", // pastel blue
  "bg-[#FCE7F3]", // pastel pink
];

export default async function Page({ params }: { params: Promise<PageParams> }) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const t = translations[locale as keyof typeof translations] || translations.en;

  const tools = [
    {
      title: t.kundliTitle,
      desc: t.kundliDesc,
      href: `/${locale}/tools/kundli`,
      icon: Compass,
      active: true,
      iconColor: "text-black",
    },
    {
      title: t.matchingTitle,
      desc: t.matchingDesc,
      href: `/${locale}/tools/matching`,
      icon: HeartHandshake,
      active: true,
      iconColor: "text-black",
    },
    {
      title: t.panchangTitle,
      desc: t.panchangDesc,
      href: `/${locale}/tools/panchang`,
      icon: Calendar,
      active: true,
      iconColor: "text-black",
    },
    {
      title: t.horoscopeTitle,
      desc: t.horoscopeDesc,
      href: "#",
      icon: Orbit,
      active: false,
      iconColor: "text-neutral-400",
    },
    {
      title: t.tarotTitle,
      desc: t.tarotDesc,
      href: "#",
      icon: Sparkles,
      active: false,
      iconColor: "text-neutral-400",
    },
    {
      title: t.numerologyTitle,
      desc: t.numerologyDesc,
      href: "#",
      icon: Hash,
      active: false,
      iconColor: "text-neutral-400",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-base stars-bg text-ink-body overflow-x-hidden">
      {/* Navigation Header */}
      <Header locale={locale} dict={dict} />

      {/* Main Content Area */}
      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header Title */}
          <div className="text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 px-4.5 py-1.5 border border-card-border bg-gold-soft/10 text-gold text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm select-none rounded-full">
              ✦ 100% Free Celestial Calculations
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif text-ink font-bold tracking-tight mt-1">
              {t.title}
            </h1>
            <p className="text-sm sm:text-base text-ink-body font-semibold max-w-2xl mx-auto leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, idx) => {
              const Icon = tool.icon;
              const toolCornerColors = [
                "#FEF08A", // yellow
                "#E5D5FF", // purple
                "#FFD0C8", // peach
                "#C6F6D5", // green
                "#E0F2FE", // blue
                "#FCE7F3", // pink
              ];
              const cornerColor = toolCornerColors[idx % toolCornerColors.length];

              return (
                <div
                  key={idx}
                  className={cn(
                    "group relative border border-card-border rounded-2xl flex flex-col justify-between overflow-hidden p-6 select-none text-ink-body shadow-card hover:shadow-cardHover transition-all duration-300 min-h-[18rem] backdrop-blur-md hover:-translate-y-1",
                    tool.active 
                      ? "cursor-pointer" 
                      : "opacity-60 cursor-not-allowed text-ink-muted"
                  )}
                  style={{
                    background: tool.active
                      ? `radial-gradient(circle at top right, ${cornerColor} 0%, rgba(255, 255, 255, 0.85) 55%, rgba(255, 255, 255, 0.95) 100%)`
                      : `radial-gradient(circle at top right, ${cornerColor} 0%, rgba(255, 255, 255, 0.90) 45%, rgba(255, 255, 255, 0.95) 100%)`
                  }}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      {/* Icon wrapper */}
                      <div className={cn(
                        "p-3 rounded-2xl border border-card-border bg-white shadow-sm w-fit",
                        !tool.active && "opacity-50"
                      )}>
                        <Icon className={cn("w-6 h-6 stroke-[2px]", tool.active ? "text-gold" : "text-ink-muted")} />
                      </div>

                      {/* Badge if coming soon */}
                      {!tool.active && (
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-white border border-card-border shadow-sm text-ink-muted">
                          {t.comingSoon}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-serif font-bold text-ink group-hover:text-gold transition-colors">
                      {tool.title}
                    </h3>
                  </div>

                  <div className="flex flex-col justify-between mt-4 gap-6">
                    <p className="text-ink-muted font-semibold text-xs leading-relaxed">
                      {tool.desc}
                    </p>

                    {tool.active ? (
                      <a href={tool.href} className="w-full">
                        <button className="w-full text-xs font-bold uppercase tracking-wider py-2.5 rounded-full border border-gold-deep bg-transparent hover:bg-gold/8 text-gold transition-all duration-250 cursor-pointer shadow-sm">
                          {t.exploreBtn}
                        </button>
                      </a>
                    ) : (
                      <button disabled className="w-full text-xs font-bold uppercase tracking-wider py-2.5 rounded-full border border-card-border bg-transparent text-ink-muted/50 cursor-not-allowed opacity-50">
                        {t.comingSoon}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer locale={locale} dict={dict} />
    </div>
  );
}
