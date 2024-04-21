"use client"

import { useEffect } from "react"
import Globals from "./global/Globals"
import { useRouter } from "next/navigation";
import { Locale } from "@/i18n";

export default function Test({locale}:{locale: Locale}){
    const router = useRouter();
    const userEmailLocalStorage = localStorage.getItem('userEmailToLogin');
    console.log(userEmailLocalStorage)
    useEffect(()=>{
        const userEmailLocalStorage = localStorage.getItem('userEmailToLogin')
        if(!Globals.userEmail && !userEmailLocalStorage){
            router.push(`/${locale}/login`);   
        }
    }, [])
    return (
        <h1>
            Aqui {Globals.userEmail || userEmailLocalStorage}
         
        
        </h1>
    )
}

/* const searchParams = useSearchParams()
    const router = useRouter()
    const email = searchParams.get('email')*/