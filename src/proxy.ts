import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiting map
// Format: IP -> { count: number, resetTime: number }
const ipCache = new Map<string, { count: number; resetTime: number }>();

const LIMIT = 60; // 60 requests per window
const WINDOW_MS = 60 * 1000; // 1 minute

export function proxy(request: NextRequest) {
  // Apply only to API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    // Basic IP detection
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    const rateLimitInfo = ipCache.get(ip);

    if (!rateLimitInfo || now > rateLimitInfo.resetTime) {
      // Create new limit entry
      ipCache.set(ip, {
        count: 1,
        resetTime: now + WINDOW_MS,
      });
    } else {
      // Increment limit entry
      rateLimitInfo.count += 1;
      if (rateLimitInfo.count > LIMIT) {
        return new NextResponse(
          JSON.stringify({ error: 'Too many requests. Please try again in a minute.' }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': Math.ceil((rateLimitInfo.resetTime - now) / 1000).toString(),
            },
          }
        );
      }
    }
  }

  // Inject Security Headers
  const response = NextResponse.next();
  const headers = response.headers;

  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  headers.set('X-XSS-Protection', '1; mode=block');

  // Strict-Transport-Security (HSTS)
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  // Custom CSP header - relaxed for scripts/styles needed in dev/production
  headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https://replicate.delivery https://pbxt.replicate.delivery; connect-src 'self' https://api.replicate.com;"
  );

  return response;
}

// Config to target API and dashboard pages
export const config = {
  matcher: ['/api/:path*', '/((?!_next/static|_next/image|favicon.ico).*)'],
};
