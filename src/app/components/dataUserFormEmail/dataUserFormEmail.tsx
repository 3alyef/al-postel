import { Locale } from "@/i18n";
import FormEmailLogin from "../formEmailLogin/formEmailLogin";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface propsDataUserFormEmail  {
    locale: Locale;
    _isSemitic: boolean;
    Email: string;
    Create_Account: string;
    Forgot_your_email: string; 
    Next: string;
    could_not_find_your_Al_PostEl_account: string;
    setPasswordScreen: Dispatch<SetStateAction<boolean>>;
    emailValue:string;
    setEmailValue: Dispatch<SetStateAction<string>>;
    setLoading: Dispatch<SetStateAction<boolean>>
}
export default function DataUserFormEmail({locale, _isSemitic, Email, Create_Account, Forgot_your_email, Next, could_not_find_your_Al_PostEl_account, setPasswordScreen, emailValue, setEmailValue, setLoading}: propsDataUserFormEmail){
    const [onFocusStyle, setOnFocusStyle] = useState<boolean>(false);
    
    const onFocus = ()=>{
        setOnFocusStyle(true);
        //console.log('oi')
    }
    useEffect(()=>{
        const startSystem = async () => {
            try {
                let body = JSON.stringify({ data: new Date() });
                const response = await fetch(`${process.env.NEXT_PUBLIC_M1_URL}/startSystem`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: body
                });
            
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
            
                const data = await response.json();
                console.log(data.msg);
                } catch (error) {
                    console.error('There was an error!', error);
                }
        };
        
        startSystem();
    }, [])
    
    return (
        <>
            <FormEmailLogin locale={locale} textLabelEmail={Email} _isSemitic={_isSemitic} createAccount={Create_Account} forgotEmail={Forgot_your_email} next={Next}
            could_not_find_your_Al_PostEl_account={could_not_find_your_Al_PostEl_account} onFocusFunction={onFocus} onFocusStyle={onFocusStyle} setOnFocusStyle={setOnFocusStyle} setPasswordScreen={setPasswordScreen} emailValue={emailValue} setEmailValue={setEmailValue} setLoading={setLoading}/>  
        </>
    )
}