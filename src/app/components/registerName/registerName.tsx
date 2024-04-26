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
    const [onFocusStyleFirstName, setOnFocusStyleFirstName] = useState<boolean>(false);
    const [firstNameValue, setFirstNameValue] = useState<string>("");
    

    const [lastNameValue, setLastNameValue] = useState<string>("");
    const [onFocusStyleLastName, setOnFocusStyleLastName] = useState<boolean>(false);

    const [send, setSend] = useState<boolean>(false);

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
    

    useEffect(()=>{
        if(send){
            localStorage.setItem("fNameReg", firstNameValue);
            localStorage.setItem("lNameReg", lastNameValue);

            // Em caso do LocalStorage esteja indisponivel...
            GlobalVariables.fNameReg = firstNameValue;
            GlobalVariables.lNameReg = lastNameValue;

            //redirectToNextPage("register/email-password")
        }
        
      
    }, [send])
    
  
    useEffect(()=>{
        const previousURL = GlobalVariables.previousURL;
        if(previousURL.includes("register/email-password")){
            const fName = localStorage.getItem("fNameReg");
            console.log("fName", fName)
            if(fName){
                setFirstNameValue(fName);
                const lName = localStorage.getItem("lNameReg");
         
                if(lName){ 
                    setLastNameValue(lName)
                }

                if(fName === firstNameValue){
                    GlobalVariables.previousURL = "";
                    GlobalVariables.fNameReg = "";
                    GlobalVariables.lNameReg = "";
                }
            } else {
                setFirstNameValue(GlobalVariables.fNameReg);
                setLastNameValue(GlobalVariables.lNameReg);
                GlobalVariables.previousURL = "";
                GlobalVariables.fNameReg = "";
                GlobalVariables.lNameReg = "";
                
            }          
        } 

        localStorage.removeItem("fNameReg");
        localStorage.removeItem("lNameReg");
        
    }, [])
    return (
    
        <form className="w-[100%]" onSubmit={(e)=>{
            e.preventDefault();
            setSend(true)
            redirectToNextPage("register/email-password")
        }}>
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

    )
}

/*async function dataToRegister2(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        if(firstNameValue){
            localStorage.setItem("fNameReg", firstNameValue);
            if(lastNameValue) {
                localStorage.setItem("lNameReg", lastNameValue);
            }
            //redirectToNextPage("register/email-password")
        }       
        
    }*/