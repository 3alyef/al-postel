"use client"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import InputText from "../inputText/inputText";
import { Locale } from "@/i18n";
import { dataLoginToM1, tokenAuthenticate } from "@/services/dataLoginToM1.service";
import { useRouter } from "next/navigation";
interface propsFormRegister {
    locale: Locale;
    formCostumerClass: string;
    _isSemitic: boolean;
    forgotPassword: string;
    createAccount: string;
    next: string;
    textLabelPassword: string;
    onFocusStyle: boolean;
    setOnFocusStyle: Dispatch<SetStateAction<boolean>>;
    onFocusFunction: ()=>void;
    messageError: string
}


export default function FormPasswordLogin({locale, formCostumerClass, _isSemitic, forgotPassword, createAccount, next, textLabelPassword, onFocusFunction, onFocusStyle, setOnFocusStyle, messageError}: propsFormRegister){
    const [passwordValue, setPasswordValue] = useState<string>('');
    const [processErrorStyle, setProcessErrorStyle] = useState<boolean>(false);
    const [activeFocus, setActiveFocus] = useState<boolean>(false)
    const router = useRouter(); 
    const redirectToAlpostel = () => {
        router.push(`/${locale}/alpostel`); // Redireciona para a página de login
    }
    async function dataToM1(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        const email = localStorage.getItem("userEmailToLogin")
        const password = passwordValue;
        if(email){
            const response: tokenAuthenticate | {message: string} = await dataLoginToM1({email, password});
            if("message" in response){
                // error
                if(response.message === "Password Invalid!"){
                    setProcessErrorStyle(true)
                }
            } else {
                if(response.auth && response.token){
                    localStorage.setItem("tokenToM2", response.token);
                    //localStorage.setItem("linkM2", response.URL_M2);
                    redirectToAlpostel();
                    
                }
            }
        }
        
    }
    useEffect(()=>{
        setActiveFocus(true)
    }, [])
    return(
        <form className="w-[100%]" onSubmit={dataToM1}>
            <div className={formCostumerClass}>
        
                <InputText text={textLabelPassword} _isSemitic={_isSemitic} type="password" costumerClass="text-white" setValue={setPasswordValue} value={passwordValue} _isRequired={true} processErrorStyle={processErrorStyle} onFocusFunction={onFocusFunction} onFocusStyle={onFocusStyle} setOnFocusStyle={setOnFocusStyle} messageError={messageError} activeFocus={activeFocus}/>

            </div>
            <div className="forgetEmail">
                        
                <div className="forgetEmailSubcontainer">
                    <input type="button" value={forgotPassword}/>
                </div>
                
            </div>
                
            <div className="nextNewAccountMenu">
         
                <div className="btnNextAccount w-[35%]">
                    <input type="submit" value={next} className="nextBtnAccount "/>
                </div>
                
            </div>
        </form>
        
    )
}