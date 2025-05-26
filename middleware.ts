import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './app/firebase';


// Жеке маршруттар (қорғалатын беттер)
const protectedRoutes = ['/home', '/meeting'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('firebaseAuthToken')?.value;

  const isAuth = !!token;
  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !isAuth) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if ((request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/sign-in') && isAuth) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}
