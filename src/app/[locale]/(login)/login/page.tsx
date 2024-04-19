import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/get-dictionary";
import React from "react";
import LanguageSwitch from "@/app/components/languageSwitch/languageSwitch";
export default async function Login({
  params: { locale }
}: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(locale);

  return (
    <div className="main_Login">
      <div className="barLogin">
        <div className={`container ${locale === "he" ? "semitic" : ""}`}>

          {/*<h1>{dictionary.Login.Title}</h1>*/}
          <div className={`to2Container `}>
            <main className={`loginMenu `}> 
              <section className="">
                deww
              </section>
              <section className="dataUser bg-white">
                <div className="dataUser_Container">
                  <div className="formData_ContainerEmail">
                    
                    <div className="container_Input_Div">
                      <input type="text" className="emailInput" placeholder=" "/>
                      <div className="labelEmail labelEmailFocus"><span>E-mail</span></div>
                    </div>
                   
                  </div>
                  <div className="forgetEmail">
                    
                    <input type="button" value="Esqueceu seu email?"/>
                    
                  </div>

                  <div>
                    <input type="button" value="Criar conta"/>
                    <input type="button" value="Avançar"/>
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
