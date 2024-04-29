import { Dispatch, SetStateAction } from "react";

interface propsDesactiveScreens {
    root: boolean;
    setRoot: Dispatch<SetStateAction<boolean>>;
    competitors: boolean[];
    setCompetitors: Dispatch<SetStateAction<boolean>>[];
    setOnMessages: Dispatch<SetStateAction<boolean>>
}

export function desactiveScreens({root, setRoot, competitors, setCompetitors, setOnMessages}: propsDesactiveScreens){
    if(!root){
        const trueElement = competitors.map((el)=>{if(el)return el})
        if(trueElement){
            setCompetitors.forEach((el)=> el(false))
            setTimeout(()=>setRoot(!root), 700)
        } else {
            setRoot(!root)
        }
    } else {
        setRoot(false);
        setTimeout(()=>setOnMessages(true), 700)
        
    }
    
    
    console.log(root)
    
    
}