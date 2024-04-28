"use client";
import Image from "next/image";
import { useState } from "react";

import { IoSettingsOutline } from "react-icons/io5";
import { MdGroups, MdOutlineMessage } from "react-icons/md";

interface propsContactsContainer {
    _isSemitic: boolean;
}

export default function ContactsContainer({_isSemitic}:propsContactsContainer){
    const [meImg, setImg] = useState<string>("/imgs/assets/person.png")
    return (
        <div className="contactsContainer flex flex-col w-full h-full">
            <div className="headerBarContacts"
            style={{borderRadius: _isSemitic ? "0px 5px 0px 0px " : "5px 0px 0px 0px"}}>
                <div className="profilePhotoMainContacts">
                    <Image alt="me" src={meImg} fill/>
                </div>
                <div className="settingsContacts">
                    <IoSettingsOutline className="text-[1.5em] text-white"/>
                </div>
            </div>
            <div className="mainContacts">
                <div className="contactsGroupsList">

                    {/*
                        <div>
                            <div className="contactGroupPhoto">
                            </div>
                            <div className="aboutContactMsgs">
                                <h3 className="nameContactGroup"></h3>
                                <p className="lastMsg"></p>
                                <p className="lastTime"></p>
                            </div>
                        </div>
                    */}

                </div>
            </div>
            <div className="footerBarContacts"
            style={{borderRadius: _isSemitic ? "0px 5px 0px 0px" : "0px 0px 5px 0px"}}>
                <div className="msgsBtn">
                    <MdOutlineMessage className="text-white scale-[1.8]"/>
                </div>
                <div className="groupsBtn">
                    <MdGroups className="text-white scale-[2]"/>
                </div>
                <div className="searchBtn w-[2.2em] aspect-[1/1] relative">
                    <Image src="/imgs/logo.png" alt="search icon" fill className="scale-[.95]"/>
                </div>
            </div>
        </div>
    )
}