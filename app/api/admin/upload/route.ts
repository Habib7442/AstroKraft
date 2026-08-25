import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/lib/sanity.write";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  // 1. Verify Supabase session & admin privilege
  const supabase = await createClient();

  try {
    const { data } = await supabase.auth.getUser();
    const user = data?.user;

    if (!user) {
      return NextResponse.json({ error: "Unauthorized - No user session" }, { status: 401 });
    }

    // Query database users table for role
    let role = "user";
    try {
      const { data: profile } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();
      if (profile?.role) {
        role = profile.role;
      }
    } catch (dbErr) {
      console.error("DB role query error in upload API:", dbErr);
    }

    const adminEmails = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);

    const isAdmin = role === "admin" || adminEmails.includes((user.email || "").toLowerCase());
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized - Not an admin" }, { status: 401 });
    }
  } catch (authErr) {
    return NextResponse.json({ error: "Unauthorized session check failed" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload image asset to Sanity
    const asset = await writeClient.assets.upload("image", buffer, {
      contentType: file.type,
      filename: file.name,
    });

    return NextResponse.json({ success: true, asset });
  } catch (err: any) {
    console.error("Asset upload error:", err);
    return NextResponse.json({ error: err.message || "Failed to upload asset" }, { status: 500 });
  }
}
