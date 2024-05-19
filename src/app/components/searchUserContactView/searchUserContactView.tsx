"use client";
import Image from "next/image";

interface propsContactView {
    first_name: string | null | undefined; 
    sourceImage: string | null | undefined;
    custom_name?: string;
    email: string;
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => Promise<void>;
    soulNameValue: string;
}
export default function ContactSearchView({first_name, sourceImage, custom_name, email, onClick, soulNameValue}:propsContactView){
    return (
        <div className="contactsContainerDiv" onClick={onClick} data-soulname={soulNameValue}>
            <div className="contactGroupPhoto">
                <Image alt="profile photo" src={sourceImage ? sourceImage: "/imgs/assets/person.png"} fill/>
            </div>
            <div className="aboutContactMsgs">
                <div className="subTitle">
                    <h3 className="nameContactGroup">
                        {first_name || custom_name }
                    </h3>
                    <p className={`lastTime text-white font-[500]`}>        
                        {email}
                    </p>
                </div>
            </div>
        </div>
    )
}