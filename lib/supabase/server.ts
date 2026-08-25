import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

// Server client for Server Components, Route Handlers, and Server Actions.
// Respects RLS. Reads the session from request cookies and refreshes it
// transparently, writing updated cookies back where the runtime allows it
// (Route Handlers and Server Actions can write cookies; Server Components cannot).
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component — the proxy handles refreshing
            // the session cookie instead, so this is safe to ignore.
          }
        },
      },
    }
  );
}
