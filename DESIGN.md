---
name: Vedic Cosmic Premium
colors:
  surface: '#fdf7ff'
  surface-dim: '#dfd4ff'
  surface-bright: '#fdf7ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f1ff'
  surface-container: '#f2ebff'
  surface-container-high: '#ede4ff'
  surface-container-highest: '#e7deff'
  on-surface: '#1e1639'
  on-surface-variant: '#4a4453'
  inverse-surface: '#332b4f'
  inverse-on-surface: '#f5eeff'
  outline: '#7b7485'
  outline-variant: '#ccc3d6'
  surface-tint: '#713dcc'
  primary: '#420093'
  on-primary: '#ffffff'
  primary-container: '#5b21b6'
  on-primary-container: '#c7aaff'
  inverse-primary: '#d3bbff'
  secondary: '#7b5800'
  on-secondary: '#ffffff'
  secondary-container: '#fdc34d'
  on-secondary-container: '#715000'
  tertiary: '#4c2a00'
  on-tertiary: '#ffffff'
  tertiary-container: '#6c3e00'
  on-tertiary-container: '#faa648'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ebddff'
  primary-fixed-dim: '#d3bbff'
  on-primary-fixed: '#250059'
  on-primary-fixed-variant: '#581db3'
  secondary-fixed: '#ffdea6'
  secondary-fixed-dim: '#f7bd48'
  on-secondary-fixed: '#271900'
  on-secondary-fixed-variant: '#5d4200'
  tertiary-fixed: '#ffdcbd'
  tertiary-fixed-dim: '#ffb86e'
  on-tertiary-fixed: '#2c1600'
  on-tertiary-fixed-variant: '#693c00'
  background: '#fdf7ff'
  on-background: '#1e1639'
  surface-variant: '#e7deff'
typography:
  display-lg:
    fontFamily: Bodoni Moda
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-sm:
    fontFamily: Bodoni Moda
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  section-gap: 80px
---

## Brand & Style
This design system establishes a high-end D2C marketplace aesthetic that bridges ancient Vedic wisdom with modern luxury. The visual direction is rooted in **Minimalism** and **Glassmorphism**, utilizing expansive white space to denote premium quality, punctuated by deep cosmic textures that evoke the infinite nature of the stars.

The target audience seeks spiritual guidance and high-quality ritual products; therefore, the UI must feel authoritative yet serene. We employ a "Celestial Polish" style: crisp layouts, thin golden accents, and soft, violet-tinted depths that differentiate the product from cluttered, traditional astrology platforms.

## Colors
The palette is dominated by **Royal Violet**, representing intuition and the crown chakra, complemented by **Champagne Gold** to signify prosperity and divine value. 

- **Primary Violet:** Used for main actions and brand identifiers.
- **Champagne Gold:** Reserved for accents, ratings, and premium indicators.
- **Saffron:** A functional highlight specifically for "Sales," "Offers," or "New" badges to maintain cultural resonance without breaking the luxury aesthetic.
- **Cosmic Gradient:** Used sparingly for hero sections and high-impact immersive areas to provide depth.

## Typography
The typography strategy pairings high-contrast editorial serifs with technical sans-serifs. 

- **Headings:** We utilize **Bodoni Moda** (as a high-end alternative to Fraunces) for its razor-sharp serifs and vertical stress, evoking a "Vogue-meets-Veda" editorial feel. 
- **Body & UI:** **Geist** provides a clean, monospaced-adjacent precision that balances the ornate headings. It ensures technical data (like horoscope degrees or prices) remains highly legible and modern.
- **Scaling:** Display sizes should reduce by approximately 30% on mobile devices to maintain readability without overwhelming the viewport.

## Layout & Spacing
The layout follows a **Fluid Grid** model with generous margins to enforce a sense of exclusivity. 

- **Desktop:** 12-column grid with 64px side margins. Elements are often center-aligned to create a focal point.
- **Mobile:** 4-column grid with 16px margins. 
- **Rhythm:** Use an 8px base grid. Section vertical spacing is intentionally large (80px+) to allow the products and insights to "breathe," mirroring the meditative nature of the brand.

## Elevation & Depth
Depth is created through **Tonal Layers** and **Violet-Tinted Shadows**. 

- **Shadow Profile:** Shadows should not be neutral grey. Use a soft `#5B21B6` tint at very low opacity (5-8%) to maintain the cosmic color story.
- **Surfaces:** Use a mix of pure white (`#FFFFFF`) for interactive cards and Lavender-White (`#F7F5FC`) for section backgrounds to create subtle separation.
- **Glassmorphism:** For overlays, mobile navigation bars, and product category labels, use a backdrop blur (12px to 20px) with a semi-transparent white fill to simulate polished crystal.

## Shapes
The design system uses a **Rounded** language to soften the UI and make it more approachable.

- **Cards & Containers:** Fixed at 16px (`rounded-lg`) to create a modern, friendly container for spiritual products.
- **Circular Elements:** Category icons and profile avatars must be full circles to represent the "Mandala" or "Cycle" aspect of Vedic astrology.
- **Buttons:** Use a consistent 8px radius rather than fully pill-shaped to maintain a structured, premium feel.

## Components
- **Primary Buttons:** Solid Royal Violet (`#5B21B6`) with white Geist Medium text. For hover states, apply a subtle gold bottom border or a slight shift in saturation.
- **Product Cards:** White background, 16px corner radius, with a 1px border in `#ECE7F7`. Price and ratings are highlighted in Champagne Gold. Images should have a soft "infinite" shadow to appear floating.
- **Category Sliders:** Circular imagery with a 2px Champagne Gold border. Labels underneath use `label-md` Geist typography.
- **Hero Band:** Apply the Cosmic Gradient. Overlap a faint, low-opacity starfield pattern in Gold. Text should be white, centered, with a primary CTA button.
- **Navigation:** Mobile header is a frosted glass (Glassmorphic) bar with a thin gold bottom-border. Icons should be minimal, 2px stroke weight.
- **Sale Tags:** Saffron (`#E8973A`) capsules with white text, positioned in the top-right of product cards.