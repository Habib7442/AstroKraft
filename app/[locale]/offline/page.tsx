import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { isValidLocale, LOCALES, constructMetadata } from "@/lib/seo";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { OfflineControls } from "./offline-controls";

interface PageParams {
  locale: string;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const title =
    locale === "hin" ? "आप ऑफ़लाइन हैं" : locale === "bn" ? "আপনি অফলাইনে আছেন" : "You're Offline";

  return constructMetadata({
    title,
    path: "/offline",
    locale,
    noIndex: true,
  });
}

export default async function OfflinePage({ params }: { params: Promise<PageParams> }) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const offlineDict = dict.offline || {
    title: "You are Offline",
    subtitle: "AstroKraft™ needs an active connection to query the stars, but your connection went dark.",
    description: "Please check your network settings and try again. Some of your previously loaded content may still be available.",
    retry: "Retry Connection",
    back_home: "Back to Home"
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Dynamic Header */}
      <Header locale={locale} dict={dict} />

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-12 my-8">
        <div className="max-w-md w-full bg-white border-[3px] border-black rounded-2xl p-8 shadow-[6px_6px_0px_#000] flex flex-col items-center text-center">
          
          {/* Celestial Offline Illustration */}
          <div className="w-24 h-24 mb-6 relative flex items-center justify-center bg-[#FFF9E6] border-2 border-black rounded-full shadow-[3px_3px_0px_#000]">
            <svg className="w-12 h-12 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2m-4-3h9m-9 3h9m-9 3h3m-3 3h3" />
            </svg>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FFC000] border-2 border-black rounded-full flex items-center justify-center font-bold text-[10px] animate-pulse">
              !
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-black mb-3 leading-tight tracking-tight uppercase">
            {offlineDict.title}
          </h1>
          
          <p className="text-neutral-700 font-extrabold text-sm mb-4 leading-relaxed">
            {offlineDict.subtitle}
          </p>
          
          <p className="text-neutral-500 font-semibold text-[11px] md:text-xs mb-8 leading-relaxed">
            {offlineDict.description}
          </p>

          <OfflineControls
            retryText={offlineDict.retry}
            backHomeText={offlineDict.back_home}
            locale={locale}
          />
        </div>
      </main>

      {/* Dynamic Footer */}
      <Footer locale={locale} dict={dict} />
    </div>
  );
}
