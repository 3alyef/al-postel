import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/get-dictionary";
import React from "react";
import LanguageSwitch from "@/app/components/languageSwitch/languageSwitch";
import InputText from "@/app/components/inputText/inputText";
export default async function Login({
  params: { locale }
}: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(locale);

  /*
  const inputRef = useRef(null);

  useEffect(() => {
    const labelEmail = document.getElementById("labelEmail");

    const handleClick = () => {
      inputRef.current.focus();
    };

    labelEmail.addEventListener("click", handleClick);

    return () => {
      labelEmail.removeEventListener("click", handleClick);
    };
  }, []); // Executar apenas uma vez após a montagem do componente
*/
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
              <section className="dataUser">
                <div className="dataUser_Container ">
                  <form>
                    <InputText text={"E-mail"}/>
                  </form>
                  <div className="forgetEmail">
                    
                    <div className="forgetEmailSubcontainer">
                      <input type="button" value="Esqueceu seu email?"/>
                    </div>
                    
                  </div>

                  <div className="nextNewAccountMenu">
                    
                    <div className="btnNextAccount">
                      <input type="button" value="Criar conta" className="createAccount"/>
                    </div>
                    <div className="btnNextAccount">
                      <input type="button" value="Avançar" className="nextBtnAccount"/>
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
