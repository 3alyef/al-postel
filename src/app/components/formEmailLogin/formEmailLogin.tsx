"use client"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import InputText from "../inputText/inputText";
import { useRouter } from "next/navigation";
import { Locale } from "@/i18n";
import { verifyAll } from "@/services/toServerAndVerifyToken.service";
import Link from "next/link";
import { GlobalVariables } from "../global/global";

interface propsFormRegister {
    locale: Locale;
    textLabelEmail: string;
    _isSemitic: boolean;
    forgotEmail: string;
    createAccount: string;
    next: string;
    could_not_find_your_Al_PostEl_account: string;
    onFocusStyle: boolean;
    setOnFocusStyle: Dispatch<SetStateAction<boolean>>
    onFocusFunction: ()=> void;

}

export default function FormEmailLogin({locale, textLabelEmail, _isSemitic, forgotEmail, createAccount, next, could_not_find_your_Al_PostEl_account, onFocusStyle, setOnFocusStyle, onFocusFunction}: propsFormRegister){
    const [emailValue, setEmailValue] = useState<string>('');
    const [processErrorStyle, setProcessErrorStyle] = useState<boolean>(false);
    
    const router = useRouter(); 


    const redirectToNextPage = (address: string) => {
        router.push(`/${locale}/${address}`); // Redireciona para a página de login
    }

    useEffect(()=>{
        /*const userEmailLocalStorage = localStorage.getItem("userEmailToLogin")
        if(userEmailLocalStorage){      
            setEmailValue(userEmailLocalStorage);
        }*/

        const previousURL = GlobalVariables.previousURL;
        //console.log("hine", previousURL, previousURL.includes("register/email-password"))
        if(previousURL.includes("login/signin")){
            const userEmailLocalStorage = localStorage.getItem("userEmailToLogin")
            if(userEmailLocalStorage){      
                setEmailValue(userEmailLocalStorage);
                if(emailValue === userEmailLocalStorage){
                    GlobalVariables.previousURL = "";
                }
            }
                   
        } 

        localStorage.removeItem("userEmailToLogin");
        
    }, [])

    async function dataToLogin2(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        //console.log("emailValue", emailValue)
        const ok:boolean = await verifyAll(locale, emailValue, setProcessErrorStyle, false);
        if(ok){
            redirectToNextPage("login/signin");
        }
    }

    
    return(
        <form className="w-[100%]" onSubmit={dataToLogin2}>
            <div className={`w-[85%] min-h-[68px]`}>
       
                <InputText text={textLabelEmail} _isSemitic={_isSemitic} type="email" costumerClass="text-white" setValue={setEmailValue} value={emailValue} _isRequired={true} processErrorStyle={processErrorStyle}
                messageError={could_not_find_your_Al_PostEl_account}
                onFocusFunction={onFocusFunction} onFocusStyle={onFocusStyle} setOnFocusStyle={setOnFocusStyle}/>
            </div>
            <div className="forgetEmail">
                        
                <div className="forgetEmailSubcontainer">
                    <input type="button" value={forgotEmail}/>
                    
                </div>
                
                </div>
                
                <div className="nextNewAccountMenu">
                
                <div className="btnNextAccount w-[65%]">
                    <Link href={`/${locale}/register`} className=" flex items-center w-[80%]">
                        <div className="createAccount flex items-center justify-center"
                        >{createAccount}</div>
                    </Link>
                </div>
                <div className="btnNextAccount w-[35%]">
                    <input type="submit" value={next} className="nextBtnAccount"/>
                </div>
                
            </div>
        </form>
        
    )
}

/*
    
        Globals.userEmail = userEmailLocalStorage;
            
        if(Globals.userEmail){
            setEmailValue(Globals.userEmail); // Vai recarregar o email que já foi digitado
       
        } else if(userEmailLocalStorage){
            setEmailValue(userEmailLocalStorage)
        }
        useEffect(()=>{
        if(emailValue != Globals.userEmail){
            Globals.userEmail = emailValue;// Toda vez que o email foi alterado o novo valor vai sobrescrever userEmail
        }

         let userEmailLocalStorage = localStorage.getItem("userEmailToLogin")
       
        if(emailValue != Globals.userEmail && emailValue != ""){
            Globals.userEmail = emailValue;// Toda vez que o email foi alterado o novo valor vai sobrescrever userEmail
        }
        
        if(!userEmailLocalStorage || (emailValue != userEmailLocalStorage && emailValue != "")){
            localStorage.setItem("userEmailToLogin", emailValue)
            console.log("oi", emailValue)
        }
        
    }, [emailValue])
*/

/* TODO: GERAR TOKEN EM M1 E CONFERI-LO NO PASSWORD ENQUANTO FOR VALIDO O LOGIN ESTA DISPONIVEL */

    /*useEffect(()=>{
        let userEmailLocalStorage = localStorage.getItem("userEmailToLogin");
        if(userEmailLocalStorage != emailValue){
            localStorage.setItem("userEmailToLogin", emailValue)
            
            localStorage.setItem("userEmailPreLogin", "") // Limpa o history
        
        }
    }, [emailValue])
    
     if(emailDataUser){
            
                let userEmailLocalStorage = localStorage.getItem("userEmailToLogin");
                localStorage.setItem("userTokenPreLogin", emailDataUser.token);
                if(emailValue != userEmailLocalStorage){
                    localStorage.setItem("userEmailToLogin", emailValue);
                    
                }
    
    
                
            } else {
                setProcessErrorStyle(true);
            }
    
    
    */