import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { isValidLocale, constructMetadata, SITE } from "@/lib/seo";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { ShieldCheck, Gem, Clock, HeartHandshake } from "lucide-react";

interface PageParams {
  locale: string;
}

const content = {
  en: {
    eyebrow: "Our Story",
    title: "India's Trusted Astrology & Gemstone Marketplace",
    intro:
      "AstroKraft began in Silchar, in the heart of the Barak Valley, with a simple belief — that Vedic wisdom deserves a home that is as trustworthy and beautiful as the guidance it offers. What started as a small, regional practice connecting families with verified astrologers and certified gemstones has grown into a platform built for all of India, without losing the personal trust that built it in the first place.",
    body:
      "Every astrologer on AstroKraft is verified before they ever speak with a client. Every gemstone we sell is lab-certified before it reaches your door. We built our free tools — Kundli, Kundli Matching, Panchang — so that anyone, anywhere, can get a first honest answer before they ever have to pay for one. That is the trade we believe in: generosity first, trust always.",
    pillarsTitle: "What We Stand For",
    pillars: [
      { icon: "shield", title: "Verified Astrologers", desc: "100% trusted and experienced experts, checked before they're listed." },
      { icon: "gem", title: "Certified Gemstones", desc: "Authentic & lab-tested gemstones, never sold without a certificate." },
      { icon: "clock", title: "Easy Consultation", desc: "Quick, transparent booking — no hidden charges, no surprises." },
      { icon: "heart", title: "24/7 Support", desc: "Always available whenever you need guidance, day or night." },
    ],
    ctaTitle: "Get in Touch",
    ctaBody: "Have a question before you book? Reach out any time.",
    ctaButton: "Contact Us",
  },
  hin: {
    eyebrow: "हमारी कहानी",
    title: "भारत का भरोसेमंद ज्योतिष और रत्न मार्केटप्लेस",
    intro:
      "AstroKraft की शुरुआत सिलचर, बराक घाटी के केंद्र से हुई — इस विश्वास के साथ कि वैदिक ज्ञान को उतना ही भरोसेमंद और सुंदर घर मिलना चाहिए जितना वह मार्गदर्शन खुद है। एक छोटे क्षेत्रीय अभ्यास से शुरू होकर, जो परिवारों को सत्यापित ज्योतिषियों और प्रमाणित रत्नों से जोड़ता था, अब यह पूरे भारत के लिए एक मंच बन चुका है — बिना उस व्यक्तिगत भरोसे को खोए जिसने इसे शुरू में बनाया था।",
    body:
      "AstroKraft पर हर ज्योतिषी को ग्राहकों से बात करने से पहले सत्यापित किया जाता है। हम जो भी रत्न बेचते हैं वह आपके पास पहुंचने से पहले लैब-प्रमाणित होता है। हमने अपने निःशुल्क उपकरण — कुंडली, कुंडली मिलान, पंचांग — इसलिए बनाए ताकि कोई भी, कहीं भी, भुगतान करने से पहले एक ईमानदार पहला उत्तर पा सके।",
    pillarsTitle: "हमारे मूल्य",
    pillars: [
      { icon: "shield", title: "सत्यापित ज्योतिषी", desc: "100% विश्वसनीय और अनुभवी विशेषज्ञ, सूचीबद्ध होने से पहले जांचे गए।" },
      { icon: "gem", title: "प्रमाणित रत्न", desc: "प्रामाणिक और लैब-टेस्टेड रत्न, बिना प्रमाणपत्र के कभी नहीं बेचे जाते।" },
      { icon: "clock", title: "आसान परामर्श", desc: "त्वरित, पारदर्शी बुकिंग — कोई छिपा शुल्क नहीं।" },
      { icon: "heart", title: "24/7 सहायता", desc: "जब भी आपको मार्गदर्शन चाहिए, हम हमेशा उपलब्ध हैं।" },
    ],
    ctaTitle: "संपर्क करें",
    ctaBody: "बुक करने से पहले कोई सवाल है? कभी भी संपर्क करें।",
    ctaButton: "संपर्क करें",
  },
  bn: {
    eyebrow: "আমাদের গল্প",
    title: "ভারতের বিশ্বস্ত জ্যোতিষ ও রত্ন মার্কেটপ্লেস",
    intro:
      "AstroKraft-এর যাত্রা শুরু হয়েছিল শিলচরে, বরাক উপত্যকার হৃদয়ে — এই বিশ্বাস নিয়ে যে বৈদিক জ্ঞানের এমন একটি ঘর প্রাপ্য যা তার দেওয়া দিকনির্দেশনার মতোই বিশ্বস্ত ও সুন্দর। একটি ছোট আঞ্চলিক পরিষেবা হিসেবে শুরু হয়ে, যা পরিবারগুলিকে যাচাইকৃত জ্যোতিষী ও প্রত্যয়িত রত্নের সাথে সংযুক্ত করত, আজ তা সমগ্র ভারতের জন্য একটি প্ল্যাটফর্মে পরিণত হয়েছে।",
    body:
      "AstroKraft-এ প্রতিটি জ্যোতিষী গ্রাহকের সাথে কথা বলার আগে যাচাই করা হয়। আমরা যে রত্ন বিক্রি করি তা আপনার কাছে পৌঁছানোর আগে ল্যাব-প্রত্যয়িত হয়। আমরা আমাদের বিনামূল্যের সরঞ্জাম — কোষ্ঠী, কোষ্ঠী মিলন, পঞ্জিকা — তৈরি করেছি যাতে যে কেউ, যেকোনো জায়গা থেকে, অর্থ প্রদানের আগে একটি সৎ উত্তর পেতে পারে।",
    pillarsTitle: "আমাদের মূল্যবোধ",
    pillars: [
      { icon: "shield", title: "যাচাইকৃত জ্যোতিষী", desc: "100% বিশ্বস্ত ও অভিজ্ঞ বিশেষজ্ঞ, তালিকাভুক্ত হওয়ার আগে যাচাই করা।" },
      { icon: "gem", title: "প্রত্যয়িত রত্ন", desc: "খাঁটি ও ল্যাব-টেস্টেড রত্ন, সার্টিফিকেট ছাড়া কখনো বিক্রি হয় না।" },
      { icon: "clock", title: "সহজ পরামর্শ", desc: "দ্রুত, স্বচ্ছ বুকিং — কোনো লুকানো চার্জ নেই।" },
      { icon: "heart", title: "24/7 সহায়তা", desc: "যখনই আপনার দিকনির্দেশনা প্রয়োজন, আমরা সর্বদা উপলব্ধ।" },
    ],
    ctaTitle: "যোগাযোগ করুন",
    ctaBody: "বুক করার আগে কোনো প্রশ্ন আছে? যেকোনো সময় যোগাযোগ করুন।",
    ctaButton: "যোগাযোগ করুন",
  },
} as const;

const ICONS = { shield: ShieldCheck, gem: Gem, clock: Clock, heart: HeartHandshake };

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const t = content[locale as keyof typeof content] || content.en;

  return constructMetadata({
    title: t.title,
    description: t.intro.slice(0, 155),
    path: "/about",
    locale,
  });
}

export default async function AboutPage({ params }: { params: Promise<PageParams> }) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const t = content[locale as keyof typeof content] || content.en;

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF0] text-black overflow-x-hidden">
      <Header locale={locale} dict={dict} />

      <main className="flex-1 py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[#b28b3a] mb-3">{t.eyebrow}</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-black tracking-tight text-black mb-6">
            {t.title}
          </h1>
          <p className="text-base text-neutral-700 font-medium leading-relaxed mb-5">{t.intro}</p>
          <p className="text-base text-neutral-700 font-medium leading-relaxed">{t.body}</p>

          <div className="h-px bg-zinc-200 my-12" />

          <h2 className="font-serif text-2xl font-bold text-black mb-8">{t.pillarsTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {t.pillars.map((pillar) => {
              const Icon = ICONS[pillar.icon as keyof typeof ICONS];
              return (
                <div key={pillar.title} className="bg-white border border-zinc-150 rounded-2xl p-5 shadow-sm flex flex-col gap-2">
                  <Icon className="w-5 h-5 text-[#E2C27A]" />
                  <h3 className="font-bold text-sm text-black">{pillar.title}</h3>
                  <p className="text-xs text-neutral-600 font-medium leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-14 bg-[#FFF9E6]/60 border border-[#E2C27A]/30 rounded-2xl p-8 text-center">
            <h3 className="font-serif text-xl font-bold text-black mb-2">{t.ctaTitle}</h3>
            <p className="text-sm text-neutral-600 font-medium mb-5">{t.ctaBody}</p>
            <a
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center bg-[#E2C27A] hover:bg-[#d4b36a] text-black font-bold py-3 px-6 rounded-full shadow-sm text-sm transition-all hover:-translate-y-0.5"
            >
              {t.ctaButton}
            </a>
          </div>
        </div>
      </main>

      <Footer locale={locale} dict={dict} />
    </div>
  );
}
