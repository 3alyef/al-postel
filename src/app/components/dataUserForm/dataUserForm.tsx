"use client";
import { Locale } from "@/i18n";
import EmailLoginProfile from "../emailLoginProfile/emailLoginProfile";
import FormPasswordLogin from "../formPasswordLogin/formPasswordLogin";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
interface propsDataUser {
    locale: Locale;
    _isSemitic: boolean;
    Enter_your_password: string;
    Create_Account: string;
    Forgot_password: string;
    Next: string
}

export default function DataUserForm({locale, _isSemitic, Enter_your_password, Create_Account, Forgot_password, Next}: propsDataUser){
    const [profileImage, setProfileImage] = useState<string>('/imgs/logo.png');
    const [email, setEmail] = useState<string>('');
    const router = useRouter();
    const [onFocusStyle, setOnFocusStyle] = useState<boolean>(false);
    const returnLogin = ()=>{
        router.push(`/${locale}/login`); 
    }

    const onFocus = ()=>{
        setOnFocusStyle(true);
        console.log('oi')
    }
    
    

    useEffect(()=>{
        /*
        const userTokenPreLogin = localStorage.getItem("userTokenPreLogin");
        if(userTokenPreLogin){
            validateToken(locale, userTokenPreLogin)
        } else {
            returnLogin();
        }*/
       
        const userEmailLocalStorage = localStorage.getItem('userEmailToLogin')
        const image = localStorage.getItem("imagemUserToPreLogin")
        if(image){
            setProfileImage(image)
        }
     
        if(!userEmailLocalStorage){
            returnLogin();
        } else {
            setEmail(userEmailLocalStorage)
        }
    }, [])
    return(
        <>
            <div className="w-[100%]">
                <EmailLoginProfile locale={locale} email={email} profileImage={profileImage}/>
            </div>
            <FormPasswordLogin locale={locale} formCostumerClass="w-[85%]" _isSemitic={_isSemitic} textLabelPassword={Enter_your_password}
            createAccount={Create_Account} 
            forgotPassword={Forgot_password}
            next={Next} onFocusFunction={onFocus} onFocusStyle={onFocusStyle} setOnFocusStyle={setOnFocusStyle}/>
        </>
    )
}