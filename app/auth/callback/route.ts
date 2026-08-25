import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

// Exchanges the OAuth (Google) authorization code for a Supabase session and
// mirrors the row into public.users/wallets if this is the user's first sign-in.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const requestedNext = searchParams.get("next") || "/en";
  // Only allow single-slash absolute internal paths — rejects protocol-relative
  // ("//evil.com"), userinfo-confusion ("@evil.com"), and backslash tricks.
  const next = /^\/(?!\/)[^\\]*$/.test(requestedNext) ? requestedNext : "/en";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      const authUser = data.user;
      const { data: dbUser } = await supabaseAdmin
        .from("users")
        .select("id")
        .eq("id", authUser.id)
        .maybeSingle();

      if (!dbUser) {
        const { error: userError } = await supabaseAdmin.from("users").upsert([{
          id: authUser.id,
          email: authUser.email,
          phone: `phone_${authUser.id}`,
          name: authUser.user_metadata?.name || authUser.user_metadata?.full_name || authUser.email?.split("@")[0],
          role: "user"
        }], { onConflict: "id" });

        if (userError) {
          console.error("OAuth user mirror failed:", userError);
          return NextResponse.redirect(`${origin}${next}?authError=1`);
        }

        const { error: walletError } = await supabaseAdmin.from("wallets").upsert([{
          user_id: authUser.id,
          balance: 500.00
        }], { onConflict: "user_id" });

        if (walletError) {
          console.error("OAuth wallet init failed:", walletError);
        }
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}${next}?authError=1`);
}
