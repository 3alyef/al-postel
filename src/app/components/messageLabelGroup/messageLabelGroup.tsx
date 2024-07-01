"use client";
import { BsCheck, BsCheckAll } from "react-icons/bs";
import { propsMessagesContent, propsMessagesGroupContent, propsRoom } from "../alpostelMain/alpostelMain";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ConnectM2 } from "@/services/connectToM2.service";
import useLongPress from "@/hooks/useLongPress.hook";
import { RiForbid2Line } from "react-icons/ri";

interface propsMessageLabel {
    messageGroup: propsMessagesGroupContent;
    soulName: string;
    createdTime: string;
    userSoul: string;
    serverIo: ConnectM2;
    setMessagesGroupContent: Dispatch<SetStateAction<Map<string, propsMessagesGroupContent[]>>>
    roomsListByUserSoul: Map<string, string>;
    participantsBgColor: Map<string, Map<string, string>>;
    groupName:string;
    participantsData: Map<string, propsRoom>;
    setMsgCreatedInDelete: Dispatch<SetStateAction<string[]>>;
    createdIn: string;
    msgCreatedInDelete: string[];
    deletedTo: "none" | "justFrom" | "all" | "allFrom" | string;
    fromUser: string;
    toUsers: string[] 
}
export const msgDeleted = (fromUser: string, userSoul: string, type2?:boolean )=> (
    <span className="flex items-center gap-1" 
    style={type2 ? {color: "rgb(239 239 239 / 75%)"} : (fromUser === userSoul? {color: "#090909d4"} : {color: "rgb(239 239 239 / 75%)"})}>
        Mensagem Apagada <RiForbid2Line/>
    </span>
)

export default function MessageLabelGroup({messageGroup, soulName, createdTime, userSoul, serverIo,setMessagesGroupContent, roomsListByUserSoul, participantsBgColor, groupName, participantsData, setMsgCreatedInDelete, msgCreatedInDelete, createdIn, deletedTo, fromUser, toUsers}: propsMessageLabel){
    const [selectArea, setSelectArea] = useState<boolean>(false)
    //
    
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

        if(messageGroup){
            console.log('messageGroup', messageGroup)
        }
        
    }, [messageGroup, soulName, serverIo, setMessagesGroupContent, userSoul]);

    
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
        if (messageGroup && messageGroup.message.length > 0){
            return <>{messageGroup.message}</>
        } 
       
        if(deletedTo === "justAll"){
            return
        } else if(deletedTo === "justFrom" && soulName === userSoul) {
            return
        } else if(deletedTo === "justTo" && (soulName !== userSoul || toUsers?.includes(soulName))){
            return
        } else if(deletedTo === "all") {
            return msgDeleted(fromUser, userSoul);
        } else if(deletedTo === "allFrom" && (userSoul !== soulName || toUsers?.includes(soulName))){
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
            ${messageGroup && messageGroup.fromUser === userSoul ? "messageRenderBgSender" : "messageRenderBgReceive self-end"}`}
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
                
                <p className="msgContainer ltr">
                    {
                        msg()
                    }
                </p>
                
                <p className="msgCreatedIn flex justify-between w-full">{createdTime}
                
                {
                    /*!(deletedTo === "all") && !(deletedTo === "allTo" && fromUser === soulName)
                    && !(deletedTo === "allTo" || deletedTo === "allFrom") && 
                    message && message.viewStatus && message.fromUser === userSoul && typeOfCheck(message.viewStatus)*/
                }
                </p>
            </div>
            <div className="divDeleteML" style={!selectArea ? {display: "none"} : undefined}
            onClick={divDeleteML}>

            </div>
        </div>
    )

    useEffect(()=>{
        console.log("deletedTo === allTo && fromUser !== soulName", deletedTo === "allTo" && fromUser !== soulName)
        console.log("deletedTo", deletedTo);
        console.log("deletedTo === justTo && toUsers.includes(fromUser)", toUsers && deletedTo === "justTo" && toUsers.includes(fromUser))
    }, [deletedTo])
   
    if(deletedTo === "none" || deletedTo === "all" || (deletedTo === "allFrom" && fromUser !== userSoul) || (deletedTo === "allTo" && fromUser !== soulName) ||
    (deletedTo === "justFrom" && fromUser !== userSoul) ||
    (deletedTo === "justTo" && fromUser !== soulName)){
        return data();
    }
    
}