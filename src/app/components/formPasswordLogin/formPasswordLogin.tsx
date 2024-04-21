"use client"
import { useEffect, useState } from "react";
import InputText from "../inputText/inputText";
import { useRouter } from "next/navigation";
import { Locale } from "@/i18n";
import Globals from "../global/Globals";

interface propsFormRegister {
    locale: Locale;
    formCostumerClass: string;
    _isSemitic: boolean;
    forgotPassword: string;
    createAccount: string;
    next: string;
    textLabelPassword: string

}


export default function FormPasswordLogin({locale, formCostumerClass, _isSemitic, forgotPassword, createAccount, next, textLabelPassword}: propsFormRegister){
    //const [emailValue, setEmailValue] = useState<string>('');
    const [passwordValue, setPasswordValue] = useState<string>('');

    /*useEffect(()=>{
        setEmailValue(Globals.userEmail); // Vai recarregar o email que já foi digitado
       
    }, [])
    useEffect(()=>{
        if(emailValue != Globals.userEmail && emailValue != ""){
            Globals.userEmail = emailValue;// Toda vez que o email foi alterado o novo valor vai sobrescrever userEmail
        }
      
    }, [emailValue])*/
    
    //const router = useRouter();
    async function dataToM1(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        //const redirectPath = `/${locale}/login/signin`;
        //router.push(`${redirectPath}`);
    }
    return(
        <form className="w-[100%]" onSubmit={dataToM1}>
            <div className={formCostumerClass}>
        
                <InputText text={textLabelPassword} _isSemitic={_isSemitic} type="email" costumerClass="text-white" setValue={setPasswordValue} value={passwordValue} _isRequired={true}/>

            </div>
            <div className="forgetEmail">
                        
                <div className="forgetEmailSubcontainer">
                    <input type="button" value={forgotPassword}/>
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