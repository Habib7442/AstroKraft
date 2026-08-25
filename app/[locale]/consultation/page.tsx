import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { isValidLocale, constructMetadata } from "@/lib/seo";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Suspense } from "react";
import { ConsultationForm } from "@/components/sections/ConsultationForm";

interface PageParams {
  locale: string;
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const title =
    locale === "hin" ? "परामर्श बुक करें" : locale === "bn" ? "পরামর্শ বুক করুন" : "Book a Consultation";

  const description =
    locale === "hin"
      ? "व्हाट्सएप के माध्यम से AstroKraft के सत्यापित वैदिक ज्योतिषियों के साथ व्यक्तिगत ज्योतिष परामर्श बुक करें। करियर, विवाह, वित्त, स्वास्थ्य, कुंडली और शिक्षा मार्गदर्शन।"
      : locale === "bn"
      ? "হোয়াটসঅ্যাপের মাধ্যমে AstroKraft-এর যাচাইকৃত বৈদিক জ্যোতিষীদের সাথে ব্যক্তিগত জ্যোতিষ পরামর্শ বুক করুন। কর্মজীবন, বিবাহ, অর্থ, স্বাস্থ্য, কুন্ডলী ও শিক্ষা দিকনির্দেশনা।"
      : "Book a personal astrology consultation with AstroKraft's verified Vedic astrologers via WhatsApp. Career, marriage, finance, health, kundli & education guidance.";

  return constructMetadata({
    title,
    description,
    path: "/consultation",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<PageParams> }) {
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
      <main className="flex-1 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <Suspense fallback={
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black" />
          </div>
        }>
          <ConsultationForm locale={locale} />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer locale={locale} dict={dict} />
    </div>
  );
}
