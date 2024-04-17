import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/get-dictionary";
import React from "react";
import LanguageSwitch from "@/components/languageSwitch/languageSwitch";
export default async function Login({
  params: { locale }
}: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(locale);

  return (
    <main className="main_Login">
      <div className="barLogin">
        <div className={`container ${locale === "he" ? "semitic" : ""}`}>

          {/*<h1>{dictionary.Login.Title}</h1>*/}
          <div className={`to2Container ${locale === "he"? "items-start": "items-end"}`}>
            <div className={`loginMenu `}>

            

            </div>
            <div className="languageSwitch">
              <LanguageSwitch locale={locale}/>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
