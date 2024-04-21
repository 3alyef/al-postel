"use client"

import { useEffect } from "react"
import Globals from "./global/Globals"
import { useRouter } from "next/navigation";

export default function Test(){
    const router = useRouter();
    const userEmailLocalStorage = localStorage.getItem('userEmail');
    console.log(userEmailLocalStorage)
    useEffect(()=>{
        const userEmailLocalStorage = localStorage.getItem('userEmail')
        if(!Globals.userEmail && !userEmailLocalStorage){
            router.push("/login");
            
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