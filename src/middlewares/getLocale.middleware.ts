import type { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { i18n } from '@/i18n';

export default function getLocale(request: NextRequest): string | undefined {
    // O negociador espera um objeto simples, então precisamos transformar os cabeçalhos
    const negotiatorHeaders: Record<string, string> = {}
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
    //console.log("Negociador", negotiatorHeaders)
    // @ts-ignore locales são readonly
    const locales: string[] = i18n.locales;
    console.log("Headers: ", negotiatorHeaders);
  
    // Use negotiator e intl-localematcher para obter a melhor localidade
    let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
      locales
    )
  
    const locale = matchLocale(languages, locales, i18n.defaultLocale);
  
    return locale;
  }
  