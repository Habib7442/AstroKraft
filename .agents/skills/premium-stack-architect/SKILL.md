---
name: stunning-frontend-ui
description: >-
  Use for ANY user-facing frontend work — building, redesigning, or polishing
  pages, layouts, components, landing/marketing pages, dashboards, design
  systems, hero sections, navbars, footers, cards, forms, tables, modals,
  pricing, or auth screens. Trigger on UI, UX, visual design, styling, theming,
  "make it look good / professional / premium / modern / clean", or any work
  with Tailwind CSS, shadcn/ui, Radix, or a Next.js frontend. Produces premium,
  agency-grade interfaces and actively prevents generic AI-looking output.
---

# Stunning Frontend UI & Design Practice

Your job is not to make something that *works*. It is to make something that looks like a
client paid a senior design studio five figures for it. Functional-but-generic is a failure.
Default to taste, restraint, and obsessive detail.

## 0. Operating principle

> **Before writing code, decide what it should LOOK like. Before shipping, ask: "Does this
> look like a $50k agency site, or a template?" Then fix the single weakest element.**

Design is decisions. Generic output comes from skipping decisions and letting defaults win.
Make deliberate choices about type, color, space, and hierarchy *up front* and commit to them.

---

## 1. The bar — what "premium" actually means

- **Restraint.** Every element earns its place. When in doubt, remove it. Premium looks
  emptier than you think — whitespace is the design, not wasted space.
- **One focal point per screen.** A clear visual hierarchy guides the eye: primary → secondary
  → tertiary. If everything shouts, nothing is heard.
- **Cohesion.** A tight system — one type pairing, a small palette, one radius scale, one
  spacing rhythm. Consistency *is* the polish.
- **Detail obsession.** Hover/focus/active/disabled states, loading skeletons, empty states,
  optical alignment, transitions. The 20% of details nobody asks for is the 80% of the feel.
- **Typography carries it.** Great type is the cheapest way to look expensive. Get it right
  and a near-monochrome layout already looks designed.

---

## 2. Never ship these (the AI tells)

These instantly mark a site as AI-generated or templated. Treat each as forbidden unless the
brief *explicitly* calls for it.

- ❌ **The "AI gradient":** purple→pink/indigo→violet gradients on hero text, buttons, blobs
  (`from-purple-500 to-pink-500`). Banned by default.
- ❌ **Center-everything:** long body paragraphs center-aligned; a `min-h-screen` hero with one
  centered headline, a subtitle, and two buttons, and nothing else.
- ❌ **Emoji as UI icons** (🚀✨💡🔒). Use a real stroke icon set (`lucide-react`) at consistent size.
- ❌ **Three identical feature cards** in a row, each = icon + bold title + 2 lines of lorem.
- ❌ **Glassmorphism / `backdrop-blur` everywhere** with no purpose.
- ❌ **Harsh shadows** (`shadow-2xl` on every card) and **pure black (#000) on pure white (#fff)** —
  both read as cheap. Use soft, layered, low-opacity shadows and off-black/off-white.
- ❌ **Radius chaos:** mixing `rounded-sm`, `rounded-xl`, `rounded-3xl` at random.
- ❌ **Rainbow accents / 4+ font sizes & weights** with no scale. Looks busy and amateur.
- ❌ **Full-width body text** (line length > 75 characters) — unreadable.
- ❌ **Low-contrast micro-text:** `text-sm text-gray-400` as primary reading content.
- ❌ **Arbitrary spacing** (`mt-[37px]`, `p-[13px]`) breaking the rhythm.
- ❌ **Generic decoration:** floating 3D blobs, abstract geometric confetti, glowing orbs,
  circuit-board "tech" textures, stock "team high-fiving" photos.
- ❌ **Missing states:** no empty state, no loading state, no error state, no focus ring.

---

## 3. Choose a deliberate aesthetic (don't default to one look)

Read the brief — **brand, audience, content, emotion** — then pick **ONE** register and commit.
There is no single correct style; the crime is having no opinion.

| Register | Feels like | Moves |
|---|---|---|
| Minimal / editorial | Linear, Vercel, Apple | Lots of white, strong type, hairline borders, near-mono palette |
| Bold / brutalist | Gumroad, Figma confs | Heavy weights, hard edges, high-contrast color blocks |
| Warm / organic | Stripe, Notion, indie SaaS | Soft serifs, warm neutrals, gentle curves |
| Technical / precise | Terminal, dev tools | Mono accents, dense grids, data-forward |
| Luxe / dark | Premium brands, fintech | Deep near-black surfaces, restrained gold/accent, generous space |
| Playful | Consumer, kids, games | Saturated palette, rounded, springy motion |

Before building, write down three things and stick to them:
1. **Type voice** — the display + text pairing.
2. **Color story** — 1 dominant neutral ramp + 1 accent + functional colors. Nothing more.
3. **Density & rhythm** — airy vs. compact; your section padding and gap scale.

Name a **north star** ("this should feel like Linear") and match its *principles*, not its pixels.

---

## 4. Foundations

### Typography
- Load fonts via **`next/font`** (self-hosted, zero layout shift) and expose as CSS variables.
  Never hand-link Google Fonts with `<link>`.
- **Pair two faces max:** a characterful display + a clean workhorse. Good defaults: Inter / Geist
  for UI; add a serif (Instrument Serif, Fraunces, Newsreader) for editorial contrast. Or one
  great family with multiple weights.
- **Modular scale** (~1.2–1.333 ratio). Use **5–6 sizes total**, not a dozen.
- **Body:** 16–18px, `line-height` 1.5–1.7, measure **60–75ch** (`max-w-prose`).
- **Headings:** tighter leading (1.05–1.2) and `tracking-tight` on large display sizes.
- **Weight contrast:** heavy display + regular body. Avoid 3+ weights sprinkled randomly.
- Use `tabular-nums` for numbers in tables/data; `text-balance` on headings, `text-pretty` on body.

### Color & tokens
- Drive everything through **CSS variables** (shadcn convention: `--background`, `--foreground`,
  `--primary`, `--muted`, `--accent`, `--border`, `--ring`). Prefer **OKLCH/HSL** for clean ramps.
- **One** neutral ramp + **one** brand accent + functional (success / warning / destructive).
  Resist adding more colors.
- Use **off-black / off-white**, never pure: text `~hsl(0 0% 9%)`, background `~hsl(0 0% 98%)`.
- Give neutrals a subtle **temperature** (slightly warm or cool gray) — pure gray looks sterile.
- **Accent ≈ 10% of the surface** — reserve it for CTAs, links, focus, key data. Everything else neutral.
- **Design dark mode**, don't auto-invert: elevate surfaces with small lightness steps; soften shadows.

### Space, layout & rhythm
- Stay on the **4px / 8pt spacing scale**. Consistency reads as "designed."
- Pick a section rhythm and reuse it: e.g. `py-24 md:py-32` sections, `gap-6/8` within.
- **Constrain width:** prose `max-w-2xl/3xl`, app shells `max-w-7xl`. Never let text run full-bleed.
- **Whitespace is a feature.** Give heroes and sections room to breathe.
- Use **asymmetry and intentional alignment**; vary section sizes to create pacing (big hero →
  tighter content → breathing room → CTA). Equal-weight sections feel monotonous.

### Depth, borders & radius
- **One radius scale.** Set `--radius` once and derive sm/md/lg. Don't mix wildly.
- **Soft, layered shadows** at low opacity, tinted by the surface — not harsh black. Often a
  **1px border + tiny shadow** beats a big shadow. Reserve large shadows for true overlays.
- **Hairline borders** (`border-border`), not heavy dark lines.

### Visual hierarchy
- Establish the focal point with **size, weight, color, and space** — deliberately.
- **One primary action per view.** Secondaries are visually quieter (outline/ghost).

---

## 5. Stack craft

### Next.js (App Router)
- **`next/font`** for all fonts → CSS variables → wired into the Tailwind theme.
- **Server Components by default.** Add `"use client"` only where you need state/effects/handlers.
  Keep client bundles lean.
- **`next/image`** for raster images: set `sizes`, `priority` on the LCP/hero image, use blur
  placeholders. Prevents CLS, serves responsive AVIF/WebP.
- **Stream + skeleton:** `loading.tsx` (Suspense) with real skeletons; `error.tsx` and
  `not-found.tsx` for the unhappy paths.
- **Metadata API** for SEO/OpenGraph. Shared shells via nested `layout.tsx`.
- Avoid hydration mismatches: no `Date.now()`/`Math.random()` in render; guard `window`/`localStorage`.

### Tailwind
- **Theme-driven:** map shadcn CSS vars into the theme and use **semantic classes**
  (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`) — NOT raw
  `bg-gray-900`. This is what makes theming + dark mode actually work.
  - Tailwind **v4**: configure tokens in CSS via `@theme`. **v3**: `tailwind.config.ts`. Detect which the project uses.
- **Compose, don't copy:** use `cn()` (clsx + tailwind-merge); extract repeated patterns into
  components or **`cva`** variants instead of pasting class soup.
- **Stay on the scale.** Avoid arbitrary values except rare, justified one-offs.
- **Mobile-first:** base = mobile, layer `md:`/`lg:`.
- Use the full state vocabulary: `hover:`, `focus-visible:`, `active:`, `disabled:`,
  `group`/`peer`, `data-[state=...]`, `aria-*`, `motion-safe:`/`motion-reduce:`.

### shadcn/ui
- These are primitives **you own** — *edit the component files*, don't treat it as a locked library.
- **Retheme it.** Out-of-the-box shadcn looks like every other shadcn site. Change `--primary`,
  `--radius`, the neutral ramp, fonts, and shadows in `globals.css` (`:root` + `.dark`) so it
  becomes *your* brand.
- Extend with **`cva`** variants (new button sizes/intents) for consistency.
- Compose **Radix** primitives (Dialog, Popover, DropdownMenu, Tooltip, Select) for accessible
  behavior — never hand-roll a11y.
- `lucide-react` for icons (one consistent stroke set — never emoji); `sonner` for toasts.
- Add motion deliberately and respect `prefers-reduced-motion`.

---

## 6. Component craft — states & the unhappy path

Every interactive element ships with: **default, hover, focus-visible (visible ring), active,
disabled,** and **loading** where relevant.

- **Buttons:** clear primary / secondary / ghost hierarchy; spinner + disabled on submit;
  tap target ≥ 44px.
- **Forms:** real `<label>`s (placeholder is not a label); correct input types; inline
  validation with helpful messages; `aria-invalid`; autofocus the first field; disabled+spinner
  while submitting.
- **Lists / cards / data:** design the **empty state** (with a helpful CTA), **loading skeleton**,
  and **error state** — not just the happy path.
- **Tables:** `tabular-nums`, sticky header, row hover or subtle zebra, sensible truncation,
  and a mobile reflow (cards or horizontal scroll).
- **Media:** wrap in `aspect-ratio` boxes (`object-cover`) to prevent layout shift.
- **Feedback:** every action gets a response (optimistic update, toast, or state change). Never
  let a click feel dead.

---

## 7. Motion & micro-interaction

Motion clarifies; it does not decorate.

- **Timing:** UI feedback 150–250ms; larger reveals 300–600ms. Easing: `ease-out` for enters,
  spring only for playful brands.
- **Animate `transform`/`opacity`**, not layout-shifting properties (top/height/width).
- **Tasteful patterns:** card hover lift (`-translate-y-0.5` + shadow), short fade/slide-in on
  scroll with a small stagger, animated focus rings, skeleton shimmer, gentle section reveals.
- Tools: `tailwindcss-animate` for utilities; **Framer Motion** for orchestrated/scroll work.
- **Always** honor `prefers-reduced-motion` — disable non-essential animation.
- Don't: bounce everything, run long durations, or animate on every element at once.

---

## 8. Accessibility & performance (non-negotiable)

- **Contrast:** ≥ 4.5:1 body, ≥ 3:1 large text/UI. Never convey meaning by color alone.
- **Semantics:** proper landmarks (`<nav> <main> <footer>`), logical heading order, exactly one
  `<h1>`, labelled controls, `alt` text, full keyboard operability, and **visible focus**.
- Radix/shadcn give correct ARIA + focus management for free — lean on them.
- **Performance is perceived quality:** protect **LCP** (`priority` hero image, `next/font` with
  `display: swap`), kill **CLS** (set image dimensions / aspect-ratio), lazy-load below the fold,
  keep JS lean via Server Components. Aim for green Core Web Vitals.

---

## 9. Responsive

- **Mobile-first.** Verify at **360 / 768 / 1024 / 1440**.
- Fluid type/space for big headings with `clamp()`.
- Touch targets ≥ 44px; no hover-only affordances on mobile.
- Reflow grids (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`), turn tables into cards, collapse
  nav into a Sheet/drawer.

---

## 10. The workflow — follow this every time

1. **Understand the brief:** purpose, audience, brand, content, emotion, any reference sites.
2. **Choose ONE register** (Section 3) and lock tokens — type pairing, color story, radius,
   spacing rhythm — *before* writing components.
3. **Set up the system:** wire `next/font`, define CSS variables, map the Tailwind theme,
   retheme shadcn. Get the foundation right and components fall into place.
4. **Build structure mobile-first** with **real content** (no lorem if real copy exists);
   establish hierarchy and spacing rhythm first, styling second.
5. **Apply the aesthetic:** typography, color, depth, imagery.
6. **Add states, motion, and responsive behavior.**
7. **Polish + a11y + performance pass** (Sections 8–9 and the checklist below).
8. **Self-critique:** "Template or $50k site? What's the single weakest element?" — fix it, repeat.

---

## 11. Pre-ship polish checklist

- [ ] One clear focal point and hierarchy per screen
- [ ] ≤ 2 typefaces, 5–6 sizes, consistent scale; body 16–18px at 60–75ch
- [ ] Small palette via semantic tokens; accent used sparingly; off-black/off-white
- [ ] One radius scale; soft layered shadows; hairline borders
- [ ] Consistent spacing on the 4/8px scale; generous, intentional whitespace
- [ ] Every interactive element: hover + **focus-visible** + active + disabled (+ loading)
- [ ] Empty, loading, and error states designed — not just the happy path
- [ ] Motion is subtle, fast, transform/opacity-based, and respects reduced-motion
- [ ] Contrast passes; semantic HTML; keyboard navigable; visible focus; alt text
- [ ] `next/image` + `next/font`; LCP prioritized; no layout shift; lean client JS
- [ ] Verified at 360 / 768 / 1024 / 1440
- [ ] Dark mode designed (if used), not auto-inverted
- [ ] **None** of the Section 2 AI tells are present
- [ ] Final gut check: this looks *designed*, not generated