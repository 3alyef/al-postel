import { useEffect } from "react";
interface propsToggleLanguages {
    openLangToggle: boolean;
    setOpenLangToggle: React.Dispatch<React.SetStateAction<boolean>>;
    maxHeightMenu: string;
    setMaxHeightMenu: React.Dispatch<React.SetStateAction<string>>;
    setWidthVar: React.Dispatch<React.SetStateAction<string>>;
    barMenuLanguageRef: React.RefObject<HTMLDivElement>;
    setTopMenu: React.Dispatch<React.SetStateAction<string>>;
}


export function toggleMenuLanguages({openLangToggle, setOpenLangToggle, maxHeightMenu, setMaxHeightMenu, setWidthVar, barMenuLanguageRef, setTopMenu}: propsToggleLanguages) {
  
    if(maxHeightMenu === "0em"){

        setOpenLangToggle(!openLangToggle);
        setMaxHeightMenu("15em");
        setWidthVar("100%")
        const heightNowMenu = barMenuLanguageRef.current?.offsetHeight
        console.log(heightNowMenu)
        if(heightNowMenu){
            console.log(heightNowMenu)
            setTopMenu(String((heightNowMenu * 2) - .8)+"em")
        }
        
    } else {
        setOpenLangToggle(!openLangToggle);
        setMaxHeightMenu("0em");
        setWidthVar("55%");
        setTopMenu("0px")
    }
   
}