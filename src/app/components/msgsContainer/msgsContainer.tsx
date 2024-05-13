"use client"

import { desactiveScreens } from "@/services/desactiveScreens.service";
import { useEffect, useState, SetStateAction, Dispatch } from 'react';
import Image from "next/image";
import { IoSettingsOutline } from "react-icons/io5";
import { propsMessagesContent, propsRoom } from "../alpostelMain/alpostelMain";
import { IoMdSend } from "react-icons/io";
import {  MdOutlineEmojiEmotions } from "react-icons/md";
import InputText from "../inputText/inputText";
import { ConnectM2 } from "@/services/connectToM2.service";
import { sendMsg } from "@/services/connectToM2.service";
import { GoTriangleDown } from "react-icons/go";
interface propsMsgContainer {
    screenMsg: Map<string, propsRoom>;
    messagesContent: Map<string, propsMessagesContent[]>;
    setMessagesContent: Dispatch<SetStateAction<Map <string, propsMessagesContent[]>>>;
    _isSemitic: boolean;
    serverIo: ConnectM2;
    userSoul: string;
    roomNameNow: string
}
export default function MsgsContainer({screenMsg, messagesContent, _isSemitic, serverIo, userSoul, roomNameNow, setMessagesContent}: propsMsgContainer){
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

    function sendMsg(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        if(msg.length > 0 && screenProps?.userSoul) {
            const dateInf = new Date(); 
            const createdIn = dateInf.toISOString();
            const msgS: sendMsg = {fromUser: userSoul, message: msg, toUser: screenProps.userSoul, toRoom: roomNameNow, createdIn};
            console.log("msgS",msgS)
            serverIo.sendMsg(false, msgS);
            setMessagesContent((previous)=>{
                const newMessages: Map <string, propsMessagesContent[]> = new Map<string, propsMessagesContent[]>(previous || []);
                
             
                const newMessage: propsMessagesContent = {
                    fromUser:msgS.fromUser,
                    toUser:msgS.toUser,
                    message:msgS.message,
                    createdIn:msgS.createdIn
                };
                if (newMessages.has(roomNameNow)) {
                    const rooms = newMessages.get(roomNameNow)
                    rooms?.push(newMessage);
                    
                } else {
                    newMessages.set(roomNameNow, [newMessage]);
                }
    
                console.log("previousMsgs", newMessages, msgS);
                return newMessages;
            
                
            })
            setMsg('')
        }
    }
    return(
        <>
            {screenProps?.userSoul && (
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
                        <div className="mainContacts mainMsgs">
                            <div className="main">
                                {/*<div className="messageRender">
                                    <div className="rtL" style={_isSemitic ? {right: '-12px'}: {left: '-12px'}}>
                                        <GoTriangleDown />
                                    </div>
                                    <p className="msgContainer">
                                        jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjiiiiiiiiiiiiiiiiiiiiiiiihhhhhhhhhhhhhhhhhhhhhhhhgggggggggggggggggggggggggggggggg
                                    </p>
                                    <p className="msgCreatedIn">1:58 אחה צ</p>
                                </div>
                                */}
                                {
                                    
                                    Array.from(messagesContent).map(([key, messages]) => {
                                        if (key === roomNameNow) {
                                            // Ordenar as mensagens por data de criação (do mais antigo para o mais novo)
                                            messages.sort((a, b) => new Date(a.createdIn).getTime() - new Date(b.createdIn).getTime());
                                    
                                            return messages.map((el, index) => {
                                                const createdDate = new Date(el.createdIn);
            
                                                const createdTime = createdDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                                                return (
                                                    <div key={el._id} className={`messageRender ${el.fromUser === userSoul ? "messageRenderBgSender" : "messageRenderBgReceive self-end"}`}>
                                                        <div className={`rtL ${
                                                            el.fromUser === userSoul ? "rtLColorSender" : "rtLColorReceive"
                                                        }`} style={el.fromUser === userSoul ? (_isSemitic ? {right: '-12px'} : {left: '-12px'}) : (_isSemitic ? {left: '-12px'} : {right: '-12px'})}>
                                                            <GoTriangleDown />
                                                        </div>
                                                        <p className="msgContainer">{el.message}</p>
                                                        <p className="msgCreatedIn">{createdTime}</p>
                                                    </div>
                                                );
                                            });
                                        }
                                        return null;
                                    })

                                }
                                
                                
                            </div>
                        </div>
                        <div className="footerBarContacts footerBarMsgs">
                            <form onSubmit={sendMsg} className="flex w-full items-center justify-around">
                                <div className="emojiBtn">
                                    <MdOutlineEmojiEmotions className="text-white w-[75%] h-[75%]"/>
                                </div>   
                                <div className="messageInput">
                                    <InputText value={msg} setValue={setMsg} _isRequired={true} _isSemitic={_isSemitic} messageError="" onFocusFunction={onFocus} onFocusStyle={onFocusStyle} processErrorStyle={false} setOnFocusStyle={setOnFocusStyle} text="Mensagem" type="text" costumerClass="text-white"/>
                                </div>  
                                <button className="sendMsg flex items-center justify-center" type="submit">
                                    <IoMdSend className="text-white w-[75%] h-[75%]"/>
                                </button>
                            </form>
                                
                        </div>
                    </div>
                </div>
            
            )}
        </>   
    )
}