"use client"
import { Locale } from "@/i18n";
import InputText from "../inputText/inputText";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GlobalVariables } from "../global/global";
interface propsRegisterName {
    locale: Locale;
    _isSemitic: boolean;
    first_name: string;
    last_name: string;
    next: string;
    already_have_an_account: string
}

export default function RegisterName({locale, _isSemitic, first_name, last_name, next, already_have_an_account}: propsRegisterName){
    const [processErrorStyle, setProcessErrorStyle] = useState<boolean>(false); // Não vai mudar

    const [firstNameValue, setFirstNameValue] = useState<string>("");
    const [onFocusStyleFirstName, setOnFocusStyleFirstName] = useState<boolean>(false);

    const [lastNameValue, setLastNameValue] = useState<string>("");
    const [onFocusStyleLastName, setOnFocusStyleLastName] = useState<boolean>(false);

    const onFocusFunctionFirstName = ()=>{
        setOnFocusStyleFirstName(true);
    }

    const onFocusFunctionLastName = ()=>{
        setOnFocusStyleLastName(true);
    }
    const router = useRouter(); 
    const redirectToNextPage = (address: string) => {
        router.push(`/${locale}/${address}`); // Redireciona para a página de login
    }
    async function dataToRegister2(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        if(firstNameValue){
            localStorage.setItem("fNameReg", firstNameValue);
            if(lastNameValue) {
                localStorage.setItem("lNameReg", lastNameValue);
            }
            redirectToNextPage("register/email-password")
        }    
        
    }

    async function teste(event: React.FormEvent<HTMLFormElement>){
        const fName = localStorage.getItem("fNameReg");
        console.log(fName)
        GlobalVariables.previousURL = "register/email-password";
    }
    
  
    useEffect(()=>{
        const previousURL = GlobalVariables.previousURL;
        //console.log("hine", previousURL, previousURL.includes("register/email-password"))
        if(previousURL.includes("register/email-password")){
            const fName = localStorage.getItem("fNameReg");
            console.log("fName", fName)
            if(fName){
                setFirstNameValue(fName);
                const lName = localStorage.getItem("lNameReg");
                console.log(fName, "passou")
                if(lName){ 
                    setLastNameValue(lName)
                }

                if(fName === firstNameValue){
                    GlobalVariables.previousURL = "";
                }
            }         
        } 

        localStorage.removeItem("fNameReg");
        localStorage.removeItem("lNameReg");
        
    }, [])
    return (
    
        <form className="w-[100%]" onSubmit={dataToRegister2}>
            <div className={`min-h-[68px] flex flex-col gap-2 w-[85%]`}>
                <InputText text={first_name} _isSemitic={_isSemitic} type="text" costumerClass="text-white" setValue={setFirstNameValue} value={firstNameValue} _isRequired={true} processErrorStyle={processErrorStyle}
                messageError={""}
                onFocusFunction={onFocusFunctionFirstName} onFocusStyle={onFocusStyleFirstName} setOnFocusStyle={setOnFocusStyleFirstName}/>

                <InputText text={last_name} _isSemitic={_isSemitic} type="text" costumerClass="text-white" setValue={setLastNameValue} value={lastNameValue} _isRequired={false} processErrorStyle={processErrorStyle}
                messageError={""}
                onFocusFunction={onFocusFunctionLastName} onFocusStyle={onFocusStyleLastName} setOnFocusStyle={setOnFocusStyleLastName}/>
            </div>
            
            <div className="nextNewAccountMenu">
            
                <div className="btnNextAccount w-[65%]">      
                    <Link href={`${process.env.NEXT_PUBLIC_ALPOSTELURL}/${locale}/login`} className=" flex items-center h-[100%] justify-center">
                        <div className="createAccount"
                        style={{fontSize: "13px", height: "100%"}}>{already_have_an_account}</div>
                    </Link>
                </div>
                <div className="btnNextAccount w-[35%]">
                    <input type="submit" value={next} className="nextBtnAccount flex justify-center"/>
                </div>
                
            </div>
        </form>

    )
}