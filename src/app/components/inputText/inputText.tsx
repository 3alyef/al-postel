"use client";
import { useRef } from "react";

export default function InputText({text}: {text:string}){
    const inputRef = useRef<HTMLInputElement>(null);
    const focusInput = ()=>{
        inputRef.current?.focus();
    }
    

    return (
        <div className="formData_ContainerEmail ">
                    
            <div className="container_Input_Div ">
                <input type="text" className="emailInput" placeholder=" " id="aqui" ref={inputRef} />
                <div className="labelEmail labelEmailFocus" onClick={focusInput} style={{cursor: "default"}}>
                    <span>{text}</span>
                </div>
            </div>
        
        </div>
    )
}
