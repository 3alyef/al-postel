"use client";
import { Locale } from "@/i18n";
import EmailLoginProfile from "../emailLoginProfile/emailLoginProfile";
import FormPasswordLogin from "../formPasswordLogin/formPasswordLogin";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifyAll } from "@/services/toServerAndVerifyToken.service";
import { GlobalVariables } from "../global/global";
interface propsDataUser {
    locale: Locale;
    _isSemitic: boolean;
    Enter_your_password: string;
    Create_Account: string;
    Forgot_password: string;
    Next: string;
    messageError: string;
    setPasswordScreen: Dispatch<SetStateAction<boolean>>;
    setLoading: Dispatch<SetStateAction<boolean>>
}

export default function DataUserForm({locale, _isSemitic, Enter_your_password, Create_Account, Forgot_password, Next, messageError, setPasswordScreen, setLoading}: propsDataUser){
    const [profileImage, setProfileImage] = useState<string>('/imgs/logo.png');
    const [email, setEmail] = useState<string>('');
    const router = useRouter();
    const [onFocusStyle, setOnFocusStyle] = useState<boolean>(false);

    const [bannerReturn, setBannerReturn] = useState<boolean>(false);// Para erro no servidor M1/M2 ou token de senha expirado

    const returnLogin = ()=>{
        //router.push(`/${locale}/login`); 
        setPasswordScreen(false)
    }

    const onFocus = async ()=>{
        setOnFocusStyle(true);
        //console.log('oi, password')

        const ok:boolean = await verifyAll({locale, emailValue: email, setProcessErrorStyle: setBannerReturn, isPassword: true, setPasswordScreen, setLoading});
        //console.log(ok)
        if(!ok){
            //console.log("tera de reiniciar")
            // Quando o token da senha expirar voltará para a primeira tela
            returnLogin();
        }
    }

    useEffect(()=>{

        GlobalVariables.previousURL = "login/signin";
     
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
    return (
        <>
            <div className="w-[100%] costumerToMediaQueryPerfilEmail">
                <EmailLoginProfile locale={locale} email={email} profileImage={profileImage} returnLogin={returnLogin}/>
            </div>
            <FormPasswordLogin locale={locale} formCostumerClass="w-[85%] min-h-[65px]" _isSemitic={_isSemitic} textLabelPassword={Enter_your_password}
            createAccount={Create_Account} 
            forgotPassword={Forgot_password}
            next={Next} onFocusFunction={onFocus} onFocusStyle={onFocusStyle} setOnFocusStyle={setOnFocusStyle}
            messageError={messageError}/>
        </>
    )
}