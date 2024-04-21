import DefaultBackground from "@/app/components/defaultBackground/defaultBackgound";
import LanguageSwitch from "@/app/components/languageSwitch/languageSwitch";
import LogoAlPostel from "@/app/components/logoAlPostel/logoAlPostel";
import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/get-dictionary";

export default async function RootLayout({
    children,
    params: { locale }
  }: Readonly<{children: React.ReactNode; params: { locale: Locale }}>) {
    const dictionary = await getDictionary(locale);
    const _isSemitic: boolean = locale === "he";
    return (
        <DefaultBackground _isSemitic={_isSemitic}>
            <main className={`loginMenuLayout flex-col`}>
                <LogoAlPostel locale={locale} postelLabel={dictionary.Metadata.title}/>
                <div className="w-[100%] flex">
                    {children}
                </div>
               
            </main>    
            <footer>
                <LanguageSwitch locale={locale}/>
            </footer>
        </DefaultBackground>  
    );
  }
  