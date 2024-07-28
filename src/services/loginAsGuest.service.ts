"use client";
import { Locale } from "@/i18n";
import { dataLoginToM1, tokenAuthenticate } from "./dataLoginToM1.service";
import { useRouter } from "next/navigation";
interface PropsLoginAsGuest {
    email: string;
    password: string;
    locale: Locale;
}

function redirectToAlpostel(locale: Locale) {
    const router = useRouter(); 
    router.push(`/${locale}/alpostel`); // Redireciona para a página de login
}

async function loginAsGuest({email, password, locale}: PropsLoginAsGuest) {
    const response: tokenAuthenticate | {message: string} = await dataLoginToM1({email, password});
    if(!("message" in response)){
        if(response.auth && response.token){
            localStorage.setItem("tokenToM2", response.token);
            redirectToAlpostel(locale);
        }
    }
}