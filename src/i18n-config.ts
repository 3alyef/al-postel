export const i18n = {
    defaultLocale: 'en',
    locales: ['pt', 'en', 'he'],
} as const
  
export type Locale = (typeof i18n)['locales'][number]