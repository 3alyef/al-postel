"use client";
import { BsCheck, BsCheckAll } from "react-icons/bs";
import { propsMessagesContent, propsMessagesGroupContent } from "../alpostelMain/alpostelMain";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ConnectM2 } from "@/services/connectToM2.service";

interface propsMessageLabel {
    message?: propsMessagesContent;
    messageGroup?: propsMessagesGroupContent;
    soulName: string;
    createdTime: string;
    userSoul: string;
    serverIo: ConnectM2;
    setMessagesContent: Dispatch<SetStateAction<Map<string, propsMessagesContent[]>>>;
    setMessagesGroupsContent: Dispatch<SetStateAction<Map<string, propsMessagesGroupContent[]>>>
    roomsListByUserSoul: Map<string, string>;
    participantsBgColor: Map<string, Map<string, string>>;
    groupName?:string
}

export default function MessageLabel({message, messageGroup, soulName, createdTime, userSoul, serverIo, setMessagesContent, setMessagesGroupsContent, roomsListByUserSoul, participantsBgColor, groupName}: propsMessageLabel){
    const [bgColor, setBgColor] = useState<string>('');
    useEffect(()=>{
        if(messageGroup && messageGroup.message && groupName){
            let group = participantsBgColor.get(groupName);
            if(group){
                let bgC = group.get(soulName);
                if(bgC){
                    setBgColor(bgC)
                }
               
            }
        }
    }, [participantsBgColor])

    function typeOfCheck(viewStatus: "onServer" | "delivered" | "seen"){
        if(viewStatus === 'onServer'){
            return<span className="text-[1.25em]"> <BsCheck /></span>
        }
        if(viewStatus === 'delivered') {
            return <span className="text-[1.25em]"><BsCheckAll/></span>
        }
        if(viewStatus === 'seen'){
            return <span className="text-[1.25em] text-[#0c5dba]"><BsCheckAll/></span>
        }
    }

    useEffect(()=>{
        
        if(message && message.viewStatus && !(message.viewStatus === "seen") && message.fromUser !== userSoul){

            const room = roomsListByUserSoul.get(soulName)
            if(room){
                serverIo.msgSeenUpdate({fromUser: message.fromUser, toUser: message.toUser, createdIn: message.createdIn, room, viewStatus: 'seen'})
            
                setMessagesContent((previous) => {
                    const newMessages: Map <string, propsMessagesContent[]> = new Map<string, propsMessagesContent[]>(previous);
                    newMessages.forEach((value, key)=>{
                        if(key === message.fromUser){
                            const updatedMessages: propsMessagesContent[] = value.map((msg) => {
                                if (msg.createdIn === message.createdIn) {
                                    return { ...msg, viewStatus: 'seen' };
                                }
                                return msg;
                            });
            
                            newMessages.set(key, updatedMessages);
                        }
                    })
                    return newMessages
                });
            }
            
        }
        /*if(messageGroup && messageGroup.viewStatus && messageGroup.viewStatus !== "onServer"){
            /*const haveSeen = messageGroup.viewStatus.
            if(){}
            
        }*/
    
        if(messageGroup){
            console.log('messageGroup', messageGroup)
        }
        
    }, [message, messageGroup, soulName, serverIo, setMessagesContent, setMessagesGroupsContent, userSoul])
    return (
        <div className={`messageRender min-w-[25%] ${(message && message.fromUser === userSoul || messageGroup && messageGroup.fromUser === userSoul) ? "messageRenderBgSender" : "messageRenderBgReceive self-end"}`}
        style={(bgColor && messageGroup && messageGroup.message) ? {
            backgroundColor: bgColor
        } : undefined}>
            {
                messageGroup && messageGroup.message && (
                    <>
                        <div className="text-white font-normal w-[100%] flex justify-between">
                            <p>
                                - {}
                            </p>
                            <p>

                            </p>
                        </div>
                    </>
                )
            }
            
            <p className="msgContainer ltr">{message && message.message || messageGroup && messageGroup.message}</p>
            <p className="msgCreatedIn flex justify-between w-full">{createdTime}
            
            {
                message && message.viewStatus && message.fromUser === userSoul && typeOfCheck(message.viewStatus)
            }
            </p>
        </div>
    )
}