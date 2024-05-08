"use client"

import { Locale } from "@/i18n";
import FormEmailLogin from "../formEmailLogin/formEmailLogin";
import { useState } from "react";

interface propsDataUserFormEmail  {
    locale: Locale;
    _isSemitic: boolean;
    Email: string;
    Create_Account: string;
    Forgot_your_email: string; 
    Next: string;
    could_not_find_your_Al_PostEl_account: string
}
export default function DataUserFormEmail({locale, _isSemitic, Email, Create_Account, Forgot_your_email, Next, could_not_find_your_Al_PostEl_account}: propsDataUserFormEmail){
    const [onFocusStyle, setOnFocusStyle] = useState<boolean>(false);
    const onFocus = ()=>{
        setOnFocusStyle(true);
        //console.log('oi')
    }
    
    return (
        <>
            <FormEmailLogin locale={locale} textLabelEmail={Email} _isSemitic={_isSemitic} createAccount={Create_Account} forgotEmail={Forgot_your_email} next={Next}
            could_not_find_your_Al_PostEl_account={could_not_find_your_Al_PostEl_account} onFocusFunction={onFocus} onFocusStyle={onFocusStyle} setOnFocusStyle={setOnFocusStyle}/>  
        </>
    )
}