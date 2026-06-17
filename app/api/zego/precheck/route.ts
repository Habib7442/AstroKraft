import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@insforge/sdk/ssr";
import { insforgeAdmin } from "@/lib/insforge-admin";

async function resolveUser(identifier: string, defaultRole: 'user' | 'astrologer' = 'user') {
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
  
  let query = insforgeAdmin.database.from('users').select('*');
  if (isUuid) {
    query = query.eq('id', identifier);
  } else {
    query = query.eq('phone', identifier);
  }
  
  const { data: user } = await query.maybeSingle();
  
  if (!user) {
    const isDev = process.env.NODE_ENV === "development";
    // Disable dynamic user/wallet seeding in production to close the free credit exploit
    if (!isDev) {
      return null;
    }

    // Dynamically seed the user/astrologer for testing (dev environment only)
    const insertPayload: any = {
      phone: isUuid ? `phone_${identifier.substring(0, 8)}` : identifier,
      email: isUuid ? `${identifier}@example.com` : `${identifier}@astrokraft.com`,
      name: defaultRole === 'astrologer' ? 'Master Consultant' : 'Astro Customer',
      role: defaultRole
    };
    if (isUuid) {
      insertPayload.id = identifier;
    }
    
    const { data: newUser } = await insforgeAdmin.database
      .from('users')
      .insert([insertPayload])
      .select()
      .single();
      
    if (newUser) {
      if (defaultRole === 'user') {
        await insforgeAdmin.database.from('wallets').insert([{
          user_id: newUser.id,
          balance: 500.00
        }]);
      } else {
        await insforgeAdmin.database.from('astrologer_profiles').insert([{
          user_id: newUser.id,
          rate_per_min: 15.00,
          status: 'online'
        }]);
      }
      return newUser;
    }
  }
  
  return user;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { astrologerId, customerId = "mock_customer_1" } = body;

    if (!astrologerId) {
      return NextResponse.json(
        { error: "astrologerId is required for pre-call check" },
        { status: 400 }
      );
    }

    // 1. Authenticate request session
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
      console.error("Auth check failed in precheck API:", err);
    }

    const isDev = process.env.NODE_ENV === "development";
    const userId = authenticatedUser?.id;

    // Allow mock IDs in development
    const isMockDev = isDev && (!userId || userId.startsWith("mock_") || customerId === "mock_customer_1" || customerId === "customer_1");

    if (!isMockDev) {
      if (!userId) {
        return NextResponse.json({ error: "Unauthorized - Authentication required" }, { status: 401 });
      }

      // Enforce authorization: user can only check their own wallet details
      if (userId !== customerId) {
        return NextResponse.json(
          { error: "Forbidden - You cannot perform precheck on behalf of another user" },
          { status: 403 }
        );
      }
    }

    // 2. Audit log precheck request
    console.log(`[ZEGO PRECHECK AUDIT] User: ${userId || 'MockDev'} initiated pre-call check for Astrologer: ${astrologerId} (Customer: ${customerId})`);

    // 3. Resolve customer and get wallet balance
    const customer = await resolveUser(customerId, 'user');
    if (!customer) {
      return NextResponse.json({ error: "Failed to resolve customer profile" }, { status: 404 });
    }

    const { data: wallet } = await insforgeAdmin.database
      .from('wallets')
      .select('balance')
      .eq('user_id', customer.id)
      .maybeSingle();

    const balance = wallet ? Number(wallet.balance) : 0.00;

    // 4. Resolve astrologer and get rate/status
    const astrologer = await resolveUser(astrologerId, 'astrologer');
    if (!astrologer) {
      return NextResponse.json({ error: "Failed to resolve astrologer profile" }, { status: 404 });
    }

    const { data: profile } = await insforgeAdmin.database
      .from('astrologer_profiles')
      .select('rate_per_min, status')
      .eq('user_id', astrologer.id)
      .maybeSingle();

    const ratePerMin = profile ? Number(profile.rate_per_min) : 15.00;
    const status = profile ? profile.status : 'offline';

    // 5. Security Gate: Balance Check
    if (balance < ratePerMin) {
      return NextResponse.json({
        ok: false,
        reason: "INSUFFICIENT_BALANCE",
        message: `Your wallet balance (₹${balance.toFixed(2)}) is insufficient. Minimum ₹${ratePerMin.toFixed(2)} required for a 1 minute call.`,
      });
    }

    // 6. Status Gate: Availability Check
    if (status !== 'online') {
      return NextResponse.json({
        ok: false,
        reason: "ASTROLOGER_UNAVAILABLE",
        message: `This astrologer is currently ${status}. Please try again later.`,
      });
    }

    // 7. Generate secure room ID
    const timestamp = Date.now();
    const roomId = `call_${customer.id}_${astrologer.id}_${timestamp}`;
    const astrologerZegoId = `astrologer_${astrologer.id}`;

    return NextResponse.json({
      ok: true,
      roomId,
      astrologerZegoId,
      ratePerMin,
      balance,
      customerId: customer.id,
      astrologerId: astrologer.id
    });
  } catch (error: any) {
    console.error("Zego precheck error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to complete pre-call validation" },
      { status: 500 }
    );
  }
}
