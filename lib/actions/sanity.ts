import { client } from "@/sanity/lib/client";
import { 
  bannersQuery, 
  categoriesQuery, 
  productsQuery, 
  consultationsQuery, 
  astrologersQuery,
  adminBannersQuery,
  adminCategoriesQuery,
  adminProductsQuery,
  adminConsultationsQuery,
  adminAstrologersQuery
} from "@/sanity/lib/queries";

import { cacheLife, cacheTag } from "next/cache";

// Revalidation interval (in seconds) for SSR/ISR data fetching
const REVALIDATE_INTERVAL = 60;

/**
 * Public Data Fetching Actions (with caching/revalidation using Next.js Cache Components)
 */

export async function getBanners() {
  "use cache";
  cacheLife("weeks");
  cacheTag("banners");
  return client.fetch(bannersQuery);
}

export async function getCategories() {
  "use cache";
  cacheLife("weeks");
  cacheTag("categories");
  return client.fetch(categoriesQuery);
}

export async function getProducts() {
  "use cache";
  cacheLife("weeks");
  cacheTag("products");
  return client.fetch(productsQuery);
}

export async function getConsultations() {
  "use cache";
  cacheLife("weeks");
  cacheTag("consultations");
  return client.fetch(consultationsQuery);
}

export async function getAstrologers() {
  "use cache";
  cacheLife("weeks");
  cacheTag("astrologers");
  return client.fetch(astrologersQuery);
}

/**
 * Admin Data Fetching Actions (fetches all documents, active and inactive)
 */

export async function getAdminBanners() {
  return client.fetch(adminBannersQuery);
}

export async function getAdminCategories() {
  return client.fetch(adminCategoriesQuery);
}

export async function getAdminProducts() {
  return client.fetch(adminProductsQuery);
}

export async function getAdminConsultations() {
  return client.fetch(adminConsultationsQuery);
}

export async function getAdminAstrologers() {
  return client.fetch(adminAstrologersQuery);
}
