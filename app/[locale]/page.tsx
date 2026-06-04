import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { LOCALES } from "@/lib/seo";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { ServicesBento } from "@/components/sections/services-bento";
import { Footer } from "@/components/sections/footer";

interface PageParams {
  locale: string;
}

export default async function Page({ params }: { params: Promise<PageParams> }) {
  const { locale } = await params;

  if (!LOCALES.includes(locale as any)) {
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

        {/* Services Bento Grid Section */}
        <ServicesBento locale={locale} dict={dict} />
      </main>

      {/* Structured Footer Section */}
      <Footer locale={locale} dict={dict} />
    </div>
  );
}

