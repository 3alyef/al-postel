"use client";
import { Locale } from "@/i18n";
import DefaultBackground from "../defaultBackground/defaultBackground";
import LogoAlPostel from "../logoAlPostel/logoAlPostel";
import LanguageSwitch from "../languageSwitch/languageSwitch";
import { useState } from "react";
import { MoonLoader } from "react-spinners";

interface PropsBodyLogin {
    children: React.ReactNode;
    locale: Locale;
    dictionary: any
}
export default function BodyLogin({locale, dictionary, children}: PropsBodyLogin) {
    const _isSemitic: boolean = locale === "he";
    const [onLinks, setOnLinks] = useState(false);
    const [loading, setLoading] = useState(false);
    const [link1, setLink1] = useState("");
    const [link2, setLink2] = useState("");
    return (
        <body
        className="min-h-[100vh] bg-black flex flex-col relative"
            >
            <DefaultBackground _isSemitic={_isSemitic} locale={locale} tests={true} setLink1={setLink1} setLink2={setLink2} setOnLinks={setOnLinks} setLoading={setLoading}>
                <main className={`loginRegisterMenuLayout`}>
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
            {onLinks && (
                <span className="absolute w-[100vw] h-[100vh] flex justify-center items-center rounded-[10px]" onClick={()=> {
                    if(!loading) {
                        setOnLinks(false);
                    }
                    if(link1.length > 0) {
                        setLink1("");
                        setLink2("");
                    }
                }} style={{backgroundColor: "rgb(40 40 40 / 33%)"}}>
                    {
                        link1.length > 0 ? (
                            <div onClick={(e)=>e.stopPropagation()} className="flex w-[60%] aspect-[1/.6] bg-white justify-center items-center gap-[20%] text-white max-h-[80vh] rounded-[2px]" style={{ 
                                backgroundImage: "linear-gradient(180deg, #21331a 35%, #1e1e1e)"
                            }}>
                                <a href={link1} target="_blank" className="buttonGuest p-[6px] rounded-[5px] text-[18px] font-[400]">Seção 1</a>
                                <a href={link2} target="_blank" className="buttonGuest p-[6px] rounded-[5px] text-[18px] font-[400]">Seção 2</a>
                            </div>
                        ) : (
                            <MoonLoader
                            color="#558343"
                            loading
                            size={75}
                            />
                        )
                    }
                </span>
            )}
        </body>
    )
}