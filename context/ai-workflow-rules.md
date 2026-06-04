# AI Workflow Rules

## Approach

Build this project incrementally using a spec-driven workflow. Context files define what to build, how to build it, and the current state of progress. Implement exactly against these specifications and design requirements — do not infer, add speculative features, or invent undocumented behavior.

## Scoping Rules

*   **One Feature at a Time**: Complete and verify a single logical feature unit before moving on to the next one.
*   **Incremental Edits**: Make focused, small file changes. Avoid modifying unrelated parts of the codebase.
*   **Separation of Boundaries**: Do not mix UI adjustments, database schema changes, and API routes in a single prompt execution unless they are tightly bound and specified inside a single unit.

## When to Split Work

Split an implementation step if it combines:
*   UI markup/styling updates and DB migrations.
*   Integrating multiple unrelated API endpoints.
*   Unclear or undocumented user scenarios.

If a change cannot be compiled and tested in under 5 minutes, the scope is too broad — divide it into smaller sub-tasks.

## Handling Missing Requirements

*   Do not guess product or visual behavior.
*   If a requirement is ambiguous, refer to `project-docs/prd.md` or `DESIGN.md`.
*   If details are missing, add them under the "Open Questions" section in `context/progress-tracker.md` to resolve them before writing the corresponding code.

## Protected Files

Do not modify these files unless explicitly instructed by the user:
*   `components/ui/*` — Generated UI atomic library primitives (e.g., button, card, dialog).
*   `node_modules/` or compiled/dist folders.
*   `lib/seo.ts` — Centralized SEO config (ensure any updates follow its strict patterns).

## Keeping Docs in Sync

Update the context documents immediately when:
*   Adding database models or changing schemas.
*   Swapping or adding API providers in `lib/astrology/`.
*   Defining new styling variable tokens.
*   Updating progress tracker states.

## Before Moving to the Next Unit

1.  Verify the current unit builds and functions without TypeScript or terminal compilation errors.
2.  Ensure visual pairings comply with the WCAG AA color contrast guidelines.
3.  Check that all UI views are responsive across mobile, tablet, and desktop layout widths.
4.  Run `npm run build` to verify production compilation.
5.  Mark the unit as complete in `context/progress-tracker.md`.
