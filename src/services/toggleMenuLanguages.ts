interface propsToggleLanguages {
    openLangToggle: boolean;
    setOpenLangToggle: React.Dispatch<React.SetStateAction<boolean>>;
    maxHeightMenu: string;
    setMaxHeightMenu: React.Dispatch<React.SetStateAction<string>>;
    setWidthVar: React.Dispatch<React.SetStateAction<string>>;
    onlyClose: boolean;

}


export function toggleMenuLanguages({openLangToggle, setOpenLangToggle, maxHeightMenu, setMaxHeightMenu, setWidthVar, onlyClose}: propsToggleLanguages) {
  
    if(maxHeightMenu === "0em" && !onlyClose){

        setOpenLangToggle(!openLangToggle);
        setMaxHeightMenu("15em");
        setWidthVar("100%")
           
    } else {
        if(maxHeightMenu != "0em")
            setOpenLangToggle(!openLangToggle);

        setMaxHeightMenu("0em");      
        setWidthVar("55%");
    }
   
}