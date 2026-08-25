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

  return constructMetadata({
    title: "Book a Consultation",
    description: "Book a personal astrology consultation with AstroKraft's verified Vedic astrologers via WhatsApp. Career, marriage, finance, health, kundli & education guidance.",
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
