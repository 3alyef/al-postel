"use client"
import { useEffect, useState } from "react";
import InputText from "../inputText/inputText";
import { useRouter } from "next/navigation";
import { Locale } from "@/i18n";
import Globals from "../global/Globals";

interface propsFormRegister {
    locale: Locale;
    formCostumerClass: string;
    textLabelEmail: string;
    _isSemitic: boolean;
    forgotEmail: string;
    createAccount: string;
    next: string;
}


export default function FormEmailLogin({locale, formCostumerClass, textLabelEmail, _isSemitic, forgotEmail, createAccount, next}: propsFormRegister){
    const [emailValue, setEmailValue] = useState<string>('');

    useEffect(()=>{
        const userEmailLocalStorage = localStorage.getItem("userEmail")
        if(Globals.userEmail){
            setEmailValue(Globals.userEmail); // Vai recarregar o email que já foi digitado
       
        } else if(userEmailLocalStorage){
            setEmailValue(userEmailLocalStorage)
        }
        
    }, [])
    useEffect(()=>{
        let userEmailLocalStorage = localStorage.getItem("userEmail")
       
        if(emailValue != Globals.userEmail && emailValue != ""){
            Globals.userEmail = emailValue;// Toda vez que o email foi alterado o novo valor vai sobrescrever userEmail
        }
        if(!userEmailLocalStorage || (emailValue != userEmailLocalStorage && emailValue != "")){
            localStorage.setItem("userEmail", emailValue)
            console.log("Effect formEmail: ",localStorage.getItem("userEmail"))
        }
      
    }, [emailValue])
    
    const router = useRouter();
    async function dataToLogin2(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        const redirectPath = `/${locale}/login/signin`;
        router.push(`${redirectPath}`);
    }
    return(
        <form className="w-[100%]" onSubmit={dataToLogin2}>
            <div className={formCostumerClass}>
        
                <InputText text={textLabelEmail} _isSemitic={_isSemitic} type="email" costumerClass="text-white" setValue={setEmailValue} value={emailValue} _isRequired={true}/>

            </div>
            <div className="forgetEmail">
                        
                <div className="forgetEmailSubcontainer">
                    <input type="button" value={forgotEmail}/>
                </div>
                
                </div>
                
                <div className="nextNewAccountMenu">
                
                <div className="btnNextAccount">
                    <input type="button" value={createAccount} className="createAccount"/>
                </div>
                <div className="btnNextAccount">
                    <input type="submit" value={next} className="nextBtnAccount"/>
                </div>
                
            </div>
        </form>
        
    )
}