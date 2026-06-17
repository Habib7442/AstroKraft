import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerClient } from "@insforge/sdk/ssr";
import { 
  getAdminBanners,
  getAdminCategories,
  getAdminProducts,
  getAdminConsultations,
  getAdminAstrologers
} from "@/lib/actions/sanity";
import { AdminDashboard } from "@/components/sections/admin-dashboard";

export default async function AdminPage() {
  // 1. Authenticate with InsForge session on the server
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
    console.error("Auth verify error in admin page:", e);
  }

  // 2. Fetch user profile from PostgreSQL users table to verify their role
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
    console.error("Database user role fetch error in admin page:", e);
  }

  const adminEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  const isAdmin = user && (
    role === "admin" ||
    adminEmails.includes(user.email.toLowerCase())
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

  try {
    const [
      fetchedBanners,
      fetchedCategories,
      fetchedProducts,
      fetchedConsultations,
      fetchedAstrologers
    ] = await Promise.all([
      getAdminBanners(),
      getAdminCategories(),
      getAdminProducts(),
      getAdminConsultations(),
      getAdminAstrologers(),
    ]);

    banners = fetchedBanners;
    categories = fetchedCategories;
    products = fetchedProducts;
    consultations = fetchedConsultations;
    astrologers = fetchedAstrologers;
  } catch (error) {
    console.error("Failed to load initial Sanity data for admin dashboard:", error);
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
