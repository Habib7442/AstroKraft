import { MetadataRoute } from "next";
import { robotsConfig } from "@/lib/seo";

/**
 * Dynamic robots.txt generation matching Next.js App Router conventions.
 * Consumes settings defined in centralized SEO configuration (lib/seo.ts).
 */
export default function robots(): MetadataRoute.Robots {
  return robotsConfig();
}
