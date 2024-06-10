import DefaultBackground from "@/app/components/defaultBackground/defaultBackgound";
import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/get-dictionary";

export default async function RootLayout({
  children,
  params: { locale }
  }: Readonly<{children: React.ReactNode; params: { locale: Locale }}>) {
  const dictionary = await getDictionary(locale);
  const _isSemitic: boolean = locale === "he";
  return (
    <body
    className="min-h-[100vh] bg-black flex flex-col "
    >
      <DefaultBackground _isSemitic={_isSemitic}>
        <main className="alPostelMain relative">
          {children}
        </main>
      </DefaultBackground>
      
    </body>
  );
}
