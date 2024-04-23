import { getImageByEmail } from "@/interfaces/checkEmail.interface";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { Locale } from "@/i18n";
const router = useRouter();
const returnLogin = (locale: Locale)=>{
    router.push(`/${locale}/login`); 
}

export async function validateToken(locale: Locale, token: string, setProfileImage: Dispatch<SetStateAction<string>>, setShowPage:Dispatch<SetStateAction<boolean>>){
    try {
        const body = JSON.stringify({token: token})
        console.log(body)
        const response = await fetch("/api/decrypt-token", {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })

        if(!response.ok){
            throw new Error()
        }
        const contain: {decryptedToken: getImageByEmail} | null = await response.json();
        if(contain){
            setProfileImage(contain.decryptedToken.image)
            
        } else {
            throw new Error();
        }
        setShowPage(true)
    } catch(error){
        returnLogin(locale);
        return null
    }
    
}