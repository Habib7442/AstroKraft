import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@insforge/sdk/ssr";
import { insforgeAdmin } from "@/lib/insforge-admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { roomId, customerId, astrologerId, ratePerMin } = body;

    if (!roomId || !customerId || !astrologerId || !ratePerMin) {
      return NextResponse.json(
        { error: "Missing required call session parameters" },
        { status: 400 }
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
        console.error("Auth check failed in call-start API:", err);
      }

      const isDev = process.env.NODE_ENV === "development";
      const userId = authenticatedUser?.id;
      
      // Allow local mock IDs in development if no real session exists
      const isMockDev = isDev && (!userId || userId.startsWith("mock_") || customerId === "mock_customer_1" || customerId === "customer_1" || userId === "customer_1");

      if (!isMockDev) {
        if (!userId) {
          return NextResponse.json({ error: "Unauthorized - Authentication required" }, { status: 401 });
        }

        const isCustomer = userId === customerId;
        const isAstrologer = userId === astrologerId;

        if (!isCustomer && !isAstrologer) {
          return NextResponse.json(
            { error: "Forbidden - You do not have permission to start this call session" },
            { status: 403 }
          );
        }
      }
    }

    // 2. Validate roomId structure and timestamp window
    const parts = roomId.split("_");
    if (parts.length >= 4 && parts[0] === "call") {
      const roomCustomerId = parts[1];
      const roomAstrologerId = parts[2];
      const timestampStr = parts[parts.length - 1];
      const timestamp = Number(timestampStr);
      const isValidTimestamp = !isNaN(timestamp) && timestamp > 0;

      if (!isValidTimestamp) {
        return NextResponse.json(
          { error: "Invalid room ID format" },
          { status: 400 }
        );
      }

      if (roomCustomerId !== customerId || roomAstrologerId !== astrologerId) {
        return NextResponse.json(
          { error: "Room ID parameters mismatch with customerId or astrologerId" },
          { status: 400 }
        );
      }

      const ageMs = Date.now() - timestamp;
      const maxAgeMs = 5 * 60 * 1000; // 5 minutes validity
      const isDev = process.env.NODE_ENV === "development";

      if (!isDev && (ageMs < 0 || ageMs > maxAgeMs)) {
        return NextResponse.json(
          { error: "Room ID has expired or has an invalid timestamp" },
          { status: 403 }
        );
      }
    } else {
      // In production, we require roomId to follow the 'call_{customerId}_{astrologerId}_{timestamp}' pattern.
      const isDev = process.env.NODE_ENV === "development";
      if (!isDev) {
        return NextResponse.json(
          { error: "Invalid Room ID structure. Must be call_customerUuid_astrologerUuid_timestamp" },
          { status: 400 }
        );
      }
    }

    // 3. Idempotency Check: Prevent duplicate session inserts for the same roomId
    const { data: existingSession, error: checkError } = await insforgeAdmin.database
      .from('call_sessions')
      .select('id, status')
      .eq('room_id', roomId)
      .maybeSingle();

    if (checkError) {
      console.error("Failed to check existing call session:", checkError);
      return NextResponse.json(
        { error: "Database error checking call session: " + checkError.message },
        { status: 500 }
      );
    }

    if (existingSession) {
      return NextResponse.json({
        success: true,
        message: "Call session already started/exists",
        alreadyStarted: true,
      });
    }

    const rate = Number(ratePerMin);
    const startedAt = new Date().toISOString();

    // 4. Insert active call session in call_sessions table
    const { error: sessionError } = await insforgeAdmin.database
      .from('call_sessions')
      .insert([{
        room_id: roomId,
        customer_id: customerId,
        astrologer_id: astrologerId,
        rate_per_min: rate,
        status: 'active',
        started_at: startedAt
      }]);

    if (sessionError) {
      console.error("Failed to insert call session:", sessionError);
      return NextResponse.json(
        { error: "Database error inserting call session: " + sessionError.message },
        { status: 500 }
      );
    }

    // 5. Set the astrologer's status to 'busy'
    const { error: statusError } = await insforgeAdmin.database
      .from('astrologer_profiles')
      .update({ status: 'busy' })
      .eq('user_id', astrologerId);

    if (statusError) {
      console.error("Failed to update astrologer status to busy:", statusError);
      
      // Roll back the call session insert to prevent state inconsistency
      const { error: rollbackError } = await insforgeAdmin.database
        .from('call_sessions')
        .delete()
        .eq('room_id', roomId);
        
      if (rollbackError) {
        console.error("Critical: Failed to roll back call session insert:", rollbackError);
      }

      return NextResponse.json(
        { error: "Failed to mark astrologer as busy. Call session aborted." },
        { status: 500 }
      );
    }

    console.log(`[ZEGO BILLING] Call Session Started: Room ${roomId} at ${startedAt}`);

    return NextResponse.json({
      success: true,
      message: "Call session started in database, astrologer status updated to busy.",
      startedAt,
    });
  } catch (error: any) {
    console.error("Zego call-start error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to start call session" },
      { status: 500 }
    );
  }
}
