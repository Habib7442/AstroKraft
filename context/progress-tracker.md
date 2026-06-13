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
- [x] 03.5 PWA Integration (Welcome/Splash screen branding, background color matches logo, service worker caching, and localized offline pages)

### Phase 1 — MVP Launch

- [x] 04 Free Kundli / Birth Chart
- [x] 05 Kundli Matching / Guna Milan (shareable result card)
- [ ] 06 Daily Rashifol / Horoscope
- [x] 07 Panchang & Subh Muhurat (Real-API integration with Prokerala)
- [ ] 08 Auth & User Dashboard

### Phase 2 — Growth

- [x] 09 Gemstone Store
- [ ] 10 Numerology & Tarot
- [ ] 11 Compatibility Pages (Programmatic SEO)
- [ ] 12 Purohit & Vastu Booking
- [x] 13 Blog & Content Hub (Coming Soon placeholder page)
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
- **Founder Badge & Brand Trademarks**: Removed "Founder" designation from Biprangshu Bhattacharjee's badge on the bento grid section, and added trademark superscript tag (`™`) next to the "AstroKraft" brand name across the header, footer, 3D globe loading fallback, and shareable compatibility result card.
- **Modern Celestial Theme & Hero Redesign**: Converted the site to a premium light theme with warm off-white and `#E2C27A` (soft gold/yellow) as the primary styling hue. Redesigned the hero section by centering the title, embedding trust anchors, and shifting away from neo-brutalism.
- **Hero & Drawer Background Softening**: Softened the primary hero section background to a light golden cream gradient (`linear-gradient(to bottom, #FFE896 0%, #FFFDF0 100%)`) to reduce eye strain on mobile devices and ensure readability. Lightened the mobile drawer navigation background to `#FFF9E6` to match.
- **Modern High-Contrast Notifications**: Refactored the live activity notification toasts to render using custom high-contrast JSX blocks. The toast cards use clean thin borders and soft shadows with explicit dark text to guarantee 100% legibility on white cards.
- **Hero Section Social Proof & Rating**: Integrated a social proof avatar group and a beautiful 4.9/5 star rating pill directly below the title block/spinning zodiac wheel and above the subtitle description in the Hero section. Features overlapping customer avatars, five drop-shadowed gold stars, and localized trust text for English, Hindi, and Bengali.
- **WhatsApp Consultation Form Page**: Designed a dedicated `/[locale]/consultation` route replacing the direct WhatsApp links. The page provides a rounded, modern two-step form including selection of 6 categories (Career, Marriage, Finance, Health, Kundli, Education) and input of Name, DOB, Time, and Place of birth (featuring a top Indian cities select field with Silchar, Karimganj, and Hailakandi at the top). Restyled the layout to remove neo-brutalist heavy borders/shadows, using clean input borders and soft focus effects.
- **Astrologers Bento Grid Restyled**: Converted the "Meet Our Master Astrologers" bento grid section to follow a clean, modern aesthetic with thin borders (`border border-zinc-150`) and soft shadows (`shadow-sm`). Badges, language indicators, star ratings, and CTA buttons are now high-contrast tags with solid backgrounds, ensuring 100% legibility on light layouts.
- **Globe Modal Card Styled to match Bento Grid**: Updated the astrologer details modal card that pops up when clicking on globe markers to use the same dynamic, colorful modern styling as the bento grid cards. The modal background dynamically updates to the specific pastel color mapping of each astrologer, while sub-badges and fee slots use a clean white background with thin borders and soft shadows for optimal contrast and aesthetic consistency.
- **Gemstone Grid & Catalog Page Restyled**: Converted the "Explore Certified Gemstones" grid and dedicated `/gemstones` page from the dark-mode theme to the warm light modern theme. Card backgrounds are dynamically colored with soft pastel tints mapping to each gemstone's physical color signature. Details and buttons are rendered on high-contrast cards with thin borders, black text, and soft shadow effects to ensure 100% legibility.
- **Free Tools Page Restyled**: Converted the interactive Vedic calculation tools page (`/tools`) from a dark-themed layout to our warm off-white and pastel-toned light theme. Active tools cards are styled with distinct signature pastel backgrounds, thin borders, and soft shadows.
- **Footer Restyled**: Converted the site footer component to a warm, distinct pastel yellow background (`bg-[#FFF9E6]`) and clean modern layout. Added a thin top border (`border-t border-zinc-200`), updated headers and navigation links to use clean bold text with high legibility, matched the brand logo with the header's design, and turned social links into rounded button modules with soft shadow styling.
- **PWA Welcome Screen & Offline Support**: Implemented progressive web app capabilities, registering a custom service worker (`sw.js`) to handle asset caching and localized offline fallback views. Programmatically resized `logo.png` into compliant `192x192` and `512x512` web icons and configured `site.webmanifest` to set background and theme colors to `#e7dcce` (matching the logo background) for a seamless native splash screen.
- **Hero & Navbar Contrast Enhancements**: Adapted the header navigation links, logo elements, language switcher, and mobile menu trigger button to dynamically switch to high-contrast white and gold styles (`text-white`, `#E2C27A`) when loaded on the homepage over the dark Midnight Indigo -> Royal Violet hero gradient background, while retaining the standard high-contrast black/dark styling on internal light-themed pages.
- **3D Globe Visibility & Lighting Fix**: Brightened the 3D Earth globe mesh inside the dark hero section by adding a camera-facing key/fill directional light (`position={[0, 0, config.radius * 6]}` with `0.65` intensity), adjusting ambient light to `1.4` and point light to `2.5`, and setting a custom deep violet emissive color (`#241852`) matching the hero background. Keeps the Earth clearly visible without needing a separate thick orange border/atmosphere halo.
- **Astrologer Profile Page Refactored**: Redesigned both the left profile metadata column and the right profile details columns of `astrologer-profile-client.tsx` to remove all neo-brutalist black borders and drop shadows, upgrading the interface to the premium modern celestial aesthetic. Fixed a button syntax error in the copy address section.
- **Service Card WebP Icons & Hero Palette Update**: Updated homepage service cards to render WebP service icons from `lib/data/services.json` through `next/image`, aligned the Services Bento cards with the same shared service icon dataset, and changed the hero background to `linear-gradient(135deg, #0A1A3F, #103A4A)` per the deep navy to teal direction.
- **Zodiac Wheel Cache Bust**: Added a version query to all `/assets/zodiac_wheel.png` render paths and bumped the service worker cache name to `astrokraft-cache-v3` so replaced wheel artwork is not served from the old PWA image cache.
- **Why Choose Section Added**: Extracted why choose features into a new trust metrics component right after the Premium Services row with customizable translations, vertical separators, and a specialized Vedic divider.
- **Consultation Selector Modal**: Integrated the 6 categories list directly inside the Hero component and built a pop-up details modal overlay that triggers when clicking a category, validating input details before redirecting users to WhatsApp.
- **Floating WhatsApp FAB**: Implemented a global fixed floating action button (FAB) using `/social-icons/whatsapp.png` mapped with localized prefilled chat texts.
- **Zodiac Wheel Speed Adjustment**: Decreased the rotation animation duration from 80s to 30s to make the zodiac wheel rotate moderately faster.
- **Gemstone Grid Position Priority**: Moved the Featured Gemstones section immediately after the Hero section to optimize visibility and conversions for gemstone sales.

---

## Notes

- Local dev server runs on port 3000.
- Dynamic sitemap serves at `/sitemap.xml`, robots at `/robots.txt`.
- GSC domain ownership verified at DNS registrar level via GoDaddy — `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` can remain empty.
- Facebook link: `https://www.facebook.com/people/Astrokraft/61558832911971/`
- Instagram link: `https://www.instagram.com/astro.kraft/`
- WhatsApp: `wa.me/916913230255`
