# UI Context

## Theme

**Celestial Royale**: The visual system represents a premium observatory — celestial, precise, and trustworthy. Royal indigo and amethyst backgrounds are illuminated by champagne gold elements. The canvas alternates between a cool porcelain white for Light Mode and a deep ink-indigo for Dark Mode. Currently forced to dark theme globally.

*   **Theme Rules**:
    *   ❌ No warm cream or beige backgrounds in Light Mode.
    *   ❌ No gradients or color washes. Depth is achieved via solid panels, hairline borders, soft shadows, and SVG starfield/constellation overlays.
    *   ✅ Equal visual quality in both Light and Dark themes.
    *   ✅ Premium observatory aesthetic — not a fortune-teller's stall.

## Color Tokens

All elements must use HSL variables mapped in `globals.css`. Never hardcode hex values.

| Role | Light Mode HSL | Hex | Dark Mode HSL | Hex | Use |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Page background** | `0 0% 100%` | `#FFFFFF` | `255 39% 6%` | `#0C0A16` | Main body bg |
| **Section muted** | `252 40% 97%` | `#F7F6FB` | `257 33% 10%` | `#14111F` | Alternating section bg |
| **Foreground** | `255 47% 13%` | `#1A1330` | `257 46% 94%` | `#ECEAF6` | Body text |
| **Card** | `0 0% 100%` | `#FFFFFF` | `258 30% 12%` | `#1A1530` | Content panels |
| **Primary (Violet)** | `258 53% 45%` | `#5A37AE` | `258 53% 55%` | `#6E4FCB` | Buttons, highlights |
| **Secondary** | `255 50% 95%` | `#EFEBFB` | `258 28% 18%` | `#2A2340` | Muted buttons, pills |
| **Accent / Gold** | `38 60% 36%` | `#A9842F` | `40 62% 66%` | `#DCBE74` | Large text gold, highlights |
| **Gold hairline** | `38 60% 36%` | `#C9A24B` | `44 65% 78%` | `#ECD9A0` | Fine borders and SVG lines |
| **Border** | `255 28% 90%` | `#E4E0EF` | `258 26% 22%` | `#312A48` | Standard structural dividers |
| **Destructive** | `356 57% 52%` | `#C8434B` | `356 68% 69%` | `#F0717A` | Error states |

## Typography

| Role | Font | Variable | Weight |
| :--- | :--- | :--- | :--- |
| Display / Headings | **Fraunces** (optical-size serif) | `--font-serif` | 550–600, tight tracking |
| Body / UI | **Geist Sans** | `--font-sans` | 400–600 |
| Charts / Tables | **Geist Mono** | `--font-mono` | Tabular numbers |
| Hindi headings | **Noto Serif Devanagari** | — | — |
| Hindi body | **Mukta** | — | — |
| Bengali headings | **Noto Serif Bengali** | — | — |
| Bengali body | **Hind Siliguri** | — | — |

**Type Scale:**

| Token | Size | Font / Weight | Use |
|-------|------|---------------|-----|
| `display` | `clamp(2.75rem, 6vw, 4.5rem)` | Fraunces 600, -0.02em | Hero H1 |
| `h1` | `clamp(2.25rem, 4vw, 3.25rem)` | Fraunces 600 | Page titles |
| `h2` | `clamp(1.75rem, 3vw, 2.5rem)` | Fraunces 600 | Section titles |
| `h3` | `clamp(1.375rem, 2vw, 1.75rem)` | Fraunces 550 | Subsections |
| `h4` | `1.25rem` | Geist 600 | Card titles |
| `body` | `1rem` | Geist 400, 1.65 lh | Default |
| `small` | `0.875rem` | Geist 450 | Meta, captions |
| `overline` | `0.75rem` | Geist 600, uppercase | Eyebrows (gold) |

## Border Radius

| Context | Class |
| :--- | :--- |
| Buttons / Inputs / Pills | `rounded-md` (8px) or `rounded-full` |
| Cards / Content Panels | `rounded-lg` (12px to 16px) |
| Dialogs / Overlays | `rounded-xl` (24px) |

## Component Library

*   **Base components**: shadcn/ui (Radix Primitives) for form elements, calendars, dropdown menus, command interfaces, sheets, and dialogs.
*   **Aesthetic enhancements**: Aceternity UI components that do NOT contain baked-in CSS gradients:
    *   *Stars Background / Shooting Stars* — celestial atmosphere
    *   *Infinite Moving Cards* — horizontal reviews loop
    *   *Bento Grid* — feature blocks with radial hover glows
    *   *Tracing Beam* — reading paths on blog articles
    *   *Spotlight* — single solid violet/gold radial glow (not a gradient sheet)
    *   *Following Pointer* — subtle pointer highlight for brand emphasis
*   **3D Globe**: React Three Fiber + Drei for interactive astrologer globe visualization with projected HTML marker avatars.

## Layout Patterns

*   **Global Layout**: Sticky transparent top navigation with thin gold bottom border. Floating WhatsApp CTA FAB in bottom-right corner.
*   **Hero Section**: Centered single-column typography layout with nebula background overlay and spotlight glows.
*   **Bento Grid**: Grid layout displaying astrologers and services side-by-side with GPU-composited cards.
*   **Responsive Results Page**: Shareable cards centered on desktop in a focused panel. On mobile, they occupy the full viewport width optimized for 1080×1920 portrait sharing.

## Icons

*   **UI Icons**: `lucide-react` for standard interaction controls (Compass, Star, Phone, MapPin, etc.).
*   **Social Icons**: Local PNG assets (`/social-icons/`) for WhatsApp, Facebook, Instagram.
*   **Astrology Icons**: Custom thin-stroke SVG glyphs for zodiac signs and planetary indicators, filled with `--gold-line` color.

## Animation Guidelines (Framer Motion)

Animations represent slow, cosmic planetary movement — calm, premium, purposeful. Nothing bounces or spins gratuitously.

*   **Section Entry**: `opacity 0 → 1` and `y 24 → 0` over `0.5s` with `viewport: { once: true }`.
*   **Card Hover**: Transform `y -4` and scale `1.02` with a gentle gold border glow. Limited to `transition-colors` for GPU performance.
*   **3D Globe**: Slow auto-rotation with IntersectionObserver-gated frame loop (`frameloop={isInView ? "always" : "never"}`).
*   **Pointer Highlight**: Pure-CSS percentage-based drawing animation (no JS ResizeObserver).
*   **Accessibility**: Always respect `prefers-reduced-motion` — disable transforms/opacity reveals.

## Scroll Performance

*   **Hover Disable on Scroll**: Body-level `.disable-hover` class applied during active scroll events to prevent pointer-event thrashing.
*   **GPU Compositor Layers**: Bento cards and background glows promoted with `will-change-transform` and `transform:translate3d(0,0,0)`.
*   **Lenis Smooth Scroll**: Physics-based scrolling with optimized frame scheduling.
