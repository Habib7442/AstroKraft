import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Syncs the Supabase auth session cookie on every request. Must be called
// from the proxy (Next.js middleware) so refreshed tokens are persisted
// before Server Components read cookies further down the request.
//
// Writes cookies onto the `response` the caller already built (which may be
// a locale redirect) instead of constructing a new one, so it never clobbers
// routing decisions made earlier in the proxy.
export async function updateSession(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse> {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refreshes the token if expired — required for Server Components,
  // which cannot write cookies themselves.
  await supabase.auth.getUser();

  return response;
}
