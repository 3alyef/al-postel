"use client";
import { Locale } from "@/i18n";
import loginAsGuest from "@/services/loginAsGuest.service";
import { Dispatch, SetStateAction, useState } from "react";
interface PropsGuestButton {
    locale: Locale;
    setOnLinks: Dispatch<SetStateAction<boolean>>;
    setLink1: Dispatch<SetStateAction<string>>;
    setLink2: Dispatch<SetStateAction<string>>;
    setLoading: Dispatch<SetStateAction<boolean>>
}
export default function GuestButton({locale, setLink1, setLink2, setOnLinks, setLoading}: PropsGuestButton) {
    const [optionsOn, setOptionsOn] = useState(false);
    async function activeGuest() {
        const email = ["test1@gmail.com", "test2@gmail.com"]
        const password = "1asw234d";
        setOnLinks(true);
        setLoading(true);
        let token = await loginAsGuest({ email: email[0], password });
        if(!token) {
            setLoading(false);
            setOnLinks(false);
            return
        }
        let token2 = await loginAsGuest({ email: email[1], password });
        if(token && token2) {
            setLink1(`${process.env.NEXT_PUBLIC_ALPOSTELURL}/${locale}/${token.token}`);
            setLink2(`${process.env.NEXT_PUBLIC_ALPOSTELURL}/${locale}/${token2.token}`);
            setLoading(false);
        } else {
            setOnLinks(false);
        }
    }
    return (
        <span className="testOptionsSpan">
            {
                optionsOn ? (
                    <div className="flex justify-evenly items-center w-[55%] font-[400]">
                        <h3>Opção para Teste:</h3>
                        <button className="buttonGuest p-[6px] rounded-md" onClick={activeGuest}>
                            Gerar Seção
                        </button>
                    </div>
                ) : (
                    <button onClick={()=> setOptionsOn(true)} className="buttonGuest w-[2em] p-[6px] rounded-[100%]">
                        ?
                    </button>
                )
            }
            
        </span>
    )
}