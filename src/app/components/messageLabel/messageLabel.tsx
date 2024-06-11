"use client";
import { BsCheck, BsCheckAll } from "react-icons/bs";
import { propsMessagesContent, propsMessagesGroupContent, propsRoom } from "../alpostelMain/alpostelMain";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ConnectM2 } from "@/services/connectToM2.service";
import useLongPress from "@/hooks/useLongPress.hook";

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
    groupName?:string;
    participantsData: Map<string, propsRoom>;
    deleteMsgScreen: boolean;
    setDeleteMsgScreen: Dispatch<SetStateAction<boolean>>;
    setMsgCreatedIn: Dispatch<SetStateAction<string>>;
}

export default function MessageLabel({message, messageGroup, soulName, createdTime, userSoul, serverIo, setMessagesContent, setMessagesGroupsContent, roomsListByUserSoul, participantsBgColor, groupName, participantsData, deleteMsgScreen, setDeleteMsgScreen, setMsgCreatedIn}: propsMessageLabel){
    //
    
    const longPressEvent = useLongPress({
        onLongPress: ()=>{
            setDeleteMsgScreen(!deleteMsgScreen);
            if(messageGroup){
                setMsgCreatedIn(messageGroup.createdIn)
            } else {
                if(message){
                    setMsgCreatedIn(message.createdIn)
                }
            }
        },
        onClick: ()=>{console.log('click')},
        ms: 500, // 500ms for long press detection
    });

    ///
    const [bgColor, setBgColor] = useState<string>('');
    const [dataUser, setDataUser] = useState<propsRoom>();
    useEffect(()=>{
        console.log()
        if(messageGroup && messageGroup.fromUser){
            setDataUser(()=>{
                let data = participantsData.get(messageGroup.fromUser);
                return data
            })
        }
    },[participantsData])
    useEffect(()=>{
        if(messageGroup && messageGroup.message && groupName){
            let group = participantsBgColor.get(groupName);
            if(group){
                let bgC = group.get(messageGroup.fromUser);
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
        <div className='messageRenderContainer'>
            <div className={`messageRender min-w-[25%] 
            ${(message && message.fromUser === userSoul || messageGroup && messageGroup.fromUser === userSoul) ? "messageRenderBgSender" : "messageRenderBgReceive self-end"}`}
            {...longPressEvent}
            >
                {
                    messageGroup && messageGroup.fromUser !== userSoul  && messageGroup.message && (
                        <>
                            <div className="text-white font-normal w-[100%] flex justify-between gap-[.75em] px-[.3em]">
                                <p className="ltr font-semibold"
                                style={(bgColor && messageGroup && messageGroup.message) ? {
                                    color: bgColor,
                                    textShadow: "0px 0px 20px black"
                                } : undefined}
                                >
                                    ~ {dataUser && dataUser.first_name}
                                </p>
                                <p>
                                    {dataUser && dataUser.email}
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
        </div>
       
    )
}