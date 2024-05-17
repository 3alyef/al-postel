"use client";
import { BsCheck, BsCheckAll } from "react-icons/bs";
import { propsMessagesContent } from "../alpostelMain/alpostelMain";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ConnectM2 } from "@/services/connectToM2.service";

interface propsMessageLabel {
    message: propsMessagesContent;
    room: string;
    createdTime: string;
    userSoul: string;
    serverIo: ConnectM2;
    setMessagesContent: Dispatch<SetStateAction<Map <string, propsMessagesContent[]>>>;
}

export default function MessageLabel({message, room, createdTime, userSoul, serverIo, setMessagesContent}: propsMessageLabel){
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
        if(message.viewStatus && !(message.viewStatus === "seen") && message.fromUser !== userSoul){
            serverIo.msgSeenUpdate({fromUser: message.fromUser, toUser: message.toUser, createdIn: message.createdIn, room, viewStatus: 'seen'})
            
            setMessagesContent((previous) => {
                const newMessages: Map <string, propsMessagesContent[]> = new Map<string, propsMessagesContent[]>(previous);
                newMessages.forEach((value, key)=>{
                    if(key === room){
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
    }, [message, room, serverIo, setMessagesContent, userSoul])
    return (
        <div className={`messageRender w-full ${message.fromUser === userSoul ? "messageRenderBgSender" : "messageRenderBgReceive self-end"}`}>
            <p className="msgContainer rtl">{message.message}</p>
            <p className="msgCreatedIn flex justify-between w-full">{createdTime}
            
            {
                message.viewStatus && message.fromUser === userSoul && typeOfCheck(message.viewStatus)
            }
            </p>
        </div>
    )
}