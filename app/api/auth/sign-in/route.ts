import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  try {
    const { email, password, requiredRole } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // 1. Sign in with Supabase Auth (server client persists the session cookie)
    const supabase = await createClient();
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError || !authData?.session) {
      return NextResponse.json(
        { error: authError?.message || 'Invalid email or password' },
        { status: authError?.status || 401 }
      );
    }

    const authUser = authData.user;

    // 2. Fetch user profile from Postgres via service role to check role
    let { data: dbUser } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .maybeSingle();

    // If the user profile does not exist in Postgres, create it dynamically
    if (!dbUser) {
      const { data: newUser, error: insertError } = await supabaseAdmin
        .from('users')
        .insert([{
          id: authUser.id,
          email: authUser.email,
          phone: `phone_${authUser.id.substring(0, 8)}`, // fallback phone placeholder
          name: authUser.user_metadata?.name || email.split('@')[0],
          role: 'user'
        }])
        .select()
        .single();

      if (insertError) {
        console.error('Failed to create DB user:', insertError);
      } else {
        dbUser = newUser;
        // Dynamically create a wallet for the user with 500 testing balance
        await supabaseAdmin.from('wallets').insert([{
          user_id: authUser.id,
          balance: 500.00
        }]);
      }
    }

    // 3. Role Gate Check (e.g. for Astrologer/Admin panel)
    if (requiredRole && dbUser && dbUser.role !== requiredRole && dbUser.role !== 'admin') {
      return NextResponse.json(
        { error: `Unauthorized. This account is registered as a ${dbUser.role}.` },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: authUser.id,
        email: authUser.email,
        name: dbUser?.name || authUser.user_metadata?.name,
        role: dbUser?.role || 'user'
      }
    });
  } catch (error: any) {
    console.error('Sign-in API error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during sign-in' },
      { status: 500 }
    );
  }
}
