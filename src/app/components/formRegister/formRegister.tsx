"use client"
import { useState } from "react";
import InputText from "../inputText/inputText";
import { useRouter } from "next/navigation";

interface propsFormRegister {
    formCostumerClass: string;
    textLabelEmail: string;
    _isSemitic: boolean;
    forgotEmail: string;
    forgotPassword: string;
    createAccount: string;
    next: string;
    textLabelPassword: string

}


export default function FormRegister({formCostumerClass, textLabelEmail, _isSemitic, forgotEmail, forgotPassword, createAccount, next, textLabelPassword}: propsFormRegister){
    const [emailValue, setEmailValue] = useState<string>('');
    const [passwordValue, setPasswordValue] = useState<string>('');
   
    const router = useRouter();
    async function dataToLogin2(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        console.log(emailValue)
        router.push(`/login/signin?email=${emailValue}`)
            
       
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