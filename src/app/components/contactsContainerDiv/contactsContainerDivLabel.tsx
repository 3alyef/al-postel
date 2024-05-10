"use client";
import Image from "next/image";

interface propsDivLabel {
    sourceImage: string | undefined;
    _isGroup?: boolean;
    _howLeast?: string;
    unreadMessages: number;
    _custom_name_contact?: string | undefined
    email: string | undefined;
    onClick?: ()=>void
}
export function ContactsContainerDivLabel({sourceImage, _isGroup, _howLeast, unreadMessages, _custom_name_contact, email, onClick}: propsDivLabel){

    return(
        <div className="contactsContainerDiv" onClick={onClick}>
            <div className="contactGroupPhoto">
                <Image alt="profile photo" src={sourceImage ? sourceImage : ''} fill/>
            </div>
            <div className="aboutContactMsgs">
                <div className="subTitle">
                    <h3 className="nameContactGroup">
                        {_custom_name_contact ? _custom_name_contact : email+'' }
                    </h3>
                    
                    <p className={`lastTime ${unreadMessages > 0 ? "padronDataColor": "text-white font-[400]"}`}>
                        
                        16.4.2024
                    </p>
                </div>

                <div className="footerTitle">
                    <p className="lastMsg">
                        {
                           _isGroup && (
                                <span>
                                    {_howLeast}
                                </span>
                            )
                        }
                        comprovante202
                    </p>
                    {unreadMessages>0 && (
                        <p className="unreadMessages">
                            {unreadMessages}
                        </p>
                    )}

                </div>
            </div>
        </div>
    )
}