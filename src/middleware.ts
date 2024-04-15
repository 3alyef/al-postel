import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './i18n-config';
import getLocale from '@/middlewares/getLocale.middleware';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Verifique se há alguma localidade suportada no nome do caminho
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  NextResponse.redirect(new URL('/home', request.url))
  // Redirecionar se não houver localidade
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    )
  }

  if (pathname.match(/^\/[a-z]{2}\/?$/)) { // Verificar se a rota é `/:locale/`
    const locale = pathname.split('/')[1];
    return NextResponse.redirect(
      new URL(
        `/${locale}/login`,
        request.url
      )
    );
  }
}

export const config = {
  // Matcher ignorando `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}