# Progress Tracker

## Current Phase

- **Phase 0 — Foundations**: Scaffolding the Next.js application core, configuring local variables, mapping i18n locales, and aligning the CSS variable definitions with the design system tokens.

## Current Goal

- Establish Next.js localization structure and messages files for multi-language pan-India support.

## Completed

- Extracted astrologer profile data to a centralized [astrologer.json](file:///e:/Web%20Dev/astrokraft/lib/data/astrologer.json) file and updated the 3D globe dialog card in [3d-globe-demo.tsx](file:///e:/Web%20Dev/astrokraft/components/3d-globe-demo.tsx) to dynamically render localized descriptions, phone, email, fee, and address, refactoring it to use a compact, scrollable layout with fixed headers/sticky CTA, removing the languages tag list, and removing the city/geographic location stat column (as all astrologers operate in India) to prevent viewport overflow on smaller screens.
- Configured application `name`, `short_name`, favicon routing path prefixes, and brand theme/background colors (`#0c0a16`) in [site.webmanifest](file:///e:/Web%20Dev/astrokraft/public/favicons/site.webmanifest) to enable cohesive browser PWA installation.
- Implemented `isValidLocale` type guard in [seo.ts](file:///e:/Web%20Dev/astrokraft/lib/seo.ts) and integrated it in both [page.tsx](file:///e:/Web%20Dev/astrokraft/app/%5Blocale%5D/page.tsx) and [layout.tsx](file:///e:/Web%20Dev/astrokraft/app/%5Blocale%5D/layout.tsx) to remove unsafe `as any` type assertions during dynamic route parameter validation.
- Refactored `LenisProvider` in [lenis-provider.tsx](file:///e:/Web%20Dev/astrokraft/components/providers/lenis-provider.tsx) to consume its defined `LenisProviderProps` type interface rather than an inline type signature.
- Configured long-term `Cache-Control` browser cache headers inside [next.config.ts](file:///e:/Web%20Dev/astrokraft/next.config.ts) for static assets (`/assets/*`, `/favicons/*`, and `/logo.svg`) to prevent repeat Vercel Edge Requests from returning users.
- Localized all hardcoded footer link labels, column headers, brand description, and attribution strings across [footer.tsx](file:///e:/Web%20Dev/astrokraft/components/sections/footer.tsx) and translation dictionaries (`en.json`, `hin.json`, `bn.json`).
- Installed `zustand` and created a global store at [useGlobeStore.ts](file:///e:/Web%20Dev/astrokraft/lib/store/useGlobeStore.ts) to manage 3D globe selection state, refactoring [3d-globe-demo.tsx](file:///e:/Web%20Dev/astrokraft/components/3d-globe-demo.tsx) to consume this global state.
- Upgraded the locale switching logic in [header.tsx](file:///e:/Web%20Dev/astrokraft/components/sections/header.tsx) to dynamically parse pathname segments and preserve query parameters and hash fragments on client-side navigation.
- Documented planned fast-follow languages via `PLANNED_LOCALES` in `lib/seo.ts` to keep `LOCALES` strictly aligned with implemented translation dictionaries (`en`, `hin`, `bn`).
- Refactored `getDictionary` locale fallback logic in `lib/i18n.ts` to type-safely verify `DEFAULT_LOCALE` exists in dictionaries at compile time, eliminating the unsafe `as SupportedLocale` type assertion.
- Read and analyzed the project docs (`prd.md` and `DESIGN.md`).
- Converted JPEGs and PNGs inside `public/assets/astrologers/` to high-resolution WebP files using the `sharp` library to optimize load speed while preserving original aspect ratios and quality, and deleted the original raw JPEGs/PNGs to clean up the codebase.
- Re-engineered Three.js CSS3D marker rendering in [3d-globe.tsx](file:///e:/Web%20Dev/astrokraft/components/ui/3d-globe.tsx) to display sharp, high-DPI floating avatars (scaling dynamically from 40px on mobile to 60px on desktop) by switching the Drei HTML component to 2D projected mode, guaranteeing pixel-perfect alignment over the pin tips at any camera perspective.
- Distributed markers globally (New York, London, Sao Paulo, Sydney, Cape Town, New Delhi) in [3d-globe-demo.tsx](file:///e:/Web%20Dev/astrokraft/components/3d-globe-demo.tsx) to prevent geographic overlap congestion (with founder Biprangshu Bhattacharjee correctly positioned in New Delhi, India), enabled slow auto-rotation, and built a premium, compact glassmorphic details dialog modal popup mounted via React Portal at z-[9999] for perfect viewport layering and screen fit.
- Patched localBusinessSchema() in [lib/seo.ts](file:///e:/Web%20Dev/astrokraft/lib/seo.ts) to conditionally omit the aggregateRating block when the review count is 0, satisfying Schema.org structured data crawlers.
- Read the Six-File Context templates and methodology.
- Created `/context` directory and populated:
  - `project-overview.md`
  - `architecture.md`
  - `code-standards.md`
  - `ui-context.md`
  - `ai-workflow-rules.md`
  - `progress-tracker.md`
- Configured entry files (`AGENTS.md` and `CLAUDE.md`) to index the new context files.
- Configured [globals.css](file:///e:/Web%20Dev/astrokraft/app/globals.css) with HSL values for Light (Porcelain) and Dark (Ink) themes, matching the **Celestial Royale** design guidelines.
- Configured [layout.tsx](file:///e:/Web%20Dev/astrokraft/app/layout.tsx) with Google Fonts: **Fraunces** (display serif), **Geist Sans** (body/UI sans), and **Geist Mono** (tabular numbers).
- Configured custom favicon and webmanifest assets paths pointing to the `/favicons` directory in [seo.ts](file:///e:/Web%20Dev/astrokraft/lib/seo.ts).
- Installed `motion` package (Framer Motion v12+) to support visual animations.
- Established Next.js localized directory routing (`app/[locale]`) and server-side JSON translation dictionaries.
- Resolved route conflict for English "/hi" pathing by mapping the Hindi locale code prefix to `"hin"` (instead of `"hi"`), renaming the dictionary to `messages/hin.json` and adjusting redirects.
- Configured `"hin"` locale to correctly load the Hindi translation file [messages/hin.json](file:///e:/Web%20Dev/astrokraft/messages/hin.json).
- Simplified root redirection in `proxy.ts` to always route first-time visitors to the English prefix `/en` by default.
- Excluded the `/favicons` directory and assets in `proxy.ts` matcher to prevent routing interception and avoid 404 metadata retrieval errors.
- Constructed custom shared SVG assets: `ConstellationBg` (twinkling hairline stars).
- Built responsive, accessible Celestial Royale homepage layout sections: sticky utility `Header`, spotlight `Hero` (centered layout), interactive `ServicesBento` grid (6 core cards), and a structured `Footer`.
- Removed ZodiacWheel from the Hero layout per client feedback, transforming it into a clean, centered typography-focused section.
- Replaced missing Lucide brand icons with local PNG social assets in the `Footer` to bypass dependency version mismatches.
- Switched multilingual translations loader to a static import pattern to prevent Next.js 16 / Turbopack runtime dynamic import 404 errors.
- Verified type-safety of the whole codebase with zero warnings/errors.
- Integrated the brand logo asset (`public/logo.svg`) into the header and footer layouts with premium border containment and hover animations.
- Integrated Lenis Smooth Scroll using the official React wrapper (`lenis/react`), configured a global `LenisProvider`, and imported target styles in the root layout to provide smooth inertial physics-based scrolling.
- Upgraded the Bento Grid (`services-bento.tsx`) with pure-CSS radial hover glows matching the custom color accent of each divine service, producing a high-energy Gen-Z aesthetic with zero scrolling runtime lag.
- Removed unnecessary JS-driven Framer Motion entrance and scroll-trigger animations from the homepage (`Hero` and `ServicesBento` components) and replaced them with hardware-accelerated CSS transitions, eliminating scroll jank and main-thread lag.
- Cleared out active debug server console logs (`console.log`) from the main entrypoint [page.tsx](file:///e:/Web%20Dev/astrokraft/app/%5Blocale%5D/page.tsx) to ensure clean, clutter-free output in production and development shells.
- Integrated `public/assets/hero_bg.webp` as a subtle background texture overlay in the Hero section to enhance the Observatory theme depth.
- Removed the bottom border from the sticky header navigation bar to produce a clean, seamless header transition.
- Fixed the Next.js middleware `proxy.ts` matcher to exclude the `.webp` file extension from localization routing, resolving the asset 404 redirection issue.
- Removed the Zodiac Wheel component and deleted the placeholder `zodiac_wheel.png` graphic from the hero section to prepare for the user's custom asset.
- Repositioned the navbar to use `absolute` layout and set its background to `bg-transparent` with no backdrop blur, allowing the space background image to start from the top of the viewport.
- Adjusted the hero section's top padding to `pt-16 md:pt-24 lg:pt-28` to maintain a tight, elegant spacing between the transparent header links and the display typography.
- Restricted the global list of supported languages (`LOCALES`) in `lib/seo.ts` to only the three active locales containing translation dictionaries: English (`en`), Hindi (`hin`), and Bengali (`bn`).
- Replaced the Sparkles Lucide icon inside the hero eyebrow badge with an elegant, golden unicode four-pointed star (`✦`) to match the reference design cleanly.
- Set the hero display title to use the premium Fraunces serif font (`font-serif`) with a medium-bold weight (`font-semibold`) and clean, non-italicized formatting.
- Removed the rotating zodiac circle image completely from the hero section, clean-deleting the files from `public/assets/`.
- Restructured [hero.tsx](file:///e:/Web%20Dev/astrokraft/components/sections/hero.tsx) layout from a two-column grid into a premium, centered, single-column typography-focused layout.
- Configured centered, overlapping violet and gold spotlight glow backgrounds behind the central content, creating a beautiful cosmic visual harmony.
- Removed the `dark:invert` filter class from the active social icon PNGs in the footer, showing them in their original brand colors.
- Upgraded the social media icon link styles in [footer.tsx](file:///e:/Web%20Dev/astrokraft/components/sections/footer.tsx) with custom brand-aligned hover transitions (scale transforms, colored borders, and custom background highlights) for Facebook, Instagram, and WhatsApp.
- Removed X (Twitter) and LinkedIn social media platforms from the footer completely.
- Removed the email input form and the entire "Stay Inspired" newsletter column from the footer.
- Redistributed the remaining footer columns (Brand Info: 4, Services: 2, Free Tools: 3, Company: 3) to fill the grid layout space cleanly and maintain desktop alignment.
- Removed the Lucide `Sparkles` icon and added subtle, ambient violet and gold background glows to the footer section to match the Observatory theme.
- Updated the Light Mode page background color in [globals.css](file:///e:/Web%20Dev/astrokraft/app/globals.css) from pure white to a cool, luxury porcelain white (`hsl(255 20% 98.5%)` / `#FAF9FE`) to soften the canvas.
- Increased the opacity of the space background nebula overlay image in the hero section for Light Mode from `0.25` to `0.38` to make the planetary details pop with rich contrast.
- Increased the top padding on the hero container [hero.tsx](file:///e:/Web%20Dev/astrokraft/components/sections/hero.tsx) (`pt-32` on mobile, `md:pt-36` on tablet, `lg:pt-40` on desktop) to push the content down away from the header, resolving page congestion completely.
- Expanded the vertical element spacing (`gap-7 md:gap-8`) inside the hero contents to add breathing room and enhance readability.
- Clean-removed the starry constellation lines background component from the hero section to keep the background clean and unified.
- Installed shadcn `Sheet` slide-out drawer component to handle mobile responsive navigation panels.
- Redesigned the mobile navigation bar in [header.tsx](file:///e:/Web%20Dev/astrokraft/components/sections/header.tsx) to resolve header congestion on mobile displays (relocated the language dropdown selector and theme toggle inside the sliding Drawer, leaving only the brand logo and hamburger menu button on the header line).
- Implemented styled segmented locales button grid and theme toggles inside the mobile Drawer panel for clean alignment and responsive spacing.
- Enriched the gold color variable HSL values (`--accent` and `--gold-line`) in [globals.css](file:///e:/Web%20Dev/astrokraft/app/globals.css) for Light Mode to a deeper amber-bronze tone (`hsl(38 60% 36%)`), boosting contrast and legibility against porcelain white.
- Fixed the OG image loading issue for the English locale route `https://www.astrokraft.online/en` by directly configuring the site URL in [seo.ts](file:///e:/Web%20Dev/astrokraft/lib/seo.ts), defining a `DOMAIN_ROOT` constant to prevent double-prefixing other language routes, and falling back to the static `SITE.ogImage` (`/og_image.jpg`) rather than the unimplemented dynamic dynamic-image endpoint.
- Adjusted background image position (`object-right md:object-center`) and lowered its opacity (`opacity-[0.12] dark:opacity-[0.22]`) in [hero.tsx](file:///e:/Web%20Dev/astrokraft/components/sections/hero.tsx) to show the planets on mobile screens while maintaining excellent text legibility and contrast.

## In Progress

- Verification and validation of dynamic layouts on the restarted local development server.

## Next Up

- Begin Phase 2 — Free Astrology Tools & Calc Engine setup (Kundli, Kundli Matching Guna Milan, and Panchang/Horoscope API handlers).

## Open Questions

- None.

## Architecture Decisions

- **Six-File Context System**: Adopted the JS Mastery Six-File Context System to prevent context drift and ensure architectural consistency across AI agent sessions.
- **Abstracted Astrology Service**: Abstract all external calculation providers behind `lib/astrology/` to ensure modularity and ease of switching APIs.
- **Three-Letter Locale Mappings**: Utilized `"hin"` for Hindi routing to preserve `/hi` for English friendly greeting route namespace.
- **Static i18n Dictionaries**: Transformed translation dictionary loaders from asynchronous runtime imports to static JSON imports to eliminate dynamic module compilation mismatches under Turbopack.
- **Local Asset Fallbacks**: Integrated static image assets for brand logotypes to guarantee UI consistency without relying on unstable external package dependencies.

