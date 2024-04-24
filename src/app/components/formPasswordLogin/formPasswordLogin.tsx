"use client"
import { useEffect, useState } from "react";
import InputText from "../inputText/inputText";
import { useRouter } from "next/navigation";
import { Locale } from "@/i18n";

interface propsFormRegister {
    locale: Locale;
    formCostumerClass: string;
    _isSemitic: boolean;
    forgotPassword: string;
    createAccount: string;
    next: string;
    textLabelPassword: string;
    costumerOnFocusFunction?: ()=> void

}


export default function FormPasswordLogin({locale, formCostumerClass, _isSemitic, forgotPassword, createAccount, next, textLabelPassword, costumerOnFocusFunction}: propsFormRegister){

    const [passwordValue, setPasswordValue] = useState<string>('');
    const [processErrorStyle, setProcessErrorStyle] = useState<boolean>(false);
  
    async function dataToM1(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
    }
    return(
        <form className="w-[100%]" onSubmit={dataToM1}>
            <div className={formCostumerClass}>
        
                <InputText text={textLabelPassword} _isSemitic={_isSemitic} type="password" costumerClass="text-white" setValue={setPasswordValue} value={passwordValue} _isRequired={true} processErrorStyle={processErrorStyle} costumerOnFocusFunction={costumerOnFocusFunction}/>

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