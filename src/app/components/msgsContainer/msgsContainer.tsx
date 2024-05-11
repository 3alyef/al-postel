"use client"

import { desactiveScreens } from "@/services/desactiveScreens.service";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IoSettingsOutline } from "react-icons/io5";
import { propsRoom } from "../alpostelMain/alpostelMain";
interface propsMsgContainer {
    screenMsg: Map<string, propsRoom>;
}
export default function MsgsContainer({screenMsg}: propsMsgContainer){
    const [onProfile, setOnProfile] = useState<boolean>(false);
    const [screenProps, setScreenProps] = useState<propsRoom>()
    const [menu, setMenu] = useState<boolean>(false);
    useEffect(()=>{
        const msgArray = Array.from(screenMsg.values());
        setScreenProps(msgArray[0]);
        console.log("msgArray", msgArray)
       
    }, [screenMsg])
    return(
        <div className="flex flex-col w-full h-full">
            <div className="contactsContainer flex flex-col w-full h-full">
                <div className="headerBarContacts">
                        <div className="profilePhotoMainContacts"
                        onClick={()=>{
                            desactiveScreens(
                                {
                                    root: onProfile, 
                                    competitors: [menu],  
                                    setCompetitors: [setMenu], 
                                    setRoot: setOnProfile,
                                    setOnMessages: setOnProfile
                                }
                            )                                       
                        }}>
                            <Image alt="me" src={screenProps?.imageData.userImage || "/imgs/assets/person.png"} fill/>
                        </div>
                        <div className="settingsContacts"
                        style={{transform: menu ? "rotate(180deg)": "rotate(0deg)"}} onClick={()=>{
                            desactiveScreens(
                                {
                                    root: menu, 
                                    competitors: [onProfile],  
                                    setCompetitors: [setOnProfile], 
                                    setRoot: setMenu,
                                    setOnMessages: setMenu
                                }
                        )  
                        }}>
                        <IoSettingsOutline className="text-[1.5em] text-white"/>
                    </div>
                </div>
            </div>
        </div>
    )
}