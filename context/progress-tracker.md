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

- [x] 04 Free Kundli / Birth Chart
- [x] 05 Kundli Matching / Guna Milan (shareable result card)
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
- **Gemstone catalog images optimized**: Compressed 12 gemstone WebP images from 4K/high-res lossless (~3.5 MB each) to optimized, low-resolution lossy WebPs (512x512, ~10-25 KB each), reducing total directory size by 99% (from 40 MB to <300 KB).
- **Gemstone mobile card tinting**: Implemented individual `GemstoneCard` components with static colored borders and top-left radial gradients corresponding to each gemstone's specific color. This provides an instantly recognizable color-coded outline and aura on touch devices where hover states do not trigger, while supporting interactive scaling/glows on desktop.
- **3D Globe assets localized and cached**: Downloaded Earth texture and bump/topology maps from unpkg CDN to local `/public/assets/globe/`, resized them from 4K to WebP formats (193 KB and 14 KB respectively), and redirected the R3F `<Scene>` to load them locally.
- **Vedic calculation engines (Phase 1)**: Added custom theme-compliant input, label, and select components inside `components/ui/` to avoid third-party script installation issues on local dev environment shells.
- **Geocoding city lookup autocomplete**: Implemented debounced (500ms) client-side search autocomplete powered by OpenStreetMap's free Nominatim Search API, auto-resolving to lat/lon coordinates and defaulting the timezone offset to `+5.5` for any locations inside India.
- **Dynamic North Indian SVG Lagna chart**: Built an interactive responsive SVG rendering diamond house lines, with dynamic placement of rashi sign numbers and grouped planet combinations.
- **Free Tools Hub (/tools)**: Built a separate localized hub page listing active tools (Free Kundli, Kundli Matching) and upcoming calculators, routing all main menu and footer links to this page.
- **FreeAstrologyAPI Matchmaking Endpoint Fix**: Changed the API endpoint from `/match-making` to `/match-making/ashtakoot-score`, updated the request payload to split birth details into `male` and `female` objects, and updated response parsing to dynamically map the `output` object.
- **Vedic Tool Calculation Logging**: Added console logging for computed results on both the server-side API routes (`/api/astrology/matching` and `/api/astrology/kundli`) and client-side components (`MatchingContainer` and `KundliContainer`) to improve developer debugging.
- **Homepage Free Tools Preview**: Created a new `FreeToolsPreview` section displayed directly after the gemstones grid on the main page, showcasing the active tools (Kundli, Guna Milan) and forthcoming calculators using HSL border gradients, hover scaling, and spotlight interactive effects.

---

## Notes

- Local dev server runs on port 3000.
- Dynamic sitemap serves at `/sitemap.xml`, robots at `/robots.txt`.
- GSC domain ownership verified at DNS registrar level via GoDaddy — `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` can remain empty.
- Facebook link: `https://www.facebook.com/people/Astrokraft/61558832911971/`
- Instagram link: `https://www.instagram.com/astro.kraft/`
- WhatsApp: `wa.me/916913230255`
