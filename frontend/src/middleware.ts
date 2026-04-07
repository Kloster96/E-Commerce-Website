import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Solo proteger la ruta /admin
  if (pathname.startsWith('/admin')) {
    const session = request.cookies.get('admin_session');

    // Si no hay sesión, redirigir a login
    if (!session) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Verificar que la cookie sea válida
    try {
      const sessionData = JSON.parse(Buffer.from(session.value, 'base64').toString());
      const loginTime = sessionData.loginAt;
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;

      // Si la sesión expiró (> 24h), redirigir a login
      if (now - loginTime > oneDay) {
        const loginUrl = new URL('/login', request.url);
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete('admin_session');
        return response;
      }
    } catch (error) {
      // Cookie malformada, redirigir a login
      const loginUrl = new URL('/login', request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('admin_session');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
