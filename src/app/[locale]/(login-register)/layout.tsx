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
    <body
    className="min-h-[100vh] bg-black flex flex-col "
    >
      <DefaultBackground _isSemitic={_isSemitic}>
            <main className={`loginRegisterMenuLayout flex-col relative items-center justify-center`}>
                <div className={`absolute top-0 ${_isSemitic ? "right-0 ":"left-0 "}`}>
                    <LogoAlPostel locale={locale} postelLabel={dictionary.Metadata.title} />
                </div>
                <div className="padronDivContainerInputs w-[100%] flex pt-3 gap-4 justify-center items-center mt-[100px] pb-[1.5em]">            
                    {children}
                </div>
               
            </main>    
            <footer>
                <LanguageSwitch locale={locale}/>
            </footer>
        </DefaultBackground> 
    </body>
  );
}
