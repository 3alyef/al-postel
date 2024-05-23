"use client";
import React, {useEffect, useState} from "react";
import LanguageFlagName from "../languageFlagName/languageFlagName";
import { toggleMenuLanguages } from "@/services/toggleMenuLanguages";
import { SlOptionsVertical } from "react-icons/sl";
interface propsOptionsSwitch {
    _isSemitic: boolean;
}
const OptionsSwitch = ({_isSemitic}: propsOptionsSwitch) => {
    const [openLangToggle, setOpenLangToggle] = useState<boolean>(false);
    const [maxHeightMenu, setMaxHeightMenu] = useState<string>("0em");
    const [widthVar, setWidthVar] = useState<string>("55%");;
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
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
        <div className={`languageSwitchContainer optionsSwitchContainer`}>
            <div className="languageSwitch optionsMenu" onClick={()=>{
            const onlyClose = false
            toggleMenuLanguages(
                {
                    openLangToggle, setOpenLangToggle, maxHeightMenu, setMaxHeightMenu, setWidthVar, onlyClose 
                })
            }}>         
                <SlOptionsVertical className="text-white"/>
                    
            </div>
            <div className="languagesSubContainer">
                
                <div className="parentLanguagesMenu" style={{width: widthVar}}>
                    <div className="languagesMenu menuApparence" style={{maxHeight: maxHeightMenu, bottom: 'auto', top: 0, 
                    ...(_isSemitic ? { left: "7em" } : { right: "7em" })}}>
                        <ul  style={{ maxHeight: maxHeightMenu, opacity: (maxHeightMenu != "0em" ? "1": "0")}}>
                            
                            <li className="liSelect" onClick={()=> console.log('shalom')}>
                                <LanguageFlagName 
                                languageName={'Settings'}costumerClass="languageFlagCostumer"/>
                            </li>
                                
                        </ul>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default OptionsSwitch;
/**...{_isSemitic ? (left: "7em") : (right: "7em")} */