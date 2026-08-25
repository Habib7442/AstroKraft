import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

// Exchanges the OAuth (Google) authorization code for a Supabase session and
// mirrors the row into public.users/wallets if this is the user's first sign-in.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/en";

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
        await supabaseAdmin.from("users").insert([{
          id: authUser.id,
          email: authUser.email,
          phone: `phone_${authUser.id.substring(0, 8)}`,
          name: authUser.user_metadata?.name || authUser.user_metadata?.full_name || authUser.email?.split("@")[0],
          role: "user"
        }]);
        await supabaseAdmin.from("wallets").insert([{
          user_id: authUser.id,
          balance: 500.00
        }]);
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}${next}?authError=1`);
}
