"use client";
import Image from "next/image";

interface propsDivLabel {
    sourceImage: string;
    _isGroup?: boolean;
    _howLeast?: string;
    unreadMessages: number;
}
export function ContactsContainerDivLabel({sourceImage, _isGroup, _howLeast, unreadMessages}: propsDivLabel){

    return(
        <div className="contactsContainerDiv">
            <div className="contactGroupPhoto">
                <Image alt="profile photo" src={sourceImage} fill/>
            </div>
            <div className="aboutContactMsgs">
                <div className="subTitle">
                    <h3 className="nameContactGroup">
                        Alef
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