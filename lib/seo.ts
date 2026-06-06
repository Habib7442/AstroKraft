/**
 * seo.ts — Centralized SEO & metadata configuration for AstroKraft
 * ------------------------------------------------------------------
 * Pan-India Astrology & Gemstone Platform
 *
 * Stack: Next.js (App Router) + TypeScript.
 * Usage:
 *   - Import `constructMetadata()` in any `page.tsx`/`layout.tsx` to emit
 *     Next.js Metadata (title, description, OG, Twitter, canonical, hreflang).
 *   - Import the JSON-LD builders (e.g. `organizationSchema`, `faqSchema`)
 *     and render them via a <script type="application/ld+json"> tag.
 *   - Import `SITE`, `LOCALES`, `KEYWORDS` wherever you need site constants.
 *
 * Companion docs: PRD.md (scope), DESIGN.md (visual system).
 */

import type { Metadata } from "next";

/* ============================================================================
 * 1. CORE SITE CONSTANTS
 * ==========================================================================*/

export const SITE = {
    name: "AstroKraft",
    legalName: "AstroKraft",
    /** Production origin — no trailing slash. Override via env in deployment. */
    url: "https://www.astrokraft.online/en",
    tagline: "Your Guide for Life",
    title: "AstroKraft — India's Trusted Astrology & Gemstone Marketplace",
    description:
        "AstroKraft is India's trusted astrology & gemstone marketplace. Free Kundli & Kundli Matching (Guna Milan), daily Rashifol, Panchang & Subh Muhurat, certified gemstones, verified Vedic astrologers, purohit booking & Vastu consultation.",
    /** Default share image (1200×630). A dynamic per-page OG image is preferred. */
    ogImage: "/og_image.jpg",
    themeColor: { light: "#F7F6FB", dark: "#0C0A16" }, // matches DESIGN.md tokens
    twitter: "@astrokraft",
    keywordsPrimary: [
        "astrology",
        "Vedic astrology",
        "free kundli",
        "kundli matching",
        "Guna Milan",
        "horoscope",
        "rashifol",
        "panchang",
        "subh muhurat",
        "certified gemstones",
        "talk to astrologer",
        "online astrology India",
    ],
    contact: {
        phone: "+916913230255",
        phoneDisplay: "+91 6913230255",
        whatsapp: "916913230255",
        email: "astrokraft1@gmail.com",
        address: {
            region: "Tripura, Barak Valley, West Bengal",
            country: "IN",
        },
    },
    social: {
        // NOTE: current site uses placeholder links — replace with real profiles.
        facebook: "https://www.facebook.com/AstroGuidee/",
        instagram: "https://www.instagram.com/astro.kraft/",
        twitter: "https://twitter.com/astrokraft",
        youtube: "https://www.youtube.com/@astrokraft",
        linkedin: "https://www.linkedin.com/company/astrokraft",
    },
    foundingRating: { value: "4.5", count: "0" }, // populate count with real reviews before launch
} as const;

export const DOMAIN_ROOT = SITE.url.replace(/\/en$/, "");

/* ============================================================================
 * 2. LOCALES / i18n / hreflang  (pan-India language strategy — see PRD §5)
 * ==========================================================================*/

export const LOCALES = ["en", "hin", "bn"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isValidLocale(locale: string): locale is Locale {
    return (LOCALES as readonly string[]).includes(locale);
}

/** Planned "fast-follow" locales (see context/project-overview.md) */
export const PLANNED_LOCALES = ["ta", "te", "mr"] as const;
export type PlannedLocale = (typeof PLANNED_LOCALES)[number];

/** BCP-47 codes for hreflang + OpenGraph locale. */
export const LOCALE_HREFLANG: Record<Locale, string> = {
    en: "en-IN",
    hin: "hi-IN",
    bn: "bn-IN",
};

export const PLANNED_LOCALE_HREFLANG: Record<PlannedLocale, string> = {
    ta: "ta-IN",
    te: "te-IN",
    mr: "mr-IN",
};

export const LOCALE_LABEL: Record<Locale, string> = {
    en: "English",
    hin: "हिन्दी",
    bn: "বাংলা",
};

export const PLANNED_LOCALE_LABEL: Record<PlannedLocale, string> = {
    ta: "தமிழ்",
    te: "తెలుగు",
    mr: "मराठी",
};

/** Build a localized absolute URL for a given path + locale. */
export function localizedUrl(path = "/", locale: Locale = DEFAULT_LOCALE): string {
    const clean = path === "/" ? "" : `/${path.replace(/^\/+|\/+$/g, "")}`;
    const prefix = `/${locale}`;
    return `${DOMAIN_ROOT}${prefix}${clean || "/"}`;
}

/** languages map for Next.js `alternates.languages` (+ x-default). */
export function hreflangAlternates(path = "/"): Record<string, string> {
    const langs: Record<string, string> = {};
    for (const l of LOCALES) langs[LOCALE_HREFLANG[l]] = localizedUrl(path, l);
    langs["x-default"] = localizedUrl(path, DEFAULT_LOCALE);
    return langs;
}

/* ============================================================================
 * 3. KEYWORD MAP  (tuned for Indian astrology search intent)
 *    Used by programmatic pages (PRD §13).
 * ==========================================================================*/

export const KEYWORDS = {
    kundli: [
        "free kundli",
        "online kundli",
        "janam kundli",
        "birth chart",
        "kundli in Hindi",
        "free janam patrika",
        "vedic birth chart online",
    ],
    matching: [
        "kundli matching",
        "kundli milan",
        "guna milan",
        "horoscope matching for marriage",
        "ashtakoot milan",
        "gun milan by name",
        "free kundli matching for marriage",
        "manglik dosha check",
    ],
    horoscope: [
        "daily horoscope",
        "aaj ka rashifal",
        "today horoscope",
        "weekly horoscope",
        "monthly horoscope",
        "rashifol",
    ],
    panchang: [
        "today panchang",
        "aaj ka panchang",
        "shubh muhurat",
        "vivah muhurat",
        "griha pravesh muhurat",
        "choghadiya",
    ],
    gemstone: [
        "certified gemstones",
        "lab certified gemstones online",
        "ruby stone price",
        "yellow sapphire",
        "gemstone for zodiac sign",
        "natural gemstone India",
    ],
    consult: [
        "talk to astrologer",
        "online astrologer consultation",
        "best astrologer in India",
        "astrologer near me",
        "chat with astrologer",
    ],
    services: ["vastu consultant", "purohit booking online", "online pooja booking", "vastu home plan"],
} as const;

export const ZODIAC_SIGNS = [
    "aries", "taurus", "gemini", "cancer", "leo", "virgo",
    "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
] as const;
export type ZodiacSign = (typeof ZODIAC_SIGNS)[number];

/* ============================================================================
 * 4. METADATA BUILDER  (the main helper for every page/layout)
 * ==========================================================================*/

export interface BuildMetaInput {
    title?: string;
    description?: string;
    /** Path WITHOUT locale prefix or origin, e.g. "/tools/matching". */
    path?: string;
    locale?: Locale;
    /** Absolute or root-relative OG image. Defaults to dynamic OG (see ogImageUrl). */
    image?: string;
    /** Keywords to merge with site defaults. */
    keywords?: readonly string[];
    /** Set true on tool-result/account/private pages you don't want indexed. */
    noIndex?: boolean;
    type?: "website" | "article" | "profile";
    /** Article-specific (blog). */
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
}

/** Build a dynamic OG image URL (rendered by an /api/og route, see PRD §13). */
export function ogImageUrl(opts: { title?: string; subtitle?: string; kind?: string } = {}): string {
    const params = new URLSearchParams();
    if (opts.title) params.set("title", opts.title);
    if (opts.subtitle) params.set("subtitle", opts.subtitle);
    if (opts.kind) params.set("kind", opts.kind);
    const qs = params.toString();
    return `${DOMAIN_ROOT}/api/og${qs ? `?${qs}` : ""}`;
}

/** Resolve an image input to an absolute URL. */
function absoluteUrl(img?: string): string {
    const fallback = img || SITE.ogImage;
    return fallback.startsWith("http") ? fallback : `${DOMAIN_ROOT}${fallback.startsWith("/") ? "" : "/"}${fallback}`;
}

/**
 * constructMetadata — returns a Next.js `Metadata` object.
 * Title uses a template so child pages read "Page • AstroKraft".
 */
export function constructMetadata(input: BuildMetaInput = {}): Metadata {
    const {
        title,
        description = SITE.description,
        path = "/",
        locale = DEFAULT_LOCALE,
        image = SITE.ogImage,
        keywords = [],
        noIndex = false,
        type = "website",
        publishedTime,
        modifiedTime,
        authors,
    } = input;

    const canonical = localizedUrl(path, locale);
    const ogImage = absoluteUrl(image);
    const fullTitle = title ? `${title} • ${SITE.name}` : SITE.title;
    const mergedKeywords = Array.from(new Set([...SITE.keywordsPrimary, ...keywords]));

    return {
        metadataBase: new URL(DOMAIN_ROOT),
        title: title ? { absolute: fullTitle } : { default: SITE.title, template: `%s • ${SITE.name}` },
        description,
        keywords: mergedKeywords,
        applicationName: SITE.name,
        authors: authors?.map((name) => ({ name })) ?? [{ name: SITE.name }],
        creator: SITE.name,
        publisher: SITE.name,
        formatDetection: { telephone: true, address: true, email: true },
        alternates: {
            canonical,
            languages: hreflangAlternates(path),
        },
        openGraph: {
            type: type === "profile" ? "profile" : type,
            siteName: SITE.name,
            title: fullTitle,
            description,
            url: canonical,
            locale: LOCALE_HREFLANG[locale].replace("-", "_"),
            alternateLocale: LOCALES.filter((l) => l !== locale).map((l) =>
                LOCALE_HREFLANG[l].replace("-", "_"),
            ),
            images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
            ...(type === "article" ? { publishedTime, modifiedTime, authors } : {}),
        },
        twitter: {
            card: "summary_large_image",
            site: SITE.twitter,
            creator: SITE.twitter,
            title: fullTitle,
            description,
            images: [ogImage],
        },
        robots: noIndex
            ? { index: false, follow: false, nocache: true }
            : {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    "max-video-preview": -1,
                    "max-image-preview": "large",
                    "max-snippet": -1,
                },
            },
        icons: {
            icon: [
                { url: "/favicons/favicon.ico" },
                { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
                { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" }
            ],
            apple: [{ url: "/favicons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
        },
        manifest: "/favicons/site.webmanifest",
        category: "astrology",
        verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
            ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
            : undefined,
    };
}

/** Root `viewport` export (Next.js separates viewport/themeColor from metadata). */
export const viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: SITE.themeColor.light },
        { media: "(prefers-color-scheme: dark)", color: SITE.themeColor.dark },
    ],
    colorScheme: "light dark" as const,
};

/* ============================================================================
 * 5. JSON-LD STRUCTURED DATA BUILDERS
 *    Render via: <script type="application/ld+json"
 *      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
 * ==========================================================================*/

const ORG_ID = `${DOMAIN_ROOT}/#organization`;
const WEBSITE_ID = `${DOMAIN_ROOT}/#website`;

export function organizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE.name,
        legalName: SITE.legalName,
        url: DOMAIN_ROOT,
        logo: `${DOMAIN_ROOT}/logo.svg`,
        description: SITE.description,
        email: SITE.contact.email,
        telephone: SITE.contact.phoneDisplay,
        areaServed: "IN",
        sameAs: Object.values(SITE.social),
        contactPoint: [
            {
                "@type": "ContactPoint",
                telephone: SITE.contact.phone,
                contactType: "customer support",
                areaServed: "IN",
                availableLanguage: ["en", "hin", "bn"],
            },
        ],
    };
}

/** LocalBusiness (helps "astrologer near me" + map presence). */
export function localBusinessSchema() {
    const baseSchema: any = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${DOMAIN_ROOT}/#localbusiness`,
        name: SITE.name,
        image: `${DOMAIN_ROOT}/logo.svg`,
        url: DOMAIN_ROOT,
        telephone: SITE.contact.phone,
        email: SITE.contact.email,
        priceRange: "₹₹",
        address: {
            "@type": "PostalAddress",
            addressRegion: SITE.contact.address.region,
            addressCountry: SITE.contact.address.country,
        },
        areaServed: { "@type": "Country", name: "India" },
    };

    const countVal = parseInt(SITE.foundingRating.count, 10);
    if (!isNaN(countVal) && countVal > 0) {
        baseSchema.aggregateRating = {
            "@type": "AggregateRating",
            ratingValue: SITE.foundingRating.value,
            reviewCount: SITE.foundingRating.count,
        };
    }

    return baseSchema;
}

/** WebSite + Sitelinks Search Box. */
export function websiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: DOMAIN_ROOT,
        name: SITE.name,
        description: SITE.description,
        publisher: { "@id": ORG_ID },
        inLanguage: LOCALES.map((l) => LOCALE_HREFLANG[l]),
        potentialAction: {
            "@type": "SearchAction",
            target: { "@type": "EntryPoint", urlTemplate: `${DOMAIN_ROOT}/search?q={search_term_string}` },
            "query-input": "required name=search_term_string",
        },
    };
}

export interface Crumb { name: string; path: string; }
export function breadcrumbSchema(crumbs: Crumb[], locale: Locale = DEFAULT_LOCALE) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: localizedUrl(c.path, locale),
        })),
    };
}

export interface FaqItem { question: string; answer: string; }
export function faqSchema(items: FaqItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
    };
}

export interface ArticleInput {
    title: string;
    description: string;
    path: string;
    image?: string;
    publishedTime: string;
    modifiedTime?: string;
    authorName?: string;
    locale?: Locale;
}
export function articleSchema(a: ArticleInput) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: a.title,
        description: a.description,
        image: [absoluteUrl(a.image)],
        datePublished: a.publishedTime,
        dateModified: a.modifiedTime ?? a.publishedTime,
        author: { "@type": "Person", name: a.authorName ?? SITE.name },
        publisher: { "@id": ORG_ID },
        mainEntityOfPage: { "@type": "WebPage", "@id": localizedUrl(a.path, a.locale ?? DEFAULT_LOCALE) },
        inLanguage: LOCALE_HREFLANG[a.locale ?? DEFAULT_LOCALE],
    };
}

/** Product schema for the certified gemstone store. */
export interface ProductInput {
    name: string;
    description: string;
    path: string;
    image?: string;
    priceINR: number;
    availability?: "InStock" | "OutOfStock" | "PreOrder";
    sku?: string;
    ratingValue?: string;
    reviewCount?: string;
}
export function productSchema(p: ProductInput) {
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        name: p.name,
        description: p.description,
        image: [absoluteUrl(p.image)],
        sku: p.sku,
        brand: { "@type": "Brand", name: SITE.name },
        offers: {
            "@type": "Offer",
            url: localizedUrl(p.path),
            priceCurrency: "INR",
            price: p.priceINR.toFixed(2),
            availability: `https://schema.org/${p.availability ?? "InStock"}`,
            seller: { "@id": ORG_ID },
        },
        ...(p.ratingValue && p.reviewCount
            ? { aggregateRating: { "@type": "AggregateRating", ratingValue: p.ratingValue, reviewCount: p.reviewCount } }
            : {}),
    };
}

/** Person + Service schema for astrologer profiles. */
export interface AstrologerInput {
    name: string;
    specialty: string;       // e.g. "Vedic Astrology", "Vastu"
    path: string;
    image?: string;
    ratingValue?: string;
    reviewCount?: string;
    feeINR?: number;
    languages?: string[];
}
export function astrologerSchema(a: AstrologerInput) {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: a.name,
        jobTitle: `Astrologer — ${a.specialty}`,
        image: a.image ? absoluteUrl(a.image) : undefined,
        url: localizedUrl(a.path),
        knowsLanguage: a.languages,
        worksFor: { "@id": ORG_ID },
        ...(a.ratingValue && a.reviewCount
            ? { aggregateRating: { "@type": "AggregateRating", ratingValue: a.ratingValue, reviewCount: a.reviewCount } }
            : {}),
    };
}

/** Generic Service schema (consultation, pooja, vastu, kundli matching). */
export interface ServiceInput {
    name: string;
    description: string;
    path: string;
    priceINR?: number;
    category?: string;
}
export function serviceSchema(s: ServiceInput) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        name: s.name,
        description: s.description,
        url: localizedUrl(s.path),
        serviceType: s.category ?? "Astrology",
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "Country", name: "India" },
        ...(s.priceINR != null
            ? { offers: { "@type": "Offer", priceCurrency: "INR", price: s.priceINR.toFixed(2) } }
            : {}),
    };
}

/** Single Review (for testimonials, PRD Appendix A). */
export interface ReviewInput { author: string; body: string; ratingValue?: number; }
export function reviewSchema(r: ReviewInput) {
    return {
        "@context": "https://schema.org",
        "@type": "Review",
        itemReviewed: { "@id": ORG_ID },
        author: { "@type": "Person", name: r.author },
        reviewBody: r.body,
        reviewRating: { "@type": "Rating", ratingValue: r.ratingValue ?? 5, bestRating: 5 },
    };
}

/** Convenience: combine the global graph for the root layout. */
export function globalJsonLd() {
    return [organizationSchema(), websiteSchema(), localBusinessSchema()];
}

/* ============================================================================
 * 6. ROBOTS + SITEMAP HELPERS
 *    For app/robots.ts and app/sitemap.ts (Next.js convention).
 * ==========================================================================*/

/** app/robots.ts  →  export default () => robotsConfig() */
export function robotsConfig() {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                // Keep private / non-canonical surfaces out of the index.
                disallow: ["/account", "/api/", "/auth/", "/*?*sessionId=", "/checkout"],
            },
        ],
        sitemap: `${DOMAIN_ROOT}/sitemap.xml`,
        host: DOMAIN_ROOT,
    };
}

export interface SitemapRoute {
    path: string;
    changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
    priority?: number;
    lastModified?: string | Date;
}

/** Static + templated high-value routes (extend with DB-driven entries in app/sitemap.ts). */
export const STATIC_ROUTES: SitemapRoute[] = [
    { path: "/", changeFrequency: "daily", priority: 1.0 },
    { path: "/tools/matching", changeFrequency: "weekly", priority: 0.95 }, // top viral surface
    { path: "/tools/kundli", changeFrequency: "weekly", priority: 0.9 },
    { path: "/tools/horoscope", changeFrequency: "daily", priority: 0.9 },
    { path: "/tools/panchang", changeFrequency: "daily", priority: 0.85 },
    { path: "/astrologers", changeFrequency: "daily", priority: 0.85 },
    { path: "/gemstones", changeFrequency: "weekly", priority: 0.8 },
    { path: "/tools/numerology", changeFrequency: "monthly", priority: 0.6 },
    { path: "/tools/tarot", changeFrequency: "monthly", priority: 0.6 },
    { path: "/tools/compatibility", changeFrequency: "monthly", priority: 0.6 },
    { path: "/purohits", changeFrequency: "weekly", priority: 0.6 },
    { path: "/vastu", changeFrequency: "monthly", priority: 0.6 },
    { path: "/blog", changeFrequency: "daily", priority: 0.7 },
    { path: "/about", changeFrequency: "yearly", priority: 0.4 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.4 },
];

/**
 * Expand a route into one sitemap entry per locale with hreflang alternates.
 * Returns objects compatible with Next.js `MetadataRoute.Sitemap`.
 */
export function buildSitemapEntries(routes: SitemapRoute[] = STATIC_ROUTES) {
    return routes.map((r) => ({
        url: localizedUrl(r.path, DEFAULT_LOCALE),
        lastModified: r.lastModified ?? new Date(),
        changeFrequency: r.changeFrequency ?? "weekly",
        priority: r.priority ?? 0.5,
        alternates: { languages: hreflangAlternates(r.path) },
    }));
}

/** Programmatic horoscope routes: 12 signs × locales (PRD §13). */
export function horoscopeSitemapRoutes(): SitemapRoute[] {
    return ZODIAC_SIGNS.map((sign) => ({
        path: `/tools/horoscope/${sign}`,
        changeFrequency: "daily",
        priority: 0.75,
    }));
}

/* ============================================================================
 * 7. PER-PAGE METADATA PRESETS  (import directly in each route)
 * ==========================================================================*/

export const PAGE_META = {
    home: (locale: Locale = DEFAULT_LOCALE): Metadata =>
        constructMetadata({ path: "/", locale, image: SITE.ogImage }),

    matching: (locale: Locale = DEFAULT_LOCALE): Metadata =>
        constructMetadata({
            title: "Free Kundli Matching (Guna Milan) for Marriage",
            description:
                "Match kundli online for free. Get your Ashtakoot Guna Milan score out of 36, Manglik, Nadi & Bhakoot dosha analysis — instant, accurate & shareable. India's most beautiful kundli matching tool.",
            path: "/tools/matching",
            locale,
            keywords: KEYWORDS.matching,
            image: ogImageUrl({ title: "Kundli Matching", subtitle: "Guna Milan • Free", kind: "matching" }),
        }),

    kundli: (locale: Locale = DEFAULT_LOCALE): Metadata =>
        constructMetadata({
            title: "Free Online Kundli / Janam Patrika",
            description:
                "Generate your free Vedic birth chart (Janam Kundli) instantly — Lagna, Rashi, Navamsa, planetary positions, dasha & predictions. Available in Hindi, Bengali & more.",
            path: "/tools/kundli",
            locale,
            keywords: KEYWORDS.kundli,
            image: ogImageUrl({ title: "Free Kundli", subtitle: "Janam Patrika", kind: "kundli" }),
        }),

    panchang: (locale: Locale = DEFAULT_LOCALE): Metadata =>
        constructMetadata({
            title: "Today's Panchang & Subh Muhurat",
            description:
                "Today's Panchang — tithi, nakshatra, yoga, karana — plus auspicious Subh Muhurat for marriage, griha pravesh, vehicle & business. Localized for your city.",
            path: "/tools/panchang",
            locale,
            keywords: KEYWORDS.panchang,
        }),

    astrologers: (locale: Locale = DEFAULT_LOCALE): Metadata =>
        constructMetadata({
            title: "Talk to Verified Astrologers Online",
            description:
                "Consult India's verified Vedic astrologers via chat or call. Transparent pricing, real ratings, multiple languages. Get clarity on career, marriage, finance & more.",
            path: "/astrologers",
            locale,
            keywords: KEYWORDS.consult,
        }),

    gemstones: (locale: Locale = DEFAULT_LOCALE): Metadata =>
        constructMetadata({
            title: "Certified Gemstones Online",
            description:
                "Shop authentic, lab-certified gemstones — Ruby, Yellow Sapphire, Red Coral, Gomed & more. Powerful remedies recommended for your zodiac, delivered across India.",
            path: "/gemstones",
            locale,
            keywords: KEYWORDS.gemstone,
        }),

    horoscopeSign: (sign: ZodiacSign, locale: Locale = DEFAULT_LOCALE): Metadata => {
        const label = sign.charAt(0).toUpperCase() + sign.slice(1);
        return constructMetadata({
            title: `${label} Horoscope Today — Daily Rashifol`,
            description: `Read today's ${label} horoscope (Rashifol) — love, career, money & health predictions. Updated daily, available in your language. Share with friends.`,
            path: `/tools/horoscope/${sign}`,
            locale,
            keywords: KEYWORDS.horoscope,
            image: ogImageUrl({ title: `${label} Horoscope`, subtitle: "Daily Rashifol", kind: "horoscope" }),
        });
    },
} as const;

/* ============================================================================
 * 8. DEFAULT EXPORT
 * ==========================================================================*/

export default {
    SITE,
    LOCALES,
    DEFAULT_LOCALE,
    PLANNED_LOCALES,
    isValidLocale,
    KEYWORDS,
    ZODIAC_SIGNS,
    constructMetadata,
    viewport,
    ogImageUrl,
    localizedUrl,
    hreflangAlternates,
    // JSON-LD
    organizationSchema,
    localBusinessSchema,
    websiteSchema,
    breadcrumbSchema,
    faqSchema,
    articleSchema,
    productSchema,
    astrologerSchema,
    serviceSchema,
    reviewSchema,
    globalJsonLd,
    // robots + sitemap
    robotsConfig,
    buildSitemapEntries,
    horoscopeSitemapRoutes,
    STATIC_ROUTES,
    PAGE_META,
};