# AstroKraft — Project Overview

## About the Project

AstroKraft is a premium, bilingual-first pan-India astrology and gemstone marketplace. Rebuilt from a regional PHP site into a modern Next.js application, AstroKraft operates on a **two-engine model**:

1. **Virality / Acquisition Engine** — a suite of genuinely free, beautiful, shareable astrology tools (Kundli, Kundli Matching / Guna Milan, Daily Rashifol, Panchang, Numerology, Tarot, Compatibility) powered by free-tier astrology APIs and engineered for organic SEO + social sharing.
2. **Monetization Engine** — verified astrologer consultations, certified gemstone e-commerce, purohit booking, and Vastu consultation services converted from free-tool traffic.

The single highest-leverage opportunity: **the Kundli-matching result is the most-trafficked, most-social page in Indian astrology, yet every incumbent ships it as a data table or PDF.** AstroKraft ships it as a gorgeous, mobile-native, shareable result card — the centerpiece of the growth strategy.

---

## The Problem It Solves

Online astrology in India is dominated by platforms with cluttered UIs, opaque billing, and no regional-language support. The premium + trustworthy + regional-language quadrant is open. AstroKraft enters as the premium, generous, trustworthy challenger — giving away beautiful free tools to win acquisition + SEO, then monetizing the existing high-margin marketplace (consultations, gemstones, pujas).

---

## Goals (12 Months)

| # | Goal | Target |
|---|------|--------|
| G1 | Establish pan-India reach (beyond NE India) | Traffic from all major states; 3+ languages live |
| G2 | Build a viral free-tool funnel | Kundli + Matching = primary acquisition channel |
| G3 | Premium brand perception | Design quality clearly above AstroSage/AstroTalk |
| G4 | Convert free users to paid consults/gemstones | Tool → consult conversion measurable & rising |
| G5 | Own long-tail astrology SEO | Programmatic horoscope/panchang/compatibility pages |
| G6 | Full responsiveness & performance | Core Web Vitals "Good" on mobile (the dominant device) |

---

## Pages

```
/                              → Homepage
/astrologers                   → Astrologer directory (filter: specialty, language, price, rating)
/astrologers/[id]              → Individual astrologer profile + booking
/gemstones                     → Gemstone store catalog
/gemstones/[slug]              → Product page (origin, lab certificate, carat, price)
/purohits                      → Purohit / pooja catalog
/purohits/[slug]               → Pooja detail + booking
/vastu                         → Vastu consultation + Vastu Home Plan
/tools                         → Free tools hub
  /tools/kundli                → Free Kundli / Birth Chart
  /tools/matching              → Kundli Matching (Guna Milan) ← hero growth surface
  /tools/horoscope             → Rashifol hub
  /tools/horoscope/[sign]      → Per-sign (daily/weekly/monthly) ← programmatic SEO
  /tools/panchang              → Panchang + Subh Muhurat
  /tools/numerology            → Numerology
  /tools/tarot                 → Tarot
  /tools/compatibility         → Sign compatibility hub
  /tools/compatibility/[a]-[b] → Pair pages ← programmatic SEO
  /tools/gemstone-finder       → Gemstone recommendation
/horoscope/[sign]              → SEO landing alias
/blog, /blog/[slug]            → Content hub
/about                         → Brand story, trust, team
/contact                       → Contact + form + map + WhatsApp
/account                       → Dashboard (saved kundlis, bookings, reports, prefs)
/auth/(login|signup)           → Auth
/legal/(privacy|terms|refund)  → Policies
/sitemap.xml /robots.txt       → Generated
```

---

## Navigation

Sticky top navbar. Celestial Royale theme with transparent background over hero, thin gold bottom border.

```
Astrologers · Gemstones · Free Tools (mega-menu) · Panchang · Blog · [Language Switcher] · [Talk to Astrologer CTA] · [Account]
```

Full width layout on all pages. Floating WhatsApp FAB in bottom-right corner.

---

## Core User Flows

### A. Viral Matching Flow (The Wedge)

1. User lands on `/tools/matching` from Google, WhatsApp share, or social link
2. Enters two birth details (date, time, location with autocomplete)
3. Animated reveal of Guna score (e.g., 28/36) + Manglik/Nadi/Bhakoot dosha verdict
4. Beautiful shareable card generated — one-tap share to WhatsApp / Instagram / download
5. Soft CTA: "Get full compatibility report ₹99" or "Talk to an astrologer"
6. Optional: save results & create account

### B. Consult Flow

Tool result or `/astrologers` → filter by specialty/language/price → astrologer profile → choose chat/call → login/OTP → pay → connect (or WhatsApp handoff).

### C. Gemstone Flow

Gemstone finder tool OR `/gemstones` → product page (certificate, origin) → add to cart → checkout via Razorpay.

### D. Muhurat / Purohit Flow

`/tools/panchang` or `/purohits` → pick auspicious date / pooja → book purohit → confirmation + WhatsApp.

---

## Target Users

| Persona | Who | Primary Need | Entry Tool | Monetizes Via |
|---------|-----|--------------|-----------|---------------|
| **Marriage-matching family** | 45–65, Tier 1–3 | Guna Milan score | Kundli Matching | Detailed report + consult |
| **Career/finance seeker** | 24–35, urban | Clarity on timing | Daily Rashifol, Birth chart | Consult + gemstone |
| **Life-event planner** | 30–55, traditional | Auspicious date | Subh Muhurat / Panchang | Purohit booking |
| **Curious Gen-Z** | 18–26, social-native | Shareable identity content | Zodiac/compatibility, Tarot | Premium reports |
| **Remedy buyer** | 35–60 | Trusted fix | Gemstone recommendation | Certified gemstone |

**Language reality:** Launch **English + Hindi**, retain **Bengali** (existing audience). Tamil/Telugu/Marathi as fast-follow.

---

## Features In Scope

### Free Interactive Tools (Acquisition Engine)
- Kundli / Birth Chart (Lagna, Rashi, Navamsa, planet positions, houses, dasha)
- Kundli Matching / Guna Milan (36-guna Ashtakoot, dosha, shareable result card)
- Daily/Weekly/Monthly Rashifol (per-sign, multi-language, shareable)
- Panchang & Subh Muhurat (daily panchang, tithi, nakshatra, auspicious timings)
- Numerology (name + DOB → life-path / lucky numbers)
- Tarot (daily card / 3-card draw)
- Sign Compatibility (programmatic SEO pages)
- Gemstone Recommendation (birth details → recommended stones → store link)

### Marketplace (Monetization Engine)
- Talk to Astrologer directory + profiles + booking
- Certified Gemstone Store with cart and checkout
- Purohit Booking for rituals and poojas
- Vastu Consultation + Vastu Home Plan
- Paid detailed reports (Kundli, Matching, Career, Year-ahead PDFs)

### Platform
- Multi-language i18n (EN, HI, BN + fast-follow TA/TE/MR)
- Auth (Phone OTP + Google)
- User dashboard (saved kundlis, bookings, reports)
- WhatsApp integration (floating CTA, daily rashifol opt-in, booking handoff)
- Blog / content hub (editorial + programmatic SEO)
- Dynamic sitemap and robots.txt

---

## Features Out of Scope

- Native mobile apps (PWA first)
- Live video consultation infrastructure (chat/call handoff instead)
- In-house astrologer CRM (lightweight admin only)
- Multiple simultaneous languages per session (one locale per route)
- Payment subscriptions (P2 feature)
- Browser extension
- Custom ephemeris calculations (always use verified APIs)

---

## Success Criteria

1. **Performance**: LCP under 2.5s on mobile, CLS < 0.1, INP < 200ms.
2. **Deterministic Caching**: 0 redundant API calls for identical birth details via hash-keyed caching.
3. **Engagement**: Successful generation and share of the Guna Milan result card.
4. **Checkout**: Razorpay payment processing completes without error.
5. **SEO**: Sitemap indexes all static and dynamic routes with hreflang alternates.
6. **Brand**: UI visually premium and consistent — clearly above AstroSage/AstroTalk.
