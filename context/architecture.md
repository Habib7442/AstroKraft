# Architecture Context

## Stack

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router) + TypeScript | React Server Components, server-side rendering, API routing, and i18n localization. |
| **Styling** | Tailwind CSS + Vanilla CSS | CSS variables styling, light/dark theming, and responsive UI design. |
| **UI Components**| shadcn/ui + Aceternity UI + Framer Motion | Accessible base elements, bento grids, custom scrolling, and celestial micro-animations. |
| **Database** | Prisma ORM + PostgreSQL (Neon/Supabase) | User accounts, saved charts, booking transactions, gemstones, and astrologer metadata. |
| **Caching** | Upstash Redis | Deterministic caching of astrology API computations to protect rate limits. |
| **Auth** | NextAuth.js / Clerk | Phone OTP, Email, and Google social login. |
| **Payments** | Razorpay | Standard payment gateway for consultations and gemstone sales in India. |
| **Astrology Data**| FreeAstrologyAPI + Prokerala APIs | Core calculation engines (charts, gunas, panchang, translations). |

## System Boundaries

*   `app/` — Internationalized routes (`[locale]/`), page layouts, metadata configs, and Next.js route handlers.
*   `components/` — Modular visual components:
    *   `components/ui/` — Atomic primitives from shadcn/ui.
    *   `components/sections/` — Page sections (Hero, Featured lists, Bento grids).
    *   `components/shared/` — Common components (Language switchers, Theme toggles).
*   `lib/astrology/` — Service layer abstracting API providers, caching, and response normalizers.
*   `lib/seo/` — Shared metadata and JSON-LD structured data generators utilizing `seo.ts`.
*   `prisma/` — Database schema models and Prisma Client client instantiator.
*   `messages/` — Translation JSON files for multi-language (`en`, `hi`, `bn`, etc.) support.

## Storage Model

*   **Neon / Supabase PostgreSQL**: Persists structured data: users, astrologers, gemstone stock, consultation bookings, and saved birth charts.
*   **Upstash Redis / Next Cache**: Stores key-value mappings of normalized birth data hashes (inputs) to JSON API payloads. Key format: `astrology:cache:<input_hash>`.
*   **Vercel / Next.js Data Cache**: Aggressive caching of daily horoscopes and panchang (pre-generated via ISR at midnight).

## Auth and Access Model

*   **Authentication**: Users sign in via phone OTP (preferred in India) or Google OAuth.
*   **Ownership**: Users can only read, write, or delete their own saved charts and transaction histories.
*   **Security Bounds**: Middleware checks for valid sessions on `/account` and `/checkout` paths. Database queries restrict mutate operations based on session userID.

## Invariants

1. **Verify ephemeris data**: Never hand-roll Vedic calculations. All charts, gunas, and panchang positions must be sourced from verified APIs (FreeAstrologyAPI or Prokerala).
2. **Deterministic Caching**: Every unique set of birth details (Date, Time, Latitude, Longitude, Timezone) must be hashed and cached. Redundant API calls for identical details are strictly prohibited.
3. **No CSS Gradients**: The Celestial Royale theme forbids CSS color gradients. Visual depth must be created via solid backgrounds, hairline gold dividers, soft shadows, and SVG constellation overlays.
4. **Resilient Offline Shell**: Provide skeletal states and cached responses if API endpoints fail or the user has a poor internet connection.
