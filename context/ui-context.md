# UI Context

## Theme

**Celestial Royale**: The visual system represents a premium observatory. Royal indigo and amethyst backgrounds are illuminated by champagne gold elements. The canvas alternates between a cool porcelain white for Light Mode and a deep ink-indigo for Dark Mode. 
*   **Theme Rules**:
    *   ❌ No warm cream or beige backgrounds in Light Mode.
    *   ❌ No gradients or color washes. Depth is achieved via solid panels, hairline borders, and SVG starfields/constellations.
    *   ✅ Equal visual quality in both Light and Dark themes.

## Color Tokens

All elements must use HSL variables mapped in `globals.css`.

| Role | Light Mode Variable | Hex | Dark Mode Variable | Hex | Use |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Page background** | `0 0% 100%` | `#FFFFFF` | `255 39% 6%` | `#0C0A16` | Main body bg |
| **Section muted** | `252 40% 97%` | `#F7F6FB` | `257 33% 10%`| `#14111F` | Alternating section bg |
| **Foreground** | `255 47% 13%` | `#1A1330` | `257 46% 94%`| `#ECEAF6` | Body text |
| **Card** | `0 0% 100%` | `#FFFFFF` | `258 30% 12%`| `#1A1530` | Content panels |
| **Primary** | `258 53% 45%` | `#5A37AE` | `258 53% 55%`| `#6E4FCB` | Buttons, highlights |
| **Secondary** | `255 50% 95%` | `#EFEBFB` | `258 28% 18%`| `#2A2340` | Muted buttons, pills |
| **Accent / Gold** | `40 57% 42%` | `#A9842F` | `40 62% 66%` | `#DCBE74` | Large text gold, highlights |
| **Gold hairline** | `41 53% 54%` | `#C9A24B` | `44 65% 78%` | `#ECD9A0` | Fine borders and SVG lines |
| **Border** | `255 28% 90%` | `#E4E0EF` | `258 26% 22%`| `#312A48` | Standard structural dividers |

## Typography

*   **Display / Headings**: **Fraunces** (optical-size serif, weights 550 to 600, tight tracking).
*   **Body / UI**: **Geist Sans** (weights 400 to 600).
*   **Charts / Tables**: **Geist Mono** (tabular numbers).
*   **Hindi**: **Noto Serif Devanagari** (headings) & **Mukta** (body).
*   **Bengali**: **Noto Serif Bengali** (headings) & **Hind Siliguri** (body).

## Border Radius

*   **Buttons / Inputs / Pills**: `rounded-md` (`8px`) or `rounded-full`.
*   **Cards / Content Panels**: `rounded-lg` (`12px` to `16px`).
*   **Dialogs / Overlays**: `rounded-xl` (`24px`).

## Component Library

*   **Base components**: shadcn/ui (Radix Primitives) for standard form elements, picker calendars, dropdown menus, and command interfaces.
*   **Aesthetic enhancements**: Aceternity UI components that do not contain baked-in CSS gradients:
    *   *Stars Background / Shooting Stars* (celestial atmosphere).
    *   *Infinite Moving Cards* (horizontal reviews loop).
    *   *Bento Grid* (feature blocks).
    *   *Tracing Beam* (reading paths on blog articles).
    *   *Spotlight* (re-engineered using single solid violet/gold radial glow rather than color grids).

## Layout Patterns

*   **Global Layout**: Sticky top navigation with thin gold bottom borders. Floating WhatsApp CTA FAB in bottom-right corner.
*   **Bento Grid**: Grid layout displaying free services and tools side-by-side.
*   **Responsive Results Page**: Shareable cards are centered on desktop in a focused panel. On mobile, they occupy the full viewport width and are optimized for standard 1080×1920 portrait dimensions.

## Iconography

*   **UI Icons**: `lucide-react` for standard interaction controls.
*   **Astrology Icons**: Custom thin-stroke SVG glyphs for zodiac signs and planetary indicators, filled with `--gold-line` color.

## Animation Guidelines (Framer Motion)

Animations represent slow, cosmic planetary movement.
*   **Section Entry**: `opacity 0 -> 1` and `y 24 -> 0` over `0.5s` with `viewport: { once: true }`.
*   **Zodiac Wheel**: Slow linear infinite rotation (60s loop) that pauses if `prefers-reduced-motion` is active.
*   **Card Hover**: Transform `y -4` and scale `1.02` with a gentle gold border glow.
*   **Accessibility**: Always respect `prefers-reduced-motion` settings.
