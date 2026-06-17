import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { isValidLocale } from "@/lib/seo";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import AstrologerProfileClient from "@/components/sections/astrologer-profile-client";
import ASTROLOGERS_DATA from "@/lib/data/astrologer.json";

interface PageParams {
  locale: string;
  id: string;
}

const ASTROLOGERS = ASTROLOGERS_DATA as Record<string, any>;

// Define all supported astrologer IDs
const VALID_IDS = [
  "acharya_abhi_shastri",
  "acharya_sneha",
  "acharya_bhakta_vedanta",
  "astrologer_indrajit_dutta",
  "rishi_acharya",
  "biprangshu_bhattacharjee",
  "test_astrologer"
];

/**
 * Pre-generate all static paths for fast production load speeds
 */
export async function generateStaticParams() {
  const locales = ["en", "hin", "bn"];
  const paramsList: PageParams[] = [];

  for (const locale of locales) {
    for (const id of VALID_IDS) {
      paramsList.push({ locale, id });
    }
  }

  return paramsList;
}

/**
 * Generate localized SEO metadata for each specific astrologer
 */
export async function generateMetadata({ params }: { params: Promise<PageParams> }) {
  const { locale, id } = await params;
  
  if (!isValidLocale(locale) || !VALID_IDS.includes(id)) {
    return {};
  }

  const ast = ASTROLOGERS[id];
  const activeLocale = ["en", "hin", "bn"].includes(locale) ? locale : "en";
  const specialty = ast.specialty[activeLocale] || ast.specialty["en"];
  const desc = ast.description[activeLocale] || ast.description["en"];

  return {
    title: `${ast.name} | ${specialty} | AstroKraft`,
    description: desc.substring(0, 155) + "...",
  };
}

export default async function AstrologerProfilePage({ 
  params 
}: { 
  params: Promise<PageParams> 
}) {
  const { locale, id } = await params;

  // Validate parameters
  if (!isValidLocale(locale)) {
    notFound();
  }

  if (!VALID_IDS.includes(id)) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const astrologer = ASTROLOGERS[id];

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF0] text-black overflow-x-hidden pt-20">
      {/* Dynamic Header */}
      <Header locale={locale} dict={dict} />

      {/* Main Profile Area */}
      <main className="flex-1">
        <AstrologerProfileClient 
          astrologer={astrologer} 
          astrologerId={id}
          locale={locale} 
        />
      </main>

      {/* Dynamic Footer */}
      <Footer locale={locale} dict={dict} />
    </div>
  );
}
