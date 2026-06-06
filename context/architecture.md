# Architecture

## Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| Framework | Next.js (App Router) + TypeScript | React Server Components, SSR, API routing, i18n localization |
| Styling | Tailwind CSS + Vanilla CSS | CSS variable theming, light/dark modes, responsive design |
| UI Components | shadcn/ui + Aceternity UI | Accessible form primitives, bento grids, celestial animations |
| Animation | Framer Motion (motion) | Subtle cosmic micro-animations, `prefers-reduced-motion` safe |
| Smooth Scroll | Lenis (`lenis/react`) | Physics-based inertial smooth scrolling |
| i18n | Static JSON dictionaries | EN, HI, BN locale routing with `[locale]` segment |
| 3D Globe | React Three Fiber + Drei | Interactive astrologer globe visualization |
| State | Zustand | Lightweight global state (globe selection, UI state) |
| Auth | NextAuth.js / Clerk | Phone OTP (India-first), Google OAuth |
| Database | Prisma ORM + PostgreSQL (Neon/Supabase) | Users, saved charts, bookings, gemstones, astrologer data |
| Caching | Upstash Redis + Next.js Data Cache | Hash-keyed astrology API result caching |
| Astrology APIs | FreeAstrologyAPI + Prokerala | Core calculation engines (charts, gunas, panchang, translations) |
| Payments | Razorpay | UPI, cards, netbanking for India |
| Theming | next-themes | Dark/light with `class` strategy, SSR-safe |
| Hosting | Vercel | Edge + ISR + image optimization |

---

## Folder Structure

```
/
├── AGENTS.md
├── context/
│   ├── project-overview.md
│   ├── architecture.md
│   ├── ui-context.md
│   ├── code-standards.md
│   ├── ai-workflow-rules.md
│   └── progress-tracker.md
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx                         → Root locale layout, providers, fonts
│   │   ├── page.tsx                           → Homepage
│   │   ├── astrologers/
│   │   │   ├── page.tsx                      → Team directory listing
│   │   │   └── [id]/
│   │   │       └── page.tsx                  → Individual astrologer profile
│   │   ├── gemstones/
│   │   │   ├── page.tsx                      → Gemstone store catalog
│   │   │   └── [slug]/
│   │   │       └── page.tsx                  → Product detail page
│   │   ├── tools/
│   │   │   ├── kundli/page.tsx               → Free Kundli / Birth Chart
│   │   │   ├── matching/page.tsx             → Kundli Matching (Guna Milan)
│   │   │   ├── horoscope/
│   │   │   │   ├── page.tsx                  → Rashifol hub
│   │   │   │   └── [sign]/page.tsx           → Per-sign daily/weekly/monthly
│   │   │   ├── panchang/page.tsx             → Panchang + Subh Muhurat
│   │   │   ├── numerology/page.tsx           → Numerology calculator
│   │   │   ├── tarot/page.tsx                → Tarot card draw
│   │   │   └── compatibility/
│   │   │       ├── page.tsx                  → Compatibility hub
│   │   │       └── [pair]/page.tsx           → Pair pages (programmatic SEO)
│   │   ├── blog/
│   │   │   ├── page.tsx                      → Blog listing
│   │   │   └── [slug]/page.tsx               → Blog article
│   │   ├── about/page.tsx                    → Brand story
│   │   ├── contact/page.tsx                  → Contact + WhatsApp
│   │   ├── account/page.tsx                  → User dashboard
│   │   └── auth/
│   │       └── (login|signup)/page.tsx       → Auth pages
│   ├── api/
│   │   └── astrology/
│   │       ├── kundli/route.ts               → Birth chart calculation
│   │       ├── matching/route.ts             → Guna Milan calculation
│   │       ├── horoscope/route.ts            → Daily rashifol fetch
│   │       └── panchang/route.ts             → Panchang data
│   ├── robots.ts                             → Dynamic robots.txt
│   └── sitemap.ts                            → Dynamic sitemap.xml
├── components/
│   ├── ui/                                    → shadcn/ui + Aceternity primitives
│   ├── sections/                              → Page sections (Hero, Header, Footer, etc.)
│   ├── shared/                                → Common components (LanguageSwitcher, etc.)
│   └── providers/                             → Context providers (LenisProvider, ThemeProvider)
├── lib/
│   ├── astrology/                             → Service layer abstracting API providers
│   │   ├── providers/                         → FreeAstrologyAPI, Prokerala clients
│   │   ├── cache.ts                           → Hash-keyed Redis/Next cache
│   │   └── normalizer.ts                      → Unified response shape
│   ├── seo.ts                                 → Central metadata, JSON-LD, OG config
│   ├── i18n.ts                                → Dictionary loader + locale validation
│   ├── data/
│   │   └── astrologer.json                    → Astrologer profile database
│   ├── store/
│   │   └── useGlobeStore.ts                   → Zustand state for 3D globe
│   └── utils.ts                               → Shared utility functions
├── messages/
│   ├── en.json                                → English translations
│   ├── hin.json                               → Hindi translations
│   └── bn.json                                → Bengali translations
├── public/
│   ├── assets/                                → Images (astrologer WebPs, hero bg)
│   ├── favicons/                              → Favicon + webmanifest
│   ├── social-icons/                          → WhatsApp, FB, Instagram PNGs
│   └── logo.svg                               → Brand logo
├── prisma/
│   └── schema.prisma                          → Database schema
└── types/
    └── index.ts                               → Global TypeScript types
```

---

## System Boundaries

| Folder | Owns |
| --- | --- |
| `app/[locale]/` | Internationalized routes, page layouts, metadata config. No business logic. |
| `app/api/` | API route handlers for astrology calculations. Thin wrappers calling `lib/astrology/`. |
| `components/` | UI only. No data fetching. No direct DB calls. No API calls. |
| `components/sections/` | Full page section compositions (Hero, Header, Footer, ServicesBento). |
| `components/ui/` | Atomic primitives from shadcn/ui and Aceternity UI. |
| `lib/astrology/` | All astrology calculation logic. Provider abstraction, caching, normalization. |
| `lib/` | Third-party client initialization, SEO config, i18n, shared utilities. |
| `messages/` | Static JSON translation dictionaries. One file per locale. |
| `types/` | TypeScript types shared across the project. |

---

## Data Flow

### Astrology Tool Calculation (API Routes)

```
User fills birth details form
        ↓
Client POST to /api/astrology/[tool]
        ↓
Route handler validates input
        ↓
lib/astrology/ checks Redis cache (hash of normalized birth data)
        ↓
Cache hit → return cached result
Cache miss → call FreeAstrologyAPI / Prokerala
        ↓
Normalize response → cache result → return to client
        ↓
Client renders formatted result + shareable card
```

### Daily Rashifol (ISR / Pre-generation)

```
Cron / ISR trigger at midnight
        ↓
lib/astrology/ calls Prokerala for 12 signs × N languages
        ↓
Results cached in Next.js Data Cache
        ↓
Pages served statically with revalidation
```

### Marketplace Booking (Server Actions)

```
User selects astrologer/purohit → clicks Book
        ↓
Server Action validates session
        ↓
Writes booking to PostgreSQL via Prisma
        ↓
WhatsApp handoff or chat/call redirect
```

---

## Storage Model

- **PostgreSQL (Neon/Supabase)**: Structured data — users, astrologers, gemstone inventory, consultation bookings, saved birth charts, reviews.
- **Upstash Redis**: Key-value cache of astrology API results. Key format: `astrology:cache:<input_hash>`. Deterministic — same birth details always produce the same result.
- **Next.js Data Cache / ISR**: Pre-generated daily horoscopes and panchang data. Revalidated at midnight.
- **Vercel CDN**: Static assets (images, fonts, icons) with long-term cache headers.

---

## Authentication

- Provider: NextAuth.js / Clerk
- Methods: Phone OTP (India-first), Google OAuth
- Protected routes: `/account`, `/checkout`
- Public routes: All tool pages, homepage, astrologer directory, gemstone catalog
- Middleware checks session on protected routes only
- Free tools work without authentication — account required only for saving results and booking

---

## Internationalization

- Three active locales: `en`, `hin`, `bn`
- Hindi uses `hin` prefix (not `hi`) to avoid route collision with English `/hi` path
- Static JSON dictionaries loaded at build time (no dynamic imports)
- `[locale]` route segment in all app paths
- Alternate hreflang tags generated in sitemap for all localized pages
- Planned fast-follow: Tamil (`ta`), Telugu (`te`), Marathi (`mr`)

---

## Invariants

Rules the AI agent must never violate:

1. **Never hand-roll Vedic calculations.** All charts, gunas, and panchang positions must come from verified APIs (FreeAstrologyAPI or Prokerala).
2. **Deterministic caching is mandatory.** Every unique set of birth details (date, time, lat, lng, timezone) must be hashed and cached. Redundant API calls for identical inputs are strictly prohibited.
3. **No CSS gradients.** The Celestial Royale theme achieves depth via solid backgrounds, hairline gold dividers, soft shadows, and SVG constellation overlays — never color washes.
4. **API routes contain no UI logic. Components contain no DB logic.** Keep concerns strictly separated.
5. **Astrology service abstraction.** All API providers are abstracted behind `lib/astrology/` with a normalized response shape. Providers can be swapped without touching UI.
6. **Always scope user queries to session.** Never query user data without a session user filter.
7. **Resilient failure states.** Provide skeletons, cached responses, and friendly errors if API endpoints fail or the user has a poor connection.
8. **Social links are limited.** Only Facebook, Instagram, and WhatsApp profiles are active. No Twitter, YouTube, or LinkedIn.
