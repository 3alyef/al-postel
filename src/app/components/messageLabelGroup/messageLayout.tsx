"use client";
import useLongPress from "@/hooks/useLongPress.hook";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { propsRoom } from "../alpostelMain/alpostelMain";
import { DeletedToType } from "@/services/connectToM2.service";
import { msgDeleted } from "../messageLabel/messageLabel";
import { BsCheck, BsCheckAll } from "react-icons/bs";
import { FaClockRotateLeft } from "react-icons/fa6";
import { mapToString } from "../groupMsgs/groupMsgs";
import { ViewStatusMap } from "@/services/ViewStatus_group.service";

interface PropsMessageLayout {
    createdIn: string;
    msgCreatedInDelete: string[];
    setMsgCreatedInDelete: Dispatch<SetStateAction<string[]>>;
    fromUser: string;
    userSoul: string;
    message: string;
    deletedTo: DeletedToType;
    createdTime: string;
    participantsData: Map<string, propsRoom>;
    participantsBgColor: Map<string, Map<string, string>>;
    groupAdress: string;
    viewStatus: string;
}

export default function MessageLayout({createdIn, msgCreatedInDelete, setMsgCreatedInDelete, fromUser, userSoul, message, deletedTo, createdTime, participantsData, participantsBgColor, groupAdress, viewStatus}: PropsMessageLayout){
    const [selectArea, setSelectArea] = useState<boolean>(false);
    const [bgColor, setBgColor] = useState<string>('');
    const [dataUser, setDataUser] = useState<propsRoom>();
    const longPressEvent = useLongPress({
        onLongPress: ()=>{
            if(selectArea) {
                setMsgCreatedInDelete(
                    (prev)=>{
                        const newV = prev.filter(created => created !== createdIn);
                        return newV;
                    }
                )
            } else {
                setMsgCreatedInDelete(prev => [...prev, createdIn])
            }
            
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
    function divDeleteML(){
        setMsgCreatedInDelete(
            (prev)=>{
                const newV = prev.filter(created => created !== createdIn);
                return newV;
            }
        )
        setSelectArea(false);
    }
    function msg(deletedTo: DeletedToType) {
        if (message.length > 0){
            return <>{message}</>
        } else if(deletedTo === "all") {
            return msgDeleted(fromUser, userSoul);
        } else if(deletedTo === "allFrom") {
            return msgDeleted(fromUser, userSoul);
        } else if(deletedTo === "allTo") {
            return msgDeleted(fromUser, userSoul);
        } else {
            return
        }
        
    }
    function typeOfCheck(viewStatus: Map<string, "delivered" | "seen"> | "onServer" | "none"){
        if(viewStatus === "none") {
            return <span className="text-[1.25em]"><FaClockRotateLeft /></span>
        } else if(viewStatus === 'onServer'){
            return<span className="text-[1.25em]"> <BsCheck /></span>
        } else {
            let isDeliveredOSeen: "delivered" | "seen" = "delivered";
            viewStatus.forEach((deliveredOSeen)=>{
                if(deliveredOSeen === "delivered"){
                    isDeliveredOSeen = "delivered";
                } else {
                    isDeliveredOSeen = "seen";
                }
            })
            if(isDeliveredOSeen === 'delivered') {
                return <span className="text-[1.25em]"><BsCheckAll/></span>
            }
            if(isDeliveredOSeen === 'seen'){
                return <span className="text-[1.25em] text-[#0c5dba]"><BsCheckAll/></span>
            }
        }
    }
    useEffect(()=>{
        console.log()
        if(fromUser){
            setDataUser(()=>{
                let data = participantsData.get(fromUser);
                return data
            })
        }
    },[participantsData])
    useEffect(()=>{
        if(message && groupAdress){
            let group = participantsBgColor.get(groupAdress);
            if(group){
                let bgC = group.get(fromUser);
                if(bgC){
                    setBgColor(bgC)
                }
               
            }
        }
    }, [participantsBgColor])
    useEffect(()=>{
        if(!msgCreatedInDelete.includes(createdIn)){
            setSelectArea(false);
        }
    }, [msgCreatedInDelete]);
    return (
        <div className='messageRenderContainer' data-createdin={createdIn} onClick={()=>{
            if(msgCreatedInDelete.length > 0 && !msgCreatedInDelete.includes(createdIn)){
                setMsgCreatedInDelete(prev => [...prev, createdIn])
                setSelectArea(true);
            }
        }}>
            <div className={`messageRender min-w-[25%] 
            ${fromUser === userSoul ? "messageRenderBgSender" : "messageRenderBgReceive self-end"}`}
            {...longPressEvent}
            >
                {
                    fromUser !== userSoul  && message && (
                        <>
                            <div className="text-white font-normal w-[100%] flex justify-between gap-[.75em] px-[.3em]">
                                <p className="ltr font-semibold"
                                style={(bgColor && message) ? {
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
                
                <p className="msgContainer ltr">
                    {
                        msg(deletedTo)
                    }
                </p>
                
                <p className="msgCreatedIn flex justify-between w-full">{createdTime}
                
                {
                    /* !(deletedTo === "all") && !(deletedTo === "allTo" && fromUser === soulName)
                    && !(deletedTo === "allTo" || deletedTo === "allFrom") && 
                    messageGroup && messageGroup.viewStatus && messageGroup.fromUser === userSoul && typeOfCheck(messageGroup.viewStatus)*/
                }
                </p>
            </div>
            <div className="divDeleteML" style={!selectArea ? {display: "none"} : undefined}
            onClick={divDeleteML}>
    
            </div>
            <div className="text-white font-bold flex flex-col">
                <span>DeletedTo: {deletedTo}</span>
                <span>ViewStatus: {viewStatus}</span>
            </div>
        </div>
    )

}