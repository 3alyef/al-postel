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
            return <BsCheck />
        }
        if(viewStatus === 'delivered') {
            return <BsCheckAll />
        }
        if(viewStatus === 'seen'){
            return <BsCheckAll style={{color: 'blue'}}/>
        }
    }

    useEffect(()=>{
        if(message.viewStatus && !(message.viewStatus === "seen") && message.fromUser !== userSoul){
            serverIo.msgSeenUpdate({fromUser: message.fromUser, createdIn: message.createdIn, room, viewStatus: 'seen'})
            
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
    }, [])
    return (
        <div className={`messageRender ${message.fromUser === userSoul ? "messageRenderBgSender" : "messageRenderBgReceive self-end"}`}>
            <p className="msgContainer">{message.message}</p>
            <p className="msgCreatedIn">{createdTime}</p>
            
            {
                message.viewStatus && message.fromUser === userSoul && typeOfCheck(message.viewStatus)
            }
        </div>
    )
}