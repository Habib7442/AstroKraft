import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Sign-out API error:', error);
      return NextResponse.json({ success: false, error: 'Failed to sign out' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Logged out successfully' });
  } catch (error: unknown) {
    console.error('Sign-out API error:', error);
    return NextResponse.json({ success: false, error: 'Failed to sign out' }, { status: 500 });
  }
}
