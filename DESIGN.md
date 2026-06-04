# AstroKraft — Design System (DESIGN.md)

**Project:** AstroKraft — Pan-India Astrology & Gemstone Platform
**Theme name:** **Celestial Royale**
**Stack:** Tailwind CSS · shadcn/ui · Aceternity UI · Framer Motion · next-themes
**Companion docs:** `PRD.md` · `seo.ts`
**Last updated:** 2026-06-04

---

## 1. Design Philosophy

AstroKraft should feel like a **premium observatory**, not a fortune-teller's stall — celestial, precise, and trustworthy. The aesthetic is **"Celestial Royale": royal indigo + amethyst, lit by champagne gold,** on a cool porcelain (light) or deep ink-indigo (dark) canvas.

**Hard constraints (from brief):**
- ❌ **No cream / beige backgrounds.** Light mode is a *cool* porcelain white, not warm cream.
- ❌ **No gradients.** Depth comes from **solid jewel-tone fills, gold hairline strokes, layered soft shadows, and fine SVG constellation/starfield line-work** — never color washes.
- ✅ **Both light and dark themes**, equal quality, switchable, SSR-safe.
- ✅ **Beautiful, stylish, clear fonts.** Characterful display serif + crisp modern sans.
- ✅ **Subtle** Framer Motion (tasteful, never gimmicky), fully responsive on all devices.

**Texture instead of gradients:** thin gold zodiac/constellation line-art (low opacity), a faint star-field (small static/twinkling dots), hairline dividers, and crisp 1px gold borders on cards/CTAs. These carry the "cosmic" feeling without a single gradient.

---

## 2. Color System

All colors are defined as **HSL CSS variables** consumed by Tailwind + shadcn. Two complete palettes (light/dark). Every pairing below meets **WCAG AA** for its use (body text ≥ 4.5:1, large text/UI ≥ 3:1).

### 2.1 Brand reference scales (theme-independent)

**Indigo / Violet — primary brand**
| Step | Hex | Use |
|------|-----|-----|
| 50  | `#F2EEFC` | tint bg |
| 100 | `#E4DBF8` | tint |
| 200 | `#C8B7F0` | |
| 300 | `#A78EE6` | |
| 400 | `#876BD9` | dark-mode primary hover |
| 500 | `#6E4FCB` | **dark-mode primary** |
| 600 | `#5A37AE` | **light-mode primary** |
| 700 | `#472B88` | |
| 800 | `#2F1C5C` | panels |
| 900 | `#1C1144` | |
| 950 | `#100A2A` | |

**Amethyst — secondary accent (magenta-violet)**
| Step | Hex |
|------|-----|
| 400 | `#B266E6` |
| 500 | `#9B4DDB` |
| 600 | `#8132C2` |

**Champagne Gold — accent / detail (the "lit" element)**
| Step | Hex | Use |
|------|-----|-----|
| 300 | `#ECD9A0` | dark-mode gold text/lines |
| 400 | `#DCBE74` | **dark-mode accent** |
| 500 | `#C9A24B` | gold strokes / icons |
| 600 | `#A9842F` | **light-mode accent / gold text on white** |
| 700 | `#866425` | |

**Ink — cool, faintly-violet neutrals**
| Step | Hex |
|------|-----|
| 0   | `#FFFFFF` |
| 50  | `#F7F6FB` (porcelain — light bg) |
| 100 | `#EEEBF5` |
| 200 | `#DAD5E7` |
| 300 | `#BBB4CF` |
| 400 | `#928AAC` |
| 500 | `#6B6488` |
| 600 | `#4D4766` |
| 700 | `#36314B` |
| 800 | `#201C30` (dark card) |
| 900 | `#14111F` (dark elevated) |
| 950 | `#0C0A16` (dark bg) |

**Semantic status:** success `#1Fא...` → use `#2E9E6B` (light) / `#5FD3A0` (dark); warning `#C9A24B` (gold) / `#E6C879`; danger `#C8434B` (light) / `#F0717A` (dark); info = amethyst.

### 2.2 Light theme tokens (cool porcelain — NOT cream)

```css
:root {
  --background:            0 0% 100%;        /* page can use ink-50 for sections */
  --surface-muted:         252 40% 97%;      /* #F7F6FB porcelain section bg */
  --foreground:            255 47% 13%;      /* #1A1330 ink-indigo text */
  --card:                  0 0% 100%;        /* #FFFFFF */
  --card-foreground:       255 47% 13%;
  --popover:               0 0% 100%;
  --popover-foreground:    255 47% 13%;

  --primary:               258 53% 45%;      /* #5A37AE royal violet */
  --primary-foreground:    0 0% 100%;
  --secondary:             255 50% 95%;      /* #EFEBFB violet tint */
  --secondary-foreground:  263 53% 24%;      /* #2F1C5C */
  --accent:                40 57% 42%;        /* #A9842F champagne gold (AA on white) */
  --accent-foreground:     0 0% 100%;
  --gold-line:             41 53% 54%;        /* #C9A24B hairline strokes/icons */

  --muted:                 255 30% 95%;      /* #EEEBF5 */
  --muted-foreground:      258 16% 40%;      /* #5C5675 */
  --border:                255 28% 90%;      /* #E4E0EF */
  --input:                 255 28% 90%;
  --ring:                  258 53% 45%;      /* focus = primary */

  --radius: 0.75rem;
}
```
**Light surfaces:** page sections alternate `#FFFFFF` and porcelain `#F7F6FB`; cards are white with a 1px `--border` and soft violet-tinted shadow; gold used as 1px borders/icons and `--accent` for emphasis (text uses gold-600 `#A9842F` for contrast).

### 2.3 Dark theme tokens (deep ink-indigo)

```css
.dark {
  --background:            255 39% 6%;       /* #0C0A16 ink */
  --surface-muted:         257 33% 10%;      /* #14111F */
  --foreground:            257 46% 94%;      /* #ECEAF6 soft lavender-white */
  --card:                  258 30% 12%;      /* #1A1530 elevated */
  --card-foreground:       257 46% 94%;
  --popover:               258 30% 12%;
  --popover-foreground:    257 46% 94%;

  --primary:               258 53% 55%;      /* #6E4FCB brighter violet */
  --primary-foreground:    257 46% 96%;
  --secondary:             258 28% 18%;      /* #2A2340 */
  --secondary-foreground:  255 50% 90%;
  --accent:                40 62% 66%;        /* #DCBE74 champagne gold (AA on dark) */
  --accent-foreground:     255 39% 8%;
  --gold-line:             44 65% 78%;        /* #ECD9A0 hairlines on dark */

  --muted:                 258 25% 18%;       /* #2A2340 */
  --muted-foreground:      255 22% 72%;       /* #ACA4C6 */
  --border:                258 26% 22%;       /* #312A48 */
  --input:                 258 26% 22%;
  --ring:                  258 53% 62%;
}
```
**Dark surfaces:** ink-indigo base, cards lifted via lighter solid panels + 1px gold-tinted borders + soft shadow; gold lines glow *gently* (no neon). Star-field dots at low opacity. Primary CTA = solid violet with subtle gold ring on hover.

### 2.4 Contrast verification (key pairs)

| Pair | Theme | Ratio | Pass |
|------|-------|-------|------|
| `#1A1330` on `#F7F6FB` | light body | ~14.8:1 | AAA |
| `#5A37AE` on `#FFFFFF` | light primary btn text is white on violet | ~6.9:1 | AA+ |
| `#A9842F` gold text on `#FFFFFF` | light | ~4.6:1 | AA |
| `#ECEAF6` on `#0C0A16` | dark body | ~16:1 | AAA |
| `#DCBE74` on `#0C0A16` | dark gold text | ~10:1 | AAA |
| `#6E4FCB` btn (white text) | dark | ~5.2:1 | AA |

> Rule: **gold is decorative/structural** (lines, icons, borders, large headings); when gold conveys text meaning it uses the darker gold-600 on light. Never small gold text on light below 16px.

### 2.5 Tailwind mapping (`tailwind.config.ts` excerpt)

```ts
theme: {
  extend: {
    colors: {
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
      primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
      secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
      accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
      muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
      gold: "hsl(var(--gold-line))",
      border: "hsl(var(--border))", input: "hsl(var(--input))", ring: "hsl(var(--ring))",
    },
    borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 4px)", sm: "calc(var(--radius) - 6px)" },
  }
}
```

---

## 3. Typography

**Pairing (beautiful, stylish, clear — no defaults):**

| Role | Font | Why | Loading |
|------|------|-----|---------|
| **Display / Headings** | **Fraunces** (variable serif, high optical contrast, "soft" + characterful) | Premium, editorial, distinctive — not generic | `next/font/google` |
| **Body / UI** | **Geist Sans** | Crisp, modern, exceptionally legible; native to the Next.js world | `next/font` |
| **Numerals / charts / code** | **Geist Mono** | Aligned tabular figures for kundli tables, panchang, dasha timelines | `next/font` |
| **Hindi (Devanagari)** | **Noto Serif Devanagari** (headings) + **Mukta** (body) | First-class Devanagari, pairs with Fraunces/Geist | `next/font/google` |
| **Bengali** | **Noto Serif Bengali** + **Hind Siliguri** | Retains existing Bengali audience beautifully | `next/font/google` |

**Type scale** (fluid, `clamp()`; base 16px, ratio ~1.25):

| Token | Size (clamp) | Font / weight | Use |
|-------|--------------|---------------|-----|
| `display` | `clamp(2.75rem, 6vw, 4.5rem)` | Fraunces 600, -0.02em | Hero H1 |
| `h1` | `clamp(2.25rem, 4vw, 3.25rem)` | Fraunces 600 | Page titles |
| `h2` | `clamp(1.75rem, 3vw, 2.5rem)` | Fraunces 600 | Section titles |
| `h3` | `clamp(1.375rem, 2vw, 1.75rem)` | Fraunces 550 | Subsections |
| `h4` | `1.25rem` | Geist 600 | Card titles |
| `body-lg` | `1.125rem` | Geist 400, 1.7 line | Lead paragraphs |
| `body` | `1rem` | Geist 400, 1.65 line | Default |
| `small` | `0.875rem` | Geist 450 | Meta, captions |
| `overline` | `0.75rem` | Geist 600, 0.12em, uppercase | Eyebrows (often gold) |

**Rules:** headings in Fraunces with tight tracking; body never below 16px on mobile; "eyebrow" labels (e.g., "FREE TOOL") in uppercase gold Geist; numbers in tables use Geist Mono for alignment.

---

## 4. Spacing, Radius, Elevation

**Spacing scale (4px base):** 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128. Section vertical padding: `py-20 md:py-28`. Content max-width: `max-w-7xl` (1280px); reading width for blog: `max-w-prose`.

**Radius:** base `0.75rem` (12px). Buttons/inputs `md` (8px), cards `lg` (12–16px), modals `xl` (24px), pills/avatars `full`. Premium = consistently rounded, never fully pill-shaped except chips/avatars.

**Elevation (shadows — no neon):**
```css
--shadow-sm:  0 1px 2px hsl(258 40% 20% / .06);
--shadow-md:  0 4px 16px hsl(258 40% 20% / .08);
--shadow-lg:  0 12px 40px hsl(258 45% 18% / .12);
/* dark mode: deepen + faint gold rim on hover */
--shadow-dark-lg: 0 16px 48px hsl(255 60% 2% / .6);
--ring-gold-hover: 0 0 0 1px hsl(var(--gold-line) / .5);
```
**Borders:** default 1px `--border`; "premium" cards get a 1px `--gold-line` at low opacity. Dividers are hairline gold at ~20–30% opacity.

---

## 5. Iconography & Imagery

- **Icons:** `lucide-react` (clean line icons) for UI; a **custom thin-line zodiac/planet glyph set** (gold stroke) for astrology symbols — line-art, not filled, matching the constellation motif.
- **Constellation motif:** reusable SVG of faint connected stars + zodiac line-art used as section backdrops at 4–8% opacity (light) / 10–14% (dark). This replaces gradients as the atmospheric layer.
- **Photography:** gemstones on dark, crisp, high-detail product shots (gold-rim framing); astrologer portraits in consistent circular frames with verified-badge; avoid stocky "mystical hands over crystal ball" clichés.
- **No baked-in text in images.** All text is live type. Gemstone/astrologer imagery only.

---

## 6. Component Inventory (shadcn + Aceternity)

### 6.1 shadcn/ui (structure, forms, a11y)
Button, Card, Input, Textarea, Label, Select, Combobox (birth-city autocomplete), **Calendar / Date-Time Picker** (birth details), Form (+ zod), Dialog, Sheet (mobile menu/filters), Tabs, Accordion (FAQ), Avatar, Badge (verified/specialty), Tooltip, Dropdown/NavigationMenu (mega-menu), Command (global search), Popover, Carousel, Sonner (toasts), Separator, Skeleton, Pagination, Breadcrumb.

### 6.2 Aceternity UI (motion accents) — **gradient-free selections only**
| Component | Where | Note (no-gradient compliance) |
|-----------|-------|-------------------------------|
| **Spotlight** | Hero | Use a **solid** violet/gold radial *light* on solid bg — single subtle glow, not a gradient sheet |
| **Stars Background / Shooting Stars** | Hero, tool result | Core "cosmic" texture — solid dots, perfect fit, no gradient |
| **Sparkles** (tasteful, low density) | Around matching score reveal | Sparse, gold; not the "AI particle" cliché |
| **3D Card Effect (CardContainer)** | Gemstone cards, astrologer cards | Subtle tilt on hover |
| **Animated Tooltip** | Featured astrologer row | Avatar hover details |
| **Infinite Moving Cards** | Testimonials | Existing reviews scroller |
| **Bento Grid** | "Free Tools" hub, "Why Choose Us" | Solid card fills |
| **Tracing Beam** | Blog/article reading | Gold beam down the article |
| **Text Generate Effect / Typewriter** | Hero headline | Subtle word reveal |
| **Apple Cards Carousel / Layout Grid** | Services, gemstone categories | |
| **Following Pointer** | Tool CTA cards | Light delight |
| **Meteors** (very sparse) | Matching share card bg | Optional; keep minimal |

> ⚠️ **Avoid** Aceternity components that are inherently gradient (`Aurora Background`, `Background Gradient`, `Lamp`, gradient `Hero Highlight`). If a desired effect only ships as gradient, re-implement with a **solid** fill + constellation motif.

### 6.3 Custom components
`ZodiacWheel` (animated SVG), `KundliChart` (North/South Indian chart SVG), `GunaScoreCard` (the shareable matching artifact), `RashifolCard`, `PanchangBoard`, `ShareSheet` (WhatsApp/IG/copy/download-image), `LanguageSwitcher`, `ThemeToggle`, `WhatsAppFab`, `GemstoneCard`, `AstrologerCard`, `OGResultImage` (server-rendered).

---

## 7. Section-by-Section Specs (Home)

1. **Top utility bar** — phone, email, location, language switcher, theme toggle, "Match With Kundli ₹99" promo pill (gold border).
2. **Sticky header** — logo (Fraunces wordmark "AstroKraft" + gold star glyph), mega-menu (Free Tools), "Talk to Astrologer" primary CTA, account. Shrinks on scroll.
3. **Hero** — ink/porcelain bg + Stars Background + single Spotlight; eyebrow "INDIA'S TRUSTED ASTROLOGY & GEMSTONE MARKETPLACE"; H1 (Fraunces) "Your Guide for Life" with subtle word reveal; subline; CTAs "Talk to Astrologer" (solid violet) + "Explore Gemstones" (gold-outline); animated `ZodiacWheel` on the right (slow rotation); trust chips "Verified Astrologers · Certified Gemstones · 50+ consulted today".
4. **Stats band** — 4 animated counters (Rating / Happy Clients / Expert Astrologers / Consultations) — *populate with real numbers*; gold hairline separators.
5. **Our Services** — Bento/Layout grid of 6: Verified Astrologer · Certified Gemstone · Purohit · Vastu Consultant · Vastu Home Plan · Kundli Match. Line-icon, gold border on hover, 3D tilt.
6. **Free Tools spotlight (NEW, growth)** — prominent band: Kundli · **Kundli Matching** · Rashifol · Panchang; "100% Free" gold badges; matching card teased.
7. **Featured Astrologers** — carousel of cards (avatar, verified badge, specialty, rating, fee, languages, "Consult"); Animated Tooltip on avatars.
8. **Gemstone Collection** — 3D product cards on dark tiles (12 stones), price, "Certified" badge.
9. **Featured Purohits** — pooja cards (5+), star ratings, "Book".
10. **Why Choose Us** — 4 pillars (Verified Astrologers, Certified Gemstones, Easy Consultation, 24/7 Support) in a solid-fill bento.
11. **Choose Your Zodiac Sign** — 12 gold line-glyph tiles → per-sign horoscope (programmatic SEO).
12. **Subh Muharat** — date cards (retain Bengali muhurat entries); calendar-style.
13. **Testimonials** — Infinite Moving Cards (English + Bengali reviews).
14. **Recent Updates / Blog** — 3 cards.
15. **Lead section (NEW)** — "Get your daily Rashifol on WhatsApp" opt-in + contact form (fixes the no-form gap).
16. **Footer** — columns (Services, Free Tools, Company, Legal), real social links, contact, WhatsApp, language, copyright. Gold hairline top border + faint constellation.

**Floating:** WhatsApp FAB (`wa.me/916913230255`), retained.

---

## 8. Animation Guidelines (Framer Motion — subtle)

**Principles:** motion should feel like the sky moving slowly — *calm, premium, purposeful.* Nothing bounces or spins gratuitously. **Always respect `prefers-reduced-motion`** (disable transforms/opacity reveals, keep instant).

| Pattern | Spec |
|---------|------|
| **Section reveal** | `initial {opacity:0, y:24}` → `whileInView {opacity:1, y:0}`, `viewport={{ once:true, margin:"-80px" }}`, `duration:0.5, ease:[0.22,1,0.36,1]` |
| **Stagger** | container `staggerChildren:0.08` for grids/lists |
| **Hero headline** | word/line reveal (Text Generate) or `y:16→0` stagger, `0.6s` |
| **Zodiac wheel** | continuous `rotate` 60–90s linear loop; pauses on `reduced-motion` |
| **Card hover** | `whileHover {y:-4, scale:1.02}` + shadow-lg + gold ring; `spring {stiffness:300, damping:24}` |
| **Counters** | count-up on in-view, `1.2s` ease-out |
| **Matching score reveal** | number count-up + sparse Sparkles burst (gold), `0.8s` — the signature moment |
| **Buttons** | `whileTap {scale:0.97}`; gold ring fade-in on hover |
| **Theme toggle** | 250ms crossfade of token vars (CSS transition on color/bg) |
| **Page/route transitions** | gentle fade `opacity 0→1`, `0.3s` |
| **Star-field** | slow opacity twinkle (CSS keyframes), very low amplitude |

**Performance:** animate only `transform`/`opacity`; lazy-mount heavy Aceternity backgrounds; `will-change` sparingly; no layout-thrashing animations.

---

## 9. Responsiveness

**Breakpoints (Tailwind):** `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`. **Mobile-first** — design every section at 360–390px first.

| Surface | Mobile | Desktop |
|---------|--------|---------|
| Nav | Hamburger → Sheet; sticky CTA | Full mega-menu |
| Hero | Stacked, wheel below/centered, CTAs full-width | Two-column |
| Grids (services/gems) | 1–2 cols | 3–4 cols |
| Tool forms | Single column, large touch targets (≥44px), native date/time | Multi-column |
| Tables (kundli/panchang) | Horizontal scroll / stacked cards | Full table |
| Result/share card | Portrait, optimized for WhatsApp/Story (1080×1920 export) | Centered modal |
| Footer | Accordion columns | 4-column |

Test matrix: low-end Android (median India device), iPhone SE→Pro Max, tablets, desktop. No horizontal overflow at any width; images responsive via `next/image` `sizes`.

---

## 10. Accessibility

- **WCAG 2.1 AA** both themes (contrast table §2.4).
- Keyboard-navigable everything; visible `:focus-visible` ring (`--ring`, 2px offset).
- Radix (shadcn) primitives give correct ARIA for menus/dialogs/tabs/accordions.
- `prefers-reduced-motion` → disable non-essential motion (handled in a shared `useReducedMotion` wrapper).
- Forms: associated labels, error text, `aria-invalid`, `aria-describedby`.
- Color never the sole signal (icons + text on status/verified).
- Min 16px body; min 44px touch targets; semantic landmarks (`header/nav/main/footer`), one `h1`/page, logical heading order.
- Alt text on gemstone/astrologer imagery; decorative constellation SVGs `aria-hidden`.

---

## 11. Theming Implementation Notes

- `next-themes` with `attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange={false}` (we *want* a smooth 250ms token transition — but suppress it on first paint to avoid flash).
- Tokens defined in `globals.css` (`:root` + `.dark`).
- Provide a `<ThemeToggle/>` (sun/moon line glyph, gold) in header + footer.
- Both themes ship from day one and are visually first-class — neither is an afterthought.

---

## 12. Brand Quick-Reference

- **Name/wordmark:** "AstroKraft" — Fraunces 600, with a small gold star/asterisk glyph.
- **Primary action color:** royal violet (`#5A37AE` light / `#6E4FCB` dark).
- **Signature accent:** champagne gold (lines, icons, badges, the matching score).
- **Canvas:** porcelain `#F7F6FB` (light) / ink-indigo `#0C0A16` (dark).
- **Voice:** trustworthy, warm, precise — premium but not cold; bilingual-friendly.
- **Never:** cream/beige, gradients, neon, mystical clichés, baked-in image text.

---

*End of DESIGN.md. See `PRD.md` for product scope and `seo.ts` for the SEO/metadata system.*
