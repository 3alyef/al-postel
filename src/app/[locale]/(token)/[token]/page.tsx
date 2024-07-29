"use client";
import { Locale } from "@/i18n";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RingLoader } from "react-spinners";
export default function RedirectGuest({
    params: { token, locale }
  }: { params: { token: string, locale: Locale } }) {
    const router = useRouter();
    function redirect(){
        router.push(`/${locale}/alpostel`); 
    }
    useEffect(()=>{
        if(token){
            localStorage.setItem("tokenToM2", token);
            /*setTimeout(()=>{
                
            }, 1000)*/
            redirect();
        }
    }, [])
    return (

        <body>
            <div className="main_Login">
                <div className="barLogin">
                    <div className="flex flex-col w-[20em] max-w[100vw] min-h-[100vh] absolute top-0 items-center justify-center">
                        <div className="flex" style={{justifyContent: "center", alignItems: "center"}}>
                            <RingLoader
                            color="#0034b9ad"
                            size={125}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}