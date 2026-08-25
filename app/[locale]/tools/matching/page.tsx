import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { isValidLocale, PAGE_META } from "@/lib/seo";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { MatchingContainer } from "@/components/sections/MatchingContainer";

interface PageParams {
  locale: string;
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = isValidLocale(locale) ? locale : "en";
  return PAGE_META.matching(activeLocale);
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
        <MatchingContainer locale={locale} />
      </main>

      {/* Footer */}
      <Footer locale={locale} dict={dict} />
    </div>
  );
}
