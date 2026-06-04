# Progress Tracker

## Current Phase

- **Phase 0 — Foundations**: Scaffolding the Next.js application core, configuring local variables, mapping i18n locales, and aligning the CSS variable definitions with the design system tokens.

## Current Goal

- Establish Next.js localization structure and messages files for multi-language pan-India support.

## Completed

- Read and analyzed the project docs (`prd.md` and `DESIGN.md`).
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

