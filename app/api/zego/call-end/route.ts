import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@insforge/sdk/ssr";
import { insforgeAdmin } from "@/lib/insforge-admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { roomId } = body;

    if (!roomId) {
      return NextResponse.json(
        { error: "roomId is required to close call session" },
        { status: 400 }
      );
    }

    // 1. Fetch active call session details
    const { data: session, error: sessionFetchError } = await insforgeAdmin.database
      .from('call_sessions')
      .select('*')
      .eq('room_id', roomId)
      .maybeSingle();

    if (sessionFetchError) {
      console.error("Database error looking up call session:", sessionFetchError);
      return NextResponse.json({ error: "Database error fetching session" }, { status: 500 });
    }

    if (!session) {
      return NextResponse.json({ error: "Call session not found" }, { status: 404 });
    }

    // 2. Idempotency Check: Prevent finalizing the same call more than once
    if (session.status === 'completed') {
      return NextResponse.json({
        success: true,
        message: "Call session already completed",
        alreadyCompleted: true,
        durationSeconds: 0,
        billableMinutes: 0,
        totalCharge: 0,
      });
    }

    // 3. Authenticate & Authorize request
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
        console.error("Auth check failed in call-end API:", err);
      }

      const isDev = process.env.NODE_ENV === "development";
      const userId = authenticatedUser?.id;
      
      // Allow local mock IDs in development if no real session exists
      const isMockDev = isDev && (!userId || userId.startsWith("mock_") || userId === "customer_1" || userId.includes("astrologer"));

      if (!isMockDev) {
        if (!userId) {
          return NextResponse.json({ error: "Unauthorized - Authentication required" }, { status: 401 });
        }

        const isCustomer = userId === session.customer_id;
        const isAstrologer = userId === session.astrologer_id;

        if (!isCustomer && !isAstrologer) {
          return NextResponse.json(
            { error: "Forbidden - You do not have permission to modify this call session" },
            { status: 403 }
          );
        }
      }
    }

    const endedAt = new Date();
    const startedAt = new Date(session.started_at);
    const ratePerMin = Number(session.rate_per_min);
    const customerId = session.customer_id;
    const astrologerId = session.astrologer_id;

    const durationMs = endedAt.getTime() - startedAt.getTime();
    const durationSeconds = Math.max(1, Math.floor(durationMs / 1000));
    const billableMinutes = Math.max(1, Math.ceil(durationSeconds / 60));
    const totalCharge = billableMinutes * ratePerMin;

    if (customerId) {
      // Query customer's wallet first
      const { data: wallet } = await insforgeAdmin.database
        .from('wallets')
        .select('id, balance')
        .eq('user_id', customerId)
        .maybeSingle();

      if (wallet) {
        const newBalance = Number(wallet.balance) - totalCharge;
        
        // Deduct total charge from customer's wallet balance
        const { error: walletDeductError } = await insforgeAdmin.database
          .from('wallets')
          .update({ balance: newBalance })
          .eq('id', wallet.id);

        if (walletDeductError) {
          console.error("Failed to deduct wallet balance:", walletDeductError);
        } else {
          // Log the debit record in public.wallet_transactions
          await insforgeAdmin.database
            .from('wallet_transactions')
            .insert([{
              wallet_id: wallet.id,
              amount: -totalCharge,
              type: 'debit',
              reason: `Call consultation charge (Room: ${roomId.substring(0, 15)})`,
              reference_id: roomId
            }]);
        }
      }
    }

    if (astrologerId) {
      // Restore the astrologer's status to 'online'
      const { error: statusRestoreError } = await insforgeAdmin.database
        .from('astrologer_profiles')
        .update({ status: 'online' })
        .eq('user_id', astrologerId);

      if (statusRestoreError) {
        console.error("Failed to restore astrologer status to online:", statusRestoreError);
      }
    }

    // Update the call session row to complete
    await insforgeAdmin.database
      .from('call_sessions')
      .update({
        status: 'completed',
        total_charged: totalCharge,
        ended_at: endedAt.toISOString()
      })
      .eq('id', session.id);

    console.log(`
[ZEGO BILLING] Call Session Ended Successfully:
----------------------------------------------
Room ID:            ${roomId}
Customer UUID:      ${customerId || 'Unknown'}
Astrologer UUID:    ${astrologerId || 'Unknown'}
Duration:           ${durationSeconds} seconds
Billable Minutes:   ${billableMinutes} min (rounded up)
Rate per Minute:    ₹${ratePerMin}
Total Charged:      ₹${totalCharge}
----------------------------------------------
    `);

    return NextResponse.json({
      success: true,
      durationSeconds,
      billableMinutes,
      totalCharge,
    });
  } catch (error: any) {
    console.error("Zego call-end error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to finalize call billing" },
      { status: 500 }
    );
  }
}
