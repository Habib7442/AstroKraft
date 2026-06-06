# Build Plan

## Core Principle

Full page UI built with mock data first — verified visually before any logic is written. Then functionality is built and wired to the UI step by step. Every feature must be visible and testable before moving to the next. No invisible backend phases.

---

## Phase 0 — Foundations (Weeks 1–3)

### 01 Design System & Scaffold

Set up the Next.js application core, design system tokens, and component library.

**UI:**

- Tailwind CSS variable tokens mapped from DESIGN.md → globals.css
- Font loading: Fraunces, Geist Sans, Geist Mono via next/font
- shadcn/ui base component installation
- Aceternity UI gradient-free components imported
- Light/dark theme configuration (next-themes)

**Logic:**

- `app/[locale]/` routing structure for i18n
- Static JSON dictionaries (`messages/en.json`, `messages/hin.json`, `messages/bn.json`)
- Dictionary loader in `lib/i18n.ts`
- SEO metadata builder in `lib/seo.ts`
- Lenis smooth scroll provider
- Dynamic sitemap.ts and robots.ts

---

### 02 Homepage

Build the complete homepage UI.

**UI:**

- Transparent sticky Header — logo, nav links, language switcher, "Talk to Astrologer" CTA
- Hero section — centered typography, Fraunces display title with pointer highlight on "AstroKraft", nebula background, spotlight glows, trust chips
- Services Bento Grid — 6 cards (Verified Astrologer, Certified Gemstone, Purohit, Vastu, Vastu Home Plan, Kundli Match) with radial hover glows
- Featured Astrologers — interactive 3D globe with avatar markers + bento grid with glassmorphic cards
- Zodiac Sign grid — 12 gold line-glyph tiles
- Testimonials — Infinite Moving Cards
- Footer — columns (Services, Free Tools, Company), social links (FB, Instagram, WhatsApp), brand info
- Floating WhatsApp FAB
- Excitement toaster notification

**Logic:**

- Smooth scroll via Lenis provider
- Scroll performance optimizations (hover-disable on scroll, GPU compositor layers)
- 3D globe IntersectionObserver for frame loop gating
- Language switcher with pathname preservation

---

### 03 Astrologer Directory & Profiles

**UI:**

- `/astrologers` — team grid listing all astrologers
- `/astrologers/[id]` — individual profile with credentials, specialties, languages, WhatsApp CTA, booking
- Glassmorphic globe detail modal with React Portal

**Logic:**

- Centralized astrologer data from `lib/data/astrologer.json`
- Dynamic metadata generation per astrologer
- Profile route linking from bento grid and globe

---

## Phase 1 — MVP Launch (Weeks 4–8)

### 04 Free Kundli / Birth Chart

Build the free Kundli tool — the core acquisition tool.

**UI:**

- `/tools/kundli` — birth details form (date, time, location with place autocomplete)
- Result page — Lagna chart, Rashi chart, planetary positions, houses, dasha timeline
- Share button (WhatsApp / download)
- Soft CTA: "Talk to an astrologer for a detailed reading"

**Logic:**

- API route: `POST /api/astrology/kundli`
- `lib/astrology/` service layer calls FreeAstrologyAPI
- Hash-keyed caching in Redis/Next cache
- Result normalization into standard shape

---

### 05 Kundli Matching / Guna Milan

Build the flagship viral tool — the shareable matching card.

**UI:**

- `/tools/matching` — two sets of birth detail forms
- Animated score reveal (number count-up + gold sparkles burst)
- Beautiful shareable result card — Guna score, dosha status, verdict
- One-tap share to WhatsApp / Instagram / copy link / download image
- Soft CTA: "Get full report ₹99" or "Consult an astrologer"

**Logic:**

- API route: `POST /api/astrology/matching`
- FreeAstrologyAPI matching endpoint + Prokerala for regional language output
- Cache by hash of both partner birth details
- Dynamic OG image generation for share previews

---

### 06 Daily Rashifol / Horoscope

**UI:**

- `/tools/horoscope` — hub showing all 12 signs
- `/tools/horoscope/[sign]` — per-sign daily/weekly/monthly views
- Shareable card per sign per day
- "Share your horoscope" to WhatsApp Status

**Logic:**

- API route: `POST /api/astrology/horoscope`
- Prokerala or VedicAstroAPI for multi-language horoscopes
- Pre-generate daily at midnight via ISR (12 signs × N languages = few dozen calls)
- Programmatic SEO pages (sign × language × timeframe)

---

### 07 Panchang & Subh Muhurat

**UI:**

- `/tools/panchang` — daily panchang (tithi, nakshatra, yoga, karana)
- Auspicious timings calendar
- Retains existing Subh Muharat entries (Bengali muhurats)

**Logic:**

- API route: `POST /api/astrology/panchang`
- Prokerala panchang endpoint (city-aware)
- ISR pre-generation daily

---

### 08 Auth & User Dashboard

**UI:**

- `/auth/login` — Phone OTP + Google OAuth
- `/account` — dashboard with saved kundlis, bookings, reports, preferences

**Logic:**

- NextAuth.js / Clerk integration
- Phone OTP (India-first)
- Session management
- Middleware protecting `/account` and `/checkout`

---

## Phase 2 — Growth (Weeks 9–14)

### 09 Gemstone Store

**UI:**

- `/gemstones` — catalog grid (12 existing stones + expandable)
- `/gemstones/[slug]` — product page (origin, lab certificate, carat, price)
- Cart and checkout

**Logic:**

- Razorpay payment integration
- Product data in PostgreSQL
- Gemstone recommendation tool → store link

---

### 10 Numerology & Tarot

**UI:**

- `/tools/numerology` — name + DOB → life-path / lucky numbers
- `/tools/tarot` — daily card / 3-card draw with meanings

**Logic:**

- Divine API integration
- Shareable result cards

---

### 11 Compatibility Pages (Programmatic SEO)

**UI:**

- `/tools/compatibility` — hub
- `/tools/compatibility/[a]-[b]` — per-pair pages (144 combinations)

**Logic:**

- Computed compatibility + API data
- Static generation for SEO

---

### 12 Purohit & Vastu Booking

**UI:**

- `/purohits` — pooja catalog (5+ existing)
- `/purohits/[slug]` — pooja detail + booking
- `/vastu` — consultation + Vastu Home Plan

**Logic:**

- Booking flow → WhatsApp handoff
- Service data in PostgreSQL

---

### 13 Blog & Content Hub

**UI:**

- `/blog` — article listing
- `/blog/[slug]` — article with Tracing Beam reading UI

**Logic:**

- MDX content or CMS integration
- Programmatic SEO articles

---

### 14 Reviews & Ratings

**UI:**

- Review sections on astrologer profiles and gemstone pages
- Star ratings, written reviews

**Logic:**

- Review data in PostgreSQL
- AggregateRating JSON-LD

---

## Phase 3 — Scale (Weeks 15+)

### 15 Additional Languages

- Tamil, Telugu, Marathi translation dictionaries
- Regional font loading (Noto Tamil, Noto Telugu, etc.)

### 16 WhatsApp Distribution

- WhatsApp Business API integration
- Daily rashifol opt-in
- Booking handoff automation

### 17 Premium Subscription

- Monthly subscription for personalized daily rashifol
- Unlimited matching depth
- Priority astrologer consults

### 18 Admin Portal

- Manage astrologers, gemstones, content, muhurat dates
- Lightweight dashboard

---

## Feature Count

| Phase | Features |
| --- | --- |
| Phase 0 — Foundations | 3 |
| Phase 1 — MVP Launch | 5 |
| Phase 2 — Growth | 6 |
| Phase 3 — Scale | 4 |
| **Total** | **18** |
