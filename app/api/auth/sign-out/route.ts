import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });

  // Delete cookies by setting expiry to past
  response.cookies.set('insforge_access_token', '', { expires: new Date(0), path: '/' });
  response.cookies.set('insforge_refresh_token', '', { expires: new Date(0), path: '/' });

  return response;
}
