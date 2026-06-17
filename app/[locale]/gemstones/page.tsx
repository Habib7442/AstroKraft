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

interface SearchParams {
  category?: string;
}

export async function generateMetadata({ 
  params,
  searchParams
}: { 
  params: Promise<PageParams>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const { category } = await searchParams;
  const dict = await getDictionary(locale);
  const isRudraksha = category === "rudraksha";

  const title = isRudraksha
    ? (locale === "hin" ? "प्राकृतिक रुद्राक्ष | AstroKraft" : locale === "bn" ? "প্রাকৃতিক রুদ্রাক্ষ | AstroKraft" : "Sacred Rudraksha | AstroKraft")
    : `${dict.nav.gemstones} | AstroKraft`;

  const description = isRudraksha
    ? "Explore lab-certified natural Rudraksha beads from Nepal & Indonesia. Find the perfect bead for health, protection, and spiritual alignment."
    : "Explore lab-certified natural gemstones recommended for your birth chart. Find the perfect stone for luck, career, relationships, and health.";

  return {
    title,
    description,
  };
}

export default async function GemstonesPage({ 
  params,
  searchParams
}: { 
  params: Promise<PageParams>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  const { category } = await searchParams;

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

  const productType = category === "rudraksha" ? "rudraksha" : "gemstone";

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
          productType={productType}
        />
      </main>

      {/* Structured Footer Section */}
      <Footer locale={locale} dict={dict} />
    </div>
  );
}
