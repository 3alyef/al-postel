import DefaultBackground from "@/app/components/defaultBackground/defaultBackgound";
import LanguageSwitch from "@/app/components/languageSwitch/languageSwitch";
import { Locale } from "@/i18n";

export default async function RootLayout({
    children,
    params: { locale }
  }: Readonly<{children: React.ReactNode; params: { locale: Locale }}>) {
    const _isSemitic: boolean = locale === "he";
    return (
        <DefaultBackground _isSemitic={_isSemitic}>
            <main className={`loginMenuLayout `}>
                {children}
            </main>    
            <footer>
                <LanguageSwitch locale={locale}/>
            </footer>
        </DefaultBackground>  
    );
  }
  