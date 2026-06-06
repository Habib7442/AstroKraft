# Library Docs

Project-specific usage patterns for every third-party library in AstroKraft. This file only covers how we use each library in this specific project — rules, patterns, and constraints specific to AstroKraft.

Read the relevant section before implementing any feature that touches these libraries.

---

## Before Using Any Library

Before implementing any feature that uses a third-party library:

1. **Check AGENTS.md** at the project root — it lists every skill installed for this project and how to use them. Skills contain up-to-date API documentation, usage patterns, and best practices specific to this codebase.

2. **Check if an MCP server is configured** for that library. Some tools have MCP servers that give the AI agent direct access to documentation, logs, and debugging tools. If an MCP server is available — use it before falling back to general knowledge.

3. **Read this file** for project-specific patterns that override general library knowledge.

The order of authority is:

```
MCP server (real-time docs) → Skills via AGENTS.md → This file (project rules) → General training knowledge
```

Never rely on general training knowledge alone for library APIs — they change frequently and training data may be outdated.

---

## Astrology API — FreeAstrologyAPI.com

**Check first:** Check AGENTS.md for an installed astrology skill.

### Free Tier Limits

- 80 requests/day, free forever, no credit card required
- API key authentication

### Kundli / Birth Chart

```typescript
// lib/astrology/providers/free-astrology-api.ts
const response = await fetch(
  `https://json.freeastrologyapi.com/horoscope`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.FREE_ASTROLOGY_API_KEY!,
    },
    body: JSON.stringify({
      year: birthDate.year,
      month: birthDate.month,
      date: birthDate.day,
      hours: birthTime.hours,
      minutes: birthTime.minutes,
      seconds: 0,
      latitude: location.lat,
      longitude: location.lng,
      timezone: location.timezone,
    }),
  }
);
```

### Kundli Matching (Guna Milan)

```typescript
const response = await fetch(
  `https://json.freeastrologyapi.com/match-making`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.FREE_ASTROLOGY_API_KEY!,
    },
    body: JSON.stringify({
      // Partner 1
      p1_year, p1_month, p1_date, p1_hours, p1_minutes,
      p1_latitude, p1_longitude, p1_timezone,
      // Partner 2
      p2_year, p2_month, p2_date, p2_hours, p2_minutes,
      p2_latitude, p2_longitude, p2_timezone,
    }),
  }
);
```

**Rules:**

- Always abstract behind `lib/astrology/` service layer — never call directly from components
- Always cache results by hash of normalized birth data — identical inputs must not cost API calls
- Rate-limit submissions per IP/session to protect free quota
- Queue + backoff on 429 responses — failover to Prokerala

---

## Astrology API — Prokerala

**Check first:** Check AGENTS.md for an installed Prokerala skill.

### Free Tier Limits

- 5,000 credits/month, free forever, no credit card required
- OAuth2 authentication (client ID + secret)

### Authentication

```typescript
// lib/astrology/providers/prokerala.ts
const tokenResponse = await fetch("https://api.prokerala.com/token", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    grant_type: "client_credentials",
    client_id: process.env.PROKERALA_CLIENT_ID!,
    client_secret: process.env.PROKERALA_CLIENT_SECRET!,
  }),
});
const { access_token } = await tokenResponse.json();
```

### Usage

- **Primary for**: regional language output (Hindi, Bengali, Tamil, Telugu), panchang, rashifol, muhurat
- **Secondary for**: kundli matching when FreeAstrologyAPI quota is exhausted

**Rules:**

- Always use Prokerala for multilingual matching output — the viral share card must render in the user's language
- Cache OAuth2 tokens — they last 1 hour, don't re-authenticate on every request
- Abstract behind `lib/astrology/` — provider can be swapped without touching UI

---

## Caching — Astrology Results

### Cache Key Pattern

```typescript
// lib/astrology/cache.ts
import { createHash } from "crypto";

function generateCacheKey(
  tool: "kundli" | "matching" | "horoscope" | "panchang",
  inputs: Record<string, unknown>
): string {
  const normalized = JSON.stringify(inputs, Object.keys(inputs).sort());
  const hash = createHash("sha256").update(normalized).digest("hex").slice(0, 16);
  return `astrology:${tool}:${hash}`;
}
```

### Cache Strategy

```typescript
// Check cache first
const cached = await redis.get(cacheKey);
if (cached) return JSON.parse(cached);

// Call API
const result = await provider.calculate(inputs);

// Cache result (kundli/matching = indefinite; horoscope = 24h)
await redis.set(cacheKey, JSON.stringify(result), {
  ex: tool === "horoscope" ? 86400 : undefined,
});

return result;
```

**Rules:**

- Kundli and matching results are **deterministic** — cache forever (no TTL)
- Horoscope/rashifol results expire after 24 hours
- Panchang results expire after 24 hours
- Never call the API without checking cache first
- Cache key must normalize inputs (sort keys, trim whitespace, round coordinates)

---

## Lenis (Smooth Scroll)

### Setup

```typescript
// components/providers/lenis-provider.tsx
"use client";

import { ReactLenis } from "lenis/react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
      {children}
    </ReactLenis>
  );
}
```

### Scroll Performance Hook

```typescript
// Integrated in LenisProvider — disables hover states during scroll
useEffect(() => {
  let timer: NodeJS.Timeout;
  const onScroll = () => {
    document.body.classList.add("disable-hover");
    clearTimeout(timer);
    timer = setTimeout(() => {
      document.body.classList.remove("disable-hover");
    }, 100);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, []);
```

**Rules:**

- Import `lenis/react` CSS styles in root layout
- Always wrap the app in `<LenisProvider>` — never use raw Lenis instances
- The `.disable-hover` class is critical for scroll performance — never remove it

---

## React Three Fiber (3D Globe)

### Canvas Setup

```typescript
// components/ui/3d-globe.tsx
<Canvas
  frameloop={isInView ? "always" : "never"}
  camera={{ position: [0, 0, globeSize * 4.0] }}
  style={{ overflow: "visible" }}
>
```

### IntersectionObserver Gating

```typescript
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => setIsInView(entry.isIntersecting),
    { threshold: 0.1 }
  );
  if (containerRef.current) observer.observe(containerRef.current);
  return () => observer.disconnect();
}, []);
```

**Rules:**

- Always gate the frame loop with IntersectionObserver — never render when off-screen
- Camera Z multiplier is `4.0` — prevents marker clipping at globe edges
- Canvas must have `overflow: "visible"` — prevents projected HTML marker clipping
- Marker `useFrame` callbacks must guard state updates with `isVisibleRef` to prevent redundant React updates
- Globe detail modal uses React Portal at `z-[9999]`

---

## Zustand (State Management)

```typescript
// lib/store/useGlobeStore.ts
import { create } from "zustand";

type GlobeStore = {
  selectedAstrologer: string | null;
  setSelectedAstrologer: (id: string | null) => void;
};

export const useGlobeStore = create<GlobeStore>((set) => ({
  selectedAstrologer: null,
  setSelectedAstrologer: (id) => set({ selectedAstrologer: id }),
}));
```

**Rules:**

- Stores live in `lib/store/`
- One store per domain concern (globe, cart, auth state)
- Never use Zustand in Server Components — client-side only
- Keep stores minimal — only global shared state that can't be lifted via props

---

## Framer Motion

```typescript
import { motion } from "motion/react";

// Section reveal
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
>

// Card hover
<motion.div
  whileHover={{ y: -4, scale: 1.02 }}
  transition={{ type: "spring", stiffness: 300, damping: 24 }}
>

// Button press
<motion.button whileTap={{ scale: 0.97 }}>
```

**Rules:**

- Import from `motion/react` (Framer Motion v12+)
- Never use `whileInView` with smooth scroll handlers on elements that need JS coordinate measurements — use CSS percentages instead
- Always respect `prefers-reduced-motion` — disable transforms/opacity reveals
- Animate only `transform` and `opacity` — never animate layout properties
- Use `viewport: { once: true }` for reveals — never replay on scroll back
- Stagger: `staggerChildren: 0.08` for grids/lists

---

## next-themes

```typescript
// Root layout
import { ThemeProvider } from "next-themes";

<ThemeProvider
  attribute="class"
  defaultTheme="dark"
  forcedTheme="dark"
  enableSystem={false}
  disableTransitionOnChange={false}
>
```

**Rules:**

- Currently forced to dark theme globally via `forcedTheme="dark"`
- Light theme tokens preserved in globals.css for future activation
- Theme toggle buttons removed from header/footer while dark mode is forced
- Both themes must maintain WCAG AA contrast ratios

---

## Razorpay (Payments)

**Check first:** Check AGENTS.md for an installed Razorpay skill.

### Integration Pattern

```typescript
// Client-side
const options = {
  key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  amount: priceInPaise, // always in paise (₹500 = 50000)
  currency: "INR",
  name: "AstroKraft",
  description: "Gemstone Purchase",
  handler: (response: RazorpayResponse) => {
    // verify payment on server
  },
};
const rzp = new (window as any).Razorpay(options);
rzp.open();
```

**Rules:**

- Amounts always in paise — never in rupees
- Always verify payment signature on the server — never trust client-side confirmation alone
- Include UPI as a payment method — it's the dominant payment mode in India

---

## shadcn/ui

**Check first:** Check AGENTS.md for an installed shadcn skill.

### Installation

```bash
npx shadcn@latest add [component]
```

### Used Components

Button, Card, Input, Label, Select, Calendar, Form (+ zod), Dialog, Sheet, Tabs, Accordion, Avatar, Badge, Tooltip, DropdownMenu, NavigationMenu, Command, Popover, Separator, Skeleton, Sonner (toasts), Breadcrumb.

**Rules:**

- Components live in `components/ui/` — never modify generated files unless required
- Use the CLI to add components — never write from scratch
- All shadcn components are styled via CSS variables from globals.css
- Never import shadcn components outside of `components/` — compose them into section/page components

---

## Environment Variables

All environment variables defined in `.env.local` for development. Never hardcode any key, URL, or secret.

| Variable | Used In |
| --- | --- |
| `FREE_ASTROLOGY_API_KEY` | lib/astrology/providers/ |
| `PROKERALA_CLIENT_ID` | lib/astrology/providers/ |
| `PROKERALA_CLIENT_SECRET` | lib/astrology/providers/ |
| `UPSTASH_REDIS_REST_URL` | lib/astrology/cache.ts |
| `UPSTASH_REDIS_REST_TOKEN` | lib/astrology/cache.ts |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | client-side payment |
| `RAZORPAY_KEY_SECRET` | server-side verification |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | lib/seo.ts |
| `NEXT_PUBLIC_SITE_URL` | lib/seo.ts |

`NEXT_PUBLIC_` prefix means the variable is exposed to the browser. Never add `NEXT_PUBLIC_` to secret keys.
