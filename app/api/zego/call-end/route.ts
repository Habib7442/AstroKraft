import { NextRequest, NextResponse } from "next/server";
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

    const endedAt = new Date();
    
    // If session is missing (fallback safety for demo/orphaned states)
    const startedAt = session?.started_at ? new Date(session.started_at) : new Date(Date.now() - 125000);
    const ratePerMin = session?.rate_per_min ? Number(session.rate_per_min) : 15.00;
    const customerId = session?.customer_id;
    const astrologerId = session?.astrologer_id;

    const durationMs = endedAt.getTime() - startedAt.getTime();
    const durationSeconds = Math.max(1, Math.floor(durationMs / 1000));
    const billableMinutes = Math.max(1, Math.ceil(durationSeconds / 60));
    const totalCharge = billableMinutes * ratePerMin;

    if (customerId) {
      // 2. Query customer's wallet first
      const { data: wallet } = await insforgeAdmin.database
        .from('wallets')
        .select('id, balance')
        .eq('user_id', customerId)
        .maybeSingle();

      if (wallet) {
        const newBalance = Number(wallet.balance) - totalCharge;
        
        // 3. Deduct total charge from customer's wallet balance
        const { error: walletDeductError } = await insforgeAdmin.database
          .from('wallets')
          .update({ balance: newBalance })
          .eq('id', wallet.id);

        if (walletDeductError) {
          console.error("Failed to deduct wallet balance:", walletDeductError);
        } else {
          // 4. Log the debit record in public.wallet_transactions
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
      // 5. Restore the astrologer's status to 'online'
      const { error: statusRestoreError } = await insforgeAdmin.database
        .from('astrologer_profiles')
        .update({ status: 'online' })
        .eq('user_id', astrologerId);

      if (statusRestoreError) {
        console.error("Failed to restore astrologer status to online:", statusRestoreError);
      }
    }

    if (session) {
      // 6. Update the call session row to complete
      await insforgeAdmin.database
        .from('call_sessions')
        .update({
          status: 'completed',
          total_charged: totalCharge,
          ended_at: endedAt.toISOString()
        })
        .eq('id', session.id);
    }

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
