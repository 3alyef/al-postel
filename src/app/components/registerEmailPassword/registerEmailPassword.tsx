"use client"
import { useEffect, useState } from "react";
import { GlobalVariables } from "../global/global";
import { Locale } from "@/i18n";
import { useRouter } from "next/navigation";
import InputText from "../inputText/inputText";

interface propsRegisterEmailPassword {
    locale: Locale;
    _isSemitic: boolean;
    email: string;
    password: string;
    reapeatPassword: string;
    next: string;
}

export default function RegisterEmailPassword({locale, _isSemitic, email, password, reapeatPassword, next}:propsRegisterEmailPassword){
    const [processErrorStyle, setProcessErrorStyle] = useState<boolean>(false); // Não vai mudar

    const [onFocusStyleEmail, setOnFocusStyleEmail] = useState<boolean>(false);

    const [onFocusStylePassword, setOnFocusStylePassword] = useState<boolean>(false)

    const onFocusFunctionEmailValue = ()=>{
        setOnFocusStyleEmail(true);
    }

    const onFocusFunctionPassword = ()=>{
        setOnFocusStylePassword(true);
    }

    const [emailValue, setEmailValue] = useState<string>("");
    const [passwordValue, setPasswordValue] = useState<string>("");
    const [firstNameValue, setFirstNameValue] = useState<string>("");
    const [lastNameValue, setLastNameValue] = useState<string>("");

    const router = useRouter(); 
    const redirectToNextPage = (address: string) => {
        router.push(`/${locale}/${address}`); // Redireciona para a página de login
    }

    useEffect(() => {
        GlobalVariables.previousURL = "register/email-password";

        const firstName = localStorage.getItem("fNameReg");
        const lastName = localStorage.getItem("lNameReg");

        if (firstName) {
            setFirstNameValue(firstName);
        } else {
            if(GlobalVariables.fNameReg){
                setFirstNameValue(GlobalVariables.fNameReg)
            } else {
                redirectToNextPage("register")
            }
        } 
        if (lastName) {
            setLastNameValue(lastName);
        } else {
            setLastNameValue(GlobalVariables.lNameReg)
        } 

    }, [])

    return (
        <>
            <form className="w-[100%]" onSubmit={(e)=>{
                e.preventDefault();
                //setSend(true)
                redirectToNextPage("register/email-password")
            }}>
            <div className={`min-h-[68px] flex flex-col gap-2 w-[85%]`}>
                <InputText text={email} _isSemitic={_isSemitic} type="text" costumerClass="text-white" setValue={setEmailValue} value={emailValue} _isRequired={true} processErrorStyle={processErrorStyle}
                messageError={""}
                onFocusFunction={onFocusFunctionEmailValue} onFocusStyle={onFocusStyleEmail} setOnFocusStyle={setOnFocusStyleEmail}/>

                <InputText text={password} _isSemitic={_isSemitic} type="password" costumerClass="text-white" setValue={setLastNameValue} value={lastNameValue} _isRequired={false} processErrorStyle={processErrorStyle}
                messageError={""}
                onFocusFunction={onFocusFunctionPassword} onFocusStyle={onFocusStylePassword} setOnFocusStyle={setOnFocusStylePassword}/>

                <InputText text={reapeatPassword} _isSemitic={_isSemitic} type="password" costumerClass="text-white" setValue={setLastNameValue} value={lastNameValue} _isRequired={false} processErrorStyle={processErrorStyle}
                messageError={""}
                onFocusFunction={onFocusFunctionPassword} onFocusStyle={onFocusStylePassword} setOnFocusStyle={setOnFocusStylePassword}/>
            </div>
            
            <div className="nextNewAccountMenu">
            
                <div className="btnNextAccount w-[65%]">      
                    <Link href={`${process.env.NEXT_PUBLIC_ALPOSTELURL}/${locale}/login`} className=" flex items-center h-[100%] justify-center">
                        <div className="createAccount"
                        style={{fontSize: "13px", height: "100%"}}>{already_have_an_account}</div>
                    </Link>
                </div>
                <div className="btnNextAccount w-[35%]">

                    <button type="submit" className="nextBtnAccount  flex justify-center" 
                    style={{padding: "0px"}} onClick={()=>setSend(true)}>
                        {firstNameValue ? (
                            <>
                                <Link href={`${process.env.NEXT_PUBLIC_ALPOSTELURL}/register/email-password`} className=" w-[100%] py-[6px] px-[.48em] flex justify-center cursor-pointer">{next}</Link>
                            </>
                        ):(
                            <div className=" w-[100%] py-[6px] px-[.48em] flex justify-center cursor-pointer">
                                {next}
                            </div>
                        )}              
                    </button>
                </div>
                
            </div>
        </form>

        
        </>
    );
}
