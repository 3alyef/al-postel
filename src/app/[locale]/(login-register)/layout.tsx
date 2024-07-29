import BodyLogin from "@/app/components/bodyLogin/bodyLogin";
import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/get-dictionary";

export default async function RootLayout({
  children,
  params: { locale }
  }: Readonly<{children: React.ReactNode; params: { locale: Locale }}>) {
  const dictionary = await getDictionary(locale);
  
  return (
    <BodyLogin dictionary={dictionary} locale={locale}>
      {children}
    </BodyLogin>
  )
}
