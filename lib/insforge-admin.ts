import { createAdminClient } from '@insforge/sdk';

if (!process.env.NEXT_PUBLIC_INSFORGE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_INSFORGE_URL');
}

// Server-side admin client (bypasses RLS - use only in API routes/server components)
export const insforgeAdmin = createAdminClient({
  baseUrl: process.env.NEXT_PUBLIC_INSFORGE_URL,
  apiKey: process.env.INSFORGE_SERVICE_KEY || ''
});
