"use client"

import { desactiveScreens } from "@/services/desactiveScreens.service";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IoSettingsOutline } from "react-icons/io5";
import { propsMessagesContent, propsRoom } from "../alpostelMain/alpostelMain";
import { IoMdSend } from "react-icons/io";
import {  MdOutlineEmojiEmotions } from "react-icons/md";
import InputText from "../inputText/inputText";
interface propsMsgContainer {
    screenMsg: Map<string, propsRoom>;
    messagesContent: Map<string, propsMessagesContent[]>;
    _isSemitic: boolean
}
export default function MsgsContainer({screenMsg, messagesContent, _isSemitic}: propsMsgContainer){
    const [onProfile, setOnProfile] = useState<boolean>(false);
    const [screenProps, setScreenProps] = useState<propsRoom>()
    const [menu, setMenu] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>("")
    useEffect(()=>{
        const msgArray = Array.from(screenMsg.values());
        setScreenProps(msgArray[0]);
        console.log("msgArray", msgArray)
       
    }, [screenMsg])

    useEffect(()=>{
        console.log('messagesContent', messagesContent)
    }, [messagesContent])

    const [onFocusStyle, setOnFocusStyle] = useState<boolean>(false);
    const onFocus = ()=>{
        setOnFocusStyle(true);
        //console.log('oi')
    }
    return(
        <div className="flex flex-col w-full h-full">
            <div className="contactsContainer messagesContainer flex flex-col w-full h-full">
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
                <div className="mainContacts">
                    
                </div>
                <div className="footerBarContacts footerBarMsgs">
                    <div className="emojiBtn">
                        <MdOutlineEmojiEmotions className="text-white w-[75%] h-[75%]"/>
                    </div>   
                    <div className="messageInput">
                        <InputText value={msg} setValue={setMsg} _isRequired={true} _isSemitic={_isSemitic} messageError="" onFocusFunction={onFocus} onFocusStyle={onFocusStyle} processErrorStyle={false} setOnFocusStyle={setOnFocusStyle} text="Mensagem" type="text" />
                    </div>  
                    <button className="sendMsg flex items-center justify-center">
                        <IoMdSend className="text-white w-[75%] h-[75%]"/>
                    </button>
                        
                </div>
            </div>
        </div>
        
    )
}