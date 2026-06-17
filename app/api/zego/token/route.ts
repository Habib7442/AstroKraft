import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import { createServerClient } from "@insforge/sdk/ssr";
import { generateToken04 } from "@/lib/zego/token04";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    let { userId, customAppId, customSecret } = body;

    const appID = Number(customAppId || process.env.NEXT_PUBLIC_ZEGO_APP_ID);
    const secret = customSecret || process.env.ZEGO_SERVER_SECRET;

    if (!appID || isNaN(appID)) {
      return NextResponse.json(
        { error: "NEXT_PUBLIC_ZEGO_APP_ID is not configured in env variables" },
        { status: 500 }
      );
    }

    if (!secret || secret.length !== 32) {
      return NextResponse.json(
        { error: "ZEGO_SERVER_SECRET must be configured as a 32-byte key in env variables" },
        { status: 500 }
      );
    }

    // 1. Authenticate & Authorize request
    const authHeader = req.headers.get("Authorization");
    const secretToken = process.env.INTERNAL_SERVICE_TOKEN || "astrokraft_internal_service_token_secret_2026";
    const isServerCall = authHeader === `Bearer ${secretToken}`;

    if (!isServerCall) {
      const cookieStore = await cookies();
      const client = createServerClient({
        cookies: cookieStore,
        baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL || "",
        anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || ""
      });

      let authenticatedUser = null;
      try {
        const { data } = await client.auth.getCurrentUser();
        authenticatedUser = data?.user || null;
      } catch (err) {
        console.error("Auth check failed in token API:", err);
      }

      const isDev = process.env.NODE_ENV === "development";
      const sessionUserId = authenticatedUser?.id;

      // Allow local mock IDs in development if no real session exists
      const isMockDev = isDev && (!sessionUserId || sessionUserId.startsWith("mock_") || sessionUserId === "customer_1");

      if (!isMockDev) {
        if (!sessionUserId) {
          return NextResponse.json({ error: "Unauthorized - Authentication required" }, { status: 401 });
        }

        const isValidSelf = userId === sessionUserId;
        const isValidAstrologerSelf = userId === `astrologer_${sessionUserId}`;

        if (userId && !isValidSelf && !isValidAstrologerSelf) {
          return NextResponse.json(
            { error: "Forbidden - You can only generate tokens for your own user ID" },
            { status: 403 }
          );
        }

        // If no userId was provided, default to their authenticated session userId
        if (!userId) {
          userId = sessionUserId;
        }
      }
    }

    // Fallback/random user ID for sandbox testing if none provided
    if (!userId) {
      userId = "user_" + randomBytes(4).readUInt32BE(0);
    }

    const effectiveTimeInSeconds = 3600; // 1 hour validity
    const token = generateToken04(appID, userId, secret, effectiveTimeInSeconds, "");

    return NextResponse.json({
      token,
      appID,
      userId,
    });
  } catch (error: any) {
    console.error("Token generation error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate token" },
      { status: 500 }
    );
  }
}
