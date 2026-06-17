import { NextResponse } from 'next/server';
import { createServerClient, setAuthCookies } from '@insforge/sdk/ssr';
import { insforgeAdmin } from '@/lib/insforge-admin';

export async function POST(request: Request) {
  try {
    const { email, otp, name, phone, role = 'user' } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and OTP code are required' },
        { status: 400 }
      );
    }

    // 1. Initialize server client to perform verification (retrieves refreshToken)
    const client = createServerClient({
      baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL || '',
      anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || ''
    });

    // 2. Verify Email OTP via InsForge Auth Service
    const { data: authData, error: authError } = await client.auth.verifyEmail({
      email,
      otp
    });

    if (authError || !authData?.user) {
      return NextResponse.json(
        { error: authError?.message || 'Invalid or expired OTP code' },
        { status: authError?.statusCode || 400 }
      );
    }

    const authUser = authData.user;
    const cleanPhone = phone || `phone_${authUser.id.substring(0, 8)}`;

    // 3. Create user record in Postgres public.users if not exists
    let { data: dbUser } = await insforgeAdmin
      .database
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .maybeSingle();

    if (!dbUser) {
      const { data: newUser, error: dbError } = await insforgeAdmin
        .database
        .from('users')
        .insert([{
          id: authUser.id,
          phone: cleanPhone,
          email: authUser.email,
          name: name || authUser.profile?.name || email.split('@')[0],
          role
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

      // 4. Initialize wallet for the user with 500 testing balance
      const { error: walletError } = await insforgeAdmin
        .database
        .from('wallets')
        .insert([{
          user_id: authUser.id,
          balance: 500.00
        }]);

      if (walletError) {
        console.error('Wallet initialization failed:', walletError);
      }
    }

    // 5. Build response and set session cookies
    const response = NextResponse.json({
      success: true,
      user: {
        id: authUser.id,
        email: authUser.email,
        name: dbUser?.name || authUser.profile?.name,
        role: dbUser?.role || 'user'
      },
      accessToken: authData.accessToken
    });

    if (authData.accessToken) {
      setAuthCookies(response.cookies, {
        accessToken: authData.accessToken,
        refreshToken: authData.refreshToken
      });
    }

    return response;
  } catch (error: any) {
    console.error('OTP Verification API error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during verification' },
      { status: 500 }
    );
  }
}
