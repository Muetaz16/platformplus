import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

// Add the routes you want to protect here
const protectedPaths = ['/admin'];
const publicPaths = ['/admin/login'];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if it's a protected path
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  if (isProtectedPath && !isPublicPath) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const payload = await verifyToken(token);
      if (!payload) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // If trying to access login while already authenticated, redirect to /admin
  if (isPublicPath) {
    const token = request.cookies.get('token')?.value;
    if (token) {
      try {
        const payload = await verifyToken(token);
        if (payload) {
          return NextResponse.redirect(new URL('/admin', request.url));
        }
      } catch (error) {
        // Token invalid, allow to proceed to login
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
