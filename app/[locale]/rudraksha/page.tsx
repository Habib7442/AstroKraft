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
      ? "पवित्र प्राकृतिक रुद्राक्ष | AstroKraft" 
      : locale === "bn" 
      ? "পবিত্র প্রাকৃতিক রুদ্রাক্ষ | AstroKraft" 
      : "Sacred Natural Rudraksha | AstroKraft";

  const description = 
    "Explore authentic, laboratory-tested Rudraksha beads from Nepal & Indonesia. Find the perfect bead for health, protection, and spiritual alignment.";

  return {
    title,
    description,
  };
}

export default async function RudrakshaPage({ 
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
    console.error("Failed to fetch products from Sanity for rudraksha page:", error);
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
          productType="rudraksha"
        />
      </main>

      {/* Structured Footer Section */}
      <Footer locale={locale} dict={dict} />
    </div>
  );
}
