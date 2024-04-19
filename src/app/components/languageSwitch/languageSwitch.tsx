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

    const [openLangToggle, setOpenLangToggle] = useState<boolean>(true);
    const [maxHeightMenu, setMaxHeightMenu] = useState<string>("0em");
    const [topMenu, setTopMenu] = useState<string>("0px");
    const [widthVar, setWidthVar] = useState<string>("55%");
    const barMenuLanguageRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = () => {
            toggleMenuLanguages({openLangToggle, setOpenLangToggle, maxHeightMenu, setMaxHeightMenu, setWidthVar,barMenuLanguageRef, setTopMenu});
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [openLangToggle]);
    
    return (
        <div className={`languageSwitchContainer`}>
            <div className="languagesSubContainer" onClick={()=>toggleMenuLanguages({openLangToggle, setOpenLangToggle, maxHeightMenu, setMaxHeightMenu, setWidthVar,barMenuLanguageRef, setTopMenu})}>
                
                <div className="parentLanguagesMenu" style={{width: widthVar}}>
                    <div className="languagesMenu menuApparence" style={{top: ("-"+topMenu), maxHeight: maxHeightMenu,}}  ref={barMenuLanguageRef}>
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
                        <IoMdArrowDropdown className="dropStyle"/>
                    ): (
                        <IoMdArrowDropup className="dropStyle"/>
                    )}
                
                </div>
            </div>
        </div>
    );
};

export default LanguageSwitch;

/*  
    <svg  viewBox="7 10 10 5" focusable="false"><polygon  stroke="none" fill-rule="evenodd" points="7 10 12 15 17 10"></polygon><polygon stroke="none" fill-rule="evenodd" points="7 15 12 10 17 15"></polygon></svg>

            <select className="select_Language" name="languages" id="languages" value={locale} onChange={(e) =>{
                    const newPath = redirectedPathName(e.target.value);
                    router.push(newPath);
                }
                }
                >
                {
                    Object.entries(languages).map(([key, value]) => (
                        <option key={key} value={key} >
                            {`${value[0]} ${value[1]}`}
                        </option>
                    ))
                    // Object.entries() retorna uma matriz de pares chave-valor, onde cada par é uma matriz de duas posições, onde a primeira posição é a chave e a segunda é o valor tipo isso => {key, value => ['', '']}
                }
            </select>
            */