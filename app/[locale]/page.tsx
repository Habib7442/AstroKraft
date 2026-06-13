import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { isValidLocale } from "@/lib/seo";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { ServicesRow } from "@/components/sections/services-row";
import { WhyChoose } from "@/components/sections/why-choose";
import { Footer } from "@/components/sections/footer";
import BentoGridDemo from "@/components/bento-grid-demo";
import GemstoneGrid from "@/components/sections/gemstone-grid";
import FreeToolsPreview from "@/components/sections/FreeToolsPreview";

interface PageParams {
  locale: string;
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
      <main className="flex-1">
        {/* Observatory Hero Spotlight Section */}
        <Hero locale={locale} dict={dict} />

        <div className="max-w-7xl mx-auto h-px w-full bg-gradient-to-r from-transparent via-border/50 to-transparent" />

        {/* Premium Standalone Services Row Section */}
        <ServicesRow locale={locale} dict={dict} />

        <div className="max-w-7xl mx-auto h-px w-full bg-gradient-to-r from-transparent via-border/50 to-transparent" />

        {/* Trust Metrics Section */}
        <WhyChoose locale={locale} />

        <div className="max-w-7xl mx-auto h-px w-full bg-gradient-to-r from-transparent via-border/50 to-transparent" />

        {/* Featured Gemstones Section */}
        <GemstoneGrid locale={locale} limit={3} />

        <div className="max-w-7xl mx-auto h-px w-full bg-gradient-to-r from-transparent via-border/50 to-transparent" />

        {/* Bento Grid showcasing Astrologers */}
        <BentoGridDemo locale={locale} />

        <div className="max-w-7xl mx-auto h-px w-full bg-gradient-to-r from-transparent via-border/50 to-transparent" />

        {/* Free Interactive Tools Section */}
        <FreeToolsPreview locale={locale} />
      </main>

      {/* Structured Footer Section */}
      <Footer locale={locale} dict={dict} />
    </div>
  );
}
