"use client";
import Image from "next/image";

interface propsContactView {
    sourceImage: string | null | undefined;
    custom_name?: string;
    email: string
}
export default function ContactSearchView({sourceImage, custom_name, email}:propsContactView){
    return (
        <div className="contactsContainerDiv">
            <div className="contactGroupPhoto">
                <Image alt="profile photo" src={sourceImage ? sourceImage: "/imgs/assets/person.png"} fill/>
            </div>
            <div className="aboutContactMsgs">
                <div className="subTitle">
                    <h3 className="nameContactGroup">
                        {custom_name}
                    </h3>
                    <p className={`lastTime text-white font-[500]`}>        
                        {email}
                    </p>
                </div>
            </div>
        </div>
    )
}