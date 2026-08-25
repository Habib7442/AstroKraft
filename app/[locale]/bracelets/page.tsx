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

  const title =
    locale === "hin"
      ? "हीलिंग क्रिस्टल ब्रेसलेट्स"
      : locale === "bn"
      ? "হিলিং ক্রিস্টাল ব্রেসলেট"
      : "Healing Crystal Bracelets";

  const description =
    locale === "hin"
      ? "ऊर्जा संतुलन, आभा सुरक्षा, भाग्य और समृद्धि के लिए अनुशंसित प्राकृतिक, प्रयोगशाला-परीक्षित क्रिस्टल ब्रेसलेट्स देखें।"
      : locale === "bn"
      ? "শক্তি সমন্বয়, আভা সুরক্ষা, সৌভাগ্য এবং সমৃদ্ধির জন্য প্রস্তাবিত প্রাকৃতিক, ল্যাব-পরীক্ষিত ক্রিস্টাল ব্রেসলেট দেখুন।"
      : "Explore natural, laboratory-tested crystal bracelets recommended for energy alignment, aura protection, luck, and abundance.";

  return constructMetadata({
    title,
    description,
    path: "/bracelets",
    locale,
  });
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
