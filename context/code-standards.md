# Code Standards

## General

*   **Modular Architecture**: Keep functions and components small. If a component exceeds 150 lines, evaluate if it can be split into smaller, reusable UI blocks.
*   **Single Responsibility**: Separate presentation logic (UI) from business logic (Vedic calculations, API fetching).
*   **Fail Gracefully**: Always handle potential runtime errors (API timeouts, missing fields, invalid dates) by rendering error boundary fallbacks.

## TypeScript

*   **Strict Mode**: Explicit types are required. Do not use `any` or `unsafe` casts.
*   **Input Validation**: Use `zod` schema validation for all external inputs (API payloads, query strings, forms).
*   **Vedic Typings**: Use strict type definitions in `lib/astrology/types.ts` for planetary positions, Guna Milan aspects, and Panchang parameters.

## Next.js (App Router)

*   **Server Components First**: Render components on the server by default (RSC). Only add the `'use client'` directive when browser APIs, state, or interactivity (e.g. Framer Motion, calendar pickers) are required.
*   **Static & ISR Rendering**: Programmatic SEO pages (like `/tools/horoscope/[sign]`) must use Incremental Static Regeneration (ISR) with revalidation periods (e.g., every 12 hours) to serve content instantly.
*   **Meta Config**: Pages must use the shared `constructMetadata()` helper from [seo.ts](file:///e:/Web%20Dev/astrokraft/lib/seo.ts) to guarantee hreflangs and JSON-LD structural compliance.

## Styling

*   **CSS Variable Tokens**: Always refer to the HSL tokens defined in [ui-context.md](file:///e:/Web%20Dev/astrokraft/context/ui-context.md) (e.g. `var(--primary)`, `var(--accent)`). Never hardcode hex values.
*   **Tailwind Consistency**: Group layout classes first (`flex`, `grid`, `absolute`), followed by sizing (`w-`, `h-`), typography (`text-`), colors (`bg-`, `text-`), and animations (`animate-`).
*   **Accessibility Elements**: Every interactive element must include visual `:focus-visible` ring outlines for accessibility.

## API Routes

*   **Input Parsing**: Parse query parameters or request body using Zod. Fail with a `400 Bad Request` early if input is invalid.
*   **Security Checks**: Authenticate the caller and verify resource ownership before any database mutation.
*   **Normalized Responses**: All custom endpoints must return a standard response shape:
    ```ts
    interface ApiResponse<T> {
      success: boolean;
      data?: T;
      error?: {
        code: string;
        message: string;
      };
    }
    ```

## File Organization

*   `app/[locale]/` — Dynamic localized pages using `next-intl` routing.
*   `components/` — Modular components separated by atomic layout categories.
*   `lib/astrology/` — Layer that communicates with external APIs and holds normalizer scripts.
*   `lib/seo.ts` — Metadata constructs and structured schemas.
*   `prisma/schema.prisma` — Prisma definitions for database layout.
