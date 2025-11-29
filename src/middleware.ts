// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Récupérer le username du cookie
  const username = request.cookies.get('username')?.value;
  const authToken = request.cookies.get('auth-token')?.value;

  // Routes publiques
  const publicPaths = ['/', '/login', '/api/auth/login'];
  const isPublicPath = publicPaths.includes(pathname);

  // Si pas authentifié et tente d'accéder à une route protégée
  if (!authToken && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Vérifier l'accès aux dashboards spécifiques
  if (pathname.startsWith('/dashboard/')) {
    const requestedUser = pathname.split('/dashboard/')[1]?.split('/')[0];
    
    // Si un utilisateur essaie d'accéder au dashboard d'un autre
    if (requestedUser && requestedUser !== username) {
      return NextResponse.redirect(new URL(`/dashboard/${username}`, request.url));
    }
  }

  // Rediriger /dashboard vers /dashboard/{username}
  if (pathname === '/dashboard' && username) {
    return NextResponse.redirect(new URL(`/dashboard/${username}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};
