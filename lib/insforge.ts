import { createBrowserClient } from '@insforge/sdk/ssr';

if (!process.env.NEXT_PUBLIC_INSFORGE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_INSFORGE_URL');
}

// Client-side and general RLS-respecting client that reads auth cookies
export const insforge = createBrowserClient({
  baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL,
  anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || '',
  refreshUrl: typeof window !== 'undefined' ? window.location.origin + '/api/auth/refresh' : '/api/auth/refresh'
});
