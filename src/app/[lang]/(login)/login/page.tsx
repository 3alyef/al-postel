import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/get-dictionary";
import React from "react";
import Link from "next/link"
import "./style/style-login.css";
export default async function Login({
  params: { lang }
}: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  return (
    <main className="mainLogin">
      <div className="containerLogin">
        <div className={`postElH1 ${lang === "he" ? "semitic" : ""}`}>

          <h1>{dictionary.Login.Title}</h1>

          <div className="loginMenu">

            <div className="questionMarkContainer">
              <h2 className="questionMark">?</h2>
            </div>

            <div className="optionsLogin">
              <Link href="#" >
                <div className="register">
                  {dictionary.Login.Register}
                </div>
              </Link>
              
              <div className="orDiv">
                <p>{dictionary.Login.Or}</p>
                <div className="orDivIn"></div>
              </div>
              
              <Link href="#" >
                <div className="alreadyAccount">
                  {dictionary.Login.Already_have_an_account}
                </div>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

/*
  <div style="width: 100%; height: 100%; position: relative; background: linear-gradient(65deg, rgba(17, 27, 33, 0.75) 0%, rgba(30, 30, 30, 0.75) 100%)">
    <div style="width: 425px; height: 107px; left: 246px; top: 314px; position: absolute">
        <div style="left: 67px; top: 68px; position: absolute; text-align: center; color: white; font-size: 32px; font-family: Inter; font-weight: 600; word-wrap: break-word">Já tem uma conta?</div>
        <div style="width: 425px; height: 7px; left: 0px; top: 30px; position: absolute; background: linear-gradient(360deg, #21331A 53%, rgba(99, 153, 78, 0.50) 100%)"></div>
        <div style="left: 197px; top: 0px; position: absolute; text-align: center; color: white; font-size: 25px; font-family: Inter; font-weight: 600; word-wrap: break-word">ou</div>
    </div>
    <div style="width: 320px; height: 115px; padding: 10px; left: 300px; top: 168px; position: absolute; background: linear-gradient(90deg, #21331A 38%); border-radius: 10px; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
        <div style="text-align: center; color: white; font-size: 45px; font-family: Inter; font-weight: 700; word-wrap: break-word">Cadastrar</div>
    </div>
    <div style="width: 50px; padding: 10px; left: 869px; top: 0px; position: absolute; border-radius: 10px; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
        <div style="width: 153px; text-align: center; color: white; font-size: 32px; font-family: Inter; font-weight: 700; word-wrap: break-word">?</div>
    </div>
</div>
*/
