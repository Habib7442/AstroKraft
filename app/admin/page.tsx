import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  getAdminBanners,
  getAdminCategories,
  getAdminProducts,
  getAdminConsultations,
  getAdminAstrologers
} from "@/lib/actions/sanity";
import { AdminDashboard } from "@/components/sections/admin-dashboard";

export default async function AdminPage() {
  // 1. Authenticate with Supabase session on the server
  const supabase = await createClient();

  let user = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data?.user || null;
  } catch (e) {
    console.error("Auth verify error in admin page:", e);
  }

  // 2. Fetch user profile from PostgreSQL users table to verify their role
  let role = "user";
  try {
    if (user) {
      const { data: profile } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();
      if (profile?.role) {
        role = profile.role;
      }
    }
  } catch (e) {
    console.error("Database user role fetch error in admin page:", e);
  }

  const adminEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  const isAdmin = user && (
    role === "admin" ||
    adminEmails.includes((user.email || "").toLowerCase())
  );

  if (!isAdmin) {
    redirect(`/en/sign-in?redirect=admin`);
  }

  // 3. Pre-fetch Sanity CMS contents for quick, zero-loading mount times
  let banners = [];
  let categories = [];
  let products = [];
  let consultations = [];
  let astrologers = [];

  console.log("[AdminPage] Debug info:");
  console.log("  - NEXT_PUBLIC_SANITY_PROJECT_ID:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
  console.log("  - NEXT_PUBLIC_SANITY_DATASET:", process.env.NEXT_PUBLIC_SANITY_DATASET);
  console.log("  - NEXT_PUBLIC_SANITY_API_VERSION:", process.env.NEXT_PUBLIC_SANITY_API_VERSION);
  console.log("  - Starting pre-fetch of Sanity CMS data...");

  try {
    const [
      bannersResult,
      categoriesResult,
      productsResult,
      consultationsResult,
      astrologersResult
    ] = await Promise.allSettled([
      getAdminBanners(),
      getAdminCategories(),
      getAdminProducts(),
      getAdminConsultations(),
      getAdminAstrologers(),
    ]);

    if (bannersResult.status === "fulfilled") {
      banners = bannersResult.value || [];
      console.log(`[AdminPage] Banners fetched: ${banners.length}`);
    } else {
      console.error("[AdminPage] Banners fetch failed:", bannersResult.reason);
    }

    if (categoriesResult.status === "fulfilled") {
      categories = categoriesResult.value || [];
      console.log(`[AdminPage] Categories fetched: ${categories.length}`);
    } else {
      console.error("[AdminPage] Categories fetch failed:", categoriesResult.reason);
    }

    if (productsResult.status === "fulfilled") {
      products = productsResult.value || [];
      console.log(`[AdminPage] Products fetched: ${products.length}`);
    } else {
      console.error("[AdminPage] Products fetch failed:", productsResult.reason);
    }

    if (consultationsResult.status === "fulfilled") {
      consultations = consultationsResult.value || [];
      console.log(`[AdminPage] Consultations fetched: ${consultations.length}`);
    } else {
      console.error("[AdminPage] Consultations fetch failed:", consultationsResult.reason);
    }

    if (astrologersResult.status === "fulfilled") {
      astrologers = astrologersResult.value || [];
      console.log(`[AdminPage] Astrologers fetched: ${astrologers.length}`);
    } else {
      console.error("[AdminPage] Astrologers fetch failed:", astrologersResult.reason);
    }

  } catch (error) {
    console.error("Failed to execute Promise.allSettled for Sanity data:", error);
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <AdminDashboard 
        locale="en"
        initialBanners={banners}
        initialCategories={categories}
        initialProducts={products}
        initialConsultations={consultations}
        initialAstrologers={astrologers}
      />
    </div>
  );
}
