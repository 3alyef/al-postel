"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Locale } from "@/i18n";
import Image from "next/image";
import { IoMdArrowDropdown } from "react-icons/io";
export default function EmailLoginProfile({locale}:{locale: Locale}){
    const [email, setEmail] = useState<string>('')
    const router = useRouter();

    const returnLogin = ()=>{
        router.push(`/${locale}/login`); 
    }

    const ImagemProfile = localStorage.getItem("userImagemProfile")
    useEffect(()=>{
        const userEmailLocalStorage = localStorage.getItem('userEmailToLogin')

        if(!userEmailLocalStorage){
            returnLogin();
        } else {
            setEmail(userEmailLocalStorage)
        }
    }, [])
    return (
        <div className="w-[85%] flex justify-center items-center ">
            <div className=" w-full flex flex-col  cursor-pointer select-none gap-2 border-collapse rounded-[4px] items-center" >
                <div  className="relative w-[3em] aspect-[1/1] py-[.2em]">
                    <Image src={ImagemProfile ? ImagemProfile : "/imgs/logo.png"} fill alt="perfil image" className="rounded-[15px]"/>
                </div>
                <div className=" emailBar inline-flex w-full justify-between bg-slate-300 items-center px-[.4em] rounded-[15px]" onClick={returnLogin}>
                    <h3 className="text-[.75em] font-[400] mx-[.4em]">{email}</h3>
                    <IoMdArrowDropdown className={`dropStyle text-[.85em] `}/>
                </div>
             
            </div>
        </div>
    )
}