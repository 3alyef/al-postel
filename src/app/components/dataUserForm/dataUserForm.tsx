"use client";
import { Locale } from "@/i18n";
import EmailLoginProfile from "../emailLoginProfile/emailLoginProfile";
import FormPasswordLogin from "../formPasswordLogin/formPasswordLogin";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getImageByEmail } from "@/interfaces/checkEmail.interface";
import { validateToken } from "@/services/validadeToken.service";
interface propsDataUser {
    locale: Locale;
    _isSemitic: boolean;
    Enter_your_password: string;
    Create_Account: string;
    Forgot_password: string;
    Next: string
}

export default function DataUserForm({locale, _isSemitic, Enter_your_password, Create_Account, Forgot_password, Next}: propsDataUser){
    const [showPage, setShowPage] = useState<boolean>(false);
    const [profileImage, setProfileImage] = useState<string>('/imgs/logo.png');
    const [email, setEmail] = useState<string>('');
    const router = useRouter();

    const returnLogin = ()=>{
        router.push(`/${locale}/login`); 
    }
    
    

    useEffect(()=>{
        const userTokenPreLogin = localStorage.getItem("userTokenPreLogin");
        if(userTokenPreLogin){
            validateToken(locale, userTokenPreLogin, setProfileImage, setShowPage)
        } else {
            returnLogin();
        }
       
        const userEmailLocalStorage = localStorage.getItem('userEmailToLogin')
        
        if(!userEmailLocalStorage){
            returnLogin();
        } else {
            setEmail(userEmailLocalStorage)
        }
    }, [])
    return(
        <>
            {showPage && (   
                <>
                    <div className="w-[100%]">
                        <EmailLoginProfile locale={locale} email={email} profileImage={profileImage}/>
                    </div>
                    <FormPasswordLogin locale={locale} formCostumerClass="w-[85%]" _isSemitic={_isSemitic} textLabelPassword={Enter_your_password}
                    createAccount={Create_Account} 
                    forgotPassword={Forgot_password}
                    next={Next}
                    />  
                </>
            )}      
        </>
    )
}