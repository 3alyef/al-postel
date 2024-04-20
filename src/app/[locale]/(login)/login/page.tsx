import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/get-dictionary";
import React from "react";
import LanguageSwitch from "@/app/components/languageSwitch/languageSwitch";
import InputText from "@/app/components/inputText/inputText";
export default async function Login({
  params: { locale }
}: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(locale);

  const _isSemitic: boolean = locale === "he";
  return (
    <div className="main_Login">
      <div className="barLogin">
        <div className={`container ${_isSemitic ? "semitic" : ""}`}>

          {/*<h1>{dictionary.Login.Title}</h1>*/}
          <div className={`to2Container `}>
            <main className={`loginMenu `}> 
              <section className="">
                deww
              </section>
              <section className="dataUser">
                <div className="dataUser_Container ">
                  <form className="w-[85%]">
                    <InputText text={dictionary.Login.Email} _isSemitic={_isSemitic}/>
                  </form>
                  <div className={`forgetEmail w-[85%]`}>
                    
                    <div className="forgetEmailSubcontainer">
                      <input type="button" value={dictionary.Login.Forgot_your_email}/>
                    </div>
                    
                  </div>
                  
                  {/*${_isSemitic ? "justify-start" : "justify-end"}*/}
                  <div className={`nextNewAccountMenu justify-end`}>
                    
                    <div className="btnNextAccount">
                      <input type="button" value={dictionary.Login.Create_Account} className="createAccount"/>
                    </div>
                    <div className="btnNextAccount">
                      <input type="button" value={dictionary.Login.Next} className="nextBtnAccount"/>
                    </div>
                    
                  </div>
                </div>
              </section>
            </main>
            <footer>
              <LanguageSwitch locale={locale}/>
            </footer>
          </div>
          
        </div>
      </div>
    </div>
  );
}
