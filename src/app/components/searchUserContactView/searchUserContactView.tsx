"use client";
import Image from "next/image";

interface propsContactView {
    sourceImage: string | null | undefined;
    first_name: string;
    email: string
}
export default function ContactSearchView({sourceImage, first_name, email}:propsContactView){
    return (
        <div className="contactsContainerDiv">
            <div className="contactGroupPhoto">
                <Image alt="profile photo" src={sourceImage ? sourceImage: "/imgs/assets/person.png"} fill/>
            </div>
            <div className="aboutContactMsgs">
                <div className="subTitle">
                    <h3 className="nameContactGroup">
                        {first_name}
                    </h3>
                    <p className={`lastTime text-white font-[500]`}>        
                        {email}
                    </p>
                </div>
            </div>
        </div>
    )
}