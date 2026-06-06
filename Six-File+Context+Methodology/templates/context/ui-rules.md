# UI Rules

Concise rules for building AstroKraft UI. The DESIGN.md is the source of truth for visual decisions. These rules cover the most important patterns and constraints to keep the UI consistent without over-specifying every detail.

---

## Fonts

Display headings use Fraunces, body/UI uses Geist Sans, tabular data uses Geist Mono. All loaded via `next/font` in the root layout.

```typescript
import { Fraunces } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
```

The font variables (`--font-geist-sans`, `--font-fraunces`, `--font-geist-mono`) are declared in `@theme inline` in globals.css. Apply font variable classes to the `<html>` tag. Never use system fonts as the primary font.

---

## Layout

- Content max-width: `max-w-7xl` (1280px), centered
- Section vertical padding: `py-20 md:py-28`
- Hero top padding: `pt-32 md:pt-36 lg:pt-40` (clear the transparent header)
- Hero content spacing: `gap-7 md:gap-8`
- Header: sticky/absolute, transparent background, no backdrop blur, no bottom border
- All pages use top navbar only — no sidebar, no drawer (except mobile nav sheet)
- Floating WhatsApp FAB in bottom-right corner

---

## Navbar

Navigation items: Astrologers · Gemstones · Free Tools · Panchang · Blog.

- Active item: `text-primary` (violet), font-weight 500
- Inactive item: `text-foreground`, font-weight 500
- No underline — active state is color change only
- Desktop: full navigation visible
- Mobile: hamburger → Sheet drawer with language switcher inside
- Header background: `bg-transparent` — no backdrop blur, allowing hero background to show through

---

## Cards

Content sections live in cards with glassmorphic effects.

```
background: bg-card
border: 1px solid var(--border)
border-radius: rounded-lg (12–16px)
padding: p-6 (24px)
shadow: subtle violet-tinted shadow
hover: transition-colors only (GPU composited, no box-shadow animations)
gpu-promotion: will-change-transform, transform:translate3d(0,0,0)
```

Premium cards get a 1px `--gold-line` border at low opacity. Never use colored card backgrounds — color goes inside via badges, text, and icons. The bento grid uses pure-CSS radial hover glows (not Framer Motion) matching each card's accent color.

---

## Typography Hierarchy

**Display / Hero (Fraunces):**

```
font-size: clamp(2.75rem, 6vw, 4.5rem)
font-weight: 600
letter-spacing: -0.02em
color: text-foreground
font-family: font-serif (Fraunces)
```

**Section headings (Fraunces):**

```
font-size: clamp(1.75rem, 3vw, 2.5rem)
font-weight: 600
color: text-foreground
```

**Card titles (Geist Sans):**

```
font-size: 1.25rem
font-weight: 600
color: text-foreground
```

**Body text (Geist Sans):**

```
font-size: 1rem (never below 16px on mobile)
font-weight: 400
line-height: 1.65
color: text-foreground
```

**Eyebrow / Overline (Geist Sans, gold):**

```
font-size: 0.75rem
font-weight: 600
letter-spacing: 0.12em
text-transform: uppercase
color: text-accent (gold)
```

---

## Badges

All badges use `rounded-full` (pill shape).

```
padding: px-2 py-0.5
font-size: text-xs
font-weight: font-medium
```

Specialty badges: `bg-secondary text-secondary-foreground`
Verified badges: gold accent with checkmark icon

---

## Buttons

**Primary (Violet):**

```
background: bg-primary (#5A37AE / #6E4FCB)
color: text-primary-foreground (white)
border-radius: rounded-md (8px)
padding: px-4 py-2
hover: gold ring fade-in
active: whileTap scale(0.97)
```

**Gold Outline:**

```
background: transparent
border: 1px solid var(--gold-line)
color: text-accent
border-radius: rounded-md
hover: bg-accent/10
```

**WhatsApp CTA:**

```
background: #25D366 (official brand green)
color: white
icon: /social-icons/whatsapp.png (not Lucide MessageCircle)
border-radius: rounded-md
```

---

## Form Inputs

```
background: bg-card
border: 1px solid var(--border)
border-radius: rounded-md (8px)
padding: px-3 py-2
font-size: 14px (text-sm)
color: text-foreground
placeholder: text-muted-foreground
focus: ring-1 ring-primary
touch-target: ≥44px (thumb-reachable)
```

---

## Social Icons

- Use local PNG assets from `/social-icons/` — not Lucide brand icons
- No `dark:invert` filter — show original brand colors
- Custom hover transitions per platform:
  - **Facebook**: blue border + background highlight
  - **Instagram**: gradient-mimicking color shift
  - **WhatsApp**: green border + background highlight
- Scale transform on hover: `scale(1.1)`

---

## 3D Globe

- IntersectionObserver-gated frame loop to save GPU when off-screen
- Camera Z-position multiplier: `4.0` (prevents clipping at edges)
- Canvas `overflow: "visible"` to prevent avatar marker clipping
- Glassmorphic details modal via React Portal at `z-[9999]`

---

## Bento Grid Performance

- Cards promoted to GPU compositor layers: `will-change-transform`, `[transform:translate3d(0,0,0)]`
- Hover animations limited to `transition-colors` (no CPU box-shadow recalculations)
- Background glows: pure CSS radial gradients (not Framer Motion)
- Grid row heights: `md:auto-rows-[14.5rem]`

---

## Empty States

Every section that can be empty must have an empty state:

- Short descriptive text in `text-muted-foreground`
- Optional gold-accent icon above text
- CTA button if there's a logical next action

---

## Tailwind v4 Note

This project uses Tailwind v4. Tokens are defined with `@theme inline` in globals.css — no `tailwind.config.ts` needed. Never define colors in a config file. Always use `@theme inline` for new tokens.

---

## Do Nots

- Never use Tailwind's built-in color classes (`bg-purple-500`, `text-gray-600`) — use project tokens only
- Never define colors in `tailwind.config.ts` — use `@theme inline` in globals.css
- Never add CSS gradients to any backgrounds — depth via solids, hairlines, shadows, and constellation overlays
- Never use `backdrop-blur` on elements that scroll frequently — replace with solid `bg-card` for performance
- Never show raw error messages to users — always show human-readable text
- Never use `position: fixed` for main UI elements — use normal flow layout (except WhatsApp FAB)
- Never use Lucide icons for social brand logos — use local PNGs from `/social-icons/`
- Never use `dark:invert` on social icon images
- Never animate box-shadow or backdrop-blur during scroll — use `transition-colors` only
