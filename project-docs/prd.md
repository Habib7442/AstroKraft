# AstroKraft — Product Requirements Document (PRD)

**Project:** AstroKraft — Pan-India Astrology & Gemstone Platform (Rebuild v2.0)
**Document owner:** Product
**Status:** Draft for build
**Last updated:** 2026-06-04
**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui · Aceternity UI · Framer Motion
**Companion docs:** `DESIGN.md` (visual system) · `seo.ts` (SEO/metadata config)

---

## 1. Executive Summary

AstroKraft today is a regional (Tripura / Barak Valley / West Bengal) astrology + gemstone marketplace built on PHP, with mixed Bengali–English content, placeholder social links, no real user accounts, and no lead-capture. The brand has the right *ingredients* — verified astrologers, certified gemstones, purohit booking, Vastu, and a ₹99 Kundli match hook — but the execution does not convey the trust or premium quality needed to compete nationally.

This document specifies a **complete rebuild** as a premium, fully responsive, bilingual-first **pan-India** platform. The strategy is a **two-engine model**:

1. **Virality / Acquisition engine** — a suite of genuinely free, beautiful, *shareable* astrology tools (Kundli, **Kundli Matching / Guna Milan**, Daily Rashifol, Panchang, Numerology, Tarot, Compatibility). These are powered by free-tier astrology APIs and engineered for organic SEO + social sharing.
2. **Monetization engine** — the existing marketplace (astrologer consults, certified gemstones, purohit booking, Vastu) converted from free-tool traffic.

The single highest-leverage opportunity identified in research: **the Kundli-matching result is the most-trafficked, most-social page in Indian astrology, yet every incumbent ships it as a data table or PDF.** AstroKraft will ship it as a gorgeous, mobile-native, **shareable result card** — the centerpiece of the growth strategy.

---

## 2. Vision & Goals

**Vision:** Become India's most *trusted and beautiful* astrology destination — the place a family reaches for before a wedding, a student before an exam, and a new parent before a naming ceremony.

**Goals (12 months):**

| # | Goal | Target |
|---|------|--------|
| G1 | Establish pan-India reach (beyond NE India) | Traffic from all major states; 3+ languages live |
| G2 | Build a viral free-tool funnel | Kundli + Matching = primary acquisition channel |
| G3 | Premium brand perception | Design quality clearly above AstroSage/AstroTalk |
| G4 | Convert free users to paid consults/gemstones | Tool → consult conversion measurable & rising |
| G5 | Own long-tail astrology SEO | Programmatic horoscope/panchang/compatibility pages |
| G6 | Full responsiveness & performance | Core Web Vitals "Good" on mobile (the dominant device) |

**Non-goals (this phase):** Native mobile apps (PWA first), live video consultation infrastructure (start with chat/call handoff), in-house astrologer CRM (use lightweight admin).

---

## 3. Problem Statement & Opportunity

- **Market is huge and growing.** Online astrology in India is led by AstroTalk (~₹1,176 cr FY25 revenue, +81% YoY, ~85% of the online-consult market). The category is mainstream, not niche.
- **Incumbents win on scale, not on craft.** AstroSage holds ~80% of the free-kundli market with ~1.2M DAU but has the category's worst billing-transparency complaints. AstroTalk's design and trust signals are weak. Co-Star alienated users with aggressive paywalls.
- **The premium + trustworthy + regional-language quadrant is open.** No incumbent combines (a) a genuinely premium design, (b) transparent pricing, and (c) first-class regional-language UX.
- **The viral surface is unclaimed.** Kundli matching (Guna Milan) is the highest-intent, most-shared use case in Indian astrology (arranged-marriage family review). It is universally delivered as an ugly table/PDF. A shareable, mobile-native matching card is a wedge.

**Opportunity:** Enter as the *premium, generous, trustworthy* challenger. Give away beautiful free tools to win acquisition + SEO, then monetize the existing high-margin marketplace.

---

## 4. Current Site Audit — astrokraft.in

### 4.1 What exists (content mirrored verbatim — see Appendix A)

- **Brand line:** "India's Trusted Astrology & Gemstone Marketplace"
- **Four marketplace pillars:** Verified Astrologers · Certified Gemstones · Purohits · Vastu Consultant — plus **Vastu Home Plan** and **Kundli Match**.
- **6 featured astrologers** (₹500–₹1,000 consult fees), **12 gemstones**, **5+ purohit poojas**, a **Subh Muharat** (auspicious dates) module, a **Choose Your Zodiac Sign** grid, **testimonials** (English + Bengali), and a near-empty blog.
- **Contact:** +91 6913230255 · astrokraft1@gmail.com · Tripura, Barak Valley, West Bengal · WhatsApp active.
- **Hook:** "Match With Kundli — Rs 99/-", "50+ People consulted today".

### 4.2 Gaps & liabilities (must fix in rebuild)

| Gap | Impact | Fix |
|-----|--------|-----|
| Social links are placeholders (`href="#"`) | Zero social proof / distribution | Real, linked profiles + share infrastructure |
| No contact form, no newsletter capture | No lead funnel | Forms + email/WhatsApp capture on every tool |
| User login not built (empty href) | No retention, no saved kundli | Auth + user dashboard (saved charts, bookings) |
| Stats show "0" (Rating / Clients / Consultations) | Destroys trust | Real numbers or remove until populated |
| Some gemstones priced ₹0.00 | Looks broken | Data hygiene + validation |
| Single empty blog post | No SEO/content engine | Programmatic + editorial content strategy |
| Regional-only framing (NE India) | Caps growth | Pan-India IA + multi-language |
| Mixed unstructured Bengali/English | Inconsistent UX | Proper i18n with language switcher |
| No free interactive tools (only a ₹99 paywall on matching) | No virality, no SEO moat | Free tool suite (the growth engine) |

**Decision:** Keep all existing *content and offerings* (mirrored), but re-architect around a free-tool funnel and a premium brand.

---

## 5. Target Audience & Personas

India is **mobile-first** (the overwhelming majority of sessions will be phone), price-sensitive at the top of funnel, and trust-driven at the point of payment.

| Persona | Who | Primary need | Entry tool | Monetizes via |
|---------|-----|--------------|-----------|---------------|
| **Marriage-matching family** ("Priya's parents") | 45–65, Tier 1–3, often the parent not the bride/groom | Guna Milan score before proceeding | **Kundli Matching** | Detailed compatibility report + astrologer consult |
| **Career/finance seeker** ("Rahul") | 24–35, urban, English/Hinglish | Clarity on job, money, timing | Daily Rashifol, Birth chart | Consult + gemstone |
| **Life-event planner** ("Soumen") | 30–55, traditional | Auspicious date (wedding, griha pravesh, naming) | **Subh Muhurat / Panchang** | Purohit booking |
| **Curious Gen-Z** ("Ananya") | 18–26, social-native | Fun, shareable identity content | Zodiac/compatibility, Tarot | Premium reports, subscriptions |
| **Remedy buyer** ("Mrs. Das") | 35–60 | A trusted fix for a problem | Gemstone recommendation tool | Certified gemstone purchase |

**Language reality:** Launch **English + Hindi**, with **Bengali** retained (existing audience) and **Tamil/Telugu/Marathi** as fast-follow. Regional-language matching output is a genuine differentiator (most incumbents are English-heavy).

---

## 6. Competitive Landscape (Research Findings)

### 6.1 Per-competitor snapshot

| Platform | Model | Free tools | Stickiness / virality | Weakness to exploit |
|----------|-------|------------|----------------------|---------------------|
| **AstroTalk** | Per-minute chat/call with astrologers (dominant, ~85% share) | Limited free; some horoscope | Massive astrologer supply, aggressive retargeting | Cluttered design, weak trust/premium feel |
| **AstroSage** | Free tools + ads + consult | **Best-in-class free Kundli, matching, panchang** (~80% kundli share, 1.2M DAU) | Huge SEO footprint, free tooling | Dated UI; worst billing-transparency complaints |
| **GaneshaSpeaks** | Content + reports + consult | Horoscopes, free kundli, compatibility | Strong editorial SEO | Generic design, ad-heavy |
| **Astroyogi** | Consult + reports | Horoscope, some calculators | App push notifications | Dated, transactional feel |
| **Clickastro** | Paid detailed reports (40+ yrs, ~110M users) | Limited free | Strong in South India, research depth | No premium brand presence, weak top-of-funnel |
| **Co-Star** | Freemium subscription (Western) | Free chart + daily | Push-notification virality, friend compatibility, social-native copy | Paywall resentment; Western-only (not Vedic) |
| **The Pattern** | Subscription (Western) | Free deep personality reads | Eerie-accurate retention loop, friend bonds | Western, not India-relevant |
| **Sanctuary** | Subscription + on-demand readings | Free daily | Live chat readings, polished | Western, US-priced |
| **Tarot.com / Astrology.com** | Ads + reports | Tarot, horoscopes | SEO content volume | Generic, ad-saturated, cream/dated design |

### 6.2 Must-have features for a competitive Indian site (a)

1. **Free Vedic Kundli** (birth chart: Lagna, Rashi, Navamsa, planetary positions, dasha).
2. **Free Kundli Matching / Guna Milan** (Ashtakoot 36-guna, Manglik/Nadi/Bhakoot dosha).
3. **Daily/weekly/monthly Rashifol** for all 12 signs (in multiple languages).
4. **Panchang + Subh Muhurat** (tithi, nakshatra, auspicious timings) — already a brand asset.
5. **Talk-to-astrologer** consult flow (chat/call/booking) with transparent pricing.
6. **Certified gemstone store** with recommendation tool.
7. **Numerology, Tarot, Compatibility** quick tools.
8. **Regional languages** + WhatsApp-native support.

### 6.3 Highest-leverage viral / growth mechanics (b)

1. **Shareable Kundli-Matching result card** — the #1 wedge. Beautiful, mobile-first, one-tap share to WhatsApp/Instagram with the Guna score as the hero. (Incumbents ship tables/PDFs.)
2. **Daily Rashifol as a share asset** — auto-generated per-sign daily card, "share your horoscope" to WhatsApp Status / Instagram Stories.
3. **Programmatic SEO** — a page per sign × per language × per timeframe; per-compatibility-pair (e.g., "Aries + Leo compatibility"); per-city panchang.
4. **WhatsApp distribution** — India's dominant channel; "Get your daily rashifol on WhatsApp" opt-in.
5. **Friend/partner compatibility** (Co-Star-style social loop, localized to Vedic matching).
6. **Free-now, pay-for-depth** — free score + summary; paid detailed report / consult.

### 6.4 Gaps a premium new entrant can exploit (c)

- **Design quality** — be unmistakably more premium than AstroSage/AstroTalk.
- **Trust & transparency** — clear pricing, verified-astrologer credentials, no billing surprises (AstroSage's Achilles heel).
- **Regional-language UX** — first-class Hindi/Bengali/Tamil/Telugu, not English-with-translation.
- **Mobile-native shareables** — treat every result as a social artifact, not a report.
- **Speed** — incumbents are slow and ad-heavy; win Core Web Vitals.

---

## 7. Product Strategy & Positioning

**Positioning statement:** *AstroKraft is the premium, trustworthy home for Vedic astrology in India — where world-class free tools meet verified experts and certified remedies.*

**Funnel:**

```
FREE TOOLS (Kundli, Matching, Rashifol, Panchang)
        │  (SEO + WhatsApp + social shares)
        ▼
ACCOUNT (save charts, daily rashifol, reminders)
        │
        ▼
MONETIZE  →  Astrologer consult  ·  Detailed reports  ·  Certified gemstones  ·  Purohit booking  ·  Vastu
```

**Brand pillars:** Trust · Beauty · Generosity (free tools) · Authenticity (Vedic + verified).

---

## 8. Feature Requirements

Priority key: **P0** = launch-critical · **P1** = fast-follow · **P2** = later.

### 8.1 Free Interactive Tools — the Virality Engine

| Feature | Priority | Description | Data source |
|---------|----------|-------------|-------------|
| **Kundli / Birth Chart** | P0 | Birth details → Vedic chart (Lagna/Rashi/Navamsa, planet positions, houses, dasha, basic predictions). Save to account. | FreeAstrologyAPI + Prokerala |
| **Kundli Matching (Guna Milan)** | P0 | Two birth details → 36-guna Ashtakoot score, Manglik/Nadi/Bhakoot dosha, verdict. **Shareable result card.** | FreeAstrologyAPI (matching) + Prokerala (regional output) |
| **Daily/Weekly/Monthly Rashifol** | P0 | Per-sign horoscope, multi-language, shareable card, WhatsApp opt-in. | Prokerala / VedicAstroAPI |
| **Panchang & Subh Muhurat** | P0 | Daily panchang (tithi, nakshatra, yoga, karana) + auspicious timings; city-aware. Retains existing Subh Muharat module. | Prokerala / VedicAstroAPI |
| **Numerology** | P1 | Name + DOB → life-path / lucky numbers. (Existing "vehicle numerology" extends this.) | Divine API / FreeAstrologyAPI |
| **Tarot (daily card / 3-card)** | P1 | Quick draw + meaning; shareable. | Divine API |
| **Compatibility (sign × sign)** | P1 | Lightweight Gen-Z compatibility, programmatic SEO pages. | Computed + API |
| **Gemstone Recommendation** | P1 | Birth details → recommended gemstone(s) → link to store product. | API + internal rules |
| **Dasha / Sade Sati / Mangal Dosha checkers** | P2 | Single-purpose viral micro-tools, each its own SEO page. | API |

**Tool UX requirements (all tools):**
- Mobile-first form; minimal fields; place-autocomplete for birth city (lat/long/timezone).
- Instant, beautifully formatted result — never a raw table dump.
- **Share** (WhatsApp / Instagram Story / copy link / download image) on every result.
- Soft CTA to **save** (account) and **go deeper** (paid report / consult).
- Result pages are **server-rendered and indexable** where it makes SEO sense.

### 8.2 Marketplace (Monetization Engine) — mirrors current offerings

| Feature | Priority | Notes |
|---------|----------|-------|
| **Talk to Astrologer** | P0 | Directory (filter by specialty/language/price/rating), profile, booking → chat/call/WhatsApp handoff. Transparent per-minute or per-session pricing. |
| **Astrologer profiles** | P0 | Photo, specialty (Vedic/Vastu/Numerology), rating, fee, languages, experience, verified badge. (Seed: the 6 existing astrologers.) |
| **Certified Gemstone Store** | P0 | Catalog (12 existing + expandable), product page (origin, lab certificate, carat, price), cart, checkout. |
| **Purohit Booking** | P1 | Pooja catalog (5 existing + more), book a purohit for rituals. |
| **Vastu Consultation + Vastu Home Plan** | P1 | Service pages + lead form/booking. |
| **Reports (paid)** | P1 | Detailed Kundli / Matching / Career / Year-ahead PDF reports. |

### 8.3 Platform features

| Feature | Priority | Notes |
|---------|----------|-------|
| **Auth & user dashboard** | P0 | Email/phone OTP + Google. Saved kundlis, bookings, reports, rashifol prefs. |
| **Multi-language (i18n)** | P0 | EN + HI at launch; BN retained; TA/TE/MR fast-follow. `next-intl` or `next-i18next`. |
| **Search** | P1 | Global search (astrologers, gemstones, articles, tools) — shadcn Command palette. |
| **Blog / content hub** | P1 | Editorial + programmatic SEO articles (Tracing Beam reading UI). |
| **Reviews & ratings** | P1 | On astrologers, gemstones, purohits. |
| **WhatsApp integration** | P0 | Floating CTA (retain `wa.me/916913230255`), daily-rashifol opt-in, booking handoff. |
| **Notifications** | P2 | Web push for daily rashifol / panchang. |
| **Admin** | P1 | Manage astrologers, gemstones, content, muhurat dates. |

---

## 9. Astrology API Integration Plan (Research Findings)

### 9.1 Provider evaluation

| API | Free tier | Auth | Coverage | Languages | Verdict |
|-----|-----------|------|----------|-----------|---------|
| **FreeAstrologyAPI.com** | **80 req/day, free forever, no card** | API key | Full Vedic: kundli, **matching**, dasha, panchang | EN | **Primary free engine** for kundli + matching |
| **Prokerala** | **5,000 credits/month, free forever, no card** | OAuth2 (client id/secret) | Kundli, matching, horoscope, panchang, muhurat, numerology | **5 Indian languages** | **Primary for regional output + panchang/rashifol** |
| **VedicAstroAPI** | 14-day trial (no card) | API key | Full Vedic suite | **21 languages** (best regional) | Paid upgrade for scale + max language coverage |
| **Divine API** | 14-day trial (card required) | API key | Astrology + **numerology + tarot** | EN + some | Best for tarot/numerology engagement tools |
| **AstrologyAPI.com** | 50 one-time sandbox credits | Basic auth | Full Vedic | Multi | PAYG; fallback only |
| **Aztro** | Free | None | Western sun-sign daily only | EN | **Avoid** (not Vedic, unmaintained) |

### 9.2 Recommended stack

- **Kundli + Kundli Matching (P0):** FreeAstrologyAPI.com (free engine) → **Prokerala** for Hindi/Tamil/Telugu/Bengali matching output (critical for the viral share card).
- **Daily Rashifol + Panchang + Muhurat (P0):** Prokerala (Indian languages) with VedicAstroAPI as the scale/paid upgrade.
- **Tarot + Numerology (P1):** Divine API.
- **Resilience:** abstract all providers behind a single internal `lib/astrology/` service layer with a normalized response shape, so providers can be swapped without touching UI.

### 9.3 Staying inside free tiers at scale (critical)

- **Cache aggressively.** Kundli and matching results are deterministic for the same birth inputs → **cache by a hash of normalized birth data** (date, time, lat/long). Redis/Upstash + Next.js Data Cache. A cached matching result costs **zero** API calls.
- **Pre-generate** daily rashifol once per sign per language per day (12 × N languages = a few dozen calls/day, well within free limits) and serve statically (ISR).
- **Rate-limit** tool submissions per IP/session to prevent abuse of free quotas.
- **Queue + backoff** on 429s; fail over to secondary provider.
- Upgrade to a paid Prokerala/VedicAstroAPI tier only when traffic justifies it — by then the funnel is monetizing.

---

## 10. Information Architecture & Sitemap

```
/                         Home
/astrologers              Directory (filter: specialty, language, price, rating)
/astrologers/[slug]       Astrologer profile + booking
/gemstones                Store (catalog)
/gemstones/[slug]         Product page
/purohits                 Purohit / pooja catalog
/purohits/[slug]          Pooja detail + booking
/vastu                    Vastu consultation + Vastu Home Plan
/tools                    Free tools hub
  /tools/kundli           Free Kundli / birth chart
  /tools/matching         Kundli Matching (Guna Milan)   ← hero growth surface
  /tools/horoscope        Rashifol hub
  /tools/horoscope/[sign] Per-sign (daily/weekly/monthly)   ← programmatic SEO
  /tools/panchang         Panchang + Subh Muhurat
  /tools/numerology       Numerology
  /tools/tarot            Tarot
  /tools/compatibility    Sign compatibility hub
  /tools/compatibility/[a]-[b]  Pair pages   ← programmatic SEO
  /tools/gemstone-finder  Gemstone recommendation
/horoscope/[sign]         (alias / SEO landing)
/blog, /blog/[slug]       Content hub
/about                    Brand story, trust, team
/contact                  Contact + form + map + WhatsApp
/account                  Dashboard (saved kundlis, bookings, reports, prefs)
/auth/(login|signup)      Auth
/legal/(privacy|terms|refund)  Policies (trust)
/sitemap.xml /robots.txt  Generated
```

**Navigation:** Astrologers · Gemstones · Free Tools (mega-menu) · Panchang · Blog · [Language switcher] · [Theme toggle] · [Talk to Astrologer CTA] · [Account].

---

## 11. Key User Flows

**A. Viral matching flow (the wedge):**
`Land on /tools/matching (from Google/WhatsApp) → enter two birth details → animated reveal of Guna score (e.g., 28/36) + verdict → beautiful shareable card → [Share to WhatsApp] / [Download] → soft CTA "Get full compatibility report ₹X" or "Talk to an astrologer" → (optional) save & create account.`

**B. Consult flow:**
`Tool result or /astrologers → filter → profile → choose chat/call → login/OTP → pay → connect (or WhatsApp handoff).`

**C. Gemstone flow:**
`Gemstone finder tool OR /gemstones → product page (certificate, origin) → add to cart → checkout → order tracking.`

**D. Muhurat/Purohit flow:**
`/tools/panchang or /purohits → pick auspicious date / pooja → book purohit → confirmation + WhatsApp.`

---

## 12. Technical Architecture

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | **Next.js (App Router)** | RSC, ISR, route handlers, Metadata API for SEO |
| Language | **TypeScript** (strict) | |
| Styling | **Tailwind CSS** + CSS variables | Tokens from `DESIGN.md`; light/dark via `class` strategy |
| Components | **shadcn/ui** (Radix) + **Aceternity UI** | shadcn = forms/dialogs/nav; Aceternity = hero/motion accents |
| Animation | **Framer Motion** | Subtle, `whileInView`, respects `prefers-reduced-motion` |
| Theming | `next-themes` | Light/dark, no flash (SSR-safe) |
| i18n | `next-intl` | EN/HI/BN (+TA/TE/MR), locale routing, hreflang |
| Auth | NextAuth/Auth.js or Clerk | Phone OTP (India) + Google |
| DB | Postgres (Neon/Supabase) + Prisma | Astrologers, gemstones, bookings, users, saved charts |
| Cache | Upstash Redis | Astrology API result caching (by birth-data hash) |
| Astrology data | FreeAstrologyAPI + Prokerala (+ Divine, VedicAstroAPI) | Behind `lib/astrology/` abstraction |
| Payments | Razorpay | India-first (UPI, cards, netbanking) |
| Media/images | next/image + CDN | Gemstone photos, astrologer avatars |
| Search | Built-in + (optional) Typesense/Algolia | |
| Analytics | GA4 + Vercel Analytics + event tracking | Funnel + share tracking |
| Hosting | Vercel | Edge + ISR + image optimization |
| Notifications | WhatsApp Business API / web push | Daily rashifol opt-in |

**Folder shape (suggested):**
```
app/[locale]/(marketing|tools|account|...)/...
components/ (ui/ shadcn · aceternity/ · sections/ · shared/)
lib/astrology/ (providers, normalizers, cache)
lib/seo/ (imports seo.ts)
content/ (blog MDX), messages/ (i18n), prisma/
```

---

## 13. SEO & Virality Strategy

(Implemented via `seo.ts` — see that file for the metadata/JSON-LD config.)

- **Programmatic pages:** per-sign horoscope (× language × daily/weekly/monthly), per-pair compatibility, per-city panchang, per-gemstone, per-astrologer. Each gets unique title/description, canonical, and JSON-LD.
- **Structured data:** `Organization`, `LocalBusiness`, `Product` (gemstones), `Article` (blog), `FAQPage`, `BreadcrumbList`, `AggregateRating`/`Review` (testimonials).
- **hreflang** for every localized route; `x-default` to English.
- **Share infrastructure:** dynamic **OG images** (`@vercel/og` / `next/og`) per result — the matching score, the daily rashifol, etc., rendered as branded images for WhatsApp/Instagram previews.
- **Core Web Vitals** as a ranking + UX lever (see §15).
- **Internal linking:** tools ↔ astrologers ↔ gemstones ↔ blog.
- **WhatsApp-first distribution:** every share defaults to a WhatsApp-friendly link + image.

---

## 14. Monetization

1. **Astrologer consultations** — per-minute/per-session (primary, like AstroTalk) with transparent pricing.
2. **Certified gemstones** — e-commerce margin (existing high-trust offering).
3. **Paid detailed reports** — Kundli, Matching, Career, Year-ahead PDFs (the upsell at the end of every free tool).
4. **Purohit & Vastu bookings** — service commission.
5. **Premium subscription (P2)** — daily personalized rashifol, unlimited matching depth, priority consults.
6. **Retain ₹99 matching upsell** as the "full report" tier *after* the free score (free score = acquisition; ₹99 = conversion).

---

## 15. Performance, Accessibility & Responsiveness

- **Responsive:** mobile-first; verified across 360px → 1920px+; touch targets ≥ 44px; thumb-reachable primary CTAs; tested on low-end Android (the median Indian device).
- **Performance budgets:** LCP < 2.5s (4G), CLS < 0.1, INP < 200ms; route-level code-splitting; `next/image`; cache astrology results; ISR for content.
- **Accessibility:** WCAG 2.1 AA — both themes meet contrast (verified in `DESIGN.md`), full keyboard nav, focus-visible, `prefers-reduced-motion` disables non-essential Framer Motion, semantic landmarks, alt text, accessible forms.
- **Resilience:** graceful API-failure states (skeletons, retries, friendly errors), offline-tolerant PWA shell.

---

## 16. Analytics & Success Metrics (KPIs)

| Category | Metric |
|----------|--------|
| Acquisition | Organic sessions, tool landing-page traffic, share-driven sessions |
| Virality | Shares per result (esp. matching), WhatsApp opt-ins, viral coefficient (K) |
| Engagement | Tool completion rate, accounts created, saved kundlis, daily-rashifol retention |
| Conversion | Tool → consult rate, tool → gemstone rate, report purchases, booking value |
| Quality | Core Web Vitals (mobile), error rate, API cache hit-rate |
| Trust | Review volume/score, refund/complaint rate (beat AstroSage) |

---

## 17. Roadmap / Phasing

**Phase 0 — Foundations (Weeks 1–3):** Design system (DESIGN.md → tokens), Next.js scaffold, theming, i18n shell, component library (shadcn + Aceternity), `seo.ts` wired in, content migration.

**Phase 1 — MVP launch (Weeks 4–8):** Home, Astrologer directory + profiles, Gemstone store, **Free Kundli + Kundli Matching with shareable card**, Daily Rashifol, Panchang/Muhurat, auth, WhatsApp CTA, core SEO + OG images. *(This is the viral + monetization core.)*

**Phase 2 — Growth (Weeks 9–14):** Numerology, Tarot, Compatibility programmatic pages, gemstone finder, blog/content engine, reviews, paid reports, account dashboard, Hindi + Bengali fully localized.

**Phase 3 — Scale (Weeks 15+):** Tamil/Telugu/Marathi, web push, premium subscription, purohit/vastu booking depth, admin tooling, performance hardening, PWA.

---

## 18. Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Free API quota exhaustion | Hash-keyed caching, ISR pre-gen, rate-limiting, multi-provider failover, paid upgrade when monetizing |
| Astrologer supply (vs AstroTalk's scale) | Start curated/verified (quality > quantity), onboard regionally |
| Trust / accuracy skepticism | Verified badges, credentials, transparent pricing, reviews |
| Regional-language QA burden | Launch EN/HI solid; add languages with native review |
| Calculation correctness (Vedic) | Trust established API providers; show methodology; never hand-roll ephemeris |
| Payment/refund disputes | Transparent pricing + clear refund policy (AstroSage's weakness = our strength) |

---

## Appendix A — Verbatim Content Mirror (astrokraft.in)

> Preserved exactly for migration. Same copy, new home.

- **Top bar / contact:** "+91 6913230255", "astrokraft1@gmail.com", "Tripura, Barak valley, West Bengal"
- **Tagline:** "Astrokraft - Your Guide for Life ✨ | Daily Rashifol | Subh Muharat | Gemstone Collection | Astrology Services | Vastu Consultation"
- **Promo:** "Match With Kunduli Rs: 99/-"
- **Brand / hero:** "Astrokraft" · "4.5 / 5 Rating" · "India's Trusted Astrology & Gemstone Marketplace" · CTAs: "Talk to Astrologer", "Explore Gemstones" · "50+ People consulted today"
- **Stat labels:** "Rating", "Happy Clients", "Expert Astrologers", "Consultations"
- **Our Services:** Verified Astrologer · Certified Gemstone · Purohit · Vastu Consultant · VASTU HOME PLAN · Kundli Match
- **Featured Astrologers:** "Meet our experts for guidance & success." — BIPRANGSHU BHATTACHARJEE (Vastu, 4.5, ₹1,000.00) · Rishi Acharya (Vedic, 4.2, ₹500.00) · ACHRYA BHAKTA VEDANTA (Vedic, 4.8, ₹500.00) · ACHARYA SNEHA (Vedic, 4.2, ₹500.00) · ACHARYA ABHI SHASTRI (Vedic, 4.2, ₹500.00) · Astrologer Indrajit Dutta (Vedic, 4.5, ₹500.00)
- **Gemstone Collection:** "Discover powerful gemstones to enhance your life and energy." — Yellow Zircon · Blue Zircon · ZIRCON · Ruby · PERIDOT · TOPAZ · DIAMOND · GOMED · CITRINE · Amethyst · RED CORAL(PROBAL) · OPAL
- **Featured Purohits:** "Book experienced purohits for all your rituals." — ISHAN POOJA for NEW CONSTRUCTION · VASTU SHANTI POOJA · MAA BAGALAMUKHI POOJA · CAR BOOKING CONSULTATION (Vehicle Numerology Consultation) · NEW BUSINESS INAUGARATION POOJA
- **Why Choose Us:** "Your trusted astrology & gemstone partner" — Verified Astrologers ("100% trusted and experienced experts") · Certified Gemstones ("Authentic & lab-tested gemstones") · Easy Consultation ("Quick & smooth booking experience") · 24/7 Support ("Always available whenever you need guidance.")
- **Choose Your Zodiac Sign:** "Explore your horoscope and astrology insights." — Aries · Taurus · Gemini · Cancer · Leo · Virgo · Libra · Scorpio · Sagittarius · Capricorn · Aquarius · Pisces
- **Subh Muharat:** "Find the most auspicious timings for your important events." — 01 APR: GRIHAROMBHO (গৃহারম্ভ) – House Construction Start · 01 APR: মুখ্যান্নপ্রাশন · 01 MAY: Shubho Bibaho Dates BOISHAK: 1433 (2026-2027)
- **What Our Clients Say:** "Real experiences from our happy users" —
  - Rahul Sharma: "Very accurate predictions and detailed explanations. I was confused about my career, but after consultation I got complete clarity and confidence to move forward."
  - অভিজিৎ পাল: "খুবই নির্ভরযোগ্য এবং সঠিক পরামর্শ। আমার জীবনের গুরুত্বপূর্ণ সিদ্ধান্ত নিতে অনেক সাহায্য পেয়েছি। পরিষেবাটি সত্যিই প্রশংসনীয়।"
  - Priya Das: "The gemstone recommendation worked surprisingly well. I noticed positive changes in my personal and professional life within a short time."
  - সৌমেন চ্যাটার্জী: "খুব ভালো অভিজ্ঞতা। অ্যাস্ট্রোলজার খুব সহজভাবে সবকিছু বুঝিয়ে দিয়েছেন এবং আমার সমস্যার সঠিক সমাধান দিয়েছেন।"
- **Our Recent Update:** blog — "astrology solutions designed to guide your life." (e.g., "Cosmic Vastu Guide")

---

*End of PRD. See `DESIGN.md` for the complete visual system and `seo.ts` for SEO configuration.*
