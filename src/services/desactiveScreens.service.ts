import { Dispatch, SetStateAction } from "react";

interface propsDesactiveScreens {
    root: boolean;
    setRoot: Dispatch<SetStateAction<boolean>>;
    competitors: boolean[];
    setCompetitors: Dispatch<SetStateAction<boolean>>[];
    setOnMessages: Dispatch<SetStateAction<boolean>>;
    _isMsg?:boolean
}

export function desactiveScreens({root, setRoot, competitors, setCompetitors, setOnMessages, _isMsg}: propsDesactiveScreens){
    if(!root){
        const trueElement = competitors.map((el)=>{if(el)return el})
        if(trueElement){
            setCompetitors.forEach((el)=> el(false))
            setTimeout(()=>setRoot(!root), 500)
        } else {
            setRoot(!root)      
        }
    } else {
        if(_isMsg){
            setRoot(true);
            //console.log('oi')
        } else {
            setRoot(false);
            setTimeout(()=>setOnMessages(true), 500) 
        }
    }  
}