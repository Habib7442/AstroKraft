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
      ? "वास्तु उत्पाद और उपचार"
      : locale === "bn"
      ? "বাস্তু পণ্য ও প্রতিকার"
      : "Auspicious Vastu Products & Remedies";

  const description =
    locale === "hin"
      ? "ऊर्जा प्रवाह को अनुकूलित करने और सद्भाव व समृद्धि लाने के लिए प्रामाणिक वास्तु यंत्र, ऊर्जा-वर्धक पेंटिंग, क्रिस्टल पिरामिड और विंड चाइम देखें।"
      : locale === "bn"
      ? "শক্তি প্রবাহ অপ্টিমাইজ করতে এবং সম্প্রীতি ও সমৃদ্ধি আনতে খাঁটি বাস্তু যন্ত্র, শক্তি-বর্ধক পেইন্টিং, ক্রিস্টাল পিরামিড এবং উইন্ড চাইম দেখুন।"
      : "Explore authentic Vastu yantras, energy-boosting paintings, crystal pyramids, and wind chimes to optimize energy flow and bring harmony and abundance.";

  return constructMetadata({
    title,
    description,
    path: "/vastu-products",
    locale,
  });
}

export default async function VastuProductsPage({ 
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
    console.error("Failed to fetch products from Sanity for vastu-products page:", error);
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
          productType="vastu-products"
        />
      </main>

      {/* Structured Footer Section */}
      <Footer locale={locale} dict={dict} />
    </div>
  );
}
