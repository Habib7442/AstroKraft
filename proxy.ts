import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LOCALES, DEFAULT_LOCALE } from './lib/seo';

/**
 * Next.js 16 Proxy entry point.
 * Intercepts incoming requests and redirects to localized routes if the locale prefix is missing.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Check if the path already has a locale prefix (e.g. /en, /hi, /bn, etc.)
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // 2. Redirect to default locale prefix (en)
  request.nextUrl.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
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
    '/((?!api|_next/static|_next/image|favicons|favicon.ico|sitemap.xml|robots.txt|site\\.webmanifest|.*\\.png$|.*\\.svg$|.*\\.jpg$|.*\\.jpeg$).*)',
  ],
};
