"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { languages } from "@/lib/get-languages-names";
interface PropsLanguageSwitch {
    locale: string;
}
const LanguageSwitch: React.FC<PropsLanguageSwitch> = ({locale}) => {
    const pathName = usePathname();
    const router = useRouter();
    const redirectedPathName = (locale: string) => {
        if (!pathName) return "/";
        const segments = pathName.split("/");
        segments[1] = locale;
        return segments.join("/");
    };

  
    return (
        <div className={`languageSwitch`}>
            
            <select className="select_Language" name="languages" id="languages" value={locale} onChange={(e) =>{
                    const newPath = redirectedPathName(e.target.value);
                    router.push(newPath);
                }
                }
                >
                {
                    Object.entries(languages).map(([key, value]) => (
                        <option key={key} value={key}>{`${value[0]} ${value[1]}`}</option>
                    ))
                    // Object.entries() retorna uma matriz de pares chave-valor, onde cada par é uma matriz de duas posições, onde a primeira posição é a chave e a segunda é o valor tipo isso => {key, value => ['', '']}
                }
            </select>
        </div>
    );
};

export default LanguageSwitch;