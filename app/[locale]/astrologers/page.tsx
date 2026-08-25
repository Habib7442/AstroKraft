import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { isValidLocale, constructMetadata } from "@/lib/seo";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import BentoGridDemo from "@/components/bento-grid-demo";

interface PageParams {
  locale: string;
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const dict = await getDictionary(locale);

  const description =
    locale === "hin"
      ? "सटीक कुंडली मिलान, रत्न चयन और प्राचीन वैदिक उपायों के लिए भारत के शीर्ष ज्योतिषियों और वास्तु विशेषज्ञों से परामर्श करें।"
      : locale === "bn"
      ? "সঠিক কুন্ডলী মিলন, রত্ন নির্বাচন এবং প্রাচীন বৈদিক প্রতিকারের জন্য ভারতের শীর্ষ জ্যোতিষী ও বাস্তু বিশেষজ্ঞদের সাথে পরামর্শ করুন।"
      : "Consult India's top astrologers and Vastu experts for accurate horoscope compatibility, gemstone selections, and ancient Vedic remedies.";

  return constructMetadata({
    title: dict.nav.astrologers,
    description,
    path: "/astrologers",
    locale,
  });
}

export default async function AstrologersPage({ params }: { params: Promise<PageParams> }) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation Header */}
      <Header locale={locale} dict={dict} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Bento Grid showcasing Astrologers */}
        <BentoGridDemo locale={locale} />
      </main>

      {/* Structured Footer Section */}
      <Footer locale={locale} dict={dict} />
    </div>
  );
}
