import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { isValidLocale, LOCALES } from "@/lib/seo";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { BookOpen } from "lucide-react";

interface PageParams {
  locale: string;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

const localizedContent = {
  en: {
    eyebrow: "Coming Soon",
    title: "AstroKraft™ Blog",
    subtitle: "Vedic wisdom, astrological insights, and certified gemstone guides are currently aligning. We are preparing to launch our official content hub very soon.",
    backHome: "Back to Home",
  },
  hin: {
    eyebrow: "शीघ्र आ रहा है",
    title: "एस्ट्रोक्राफ्ट™ ब्लॉग",
    subtitle: "वैदिक ज्ञान, ज्योतिषीय अंतर्दृष्टि और प्रमाणित रत्न मार्गदर्शिकाएँ संरेखित हो रही हैं। हम बहुत जल्द अपना आधिकारिक ब्लॉग शुरू करने की तैयारी कर रहे हैं।",
    backHome: "मुख्य पृष्ठ पर जाएं",
  },
  bn: {
    eyebrow: "শীঘ্রই আসছে",
    title: "অ্যাস্ট্রোক্রাফট™ ব্লগ",
    subtitle: "বৈদিক প্রজ্ঞা, জ্যোতিষশাস্ত্রীয় অন্তর্দৃষ্টি এবং প্রত্যয়িত রত্ন পাথরের নির্দেশিকা প্রস্তুত হচ্ছে। আমরা খুব শীঘ্রই আমাদের অফিসিয়াল ব্লগ চালু করার প্রস্তুতি নিচ্ছি।",
    backHome: "মূল পাতায় যান",
  }
} as const;

export default async function BlogPage({ params }: { params: Promise<PageParams> }) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const content = localizedContent[locale as keyof typeof localizedContent] || localizedContent.en;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navbar Header */}
      <Header locale={locale} dict={dict} />

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-12 pt-32 pb-16">
        <div className="max-w-xl w-full bg-white border-[3px] border-black rounded-2xl p-8 sm:p-10 shadow-[6px_6px_0px_#000] flex flex-col items-center text-center select-none">
          
          {/* Eyebrow badge */}
          <span className="px-3.5 py-1.5 bg-[#FEF08A] text-black border-2 border-black rounded-full shadow-[2.5px_2.5px_0px_#000] font-black uppercase text-[10px] sm:text-xs mb-6">
            ✦ {content.eyebrow} ✦
          </span>

          {/* Book Icon Container */}
          <div className="w-20 h-20 mb-6 flex items-center justify-center bg-[#E5D5FF] border-2 border-black rounded-2xl shadow-[3px_3px_0px_#000] animate-bounce duration-[1500ms]">
            <BookOpen className="w-10 h-10 text-black stroke-[2px]" />
          </div>

          {/* Title & Description */}
          <h1 className="text-2xl sm:text-3xl font-black text-black mb-4 uppercase tracking-tight leading-tight">
            {content.title}
          </h1>
          
          <p className="text-sm text-neutral-600 font-bold mb-8 leading-relaxed max-w-md">
            {content.subtitle}
          </p>

          {/* Back Home CTA Button */}
          <a
            href={`/${locale}`}
            className="px-6 py-3 bg-[#FFC000] text-black font-black border-2 border-black rounded-xl shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_#000] transition-all cursor-pointer text-sm uppercase tracking-wider"
          >
            {content.backHome}
          </a>
        </div>
      </main>

      {/* Footer */}
      <Footer locale={locale} dict={dict} />
    </div>
  );
}
