import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@insforge/sdk/ssr';
import { insforgeAdmin } from '@/lib/insforge-admin';

export async function GET() {
  const cookieStore = await cookies();
  try {
    
    // Create server client using request cookies
    const client = createServerClient({
      cookies: cookieStore,
      baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL || '',
      anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || ''
    });

    // Fetch user from InsForge Auth Service using server-side credentials
    const { data: authData, error: authError } = await client.auth.getCurrentUser();

    if (authError || !authData?.user) {
      return NextResponse.json({ user: null, wallet: null });
    }

    const authUser = authData.user;

    // Fetch user profile from PostgreSQL
    const { data: dbUser } = await insforgeAdmin
      .database
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .maybeSingle();

    // Fetch wallet balance
    const { data: walletData } = await insforgeAdmin
      .database
      .from('wallets')
      .select('balance')
      .eq('user_id', authUser.id)
      .maybeSingle();

    return NextResponse.json({
      user: {
        id: authUser.id,
        email: authUser.email,
        name: dbUser?.name || authUser.profile?.name || authUser.email.split('@')[0],
        role: dbUser?.role || 'user'
      },
      wallet: walletData || { balance: 0.00 }
    });
  } catch (error: any) {
    console.error('Session API error:', error);
    return NextResponse.json({ user: null, wallet: null });
  }
}
