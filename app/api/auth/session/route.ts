import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
      return NextResponse.json({ user: null, wallet: null });
    }

    const authUser = authData.user;

    // Fetch user profile from PostgreSQL
    const { data: dbUser } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .maybeSingle();

    // Fetch wallet balance
    const { data: walletData } = await supabaseAdmin
      .from('wallets')
      .select('balance')
      .eq('user_id', authUser.id)
      .maybeSingle();

    return NextResponse.json({
      user: {
        id: authUser.id,
        email: authUser.email,
        name: dbUser?.name || authUser.user_metadata?.name || authUser.email?.split('@')[0],
        role: dbUser?.role || 'user'
      },
      wallet: walletData || { balance: 0.00 }
    });
  } catch (error: any) {
    console.error('Session API error:', error);
    return NextResponse.json({ user: null, wallet: null });
  }
}
