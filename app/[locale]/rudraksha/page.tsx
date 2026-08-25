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
      ? "पवित्र प्राकृतिक रुद्राक्ष"
      : locale === "bn"
      ? "পবিত্র প্রাকৃতিক রুদ্রাক্ষ"
      : "Sacred Natural Rudraksha";

  const description =
    locale === "hin"
      ? "नेपाल और इंडोनेशिया से प्रामाणिक, प्रयोगशाला-परीक्षित रुद्राक्ष देखें। स्वास्थ्य, सुरक्षा और आध्यात्मिक संतुलन के लिए सही रुद्राक्ष खोजें।"
      : locale === "bn"
      ? "নেপাল ও ইন্দোনেশিয়া থেকে খাঁটি, ল্যাব-পরীক্ষিত রুদ্রাক্ষ দেখুন। স্বাস্থ্য, সুরক্ষা ও আধ্যাত্মিক ভারসাম্যের জন্য সঠিক রুদ্রাক্ষ খুঁজুন।"
      : "Explore authentic, laboratory-tested Rudraksha beads from Nepal & Indonesia. Find the perfect bead for health, protection, and spiritual alignment.";

  return constructMetadata({
    title,
    description,
    path: "/rudraksha",
    locale,
  });
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
