"use client";
import Image from "next/image";
import { MouseEventHandler, useEffect, useState } from "react";

interface propsDivLabel {
    sourceImage: string | undefined;
    _isGroup?: boolean;
    _howLeast?: string;
    unreadMessages: number;
    _custom_name_contact?: string | undefined
    email: string | undefined;
    onClick: (el: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    roomName: string;
    soulName: string;
    lastMsgData?: string;
    whoLastSender?:string;
    lastMSGContent?:string;
    type2?: boolean;
    isSelected?: boolean;

}
export function ContactsContainerDivLabel({sourceImage, _isGroup, _howLeast, unreadMessages, _custom_name_contact, email, onClick, roomName, soulName, lastMsgData, whoLastSender, lastMSGContent, type2, isSelected}: propsDivLabel){
    const [imageUser, setImageUser] = useState<string>('/imgs/assets/person.png')

    useEffect(()=>{
        if(sourceImage){
            setImageUser(sourceImage)
        }
        
    }, [sourceImage])
    return(
        <div className="contactsContainerDiv" onClick={(e)=>{ onClick(e); }} data-soulname={soulName}>
            <div className={`contactGroupPhoto ${type2 && "type2contactGroupPhoto"} rounded-[100%] ${
                type2 && isSelected && "onSelect"
            }`}>
                <Image alt="profile photo" src={imageUser} fill/>
            </div>
            <div className="aboutContactMsgs">
                <div className="subTitle">
                    <h3 className="nameContactGroup">
                        {_custom_name_contact ? _custom_name_contact : email+'' }
                    </h3>
                    {
                        !type2 && (
                            <p className={`lastTime ${unreadMessages > 0 ? "padronDataColor": "text-white font-[400]"}`}>
                                {lastMsgData || ''}
                            </p>
                        )
                    }
                    
                </div>
                {!type2 && (
                    <div className="footerTitle">
                    
                        <p className="lastMsg">
                            {
                            _isGroup && (
                                    <span>
                                        {_howLeast}
                                    </span>
                                )
                            }
                            {whoLastSender || ''}
                            {whoLastSender && ": "}
                            {lastMSGContent || ''}
                        </p>
                        {unreadMessages > 0 && (
                            <p className="unreadMessages">
                                <span>{unreadMessages}</span>
                            </p>
                        )}

                    </div>        
                )}
                
            </div>
        </div>
    )
}