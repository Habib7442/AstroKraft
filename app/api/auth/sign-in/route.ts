import { NextResponse } from 'next/server';
import { createServerClient, setAuthCookies } from '@insforge/sdk/ssr';
import { insforgeAdmin } from '@/lib/insforge-admin';

export async function POST(request: Request) {
  try {
    const { email, password, requiredRole } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // 1. Initialize a server client to perform the sign-in (mobile flow retrieves refreshToken)
    const client = createServerClient({
      baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL || '',
      anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || ''
    });

    // 2. Sign in with password
    const { data: authData, error: authError } = await client.auth.signInWithPassword({
      email,
      password
    });

    if (authError || !authData?.accessToken) {
      return NextResponse.json(
        { error: authError?.message || 'Invalid email or password' },
        { status: authError?.statusCode || 401 }
      );
    }

    const authUser = authData.user;

    // 3. Fetch user profile from PostgreSQL via insforgeAdmin to check role
    let { data: dbUser, error: dbError } = await insforgeAdmin
      .database
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .maybeSingle();

    // If the user profile does not exist in Postgres, create it dynamically
    if (!dbUser) {
      const { data: newUser, error: insertError } = await insforgeAdmin
        .database
        .from('users')
        .insert([{
          id: authUser.id,
          email: authUser.email,
          phone: authUser.id, // fallback phone as id since it is a unique field
          name: authUser.profile?.name || email.split('@')[0],
          role: 'user'
        }])
        .select()
        .single();

      if (insertError) {
        console.error('Failed to create DB user:', insertError);
      } else {
        dbUser = newUser;
        // Dynamically create a wallet for the user with 500 testing balance
        await insforgeAdmin.database.from('wallets').insert([{
          user_id: authUser.id,
          balance: 500.00
        }]);
      }
    }

    // 4. Role Gate Check (e.g. for Astrologer/Admin panel)
    if (requiredRole && dbUser && dbUser.role !== requiredRole && dbUser.role !== 'admin') {
      return NextResponse.json(
        { error: `Unauthorized. This account is registered as a ${dbUser.role}.` },
        { status: 403 }
      );
    }

    // 5. Build response and set cookies
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

    setAuthCookies(response.cookies, {
      accessToken: authData.accessToken,
      refreshToken: authData.refreshToken
    });

    return response;
  } catch (error: any) {
    console.error('Sign-in API error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during sign-in' },
      { status: 500 }
    );
  }
}
