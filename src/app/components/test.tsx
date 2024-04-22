"use client"

import { useEffect } from "react"
import Globals from "./global/Globals"
import { useRouter } from "next/navigation";
import { Locale } from "@/i18n";
import Image from "next/image";
import { IoMdArrowDropdown } from "react-icons/io";
export default function Test({locale, _isSemitic}:{locale: Locale, _isSemitic:boolean}){
    const router = useRouter();
    const userEmailLocalStorage = localStorage.getItem('userEmailToLogin');
    console.log(userEmailLocalStorage);
    const returnLogin = ()=>{
        router.push(`/${locale}/login`); 
    }
    useEffect(()=>{
        const userEmailLocalStorage = localStorage.getItem('userEmailToLogin')
        if(!Globals.userEmail && !userEmailLocalStorage){
            returnLogin();
        }
    }, [])
    return (
        <div className="w-[85%] flex justify-center items-center ">
            <div className=" w-full flex flex-col  cursor-pointer select-none gap-2 border-collapse rounded-[4px] items-center" >
                <div  className="relative w-[3em] aspect-[1/1] py-[.2em]">
                    <Image src="/imgs/logo.png" fill alt="perfil image"/>
                </div>
                <div className=" emailBar inline-flex w-full justify-between bg-slate-300 items-center px-[.4em] rounded-[15px]" onClick={returnLogin}>
                    <h3 className="text-[.75em] font-[400] mx-[.4em]">{Globals.userEmail || userEmailLocalStorage}</h3>
                    <IoMdArrowDropdown className={`dropStyle text-[.85em] `}/>
                </div>
             
            </div>
        </div>
    )
}

/* const searchParams = useSearchParams()
    const router = useRouter()
    const email = searchParams.get('email')
    <div className="inline-flex gap-1 ">
                    <div className="relative w-[.9em] aspect-[1/1] py-[.2em]">
                        <Image src="/imgs/perfil-test.png" fill alt="perfil image"/>
                    </div>
                    <div>
                        <h3 className="text-[.75em] font-[400]">{Globals.userEmail || userEmailLocalStorage}</h3>
                    </div>
                </div>
                
                <IoMdArrowDropdown className={`dropStyle text-[.85em] `}/>
    */