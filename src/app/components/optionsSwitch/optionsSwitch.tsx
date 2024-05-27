"use client";
import React, {useEffect, useState} from "react";
import LanguageFlagName from "../languageFlagName/languageFlagName";
import { toggleMenuLanguages } from "@/services/toggleMenuLanguages";
import { SlOptions } from "react-icons/sl";
interface propsOptionsSwitch {
    _isSemitic: boolean;
    onClickSettings: ()=>void
}
const OptionsSwitch = ({_isSemitic, onClickSettings}: propsOptionsSwitch) => {
    const [openLangToggle, setOpenLangToggle] = useState<boolean>(false);
    const [maxHeightMenu, setMaxHeightMenu] = useState<string>("0em");
    const [widthVar, setWidthVar] = useState<string>("55%");
    const [optionsOn, setOptionsOn] = useState<boolean>(false);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            
            if (openLangToggle && !target.closest('.languagesSubContainer')) {
                const onlyClose = true;
                setOptionsOn(!optionsOn);
                toggleMenuLanguages({ openLangToggle, setOpenLangToggle, maxHeightMenu, setMaxHeightMenu, setWidthVar, onlyClose});
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [openLangToggle]);
    
    function optionsToggleOn(){
        const onlyClose = false;
        setOptionsOn(!optionsOn);
        toggleMenuLanguages({
                openLangToggle, setOpenLangToggle, maxHeightMenu, setMaxHeightMenu, setWidthVar, onlyClose 
            })
    }
    return (
        <div className={`languageSwitchContainer optionsSwitchContainer`}>
            <div className="languageSwitch optionsMenu" onClick={()=>optionsToggleOn()} style={{rotate: optionsOn ? "0deg" : "90deg"}}>         
                <SlOptions className="text-white"/>
                    
            </div>
            <div className="languagesSubContainer" style={{width: "12em"}}>
                
                <div className="parentLanguagesMenu" style={{width: widthVar}}>
                    <div className="languagesMenu menuApparence" style={{maxHeight: maxHeightMenu, bottom: 'auto', top: '3vh', 
                    ...(!_isSemitic ? { left: "77%" } : { right: "77%" })}}>
                        <ul  style={{ maxHeight: maxHeightMenu, opacity: (maxHeightMenu != "0em" ? "1": "0")}}>
                            
                            <li className="liSelect" onClick={()=>{
                                onClickSettings();
                                optionsToggleOn();
                            }}>
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