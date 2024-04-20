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
      <> 
        <section className="commomSectionMenu">
          deww
        </section>
        <section className="commomSectionMenu dataUser">
          <div className="dataUser_Container">
            <FormRegister locale={locale} formCostumerClass="w-[85%]" textLabelEmail={dictionary.Login.Email} _isSemitic={_isSemitic} textLabelPassword={dictionary.Login.Enter_your_password}
            createAccount={dictionary.Login.Create_Account} 
            forgotEmail={dictionary.Login.Forgot_your_email}
            forgotPassword={dictionary.Login.Forgot_password}
            next={dictionary.Login.Next}
            />  
          </div>
        </section>
      </>       
  );
}
