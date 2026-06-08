# Progress Tracker

Update this file after every completed feature. Any AI agent reading this should immediately know what is done, what is in progress, and what is next.

---

## Current Status

**Phase:** Phase 1 — MVP Launch (beginning Free Astrology Tools)
**Last completed:** Phase 0 — Foundations (design system, homepage, astrologer directory, SEO/sitemap, scroll optimizations)
**Next:** Free Kundli / Birth Chart Engine + Kundli Matching (Guna Milan) Engine

---

## Progress

### Phase 0 — Foundations

- [x] 01 Design System & Scaffold (globals.css tokens, font loading, shadcn/ui, Aceternity, Lenis, i18n routing)
- [x] 02 Homepage (Hero, Services Bento, Featured Astrologers globe + grid, Zodiac tiles, Testimonials, Footer, WhatsApp FAB)
- [x] 03 Astrologer Directory & Profiles (team listing, individual profiles, globe modal, centralized JSON data)

### Phase 1 — MVP Launch

- [ ] 04 Free Kundli / Birth Chart
- [ ] 05 Kundli Matching / Guna Milan (shareable result card)
- [ ] 06 Daily Rashifol / Horoscope
- [ ] 07 Panchang & Subh Muhurat
- [ ] 08 Auth & User Dashboard

### Phase 2 — Growth

- [x] 09 Gemstone Store
- [ ] 10 Numerology & Tarot
- [ ] 11 Compatibility Pages (Programmatic SEO)
- [ ] 12 Purohit & Vastu Booking
- [ ] 13 Blog & Content Hub
- [ ] 14 Reviews & Ratings

### Phase 3 — Scale

- [ ] 15 Additional Languages (Tamil, Telugu, Marathi)
- [ ] 16 WhatsApp Distribution
- [ ] 17 Premium Subscription
- [ ] 18 Admin Portal

---

## Decisions Made During Build

- **Three-letter locale code for Hindi**: Used `hin` instead of `hi` to avoid route collision with English `/hi` path.
- **Static i18n dictionaries**: Switched from dynamic imports to static JSON imports to prevent Turbopack runtime 404 errors.
- **Dark theme forced**: Currently using `forcedTheme="dark"` globally; light mode preserved in tokens but not active.
- **Social links trimmed**: Only Facebook, Instagram, and WhatsApp profiles are active. Twitter, YouTube, LinkedIn removed.
- **City fields removed**: All astrologer `"city"` properties removed from JSON database. Location rendered as static "India" globally.
- **Pointer highlight CSS-only**: Rewrote pointer highlight from JS ResizeObserver to pure CSS percentages to prevent font-loading animation hangs.
- **GPU compositor layers**: Bento cards promoted to GPU layers with will-change-transform and translate3d to prevent scroll lag.
- **Hover-disable on scroll**: Body-level `.disable-hover` class prevents pointer-event thrashing during Lenis scroll events.
- **3D globe gating**: IntersectionObserver pauses R3F frame loop when globe is off-screen, saving ~360 React updates/sec.
- **WebGL canvas-reveal context optimization**: Configured CardSpotlight to default to a high-performance CSS dot-matrix spotlight to prevent scroll/hover lag and WebGL context crashes when multiple cards are displayed in a grid.
- **Bilingual gemstone catalog**: Established a central `gems.json` database and reusable `GemstoneGrid` component mapped with English, Hindi, and Bengali translations.
- **Gemstone names simplified**: Removed "Natural" (English), "प्राकृतिक" (Hindi), and "প্রাকৃতিক" (Bengali) from all gemstone names in `gems.json` per user feedback.


---

## Notes

- Local dev server runs on port 3000.
- Dynamic sitemap serves at `/sitemap.xml`, robots at `/robots.txt`.
- GSC domain ownership verified at DNS registrar level via GoDaddy — `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` can remain empty.
- Facebook link: `https://www.facebook.com/people/Astrokraft/61558832911971/`
- Instagram link: `https://www.instagram.com/astro.kraft/`
- WhatsApp: `wa.me/916913230255`
