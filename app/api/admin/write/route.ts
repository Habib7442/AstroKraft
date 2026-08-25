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
      console.error("DB role query error in write API:", dbErr);
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
    const body = await req.json();
    const { action, doc, id, currentActive } = body;

    if (!action) {
      return NextResponse.json({ error: "Missing mutation action" }, { status: 400 });
    }

    // Determine document type for revalidation
    let docType = doc?._type || "";
    if (!docType && id) {
      try {
        const existing = await writeClient.fetch(`*[_id == $id || _id == "drafts." + $id][0] { _type }`, { id });
        docType = existing?._type || "";
      } catch (e) {
        console.error("Error fetching document type for revalidation:", e);
      }
    }

    let result: any = null;

    if (action === "createOrReplace") {
      if (!doc || !doc._type) {
        return NextResponse.json({ error: "Invalid document structure" }, { status: 400 });
      }
      result = await writeClient.createOrReplace(doc);
    } else if (action === "create") {
      if (!doc || !doc._type) {
        return NextResponse.json({ error: "Invalid document structure" }, { status: 400 });
      }
      result = await writeClient.create(doc);
    } else if (action === "patch") {
      if (!id || !doc) {
        return NextResponse.json({ error: "Missing document id or fields to update" }, { status: 400 });
      }
      result = await writeClient.patch(id).set(doc).commit();
    } else if (action === "toggleActive") {
      if (!id) {
        return NextResponse.json({ error: "Missing document id" }, { status: 400 });
      }
      const nextActive = currentActive === undefined ? true : !currentActive;
      result = await writeClient.patch(id).set({ isActive: nextActive }).commit();
    } else if (action === "delete") {
      if (!id) {
        return NextResponse.json({ error: "Missing document id to delete" }, { status: 400 });
      }
      result = await writeClient.delete(id);
    } else {
      return NextResponse.json({ error: "Invalid mutation action type" }, { status: 400 });
    }

    // Trigger Next.js Cache tag purging/revalidation for Cache Components
    if (docType) {
      const { revalidateTag } = await import("next/cache");
      const tagMap: Record<string, string> = {
        banner: "banners",
        category: "categories",
        product: "products",
        consultation: "consultations",
        astrologer: "astrologers"
      };
      const tag = tagMap[docType];
      if (tag) {
        try {
          revalidateTag(tag, "weeks");
        } catch (revalErr) {
          console.error(`Cache revalidation failed for tag: ${tag}`, revalErr);
        }
      }
    }

    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    console.error("Mutation write error:", err);
    return NextResponse.json({ error: err.message || "Failed to commit mutation" }, { status: 500 });
  }
}
