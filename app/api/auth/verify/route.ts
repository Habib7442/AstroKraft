import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  try {
    const { email, otp, name, phone, role = 'user' } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and OTP code are required' },
        { status: 400 }
      );
    }

    // 1. Verify the signup email OTP with Supabase Auth (persists session cookie)
    const supabase = await createClient();
    const { data: authData, error: authError } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'signup'
    });

    if (authError || !authData?.user) {
      return NextResponse.json(
        { error: authError?.message || 'Invalid or expired OTP code' },
        { status: authError?.status || 400 }
      );
    }

    const authUser = authData.user;
    const cleanPhone = phone || `phone_${authUser.id}`;

    // 2. Create user record in Postgres public.users if not exists
    let { data: dbUser } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .maybeSingle();

    if (!dbUser) {
      let finalRole = role;
      if (finalRole !== 'astrologer' && finalRole !== 'admin') {
        finalRole = 'user';
      }

      const adminEmails = (process.env.ADMIN_EMAILS || "")
        .split(",")
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);

      if (adminEmails.includes(authUser.email?.toLowerCase() || "")) {
        finalRole = "admin";
      } else if (finalRole === "admin") {
        finalRole = "user";
      }

      const { data: newUser, error: dbError } = await supabaseAdmin
        .from('users')
        .insert([{
          id: authUser.id,
          phone: cleanPhone,
          email: authUser.email,
          name: name || authUser.user_metadata?.name || email.split('@')[0],
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
      dbUser = newUser;

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
    console.error('OTP Verification API error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during verification' },
      { status: 500 }
    );
  }
}
