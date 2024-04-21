"use client"
import { Locale } from "@/i18n";
import Image from "next/image";
export default function LogoAlPostel({locale, postelLabel} : {locale: Locale, postelLabel: string}){
    return(
        <div className=" inline-flex items-center text-white min-h-[5em] px-[1em] gap-2">
            <div className="relative w-[2.85em] aspect-[1/1] ">
                <Image alt="logo" src={`/imgs/logo.png?v=4`} className="bg-cover" fill/>
            </div>
            <h1>{postelLabel}</h1>
        </div>
    )
}