"use client"

import { useEffect } from "react"
import { GlobalVariables } from "../global/global"

export default function RegisterEmailPassword(){
    useEffect(()=>{

        GlobalVariables.previousURL="register/email-password";
  
    }, [])
    return(
        <>
        
        </>
    )
}