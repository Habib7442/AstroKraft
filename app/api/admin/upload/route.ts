import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/lib/sanity.write";
import { createServerClient } from "@insforge/sdk/ssr";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  // 1. Verify InsForge session & admin privilege
  const cookieStore = await cookies();
  const insforge = createServerClient({
    cookies: cookieStore,
    baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL || "",
    anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || ""
  });
  
  try {
    const { data } = await insforge.auth.getCurrentUser();
    const user = data?.user;
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized - No user session" }, { status: 401 });
    }

    // Query database users table for role
    let role = "user";
    try {
      const { data: profile } = await insforge.database
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

    const allowedEmails = [
      "habib7442@gmail.com",
      "astrokraftwebsitemanagement@gmail.com"
    ];

    const isAdmin = role === "admin" || user.email.startsWith("admin@") || allowedEmails.includes(user.email);
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
