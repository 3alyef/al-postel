"use client";
import { BsCheck, BsCheckAll } from "react-icons/bs";
import { propsMessagesContent, propsMessagesGroupContent, propsRoom } from "../alpostelMain/alpostelMain";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ConnectM2 } from "@/services/connectToM2.service";
import useLongPress from "@/hooks/useLongPress.hook";
import { RiForbid2Line } from "react-icons/ri";
import { FaClockRotateLeft } from "react-icons/fa6";

interface propsMessageLabel {
    message: propsMessagesContent;
    soulName: string;
    createdTime: string;
    userSoul: string;
    serverIo: ConnectM2;
    setMessagesContent: Dispatch<SetStateAction<Map<string, propsMessagesContent[]>>>;
    roomsListByUserSoul: Map<string, string>;
    participantsData: Map<string, propsRoom>;
    setMsgCreatedInDelete: Dispatch<SetStateAction<string[]>>;
    createdIn: string;
    msgCreatedInDelete: string[];
    deletedTo: "none" | "justTo" | "justAll" | "justFrom" | "all" | "allFrom" | "allTo";
    fromUser: string; 
}
export const msgDeleted = (fromUser: string, userSoul: string, type2?:boolean )=> (
    <span className="flex items-center gap-1" 
    style={type2 ? {color: "rgb(239 239 239 / 75%)"} : (fromUser === userSoul? {color: "#090909d4"} : {color: "rgb(239 239 239 / 75%)"})}>
        Mensagem Apagada <RiForbid2Line/>
    </span>
)

export default function MessageLabel({message, soulName, createdTime, userSoul, serverIo, setMessagesContent, roomsListByUserSoul, participantsData, setMsgCreatedInDelete, msgCreatedInDelete, createdIn, deletedTo, fromUser}: propsMessageLabel){
    const [selectArea, setSelectArea] = useState<boolean>(false)
    //
    
    const longPressEvent = useLongPress({
        onLongPress: ()=>{
            //setDeleteMsgScreen(!deleteMsgScreen);
            if(selectArea) {
                //console.log('ja esta')
                setMsgCreatedInDelete(
                    (prev)=>{
                        const newV = prev.filter(created => created !== createdIn);
                        return newV;
                    }
                )
            } else {
                //console.log('nao esta')
                setMsgCreatedInDelete(prev => [...prev, createdIn])
            }
            
            //funcDeleteMsgScreen();
            setSelectArea(!selectArea);
        },
        onClick: ()=>{            
            if(selectArea && msgCreatedInDelete.length > 0 && !msgCreatedInDelete.includes(createdIn)){
                setMsgCreatedInDelete(prev => [...prev, createdIn])
                setSelectArea(true);
            }
        },
        ms: 500, // 500ms for long press detection
    });

    ///

    function typeOfCheck(viewStatus: "onServer" | "delivered" | "seen" | "none"){
        if(viewStatus === "none") {
            return <span className="text-[1.25em]"><FaClockRotateLeft /></span>
        }else if(viewStatus === 'onServer'){
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
    
        
    }, [message, soulName, serverIo, userSoul]);

   
    function divDeleteML(){
        setMsgCreatedInDelete(
            (prev)=>{
                const newV = prev.filter(created => created !== createdIn);
                return newV;
            }
        )
        setSelectArea(false);
    }
    useEffect(()=>{
        if(!msgCreatedInDelete.includes(createdIn)){
            setSelectArea(false);
        }
    }, [msgCreatedInDelete]);
    
    const msg = () => {
        if((message && message.message.length > 0)){
            return <>{message.message}</>
        }
       
        if(deletedTo === "justAll"){
            return
        } else if(deletedTo === "justFrom" && soulName === userSoul) {
            return
        } else if(deletedTo === "justTo" && (soulName !== userSoul)){
            return
        } else if(deletedTo === "all") {
            return msgDeleted(fromUser, userSoul);
        } else if(deletedTo === "allFrom" && (userSoul !== soulName)){
            return msgDeleted(fromUser, userSoul);
        } else if(deletedTo === "allTo" && userSoul !== soulName) {
            return msgDeleted(fromUser, userSoul);
        }
        
    }
    const data = () => (
        <div className='messageRenderContainer' data-createdin={createdIn} onClick={()=>{
            if(msgCreatedInDelete.length > 0 && !msgCreatedInDelete.includes(createdIn)){
                setMsgCreatedInDelete(prev => [...prev, createdIn])
                setSelectArea(true);
            }
        }}>
            <div className={`messageRender min-w-[25%] 
            ${(message && message.fromUser === userSoul) ? "messageRenderBgSender" : "messageRenderBgReceive self-end"}`}
            {...longPressEvent}
            >
                <p className="msgContainer ltr">
                    {
                        msg()
                    }
                </p>
                
                <p className="msgCreatedIn flex justify-between w-full">{createdTime}
                
                {
                    !(deletedTo === "all") && !(deletedTo === "allTo" && fromUser === soulName)
                    && !(deletedTo === "allTo" || deletedTo === "allFrom") && 
                    
                    message && message.viewStatus && message.fromUser === userSoul && typeOfCheck(message.viewStatus)
                }
                </p>
            </div>
            <div className="divDeleteML" style={!selectArea ? {display: "none"} : undefined}
            onClick={divDeleteML}>

            </div>
        </div>
    )

    /*useEffect(()=>{
        console.log("deletedTo === allTo && fromUser !== soulName", deletedTo === "allTo" && fromUser !== soulName)
        console.log("deletedTo", deletedTo);
        console.log("deletedTo === justTo && toUsers.includes(fromUser)", toUsers && deletedTo === "justTo" && toUsers.includes(fromUser))
    }, [deletedTo])*/

    
    /*
    setMessagesContent,*
    if(isGroup && toUsers){
        if(
        !(deletedTo === "justAll") && 
        !(deletedTo === "justFrom" && fromUser === userSoul) && 
        !(deletedTo === "justTo" && toUsers.includes(fromUser)) && 
        !(deletedTo === "allFrom" && fromUser === userSoul) && 
        !(deletedTo === "allTo" && toUsers.includes(fromUser))
        ){
            return data();
        }
    } else if(!isGroup){
        if(
        deletedTo !== "justAll" && 
        (deletedTo !== "justFrom" && fromUser === userSoul) && 
        !(deletedTo === "justTo" && fromUser !== soulName) && 
        !(deletedTo === "allFrom" && fromUser === userSoul) && 
        !(deletedTo === "allTo" && fromUser === soulName)
        ){
            return data();
        } else {
            return (
                <div className="flex flex-col items-center justify-center bg-slate-400 text-white font-bold gap-2">
                    <p>deletedTo: {deletedTo}</p>
                    <p>fromUser: {fromUser}</p>
                    <p>soulName: {soulName}</p>
                    <p>userSoul: {userSoul}</p>
                </div>
            )
        }
    
        //return data();
    }*/ 
 
    if(deletedTo === "none" || deletedTo === "all" || (deletedTo === "allFrom" && fromUser !== userSoul) || (deletedTo === "allTo" && fromUser !== soulName) ||
    (deletedTo === "justFrom" && fromUser !== userSoul) ||
    (deletedTo === "justTo" && fromUser !== soulName)){
        return data();
    }
    
}