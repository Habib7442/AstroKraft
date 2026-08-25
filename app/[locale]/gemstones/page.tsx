import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { isValidLocale, constructMetadata } from "@/lib/seo";
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
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const dict = await getDictionary(locale);

  return constructMetadata({
    title: dict.nav.gemstones,
    description: "Explore lab-certified natural gemstones recommended for your birth chart. Find the perfect stone for luck, career, relationships, and health.",
    path: "/gemstones",
    locale,
  });
}

export default async function GemstonesPage({ 
  params 
}: { 
  params: Promise<PageParams>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);

  // Fetch products dynamically from Sanity CMS with revalidation enabled
  let products = [];
  try {
    products = await client.fetch(productsQuery, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error("Failed to fetch products from Sanity for gemstones page:", error);
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
          productType="gemstone"
        />
      </main>

      {/* Structured Footer Section */}
      <Footer locale={locale} dict={dict} />
    </div>
  );
}
