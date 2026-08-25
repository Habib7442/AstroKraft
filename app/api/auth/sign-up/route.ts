import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  try {
    const { email, password, name, phone, role = 'user' } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // 1. Sign up with Supabase Auth (server client persists the session cookie)
    const supabase = await createClient();
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } }
    });

    if (authError) {
      return NextResponse.json(
        { error: authError.message || 'Failed to sign up account' },
        { status: authError.status || 400 }
      );
    }

    const authUser = authData.user;
    if (!authUser) {
      return NextResponse.json(
        { error: 'Registration succeeded but user profile was not returned' },
        { status: 500 }
      );
    }

    // Supabase returns a user with no session when email confirmation is required
    if (!authData.session) {
      return NextResponse.json({
        success: true,
        requireEmailVerification: true,
        message: 'Account registered. Please check your inbox to verify your email.'
      });
    }

    const cleanPhone = phone || `phone_${authUser.id}`;

    let finalRole = role;
    const adminEmails = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);

    if (adminEmails.includes(email.toLowerCase())) {
      finalRole = "admin";
    }

    // 2. Create user record in Postgres public.users (service role — bypasses RLS)
    const { data: dbUser, error: dbError } = await supabaseAdmin
      .from('users')
      .insert([{
        id: authUser.id,
        phone: cleanPhone,
        email: authUser.email,
        name,
        role: finalRole
      }])
      .select()
      .single();

    if (dbError) {
      console.error('Database user creation failed:', dbError);
      return NextResponse.json(
        { error: 'Failed to create database profile: ' + dbError.message },
        { status: 500 }
      );
    }

    // 3. Initialize wallet for the user with 500 testing balance
    const { error: walletError } = await supabaseAdmin
      .from('wallets')
      .insert([{
        user_id: authUser.id,
        balance: 500.00
      }]);

    if (walletError) {
      console.error('Wallet initialization failed:', walletError);
    }

    // 4. If registering as an astrologer, initialize profile
    if (finalRole === 'astrologer') {
      const { error: profileError } = await supabaseAdmin
        .from('astrologer_profiles')
        .insert([{
          user_id: authUser.id,
          rate_per_min: 15.00,
          status: 'online'
        }]);

      if (profileError) {
        console.error('Astrologer profile initialization failed:', profileError);
      }
    }

    return NextResponse.json({
      success: true,
      user: {
        id: authUser.id,
        email: authUser.email,
        name,
        role: finalRole
      }
    });
  } catch (error: any) {
    console.error('Sign-up API error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during registration' },
      { status: 500 }
    );
  }
}
