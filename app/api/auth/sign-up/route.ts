import { NextResponse } from 'next/server';
import { createServerClient, setAuthCookies } from '@insforge/sdk/ssr';
import { insforgeAdmin } from '@/lib/insforge-admin';

export async function POST(request: Request) {
  try {
    const { email, password, name, phone, role = 'user' } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // 1. Initialize server client to perform sign-up (retrieves refreshToken)
    const client = createServerClient({
      baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL || '',
      anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || ''
    });

    // 2. Sign up in InsForge Auth Service
    const { data: authData, error: authError } = await client.auth.signUp({
      email,
      password,
      name
    });

    if (authError) {
      return NextResponse.json(
        { error: authError.message || 'Failed to sign up account' },
        { status: authError.statusCode || 400 }
      );
    }

    // Handle email verification required path
    if (authData?.requireEmailVerification) {
      return NextResponse.json({
        success: true,
        requireEmailVerification: true,
        message: 'Account registered. Please check your inbox to verify your email.'
      });
    }

    const authUser = authData?.user;
    if (!authUser) {
      return NextResponse.json(
        { error: 'Registration succeeded but user profile was not returned' },
        { status: 500 }
      );
    }
    const cleanPhone = phone || `phone_${authUser.id.substring(0, 8)}`;

    let finalRole = role;
    if (email.startsWith("admin@") || email === "habib7442@gmail.com" || email === "astrokraftwebsitemanager@gmail.com") {
      finalRole = "admin";
    }

    // 3. Create user record in Postgres public.users
    const { data: dbUser, error: dbError } = await insforgeAdmin
      .database
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

    // 5. If registering as an astrologer, initialize profile
    if (role === 'astrologer') {
      const { error: profileError } = await insforgeAdmin
        .database
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

    // 6. Build response and set session cookies
    const response = NextResponse.json({
      success: true,
      user: {
        id: authUser.id,
        email: authUser.email,
        name,
        role: finalRole
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
    console.error('Sign-up API error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during registration' },
      { status: 500 }
    );
  }
}
