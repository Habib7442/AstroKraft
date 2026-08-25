import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LOCALES, DEFAULT_LOCALE } from './lib/seo';

import { updateSession } from './lib/supabase/middleware';

/**
 * Next.js 16 Proxy entry point.
 * Intercepts incoming requests and redirects to localized routes if the locale prefix is missing.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Check if the path already has a locale prefix (e.g. /en, /hi, /bn, etc.)
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  let response: NextResponse;

  // 0. Redirect any localized /locale/admin requests to the standalone /admin route
  const localeAdminMatch = LOCALES.some(
    (locale) => pathname === `/${locale}/admin` || pathname.startsWith(`/${locale}/admin/`)
  );
  if (localeAdminMatch) {
    const cleanPath = pathname.replace(/^\/[a-z]{2,3}\/admin/, '/admin');
    request.nextUrl.pathname = cleanPath;
    return NextResponse.redirect(request.nextUrl);
  }

  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    response = NextResponse.next({ request });
  } else if (pathname === '/auth' || pathname.startsWith('/auth/')) {
    // Supabase OAuth callback lives outside the [locale] segment
    response = NextResponse.next({ request });
  } else if (pathnameHasLocale) {
    response = NextResponse.next({ request });
  } else {
    // 2. Redirect to default locale prefix (en)
    request.nextUrl.pathname = `/${DEFAULT_LOCALE}${pathname}`;
    response = NextResponse.redirect(request.nextUrl);
  }

  // Synchronize authentication session cookies
  try {
    response = await updateSession(request, response);
  } catch (error) {
    console.error('Session sync error:', error);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt, site.webmanifest (metadata files)
     * - Image assets (png, svg, jpg, jpeg) in public
     */
    '/((?!api|_next/static|_next/image|favicons|\\.well-known|sw\\.js|favicon.ico|sitemap.xml|robots.txt|site\\.webmanifest|.*\\.png$|.*\\.svg$|.*\\.jpg$|.*\\.jpeg$|.*\\.webp$|.*\\.json$).*)',
  ],
};
