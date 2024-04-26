"use client"
import { useEffect, useState } from "react";
import { GlobalVariables } from "../global/global";
import { Locale } from "@/i18n";
import { useRouter } from "next/navigation";
import InputText from "../inputText/inputText";
import Link from "next/link";
import { registerUser } from "@/services/registerUser.service";
import checkEmail from "@/services/checkEmail.service";
import { tokenGetImageByEmail } from "@/interfaces/checkEmail.interface";

interface propsRegisterEmailPassword {
    locale: Locale;
    _isSemitic: boolean;
    email: string;
    password: string;
    repeatPassword: string;
    next: string;
    back: string;
    Those_passwords_did_not_match_Try_again: string;
    Use_8_characters_or_more_for_your_password: string;
    Confirm_your_password: string;
    Email_already_exists: string
}

export default function RegisterEmailPassword({locale, _isSemitic, email, password, repeatPassword, next, back, Those_passwords_did_not_match_Try_again, Confirm_your_password, Use_8_characters_or_more_for_your_password, Email_already_exists}:propsRegisterEmailPassword){

    const [firstNameValue, setFirstNameValue] = useState<string>("");
    const [lastNameValue, setLastNameValue] = useState<string>("");

    

    const [onFocusStyleEmail, setOnFocusStyleEmail] = useState<boolean>(false);

    const [onFocusStylePassword, setOnFocusStylePassword] = useState<boolean>(false);

    const onFocusFunctionEmailValue = () =>{
        setOnFocusStyleEmail(true);
    }

    const onFocusFunctionPassword = () =>{

        setOnFocusStylePassword(true);
        
    }

    const [processErrorStyleEmail, setProcessErrorStyleEmail] = useState<boolean>(false); // Email

    const [processErrorStyleRPass, setProcessErrorStyleRPass] = useState<boolean>(false); // Repeat Password
    const [processErrorStylePass, setProcessErrorStylePass] = useState<boolean>(false); // Password

    const [erroMsg, setErroMsg] = useState<string>("")

    const [onFocusStyleRepeatPassword, setOnFocusStyleRepeatPassword] = useState<boolean>(false)

    const onFocusFunctionRepeatPassword = () =>{
        setOnFocusStyleRepeatPassword(true)
    }


    const [emailValue, setEmailValue] = useState<string>("");
    const [passwordValue, setPasswordValue] = useState<string>("");
    const [repeatPasswordValue, setRepeatPasswordValue] = useState<string>("");
    

    const router = useRouter(); 
    const redirectToNextPage = (address: string) => {
        router.push(`/${locale}/${address}`); // Redireciona para a página de login
    }

    const clickRegister = async ()=>{
        if(passwordValue.length < 8){
            if(passwordValue.length > 0){
                setProcessErrorStylePass(true) 
            }   
        } else {
            if(repeatPasswordValue.length === 0) {
                setProcessErrorStylePass(false)
                setErroMsg(Confirm_your_password) 
                setProcessErrorStyleRPass(true)
                
            } else {
                if(passwordValue !== repeatPasswordValue ){
                    setProcessErrorStyleRPass(true)
                    setErroMsg(Those_passwords_did_not_match_Try_again)
                    setRepeatPasswordValue("")
                } else {
                    
                    if(passwordValue.length >= 8 && !processErrorStyleEmail){
                    //
                        setProcessErrorStylePass(false) 
                        setProcessErrorStyleRPass(false)
                        const resp: {message: string, status: number} = await registerUser(firstNameValue, lastNameValue, emailValue, passwordValue, repeatPasswordValue);
                        console.log("RESPOSTA", resp)
                        if(resp.status === 201){
                            redirectToNextPage("login")
                        }
                        
                    //
                    }
                    
                }
            }
        }
    }
    
    //const [register, setRegister] = useState<boolean>(false)
    
    

    //
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
    //

    const emailExists = async (email: string) => {
        const resp: tokenGetImageByEmail | null = await checkEmail(email);
        if(!resp) {
            setProcessErrorStyleEmail(false)
            return
        } else {
            setEmailValue("") 
            setProcessErrorStyleEmail(true)
        }
        
    }

    async function onBlur(value: boolean){
        setOnFocusStyleEmail(value);
        if(emailValue){
            if(emailValue.includes("@")){
                await emailExists(emailValue)
            }
        }
        
    }

    return (
    
    <form className="w-[100%]" onSubmit={(e)=>{
            e.preventDefault();
            clickRegister()
            //redirectToNextPage("register/email-password")
    }}>
        <div className={`min-h-[68px] flex flex-col w-[85%]`}>

            {/* Email */}
            <div className="w-[100%] min-h-[65px]" key={email}>
                <InputText text={email} _isSemitic={_isSemitic} type="email" costumerClass="text-white" setValue={setEmailValue} value={emailValue} _isRequired={true} processErrorStyle={processErrorStyleEmail}
                messageError={Email_already_exists}
                onFocusFunction={onFocusFunctionEmailValue} onFocusStyle={onFocusStyleEmail} setOnFocusStyle={setOnFocusStyleEmail}
                onBlur={onBlur}/>
            </div>

            {/* Password */}
            <div className="w-[100%] min-h-[65px]" key={password}>
                <InputText text={password} _isSemitic={_isSemitic} type="password" costumerClass="text-white" setValue={setPasswordValue} value={passwordValue} _isRequired={true} processErrorStyle={processErrorStylePass}
                messageError={Use_8_characters_or_more_for_your_password}
                onFocusFunction={onFocusFunctionPassword} onFocusStyle={onFocusStylePassword} setOnFocusStyle={setOnFocusStylePassword}/>
            </div>    

            {/* Repeat Password */}
            <div className="w-[100%] min-h-[65px]" key={repeatPassword}>
                <InputText text={repeatPassword} _isSemitic={_isSemitic} type="password" costumerClass="text-white" setValue={setRepeatPasswordValue} value={repeatPasswordValue} _isRequired={false} processErrorStyle={processErrorStyleRPass}
                messageError={
                    erroMsg
                }
                onFocusFunction={onFocusFunctionRepeatPassword} onFocusStyle={onFocusStyleRepeatPassword} setOnFocusStyle={setOnFocusStyleRepeatPassword}/>
            </div>
        </div>
        
        <div className="nextNewAccountMenu">
        
            <div className="btnNextAccount w-[65%]">      
                <Link href={`${process.env.NEXT_PUBLIC_ALPOSTELURL}/${locale}/login`} className=" flex items-center h-[100%] justify-center">
                    <div className="createAccount"
                    style={{fontSize: "13px", height: "100%"}}>{back}</div>
                </Link>
            </div>
            <div className="btnNextAccount w-[35%]">

                <button type="submit" className="nextBtnAccount  flex justify-center" 
                style={{padding: "0px"}} onClick={()=>clickRegister()}>
                    {(passwordValue.length > 8 && emailValue && passwordValue === repeatPasswordValue) ? (
                        <>
                            <Link href={`${process.env.NEXT_PUBLIC_ALPOSTELURL}/login`} className=" w-[100%] py-[6px] px-[.48em] flex justify-center cursor-pointer">{next}</Link>
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
        
    );
}
