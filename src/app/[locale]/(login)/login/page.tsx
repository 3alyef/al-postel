import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/get-dictionary";
import React, { useState } from "react";
import LanguageSwitch from "@/app/components/languageSwitch/languageSwitch";
import FormRegister from "@/app/components/formRegister/formRegister";
import DefaultBackground from "@/app/components/defaultBackground/defaultBackgound";
export default async function Login({
  params: { locale }
}: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(locale);
  const _isSemitic: boolean = locale === "he";

  return (
    <DefaultBackground _isSemitic={_isSemitic}>
      <main className={`loginMenu `}> 
        <section className="">
          deww
        </section>
        <section className="dataUser">
          <div className="dataUser_Container">
            <FormRegister formCostumerClass="w-[85%]" textLabelEmail={dictionary.Login.Email} _isSemitic={_isSemitic} textLabelPassword={dictionary.Login.Enter_your_password}
            createAccount={dictionary.Login.Create_Account} 
            forgotEmail={dictionary.Login.Forgot_your_email}
            forgotPassword={dictionary.Login.Forgot_password}
            next={dictionary.Login.Next}
            />  
          </div>
        </section>
      </main>
      <footer>
        <LanguageSwitch locale={locale}/>
      </footer>
    </DefaultBackground>          
  );
}
