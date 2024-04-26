"use client"
import { useEffect, useState } from "react";
import { GlobalVariables } from "../global/global";
import { Locale } from "@/i18n";

interface propsRegisterEmailPassword {
    locale: Locale
}

export default function RegisterEmailPassword({locale}:propsRegisterEmailPassword){
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [firstNameValue, setFirstNameValue] = useState<string>("");
    const [lastNameValue, setLastNameValue] = useState<string>("");


    useEffect(() => {
        GlobalVariables.previousURL = "register/email-password";

        const firstName = localStorage.getItem("fNameReg");
        const lastName = localStorage.getItem("lNameReg");

        if (firstName) {
            setFirstNameValue(firstName);
        }
        if (lastName) {
            setLastNameValue(lastName);
        }  
    }, [])

    return (
        <>
            <h1>
                {firstNameValue}
            </h1>
            <h2>
                {lastNameValue}
            </h2>
        
        </>
    );
}
