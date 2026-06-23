import { notFound, redirect } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { isValidLocale } from "@/lib/seo";
import { Header } from "@/components/sections/header";
import { HeroEcommerce } from "@/components/sections/hero-ecommerce";

import { ServicesRow } from "@/components/sections/services-row";
import { Footer } from "@/components/sections/footer";
import { AstrologersRow } from "@/components/sections/astrologers-row";
import GemstoneGrid from "@/components/sections/gemstone-grid";
import FreeToolsPreview from "@/components/sections/FreeToolsPreview";
import { getConsultations, getProducts, getCategories, getBanners, getAstrologers } from "@/lib/actions/sanity";
import { cookies } from "next/headers";
import { createServerClient } from "@insforge/sdk/ssr";
import { CMSStoreInitializer } from "@/components/providers/cms-store-initializer";

interface PageParams {
  locale: string;
}

export default async function Page({ params }: { params: Promise<PageParams> }) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  // Check if logged-in user has admin privilege, if so auto-redirect to admin dashboard
  const cookieStore = await cookies();
  const insforge = createServerClient({
    cookies: cookieStore,
    baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL || "",
    anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || ""
  });

  let user = null;
  try {
    const { data } = await insforge.auth.getCurrentUser();
    user = data?.user || null;
  } catch (e) {
    console.error("Auth check error on homepage:", e);
  }

  // Fetch user profile from database to check their role dynamically
  let role = "user";
  try {
    if (user) {
      const { data: profile } = await insforge.database
        .from("users")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();
      if (profile?.role) {
        role = profile.role;
      }
    }
  } catch (e) {
    console.error("Database user role fetch error on homepage:", e);
  }

  const adminEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  const isAdmin = user && (
    role === "admin" ||
    adminEmails.includes(user.email.toLowerCase())
  );

  if (isAdmin) {
    redirect("/admin");
  }

  const dict = await getDictionary(locale);

  // Fetch consultations, products, categories, and banners dynamically from Sanity CMS with revalidation enabled
  let consultations = [];
  let products = [];
  let categories = [];
  let banners = [];
  let astrologers = [];
  try {
    const [fetchedConsultations, fetchedProducts, fetchedCategories, fetchedBanners, fetchedAstrologers] = await Promise.all([
      getConsultations(),
      getProducts(),
      getCategories(),
      getBanners(),
      getAstrologers()
    ]);
    consultations = fetchedConsultations;
    products = fetchedProducts;
    categories = fetchedCategories;
    banners = fetchedBanners;
    astrologers = fetchedAstrologers;
  } catch (error) {
    console.error("Failed to fetch dynamic data from Sanity:", error);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden pb-16 lg:pb-0">
      {/* Initialize Zustand client store with server-fetched data */}
      <CMSStoreInitializer 
        banners={banners} 
        categories={categories} 
        products={products} 
        consultations={consultations} 
      />

      {/* Navigation Header */}
      <Header locale={locale} dict={dict} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Search, Banners, and Consultations */}
        <HeroEcommerce locale={locale} />



        {/* Featured Gemstones Section */}
        <GemstoneGrid locale={locale} initialProducts={products} productType="gemstone" />

        <div className="max-w-7xl mx-auto h-px w-full bg-gradient-to-r from-transparent via-border/50 to-transparent" />

        {/* Featured Rudraksha Section */}
        <GemstoneGrid locale={locale} initialProducts={products} productType="rudraksha" />

        <div className="max-w-7xl mx-auto h-px w-full bg-gradient-to-r from-transparent via-border/50 to-transparent" />

        {/* Premium Standalone Services Row Section */}
        <ServicesRow locale={locale} dict={dict} />

        <div className="max-w-7xl mx-auto h-px w-full bg-gradient-to-r from-transparent via-border/50 to-transparent" />

        {/* Crystal Bracelets Section */}
        <GemstoneGrid locale={locale} initialProducts={products} productType="crystal-bracelets" />

        <div className="max-w-7xl mx-auto h-px w-full bg-gradient-to-r from-transparent via-border/50 to-transparent" />

        {/* Vastu Products Section */}
        <GemstoneGrid locale={locale} initialProducts={products} productType="vastu-products" />

        <div className="max-w-7xl mx-auto h-px w-full bg-gradient-to-r from-transparent via-border/50 to-transparent" />

        {/* Astrologers Horizontal Scroll Row Section */}
        <AstrologersRow locale={locale} astrologers={astrologers} />

        <div className="max-w-7xl mx-auto h-px w-full bg-gradient-to-r from-transparent via-border/50 to-transparent" />

        {/* Free Interactive Tools Section */}
        <FreeToolsPreview locale={locale} />
      </main>

      {/* Structured Footer Section */}
      <Footer locale={locale} dict={dict} />
    </div>
  );
}
