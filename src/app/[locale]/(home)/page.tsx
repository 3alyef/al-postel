import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/get-dictionary";
import React from "react";
import Link from "next/link"
export default async function Login({
  params: { locale }
}: { params: { locale: Locale } }) {
  const dictionary = await getDictionary(locale);
  return (
    <main className="mainLogin">
      <div className="containerLogin">
        <div className={`postElH1 ${locale === "he" ? "semitic" : ""}`}>

          <h1>{dictionary.Login.Title}</h1>

          <div className="loginMenu">

            <div className="questionMarkContainer">
              <button className="questionMark">?</button>
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
