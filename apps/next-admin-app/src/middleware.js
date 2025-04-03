import { NextResponse } from "next/server";
import { middlewareAuthRoutesHandler, middlewareLogoutHandler } from "@/lib/middlewareHandlers";

const AUTH_PATH_PREFIXES = [
  '/api/auth/',
  '/auth/'
];

export async function middleware(request) {
  let response = NextResponse.next();

  if (request.method === 'OPTIONS') {
    return NextResponse.json({});
  }

  if (request.nextUrl.pathname.includes('logout')) {
    return middlewareLogoutHandler(request, response);
  }

  // Для путей, которые доступны только авторизованым пользователям выполняется функция middlewareAuthRoutesHandler
  if (AUTH_PATH_PREFIXES.some(prefix => request.nextUrl.pathname.includes(prefix))) {
    return middlewareAuthRoutesHandler(request, response);
  }
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|public|images|_next).*)'],
};
