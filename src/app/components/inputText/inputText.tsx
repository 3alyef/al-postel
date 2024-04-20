"use client";
import { useRef } from "react";

export default function InputText({text, _isSemitic}: {text:string, _isSemitic: boolean}){
    const inputRef = useRef<HTMLInputElement>(null);
    const focusInput = ()=>{
        inputRef.current?.focus();
    }
    

    return (
        <div className="formData_ContainerEmail ">
                    
            <div className={`container_Input_Div `}>
                <input type="text" className="emailInput" placeholder=" " id="aqui" ref={inputRef} />
                <div className={`labelEmail ${!_isSemitic && "left-[7px]"}`} onClick={focusInput} style={{cursor: "text"}}>
                    <span>{text}</span>
                </div>
            </div>
        
        </div>
    )
}
