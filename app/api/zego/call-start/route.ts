import { NextRequest, NextResponse } from "next/server";
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

    const rate = Number(ratePerMin);
    const startedAt = new Date().toISOString();

    // 1. Insert active call session in call_sessions table
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

    // 2. Set the astrologer's status to 'busy'
    const { error: statusError } = await insforgeAdmin.database
      .from('astrologer_profiles')
      .update({ status: 'busy' })
      .eq('user_id', astrologerId);

    if (statusError) {
      console.error("Failed to update astrologer status to busy:", statusError);
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
