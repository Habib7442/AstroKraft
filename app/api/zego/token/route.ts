import { NextRequest, NextResponse } from "next/server";
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

    // Fallback/random user ID for sandbox testing if none provided
    if (!userId) {
      userId = "user_" + Math.floor(Math.random() * 10000);
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
