"use client";
import React, {useEffect, useRef, useState} from "react";
import { usePathname, useRouter } from "next/navigation";
import { languages } from "@/lib/get-languages-names";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import LanguageFlagName from "../languageFlagName/languageFlagName";
import { toggleMenuLanguages } from "@/services/toggleMenuLanguages";
interface PropsLanguageSwitch {
    locale: keyof typeof languages;
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
    

    const [openLangToggle, setOpenLangToggle] = useState<boolean>(false);
    const [maxHeightMenu, setMaxHeightMenu] = useState<string>("0em");
    const [widthVar, setWidthVar] = useState<string>("55%");;
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Verificar se o clique foi fora do menu de idiomas
            const target = event.target as Element;
            
            if (openLangToggle && !target.closest('.languagesSubContainer')) {
                const onlyClose = true;
                toggleMenuLanguages({ openLangToggle, setOpenLangToggle, maxHeightMenu, setMaxHeightMenu, setWidthVar, onlyClose});
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [openLangToggle]);
    
    return (
        <div className={`languageSwitchContainer`}>
            <div className="languagesSubContainer" 
            onClick={()=>{
                const onlyClose = false
                toggleMenuLanguages(
                    {
                        openLangToggle, setOpenLangToggle, maxHeightMenu, setMaxHeightMenu, setWidthVar, onlyClose 
                    })
                }}>
                
                <div className="parentLanguagesMenu" style={{width: widthVar}}>
                    <div className="languagesMenu menuApparence" style={{maxHeight: maxHeightMenu}}  >
                        <ul  style={{ maxHeight: maxHeightMenu, opacity: (maxHeightMenu != "0em" ? "1": "0")}}>
                            {
                                Object.entries(languages).map(([key, value]) => key === locale && (
                                    <li key={key}
                                    className="liSelect"
                                    >
                                        <LanguageFlagName languageName={value[0]} flag={value[1]} costumerClass="languageFlagCostumer"/>
                                        
                                    </li>
                                ) 
                                )
                            }
                            {      
                                
                                Object.entries(languages).map(([key, value]) => key != locale && (
                                        <li key={key} onClick={()=>{
                                                const newPath = redirectedPathName(key);
                                                //localStorage.setItem("languagePadron", key)
                                                router.push(newPath)
                                            }   
                                        }>
                                            <LanguageFlagName languageName={value[0]} flag={value[1]} costumerClass="languageFlagCostumer"/>
                                            
                                        </li>
                                    ) 
                                )
                            }

                        </ul>
                    </div>
                </div>
                <div className="languageSwitch">         
                    <LanguageFlagName languageName={languages[locale][0]} flag={languages[locale][1]}/>
                    {openLangToggle ? (
                        <IoMdArrowDropup className="dropStyle"/>
                    ): (
                        <IoMdArrowDropdown className="dropStyle"/>
                    )}
                
                </div>
            </div>
        </div>
    );
};

export default LanguageSwitch;
