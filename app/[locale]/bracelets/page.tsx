import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { isValidLocale } from "@/lib/seo";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import GemstoneGrid from "@/components/sections/gemstone-grid";
import { client } from "@/sanity/lib/client";
import { productsQuery } from "@/sanity/lib/queries";

interface PageParams {
  locale: string;
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<PageParams>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const title = 
    locale === "hin" 
      ? "हीलिंग क्रिस्टल ब्रेसलेट्स | AstroKraft" 
      : locale === "bn" 
      ? "হিলিং ক্রিস্টাল ব্রেসলেট | AstroKraft" 
      : "Healing Crystal Bracelets | AstroKraft";

  const description = 
    "Explore natural, laboratory-tested crystal bracelets recommended for energy alignment, aura protection, luck, and abundance.";

  return {
    title,
    description,
  };
}

export default async function BraceletsPage({ 
  params 
}: { 
  params: Promise<PageParams>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);

  // Fetch products dynamically from Sanity CMS
  let products = [];
  try {
    products = await client.fetch(productsQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error("Failed to fetch products from Sanity for bracelets page:", error);
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0B1026] text-white overflow-x-hidden">
      {/* Navigation Header */}
      <Header locale={locale} dict={dict} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Reusable, optimized Gemstone Catalog Grid */}
        <GemstoneGrid 
          locale={locale} 
          initialProducts={products} 
          isCarousel={false} 
          productType="crystal-bracelets"
        />
      </main>

      {/* Structured Footer Section */}
      <Footer locale={locale} dict={dict} />
    </div>
  );
}
