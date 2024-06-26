import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";

interface propsInputText {
    text: string;
    _isSemitic: boolean;
    costumerClass?: string;
    costumerClassDivContainer?: string;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    _isRequired: boolean;
    processErrorStyle: boolean;
    messageError: string;
    onFocusFunction: () => void;
    onFocusStyle: boolean;
    setOnFocusStyle: Dispatch<SetStateAction<boolean>>;
    onBlur?:()=>void
}

export default function TextareaMsg({ text, _isSemitic, costumerClass, value, setValue, _isRequired, processErrorStyle, messageError, onFocusFunction, onFocusStyle, setOnFocusStyle, onBlur, costumerClassDivContainer }: propsInputText) {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    
    const [borderStyle, setBorderStyle] = useState<string>('1.8px solid rgb(0, 0, 0)');
    const [confirmOneTurnAllert, setConfirmOneTurnAllert] = useState<boolean>(false)
    const focusInput = () => {
        inputRef.current?.focus();

    }
    useEffect(()=>{
        
        if(onFocusStyle){
            if(processErrorStyle){
                setBorderStyle("1.8px solid #ff2424");
                focusInput();
            } else {
                setBorderStyle("1.8px solid #71BA00");
            }
        } else {
            if(!processErrorStyle){
                setBorderStyle("1.8px solid rgb(0, 0, 0)")
            } else {
                if(!confirmOneTurnAllert){
                    focusInput();
                    setConfirmOneTurnAllert(true);
                }
            }
        }
    },[onFocusStyle, processErrorStyle])

    
    
    return (
        <div className="w-[100%] h-[100%]">
            <div className="formData_ContainerEmail">
                <div className={`container_Input_Div h-[45px] py-[.1em] ${costumerClassDivContainer}`} style={{border: borderStyle}}>
                    <textarea
                        className={`Inputs ${costumerClass} textareaInput`}
                        placeholder=" " 
                        ref={inputRef}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        required={_isRequired}
                        onFocus={onFocusFunction}
                        onBlur={() => {
                            onBlur? onBlur(): setOnFocusStyle(false)}}
                    />
                    <div
                        className={`${processErrorStyle ? "labelsTextAreaAllert" : "labelsTextArea"} ${!_isSemitic && "left-[7px]"}`}
                        onClick={focusInput}
                        style={{ cursor: "text" }}
                    >
                        <span>{text}</span>
                    </div>
                </div>
            </div>
            {processErrorStyle &&
                (
                    <p className="text-[#b22121] text-[10px] font-[500] flex gap-1 items-center">
                        <IoAlertCircleOutline className="text-[12.5px]"/>
                        {messageError || "need message"}
                    </p>
                )
            }
        </div>
    );
}
