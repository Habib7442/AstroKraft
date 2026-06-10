# UI Registry

Living document. Updated after every component is built. Read this before building any new component — match existing patterns exactly before inventing new ones.

---

## How to Use

Before building any component:

1. Check if a similar component already exists here
2. If yes — match its exact classes
3. If no — build it following ui-rules.md and ui-tokens.md, then add it here

After building any component — update this file with the component name, file path, and exact classes used.

---

## Components

_Empty. Components will be added here as they are built._

### Homepage Service Cards

File: `components/sections/hero.tsx`
Last updated: 2026-06-10

| Property | Class |
| ---------------- | --------------- |
| Background | `bg-white` |
| Border | `border border-zinc-100` |
| Border radius | `rounded-2xl`, icon frame `rounded-full` |
| Text - primary | `text-black`, `font-extrabold`, `uppercase` |
| Text - secondary | `text-black/75`, `font-bold` |
| Spacing | `p-5`, `gap-4 sm:gap-5`, CTA `mt-5 px-3 py-1.5` |
| Hover state | `hover:shadow-md hover:-translate-y-1`, icon `group-hover:scale-105` |
| Shadow | `shadow-sm`, CTA `shadow-sm` |
| Accent usage | Per-service CTA tint from `serviceButtonStyles`; icons sourced from `lib/data/services.json` WebP paths |

**Pattern notes:**
Homepage quick service cards should keep the white card shell on the dark hero, circular WebP service medallions via `next/image`, bold uppercase labels, and compact colored CTA pills. The hero background currently uses `linear-gradient(135deg, #0A1A3F, #103A4A)`.

### Services Bento Cards

File: `components/sections/services-bento.tsx`
Last updated: 2026-06-10

| Property | Class |
| ---------------- | --------------- |
| Background | `bg-card` |
| Border | `border border-border`, hover `hover:border-gold/60` |
| Border radius | `rounded-xl`, icon frame `rounded-full` |
| Text - primary | `text-foreground`, hover `group-hover:text-gold` |
| Text - secondary | `text-muted-foreground` |
| Spacing | `p-6 sm:p-8`, inner `gap-4`, CTA `mt-6` |
| Hover state | `hover:shadow-lg hover:-translate-y-1 hover:scale-[1.015] active:scale-[0.985]` |
| Shadow | `hover:shadow-lg dark:hover:shadow-black/40`, icon `shadow-sm` |
| Accent usage | Gold hover hairline and CTA arrow; WebP icons shared from `lib/data/services.json` |

**Pattern notes:**
Services Bento cards should use semantic card tokens for the shell while keeping service imagery consistent with the homepage quick cards. Use the shared service dataset for icon paths instead of separate lucide-only service glyphs.
