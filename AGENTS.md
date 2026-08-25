<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Application Building Context

Read the following files in order before implementing or making any architectural decision:

1. `context/project-overview.md` — product definition, goals, features, and scope
2. `context/architecture.md` — system structure, boundaries, storage model, and invariants
3. `context/ui-context.md` — theme, colors, typography, and component conventions
4. `context/code-standards.md` — implementation rules and conventions
5. `context/ai-workflow-rules.md` — development workflow, scoping rules, and delivery approach
6. `context/progress-tracker.md` — current phase, completed work, open questions, and next steps

Update `context/progress-tracker.md` after each meaningful implementation change.

If implementation changes the architecture, scope, or standards documented in the context files, update the relevant file before continuing.

## Supabase backend

This project uses [Supabase](https://supabase.com) for auth and the relational database (Postgres). Sanity remains the CMS for catalog/content (astrologers, gemstones, banners, blog); Supabase owns only `auth.users` plus `public.users` / `public.wallets` / `public.wallet_transactions` / `public.astrologer_profiles`.

- **Clients:** `lib/supabase/client.ts` (browser, RLS-respecting), `lib/supabase/server.ts` (Server Components/Route Handlers/Server Actions, RLS-respecting, reads cookies via `next/headers`), `lib/supabase/admin.ts` (service-role, bypasses RLS — API routes only, for writes users can't perform on themselves e.g. creating their own row right after sign-up), `lib/supabase/middleware.ts` (session refresh, called from `proxy.ts`).
- **Credentials:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`. Never hardcode or commit keys; never use the service-role client in a Client Component.
- **Schema migrations:** SQL files in `supabase/migrations/`. Apply new ones in the Supabase SQL Editor (or `supabase db push` once the project is linked with `supabase link`).

Key patterns:

- Database inserts take an array: `.insert([{ ... }])`.
- `public.users.id` references `auth.users(id)`; RLS policies use `auth.uid()`.
- Server-side auth checks call `supabase.auth.getUser()` (validates the JWT against Supabase), never `getSession()` (trusts the local cookie only).
- Google OAuth redirects through `app/auth/callback/route.ts`, which exchanges the code for a session — that route lives outside `[locale]` and is excluded from locale-prefixing in `proxy.ts`.
