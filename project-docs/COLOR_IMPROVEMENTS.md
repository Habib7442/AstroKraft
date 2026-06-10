# AstroKraft — Color Improvement Spec (for the coding agent)

**Site:** https://www.astrokraft.online/en
**Goal:** Make the whole site one coherent, premium, trustworthy system. Kill the cream. Match the dark hero + footer everywhere, with one consistent card style.
**Direction:** Dark **indigo/violet + gold** (deep blue = trust, violet = spiritual, gold = premium).

> Implement **Option A (Premium Dark)** by default. Option B (Neo-brutalist) is an alternative card style at the bottom — pick ONE card system, don't mix.

---

## 0. Root problem to fix

The page currently uses **3 visual languages**: premium purple-gradient hero → **generic cream/beige mid-sections** → mixed cards (white astrologer cards + bright neo-brutalist gemstone cards + white tool cards). Result: it doesn't feel like one brand, and the cream looks dated.

**The single biggest fix:** remove every cream/beige background and replace with the dark indigo system below.

---

## 1. Design Tokens (add to `globals.css`)

```css
:root {
  /* Backgrounds */
  --bg-base:        #0E1230;   /* primary dark section bg */
  --bg-alt:         #141A3D;   /* alternate section bg (for separation) */
  --bg-footer:      #0A0E26;   /* footer / deepest */
  --hero-gradient:  linear-gradient(135deg, #0B1026 0%, #2A1A5E 55%, #4C1D95 100%);

  /* Surfaces / cards */
  --card:           #1A2150;   /* elevated dark panel */
  --card-2:         #20285E;   /* hover / raised */
  --border:         #2A2F5E;   /* default 1px border */
  --border-gold:    rgba(201,162,75,.30); /* premium gold hairline */
  --shadow-card:    0 12px 40px rgba(5,6,20,.50);

  /* Accent */
  --gold:           #E2C27A;   /* primary accent (icons, prices, dividers, eyebrows) */
  --gold-deep:      #C9A24B;   /* gold borders / strokes */
  --violet:         #5B21B6;   /* primary action / buttons */
  --violet-bright:  #7C3AED;   /* button hover */

  /* Text */
  --text:           #F4F2FB;   /* headings / strong */
  --text-body:      #C7C3DE;   /* body copy (soft lavender-grey, not pure white) */
  --text-muted:     #8E89A8;   /* meta / captions */

  /* Status */
  --success:        #5FD3A0;
  --danger:         #F0717A;
}
```

### Tailwind mapping (`tailwind.config.ts`)
```ts
extend: {
  colors: {
    base:   "#0E1230",
    alt:    "#141A3D",
    card:   "#1A2150",
    gold:   { DEFAULT: "#E2C27A", deep: "#C9A24B" },
    violet: { DEFAULT: "#5B21B6", bright: "#7C3AED" },
    ink:    { DEFAULT: "#F4F2FB", body: "#C7C3DE", muted: "#8E89A8" },
  },
  boxShadow: { card: "0 12px 40px rgba(5,6,20,.50)" },
}
```

---

## 2. Backgrounds (per section)

| Section | Current | Change to |
|---|---|---|
| Announcement bar | yellow | `--violet` bg OR dark with `--gold` text |
| Hero | purple gradient ✅ | keep; use `--hero-gradient` |
| Services strip | light strip | `--bg-base` (sits under hero) |
| Meet Our Astrologers | **cream ❌** | `--bg-base` |
| Explore Gemstones | **cream ❌** | `--bg-alt` |
| Interactive Tools | **cream ❌** | `--bg-base` |
| Footer | navy ✅ | `--bg-footer` |

**Rule:** alternate `--bg-base` and `--bg-alt` down the page for separation. **No cream anywhere.**

---

## 3. Cards — ONE system (Option A, recommended)

Apply this to **all** cards (astrologers, gemstones, tools — currently 3 different styles):

```css
.card {
  background: var(--card);
  border: 1px solid var(--border-gold);   /* gold hairline = premium */
  border-radius: 16px;
  box-shadow: var(--shadow-card);
  color: var(--text-body);
}
.card:hover { background: var(--card-2); transform: translateY(-4px); transition: .25s; }
.card h3 { color: var(--text); }
.card .price, .card .rating, .card .badge { color: var(--gold); }
```

- Prices, ratings (stars), and "Verified" ticks → **gold**.
- Remove the white card backgrounds and the per-card random colors; everything uses `--card`.

---

## 4. Buttons (2 styles only, site-wide)

```css
.btn-primary {            /* main CTA */
  background: var(--violet); color:#fff; border:0;
  border-radius: 10px; padding:.75rem 1.4rem; font-weight:600;
}
.btn-primary:hover { background: var(--violet-bright); }

.btn-secondary {          /* secondary CTA */
  background: transparent; color: var(--gold);
  border: 1px solid var(--gold-deep); border-radius:10px; padding:.75rem 1.4rem; font-weight:600;
}
.btn-secondary:hover { background: rgba(226,194,122,.08); }
```
Replace the yellow nav button with `.btn-primary` (violet) or a gold version. Keep it consistent everywhere.

---

## 5. Text & accent rules

- Headings → `--text` (#F4F2FB) or `--gold`.
- Body → `--text-body` (#C7C3DE) — **not** pure white (less harsh on dark).
- Meta/labels → `--text-muted`.
- **Section eyebrows** (e.g. "OUR CELESTIAL OFFERINGS") → uppercase, letter-spaced, `--gold`.
- **One accent only: gold.** Use it for icons, dividers, prices, ratings, badges. Violet is for buttons/links. Stop using yellow + gold + multiple card colors together.

---

## 6. Cosmic texture (ties sections to the hero)

Add a faint starfield over dark sections (very subtle):
```css
.stars-bg { position: relative; }
.stars-bg::before {
  content:""; position:absolute; inset:0; pointer-events:none; opacity:.07;
  background-image:
    radial-gradient(1.5px 1.5px at 20% 30%, #fff, transparent),
    radial-gradient(1.5px 1.5px at 70% 20%, #fff, transparent),
    radial-gradient(1.5px 1.5px at 40% 70%, #fff, transparent),
    radial-gradient(1.5px 1.5px at 85% 60%, #fff, transparent);
}
```

---

## 7. Implementation checklist (priority order)

- [ ] **1. Remove all cream/beige backgrounds** → apply `--bg-base` / `--bg-alt` (biggest impact).
- [ ] **2. Unify all cards** to the `.card` style (Option A).
- [ ] **3. One accent = gold** across icons, prices, ratings, dividers, eyebrows.
- [ ] **4. Two button styles only** (violet primary + gold-outline secondary); fix the yellow nav CTA.
- [ ] **5. Text colors**: `--text` headings, `--text-body` body, `--text-muted` meta.
- [ ] **6. Add subtle starfield** (`.stars-bg`) to dark sections.
- [ ] **7. Footer** → `--bg-footer`; ensure it matches the new system.
- [ ] **8. Check contrast** (see §8) after applying.

---

## 8. Accessibility / contrast

- Body text on `--bg-base`/`--card`: use `--text-body` (#C7C3DE) → passes AA.
- Don't use small gold text on light chips; gold text is fine on the dark bg.
- Keep body ≥ 16px; buttons/touch targets ≥ 44px (mobile is the priority device).
- Maintain focus-visible rings (use `--violet` or `--gold`).

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
.t-display{font-family:var(--font-fraunces);font-weight:600;font-size:clamp(2.5rem,6vw,4.25rem);line-height:1.05;letter-spacing:-.02em}
.t-h2{font-family:var(--font-fraunces);font-weight:600;font-size:clamp(1.6rem,3vw,2.4rem);line-height:1.15;letter-spacing:-.01em}
.t-body{font-family:var(--font-geist-sans);font-weight:400;font-size:1rem;line-height:1.65;color:var(--text-body)}
.t-eyebrow{font-family:var(--font-geist-sans);font-weight:600;font-size:.75rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gold)}
.t-price{font-family:var(--font-geist-mono);font-weight:500}
```

### Typography rules
- **Body never below 16px** on mobile; line-height ~1.6–1.7.
- Constrain paragraphs to **60–75 characters** (`max-width: 65ch`); keep centered section subtitles ≤ `60ch` so they don't stretch full width.
- **Limit weights:** Fraunces 600 for headings; Geist 400 body, 500/600 for buttons/emphasis. Avoid 5+ weights.
- Tighten large Fraunces headings (`-0.02em`); space out uppercase eyebrows (`+0.14em`).
- Use **Geist Mono** for prices, ratings, countdowns, stats (tabular figures align cleanly).
- On the dark bg: headings → `--text`, body → `--text-body`.

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
- Card padding: **24px** (`1.5rem`), identical across all card types; inner row gaps 8–12px; give the card CTA `margin-top: 16px`.

### Radii (consistent)
- Buttons/inputs **10px**, cards **16px**, pills/badges **999px**.

### Fixes from the live site
- **Standardize section padding** — vertical spacing between sections is currently uneven.
- **Astrologer cards feel dense** — raise inner spacing to 12px between rows and give the button breathing room.
- **Hero headline** — make it the `display` size above so it scales smoothly (currently fixed).
- **Breakpoints (Tailwind):** sm 640 · md 768 · lg 1024 · xl 1280 — design mobile-first, test at 360–390px.

---

## Appendix — Option B: Neo-brutalist card style (alternative)

If you prefer energy over premium-dark, use this card style **instead** (apply to ALL cards, on the same dark `--bg-base`/`--bg-alt` — bright cards pop on dark):

```css
.card-nb {
  background: #FCE7A8;            /* or rotate: #E9D5FF lilac, #BAF7E0 mint, #FBCFE8 pink */
  color: #14111F;
  border: 2px solid #0A0E26;     /* thick near-black border */
  border-radius: 14px;
  box-shadow: 6px 6px 0 #0A0E26; /* hard offset shadow, no blur */
}
.card-nb:hover { transform: translate(-2px,-2px); box-shadow: 8px 8px 0 #0A0E26; }
.card-nb .btn { background:#0A0E26; color:#fff; border-radius:999px; }
```
Rules if using Option B: keep the **dark indigo background** (don't go cream), use a **fixed set of 3–4 card colors** rotated consistently, thick black borders + hard shadows on **every** card type. Still keep gold as the accent on the dark background/headers.

> Do **not** mix Option A and Option B. Pick one card language for the whole site.

---

*Summary: kill the cream, take the page dark (indigo/violet + gold) like the hero and footer, and use one consistent card + button + accent system. That single move makes the site look premium, trustworthy, and unified.*