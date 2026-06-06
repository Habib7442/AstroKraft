# UI Tokens

Design tokens for AstroKraft's **Celestial Royale** theme. All colors, typography, spacing, and component values are defined here. Use these exact values throughout the codebase — never hardcode colors or use raw Tailwind color classes in components.

---

## How to Use

This project uses **Tailwind CSS v4**. All design tokens are defined using the `@theme inline` directive in `app/globals.css`. No `tailwind.config.ts` needed for colors or tokens.

Tailwind v4 automatically generates utility classes from `@theme` variables:

- `--color-accent` → `bg-accent`, `text-accent`, `border-accent`
- `--color-gold` → `bg-gold`, `text-gold`, `border-gold`
- `--color-primary` → `bg-primary`, `text-primary`, `border-primary`

```tsx
// Correct — uses generated utility classes
className="bg-card text-foreground border-border"

// Also correct — references CSS variable directly
style={{ color: 'var(--accent)' }}

// Never — hardcoded hex values
className="bg-[#0C0A16] text-[#ECEAF6]"

// Never — raw Tailwind color classes
className="bg-purple-500 text-gray-600"
```

---

## globals.css — Complete Token Definition

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --font-serif: var(--font-fraunces);
  --font-heading: var(--font-geist-sans);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-gold: var(--gold-line);
  --color-surface-muted: var(--surface-muted);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
}

:root {
  --background: hsl(255 20% 98.5%);        /* cool porcelain white */
  --surface-muted: hsl(252 40% 97%);       /* #F7F6FB alternating section bg */
  --foreground: hsl(255 47% 13%);          /* #1A1330 ink-indigo text */
  --card: hsl(0 0% 100%);                 /* #FFFFFF */
  --card-foreground: hsl(255 47% 13%);
  --popover: hsl(0 0% 100%);
  --popover-foreground: hsl(255 47% 13%);

  --primary: hsl(258 53% 45%);            /* #5A37AE royal violet */
  --primary-foreground: hsl(0 0% 100%);
  --secondary: hsl(255 50% 95%);          /* #EFEBFB violet tint */
  --secondary-foreground: hsl(263 53% 24%);
  --accent: hsl(38 60% 36%);              /* #A9842F champagne gold */
  --accent-foreground: hsl(0 0% 100%);
  --gold-line: hsl(38 60% 36%);           /* hairline strokes / icons */

  --muted: hsl(255 30% 95%);              /* #EEEBF5 */
  --muted-foreground: hsl(258 16% 40%);
  --border: hsl(255 28% 90%);             /* #E4E0EF */
  --input: hsl(255 28% 90%);
  --ring: hsl(258 53% 45%);               /* focus = primary */

  --radius: 0.75rem;

  --destructive: hsl(356 57% 52%);
  --destructive-foreground: hsl(0 0% 100%);
}

.dark {
  --background: hsl(255 39% 6%);           /* #0C0A16 ink */
  --surface-muted: hsl(257 33% 10%);       /* #14111F */
  --foreground: hsl(257 46% 94%);          /* #ECEAF6 soft lavender-white */
  --card: hsl(258 30% 12%);               /* #1A1530 elevated */
  --card-foreground: hsl(257 46% 94%);
  --popover: hsl(258 30% 12%);
  --popover-foreground: hsl(257 46% 94%);

  --primary: hsl(258 53% 55%);            /* #6E4FCB brighter violet */
  --primary-foreground: hsl(257 46% 96%);
  --secondary: hsl(258 28% 18%);          /* #2A2340 */
  --secondary-foreground: hsl(255 50% 90%);
  --accent: hsl(40 62% 66%);              /* #DCBE74 champagne gold */
  --accent-foreground: hsl(255 39% 8%);
  --gold-line: hsl(44 65% 78%);           /* #ECD9A0 hairlines on dark */

  --muted: hsl(258 25% 18%);              /* #2A2340 */
  --muted-foreground: hsl(255 22% 72%);   /* #ACA4C6 */
  --border: hsl(258 26% 22%);             /* #312A48 */
  --input: hsl(258 26% 22%);
  --ring: hsl(258 53% 62%);

  --destructive: hsl(356 68% 69%);
  --destructive-foreground: hsl(255 39% 6%);
}
```

Tailwind v4 generates utility classes automatically from every `--color-*` token above:

- `bg-accent`, `text-accent`, `border-accent`
- `bg-gold`, `text-gold`, `border-gold`
- `bg-primary`, `text-primary`, `border-primary`
- `bg-surface-muted`, `bg-card`, `text-foreground`
- etc.

---

## Color Usage Guide

### Page Layout

| Element | Token |
| --- | --- |
| Page background | `bg-background` |
| Alternating section bg | `bg-surface-muted` |
| Card / surface | `bg-card` |
| Default border | `border-border` |

### Typography

| Element | Token |
| --- | --- |
| Body text, headings | `text-foreground` |
| Muted labels, timestamps | `text-muted-foreground` |
| Gold accent text (large only) | `text-accent` |
| Gold hairline SVG strokes | `text-gold` |

### Primary (Royal Violet)

Used for: primary buttons, active nav items, focus rings, CTAs.

| Element | Token |
| --- | --- |
| Button background | `bg-primary` |
| Button text | `text-primary-foreground` |
| Light badge background | `bg-secondary` |

### Accent (Champagne Gold)

Used for: headings emphasis, eyebrow labels, hairline borders, SVG strokes, icon fills, verified badges.

| Element | Token |
| --- | --- |
| Gold text (large only, ≥16px) | `text-accent` |
| Gold hairlines / borders | `border-gold` |
| Icon fills | `text-gold` |

> **Rule:** Gold is decorative/structural (lines, icons, borders, large headings). When gold conveys text meaning, use the darker shade. Never small gold text on light below 16px.

### Status Colors

| Status | Light | Dark |
| --- | --- | --- |
| Success | `#2E9E6B` | `#5FD3A0` |
| Warning | `#C9A24B` (gold) | `#E6C879` |
| Danger | `#C8434B` | `#F0717A` |
| Info | Amethyst | Amethyst |

### WhatsApp Brand

| Element | Value |
| --- | --- |
| WhatsApp button bg | `#25D366` |
| WhatsApp icon | `/social-icons/whatsapp.png` |

---

## Typography

| Element | Size | Weight | Font | Color |
| --- | --- | --- | --- | --- |
| Hero H1 | `clamp(2.75rem, 6vw, 4.5rem)` | 600 | Fraunces | `text-foreground` |
| Page title | `clamp(2.25rem, 4vw, 3.25rem)` | 600 | Fraunces | `text-foreground` |
| Section heading | `clamp(1.75rem, 3vw, 2.5rem)` | 600 | Fraunces | `text-foreground` |
| Card title | `1.25rem` | 600 | Geist Sans | `text-foreground` |
| Body text | `1rem` | 400 | Geist Sans | `text-foreground` |
| Small / meta | `0.875rem` | 450 | Geist Sans | `text-muted-foreground` |
| Eyebrow / overline | `0.75rem` | 600, uppercase | Geist Sans | `text-accent` (gold) |

Font family: **Fraunces** (display) + **Geist Sans** (body) — loaded via `next/font/google` and `next/font`.

---

## Spacing

| Token | Value | Usage |
| --- | --- | --- |
| `gap-2` | 8px | Badge and tag gaps |
| `gap-3` | 12px | Form field gaps |
| `gap-4` | 16px | Section internal gaps |
| `gap-6` | 24px | Between sections |
| `gap-7` / `gap-8` | 28–32px | Hero content spacing |
| `p-4` | 16px | Card padding |
| `p-6` | 24px | Large card padding |
| `py-20 md:py-28` | 80–112px | Section vertical padding |

---

## Component Tokens

### Cards

```
background: bg-card
border: 1px solid var(--border) OR 1px gold-line at low opacity for premium
border-radius: rounded-lg (12–16px)
padding: 24px (p-6)
shadow: subtle violet-tinted (no neon)
hover: will-change-transform, transition-colors only (GPU composited)
```

### Buttons

**Primary (Violet):**

```
background: bg-primary
text: text-primary-foreground
border-radius: rounded-md
padding: px-4 py-2
hover: gold ring fade-in
active: whileTap scale(0.97)
```

**Gold Outline (CTA):**

```
background: transparent
border: 1px solid var(--gold-line)
text: text-accent
border-radius: rounded-md
hover: bg-accent/10
```

**WhatsApp:**

```
background: #25D366
text: white
icon: /social-icons/whatsapp.png
border-radius: rounded-md
```

### Input Fields

```
background: bg-card
border: border border-border
border-radius: rounded-md
padding: px-3 py-2
text: text-foreground
placeholder: text-muted-foreground
focus: ring-1 ring-primary
```

### Badges

```
border-radius: rounded-full
padding: px-2 py-0.5
font-size: text-xs
font-weight: font-medium
```

### Elevation / Shadows

```
--shadow-sm:  0 1px 2px hsl(258 40% 20% / .06)
--shadow-md:  0 4px 16px hsl(258 40% 20% / .08)
--shadow-lg:  0 12px 40px hsl(258 45% 18% / .12)
--ring-gold-hover: 0 0 0 1px hsl(var(--gold-line) / .5)
```

---

## Invariants

- Never use hex values directly in components — always use CSS variables via Tailwind tokens
- Font is Fraunces (display) + Geist Sans (body) — always load via `next/font`, never use system fonts
- Never use raw Tailwind color classes like `bg-purple-500` or `text-gray-600` — use project tokens only
- `--primary` is the only violet — never use Tailwind's built-in purple scale
- `--accent` / `--gold-line` is the only gold — never use Tailwind's built-in amber/yellow
- All borders default to `--border` — never use `border-gray-*`
- No CSS gradients — depth via solids, hairlines, and shadows only
- Gold text must be ≥16px on light backgrounds for WCAG AA compliance
