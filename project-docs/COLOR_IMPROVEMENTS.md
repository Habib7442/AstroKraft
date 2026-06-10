# AstroKraft — Color, Typography & Spacing Spec (for the coding agent)

**Site:** https://www.astrokraft.online/en
**Goal:** One coherent, premium, trustworthy system. Replace the generic cream with a clean **light** palette, and use one consistent card style.
**Direction — "Temple Light":** a luminous **lavender-white** base with **royal violet + gold** accents (and an optional saffron warm pop).

> ⚠️ Background is **LIGHT, not dark/black** (a dark background reads heavy / inauspicious for a spiritual brand) and **not cream** (too generic). Lavender-white is cool and violet-tinted — clearly *not* cream.
>
> Implement **Option A (Temple Light)** below. Option B (Neo-brutalist cards) is an alternative card style in the appendix — pick ONE card system, don't mix.

---

## 0. Root problem to fix

The page uses **3 visual languages**: a purple hero → **generic cream mid-sections** → mixed cards (white astrologer cards + bright neo-brutalist gemstone cards + white tool cards). Result: it doesn't feel like one brand, and the cream looks dated.

**The single biggest fix:** remove every cream/beige background and replace with the light lavender-white system below — bright and positive, with violet + gold doing the "premium + spiritual + trust" work.

---

## 1. Design Tokens (add to `globals.css`)

```css
:root {
  /* Backgrounds — LIGHT (lavender-white; NOT cream, NOT black) */
  --bg-base:     #F7F5FC;   /* primary section bg (soft lavender-white) */
  --bg-alt:      #FFFFFF;   /* alternate section bg */
  --bg-tint:     #F1ECFA;   /* optional deeper lavender for subtle strips */
  --violet-band: #3A1A78;   /* OPTIONAL one bold accent band (hero/footer) — deep violet, NOT black */

  /* Surfaces / cards */
  --card:               #FFFFFF;
  --card-border:        #ECE7F7;                       /* 1px hairline */
  --card-shadow:        0 10px 30px rgba(91,33,182,.08);
  --card-hover-shadow:  0 16px 40px rgba(91,33,182,.14);

  /* Accent */
  --violet:        #5B21B6;   /* primary: headings, buttons, links */
  --violet-bright: #6D28D9;   /* hover */
  --gold:          #B8860B;   /* icons, prices, dividers (deep gold = readable on light) */
  --gold-soft:     #C9A24B;   /* decorative gold only */
  --saffron:       #E8973A;   /* optional warm pop — badges/highlights (FILLS only, not text) */

  /* Text */
  --text:       #221A3D;   /* headings — deep indigo, NOT pure black */
  --text-body:  #4A4566;   /* body copy */
  --text-muted: #6E698A;   /* meta / captions */

  /* Status (tuned for light bg) */
  --success: #1E7A52;
  --danger:  #C0392B;
}
```

### Tailwind mapping (`tailwind.config.ts`)
```ts
extend: {
  colors: {
    base:   "#F7F5FC",
    alt:    "#FFFFFF",
    tint:   "#F1ECFA",
    card:   "#FFFFFF",
    violet: { DEFAULT: "#5B21B6", bright: "#6D28D9", band: "#3A1A78" },
    gold:   { DEFAULT: "#B8860B", soft: "#C9A24B" },
    saffron:"#E8973A",
    ink:    { DEFAULT: "#221A3D", body: "#4A4566", muted: "#6E698A" },
  },
  boxShadow: {
    card: "0 10px 30px rgba(91,33,182,.08)",
    cardHover: "0 16px 40px rgba(91,33,182,.14)",
  },
}
```

---

## 2. Backgrounds (per section)

| Section | Current | Change to |
|---|---|---|
| Announcement bar | yellow | `--violet` band, white/gold text (one bold strip) |
| Hero | dark purple | `--bg-base` with a **soft violet radial glow** + gold accents (light, luminous). *Optional:* one `--violet-band` hero if you want a single bold colored section. |
| Services strip | light strip | `--bg-alt` (#FFFFFF) |
| Meet Our Astrologers | **cream ❌** | `--bg-base` |
| Explore Gemstones | **cream ❌** | `--bg-alt` |
| Interactive Tools | **cream ❌** | `--bg-base` |
| Footer | navy/black | `--violet-band` (#3A1A78) with light text — one bold accent band (not black) |

**Rule:** alternate `--bg-base` and `--bg-alt` down the page for separation. **No cream, no dark/black reading surfaces.** A single deep-violet band (hero or footer) is fine as an accent.

---

## 3. Cards — ONE system (Option A, recommended)

Apply to **all** cards (astrologers, gemstones, tools — currently 3 different styles):

```css
.card {
  background: var(--card);                 /* white */
  border: 1px solid var(--card-border);    /* #ECE7F7 hairline */
  border-radius: 16px;
  box-shadow: var(--card-shadow);          /* soft violet-tinted */
  color: var(--text-body);
}
.card:hover { box-shadow: var(--card-hover-shadow); transform: translateY(-4px); transition: .25s; }
.card h3 { color: var(--text); }                          /* deep indigo */
.card .price, .card .rating, .card .badge { color: var(--gold); }
```

- White cards on the lavender-white bg + a violet-tinted shadow = clean, premium, luminous.
- Prices, ratings (stars), "Verified" ticks → **gold**.
- Remove the per-card random colors; everything uses the same `.card`.

---

## 4. Buttons (2 styles only, site-wide)

```css
.btn-primary {           /* main CTA */
  background: var(--violet); color:#fff; border:0;
  border-radius:10px; padding:.75rem 1.4rem; font-weight:600;
}
.btn-primary:hover { background: var(--violet-bright); }

.btn-secondary {         /* secondary CTA */
  background:#fff; color: var(--violet);
  border:1px solid var(--violet); border-radius:10px; padding:.75rem 1.4rem; font-weight:600;
}
.btn-secondary:hover { background:#F3EEFB; }

/* optional auspicious CTA (use sparingly, e.g. "Match Kundli ₹99") */
.btn-saffron { background: var(--saffron); color:#2A1620; border:0; border-radius:10px; font-weight:700; }
```
Replace the yellow nav button with `.btn-primary` (violet). Keep just these styles everywhere.

---

## 5. Text & accent rules

- Headings → `--text` (#221A3D) or `--violet`.
- Body → `--text-body` (#4A4566); meta → `--text-muted`.
- **Section eyebrows** (e.g. "OUR CELESTIAL OFFERINGS") → uppercase, letter-spaced, `--gold` or `--violet`.
- **One accent system: violet (primary) + gold (premium detail).** Saffron only as an occasional warm fill/badge — never as small text (low contrast on white).

---

## 6. Cosmic texture (ties sections together, light version)

Faint **violet/gold** constellation dots on the light bg (white dots won't show on light — use tinted):
```css
.stars-bg { position: relative; }
.stars-bg::before {
  content:""; position:absolute; inset:0; pointer-events:none;
  background-image:
    radial-gradient(2px 2px at 20% 30%, rgba(91,33,182,.12), transparent),
    radial-gradient(2px 2px at 70% 20%, rgba(184,134,11,.16), transparent),
    radial-gradient(2px 2px at 40% 70%, rgba(91,33,182,.10), transparent),
    radial-gradient(2px 2px at 85% 60%, rgba(184,134,11,.12), transparent);
}
```

---

## 7. Implementation checklist (priority order)

- [ ] **1. Remove all cream/beige backgrounds** → apply `--bg-base` (#F7F5FC) / `--bg-alt` (#FFFFFF). Biggest impact.
- [ ] **2. Lighten the hero** → light lavender + soft violet glow + gold (or one optional violet band). No dark/black reading surface.
- [ ] **3. Unify all cards** to the `.card` style (white + violet shadow + gold accents).
- [ ] **4. One accent system** = violet (primary) + gold (detail); saffron sparingly.
- [ ] **5. Two button styles only** (violet primary + violet-outline secondary); fix the yellow nav CTA.
- [ ] **6. Text colors**: `--text` headings, `--text-body` body, `--text-muted` meta.
- [ ] **7. Footer** → single deep-violet band (`--violet-band`) with light text.
- [ ] **8. Add faint violet/gold star texture** (`.stars-bg`).
- [ ] **9. Check contrast** (see §8).

---

## 8. Accessibility / contrast (light bg)

- Body `--text-body` (#4A4566) on `--bg-base` (#F7F5FC) → passes AA.
- Headings `--text` (#221A3D) → very strong contrast.
- Violet `#5B21B6` text on white → ~7:1 (AA/AAA) — safe for links/buttons.
- Gold `#B8860B` on white → ~4.6:1 — OK for **≥16px / large text & icons**; avoid tiny gold text.
- Saffron `#E8973A` → **low contrast as text** — use only as a fill/badge with dark text on top, never as text on white.
- Keep `:focus-visible` rings in `--violet`. Body ≥ 16px; touch targets ≥ 44px (mobile-first).

---

## 9. Typography

**Fonts — already correct on the live site, keep them:**
- Display / headings → **Fraunces** (`var(--font-fraunces)`)
- Body / UI → **Geist** (`var(--font-geist-sans)`)
- Numbers / prices / kundli tables → **Geist Mono** (`var(--font-geist-mono)`)

**Issue found:** the site uses fixed step sizes (no fluid scaling) — headings jump at breakpoints and the hero doesn't scale smoothly between phone and desktop. Switch to the **fluid `clamp()` scale** below.

### Type scale (fluid, mobile → desktop)

| Token | Use | Font | Weight | Size `clamp()` | Line-height | Letter-spacing |
|---|---|---|---|---|---|---|
| `display` | Hero H1 | Fraunces | 600 | `clamp(2.5rem, 6vw, 4.25rem)` | 1.05 | -0.02em |
| `h1` | Page title | Fraunces | 600 | `clamp(2rem, 4vw, 3rem)` | 1.1 | -0.02em |
| `h2` | Section title | Fraunces | 600 | `clamp(1.6rem, 3vw, 2.4rem)` | 1.15 | -0.01em |
| `h3` | Card title | Geist | 600 | `1.25rem` (20px) | 1.3 | 0 |
| `body-lg` | Lead paragraph | Geist | 400 | `1.125rem` (18px) | 1.7 | 0 |
| `body` | Default text | Geist | 400 | `1rem` (16px) | 1.65 | 0 |
| `small` | Meta / caption | Geist | 500 | `0.875rem` (14px) | 1.5 | 0 |
| `eyebrow` | Section label | Geist | 600 | `0.75rem` (12px) | 1.4 | **0.14em**, UPPERCASE |
| `price` | Prices / stats / ratings | Geist Mono | 500 | `1–1.25rem` | 1.3 | 0 |

```css
.t-display{font-family:var(--font-fraunces);font-weight:600;font-size:clamp(2.5rem,6vw,4.25rem);line-height:1.05;letter-spacing:-.02em;color:var(--text)}
.t-h2{font-family:var(--font-fraunces);font-weight:600;font-size:clamp(1.6rem,3vw,2.4rem);line-height:1.15;letter-spacing:-.01em;color:var(--text)}
.t-body{font-family:var(--font-geist-sans);font-weight:400;font-size:1rem;line-height:1.65;color:var(--text-body)}
.t-eyebrow{font-family:var(--font-geist-sans);font-weight:600;font-size:.75rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gold)}
.t-price{font-family:var(--font-geist-mono);font-weight:500;color:var(--gold)}
```

### Typography rules
- **Body never below 16px** on mobile; line-height ~1.6–1.7.
- Constrain paragraphs to **60–75 characters** (`max-width: 65ch`); keep centered section subtitles ≤ `60ch`.
- **Limit weights:** Fraunces 600 for headings; Geist 400 body, 500/600 for buttons/emphasis. Avoid 5+ weights.
- Tighten large Fraunces headings (`-0.02em`); space out uppercase eyebrows (`+0.14em`).
- Use **Geist Mono** for prices, ratings, countdowns, stats (tabular figures align cleanly).
- Headings → `--text`/`--violet`; body → `--text-body`.

---

## 10. Spacing & Layout

**Base unit: 4px.** Use only multiples: 4, 8, 12, 16, 24, 32, 48, 64, 96.

### Section rhythm (make this consistent — currently uneven)
- Section vertical padding: `padding-block: clamp(4rem, 8vw, 7rem)` (~64–112px) — **identical on every section**.
- Eyebrow → title gap: **12px**; title → subtitle: **12–16px**; heading block → content: **40–48px**.

### Container
- Max width: **1240px**, centered; side padding `clamp(1rem, 5vw, 2rem)`.
- Long-form reading width: `max-width: 70ch`.

### Grids & cards
- Card grid gap: **24px** desktop / **16px** mobile.
- Columns: 3 (desktop) → 2 (tablet) → 1 (mobile) for Astrologers / Gemstones / Tools.
- Card padding: **24px** (`1.5rem`), identical across all card types; inner row gaps 8–12px; card CTA `margin-top: 16px`.

### Radii (consistent)
- Buttons/inputs **10px**, cards **16px**, pills/badges **999px**.

### Fixes from the live site
- **Standardize section padding** — vertical spacing between sections is currently uneven.
- **Astrologer cards feel dense** — raise inner spacing to 12px between rows and give the button breathing room.
- **Hero headline** — make it the `display` size above so it scales smoothly (currently fixed).
- **Breakpoints (Tailwind):** sm 640 · md 768 · lg 1024 · xl 1280 — design mobile-first, test at 360–390px.

---

## Appendix — Option B: Neo-brutalist card style (alternative)

If you prefer energy over the calm premium look, use this card style **instead** (still on the **light lavender-white** background — bright cards + black borders pop on light too):

```css
.card-nb {
  background: #FFFFFF;            /* or rotate soft tints: #EDE7FF, #E7F6F0, #FFF1D9 */
  color: #221A3D;
  border: 2px solid #221A3D;     /* thick deep-indigo border (softer than pure black) */
  border-radius: 14px;
  box-shadow: 6px 6px 0 #5B21B6; /* hard offset shadow in violet (not black) */
}
.card-nb:hover { transform: translate(-2px,-2px); box-shadow: 8px 8px 0 #5B21B6; }
.card-nb .btn { background:#5B21B6; color:#fff; border-radius:999px; }
```
Rules if using Option B: keep the **light lavender-white background**, use a **fixed set of 3–4 soft tint card colors** rotated consistently, and use **violet** (not pure black) for borders/shadows to stay on-brand and less harsh. Gold remains the accent.

> Do **not** mix Option A and Option B. Pick one card language for the whole site.

---

*Summary: go LIGHT, not dark or cream — a luminous lavender-white base with royal violet + gold (and a touch of saffron) carries trust, spirituality, and premium feel while staying bright and auspicious. Unify to one card + button + accent system, add the fluid type scale, and standardize spacing.*