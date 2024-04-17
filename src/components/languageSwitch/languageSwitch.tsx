"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { i18n } from "@/i18n";
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
        <select name="languages" id="languages" value={locale} onChange={(e) =>{
                const newPath = redirectedPathName(e.target.value);
                console.log(newPath)
                router.push(newPath);
            }
            }
            >
            {i18n.locales.map((locale) => (
                <option key={locale} value={locale}>{locale}</option>
            ))}
        </select>
    );
};

export default LanguageSwitch;
