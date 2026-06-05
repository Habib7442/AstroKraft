import { MetadataRoute } from "next";
import { 
  buildSitemapEntries, 
  localizedUrl, 
  DEFAULT_LOCALE, 
  hreflangAlternates 
} from "@/lib/seo";
import ASTROLOGERS_DATA from "@/lib/data/astrologer.json";

const ASTROLOGERS = ASTROLOGERS_DATA as Record<string, any>;

/**
 * Dynamic sitemap.xml generator conforming to Next.js App Router conventions.
 * Maps core landing pages and dynamic astrologer profile pages, complete with
 * hreflang alternate translations for Google Search Console indexing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // 1. Implemented static routes on the site
  const implementedRoutes = [
    { path: "/", changeFrequency: "daily" as const, priority: 1.0 },
    { path: "/astrologers", changeFrequency: "daily" as const, priority: 0.85 },
  ];

  const staticEntries = buildSitemapEntries(implementedRoutes);

  // 2. Dynamic astrologer profiles
  const astrologerKeys = Object.keys(ASTROLOGERS);
  const astrologerEntries = astrologerKeys.map((key) => {
    const path = `/astrologers/${key}`;
    return {
      url: localizedUrl(path, DEFAULT_LOCALE),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      alternates: {
        languages: hreflangAlternates(path),
      },
    };
  });

  return [...staticEntries, ...astrologerEntries];
}
