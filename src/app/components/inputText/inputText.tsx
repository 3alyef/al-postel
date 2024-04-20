"use client";
import { Dispatch, SetStateAction, useRef } from "react";

interface propsInputText{
    text:string;
    _isSemitic: boolean;
    type: string;
    costumerClass?: string;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    _isRequired: boolean
}

export default function InputText({text, _isSemitic, type, costumerClass, value, setValue, _isRequired}: propsInputText){
    const inputRef = useRef<HTMLInputElement>(null);
    const focusInput = ()=>{
        inputRef.current?.focus();
    }
    

    return (
        <div className="formData_ContainerEmail ">
                    
            <div className={`container_Input_Div `}>
                <input type={type} className={`Inputs ${costumerClass}`} placeholder=" " id="aqui" ref={inputRef} value={value} 
                onChange={
                    (e)=>setValue(e.target.value)
                } required={_isRequired}/>
                <div className={`labels ${!_isSemitic && "left-[7px]"}`} onClick={focusInput} style={{cursor: "text"}}>
                    <span>{text}</span>
                </div>
            </div>
        
        </div>
    )
}
